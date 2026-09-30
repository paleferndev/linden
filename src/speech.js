// Speaking English with the device's own voices. British by default. Every phrase is spoken by `speak(text)`, so
// recorded audio files can replace this later without touching the screens.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
// Tests and previews open the app with ?mute: everything behaves the same, without a sound.
export const muted = typeof location !== 'undefined' && /[?&]mute(?:[=&]|$)/.test(location.search);

const PREFERRED = /natural|neural|premium|enhanced|serena|daniel|kate|sonia|libby|ryan|google uk/i;
const NOVELTY = /bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i;

const state = { accent: 'en-GB', voice: null, loaded: false };
const listeners = new Set();
const norm = lang => (lang || '').replace('_', '-').toLowerCase();

function pick() {
  let voices = [];
  try { voices = speechSynthesis.getVoices(); } catch { return; }
  if (!voices.length) return;
  state.loaded = true;
  const usable = voices.filter(v => !NOVELTY.test(v.name));
  const accent = usable.filter(v => norm(v.lang).startsWith(norm(state.accent)));
  const english = usable.filter(v => norm(v.lang).startsWith('en'));
  state.voice = accent.find(v => PREFERRED.test(v.name)) || accent.find(v => v.localService) || accent[0] || english[0] || null;
  listeners.forEach(fn => fn(state.voice));
}

if (canSpeak) {
  pick();
  try { speechSynthesis.addEventListener('voiceschanged', pick); } catch { speechSynthesis.onvoiceschanged = pick; }
}

/** Calls `fn(voice)` now if voices are known, and whenever they change. `voice` is null when the device has no English voice. */
export function onVoice(fn) {
  listeners.add(fn);
  if (state.loaded) fn(state.voice);
  return () => listeners.delete(fn);
}

export function setAccent(accent) { state.accent = accent; pick(); }

/** Speaks `text`; resolves when it's finished (or failed). Online-only voices fall back to a local one when offline. */
export function speak(text, { rate = 0.95 } = {}) {
  if (muted) return new Promise(resolve => setTimeout(() => resolve(true), 300));
  if (!canSpeak) return Promise.resolve(false);
  return new Promise(resolve => {
    let finished = false;
    const done = ok => { if (!finished) { finished = true; resolve(ok); } };
    const say = (voice, retry) => {
      const u = new SpeechSynthesisUtterance(text);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = state.accent;
      u.rate = rate;
      u.onend = () => done(true);
      u.onerror = () => {
        const local = retry && speechSynthesis.getVoices().find(v => v.localService && norm(v.lang).startsWith('en') && !NOVELTY.test(v.name));
        if (local) say(local, false); else done(false);
      };
      speechSynthesis.speak(u);
    };
    try {
      speechSynthesis.cancel();
      say(state.voice, state.voice && !state.voice.localService);
    } catch { done(false); }
    // Some engines never fire `end`; don't leave the caller hanging.
    setTimeout(() => done(true), Math.max(1500, text.length * 110 / rate));
  });
}
