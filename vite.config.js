import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const git = cmd => { try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };

// Shown in the app's footer, so we can tell which build a phone is running. Tests pass their own tag.
const VERSION = process.env.LINDEN_BUILD_TAG
  || [pkg.version, new Date().toISOString().slice(0, 10), git('git rev-parse --short HEAD')].filter(Boolean).join(' · ');

const PAPER = '#F6F3EC';
const SKY = '#CDE2E6'; // the top of every screen is the sky over the street

export default defineConfig({
  base: '/linden/',
  define: { __VERSION__: JSON.stringify(VERSION) },
  build: { target: ['es2020', 'safari14'] },
  server: { port: 5173, strictPort: true },
  plugins: [
    VitePWA({
      registerType: 'prompt', // src/pwa.js decides when to apply an update
      injectRegister: false,
      includeAssets: ['icons/favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        id: '/linden/',
        name: 'Linden',
        short_name: 'Linden',
        description: 'Engleză ilustrată, cu sunet, câte cinci minute pe zi.',
        lang: 'ro',
        start_url: '/linden/',
        scope: '/linden/',
        display: 'standalone',
        background_color: PAPER,
        theme_color: SKY,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
