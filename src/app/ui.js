import { Store } from './store.js';
import { ICONS } from '../art/icons.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const reflow = el => void el.offsetWidth;
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/** The learner's name, or a neutral stand-in for the dialogues. */
export const learnerName = () => Store.d.profile.name || 'Alex';
export const sub = s => String(s ?? '').replaceAll('{name}', learnerName());

/** A respelling with the stressed syllable in bold: «hou-<b>TEL</b>». Empty when respellings are switched off. */
export function respell(say, { force = false } = {}) {
  if (!say || (!force && !Store.d.profile.respell)) return '';
  const html = esc(sub(say)).replace(/(^|[\s-])([A-ZĂÂÎȘȚ]+)(?=[\s,.!?-]|$)/g, '$1<b>$2</b>')
    .replace(/(th|dh)/g, '<mark>$1</mark>');
  return `«${html}»`;
}

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

export const speakerBtn = (text, label = 'Ascultă') => `<button type="button" class="spk" data-say="${esc(text)}" aria-label="${label}">${ICONS.speaker}</button>`;
