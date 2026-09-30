import { GRAMMAR } from '../content/grammar.js';
import { VERB, verbsOf } from '../content/verbs.js';
import { EP } from '../content/episodes.js';

// Progress: one JSON blob in localStorage. Every read tolerates a missing or corrupt value; `repair()` guards each
// field's type and `migrate()` only ever moves data forward. All project sites of the GitHub user share one origin,
// so the key is namespaced.

const KEY = 'linden';
const VERSION = 2;

export const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const today = () => isoDate(new Date());
export const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return isoDate(d); };

const fresh = () => ({
  v: VERSION,
  profile: { name: '', started: today(), onboarded: false, voice: 'en-GB', theme: 'auto', autoVoice: true },
  days: {},     // iso date → minutes of practice (at least 1 once anything was done)
  eps: {},      // episode number → { done, lamps (best, 1–3), times, last }
  resume: null, // { ep, at, right, total, day } while an episode is unfinished
  srs: {},      // 'g:<point>' | 'v:<verb>' → { box, due, seen, wrong }
  verbs: {},    // verb → the day it went into the album
  games: {},    // game → best score in free play
});

const obj = x => (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
const isIso = s => /^\d{4}-\d{2}-\d{2}$/.test(String(s));
const int = (x, d = 0) => Number.isFinite(+x) ? Math.trunc(+x) : d;
const known = id => id.startsWith('g:') ? !!GRAMMAR[id.slice(2)] : id.startsWith('v:') ? !!VERB[id.slice(2)] : false;

function repair(p) {
  const out = { v: VERSION };
  const pr = Object.assign(fresh().profile, obj(p.profile));
  out.profile = {
    name: String(pr.name ?? '').trim().slice(0, 24),
    started: isIso(pr.started) ? pr.started : today(),
    onboarded: !!pr.onboarded,
    voice: pr.voice === 'en-US' ? 'en-US' : 'en-GB',
    theme: ['auto', 'light', 'dark'].includes(pr.theme) ? pr.theme : 'auto',
    autoVoice: pr.autoVoice !== false,
  };
  out.days = {};
  for (const [k, v] of Object.entries(obj(p.days))) if (isIso(k)) out.days[k] = Math.max(1, int(v, 1));
  out.eps = {};
  for (const [k, v] of Object.entries(obj(p.eps))) {
    if (!EP[k]) continue;
    const r = obj(v);
    out.eps[k] = { done: !!r.done, lamps: Math.min(3, Math.max(0, int(r.lamps))), times: int(r.times), last: isIso(r.last) ? r.last : '' };
  }
  const r = obj(p.resume);
  out.resume = EP[r.ep] && Number.isInteger(r.at) && r.at > 0 && isIso(r.day)
    ? { ep: +r.ep, at: r.at, right: int(r.right), total: int(r.total), day: r.day } : null;
  out.srs = {};
  for (const [id, v] of Object.entries(obj(p.srs))) {
    if (!known(id)) continue;
    const it = obj(v);
    out.srs[id] = { box: Math.min(5, Math.max(0, int(it.box))), due: isIso(it.due) ? it.due : today(), seen: int(it.seen), wrong: int(it.wrong) };
  }
  out.verbs = {};
  for (const [k, v] of Object.entries(obj(p.verbs))) if (VERB[k]) out.verbs[k] = isIso(v) ? v : today();
  out.games = {};
  for (const [k, v] of Object.entries(obj(p.games))) out.games[k] = Math.max(0, int(v));
  return out;
}

function migrate(p) {
  // v1 (the lessons) → v2 (season one): the lessons are retired, so only the profile and the practice days carry over.
  if (p.v === 1) p = { v: 2, profile: obj(p.profile), days: obj(p.days) };
  return repair(p);
}

export const Store = {
  d: fresh(),
  load() {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch {}
    let p = null;
    if (raw) { try { p = JSON.parse(raw); } catch { p = null; } }
    this.d = p && typeof p === 'object' && !Array.isArray(p) && typeof p.v === 'number' ? migrate(p) : fresh();
    return this.d;
  },
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.d)); } catch { /* full or blocked: keep going in memory */ } },
  reset() { this.d = fresh(); this.save(); },
  /** A short text code with the whole progress, for moving it to another device. */
  exportCode() { return btoa(unescape(encodeURIComponent(JSON.stringify(this.d)))); },
  importCode(code) {
    const p = JSON.parse(decodeURIComponent(escape(atob(String(code).replace(/\s+/g, '')))));
    if (!p || typeof p !== 'object' || typeof p.v !== 'number') throw new Error('not a progress code');
    this.d = migrate(p);
    this.save();
  },
};

/* ---------- spaced review: Leitner boxes 0–5, for grammar points and verbs */
// A wrong answer drops the item to box 1, not 0, so it still counts as met.
export const BOX_DAYS = [0, 1, 3, 7, 14, 30];

export function record(id, correct) {
  if (!id || !known(id)) return;
  const p = Store.d.srs[id] ||= { box: 0, due: today(), seen: 0, wrong: 0 };
  p.seen++;
  if (correct) p.box = Math.min(5, p.box + 1);
  else { p.wrong++; p.box = 1; }
  p.due = addDays(today(), BOX_DAYS[p.box]);
}

/** What an episode taught comes back tomorrow, unless it was already practised. */
export function introduce(ids) {
  for (const id of ids) {
    if (!known(id) || Store.d.srs[id]?.box > 0) continue;
    Store.d.srs[id] = { box: 1, due: addDays(today(), 1), seen: 1, wrong: 0 };
  }
}

/** Weakest first, then longest overdue. */
export function dueItems(on = today()) {
  const s = Store.d.srs;
  return Object.keys(s).filter(id => s[id].box > 0 && s[id].due <= on)
    .sort((a, b) => (s[a].box - s[b].box) || s[a].due.localeCompare(s[b].due));
}
export const learnedItems = () => Object.keys(Store.d.srs).filter(id => Store.d.srs[id].box > 0);

/* ---------- the season */
export const epDone = n => !!Store.d.eps[n]?.done;
export const epsDone = () => Object.keys(EP).filter(epDone).length;
/** The episode to play next: the unfinished one in progress, or the first not done. Null once the season is over. */
export function nextEp() {
  const r = Store.d.resume;
  if (r && !epDone(r.ep)) return r.ep;
  return Object.keys(EP).map(Number).find(n => !epDone(n)) || null;
}
/** Episodes open in order: the first one, any finished one, and the one after the last finished. */
export const epOpen = n => n === 1 || epDone(n) || epDone(n - 1);

export function markDay(minutes = 1) {
  const t = today();
  Store.d.days[t] = Math.max(Store.d.days[t] || 0, 0) + minutes;
}

export function saveResume(ep, at, right, total) {
  Store.d.resume = { ep, at, right, total, day: today() };
  Store.save();
}

export const lampsFor = (right, total) => { const a = total ? right / total : 1; return a >= .9 ? 3 : a >= .7 ? 2 : 1; };

/** Marks the episode done; its grammar and verbs go into the review and the verb album. Returns the new verbs. */
export function finishEpisode(n, right, total) {
  const r = Store.d.eps[n] ||= { done: false, lamps: 0, times: 0, last: '' };
  const lamps = lampsFor(right, total);
  const first = !r.done;
  r.done = true; r.times++; r.last = today(); r.lamps = Math.max(r.lamps, lamps);
  introduce([...EP[n].points.map(p => 'g:' + p), ...verbsOf(n).map(v => 'v:' + v.base)]);
  const added = verbsOf(n).filter(v => !Store.d.verbs[v.base]);
  for (const v of added) Store.d.verbs[v.base] = today();
  if (Store.d.resume?.ep === n) Store.d.resume = null;
  markDay(5);
  Store.save();
  return { lamps, first, verbs: added };
}
