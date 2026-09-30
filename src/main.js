import '@fontsource-variable/besley/wght.css';
import '@fontsource-variable/figtree/wght.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/street.css';
import './styles/home.css';
import './styles/chat.css';
import './styles/games.css';
import { EP } from './content/episodes.js';
import { GAMES } from './content/games.js';
import { ICONS } from './art/icons.js';
import { LEAF } from './art/leaf.js';
import { Store, dueItems, epOpen, epDone, epsDone } from './app/store.js';
import { $, $$, toast, closeSheet } from './app/ui.js';
import { say, setAccent } from './app/sound.js';
import { initPWA, justUpdated } from './pwa.js';
import { renderHome } from './screens/home.js';
import { renderProfile, renderOnboarding, applyTheme } from './screens/pages.js';
import { renderTraining, openTraining, openGame } from './screens/training.js';
import { renderCollections } from './screens/collections.js';
import { renderCatalog, tryKind } from './screens/catalog.js';
import { openEpisode } from './screens/episode.js';
import { closeFrame, frameOpen } from './screens/frame.js';

Store.load();
applyTheme();
setAccent(Store.d.profile.voice);

const TABS = [['home', '#/', ICONS.street, 'Acasă'], ['train', '#/antrenament', ICONS.train, 'Antrenament'], ['coll', '#/colectii', ICONS.album, 'Colecții'], ['me', '#/profil', ICONS.me, 'Profil']];
const app = $('#app');
app.innerHTML = `<div class="shell">
    <nav class="nav" aria-label="Meniu">
      <a class="brand" href="#/" data-nav="#/">${LEAF}<span class="en">Linden</span></a>
      <div class="tabs">${TABS.map(([id, href, icon, label]) => `<a class="tab" href="${href}" data-nav="${href}" data-tab="${id}">${icon}<span>${label}</span><i class="badge" hidden></i></a>`).join('')}</div>
    </nav>
    <main class="view" id="view"></main>
  </div>
  <div class="layer" id="layer" hidden></div>
  <div class="sheet-wrap" id="sheet" hidden></div>`;
const view = $('#view');

/* ---------------------------------------------------------------- routing
   #/ home · #/antrenament · #/colectii[/album|verbe|lanterna] · #/profil · #/exercitii
   Full screen: #/episod/<n> · #/antrenament/start · #/antrenament/liber · #/joc/<game> · #/incearca/<kind>
   In-app navigation pushes history and routes in the same tap, so the first line can be spoken right away (iOS only
   lets a page speak from inside a tap). The back gesture pops the history and closes whatever is full screen. */

let current = null, pushed = false;

export function nav(hash, { replace = false } = {}) {
  if (hash === location.hash || (hash === '#/' && !location.hash)) return route(true);
  history[replace ? 'replaceState' : 'pushState'](null, '', hash);
  pushed = !replace;
  route();
}

function exitFull(to) {
  if (to) { pushed = false; nav(to, { replace: true }); return; }
  if (pushed) { pushed = false; history.back(); }
  else nav('#/', { replace: true });
}

function renderTab(tab, sub) {
  closeSheet();
  $$('.tab', app).forEach(a => a.classList.toggle('on', a.dataset.tab === (tab === 'catalog' ? 'me' : tab)));
  const badge = $('[data-tab="train"] .badge', app), due = dueItems().length;
  badge.hidden = !due;
  badge.textContent = due > 9 ? '9+' : String(due);
  view.dataset.tab = tab;
  if (tab === 'home') renderHome(view);
  if (tab === 'train') renderTraining(view);
  if (tab === 'coll') renderCollections(view, sub);
  if (tab === 'me') renderProfile(view, { onReset: () => { current = null; route(true); } });
  if (tab === 'catalog') renderCatalog(view);
  view.scrollTop = 0;
  window.scrollTo(0, 0);
}

function route(force = false) {
  const hash = location.hash || '#/';
  if (hash === current && !force) return;
  const prev = current;
  current = hash;
  if (frameOpen()) closeFrame();

  if (!Store.d.profile.onboarded) {
    app.classList.add('first');
    renderOnboarding(view, { onDone: () => { app.classList.remove('first'); current = null; nav('#/episod/1', { replace: true }); } });
    return;
  }
  app.classList.remove('first');

  const [, a = '', b] = hash.split('/');
  const under = tab => { if (!prev || prev.split('/')[1] !== ({ home: '', train: 'antrenament', me: 'profil', catalog: 'exercitii' }[tab] ?? tab)) renderTab(tab); };
  if (a === 'episod' && EP[b] && epOpen(+b)) {
    under('home');
    openEpisode(+b, { onExit: r => exitFull(r?.finished ? '#/' : null) });
    return;
  }
  if (a === 'antrenament' && (b === 'start' || b === 'liber')) {
    if (b === 'start' && !dueItems().length && !epsDone()) { nav('#/antrenament', { replace: true }); return; }
    under('train');
    openTraining({ free: b === 'liber', onExit: () => exitFull() });
    return;
  }
  if (a === 'joc' && GAMES[b]) {
    const n = Object.entries(EP).find(([, e]) => e.game === b)?.[0];
    if (!n || !epDone(n)) { nav('#/antrenament', { replace: true }); return; }
    under('train');
    openGame(b, { onExit: () => exitFull() });
    return;
  }
  if (a === 'incearca' && b) {
    under('catalog');
    if (!tryKind(b, { onExit: () => exitFull() })) nav('#/exercitii', { replace: true });
    return;
  }
  const tab = { antrenament: 'train', colectii: 'coll', profil: 'me', exercitii: 'catalog' }[a] || 'home';
  renderTab(tab, b);
}

addEventListener('popstate', () => { pushed = false; route(); });
addEventListener('hashchange', () => route());

// Links and buttons anywhere in the app, and the speaker buttons.
document.addEventListener('click', e => {
  const n = e.target.closest('[data-nav]');
  if (n && !n.disabled) { e.preventDefault(); if (n.closest('#sheet')) closeSheet(); nav(n.dataset.nav); return; }
  const s = e.target.closest('[data-say]');
  if (s && !e.target.closest('#layer')) say(s.dataset.say, { el: s, who: s.dataset.who || undefined });
});

// Coming back to the app on another day: the next episode and the training badge need a fresh look.
let lastDay = new Date().toDateString();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || frameOpen()) return;
  const d = new Date().toDateString();
  if (d !== lastDay) { lastDay = d; route(true); }
});

route();
initPWA({ onOfflineReady: () => toast('Linden merge acum și fără internet.') });
if (justUpdated()) toast('Linden s-a actualizat.');
