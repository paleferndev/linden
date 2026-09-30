# Linden (English course for Romanian speakers)

If `HANDOFF.md` exists locally, read it first. It holds the full context, the design proposal and the open decisions.

- **This repo is public.** Never commit private info: people's names or relationships, e-mail addresses, private links, local paths. `HANDOFF.md`, `design/` and `private/` are local-only and gitignored; keep notes like that there. Check staged files before every commit.
- **Deploy only when the user says so.** `npm run deploy` changes the app on real phones.
- **Tests and previews are silent.** Open the app with `?mute` (e.g. http://localhost:5180/linden/?mute); Playwright contexts get `addInitScript(silence)` from `tests/walk.mjs`. Never play the voice out loud.
- **The app** is an installable web app (PWA) built with Vite 6 (Node on this PC is 22.11; Vite 7+ needs 22.12). Live at https://paleferndev.github.io/linden/ from the `gh-pages` branch.
  - `npm run dev` serves on port 5180. `npm test` builds and checks everything (~2 min): first open, the tabs at phone and desktop sizes in light and dark, every lesson played end to end at 390×844 and 320×568 (nothing may overflow or scroll inside a step), a review session, offline start, and the self-update from build A to B. `node tests/walk.mjs <url> --shots [--big|--small] [lesson ids]` screenshots every step to `tests/shots/walk/`.
  - `npm run deploy` refuses uncommitted changes, runs the tests, builds, commits `dist/` to `gh-pages`, pushes, and asks GitHub for a Pages build (a push alone doesn't always trigger one).
- **Code map**
  - `src/content/`: `items.js` (every word and phrase; ids are permanent), `lessons.js` (places, the course order, each lesson's steps), `traps.js` (Capcane pentru români).
  - `src/app/`: `store.js` (progress in localStorage key `linden`, `migrate()` forward-only, Leitner boxes), `sound.js` (the voice at normal/slow speed and the three tones), `ui.js` (helpers, sheet, toast, respellings).
  - `src/screens/`: `run.js` (the lesson frame and every step type; also runs reviews), `review.js` (drills over what is due), `home.js` (the street and Today cards), `pages.js` (Recapitulare, Fraze, Profil, first open), `install.js`.
  - `src/art/`: the drawings (`lane.js` the street, `scenes.js` the café, the room at No. 1 and Priya's shop, `people.js`, `things.js`, `icons.js`). `npm run icons` regenerates `public/icons/` from the leaf.
  - `src/pwa.js` applies new builds on open or return to foreground, unless `setBusy(true)` (a lesson or review is open).
  - All project sites of the GitHub user share one origin, so namespace every storage key with `linden`.
- **Adding a lesson:** add its items to `items.js`, its steps to `lessons.js` (see the step list at the top of that file) and its id to the place and to `COURSE`. Run `npm test`: the walk plays it at both phone sizes.
- **Copy:** the UI is Romanian and says only what's needed, plainly. No cute or cheerleading lines. English is always set in Besley (`.en`); if it's in the serif, it's English.
- **The old app** is `legacy/engleza.html`, with its tests (`npm run test:legacy` after `npm --prefix legacy/test install`). Its content ids live on in `items.js`.
- The design exploration is in `design/` (local only). Edit `design/src/*`, then run `python design/build.py`. Never hand-edit `design/tei.html` or `design/dist/`.
