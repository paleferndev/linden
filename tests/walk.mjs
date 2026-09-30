/* Plays every lesson end to end, then a review, then every entry of the exercise list, and checks each screen:
   - nothing scrolls sideways, and nothing scrolls inside a step except the chat;
   - the action button sits fully inside the screen;
   - no console errors.
   Lessons are answered right wherever the lesson data says what's right (sound pairs are random, so those can go
   either way; a miss comes back later, which the walk follows too). "Say it aloud" takes the no-microphone path.
   Used by the smoke test; run on its own (`node tests/walk.mjs [url] [--shots] [--big|--small] [lesson ids…]`)
   against a dev or preview server. With --shots it saves every screen to tests/shots/walk/<size>/. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LESSONS, COURSE } from '../src/content/lessons.js';
import { KINDS } from '../src/screens/catalog.js';

const NAME = 'Alex';
const sub = s => String(s).replaceAll('{name}', NAME);

/** Tests never make a sound: the system voice and the little tones are replaced with silent stand-ins. */
export function silence() {
  if (window.speechSynthesis) window.speechSynthesis.speak = u => setTimeout(() => u.onend?.(new Event('end')), 150);
  window.AudioContext = window.webkitAudioContext = undefined;
}

export async function walk(browser, base, { sizes = [[390, 844], [320, 568]], shots = false, lessons = COURSE, catalog = true, log = console.log } = {}) {
  let checks = 0, failed = 0;
  const ok = (cond, msg) => { checks++; if (!cond) { failed++; log('  FAIL ' + msg); } };
  for (const [w, h] of sizes) {
    const size = `${w}x${h}`;
    const dir = fileURLToPath(new URL(`./shots/walk/${size}/`, import.meta.url));
    if (shots) fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', colorScheme: 'light' });
    await ctx.addInitScript(silence);
    await ctx.addInitScript(name => {
      if (!localStorage.getItem('linden')) localStorage.setItem('linden', JSON.stringify({ v: 1, profile: { name, onboarded: true } }));
    }, NAME);
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base);

    // Plays a run until its last screen. `spec(orig)` gives the step data when it's known.
    const play = async (label, spec, prefix) => {
      for (let n = 0; n < 60; n++) {
        const step = page.locator('.step:not(.leave)');
        await step.waitFor({ timeout: 6000 });
        await page.waitForTimeout(60);
        const info = await page.evaluate(() => {
          const st = document.querySelector('.step:not(.leave)');
          const body = st.querySelector('.body');
          const act = st.querySelector('.foot:not([hidden]) .act');
          const r = act?.getBoundingClientRect();
          return {
            t: [...st.classList].find(c => c.startsWith('s-')).slice(2), orig: +st.dataset.orig,
            sideways: document.documentElement.scrollWidth - innerWidth,
            spill: body && !body.classList.contains('chat-body') ? body.scrollHeight - body.clientHeight : 0,
            act: r ? { bottom: r.bottom, h: r.height } : null, vh: innerHeight,
          };
        });
        const where = `${size} ${label} screen ${n + 1} (${info.t})`;
        ok(info.sideways <= 0, `${where}: page scrolls sideways by ${info.sideways}px`);
        ok(info.spill <= 1, `${where}: step content overflows by ${info.spill}px`);
        if (info.act) ok(info.act.bottom <= info.vh + 0.5 && info.act.h >= 44, `${where}: action button off screen or too small`);
        const snap = shots ? tag => page.screenshot({ path: `${dir}${prefix}-${String(n + 1).padStart(2, '0')}-${info.t}${tag}.png` }) : async () => {};
        await snap('');
        if (['done', 'rdone', 'ddone'].includes(info.t)) { await step.locator('[data-finish]').click(); break; }
        await act(page, step, info.t, spec?.(info.orig), snap);
      }
      await page.locator('.layer').waitFor({ state: 'hidden', timeout: 6000 });
    };

    for (const id of lessons) {
      log(`${size} ${id}`);
      await page.evaluate(h => { location.hash = h; }, '#/lectie/' + id);
      const steps = LESSONS[id].steps;
      await play(id, k => steps[k], id);
    }

    // progress survives a reload: every lesson walked is done and its window lit
    await page.reload();
    const lit = await page.evaluate(() => document.querySelectorAll('.lane-strip .win.on').length);
    ok(lit >= lessons.length, `${size}: ${lit} lit windows after a reload, expected ${lessons.length}`);
    if (shots) await page.screenshot({ path: `${dir}zz-home.png` });

    // the review: bring everything due today and answer whatever comes
    await page.evaluate(() => {
      const d = JSON.parse(localStorage.getItem('linden'));
      const t = new Date(), iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
      Object.values(d.items).forEach((it, k) => { it.due = iso; it.box = 1 + (k % 5); });
      localStorage.setItem('linden', JSON.stringify(d));
    });
    await page.reload();
    if (shots) await page.screenshot({ path: `${dir}zz-home-due.png` });
    log(`${size} review`);
    await page.evaluate(() => { location.hash = '#/recap'; });
    await play('review', null, 'zz-review');

    // every entry of the exercise list
    if (catalog) {
      for (const [kind] of KINDS.flatMap(g => g.items)) {
        log(`${size} try: ${kind}`);
        await page.evaluate(h => { location.hash = h; }, '#/exercitii/' + kind);
        await play('try ' + kind, null, `zy-${kind}`);
      }
    }

    for (const [tab, name] of [['#/fraze', 'phrases'], ['#/profil', 'profile'], ['#/recapitulare', 'review-tab'], ['#/exercitii', 'catalog']]) {
      await page.evaluate(h => { location.hash = h; }, tab);
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

async function act(page, step, t, s, snap) {
  const next = () => step.locator('.foot .act').first().click();
  const tray = () => page.locator('.tray.show [data-tray]').click();
  const tiles = async text => {
    for (const w of sub(text).replace(/[.,!?]/g, '').split(' ')) await step.locator(`.bank .tile:not(.used)[data-w="${w.replace(/"/g, '\\"')}"]`).first().click();
  };
  switch (t) {
    case 'explore':
      for (const o of await step.locator('.obj').all()) await o.click();
      return next();
    case 'cards':
      for (const c of await step.locator('.card').all()) await c.click();
      return next();
    case 'letters':
      for (const c of (await step.locator('.ltile').all()).slice(0, 5)) await c.click();
      return next();
    case 'numbers':
      for (const c of (await step.locator('.ntile').all()).slice(0, 3)) await c.click();
      return next();
    case 'listen': case 'pick': case 'cloze':
      await step.locator(`[data-opt="${s?.answer ?? 0}"]`).click();
      await snap('-answered');
      return tray();
    case 'minimal':
      while (!(await page.locator('.tray.show').count())) {
        const b = step.locator('.opt:not([disabled])').first();
        if (await b.count()) await b.click();
        await page.waitForTimeout(120);
      }
      return tray();
    case 'dictation':
      await step.locator('[data-in]').fill(s ? sub(s.answer) : 'x');
      await step.locator('[data-check]').click();
      await snap('-answered');
      return tray();
    case 'translate':
      if (await step.locator('[data-in]').count()) await step.locator('[data-in]').fill(s ? sub(s.answer) : 'x');
      else if (s) await tiles(s.answer); else await step.locator('.bank .tile').first().click();
      await step.locator('[data-check]').click();
      await snap('-answered');
      return tray();
    case 'listenbuild':
      if (s) await tiles(s.audio); else await step.locator('.bank .tile').first().click();
      await step.locator('[data-check]').click();
      return tray();
    case 'speak':
      if (await step.locator('[data-nomic]').count()) await step.locator('[data-nomic]').click();
      if (await step.locator('[data-said]').count()) return step.locator('[data-said]').click();
      await step.locator('[data-reveal]').click();
      await snap('-shown');
      return step.locator('[data-self="1"]').click();
    case 'talk': {
      const foot = step.locator('[data-tfoot]:not([hidden]) .act');
      for (let turns = 0; turns < 40; turns++) {
        await page.waitForFunction(() => {
          const st = document.querySelector('.step:not(.leave)');
          return st.querySelector('.reply') || !st.querySelector('[data-tfoot]').hidden;
        }, null, { timeout: 8000 });
        if (await foot.count()) { await snap('-end'); return foot.click(); }
        await step.locator('.reply').first().click();
      }
      throw new Error('the chat never ended');
    }
    default:
      return next();
  }
}

// On its own: node tests/walk.mjs http://localhost:5180/linden/?mute --shots [--big|--small] [lesson ids…]
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const base = args.find(a => a.startsWith('http')) || 'http://localhost:5180/linden/?mute';
  const only = args.filter(a => LESSONS[a]);
  const browser = await chromium.launch();
  const r = await walk(browser, base, {
    shots: args.includes('--shots'), lessons: only.length ? only : COURSE, catalog: !only.length || args.includes('--catalog'),
    sizes: args.includes('--small') ? [[320, 568]] : args.includes('--big') ? [[390, 844]] : undefined,
  });
  await browser.close();
  console.log(`\n${r.checks} checks, ${r.failed} failed`);
  process.exit(r.failed ? 1 : 0);
}
