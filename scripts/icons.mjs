// Renders the app icons from the leaf logo into public/icons/. Run `npm run icons` after changing the logo; the files are committed.
import { chromium } from 'playwright';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LEAF } from '../src/art/leaf.js';

const PAPER = '#F6F3EC', LEAF_GREEN = '#3A7853';
const leaf = LEAF.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
  .replaceAll('var(--leaf)', LEAF_GREEN).replaceAll('var(--paper)', PAPER);
const out = fileURLToPath(new URL('../public/icons/', import.meta.url));
fs.mkdirSync(out, { recursive: true });

fs.writeFileSync(out + 'favicon.svg', leaf.replace(' aria-hidden="true"', ''));

// [file, size in px, share of the square the leaf takes]. Maskable icons get cropped to a circle, so the leaf is smaller.
const PNGS = [['apple-touch-icon.png', 180, .7], ['icon-192.png', 192, .7], ['icon-512.png', 512, .7], ['icon-maskable-512.png', 512, .54]];
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [file, size, share] of PNGS) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<body style="margin:0;width:${size}px;height:${size}px;background:${PAPER};display:grid;place-items:center">
    <div style="width:${size * share}px;height:${size * share}px;transform:rotate(-8deg)">${leaf.replace('<svg ', '<svg width="100%" height="100%" ')}</div></body>`);
  await page.screenshot({ path: out + file });
  console.log('wrote', file);
}
await browser.close();
