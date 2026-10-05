/* Plays the season end to end, then a training session, every game in free play and every entry of the exercise list,
   and checks each screen on the way:
   - nothing scrolls sideways;
   - what has to be tapped next is fully on screen, and the reply box leaves room for the conversation;
   - a game board never overflows;
   - no console errors;
   - the book opens from the chat: "De ce?" after a wrong answer, a note's lesson, an underlined verb (once each).
   The app tells the walk what it expects next through a test-only hook (window.__linden, set only in automated
   browsers). Every fifth answer is wrong on purpose first, so the wrong-reply path is walked too.
   Used by the smoke test; on its own: node tests/walk.mjs [url] [--shots] [--big|--small] [episode numbers…] [--extras]
   With --shots it saves every screen to tests/shots/walk/<size>/. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { EPISODES } from '../src/content/episodes.js';
import { GAMES } from '../src/content/games.js';
import { KINDS } from '../src/content/kinds.js';

/** Tests never make a sound: the system voice, the recordings and the little tones are replaced with silent
 *  stand-ins. Recordings asked for are listed in window.__played. */
export function silence() {
  if (window.speechSynthesis) window.speechSynthesis.speak = u => setTimeout(() => u.onend?.(new Event('end')), 5);
  window.AudioContext = window.webkitAudioContext = undefined;
  navigator.vibrate = () => true;
  window.__played = [];
  HTMLMediaElement.prototype.play = function () {
    const src = this.src || '';
    if (!src.startsWith('data:')) window.__played.push(src);
    setTimeout(() => this.dispatchEvent(new Event('ended')), 5);
    return Promise.resolve();
  };
}

const css = s => s.replace(/"/g, '\\"');

export async function walk(browser, base, { sizes = [[390, 844], [320, 568]], shots = false, eps = EPISODES.map(e => e.n), extras = true, log = console.log } = {}) {
  let checks = 0, failed = 0;
  const ok = (cond, msg) => { checks++; if (!cond) { failed++; log('  FAIL ' + msg); } };
  for (const [w, h] of sizes) {
    const size = `${w}x${h}`;
    const dir = fileURLToPath(new URL(`./shots/walk/${size}/`, import.meta.url));
    if (shots) fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light' });
    await ctx.addInitScript(silence);
    await ctx.addInitScript(() => {
      if (!localStorage.getItem('linden')) localStorage.setItem('linden', JSON.stringify({ v: 2, profile: { name: 'Alex', onboarded: true } }));
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);

    // Let entrance animations finish before measuring (the endless ones, like a pulsing ring, don't count).
    const settle = () => page.evaluate(() => Promise.race([
      Promise.all(document.getAnimations().filter(a => a.effect?.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))),
      new Promise(r => setTimeout(r, 400)),
    ]));

    /** Answers whatever the app asks until `until(hook)` says stop. */
    const play = async (label, prefix, until) => {
      let last = 0, n = 0, idle = 0, answers = 0;
      for (;;) {
        const hk = await page.evaluate(() => window.__linden || null);
        if (!hk || hk.seq === last) {
          if (++idle > 400) throw new Error(`${label}: stuck after step ${n}`);
          await page.waitForTimeout(25);
          continue;
        }
        idle = 0; last = hk.seq; n++;
        await settle();
        const where = `${size} ${label} step ${n} (${hk.act}${hk.sel ? ' ' + hk.sel : ''})`;
        const measure = () => page.evaluate(() => {
          const r = el => el && el.getBoundingClientRect();
          const comp = document.querySelector('.comp.open'), logEl = document.querySelector('.chat .log');
          const board = document.querySelector('.g-board'), opts = document.querySelector('.g-opts');
          return {
            sideways: document.documentElement.scrollWidth - innerWidth, vh: innerHeight,
            comp: comp ? r(comp).bottom : null, log: logEl && comp ? r(logEl).height : null,
            board: board ? board.scrollHeight - board.clientHeight : 0, opts: opts && opts.children.length ? r(opts).bottom : null,
          };
        });
        const bad = i => i.sideways > 0 || (i.comp != null && i.comp > i.vh + .5) || (i.log != null && i.log < 110) || i.board > 1 || (i.opts != null && i.opts > i.vh + .5);
        let info = await measure();
        // something caught mid-transition gets a second look; a real layout problem is still there after it
        if (bad(info)) { await page.waitForTimeout(350); info = await measure(); }
        ok(info.sideways <= 0, `${where}: page scrolls sideways by ${info.sideways}px`);
        if (info.comp != null) ok(info.comp <= info.vh + .5, `${where}: reply box ends ${Math.round(info.comp - info.vh)}px below the screen`);
        if (info.log != null) ok(info.log >= 110, `${where}: only ${Math.round(info.log)}px of conversation visible above the reply box`);
        ok(info.board <= 1, `${where}: game board overflows by ${info.board}px`);
        if (info.opts != null) ok(info.opts <= info.vh + .5, `${where}: game options end below the screen`);
        if (shots) await page.screenshot({ path: `${dir}${prefix}-${String(n).padStart(3, '0')}-${hk.act}.png` });
        if (until && await until(hk)) return hk;
        await act(hk, where, ++answers % 5 === 0);
      }
    };

    // The book, from the chat: opens the page behind `trigger`, checks it, closes it. Once per kind and size.
    const booked = new Set();
    const checkBook = async (kind, trigger, where) => {
      if (booked.has(kind) || !(await trigger.count())) return;
      // only when it can really be tapped: in view and not under a game or another layer
      await trigger.scrollIntoViewIfNeeded().catch(() => {});
      const free = await trigger.evaluate(el => {
        const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
        const t = r.width && y > 0 && y < innerHeight ? document.elementFromPoint(x, y) : null;
        return !!t && (t === el || el.contains(t));
      });
      if (!free) return;
      booked.add(kind);
      await trigger.click();
      await page.locator('.sheet .bk').waitFor({ timeout: 4000 });
      await settle();
      const i = await page.evaluate(() => { const s = document.querySelector('.sheet'); return { side: s.scrollWidth - s.clientWidth, h4: s.querySelectorAll('.bk h4').length }; });
      ok(i.side <= 0, `${where}: ${kind} page scrolls sideways by ${i.side}px`);
      ok(i.h4 >= 3, `${where}: ${kind} page has ${i.h4} sections`);
      await page.locator('.sheet [data-close]').first().click();
      await page.locator('#sheet').waitFor({ state: 'hidden', timeout: 4000 });
    };

    const act = async (hk, where, wrongFirst) => {
      await checkBook('note', page.locator('.log .note-more').last(), where);
      await checkBook('verb', page.locator('.log .vb').last(), where);
      const vis = async sel => { const b = page.locator(sel).first(); await b.waitFor({ state: 'visible', timeout: 4000 }); await settle(); let r = await b.boundingBox(); const off = () => !r || r.y < -1 || r.y + r.height > page.viewportSize().height + 1; if (off()) { await page.waitForTimeout(350); r = await b.boundingBox(); } ok(!off(), `${where}: ${sel} is off screen`); return b; };
      switch (hk.act) {
        case 'go': return (await vis(hk.sel)).click();
        case 'tap': return (await vis(hk.sel)).click({ force: true });
        case 'opt': {
          const right = `[data-opt][data-o="${css(hk.o)}"]`;
          if (wrongFirst) {
            const wrong = page.locator(`[data-opt]:not([disabled]):not([data-o="${css(hk.o)}"])`).first();
            if (await wrong.count()) {
              await wrong.click(); await page.waitForTimeout(60);
              if (!booked.has('lesson') && await page.locator('.log').count()) {
                const more = page.locator('.log .why-more').last();
                if (await more.waitFor({ state: 'visible', timeout: 1500 }).then(() => true, () => false)) await checkBook('lesson', more, where);
              }
            }
          }
          const b = page.locator(`${right}:not([disabled])`).first();
          if (await b.count()) { await vis(`${right}:not([disabled])`); await b.click(); }
          return;
        }
        case 'tiles':
          if (wrongFirst) { await page.locator('.bank .tile:not(.used)').first().click(); await page.locator('[data-send]').click(); return; }
          for (const word of hk.words) await page.locator(`.bank .tile:not(.used)[data-w="${css(word)}"]`).first().click();
          return (await vis('[data-send]')).click();
        case 'type':
          if (hk.signal) { await page.locator('.signal [data-in]').fill(wrongFirst ? hk.text.split(' ').slice(0, 2).join(' ') : hk.text); if (wrongFirst) { await page.waitForTimeout(40); await page.locator('.signal [data-hint]').click(); await page.locator('.signal [data-in]').fill(hk.text); } return; }
          await page.locator('.comp [data-in]').fill(wrongFirst ? 'nope' : hk.text);
          return (await vis('.comp [data-send]')).click();
        case 'glitch':
          if (wrongFirst) await page.locator('.gw.tap:not([data-g])').first().click();
          return page.locator('.gw[data-g]').last().click();
      }
    };

    for (const n of eps) {
      log(`${size} episode ${n}`);
      await page.evaluate(h => { window.__linden = null; location.hash = h; }, '#/episod/' + n);
      const end = await play(`episode ${n}`, `e${String(n).padStart(2, '0')}`, hk => hk.act === 'go' && hk.ending);
      if (shots) await page.waitForTimeout(400), await page.screenshot({ path: `${dir}e${String(n).padStart(2, '0')}-zz-ending.png` });
      ok(end.ending === n, `${size}: episode ${n} did not reach its ending`);
      await page.locator('.ending [data-done]').click();
      await page.locator('.layer').waitFor({ state: 'hidden', timeout: 6000 });
    }

    // progress survives a reload: every episode walked is done and its window lit
    await page.reload();
    const state = await page.evaluate(() => JSON.parse(localStorage.getItem('linden')));
    const done = Object.values(state.eps || {}).filter(e => e.done).length;
    ok(done >= eps.length, `${size}: ${done} episodes done after a reload, expected ${eps.length}`);
    ok(Object.keys(state.verbs || {}).length >= eps.length * 6, `${size}: verb album has ${Object.keys(state.verbs || {}).length} verbs`);
    for (const k of ['lesson', 'note', 'verb']) ok(booked.has(k), `${size}: the ${k} page was never opened from the chat`);
    if (shots) await page.screenshot({ path: `${dir}zz-home.png`, fullPage: true });

    if (extras) {
      // training: everything due today
      await page.evaluate(() => {
        const d = JSON.parse(localStorage.getItem('linden'));
        const t = new Date(), iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
        Object.values(d.srs).forEach((it, k) => { it.due = iso; it.box = 1 + (k % 5); });
        localStorage.setItem('linden', JSON.stringify(d));
      });
      await page.reload();
      log(`${size} training`);
      await page.evaluate(() => { window.__linden = null; location.hash = '#/antrenament/start'; });
      await play('training', 'zt', async hk => hk.act === 'go' && hk.sel === '.g-result [data-go]' && !(await page.locator('.ovl').count()));
      await page.locator('.g-result [data-go]').last().click();
      await page.locator('.layer').waitFor({ state: 'hidden', timeout: 6000 });

      // every game in free play (the ones unlocked), then every entry of the exercise list
      for (const kind of Object.keys(GAMES)) {
        const unlocked = EPISODES.find(e => e.game === kind && eps.includes(e.n));
        if (!unlocked) continue;
        log(`${size} game: ${kind}`);
        await page.evaluate(h => { window.__linden = null; location.hash = h; }, '#/joc/' + kind);
        await play('game ' + kind, `zg-${kind}`, hk => hk.act === 'go' && hk.sel === '.g-result [data-go]');
        await page.locator('.g-result [data-go]').click();
        await page.locator('.layer').waitFor({ state: 'hidden', timeout: 6000 });
      }
      for (const [kind] of KINDS.flatMap(g => g.items)) {
        log(`${size} try: ${kind}`);
        await page.evaluate(h => { window.__linden = null; location.hash = h; }, '#/incearca/' + kind);
        const isGame = !!GAMES[kind];
        let results = 0;
        await play('try ' + kind, `zy-${kind}`, hk => hk.act === 'go' && hk.sel === '.g-result [data-go]' && (!isGame || ++results === 2));
        await page.locator('.g-result [data-go]').last().click();
        await page.locator('.layer').waitFor({ state: 'hidden', timeout: 6000 });
      }
    }

    for (const [tab, name] of [['#/', 'home'], ['#/antrenament', 'training'], ['#/colectii/album', 'album'], ['#/colectii/verbe', 'verbs'], ['#/colectii/gramatica', 'grammar'], ['#/colectii/lanterna', 'memories'], ['#/profil', 'profile'], ['#/exercitii', 'catalog']]) {
      await page.evaluate(hh => { location.hash = hh; }, tab);
      await page.waitForTimeout(150);
      const side = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      ok(side <= 0, `${size} ${name}: page scrolls sideways by ${side}px`);
      if (shots) await page.screenshot({ path: `${dir}zz-${name}.png`, fullPage: true });
    }
    ok(errors.length === 0, `${size}: console errors: ${errors.join(' | ')}`);
    await ctx.close();
  }
  return { checks, failed };
}

// On its own: node tests/walk.mjs http://localhost:5180/linden/?mute --shots [--big|--small] [episode numbers…] [--extras]
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const base = args.find(a => a.startsWith('http')) || 'http://localhost:5180/linden/?mute';
  const only = args.filter(a => /^\d+$/.test(a)).map(Number);
  const upTo = only.length ? EPISODES.map(e => e.n).filter(n => n <= Math.max(...only)) : undefined;
  const browser = await chromium.launch();
  const r = await walk(browser, base, {
    shots: args.includes('--shots'), eps: upTo, extras: !only.length || args.includes('--extras'),
    sizes: args.includes('--small') ? [[320, 568]] : args.includes('--big') ? [[390, 844]] : undefined,
  });
  await browser.close();
  console.log(`\n${r.checks} checks, ${r.failed} failed`);
  process.exit(r.failed ? 1 : 0);
}
