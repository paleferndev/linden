// Checking typed and spoken answers. Case, punctuation, curly apostrophes and contractions never count against you.
// A small typo in a long word is forgiven (and pointed out); a wrong small word never is: "a" for "an" or "is" for
// "are" is exactly what the exercise is about.

const CONTRACTIONS = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
  "that's": 'that is', "what's": 'what is', "here's": 'here is', "there's": 'there is', "let's": 'let us', "i've": 'i have',
  "don't": 'do not', "doesn't": 'does not', "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "won't": 'will not', "i'll": 'i will',
};
const STRICT = new Set(['a', 'an', 'the', 'is', 'are', 'am', 'do', 'does', 'this', 'that', 'these', 'those', 'to', 'too', 'two', 'some', 'any',
  'much', 'many', 'by', 'with', 'in', 'on', 'at', 'for', 'of', 'me', 'my', 'i', 'you', 'your', 'not', 'no', 'one']);

export const words = s => String(s ?? '').toLowerCase().normalize('NFKC').replace(/[’‘`´]/g, "'")
  .replace(/[.,!?;:"„”“()…–—-]/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
  .flatMap(w => (CONTRACTIONS[w] || w).split(' '));

export function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

const typo = (got, want) => got === want || (!STRICT.has(want) && want.length >= 4 && lev(got, want) <= (want.length >= 8 ? 2 : 1));

/**
 * Compares an answer with the accepted ones. Returns { ok, exact, answer, typos: [[got, want]] }.
 * `answer` is the accepted form closest to what was given, for showing back.
 */
export function check(given, accepted) {
  const g = words(given);
  let best = null;
  for (const a of accepted) {
    const w = words(a);
    if (w.length !== g.length) continue;
    const typos = [];
    let ok = true;
    for (let k = 0; k < w.length && ok; k++) {
      if (g[k] === w[k]) continue;
      if (typo(g[k], w[k])) typos.push([g[k], w[k]]); else ok = false;
    }
    if (ok && (!best || typos.length < best.typos.length)) best = { ok: true, exact: !typos.length, answer: a, typos };
  }
  return best || { ok: false, exact: false, answer: accepted[0], typos: [] };
}

/** Numbers and prices: "£6.20", "6,20" and "6.2" are all 6.20. */
export function checkNumber(given, want) {
  const v = parseFloat(String(given).replace(/[£\s]/g, '').replace(',', '.'));
  return { ok: Number.isFinite(v) && Math.abs(v - Number(want)) < 0.001, answer: String(want) };
}

/** How close a spoken attempt is: the share of expected words heard, in order. */
export function spokenMatch(heard, want) {
  const h = words(heard), w = words(want);
  let i = 0, hit = 0;
  for (const x of w) {
    const j = h.findIndex((y, k) => k >= i && (y === x || typo(y, x)));
    if (j !== -1) { hit++; i = j + 1; }
  }
  return w.length ? hit / w.length : 0;
}

/** The accepted answer as HTML, with the words the learner missed or got wrong marked. */
export function markMissed(given, answer, esc) {
  const g = new Set(words(given));
  return String(answer).split(' ').map(tok => {
    const w = words(tok);
    const miss = w.length && w.some(x => !g.has(x));
    return miss ? `<mark>${esc(tok)}</mark>` : esc(tok);
  }).join(' ');
}
