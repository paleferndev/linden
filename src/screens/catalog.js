import { EPISODES } from '../content/episodes.js';
import { GAMES } from '../content/games.js';
import { KINDS } from '../content/kinds.js';
import { m } from '../content/dsl.js';
import { ICONS } from '../art/icons.js';
import { $, esc, shuffle } from '../app/ui.js';
import { unlockSpeech } from '../app/sound.js';
import { openFrame, closeFrame } from './frame.js';
import { runChat } from './chat.js';
import { playGame } from './games/index.js';
import { playSignal } from './signal.js';
import { avatars, overlay } from './episode.js';
import { result } from './games/kit.js';

// Profil → Exerciții: every kind of reply and every game, to try on its own. Samples come from the episodes.
// Nothing here changes progress.

const CHAT = new Set(KINDS[0].items.map(([k]) => k));

/** Up to three replies of one kind from the episodes, each with what comes right before it. */
export function samples(kind, max = 3) {
  const found = [];
  for (const e of EPISODES) e.script.forEach((x, i) => {
    if (x.t !== kind) return;
    const before = e.script.slice(0, i).reverse().find(y => ['msg', 'voice'].includes(y.t));
    const lead = kind === 'fix' || kind === 'listen' || kind === 'dictate' ? [e.script[i - 1]] : before ? [before] : [];
    found.push([...lead, { ...x, g: null }]);
  });
  return shuffle(found).slice(0, max).flat();
}

export function tryKind(kind, { onExit }) {
  const item = KINDS.flatMap(g => g.items).find(([k]) => k === kind);
  if (!item) return false;
  let chat = null;
  const F = openFrame({ label: item[1], onExit: () => { chat?.stop(); closeFrame(); onExit(); } });
  F.head(item[1], CHAT.has(kind) ? avatars(['stranger']) : '');
  unlockSpeech();
  const end = async res => {
    F.bar(false);
    await result(F.main, { right: res?.right || 0, total: res?.total || 0, best: 0 }, { lines: `<p class="gi-text">Încercările de aici nu schimbă progresul.</p>` });
    closeFrame();
    onExit();
  };
  if (CHAT.has(kind)) {
    chat = runChat(F.main, [m('stranger', 'Here are a few of these. Just to try.', 'Iată câteva de felul ăsta. Doar de încercare.'), ...samples(kind)], { ep: 1, frame: F, points: [] });
    F.cleanup = () => chat.stop();
    chat.done.then(r => r && end(r));
  } else if (kind === 'signal') {
    const e = EPISODES[0], x = e.script[e.script.length - 1];
    playSignal(F.main, x, { n: 1 }).then(end);
  } else playGame(kind, F.main, {}).then(end);
  return true;
}

export { KINDS };

export function renderCatalog(view) {
  view.innerHTML = `<div class="wrap page">
    <a class="back-link" href="#/profil" data-nav="#/profil">${ICONS.back}Profil</a>
    <h1 class="page-h">Exerciții</h1>
    <p class="page-sub">Fiecare tip de exercițiu și fiecare joc, cu exemple din episoade. Nu schimbă progresul.</p>
    ${KINDS.map(g => `<section class="kinds"><h2 class="sec-h">${esc(g.name)}</h2>
      ${g.items.map(([k, t, d]) => `<button type="button" class="kind-row" data-nav="#/incearca/${k}"><span><b>${esc(t)}</b><span>${esc(d)}</span></span><span class="go">Încearcă</span></button>`).join('')}</section>`).join('')}
  </div>`;
}
