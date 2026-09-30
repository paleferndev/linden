/* The test suite for the built app (headless Chromium via Playwright, always silent).
   1. First open: welcome, name, straight into the first lesson, then home.
   2. The tabs at 320×568, 390×844 and 1280×800, light and dark: nothing scrolls sideways, no console errors.
   3. Every lesson played end to end at 390×844 and 320×568 (tests/walk.mjs), then a review session.
   4. Offline: once installed, the app opens with the network off.
   5. Self-update: an installed copy of build A switches itself to build B once B is served, without a reinstall.
   Builds go to tests/.dist so they never clobber dist/. Screenshots land in tests/shots/. */
import { build, preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { walk, silence } from './walk.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = fileURLToPath(new URL('./.dist', import.meta.url));
const shots = fileURLToPath(new URL('./shots/', import.meta.url));
fs.mkdirSync(shots, { recursive: true });
const PORT = 4174;
const URL_ = `http://localhost:${PORT}/linden/?mute`;
const SEEDED = { v: 1, profile: { name: 'Alex', onboarded: true }, lessons: { 'h.known': { done: true, times: 1 }, 'k.order': { done: true, times: 1 } },
  items: { 'w.hotel': { box: 1, due: '2000-01-01' }, 'p.can-i-have': { box: 2, due: '2000-01-01' } }, traps: ['trap.give-me'] };

let checks = 0, failed = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failed++; console.log('  FAIL', msg); } };

async function buildAs(tag) {
  process.env.LINDEN_BUILD_TAG = tag;
  await build({ root, logLevel: 'silent', build: { outDir, emptyOutDir: true } });
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
  await page.locator('.step.s-scene').waitFor();
  ok(await page.textContent('.step .title') === 'Engleza pe care o știi deja', 'first open does not land in the first lesson');
  await page.click('[data-exit]');
  await page.locator('.layer').waitFor({ state: 'hidden' });
  ok(await page.locator('.hello').textContent().then(t => t.includes('Alex')), 'home does not greet by name');
  ok(await page.locator('.tcard[data-lesson="h.known"]').count() === 1, 'home does not offer to continue the first lesson');
  ok(errors.length === 0, `first open: console errors: ${errors.join(' | ')}`);
  await ctx.close();
}

/* ---------- 2. the tabs */
for (const [w, h] of [[320, 568], [390, 844], [1280, 800]]) {
  for (const scheme of ['light', 'dark']) {
    const name = `${w}x${h}-${scheme}`;
    console.log(name);
    const { ctx, page, errors } = await newPage(browser, { viewport: { width: w, height: h }, colorScheme: scheme });
    for (const [hash, tab] of [['#/', 'home'], ['#/recapitulare', 'review'], ['#/fraze', 'phrases'], ['#/profil', 'profile']]) {
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

/* ---------- 3. every lesson, then a review */
const r = await walk(browser, URL_, { log: s => { if (s.startsWith('  FAIL')) console.log(s); } });
checks += r.checks; failed += r.failed;
console.log(`lessons walked: ${r.checks} checks`);

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
fs.rmSync(outDir, { recursive: true, force: true });

console.log(`\n${checks} checks, ${failed} failed`);
process.exit(failed ? 1 : 0);
