import { ITEMS } from '../content/items.js';
import { dueItems, isLearned, Store } from '../app/store.js';
import { shuffle, sub } from '../app/ui.js';

// The review: mixed quick drills over what is due, weakest first. Answering is quicker and more honest than grading
// yourself. It stops at three minutes, finished or not (see the runner).

const LETTER_NEAR = { a: 'ehir', b: 'pvde', c: 'szkt', d: 'tbge', e: 'iaya', f: 'svhx', g: 'jzcd', h: 'aekr', i: 'eyal', j: 'gzya', k: 'qcag',
  l: 'ermn', m: 'nlwe', n: 'mlhe', o: 'uaqw', p: 'bvtd', q: 'kuci', r: 'alhw', s: 'fxcz', t: 'dpbc', u: 'owyq', v: 'bwfp', w: 'uvym', x: 'sfze', y: 'iwja', z: 'gscx' };

const norm = s => sub(s).toLowerCase().replace(/[.,!?']/g, '').trim();
const kindPool = kind => {
  const all = Object.values(ITEMS).filter(x => x.kind === kind);
  const learned = all.filter(x => isLearned(x.id));
  return learned.length >= 6 ? learned : all;
};
const clash = (a, b) => a.id === b.id || norm(a.en) === norm(b.en) || a.ro.some(r => b.ro.includes(r));

function others(it, n) {
  return shuffle(kindPool(it.kind).filter(x => !clash(x, it))).slice(0, n);
}

function withAnswer(right, wrong) {
  const options = shuffle([right, ...wrong]);
  return { options, answer: options.indexOf(right) };
}

function drill(id, k) {
  const it = ITEMS[id];
  if (it.kind === 'letter') {
    const l = it.en.toLowerCase();
    const near = shuffle([...new Set(LETTER_NEAR[l])]).filter(x => x !== l).slice(0, 3).map(x => x.toUpperCase());
    return { t: 'listen', audio: id, q: 'Ce literă ai auzit?', lang: 'letter', ...withAnswer(it.en, near), ids: [id] };
  }
  if (it.kind === 'number') {
    const pool = Object.values(ITEMS).filter(x => x.kind === 'number' && x.id !== id);
    const twin = it.n > 12 && it.n < 20 ? it.n * 10 - 100 : it.n >= 30 && it.n <= 90 ? it.n / 10 + 10 : null; // fifteen ↔ fifty
    const near = shuffle(pool.filter(x => x.n !== twin)).slice(0, twin != null ? 2 : 3).map(x => String(x.n));
    if (twin != null) near.push(String(twin));
    return { t: 'listen', audio: id, q: 'Ce număr ai auzit?', lang: 'digit', ...withAnswer(String(it.n), near), ids: [id] };
  }
  const rest = others(it, 3);
  // Words that look the same in both languages (hotel, pizza, restaurant) are only worth hearing.
  const plain = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const lookalike = plain(it.ro[0]).startsWith(plain(it.en).slice(0, 4));
  const mode = lookalike ? 'listen' : ['listen', 'meaning', 'english'][(k + (Store.d.items[id]?.seen || 0)) % 3];
  if (mode === 'listen') return { t: 'listen', audio: it.en, q: 'Ce ai auzit?', ...withAnswer(it.en, rest.map(x => x.en)), ids: [id] };
  if (mode === 'meaning') return { t: 'pick', show: { en: it.en }, q: 'Ce înseamnă?', lang: 'ro', ...withAnswer(it.ro[0], rest.map(x => x.ro[0])), ids: [id] };
  return { t: 'pick', show: { ro: it.ro[0] }, q: 'Cum spui în engleză?', lang: 'en', ...withAnswer(it.en, rest.map(x => x.en)), ids: [id] };
}

export function reviewSteps(max = 10) {
  return [...dueItems().slice(0, max).map(drill), { t: 'rdone' }];
}
