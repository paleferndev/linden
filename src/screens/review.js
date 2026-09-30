import { ITEMS } from '../content/items.js';
import { LESSONS } from '../content/lessons.js';
import { dueItems, isLearned, Store } from '../app/store.js';
import { shuffle, sub } from '../app/ui.js';

// The review: quick drills over what is due, weakest first, stopping at three minutes (see the runner).
// The same word gets a harder drill as it settles in its box: first you recognise it among look-alikes, then you
// write what you hear, then you produce it yourself (typed or spoken). Recall beats recognition, and effort helps
// memory, but only once the word is familiar enough to manage it.

const LETTER_NEAR = { a: 'ehir', b: 'pvde', c: 'szkt', d: 'tbge', e: 'iay', f: 'svhx', g: 'jzcd', h: 'aekr', i: 'eyal', j: 'gzya', k: 'qcag',
  l: 'ermn', m: 'nlwe', n: 'mlhe', o: 'uaqw', p: 'bvtd', q: 'kuci', r: 'alhw', s: 'fxcz', t: 'dpbc', u: 'owyq', v: 'bwfp', w: 'uvym', x: 'sfze', y: 'iwja', z: 'gscx' };
// Tiles that are easy to confuse with the right ones.
const NEAR_WORDS = { a: ['an', 'the', 'some'], an: ['a', 'the'], the: ['a'], is: ['are', 'does'], are: ['is', 'do'], do: ['does', 'are'],
  this: ['that', 'these'], that: ['this', 'those'], much: ['many'], by: ['with'], you: ['your'], your: ['you'], me: ['my', 'I'], my: ['me'],
  have: ['has'], can: ['could'], some: ['any', 'a'], any: ['some'], to: ['too'], too: ['to'], please: ['thanks'], one: ['it'], i: ['me'] };

// which lesson each item belongs to, for look-alike options from the same scene
const LESSON_OF = {};
for (const L of Object.values(LESSONS)) for (const id of L.items) LESSON_OF[id] ||= L.id;

const plain = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const lookalike = it => plain(it.ro[0]).startsWith(plain(it.en).slice(0, 4));
const clash = (a, b) => a.id === b.id || plain(a.en) === plain(b.en) || a.ro.some(r => b.ro.includes(r));
const withAnswer = (right, wrong) => { const options = shuffle([right, ...wrong]); return { options, answer: options.indexOf(right) }; };

/** Three options that could be mistaken for this one: same lesson first, then same kind. */
function neighbours(it, n = 3) {
  const same = (LESSONS[LESSON_OF[it.id]]?.items || []).map(id => ITEMS[id]).filter(x => x && x.kind === it.kind && !clash(x, it));
  const rest = Object.values(ITEMS).filter(x => x.kind === it.kind && !clash(x, it) && !same.includes(x) && (isLearned(x.id) || same.length < n));
  return [...shuffle(same), ...shuffle(rest)].slice(0, n);
}

function extraTiles(text) {
  const ws = sub(text).toLowerCase().replace(/[.,!?]/g, '').split(' ');
  const near = shuffle(ws.flatMap(w => NEAR_WORDS[w] || [])).filter(w => !ws.includes(w));
  return [...new Set(near)].slice(0, 2);
}

export function drillFor(id, box = Store.d.items[id]?.box ?? 1) {
  const it = ITEMS[id];
  if (it.kind === 'letter') {
    const l = it.en.toLowerCase();
    const near = shuffle([...new Set(LETTER_NEAR[l])]).filter(x => x !== l).slice(0, 3).map(x => x.toUpperCase());
    return { t: 'listen', audio: id, q: 'Ce literă ai auzit?', lang: 'letter', ...withAnswer(it.en, near), ids: [id] };
  }
  if (it.kind === 'number') return { t: 'dictation', audio: id, q: 'Scrie numărul pe care îl auzi.', answer: String(it.n), number: true, ids: [id] };
  const ro = sub(it.ro[0]), en = sub(it.en);
  if (it.kind === 'word') {
    if (lookalike(it) || (box >= 2 && box <= 3)) return { t: 'dictation', audio: id, answer: en, ids: [id] };
    if (box >= 4) return { t: 'translate', mode: 'type', ro, answer: en, ids: [id] };
    return { t: 'pick', show: { ro }, q: 'Cum se spune în engleză?', lang: 'en', ...withAnswer(en, neighbours(it).map(x => sub(x.en))), ids: [id] };
  }
  if (box <= 1) return { t: 'listenbuild', audio: en, extra: extraTiles(en), ids: [id] };
  if (box <= 3) return { t: 'translate', ro, answer: en, extra: extraTiles(en), ids: [id] };
  return box % 2 ? { t: 'speak', ro, answer: en, id, ids: [id] } : { t: 'translate', mode: 'type', ro, answer: en, ids: [id] };
}

export function reviewSteps(max = 10) {
  return [...dueItems().slice(0, max).map(id => drillFor(id)), { t: 'rdone' }];
}

/** A mixed sample for trying the review from the exercise list: every kind of item, at every stage. */
export function sampleReview() {
  const pick = kind => shuffle(Object.values(ITEMS).filter(x => x.kind === kind && !lookalike(x)))[0].id;
  return [
    drillFor(pick('word'), 1), drillFor(pick('phrase'), 1), drillFor(pick('number'), 1), drillFor(pick('word'), 2),
    drillFor(pick('phrase'), 2), drillFor(pick('letter'), 2), drillFor(pick('word'), 4), drillFor(pick('phrase'), 5),
  ];
}
