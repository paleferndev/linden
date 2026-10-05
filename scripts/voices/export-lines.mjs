// Every English line the app speaks, with who says it, as the list the recorder works from.
// Run: node scripts/voices/export-lines.mjs <out.json>
import fs from 'node:fs';
import { EPISODES } from '../../src/content/episodes.js';
import { GAMES } from '../../src/content/games.js';
import { CAST } from '../../src/content/cast.js';
import { VERBS, formsLine } from '../../src/content/verbs.js';
import { VERB_BOOK } from '../../src/content/verbbook.js';
import { LESSONS } from '../../src/content/lessons.js';
import { voiceKey } from '../../src/app/voicekey.js';

// What the voice says where the script has the learner's name: the name is left out, or replaced where needed.
const NAME_SAY = {
  'Yes. He lived at No. 1 for a year. Your house, {name}. He was my best friend.': 'Yes. He lived at No. 1 for a year. Your house, dear. He was my best friend.',
  'The warmest place I know is No. 1. {name}’s house.': 'The warmest place I know is No. 1. My friend’s house.',
};
const sayOf = text => NAME_SAY[text] ?? text.replace(/,\s*\{name\}(?=[.!?,])/g, '').replace(/\{name\},\s*/g, '').replace(/\s*\{name\}/g, '');

const lines = new Map();
const add = (who, text, kind, strict = false) => {
  const key = voiceKey(who, text);
  if (!lines.has(key)) lines.set(key, { key, who: who || 'narrator', text, say: sayOf(text), kind, strict });
  else if (strict) lines.get(key).strict = true;
};

// the in-character reactions to a wrong reply (first: they come up in every episode)
for (const [who, c] of Object.entries(CAST)) for (const [en] of c.huh || []) if (who !== 'mimi') add(who, en, 'reaction');
// the episodes: messages, voice notes (typed back in dictation, so they must be exact), the radio signals
for (const e of EPISODES) {
  let last = 'stranger';
  for (const x of e.script) {
    if (x.t === 'msg') { add(x.who, x.en, 'message'); if (x.who !== 'mimi') last = x.who; }
    if (x.t === 'voice') add(x.who, x.en, 'voice note', true);
    if (x.t === 'signal') add('voice', x.en, 'signal', true);
    // a wrong reply's own reaction is said by whoever spoke last
    for (const w of x.wrong || []) if (w.re) add(last, w.re[0], 'reaction');
  }
  add('stranger', e.memory[0], 'memory');
  add('narrator', e.caption[0], 'caption');
}
// the games that speak, training, the exercise list, the voice test in Profil
for (const r of GAMES.room.rounds) add('hughes', r.text, 'game', true);
for (const r of GAMES.guesswho.rounds) add('tom', (r.yes || r.no)[0], 'game');
for (const t of ['Let’s practise. Five minutes, no more.', 'Now the verb machine.', 'Well done. See you tomorrow.', 'Here are a few of these. Just to try.']) add('stranger', t, 'app');
add('tom', 'Hello! Welcome to Linden Lane.', 'app');
// the book (last: it's read, not heard in the story): each verb's forms, examples and phrases; each lesson's examples
for (const v of VERBS) {
  const p = VERB_BOOK[v.base];
  add('narrator', formsLine(v), 'verb forms');
  for (const [, en] of p?.ex || []) add('narrator', en, 'verb example');
  for (const [en] of p?.phrases || []) add('narrator', en, 'verb phrase');
}
for (const L of Object.values(LESSONS)) for (const [en] of L.ex) add('narrator', en.replace(/\*\*/g, ''), 'lesson example');

const out = [...lines.values()];
const file = process.argv[2];
if (file) fs.writeFileSync(file, JSON.stringify(out, null, 1));
const by = {};
for (const l of out) by[l.kind] = (by[l.kind] || 0) + 1;
console.log(out.length, 'lines', JSON.stringify(by));
