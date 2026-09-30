import { PLACES, LESSONS, COURSE, place } from '../content/lessons.js';
import { ITEMS } from '../content/items.js';
import { ICONS } from '../art/icons.js';
import { laneSVG, BUILDINGS } from '../art/lane.js';
import { avatar } from '../art/people.js';
import { Store, dueItems, lessonDone, today, isoDate, wordsSeen, isLearned } from '../app/store.js';
import { $, $$, esc, sub, openSheet, closeSheet } from '../app/ui.js';
import { isStandalone } from '../pwa.js';
import { openInstall } from './install.js';

// Home is the street: what to do now (the Today cards), and where you are (Linden Lane, lit windows = lessons done).

export const nextLesson = () => {
  const r = Store.d.resume;
  if (r && LESSONS[r.lesson] && !lessonDone(r.lesson)) return r.lesson;
  return COURSE.find(id => !lessonDone(id)) || null;
};

export function litWindows() {
  const lit = {};
  for (const [id, r] of Object.entries(Store.d.lessons)) if (r.done && LESSONS[id]) (lit[LESSONS[id].place] ||= []).push(LESSONS[id].index);
  return lit;
}

const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Bună seara' : h < 12 ? 'Bună dimineața' : h < 18 ? 'Bună ziua' : 'Bună seara'; };
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

const HELP = ['p.dont-understand', 'p.repeat', 'p.slowly', 'p.what-does-mean'];
function phraseOfDay() {
  const learned = Object.values(ITEMS).filter(x => x.kind === 'phrase' && isLearned(x.id)).map(x => x.id);
  const pool = learned.length ? learned : HELP;
  const d = new Date(), day = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  return ITEMS[pool[day % pool.length]];
}

function week() {
  const now = new Date(), dow = (now.getDay() + 6) % 7; // Monday first
  const days = Array.from({ length: 7 }, (_, k) => { const d = new Date(now); d.setDate(now.getDate() - dow + k); return isoDate(d); });
  const n = days.filter(d => Store.d.days[d]).length;
  return `<div class="week"><span class="wk-l">Săptămâna asta${n ? ` · ${plural(n, 'zi', 'zile')}` : ''}</span>
    <span class="wk-d">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, k) => `<span class="${Store.d.days[days[k]] ? 'on' : ''}${days[k] === today() ? ' today' : ''}"><i></i>${l}</span>`).join('')}</span></div>`;
}

export function renderHome(view) {
  const done = COURSE.filter(lessonDone).length;
  const due = dueItems().length;
  const nextId = nextLesson();
  const L = nextId && LESSONS[nextId], P = L && place(L.place);
  const name = Store.d.profile.name;
  const ph = phraseOfDay();
  let hideInstall = false;
  try { hideInstall = localStorage.getItem('linden.hideInstall') === '1'; } catch {}

  const nextCard = L ? `<button type="button" class="tcard" data-lesson="${L.id}">
      <span class="ti" style="--c:var(${P.color})">${ICONS.window}</span>
      <span class="tt"><b>${Store.d.resume?.lesson === L.id ? 'Continuă' : done ? 'Următoarea' : 'Prima lecție'}: ${esc(L.title)}</b>
      <span>${esc(P.name)} · lecția ${L.index + 1} din ${P.lessons.length} · ≈ 5 min</span></span>
      <span class="chev">${ICONS.chev}</span></button>`
    : `<div class="tcard static"><span class="ti">${ICONS.check}</span><span class="tt"><b>Toate lecțiile sunt terminate.</b><span>Recapitularea continuă în fiecare zi.</span></span></div>`;

  view.innerHTML = `<div class="home">
    <header class="hero">
      <div class="wrap hero-top">
        <h1 class="hello">${greeting()}${name ? `, ${esc(name)}` : ''}</h1>
        ${done ? `<p class="stats">${plural(done, 'lecție terminată', 'lecții terminate')} · ${plural(wordsSeen(), 'cuvânt', 'cuvinte')}</p>` : ''}
      </div>
      <div class="lane-strip" data-strip>${laneSVG(litWindows(), { here: P?.id, vb: '0 30 1440 370' })}</div>
    </header>
    <div class="wrap home-main">
      <p class="lane-lbl"><b>Linden Lane</b><span>Atinge o clădire.</span></p>
      <div class="today">
        ${due ? `<button type="button" class="tcard review" data-review>
          <span class="ti">${ICONS.tea}</span>
          <span class="tt"><b>Recapitulare</b><span>${plural(due, 'cuvânt', 'cuvinte')} · ≈ ${Math.max(1, Math.min(3, Math.ceil(due / 3)))} min</span></span>
          <span class="go">Începe</span></button>` : ''}
        ${nextCard}
      </div>
      <button type="button" class="phrase-day" data-say="${ph.id}">
        <span><small>Fraza zilei</small><b class="en">${esc(sub(ph.en))}</b><span class="r">${esc(sub(ph.ro[0]))}</span></span>
        <span class="spk">${ICONS.speaker}</span></button>
      ${week()}
      ${!isStandalone() && !hideInstall ? `<div class="install-card"><span class="ti">${ICONS.install}</span>
        <span class="tt"><b>Instalează aplicația</b><span>Pe ecranul principal, merge și fără internet.</span></span>
        <button type="button" class="pill-btn" data-install>Cum?</button>
        <button type="button" class="icon-btn sm" data-hide-install aria-label="Ascunde">${ICONS.close}</button></div>` : ''}
    </div>
  </div>`;

  const strip = $('[data-strip]', view);
  const centre = () => {
    const svg = $('svg', strip);
    const x = BUILDINGS[P?.id || 'home'][0] / 1440 * svg.getBoundingClientRect().width;
    strip.scrollLeft = Math.max(0, x - strip.clientWidth / 2);
  };
  requestAnimationFrame(centre);

  strip.addEventListener('click', e => { const b = e.target.closest('.bld'); if (b) openPlace(b.dataset.u); });
  $('[data-install]', view)?.addEventListener('click', openInstall);
  $('[data-hide-install]', view)?.addEventListener('click', e => {
    try { localStorage.setItem('linden.hideInstall', '1'); } catch {}
    e.currentTarget.closest('.install-card').remove();
  });
}

export function openPlace(id) {
  const P = place(id), nextId = nextLesson();
  const face = P.who ? avatar(P.who) : ICONS.street;
  const rows = P.soon ? `<p class="soon">În curând.</p>`
    : `<div class="lessons">${P.lessons.map(lid => {
        const L = LESSONS[lid], d = lessonDone(lid);
        return `<button type="button" class="lrow${d ? ' done' : ''}${lid === nextId ? ' now' : ''}" data-lesson="${lid}"><i></i><b>${esc(L.title)}</b><span>${d ? 'terminată' : '≈ 5 min'}</span></button>`;
      }).join('')}</div><p class="sheet-note">O fereastră aprinsă e o lecție terminată. Poți începe cu oricare.</p>`;
  openSheet(`<div class="sh-head"><span class="face" style="--c:var(${P.color})">${face}</span>
      <div><h3 class="en">${esc(P.name)}</h3><p>${esc(P.ro)} · ${esc(P.sub)}</p></div>
      <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>${rows}`);
}

export { closeSheet };
