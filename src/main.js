import '@fontsource-variable/besley/wght.css';
import '@fontsource-variable/figtree/wght.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/street.css';
import './styles/home.css';
import './styles/run.css';
import { LESSONS } from './content/lessons.js';
import { ICONS } from './art/icons.js';
import { LEAF } from './art/leaf.js';
import { Store, dueItems } from './app/store.js';
import { $, $$, toast, closeSheet } from './app/ui.js';
import { say, setAccent } from './app/sound.js';
import { initPWA, justUpdated } from './pwa.js';
import { renderHome } from './screens/home.js';
import { renderReviewTab, renderPhrases, renderProfile, renderOnboarding, applyTheme } from './screens/pages.js';
import { openRun, closeRun, runOpen } from './screens/run.js';
import { reviewSteps } from './screens/review.js';

Store.load();
applyTheme();
setAccent(Store.d.profile.voice);

const TABS = [['home', '#/', ICONS.street, 'Acasă'], ['review', '#/recapitulare', ICONS.tea, 'Recapitulare'], ['phrases', '#/fraze', ICONS.phrases, 'Fraze'], ['me', '#/profil', ICONS.me, 'Profil']];
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
   Hash routes: #/ home · #/recapitulare · #/fraze · #/profil · #/lectie/<id> · #/recap (a review session).
   In-app navigation pushes history and routes in the same tap, so the first English line can be spoken right away
   (iOS only lets a page speak from inside a tap). The back gesture pops the history and closes a lesson. */

let current = null, pushed = false;

export function nav(hash, { replace = false } = {}) {
  if (hash === location.hash || (hash === '#/' && !location.hash)) return route(true);
  history[replace ? 'replaceState' : 'pushState'](null, '', hash);
  pushed = !replace;
  route();
}

function exitRun() {
  if (pushed) { pushed = false; history.back(); }
  else nav('#/', { replace: true });
}

function renderTab(tab) {
  closeSheet();
  $$('.tab', app).forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  const badge = $('[data-tab="review"] .badge', app), due = dueItems().length;
  badge.hidden = !due;
  badge.textContent = due > 9 ? '9+' : String(due);
  view.dataset.tab = tab;
  if (tab === 'home') renderHome(view);
  if (tab === 'review') renderReviewTab(view);
  if (tab === 'phrases') renderPhrases(view);
  if (tab === 'me') renderProfile(view, { onReset: () => { current = null; route(true); } });
  view.scrollTop = 0;
  window.scrollTo(0, 0);
}

function route(force = false) {
  const hash = location.hash || '#/';
  if (hash === current && !force) return;
  const prev = current;
  current = hash;

  if (!Store.d.profile.onboarded) {
    if (runOpen()) closeRun();
    app.classList.add('first');
    renderOnboarding(view, { onDone: () => { app.classList.remove('first'); current = null; nav('#/lectie/' + 'h.known', { replace: true }); } });
    return;
  }
  app.classList.remove('first');

  const [, a = '', b] = hash.split('/');
  if (a === 'lectie' && LESSONS[b]) {
    if (!prev || prev.startsWith('#/lectie/') || prev === '#/recap') renderTab('home');
    if (runOpen()) closeRun();
    const L = LESSONS[b], r = Store.d.resume;
    const start = r?.lesson === b && r.step > 0 && r.step < L.steps.length ? r.step : 0;
    openRun({ kind: 'lesson', lessonId: b, title: L.title, steps: [...L.steps, { t: 'done' }], start, onExit: exitRun });
    return;
  }
  if (a === 'recap') {
    const steps = reviewSteps();
    if (steps.length < 2) { toast('Nimic de repetat azi.'); nav('#/recapitulare', { replace: true }); return; }
    if (!prev || prev.startsWith('#/lectie/')) renderTab('review');
    if (runOpen()) closeRun();
    openRun({ kind: 'review', title: 'Recapitulare', steps, onExit: exitRun });
    return;
  }
  if (runOpen()) closeRun();
  renderTab({ recapitulare: 'review', fraze: 'phrases', profil: 'me' }[a] || 'home');
}

addEventListener('popstate', () => { pushed = false; route(); });
addEventListener('hashchange', () => route());

// Links and buttons anywhere in the app: tabs, lesson cards, the review card, and the speaker buttons.
document.addEventListener('click', e => {
  const n = e.target.closest('[data-nav]');
  if (n) { e.preventDefault(); nav(n.dataset.nav); return; }
  const l = e.target.closest('[data-lesson]');
  if (l && !e.target.closest('#layer')) { closeSheet(); nav('#/lectie/' + l.dataset.lesson); return; }
  if (e.target.closest('[data-review]')) { nav('#/recap'); return; }
  const s = e.target.closest('[data-say]');
  if (s && !e.target.closest('#layer')) say(s.dataset.say, { el: s });
});

// Coming back to the app on another day: the Today cards and the review badge need a fresh look.
let lastDay = new Date().toDateString();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible' || runOpen()) return;
  const d = new Date().toDateString();
  if (d !== lastDay) { lastDay = d; route(true); }
});

route();
initPWA({ onOfflineReady: () => toast('Linden merge acum și fără internet.') });
if (justUpdated()) toast('Linden s-a actualizat.');
