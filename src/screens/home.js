import { EP, EPISODES, LIT } from '../content/episodes.js';
import { VERBS } from '../content/verbs.js';
import { ICONS } from '../art/icons.js';
import { laneSVG, BUILDINGS } from '../art/lane.js';
import { stranger, moss, lanternSVG } from '../art/stranger.js';
import { artBox, face } from '../art/art.js';
import { Store, dueItems, epDone, epsDone, epOpen, nextEp, today, isoDate } from '../app/store.js';
import { $, esc, plural } from '../app/ui.js';
import { isStandalone } from '../pwa.js';
import { openInstall } from './install.js';

// Home is the street at night: where the story is (lit windows are finished episodes, the Stranger waits outside No. 1
// with a lantern as bright as the sparks it has back), the next episode, today's training, and the season.

export function litWindows() {
  const lit = {};
  for (const n of Object.keys(EP)) if (epDone(n)) { const [u, i] = LIT[n]; (lit[u] ||= []).push(i); }
  return lit;
}

/** The street, with the Stranger by the door of No. 1 and the linden glowing a little more with every spark. */
export function streetSVG(vb = '0 30 1440 370', par) {
  const n = epsDone();
  const over = n >= 12 ? '' : `<g transform="translate(200 246) scale(.52)">${stranger(n ? 'happy' : 'calm', { light: .08 + n / 12 * .9 })}</g>`;
  const mr = n >= 9 ? `<g transform="translate(1136 278) scale(.34)">${moss({ awake: n < 12 })}</g>` : '';
  return laneSVG(litWindows(), { vb, par }).replace(/<\/svg>\s*$/, `<circle class="treeglow" cx="546" cy="206" r="${70 + n * 6}" fill="var(--spark)" opacity="${.06 + n * .02}"/>${[[530, 196], [560, 222], [536, 236], [566, 186], [512, 222], [548, 168]].slice(0, Math.ceil(n / 2)).map(([x, y]) => `<circle cx="${x}" cy="${y + 8}" r="2.6" fill="var(--spark)"/>`).join('')}${over}${mr}</svg>`);
}

const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Bună seara' : h < 12 ? 'Bună dimineața' : h < 18 ? 'Bună ziua' : 'Bună seara'; };

function week() {
  const now = new Date(), dow = (now.getDay() + 6) % 7; // Monday first
  const days = Array.from({ length: 7 }, (_, k) => { const d = new Date(now); d.setDate(now.getDate() - dow + k); return isoDate(d); });
  const n = days.filter(d => Store.d.days[d]).length;
  return `<div class="week"><span class="wk-l">Săptămâna asta${n ? ` · ${plural(n, 'seară', 'seri')}` : ''}</span>
    <span class="wk-d">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, k) => `<span class="${Store.d.days[days[k]] ? 'on' : ''}${days[k] === today() ? ' today' : ''}"><i></i>${l}</span>`).join('')}</span></div>`;
}

export function renderHome(view) {
  const done = epsDone(), due = dueItems().length, next = nextEp();
  const E = next && EP[next], resume = Store.d.resume?.ep === next;
  const name = Store.d.profile.name;
  let hideInstall = false;
  try { hideInstall = localStorage.getItem('linden.hideInstall') === '1'; } catch {}
  const verbs = Object.keys(Store.d.verbs).length;

  const nextCard = E ? `<button type="button" class="ep-card" data-nav="#/episod/${E.n}">
      ${artBox('ep:' + E.n, 'ep-art')}
      <span class="ep-b"><small class="kick">${resume ? 'Continuă' : done ? 'Următorul' : 'Primul'} · episodul ${E.n} din 12</small>
        <b class="en">${esc(E.title)}</b><span class="ep-ro">${esc(E.ro)}</span>
        ${EP[E.n - 1] ? `<span class="ep-hook">${esc(EP[E.n - 1].hook)}</span>` : ''}</span>
      <span class="go">${resume ? 'Continuă' : 'Joacă'}</span></button>`
    : `<div class="ep-card done">${artBox('panel:12', 'ep-art')}<span class="ep-b"><small class="kick">Sezonul unu</small><b>Toate cele douăsprezece episoade sunt terminate.</b><span class="ep-ro">Orice episod se poate juca din nou.</span></span></div>`;

  view.innerHTML = `<div class="home">
    <header class="hero night">
      <div class="wrap hero-top">
        <h1 class="hello">${greeting()}${name ? `, ${esc(name)}` : ''}</h1>
        <p class="stats">${done ? `${plural(done, 'episod', 'episoade')} din 12 · ${plural(done, 'scânteie', 'scântei')}` : 'Linden Lane, noaptea'}</p>
      </div>
      <div class="lane-strip" data-strip>${streetSVG()}</div>
    </header>
    <div class="wrap home-main">
      ${nextCard}
      <div class="side">
        ${due ? `<button type="button" class="tcard" data-nav="#/antrenament/start"><span class="ti night">${face('stranger')}</span>
          <span class="tt"><b>Antrenament</b><span>${plural(due, 'lucru', 'lucruri')} de repetat · ≈ 5 min</span></span><span class="go">Începe</span></button>` : ''}
        <div class="season" aria-label="Sezonul unu">${EPISODES.map(e => {
          const d = epDone(e.n), o = epOpen(e.n), lamps = Store.d.eps[e.n]?.lamps || 0;
          return `<button type="button" class="se${d ? ' done' : ''}${e.n === next ? ' now' : ''}" ${o ? `data-nav="#/episod/${e.n}"` : 'disabled'} aria-label="Episodul ${e.n}"><b>${e.n}</b>${d ? `<span class="l3">${[0, 1, 2].map(k => `<i${k < lamps ? ' class="on"' : ''}></i>`).join('')}</span>` : ''}</button>`;
        }).join('')}</div>
        <div class="counts">
          <a class="cnt" href="#/colectii/album" data-nav="#/colectii/album"><b>${done}<small>/12</small></b><span>Album</span></a>
          <a class="cnt" href="#/colectii/verbe" data-nav="#/colectii/verbe"><b>${verbs}<small>/${VERBS.length}</small></b><span>Verbe</span></a>
          <a class="cnt" href="#/colectii/lanterna" data-nav="#/colectii/lanterna"><span class="cnt-l night">${lanternSVG(done)}</span><b>${done}<small>/12</small></b><span>Scântei</span></a>
        </div>
        ${week()}
        ${!isStandalone() && !hideInstall ? `<div class="install-card"><span class="ti">${ICONS.install}</span>
          <span class="tt"><b>Instalează aplicația</b><span>Pe ecranul principal, merge și fără internet.</span></span>
          <button type="button" class="pill-btn" data-install>Cum?</button>
          <button type="button" class="icon-btn sm" data-hide-install aria-label="Ascunde">${ICONS.close}</button></div>` : ''}
      </div>
    </div>
  </div>`;

  const strip = $('[data-strip]', view);
  requestAnimationFrame(() => {
    const svg = $('svg', strip);
    const x = BUILDINGS.home[0] / 1440 * svg.getBoundingClientRect().width;
    strip.scrollLeft = Math.max(0, x - strip.clientWidth / 3);
  });
  $('[data-install]', view)?.addEventListener('click', openInstall);
  $('[data-hide-install]', view)?.addEventListener('click', e => {
    try { localStorage.setItem('linden.hideInstall', '1'); } catch {}
    e.currentTarget.closest('.install-card').remove();
  });
}
