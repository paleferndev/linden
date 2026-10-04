/* Checks the season's content without a browser: every episode entry is well formed, every task has a right answer
   that differs from its wrong ones, gaps are where they should be, games and grammar points exist.
   Run: node tests/content.mjs */
import { EPISODES } from '../src/content/episodes.js';
import { GAMES, EP_GAME } from '../src/content/games.js';
import { GRAMMAR } from '../src/content/grammar.js';
import { VERBS } from '../src/content/verbs.js';
import { CAST } from '../src/content/cast.js';
import { TASKS } from '../src/content/dsl.js';
import { VOICED } from '../src/content/voices.js';
import { voiceKey } from '../src/app/voicekey.js';

let problems = 0;
const bad = (where, msg) => { problems++; console.log(`  ${where}: ${msg}`); };
const dup = s => /\b(\w+) \1\b/i.test(s.replace(/’/g, "'"));

export function checkContent(log = console.log) {
  for (const e of EPISODES) {
    const W = `episode ${e.n}`;
    if (!e.title || !e.ro || !e.hook || !e.memory || !e.caption) bad(W, 'missing title, hook, memory or caption');
    if (EP_GAME[e.n] !== e.game) bad(W, `game ${e.game} but EP_GAME says ${EP_GAME[e.n]}`);
    for (const p of e.points) if (!GRAMMAR[p]) bad(W, `unknown grammar point ${p}`);
    let sparks = 0, games = 0, signals = 0, tasks = 0;
    e.script.forEach((x, i) => {
      const at = `${W} #${i}`;
      if (x.t === 'msg' || x.t === 'voice') { if (!CAST[x.who]) bad(at, `unknown speaker ${x.who}`); if (!x.en || !x.ro) bad(at, 'message without English or Romanian'); }
      if (x.t === 'msg' && x.glitch && !x.en.includes(x.glitch)) bad(at, `glitch "${x.glitch}" not in "${x.en}"`);
      if (x.t === 'spark') sparks++;
      if (x.t === 'game') { games++; if (!GAMES[x.set]) bad(at, `unknown game set ${x.set}`); }
      if (x.t === 'signal') { signals++; if (i !== e.script.length - 1) bad(at, 'the signal must be last'); }
      if (x.g && !GRAMMAR[x.g]) bad(at, `unknown grammar point ${x.g}`);
      if (TASKS.has(x.t)) tasks++;
      if (x.t === 'complete') {
        if ((x.text.match(/\{\}/g) || []).length !== 1) bad(at, `needs exactly one gap: ${x.text}`);
        for (const o of [x.right, ...x.wrong.map(w => w.text)]) if (dup(x.text.replace('{}', o))) bad(at, `repeated word with "${o}"`);
      }
      if (['complete', 'choose', 'listen'].includes(x.t)) {
        if (x.wrong.some(w => w.text === x.right)) bad(at, 'a wrong option equals the right one');
        if (x.t !== 'listen' && x.wrong.some(w => !w.why)) bad(at, 'a wrong option has no why');
      }
      if (x.t === 'write' && (x.text.match(/\{\}/g) || []).length !== 1) bad(at, `write needs one gap: ${x.text}`);
      if (x.t === 'fix' && e.script[i - 1]?.glitch == null) bad(at, 'fix without a glitch before it');
      if ((x.t === 'listen' || x.t === 'dictate') && e.script[i - 1]?.t !== 'voice') bad(at, `${x.t} without a voice note before it`);
      if (x.t === 'quiz') for (const q of x.items) if ((q.text.match(/\{\}/g) || []).length !== 1) bad(at, `quiz item needs one gap: ${q.text}`);
      if (x.t === 'signal' && x.en.split(/\s+/).length > 13) bad(at, 'signal longer than 13 words');
    });
    if (sparks !== 1) bad(W, `${sparks} sparks, expected 1`);
    if (games !== 1) bad(W, `${games} games, expected 1`);
    if (signals !== 1) bad(W, `${signals} signals, expected 1`);
    log(`${W}: ${e.script.length} entries, ${tasks} replies`);
  }
  for (const [k, G] of Object.entries(GAMES)) {
    if (G.g && !GRAMMAR[G.g]) bad(`game ${k}`, `unknown grammar point ${G.g}`);
    for (const r of G.rounds || []) {
      if (r.g && !GRAMMAR[r.g]) bad(`game ${k}`, `unknown grammar point ${r.g}`);
      if (r.text && r.right && (r.text.match(/\{\}/g) || []).length !== 1) bad(`game ${k}`, `needs one gap: ${r.text}`);
      if (r.text && r.right) for (const o of [r.right, ...(r.wrong || [])]) if (dup(r.text.replace('{}', o))) bad(`game ${k}`, `repeated word: ${r.text} / ${o}`);
    }
  }
  for (const v of VERBS) if (!v.ro || !v.ex) bad(`verb ${v.base}`, 'missing Romanian or example');
  // every line of the episodes has a recording (lines without one fall back to the phone's voice)
  const missing = [];
  for (const e of EPISODES) for (const x of e.script) {
    const who = x.t === 'signal' ? 'voice' : x.who;
    if (['msg', 'voice', 'signal'].includes(x.t) && !VOICED.has(voiceKey(who, x.en))) missing.push(`episode ${e.n}: ${x.en}`);
  }
  log(`recordings: ${missing.length ? `${missing.length} lines of the episodes have none and use the phone's voice` : 'every line of the episodes has one'}`);
  for (const m of missing.slice(0, 10)) log('  no recording: ' + m);
  return problems;
}

if (process.argv[1]?.endsWith('content.mjs')) {
  const n = checkContent();
  console.log(n ? `\n${n} problems` : '\ncontent OK');
  process.exit(n ? 1 : 0);
}
