import { Store } from './store.js';
import { ICONS } from '../art/icons.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const reflow = el => void el.offsetWidth;
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
/** Tests run in an automated browser: waits shrink to almost nothing there. */
export const FAST = typeof navigator !== 'undefined' && navigator.webdriver === true;
export const wait = ms => new Promise(r => setTimeout(r, FAST ? Math.min(ms, 20) : ms));
/** In tests only: what the screen expects next, so the walk can answer it. */
let seq = 0;
export const hook = v => { if (FAST) window.__linden = { seq: ++seq, ...v }; };

/** The learner's name, or a neutral stand-in for the dialogues. */
export const learnerName = () => Store.d.profile.name || 'Alex';
export const sub = s => String(s ?? '').replaceAll('{name}', learnerName());
/** A sentence with its gap filled. A contraction joins the word before: "I {} the window" + "’ll close" → "I’ll close the window". */
export const fillGap = (text, w) => String(text).replace(/( ?)\{\}/, (_, sp) => (/^[’']/.test(w) ? '' : sp) + w);
/** English with **x** marked, escaped. */
export const bold = s => esc(sub(s)).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

/* ---------- toast */
let toastTimer = 0;
export function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ---------- bottom sheet */
export function openSheet(html, { onClose } = {}) {
  const wrap = $('#sheet');
  wrap.innerHTML = `<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true"><span class="grab"></span>${html}</div>`;
  wrap.hidden = false;
  reflow(wrap);
  wrap.classList.add('show');
  const close = () => closeSheet(onClose);
  wrap.onclick = e => { if (e.target.closest('[data-close]')) close(); };
  wrap.onkeydown = e => { if (e.key === 'Escape') close(); };
  requestAnimationFrame(() => $('.sheet [data-autofocus], .sheet button', wrap)?.focus({ preventScroll: true }));
  return $('.sheet', wrap);
}
export function closeSheet(after) {
  const wrap = $('#sheet');
  if (wrap.hidden) return;
  wrap.classList.remove('show');
  setTimeout(() => { wrap.hidden = true; wrap.innerHTML = ''; after?.(); }, reduceMotion() ? 0 : 260);
}

export const speakerBtn = (text, who = '', label = 'Ascultă') => `<button type="button" class="spk" data-say="${esc(text)}" data-who="${who}" aria-label="${label}">${ICONS.speaker}</button>`;
