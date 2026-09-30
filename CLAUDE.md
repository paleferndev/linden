# Linden (English course for Romanian speakers)

If `HANDOFF.md` exists locally, read it first. It holds the full context, the design proposal and the open decisions.

- **This repo is public.** Never commit private info: people's names or relationships, e-mail addresses, private links, local paths. `HANDOFF.md`, `design/` and `private/` are local-only and gitignored; keep notes like that there. Check staged files before every commit.
- **The app** is an installable web app (PWA) built with Vite 6 (Node on this PC is 22.11; Vite 7+ needs 22.12). Live at https://paleferndev.github.io/linden/ from the `gh-pages` branch.
  - `npm run dev` for development, `npm test` for the smoke test (layout at 320×568 / 390×844 / 1280×800 in light and dark, offline start, self-update from build A to B), `npm run deploy` to publish (it refuses uncommitted changes, runs the tests, builds, commits `dist/` to `gh-pages` and pushes).
  - `src/pwa.js` applies new builds on open or return to foreground, unless `setBusy(true)` (mid-lesson). Keep that guard when adding lesson screens.
  - `src/speech.js` wraps `speechSynthesis` (en-GB preferred). Every phrase goes through `speak()`, so recorded audio can replace it later.
  - `src/art/` holds the illustration kit ported from the design (`laneSVG`, `cat`, the leaf). `npm run icons` regenerates `public/icons/` from the leaf.
  - All project sites of the GitHub user share one origin, so namespace every storage key with `linden`.
- **The old app** is `legacy/engleza.html`: one offline HTML file, progress in `localStorage` key `epcp`. Keep its `Store.migrate()` forward-only and content ids permanent when porting. Its tests: `npm run test:legacy` (after `npm --prefix legacy/test install`).
- The design exploration is in `design/` (local only). Edit `design/src/*`, then run `python design/build.py`. Never hand-edit `design/tei.html` or `design/dist/`.
- The app's UI copy is Romanian. English content is always set in the English typeface (Besley); if it's in the serif, it's English.
