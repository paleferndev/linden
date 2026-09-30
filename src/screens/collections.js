import { EPISODES } from '../content/episodes.js';
import { VERBS, pastOf } from '../content/verbs.js';
import { ICONS } from '../art/icons.js';
import { artBox } from '../art/art.js';
import { lanternSVG } from '../art/stranger.js';
import { Store, epDone, epsDone } from '../app/store.js';
import { $, $$, esc, openSheet, closeSheet } from '../app/ui.js';
import { say } from '../app/sound.js';

// Colecții: what the season has given you. The album (a picture for every finished episode), the verb album (every
// verb met, with its forms and the line where it came up), and the lantern with the Stranger's memories.

const TABS = [['album', 'Album'], ['verbe', 'Verbe'], ['lanterna', 'Amintiri']];
let verbFilter = 'all';

export function renderCollections(view, tab = 'album') {
  if (!TABS.some(([k]) => k === tab)) tab = 'album';
  const done = epsDone();
  const got = VERBS.filter(v => Store.d.verbs[v.base]);
  view.innerHTML = `<div class="wrap page">
    <h1 class="page-h">Colecții</h1>
    <div class="seg" role="tablist">${TABS.map(([k, l]) => `<button type="button" role="tab" data-nav="#/colectii/${k}" aria-pressed="${k === tab}">${l}</button>`).join('')}</div>
    <div data-body></div>
  </div>`;
  const body = $('[data-body]', view);

  if (tab === 'album') {
    body.innerHTML = `<p class="page-sub">${done} din 12 imagini. Atinge una ca s-o vezi mare.</p>
      <div class="album">${EPISODES.map(e => epDone(e.n)
        ? `<button type="button" class="alb" data-ep="${e.n}">${artBox('panel:' + e.n)}<span class="cap"><i>${e.n}</i><span class="en">${esc(e.caption[0])}</span></span></button>`
        : `<div class="alb locked"><span class="q">${e.n}</span></div>`).join('')}</div>`;
    $$('[data-ep]', body).forEach(b => b.addEventListener('click', () => {
      const e = EPISODES[+b.dataset.ep - 1];
      const sheet = openSheet(`<div class="sh-head plain"><div><h3 class="en">${esc(e.title)}</h3><p>Episodul ${e.n} · ${esc(e.ro)}</p></div>
        <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>
        <figure class="alb-big">${artBox('panel:' + e.n)}<figcaption><button type="button" class="say-row" data-cap>${esc(e.caption[0])}${ICONS.speaker}</button><small>${esc(e.caption[1])}</small></figcaption></figure>
        <button type="button" class="btn ghost" data-nav="#/episod/${e.n}">Joacă din nou episodul</button>`);
      $('[data-cap]', sheet).addEventListener('click', ev => say(e.caption[0], { el: ev.currentTarget }));
      $('[data-nav]', sheet).addEventListener('click', () => closeSheet());
    }));
  }

  if (tab === 'verbe') {
    const shown = verbFilter === 'irr' ? VERBS.filter(v => v.irregular) : VERBS;
    body.innerHTML = `<p class="page-sub">${got.length} din ${VERBS.length} verbe. Atinge un verb ca să-l auzi.</p>
      <div class="seg-chips">${[['all', 'Toate'], ['irr', 'Neregulate']].map(([k, l]) => `<button type="button" class="${verbFilter === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('')}</div>
      ${EPISODES.map(e => {
        const vs = shown.filter(v => v.ep === e.n);
        if (!vs.length) return '';
        if (!epDone(e.n)) return `<p class="v-locked">Episodul ${e.n} · ${vs.length === 1 ? 'un verb' : `${vs.length} verbe`}</p>`;
        return `<h3 class="v-ep">Episodul ${e.n} · <span class="en">${esc(e.title)}</span></h3><div class="verbs">${vs.map(v => `<button type="button" class="vcard${v.irregular ? ' irr' : ''}" data-v="${esc(v.base)}"><b class="en">${esc(v.base)}</b><span class="forms en">${esc(v.past)}${v.pp !== pastOf(v) || v.base === 'be' ? ` · ${esc(v.pp)}` : ''}</span><small>${esc(v.ro)}</small><span class="ex en" hidden>${esc(v.ex)}</span></button>`).join('')}</div>`;
      }).join('')}`;
    $$('[data-f]', body).forEach(b => b.addEventListener('click', () => { verbFilter = b.dataset.f; renderCollections(view, 'verbe'); }));
    $$('[data-v]', body).forEach(b => b.addEventListener('click', () => {
      const v = VERBS.find(x => x.base === b.dataset.v);
      $$('.vcard .ex', body).forEach(x => { x.hidden = x.parentElement !== b; });
      say(`${v.base}. ${v.past.replace(' / ', ', ')}. ${v.pp}. ${v.ex}`, { el: b });
    }));
  }

  if (tab === 'lanterna') {
    body.innerHTML = `<div class="mem-top"><span class="big-lantern night">${lanternSVG(done)}</span>
      <p>${done ? `${done} din 12 scântei. Fiecare i-a adus Străinului o amintire.` : 'Lanterna e goală. Prima scânteie vine în episodul 1.'}</p></div>
      <ol class="mems">${EPISODES.map(e => epDone(e.n)
        ? `<li><button type="button" class="mem-row" data-m="${e.n}"><i>${e.n}</i><span><span class="en">„${esc(e.memory[0])}”</span><small>${esc(e.memory[1])}</small></span>${ICONS.speaker}</button></li>`
        : `<li class="locked"><i>${e.n}</i><span>…</span></li>`).join('')}</ol>`;
    $$('[data-m]', body).forEach(b => b.addEventListener('click', () => say(EPISODES[+b.dataset.m - 1].memory[0], { who: 'stranger', el: b })));
  }
}
