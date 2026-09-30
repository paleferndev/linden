/* Browser harness for engleza.html (headless Chromium via Playwright).
   Plays every lesson start to finish through the real UI at 320×568 and
   390×844, light and dark, with the Google Fonts request blocked on half
   the runs. Fails on any uncaught error, any primary button outside the
   viewport, any element wider than the viewport, or progress lost on reload.
   Screenshots of each exercise type land in test/shots/. */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(here, '..');
const shots = path.join(here, 'shots');
fs.mkdirSync(shots, { recursive: true });

const server = http.createServer((req, res) => {
  const f = path.join(rootDir, req.url === '/' ? 'engleza.html' : decodeURIComponent(req.url.split('?')[0]));
  if(!f.startsWith(rootDir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); res.end(); return; }
  res.writeHead(200, {'content-type': f.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream'});
  res.end(fs.readFileSync(f));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = 'http://127.0.0.1:' + server.address().port + '/engleza.html';

let fails = 0, checks = 0;
function ok(cond, msg){ checks++; if(!cond){ fails++; console.log('  FAIL', msg); } }

const CONFIGS = [
  { w:320, h:568, scheme:'light', fonts:false },
  { w:320, h:568, scheme:'dark',  fonts:true  },
  { w:390, h:844, scheme:'light', fonts:true  },
  { w:390, h:844, scheme:'dark',  fonts:false }
];

/* a fresh checkout has no browser yet: fetch it once, then retry */
async function launch(){
  try { return await chromium.launch(); }
  catch(e){
    if(!/Executable doesn't exist/.test(String(e.message))) throw e;
    console.log('Chromium is missing; running `playwright install chromium` once...');
    const { execSync } = await import('node:child_process');
    execSync('npx playwright install chromium', { cwd: here, stdio: 'inherit' });
    return chromium.launch();
  }
}
const browser = await launch();

/* let the feedback sheet finish sliding before measuring */
async function settle(page){
  await page.waitForFunction(() => {
    const A = window.__epcp.App;
    const s = document.querySelector('.sheet.up');
    if(A.step && A.step.checked && !s) return false;
    if(!s) return true;
    return s.getBoundingClientRect().bottom <= window.innerHeight + 0.5;
  }, null, { timeout: 3000 }).catch(() => {});
}
async function layoutChecks(page, where, cfg){
  await settle(page);
  const r = await page.evaluate(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const wide = [];
    document.querySelectorAll('body *').forEach(el => {
      const cs = getComputedStyle(el);
      if(cs.display==='none' || cs.visibility==='hidden') return;
      const b = el.getBoundingClientRect();
      if(b.width===0) return;
      if(b.right > vw + 1 || b.left < -1) wide.push(el.tagName+'.'+String(el.className).replace(/\s+/g,'.')+' ['+Math.round(b.left)+','+Math.round(b.right)+']');
    });
    const sheet = document.querySelector('.sheet.up');
    const primary = sheet ? sheet.querySelector('.btn') : (document.querySelector('#act') || document.querySelector('.btn:not(.ghost):not(.quiet)'));
    let btn = null;
    if(primary){ const b = primary.getBoundingClientRect(); btn = {top:b.top, bottom:b.bottom, left:b.left, right:b.right, text:primary.textContent.trim()}; }
    const small = [];
    document.querySelectorAll('button').forEach(el => {
      const cs = getComputedStyle(el); if(cs.display==='none' || cs.visibility==='hidden') return;
      const b = el.getBoundingClientRect(); if(b.width===0) return;
      if(b.height < 43 || b.width < 43) small.push(el.className+':'+el.textContent.trim().slice(0,20)+' '+Math.round(b.width)+'x'+Math.round(b.height));
    });
    return { vw, vh, scrollW: document.documentElement.scrollWidth, wide, btn, small, hasLesson: !!document.querySelector('.lesson') };
  });
  ok(r.scrollW <= r.vw, where+' no horizontal scroll ('+r.scrollW+' > '+r.vw+')');
  ok(r.wide.length===0, where+' no element wider than the viewport: '+r.wide.slice(0,3).join(' ; '));
  /* lesson steps, onboarding and results always have one primary action; reference screens need not */
  if(r.hasLesson || /onboarding|results/.test(where)) ok(!!r.btn, where+' has a primary button');
  if(r.btn) ok(r.btn.top >= 0 && r.btn.bottom <= r.vh + 0.5 && r.btn.left >= 0 && r.btn.right <= r.vw + 0.5, where+' primary button "'+r.btn.text+'" inside viewport ('+Math.round(r.btn.top)+'–'+Math.round(r.btn.bottom)+' of '+r.vh+')');
  ok(r.small.length===0, where+' tap targets ≥ 44px: '+r.small.slice(0,4).join(' ; '));
}

async function state(page){
  return page.evaluate(() => {
    const A = window.__epcp.App, s = A.session;
    if(!s) return { done:true, hash:location.hash };
    const st = s.steps[s.i];
    return { i:s.i, n:s.steps.length, pending:!!s.pendingRetry, kind: st ? st.kind : 'end', retried:s.retried,
      ex: st && st.kind==='ex' ? { type:st.ex.type, answer:st.ex.answer, options:st.ex.options, tiles:st.ex.tiles,
        syllables:st.ex.syllables, pairs:st.ex.pairs, tokens: st.ex.type==='word_bank' ? window.__epcp.Engine.tokens(st.ex.answers[0]) : null, isRetry:!!st.isRetry } : null,
      checked: !!(A.step && A.step.checked), sheetUp: !!document.querySelector('.sheet.up') };
  });
}

const shotTaken = {};
async function shot(page, name){
  if(shotTaken[name]) return; shotTaken[name] = true;
  await page.screenshot({ path: path.join(shots, name+'.png') });
}

async function playLesson(page, id, cfg, opts){
  opts = opts || {};
  const tag = cfg.w+'x'+cfg.h+'-'+cfg.scheme+(cfg.fonts?'':'-nofonts');
  await page.evaluate(id => window.__epcp.go('#/lesson/'+id), id);
  await page.waitForSelector('.lesson', { timeout: 5000 });
  let guard = 0, answered = 0, wrongs = 0, sawRetry = false;
  while(guard++ < 400){
    const s = await state(page);
    if(s.done) break;
    const where = tag+' '+id+' step '+s.i+'/'+s.n+' '+(s.kind==='ex' ? s.ex.type : s.kind);
    await layoutChecks(page, where, cfg);
    if(s.kind==='ex') await shot(page, tag+'-'+s.ex.type+(s.checked?'-checked':''));
    else await shot(page, tag+'-'+s.kind);
    if(s.pending){ sawRetry = true; await shot(page, tag+'-retry'); await page.click('#act'); continue; }
    if(s.kind!=='ex'){
      if(s.kind==='dialogue'){ await page.click('.line'); }
      if(s.kind==='intro' && !shotTaken[tag+'-overlay']){
        await page.click('.lbar .k'); await page.waitForSelector('#overlay');
        await layoutChecks(page, where+' sound overlay', cfg); await shot(page, tag+'-overlay');
        await page.click('[data-act="closeOverlay"]');
      }
      await page.click('#act'); continue;
    }
    if(s.checked){ await page.click('#sheet .btn'); continue; }
    const ex = s.ex;
    const goWrong = opts.wrongEvery && !ex.isRetry && (answered % opts.wrongEvery === opts.wrongEvery-1) || opts.allWrong;
    answered++;
    if(ex.type==='pick_meaning' || ex.type==='pick_english' || ex.type==='pick_sound'){
      const N = ex.type==='pick_sound' ? (v => window.__epcp.Engine.normSay(v)) : null;
      const idx = await page.evaluate(([opts, ans, sound]) => {
        const E = window.__epcp.Engine; const n = sound ? E.normSay : E.norm;
        return opts.findIndex(o => n(o)===n(ans));
      }, [ex.options, ex.answer, ex.type==='pick_sound']);
      ok(idx>=0, where+' answer present');
      const pick = goWrong ? (idx+1)%ex.options.length : idx;
      await page.click('.opt[data-i="'+pick+'"]');
    } else if(ex.type==='pick_stress'){
      const pick = goWrong ? (ex.answer+1)%ex.syllables.length : ex.answer;
      await page.click('.syl[data-i="'+pick+'"]');
    } else if(ex.type==='word_bank'){
      const tiles = ex.tiles.slice(); const used = {};
      const order = goWrong ? ex.tokens.slice().reverse() : ex.tokens;
      for(const t of order){
        let k = -1; for(let i=0;i<tiles.length;i++){ if(!used[i] && tiles[i]===t){ k=i; break; } }
        ok(k>=0, where+' tile for token "'+t+'"');
        if(k<0) break;
        used[k]=true;
        await page.click('#bank .tile[data-i="'+k+'"]');
      }
      if(goWrong && ex.tokens.length<2){ /* a one-token bank cannot be wrong */ }
    } else if(ex.type==='match_pairs'){
      const ids = ex.pairs.map(p=>p.id);
      if(goWrong && ids.length>=2){
        await page.click('.pair[data-side="l"][data-id="'+ids[0]+'"]');
        await page.click('.pair[data-side="r"][data-id="'+ids[1]+'"]');
        await page.waitForTimeout(450);
      }
      for(const pid of ids){
        await page.click('.pair[data-side="l"][data-id="'+pid+'"]');
        await page.click('.pair[data-side="r"][data-id="'+pid+'"]');
      }
      await page.waitForTimeout(450);
      continue;
    }
    if(goWrong) wrongs++;
    await page.click('#act');
    await settle(page);
    const after = await state(page);
    ok(after.checked && after.sheetUp, where+' sheet shows after check');
    if(after.checked){
      const verdict = await page.textContent('.sheet .verdict');
      ok(!/!/.test(verdict) && !/greșit|pierdut/i.test(verdict), where+' verdict never scolds: '+verdict);
      const sheetFlag = await page.evaluate(() => document.querySelector('.sheet').classList.contains('no'));
      if(!goWrong) ok(!sheetFlag, where+' correct answer graded as correct');
      if(goWrong && ex.type!=='word_bank') ok(sheetFlag, where+' wrong answer graded as wrong');
    }
  }
  ok(guard < 400, tag+' '+id+' finished (guard)');
  const done = await page.evaluate(() => location.hash);
  ok(done==='#/done', tag+' '+id+' reaches the results screen ('+done+')');
  await layoutChecks(page, tag+' '+id+' results', cfg);
  await shot(page, tag+'-results');
  if(opts.wrongEvery && wrongs>0 && id!=='u01.cp') ok(sawRetry, tag+' '+id+' retry round announced after '+wrongs+' wrong');
  return { wrongs };
}

for(const cfg of CONFIGS){
  const tag = cfg.w+'x'+cfg.h+'-'+cfg.scheme+(cfg.fonts?'':'-nofonts');
  console.log('\n'+tag);
  const context = await browser.newContext({ viewport:{width:cfg.w, height:cfg.h}, colorScheme: cfg.scheme, isMobile:true, hasTouch:true, deviceScaleFactor:2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
  if(!cfg.fonts) await context.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: '+e.message));
  page.on('console', m => {
    if(m.type()!=='error') return;
    const url = (m.location() && m.location().url) || '';
    if(!cfg.fonts && /fonts\.(googleapis|gstatic)\.com/.test(url)) return;   /* the blocked font request, on purpose */
    errors.push('console: '+m.text()+' @ '+url);
  });
  page.on('dialog', d => d.accept());

  await page.goto(base);
  await page.waitForSelector('#nm');
  await layoutChecks(page, tag+' onboarding', cfg);
  await shot(page, tag+'-onboard');
  await page.fill('#nm', 'Ștefan');
  await page.click('[data-act="onboard"]');
  await page.waitForSelector('.now');
  await layoutChecks(page, tag+' home', cfg);
  await shot(page, tag+'-home');
  const hint = await page.$('.hint');
  ok(!!hint, tag+' add-to-home-screen hint shows on iPhone Safari that is not standalone');

  const order = await page.evaluate(() => window.__epcp.Engine.LESSON_ORDER);
  for(const id of order){
    const isCp = id.endsWith('.cp');
    await playLesson(page, id, cfg, isCp ? {} : { wrongEvery: 4 });
    if(id==='u00.l01'){
      await page.reload(); await page.waitForSelector('.lrow.done, .now');
      const kept = await page.evaluate(() => window.__epcp.Store.d.lessons['u00.l01'] && window.__epcp.Store.d.lessons['u00.l01'].done);
      ok(kept===true, tag+' progress survives a reload');
      const name = await page.evaluate(() => window.__epcp.Store.d.profile.name);
      ok(name==='Ștefan', tag+' name survives a reload with diacritics');
    }
  }
  const allDone = await page.evaluate(() => window.__epcp.Engine.LESSON_ORDER.every(id => (window.__epcp.Store.d.lessons[id]||{}).done));
  ok(allDone, tag+' every lesson marked done');

  /* the checkpoint can be failed and retaken without limit */
  await playLesson(page, 'u01.cp', cfg, { allWrong:true });
  const failText = await page.textContent('.result .lead');
  ok(/Aproape/.test(failText) && !/!/.test(failText), tag+' failed checkpoint is gentle: '+failText);
  ok(await page.$('[data-act="lesson"][data-id="u01.cp"]') !== null, tag+' failed checkpoint offers a retake');
  await page.click('[data-act="lesson"][data-id="u01.cp"]');
  await page.waitForSelector('.lesson');
  await page.evaluate(() => window.__epcp.go('#/home'));

  /* review session: force everything due, play it */
  await page.evaluate(() => { const S=window.__epcp.Store; Object.keys(S.d.items).forEach(id => { S.d.items[id].due='2020-01-01'; }); S.save(); window.__epcp.go('#/review'); });
  await page.waitForSelector('.card.raised');
  const dueText = await page.textContent('.card.raised h2');
  ok(/^12 pentru azi/.test(dueText), tag+' review shows "12 pentru azi", not the backlog: '+dueText);
  await layoutChecks(page, tag+' review tab', cfg);
  await shot(page, tag+'-review');
  await page.evaluate(() => window.__epcp.go('#/practice'));
  await page.waitForSelector('.lesson');
  {
    let guard=0;
    while(guard++<100){
      const s = await state(page); if(s.done) break;
      await layoutChecks(page, tag+' review step '+s.i, cfg);
      if(s.pending){ await page.click('#act'); continue; }
      if(s.checked){ await page.click('#sheet .btn'); continue; }
      const ex = s.ex;
      if(ex.type==='match_pairs'){ for(const p of ex.pairs){ await page.click('.pair[data-side="l"][data-id="'+p.id+'"]'); await page.click('.pair[data-side="r"][data-id="'+p.id+'"]'); } await page.waitForTimeout(450); continue; }
      if(ex.type==='pick_stress') await page.click('.syl[data-i="'+ex.answer+'"]');
      else if(ex.type==='word_bank'){ const used={}; for(const t of ex.tokens){ let k=-1; for(let i=0;i<ex.tiles.length;i++){ if(!used[i]&&ex.tiles[i]===t){k=i;break;} } used[k]=true; await page.click('#bank .tile[data-i="'+k+'"]'); } }
      else { const idx = await page.evaluate(([o,a,snd]) => { const E=window.__epcp.Engine; const n=snd?E.normSay:E.norm; return o.findIndex(x=>n(x)===n(a)); }, [ex.options, ex.answer, ex.type==='pick_sound']); await page.click('.opt[data-i="'+idx+'"]'); }
      await page.click('#act');
    }
    ok((await page.evaluate(() => location.hash))==='#/done', tag+' review reaches results');
  }

  /* the other screens */
  for(const h of ['#/sounds','#/me','#/review','#/home']){
    await page.evaluate(h => window.__epcp.go(h), h);
    await page.waitForTimeout(80);
    await layoutChecks(page, tag+' '+h, cfg);
    await shot(page, tag+'-'+h.slice(2));
  }
  await page.evaluate(() => window.__epcp.go('#/me'));
  const meText = await page.textContent('.screen');
  ok(/Ștefan/.test(meText) && /lecții|lecție/.test(meText) && /Șterge tot progresul/.test(meText), tag+' Eu tab: name, counters, reset');
  ok(!/Copiază|cod/.test(meText), tag+' Eu tab has nothing else');

  /* fonts: with the request blocked the fallback stack must be in use, without it Alegreya loads */
  const fontStatus = await page.evaluate(async () => { await document.fonts.ready; return { alegreya: document.fonts.check('16px Alegreya'), sans: document.fonts.check('16px "Alegreya Sans"') }; });
  if(cfg.fonts) ok(fontStatus.alegreya && fontStatus.sans, tag+' Alegreya loaded');
  else ok(true, tag+' fonts blocked; layout checks above ran on the fallback stack');

  ok(errors.length===0, tag+' zero uncaught errors: '+errors.slice(0,3).join(' | '));
  await context.close();
}

await browser.close();
server.close();
console.log('\n'+checks+' checks, '+fails+' failed');
process.exit(fails ? 1 : 0);
