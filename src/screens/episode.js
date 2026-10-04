import { EP } from '../content/episodes.js';
import { GRAMMAR } from '../content/grammar.js';
import { GAMES } from '../content/games.js';
import { CAST, nameOf } from '../content/cast.js';
import { face, artBox } from '../art/art.js';
import { Store, record, saveResume, finishEpisode, epDone } from '../app/store.js';
import { $, esc, hook } from '../app/ui.js';
import { unlockSpeech } from '../app/sound.js';
import { openFrame, closeFrame } from './frame.js';
import { runChat } from './chat.js';
import { playGame } from './games/index.js';
import { playSignal } from './signal.js';
import { playEnding } from './ending.js';

// An episode, from its cover to its ending: the cover (what happened last time), the chat, the game and the signal
// on top of the chat when their turn comes, then the ending. Progress is saved at every reply, so closing the app
// mid-episode picks up at the same place.

export const avatars = who => who.map(w => `<span class="ava" style="--c:var(${CAST[w]?.bg || '--sunk'})">${face(w)}</span>`).join('');

/** Runs something on a layer over the chat and removes the layer after. */
export async function overlay(main, fn) {
  const el = document.createElement('div');
  el.className = 'ovl';
  main.appendChild(el);
  main.classList.add('covered');
  try { return await fn(el); } finally { el.remove(); main.classList.remove('covered'); }
}

export function openEpisode(n, { onExit, demo = false }) {
  const e = EP[n];
  const r = Store.d.resume?.ep === n ? Store.d.resume : null;
  let chat = null;
  const F = openFrame({ label: `Episodul ${n}`, onExit: () => { chat?.stop(); closeFrame(); onExit(); } });
  F.head(`Episodul ${n}`);
  F.bar(true);
  const prev = EP[n - 1];
  F.main.innerHTML = `<div class="cover"><div class="cv-scroll">
    ${artBox('ep:' + n, 'cv-art')}
    <div class="cv-body">
      <p class="kick">Episodul ${n} din 12${epDone(n) ? ' · terminat' : ''}</p>
      <h1 class="en">${esc(e.title)}</h1><p class="cv-ro">${esc(e.ro)}</p>
      ${prev ? `<p class="cv-prev"><b>Data trecută.</b> ${esc(prev.hook)}</p>` : ''}
      <dl class="cv-learn"><div><dt>Gramatică</dt><dd>${e.points.map(p => esc(GRAMMAR[p].title)).join(' · ')}</dd></div><div><dt>Joc</dt><dd>${esc(GAMES[e.game].title)}</dd></div></dl>
    </div></div>
    <div class="cv-act">${r ? `<button type="button" class="btn" data-go="resume" data-enter>Continuă</button><button type="button" class="btn ghost" data-go="start">De la început</button>`
        : `<button type="button" class="btn" data-go="start" data-enter>${epDone(n) ? 'Joacă din nou' : 'Începe'}</button>`}</div>
  </div>`;
  hook({ act: 'go', sel: '.cover [data-go]' });
  F.main.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
    unlockSpeech();
    start(b.dataset.go === 'resume' && r ? r : null);
  }));

  function start(from) {
    F.head(e.chat, avatars(e.cast));
    const rec = (g, ok) => { if (!demo && g) record('g:' + g, ok); };
    chat = runChat(F.main, e.script, {
      ep: n, frame: F, points: e.points, start: from?.at || 0, right: from?.right || 0, total: from?.total || 0,
      record: rec,
      onSave: (at, right, total) => { if (!demo) saveResume(n, at, right, total); },
      onGame: x => overlay(F.main, el => playGame(x.set, el, { record: rec, recordVerb: (v, ok) => { if (!demo) record('v:' + v, ok); } })),
      onSignal: x => overlay(F.main, el => playSignal(el, x, { n })),
    });
    F.cleanup = () => chat.stop();
    chat.done.then(async res => {
      if (!res) return;
      Store.save();
      const fin = demo ? { lamps: 3, verbs: [] } : finishEpisode(n, res.right, res.total);
      F.head(`Episodul ${n}`);
      F.bar(false);
      await playEnding(F.main, n, { lamps: fin.lamps, verbs: fin.verbs, demo });
      closeFrame();
      onExit({ finished: n });
    });
  }
}

export { nameOf };
