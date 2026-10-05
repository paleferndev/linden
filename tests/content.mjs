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
import { VERB_BOOK } from '../src/content/verbbook.js';
import { LESSONS } from '../src/content/lessons.js';

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
  // the book: a page for every verb, a lesson for every grammar point, a lesson behind every note. Romanian stays short
  // (the pages are read at a glance): counted in words, English in backticks included.
  const ticks = s => (String(s).match(/`/g) || []).length % 2 === 0;
  const words = s => String(s).trim().split(/\s+/).length;
  const short = (W, s, max, what) => { if (!ticks(s)) bad(W, `unpaired backtick: ${s}`); if (words(s) > max) bad(W, `${what} longer than ${max} words: ${s}`); };
  const TENSE = new Set(['ps', 'pc', 'past', 'pp', 'will', 'going', 'can', 'imp']);
  for (const v of VERBS) {
    const p = VERB_BOOK[v.base], W = `verb page ${v.base}`;
    if (!p) { bad(W, 'missing'); continue; }
    if (!p.s || !p.ing || !(p.means?.length >= 1 && p.means.length <= 3)) bad(W, 'needs s, ing and 1–3 meanings');
    for (const [ro, en] of p.means || []) { short(W, ro, 5, 'meaning'); if (!en) bad(W, `meaning without example: ${ro}`); }
    if (p.tip) short(W, p.tip, 12, 'tip');
    if (p.ex?.length !== 5) bad(W, `needs 5 examples, has ${p.ex?.length}`);
    for (const t of ['ps', 'past', 'pp']) if (!p.ex?.some(x => x[0] === t)) bad(W, `no ${t} example`);
    for (const [t, en, ro] of p.ex || []) if (!TENSE.has(t) || !en || !ro) bad(W, `bad example: ${t} ${en}`);
    if (!p.phrases?.length || !p.traps?.length) bad(W, 'needs phrases and traps');
    for (const [, , why] of p.traps || []) short(W, why, 8, 'why');
  }
  for (const k of Object.keys(VERB_BOOK)) if (!VERBS.some(v => v.base === k)) bad(`verb page ${k}`, 'not a verb of the season');
  const BLOCK = { forms: b => b.rows?.length, turn: b => b.from && b.to, formula: b => b.parts?.length >= 2, pair: b => b.items?.length >= 2, grid: b => b.cols?.length && b.rows?.length, words: b => b.items?.length, tip: b => b.ro };
  for (const k of Object.keys(GRAMMAR)) {
    const L = LESSONS[k], W = `lesson ${k}`;
    if (!L) { bad(W, 'missing'); continue; }
    if (!L.gist) bad(W, 'needs a gist'); else short(W, L.gist, 9, 'gist');
    if (!(L.blocks?.length >= 2 && L.blocks.length <= 6)) bad(W, `needs 2–6 blocks, has ${L.blocks?.length}`);
    for (const b of L.blocks || []) {
      if (!BLOCK[b.t]?.(b)) bad(W, `bad block: ${JSON.stringify(b).slice(0, 80)}`);
      if (b.title) short(W, b.title, 5, 'title');
      if (b.t === 'tip') short(W, b.ro, 12, 'tip');
      if (b.note) short(W, b.note, 7, 'note');
    }
    if (!(L.ex?.length >= 3) || !(L.traps?.length >= 2)) bad(W, 'needs examples and traps');
    for (const [, , why] of L.traps || []) short(W, why, 8, 'why');
  }
  for (const e of EPISODES) for (const x of e.script) if (x.t === 'note' && !LESSONS[x.g]) bad(`episode ${e.n}`, `note "${x.title}" has no lesson (wrap it in g(point, note(…)))`);
  // every line of the episodes has a recording (lines without one fall back to the phone's voice)
  const missing = [];
  for (const e of EPISODES) for (const x of e.script) {
    const who = x.t === 'signal' ? x.who || 'voice' : x.who;
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
