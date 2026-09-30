import { GRAMMAR, pointsOf } from '../content/grammar.js';
import { VERB, VERBS, pastOf } from '../content/verbs.js';
import { GAMES, EP_GAME } from '../content/games.js';
import { EP } from '../content/episodes.js';
import { m, note, complete, write, quiz, game } from '../content/dsl.js';
import { ICONS } from '../art/icons.js';
import { face } from '../art/art.js';
import { Store, dueItems, learnedItems, record, epDone, epsDone, markDay, addDays, today } from '../app/store.js';
import { $, $$, esc, shuffle, plural } from '../app/ui.js';
import { unlockSpeech } from '../app/sound.js';
import { openFrame, closeFrame } from './frame.js';
import { runChat } from './chat.js';
import { playGame } from './games/index.js';
import { avatars, overlay } from './episode.js';
import { result } from './games/kit.js';

// Training: a short chat with the Stranger built from what is due today (grammar you missed, verbs that are slipping),
// on the same spaced schedule as always, plus free play for every game an episode has unlocked.

const regular = b => /e$/.test(b) ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : b + 'ed';
/** A verb-machine round for any verb: the past, and two real mistakes. */
function verbRound(v) {
  const past = pastOf(v);
  if (v.irregular) return [v.base, past, regular(v.base), v.pp !== past ? v.pp : v.base + 's'];
  const wrong1 = /(pp|tt|gg)ed$/.test(past) ? past.replace(/(\w)\1ed$/, '$1ed') : /ied$/.test(past) ? v.base + 'ed' : v.base;
  return [v.base, past, wrong1, v.base + 'ing'];
}
const single = v => !v.base.includes(' ') && v.base !== 'be';

function sessionScript({ free = false } = {}) {
  const due = dueItems();
  let points = due.filter(id => id.startsWith('g:')).map(id => id.slice(2)).slice(0, 4);
  let verbs = due.filter(id => id.startsWith('v:')).map(id => VERB[id.slice(2)]).filter(single).slice(0, 8);
  const doneEps = Object.keys(EP).map(Number).filter(epDone);
  if (free || (!points.length && !verbs.length)) {
    points = shuffle(doneEps.flatMap(pointsOf)).slice(0, 3);
    verbs = shuffle(VERBS.filter(v => Store.d.verbs[v.base] && single(v))).slice(0, 6);
  }
  const s = [m('stranger', 'Let’s practise. Five minutes, no more.', 'Hai să exersăm. Cinci minute, nu mai mult.')];
  for (const p of points) {
    const G = GRAMMAR[p];
    s.push(note(G.title, G.note[0], G.note[1]));
    for (const [text, right, wrong, why] of shuffle(G.bank).slice(0, 2)) s.push({ ...complete('Completează:', text, right, ...wrong.map(w => [w, why])), g: p });
  }
  if (verbs.length >= 3) {
    s.push(m('stranger', 'Now the verb machine.', 'Acum, mașina de verbe.'));
    s.push({ ...game('machine', 'machine'), rounds: verbs.map(verbRound) });
  } else for (const v of verbs) s.push({ ...write(`Trecutul lui „${v.base}”:`, `${v.base} → {}`, v.past.split(' / ')), g: null, verb: v.base });
  const pool = shuffle((points.length ? points : Object.keys(GRAMMAR).slice(0, 3)).flatMap(p => GRAMMAR[p].bank.map(b => [...b, p])));
  if (pool.length >= 3) s.push({ ...quiz(...pool.slice(0, 3).map(([t, r, w]) => [t, r, w[0]])), g: pool[0][4] });
  s.push(m('stranger', 'Well done. See you tomorrow.', 'Bravo. Pe mâine.'));
  return { script: s, points, verbs };
}

export function openTraining({ free = false, onExit }) {
  let chat = null;
  const F = openFrame({ label: 'Antrenament', onExit: () => { chat?.stop(); closeFrame(); onExit(); } });
  const { script } = sessionScript({ free });
  F.head('Antrenament', avatars(['stranger']));
  unlockSpeech();
  const rec = (g, ok, x) => x?.verb ? record('v:' + x.verb, ok) : g && record('g:' + g, ok);
  chat = runChat(F.main, script, {
    ep: epsDone() >= 7 ? 8 : 1, frame: F, points: [], record: rec,
    onGame: x => overlay(F.main, el => playGame('machine', el, { rounds: x.rounds, record: () => {}, recordVerb: (v, ok) => record('v:' + v, ok) })),
  });
  F.cleanup = () => chat.stop();
  chat.done.then(async res => {
    if (!res) return;
    markDay(3);
    Store.save();
    F.bar(false);
    await result(F.main, { right: res.right, total: res.total, best: 0 });
    closeFrame();
    onExit();
  });
}

/** Free play of one game, with its best score kept. */
export function openGame(kind, { onExit, demo = false }) {
  const F = openFrame({ label: GAMES[kind].title, onExit: () => { closeFrame(); onExit(); } });
  F.head(GAMES[kind].title);
  unlockSpeech();
  playGame(kind, F.main, { record: (g, ok) => { if (!demo && g) record('g:' + g, ok); }, recordVerb: (v, ok) => { if (!demo) record('v:' + v, ok); } })
    .then(r => {
      if (!demo) { Store.d.games[kind] = Math.max(Store.d.games[kind] || 0, r.right); markDay(2); Store.save(); }
      closeFrame();
      onExit();
    });
}

/* ======================================================================== the tab */

export function renderTraining(view) {
  const due = dueItems();
  const learned = learnedItems();
  const upcoming = learned.map(id => Store.d.srs[id].due).filter(d => d > today()).sort()[0];
  const when = upcoming === addDays(today(), 1) ? 'mâine' : upcoming ? new Date(upcoming + 'T12:00').toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  const label = id => id.startsWith('g:') ? GRAMMAR[id.slice(2)].title : VERB[id.slice(2)].base;
  const games = Object.entries(EP_GAME);
  view.innerHTML = `<div class="wrap page">
    <h1 class="page-h">Antrenament</h1>
    ${due.length ? `<div class="rv-card"><span class="ti">${face('stranger')}</span>
        <div><b>${plural(due.length, 'lucru de repetat', 'lucruri de repetat')}</b><span>O discuție scurtă și o mașină de verbe, cam cinci minute.</span></div>
        <button type="button" class="btn" data-nav="#/antrenament/start" data-enter>Începe</button></div>
      <div class="due-chips">${due.slice(0, 16).map(id => `<span class="dchip${id.startsWith('v:') ? ' en' : ''}">${esc(label(id))}</span>`).join('')}</div>`
    : `<div class="rv-empty"><span class="ti">${face('stranger')}</span><b>Nimic de repetat azi.</b>
        <span>${upcoming ? `Următoarea repetare: ${when}.` : 'Ce înveți în episoade revine aici, la momentul potrivit.'}</span>
        ${epsDone() ? `<button type="button" class="btn ghost" data-nav="#/antrenament/liber">Exersează oricum</button>` : ''}</div>`}
    <h2 class="sec-h">Jocuri</h2>
    <div class="game-grid">${games.map(([n, kind]) => {
      const open = epDone(+n), G = GAMES[kind], best = Store.d.games[kind];
      return open ? `<button type="button" class="gcard" data-nav="#/joc/${kind}"><span class="gn">${n}</span><b>${esc(G.title)}</b><small>${esc(G.teaches)}</small>${best != null ? `<span class="best">record ${best}</span>` : ''}</button>`
        : `<div class="gcard locked"><span class="gn">${n}</span><b>${esc(G.title)}</b><small>după episodul ${n}</small></div>`;
    }).join('')}</div>
    <p class="note">Ce greșești revine a doua zi. Ce știi revine după 3, 7, 14 și 30 de zile.</p>
  </div>`;
}
