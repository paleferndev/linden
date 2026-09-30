/* Smoke test for the built app (headless Chromium via Playwright).
   1. Layout at 320×568, 390×844 and 1280×800, light and dark: no overflow, no errors, tap targets big enough.
   2. Offline: once installed, the app opens with the network off.
   3. Self-update: an installed copy of build A switches itself to build B once B is served, without being reinstalled.
   Builds go to tests/.dist so they never clobber dist/. Screenshots land in tests/shots/. */
import { build, preview } from 'vite';
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = fileURLToPath(new URL('./.dist', import.meta.url));
const shots = fileURLToPath(new URL('./shots/', import.meta.url));
fs.mkdirSync(shots, { recursive: true });
const PORT = 4174;
const URL_ = `http://localhost:${PORT}/linden/`;

let checks = 0, failed = 0;
const ok = (cond, msg) => { checks++; if (!cond) { failed++; console.log('  FAIL', msg); } };

async function buildAs(tag) {
  process.env.LINDEN_BUILD_TAG = tag;
  await build({ root, logLevel: 'silent', build: { outDir, emptyOutDir: true } });
}
const serve = () => preview({ root, logLevel: 'silent', build: { outDir }, preview: { port: PORT, strictPort: true } });

function watchErrors(page) {
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

await buildAs('build-a');
let server = await serve();
const browser = await chromium.launch();

/* ---------- 1. layout */
for (const [w, h] of [[320, 568], [390, 844], [1280, 800]]) {
  for (const scheme of ['light', 'dark']) {
    const name = `${w}x${h}-${scheme}`;
    console.log(name);
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    const errors = watchErrors(page);
    await page.goto(URL_);
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const r = sel => document.querySelector(sel)?.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        hello: r('#hello'), mark: r('.wordmark'), lane: r('#lane'),
        version: document.querySelector('#ver')?.textContent,
        fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family),
      };
    });
    ok(m.overflow <= 0, `${name}: page scrolls sideways by ${m.overflow}px`);
    ok(m.hello && m.hello.height >= 52 && m.hello.right <= w - 16 + 0.5, `${name}: "Hello" button too small or past the gutter`);
    ok(m.mark && m.mark.width > 0 && m.mark.right <= w, `${name}: wordmark missing or clipped`);
    ok(m.lane && m.lane.height >= 180, `${name}: street too short`);
    ok(m.version === 'build-a', `${name}: footer shows "${m.version}"`);
    ok(m.fonts.includes('Besley Variable') && m.fonts.includes('Figtree Variable'), `${name}: fonts not loaded (${m.fonts})`);
    await page.click('#hello');
    await page.waitForTimeout(200);
    ok(errors.length === 0, `${name}: console errors: ${errors.join(' | ')}`);
    await page.screenshot({ path: `${shots}${name}.png`, fullPage: true });
    await ctx.close();
  }
}

/* ---------- 2 + 3. offline start, then self-update */
console.log('offline + update');
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
const errors = watchErrors(page);
await page.goto(URL_);
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload();
ok(await page.evaluate(() => !!navigator.serviceWorker.controller), 'service worker does not control the page after install');

await ctx.setOffline(true);
await page.reload();
ok(await page.locator('.wordmark').isVisible(), 'app does not open offline');
ok(await page.textContent('#ver') === 'build-a', 'offline copy is not build A');
await ctx.setOffline(false);

await server.close();
await buildAs('build-b');
server = await serve();
// The app checks for a new build whenever it comes back to the foreground.
await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
const switched = await page.waitForFunction(() => document.querySelector('#ver')?.textContent === 'build-b', null, { timeout: 20000 })
  .then(() => true, () => false);
ok(switched, 'installed app did not switch itself to build B');
if (switched) ok(await page.textContent('#toast') === 'Linden s-a actualizat.', 'no "updated" toast after the switch');
ok(errors.length === 0, `offline/update: console errors: ${errors.join(' | ')}`);

await ctx.close();
await browser.close();
await server.close();
fs.rmSync(outDir, { recursive: true, force: true });

console.log(`\n${checks} checks, ${failed} failed`);
process.exit(failed ? 1 : 0);
