import { ITEMS } from '../content/items.js';

// Progress: one JSON blob in localStorage. Every read tolerates a missing or corrupt value; `repair()` guards each
// field's type and `migrate()` only ever moves data forward. All project sites of the GitHub user share one origin,
// so the key is namespaced.

const KEY = 'linden';
const VERSION = 1;

export const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const today = () => isoDate(new Date());
export const addDays = (iso, n) => { const d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return isoDate(d); };

const fresh = () => ({
  v: VERSION,
  profile: { name: '', started: today(), onboarded: false, voice: 'en-GB', respell: true, theme: 'auto' },
  days: {},     // iso date → minutes of practice (at least 1 once anything was done)
  lessons: {},  // lesson id → { done, times, last }
  items: {},    // item id → { box, due, seen, wrong }
  traps: [],    // trap ids seen, for the phrasebook
  resume: null, // { lesson, step, day } while a lesson is unfinished
});

const obj = x => (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
const isIso = s => /^\d{4}-\d{2}-\d{2}$/.test(String(s));

function repair(p) {
  const base = fresh();
  const out = { v: VERSION };
  const pr = Object.assign(base.profile, obj(p.profile));
  out.profile = {
    name: String(pr.name ?? '').trim().slice(0, 24),
    started: isIso(pr.started) ? pr.started : today(),
    onboarded: !!pr.onboarded,
    voice: pr.voice === 'en-US' ? 'en-US' : 'en-GB',
    respell: pr.respell !== false,
    theme: ['auto', 'light', 'dark'].includes(pr.theme) ? pr.theme : 'auto',
  };
  out.days = {};
  for (const [k, v] of Object.entries(obj(p.days))) if (isIso(k)) out.days[k] = Math.max(1, parseInt(v, 10) || 1);
  out.lessons = {};
  for (const [k, v] of Object.entries(obj(p.lessons))) {
    const r = obj(v);
    out.lessons[k] = { done: !!r.done, times: parseInt(r.times, 10) || 0, last: isIso(r.last) ? r.last : '' };
  }
  out.items = {};
  for (const [id, v] of Object.entries(obj(p.items))) {
    const it = obj(v);
    out.items[id] = {
      box: Math.min(5, Math.max(0, parseInt(it.box, 10) || 0)),
      due: isIso(it.due) ? it.due : today(),
      seen: parseInt(it.seen, 10) || 0,
      wrong: parseInt(it.wrong, 10) || 0,
    };
  }
  out.traps = Array.isArray(p.traps) ? [...new Set(p.traps.filter(x => typeof x === 'string'))] : [];
  const r = obj(p.resume);
  out.resume = typeof r.lesson === 'string' && Number.isInteger(r.step) && isIso(r.day) ? { lesson: r.lesson, step: r.step, day: r.day } : null;
  return out;
}

function migrate(p) {
  // v1 is the first shape. Future versions add steps here, oldest first, and never drop progress.
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

/* ---------- spaced review: Leitner boxes 0–5 */
// A wrong answer drops the item to box 1, not 0, so it still counts as met. Letters and numbers enter at box 2 so the
// alphabet doesn't flood the review.
export const BOX_DAYS = [0, 1, 3, 7, 14, 30];

export function record(id, correct) {
  if (!ITEMS[id]) return;
  const p = Store.d.items[id] ||= { box: 0, due: today(), seen: 0, wrong: 0 };
  p.seen++;
  if (correct) p.box = p.box === 0 && ITEMS[id].light ? 2 : Math.min(5, p.box + 1);
  else { p.wrong++; p.box = 1; }
  p.due = addDays(today(), BOX_DAYS[p.box]);
}

/** Items met in a lesson but not drilled start in box 1: they come back tomorrow. */
export function introduce(ids) {
  for (const id of ids) {
    if (!ITEMS[id] || Store.d.items[id]?.box > 0) continue;
    Store.d.items[id] = { box: ITEMS[id].light ? 2 : 1, due: addDays(today(), ITEMS[id].light ? BOX_DAYS[2] : 1), seen: 1, wrong: 0 };
  }
}

/** Weakest first, then longest overdue. */
export function dueItems(on = today()) {
  const items = Store.d.items;
  return Object.keys(items)
    .filter(id => ITEMS[id] && items[id].box > 0 && items[id].due <= on)
    .sort((a, b) => (items[a].box - items[b].box) || items[a].due.localeCompare(items[b].due));
}

export const isLearned = id => (Store.d.items[id]?.box || 0) > 0;
export const wordsSeen = () => Object.keys(Store.d.items).filter(id => ITEMS[id] && Store.d.items[id].box > 0).length;
export const lessonDone = id => !!Store.d.lessons[id]?.done;

export function markDay(minutes = 1) {
  const t = today();
  Store.d.days[t] = Math.max(Store.d.days[t] || 0, 0) + minutes;
}

export function finishLesson(id, items) {
  const r = Store.d.lessons[id] ||= { done: false, times: 0, last: '' };
  r.done = true; r.times++; r.last = today();
  introduce(items);
  if (Store.d.resume?.lesson === id) Store.d.resume = null;
  markDay(1);
  Store.save();
}
