import { EP, EPISODES } from '../content/episodes.js';
import { artBox } from '../art/art.js';
import { lanternSVG } from '../art/stranger.js';
import { ICONS } from '../art/icons.js';
import { $, $$, esc, sub, wait, reduceMotion, hook } from '../app/ui.js';
import { say, tone, buzz } from '../app/sound.js';
import { epsDone } from '../app/store.js';
import { openVerb } from './book.js';

// The end of an episode: the album picture is drawn, the lamps light up, the lantern takes its new spark and the
// Stranger remembers something, the new verbs go into the album (tap one for its page), and the next episode shows
// as a dark card.

export function playEnding(host, n, { lamps, verbs, demo = false }) {
  const e = EP[n], next = EP[n + 1];
  const sparks = demo ? n : Math.max(n, epsDone());
  host.innerHTML = `<div class="ending night" data-active>
    <div class="en-scroll">
      <figure class="en-panel">${artBox('panel:' + n)}<figcaption><span class="en">${esc(e.caption[0])}</span><small>${esc(e.caption[1])}</small></figcaption></figure>
      <div class="en-title"><p class="kick">Episodul ${n} terminat</p><h2 class="en">${esc(e.title)}</h2></div>
      <div class="en-lamps" aria-label="${lamps} din 3 lămpi">${[0, 1, 2].map(() => '<i></i>').join('')}</div>
      <div class="en-row" data-r><span class="en-art">${lanternSVG(sparks)}</span><div><b>${sparks === 12 ? 'Toate cele douăsprezece scântei' : `Scânteia ${n} din 12`}</b>
        <button type="button" class="mem" data-mem><span class="en">„${esc(e.memory[0])}”</span><small>${esc(e.memory[1])}</small></button></div></div>
      ${verbs.length ? `<div class="en-row" data-r><span class="en-art num">+${verbs.length}</span><div><b>Verbe noi în album</b><span class="vchips">${verbs.map(v => `<button type="button" class="vchip en" data-v="${esc(v.base)}">${esc(v.base)}</button>`).join('')}</span></div></div>` : ''}
      ${next ? `<div class="teaser" data-r><span class="t-sil">${artBox('ep:' + next.n)}</span><div><b>Episodul ${next.n} · <span class="en">${esc(next.title)}</span></b><span>${esc(e.hook)}</span></div></div>`
        : `<div class="teaser" data-r><div><b>Sfârșitul sezonului unu</b><span>${esc(e.hook)}</span></div></div>`}
    </div>
    <div class="en-foot"><button type="button" class="btn" data-done data-enter>Gata</button></div>
  </div>`;
  $$('[data-v]', host).forEach(b => b.addEventListener('click', () => openVerb(b.dataset.v)));
  $('[data-mem]', host).addEventListener('click', ev => say(e.memory[0], { who: 'stranger', el: ev.currentTarget }));
  (async () => {
    const quick = reduceMotion();
    $('.en-panel', host).classList.add('show');
    tone('reveal');
    await wait(quick ? 50 : 800);
    for (const [k, l] of $$('.en-lamps i', host).entries()) { if (k < lamps) { l.classList.add('on'); tone('ok'); buzz(); } await wait(quick ? 30 : 300); }
    for (const r of $$('[data-r]', host)) { r.classList.add('show'); await wait(quick ? 30 : 420); }
    tone('done');
  })();
  hook({ act: 'go', sel: '.ending [data-done]', ending: n });
  return new Promise(resolve => $('[data-done]', host).addEventListener('click', resolve, { once: true }));
}

export const lastEpisode = () => EPISODES.length;
