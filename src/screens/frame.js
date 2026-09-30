import { ICONS } from '../art/icons.js';
import { $, $$, esc } from '../app/ui.js';
import { Store } from '../app/store.js';
import { isSlow, setSlow, hush } from '../app/sound.js';
import { setBusy } from '../pwa.js';

// The full-screen frame an episode, a training session or a try-out runs in: a top bar (close, who is in the chat,
// the automatic voice, slow voice), a thin progress line, and the stage. The layer is the only thing on screen, so
// nothing on the street can be tapped by mistake. Keys: Esc closes, 1–9 pick an option, Enter sends.

let F = null;

export function openFrame({ label, onExit }) {
  const layer = $('#layer');
  layer.innerHTML = `<div class="fr" role="dialog" aria-modal="true" aria-label="${esc(label)}">
    <header class="fr-top">
      <button type="button" class="icon-btn" data-exit aria-label="Închide">${ICONS.close}</button>
      <div class="fr-head"><span class="fr-avas" data-avas></span><span class="fr-t"><b data-title>${esc(label)}</b><small data-status></small></span></div>
      <button type="button" class="icon-btn fr-voice" data-voice aria-label="Vocea automată" aria-pressed="${Store.d.profile.autoVoice}">${ICONS.speaker}</button>
      <button type="button" class="speed" data-slow aria-pressed="${isSlow()}" title="Vocea mai rar">${ICONS.slow}Rar</button>
    </header>
    <div class="fr-prog" aria-hidden="true"><i data-prog></i></div>
    <div class="fr-main" data-main></div>
  </div>`;
  layer.hidden = false;
  document.body.classList.add('in-run');
  setBusy(true);
  enterFullscreen();
  $('[data-exit]', layer).onclick = () => F?.onExit();
  $('[data-voice]', layer).onclick = e => {
    const p = Store.d.profile;
    p.autoVoice = !p.autoVoice; Store.save();
    e.currentTarget.setAttribute('aria-pressed', String(p.autoVoice));
    if (!p.autoVoice) hush();
  };
  $('[data-slow]', layer).onclick = e => { setSlow(!isSlow()); e.currentTarget.setAttribute('aria-pressed', String(isSlow())); };
  document.addEventListener('keydown', onKey);
  F = {
    layer, onExit, main: $('[data-main]', layer),
    head(title, avas = '') { $('[data-title]', layer).textContent = title; $('[data-avas]', layer).innerHTML = avas; },
    status(text = '', typing = false) { const s = $('[data-status]', layer); s.textContent = text; s.classList.toggle('typing', typing); },
    progress(f) { $('[data-prog]', layer).style.transform = `scaleX(${Math.max(0, Math.min(1, f))})`; },
    bar(show) { $('.fr-top', layer).hidden = !show; $('.fr-prog', layer).hidden = !show; },
    cleanup: null,
  };
  return F;
}

export function closeFrame() {
  if (!F) return;
  document.removeEventListener('keydown', onKey);
  F.cleanup?.();
  hush();
  const layer = F.layer;
  F = null;
  layer.hidden = true;
  layer.innerHTML = '';
  document.body.classList.remove('in-run');
  setBusy(false);
  exitFullscreen();
}

export const frameOpen = () => !!F;

function onKey(e) {
  if (!F || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'Escape') { e.preventDefault(); F.onExit(); return; }
  if (e.target.matches('input, textarea')) return;
  // the options of whatever is active: the chat's reply box or a game board
  const scope = $('.fr-main [data-active]', F.layer) || F.main;
  if (/^[1-9]$/.test(e.key)) {
    const b = $$('[data-opt]:not([disabled])', scope).filter(x => x.offsetParent)[+e.key - 1];
    if (b) { e.preventDefault(); b.click(); }
    return;
  }
  if (e.key === 'Enter' && !e.target.closest('button')) {
    const b = $$('[data-enter]:not([disabled])', F.main).filter(x => x.offsetParent).pop();
    if (b) { e.preventDefault(); b.click(); }
  }
}

/* Android: episodes run full screen, the status bar comes back on the street. */
const canFullscreen = () => /Android/i.test(navigator.userAgent) && matchMedia('(display-mode: standalone)').matches && document.fullscreenEnabled;
function enterFullscreen() {
  if (canFullscreen() && !document.fullscreenElement) document.documentElement.requestFullscreen?.({ navigationUI: 'hide' }).catch(() => {});
}
function exitFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}
