/* The test suite for the built app (headless Chromium via Playwright, always silent).
   0. The season's content is well formed (tests/content.mjs).
   1. First open: welcome, name, straight to the cover of episode 1, then home.
   2. The tabs at 320×568, 390×844 and 1280×800, light and dark: nothing scrolls sideways, no console errors.
   3. All twelve episodes played end to end at 390×844 and 320×568 (tests/walk.mjs), then training, every game and
      every entry of the exercise list.
   4. Offline: once installed, the app opens with the network off.
   5. Self-update: an installed copy of build A switches itself to build B once B is served, without a reinstall.
   Builds go to tests/.dist so they never clobber dist/. Screenshots land in tests/shots/. */
import { build, preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { walk, silence } from './walk.mjs';
import { checkContent } from './content.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const outBase = fileURLToPath(new URL('./.dist', import.meta.url));
let outDir = outBase;
const shots = fileURLToPath(new URL('./shots/', import.meta.url));
fs.mkdirSync(shots, { recursive: true });
const PORT = 4174;
const URL_ = `http://localhost:${PORT}/linden/?mute`;
const SEEDED = { v: 2, profile: { name: 'Alex', onboarded: true }, eps: { 1: { done: true, lamps: 3, times: 1 }, 2: { done: true, lamps: 2, times: 1 } },
  srs: { 'g:be': { box: 1, due: '2000-01-01' }, 'v:drink': { box: 2, due: '2000-01-01' } }, verbs: { be: '2026-09-30', drink: '2026-09-30' } };

let checks = 0, failed = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failed++; console.log('  FAIL', msg); } };

// Each build gets its own folder: on Windows the files build A served can stay open until the run ends.
const clear = dir => { try { fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch {} };
async function buildAs(tag) {
  process.env.LINDEN_BUILD_TAG = tag;
  outDir = `${outBase}-${tag}`;
  clear(outDir);
  await build({ root, logLevel: 'silent', build: { outDir, emptyOutDir: false } });
}
const serve = () => preview({ root, logLevel: 'silent', build: { outDir }, preview: { port: PORT, strictPort: true } });

async function newPage(browser, opts = {}, seed = SEEDED) {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', ...opts });
  await ctx.addInitScript(silence);
  if (seed) await ctx.addInitScript(s => { if (!localStorage.getItem('linden')) localStorage.setItem('linden', s); }, JSON.stringify(seed));
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  return { ctx, page, errors };
}

/* ---------- 0. content */
console.log('content');
{
  const n = checkContent(() => {});
  ok(n === 0, `content: ${n} problems (run node tests/content.mjs)`);
}

await buildAs('build-a');
let server = await serve();
const browser = await chromium.launch();

/* ---------- 1. first open */
console.log('first open');
{
  const { ctx, page, errors } = await newPage(browser, { viewport: { width: 390, height: 844 } }, null);
  await page.goto(URL_);
  await page.click('[data-start]');
  await page.fill('#onbName', 'Alex');
  await page.click('[data-form] button[type="submit"]');
  await page.locator('.cover h1').waitFor();
  ok(await page.textContent('.cover h1') === 'Something in the garden', 'first open does not land on episode 1');
  await page.click('[data-exit]');
  await page.locator('.layer').waitFor({ state: 'hidden' });
  ok(await page.locator('.hello').textContent().then(t => t.includes('Alex')), 'home does not greet by name');
  ok(await page.locator('.ep-card[data-nav="#/episod/1"]').count() === 1, 'home does not offer episode 1');
  ok(errors.length === 0, `first open: console errors: ${errors.join(' | ')}`);
  await ctx.close();
}

/* ---------- 1a. the first screen and an episode's cover fit a small phone: no scrolling, the button in view */
console.log('fit');
for (const [w, h] of [[320, 568], [360, 640]]) {
  const { ctx, page, errors } = await newPage(browser, { viewport: { width: w, height: h } }, null);
  await page.goto(URL_);
  await page.locator('[data-start]').waitFor();
  const first = await page.evaluate(() => ({ scroll: document.scrollingElement.scrollHeight - innerHeight, btn: document.querySelector('[data-start]').getBoundingClientRect().bottom, vh: innerHeight }));
  ok(first.scroll <= 0 && first.btn <= first.vh, `${w}x${h} first screen: scrolls by ${first.scroll}px, button ends at ${Math.round(first.btn)} of ${first.vh}`);
  await page.click('[data-start]');
  await page.fill('#onbName', 'Alex');
  await page.click('[data-form] button[type="submit"]');
  await page.locator('.cover [data-go]').waitFor();
  const cover = await page.evaluate(() => { const r = document.querySelector('.cover [data-go]').getBoundingClientRect(); return { top: r.top, bottom: r.bottom, vh: innerHeight }; });
  ok(cover.bottom <= cover.vh && cover.top >= 0, `${w}x${h} episode cover: button at ${Math.round(cover.top)}–${Math.round(cover.bottom)} of ${cover.vh}`);
  ok(errors.length === 0, `${w}x${h} fit: console errors: ${errors.join(' | ')}`);
  await ctx.close();
}

/* ---------- 1b. the voice: a line of the story asks for its recording, and the recording is there */
console.log('voice');
{
  const { ctx, page, errors } = await newPage(browser, { viewport: { width: 390, height: 844 } });
  await page.goto(URL_.replace('?mute', '') + '#/episod/1');
  await page.click('.cover [data-go]');
  await page.locator('[data-next]').click();
  const played = await page.waitForFunction(() => window.__played.find(s => s.includes('/voices/')), null, { timeout: 8000 }).then(h => h.jsonValue(), () => null);
  ok(!!played, 'the first line of episode 1 did not ask for its recording');
  if (played) {
    const res = await page.evaluate(async u => { const r = await fetch(u); return [r.status, r.headers.get('content-type'), (await r.arrayBuffer()).byteLength]; }, played);
    ok(res[0] === 200 && /audio/.test(res[1] || '') && res[2] > 2000, `recording ${played} is not served (${res.join(', ')})`);
  }
  ok(errors.length === 0, `voice: console errors: ${errors.join(' | ')}`);
  await ctx.close();
}

/* ---------- 2. the tabs */
for (const [w, h] of [[320, 568], [390, 844], [1280, 800]]) {
  for (const scheme of ['light', 'dark']) {
    const name = `${w}x${h}-${scheme}`;
    console.log(name);
    const { ctx, page, errors } = await newPage(browser, { viewport: { width: w, height: h }, colorScheme: scheme });
    for (const [hash, tab] of [['#/', 'home'], ['#/antrenament', 'training'], ['#/colectii', 'collections'], ['#/profil', 'profile']]) {
      await page.goto(URL_ + hash);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(100);
      const side = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      ok(side <= 0, `${name} ${tab}: page scrolls sideways by ${side}px`);
      await page.screenshot({ path: `${shots}${name}-${tab}.png`, fullPage: true });
    }
    ok(await page.textContent('.ver') === 'Linden · build-a', `${name}: profile shows "${await page.textContent('.ver')}"`);
    ok(errors.length === 0, `${name}: console errors: ${errors.join(' | ')}`);
    await ctx.close();
  }
}

/* ---------- 3. the whole season, then training, games and the exercise list */
const r = await walk(browser, URL_, { log: s => { if (s.startsWith('  FAIL')) console.log(s); } });
checks += r.checks; failed += r.failed;
console.log(`season walked: ${r.checks} checks`);

/* ---------- 4 + 5. offline start, then self-update */
console.log('offline + update');
{
  const { ctx, page, errors } = await newPage(browser, { viewport: { width: 390, height: 844 } });
  await page.goto(URL_ + '#/profil');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  ok(await page.evaluate(() => !!navigator.serviceWorker.controller), 'service worker does not control the page after install');

  await ctx.setOffline(true);
  await page.reload();
  ok(await page.locator('.ver').isVisible(), 'app does not open offline');
  ok(await page.textContent('.ver') === 'Linden · build-a', 'offline copy is not build A');
  await ctx.setOffline(false);

  await server.close();
  await buildAs('build-b');
  server = await serve();
  // The app checks for a new build whenever it comes back to the foreground.
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  const switched = await page.waitForFunction(() => document.querySelector('.ver')?.textContent === 'Linden · build-b', null, { timeout: 20000 })
    .then(() => true, () => false);
  ok(switched, 'installed app did not switch itself to build B');
  if (switched) ok(await page.textContent('#toast') === 'Linden s-a actualizat.', 'no "updated" toast after the switch');
  ok(errors.length === 0, `offline/update: console errors: ${errors.join(' | ')}`);
  await ctx.close();
}

await browser.close();
await server.close();
for (const t of ['build-a', 'build-b']) clear(`${outBase}-${t}`);

console.log(`\n${checks} checks, ${failed} failed`);
process.exit(failed ? 1 : 0);
