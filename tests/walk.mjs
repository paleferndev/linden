/* Plays every lesson end to end, answering right, and checks each screen on the way:
   - nothing scrolls sideways, and nothing scrolls inside a step except the chat;
   - the action button sits fully inside the screen;
   - no console errors.
   Used by the smoke test; run on its own (`node tests/walk.mjs [url] [--shots]`) against a dev or preview server.
   With --shots it saves a screenshot of every step to tests/shots/walk/<size>/. */
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LESSONS, COURSE } from '../src/content/lessons.js';
import { ITEMS } from '../src/content/items.js';

const NAME = 'Alex';
const sub = s => String(s).replaceAll('{name}', NAME);

/** Tests never make a sound: the system voice and the little tones are replaced with silent stand-ins. */
export function silence() {
  if (window.speechSynthesis) window.speechSynthesis.speak = u => setTimeout(() => u.onend?.(new Event('end')), 150);
  window.AudioContext = window.webkitAudioContext = undefined;
}

export async function walk(browser, base, { sizes = [[390, 844], [320, 568]], shots = false, lessons = COURSE, log = console.log } = {}) {
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
    for (const id of lessons) {
      const L = LESSONS[id];
      log(`${size} ${id}`);
      await page.evaluate(h => { location.hash = h; }, '#/lectie/' + id);
      const steps = [...L.steps, { t: 'done' }];
      for (let k = 0; k < steps.length; k++) {
        const s = steps[k];
        const step = page.locator(`.step.s-${s.t}:not(.leave)`);
        await step.waitFor({ timeout: 5000 });
        await page.waitForTimeout(80);
        const where = `${size} ${id} step ${k + 1} (${s.t})`;
        const m = await page.evaluate(() => {
          const st = document.querySelector('.step:not(.leave)');
          const body = st.querySelector('.body');
          const act = st.querySelector('.foot:not([hidden]) .act');
          const r = act?.getBoundingClientRect();
          return {
            sideways: document.documentElement.scrollWidth - innerWidth,
            spill: body && !body.classList.contains('chat-body') ? body.scrollHeight - body.clientHeight : 0,
            act: r ? { top: r.top, bottom: r.bottom, h: r.height } : null,
            vh: innerHeight,
          };
        });
        ok(m.sideways <= 0, `${where}: page scrolls sideways by ${m.sideways}px`);
        ok(m.spill <= 1, `${where}: step content overflows by ${m.spill}px`);
        if (m.act) ok(m.act.bottom <= m.vh + 0.5 && m.act.h >= 44, `${where}: action button off screen or too small`);
        const snap = shots ? tag => page.screenshot({ path: `${dir}${id}-${String(k + 1).padStart(2, '0')}-${s.t}${tag}.png` }) : async () => {};
        await snap('');
        await act(page, step, s, snap);
      }
      await page.locator('.layer').waitFor({ state: 'hidden', timeout: 5000 });
    }
    // progress survives a reload: every lesson walked is done and its window lit
    await page.reload();
    const lit = await page.evaluate(() => document.querySelectorAll('.lane-strip .win.on').length);
    ok(lit >= lessons.length, `${size}: ${lit} lit windows after a reload, expected ${lessons.length}`);
    if (shots) await page.screenshot({ path: `${dir}zz-home.png` });

    // the review: bring everything due today, answer whatever is first, check each screen
    await page.evaluate(() => {
      const d = JSON.parse(localStorage.getItem('linden'));
      const t = new Date(), iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
      for (const it of Object.values(d.items)) it.due = iso;
      localStorage.setItem('linden', JSON.stringify(d));
    });
    await page.reload();
    if (shots) await page.screenshot({ path: `${dir}zz-home-due.png` });
    await page.evaluate(() => { location.hash = '#/recap'; });
    for (let k = 0; k < 40; k++) {
      const step = page.locator('.step:not(.leave)');
      await step.waitFor();
      await page.waitForTimeout(80);
      const spill = await page.evaluate(() => { const b = document.querySelector('.step:not(.leave) .body'); return b.scrollHeight - b.clientHeight; });
      ok(spill <= 1, `${size} review step ${k + 1}: content overflows by ${spill}px`);
      if (shots) await page.screenshot({ path: `${dir}zz-review-${String(k + 1).padStart(2, '0')}.png` });
      if (await page.locator('.step:not(.leave).s-rdone').count()) { await page.locator('[data-finish]').click(); break; }
      await step.locator('[data-opt]').first().click();
      await page.locator('.tray.show [data-tray]').click();
    }
    await page.locator('.layer').waitFor({ state: 'hidden' });
    for (const [tab, name] of [['#/fraze', 'phrases'], ['#/profil', 'profile'], ['#/recapitulare', 'review-tab']]) {
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

async function act(page, step, s, snap) {
  const next = () => step.locator('.foot .act').click();
  const tray = async () => { await page.locator('.tray.show [data-tray]').click(); };
  switch (s.t) {
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
    case 'listen': case 'pick':
      await step.locator(`[data-opt="${s.answer}"]`).click();
      return tray();
    case 'build': {
      const words = sub(s.answer).replace(/[.,!?]/g, '').split(' ');
      for (const w of words) await step.locator(`.bank .tile:not(.used)[data-w="${w.replace(/"/g, '\\"')}"]`).first().click();
      await step.locator('[data-check]').click();
      return tray();
    }
    case 'match':
      for (let k = 0; k < s.pairs.length; k++) {
        await step.locator(`.mt[data-side="l"][data-k="${k}"]`).click();
        await step.locator(`.mt[data-side="r"][data-k="${k}"]`).click();
      }
      return tray();
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

// On its own: node tests/walk.mjs http://localhost:5180/linden/ --shots [lesson ids…]
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const base = args.find(a => a.startsWith('http')) || 'http://localhost:5180/linden/?mute';
  const only = args.filter(a => LESSONS[a]);
  const browser = await chromium.launch();
  const r = await walk(browser, base, { shots: args.includes('--shots'), lessons: only.length ? only : COURSE, sizes: args.includes('--small') ? [[320, 568]] : args.includes('--big') ? [[390, 844]] : undefined });
  await browser.close();
  console.log(`\n${r.checks} checks, ${r.failed} failed`);
  process.exit(r.failed ? 1 : 0);
}
