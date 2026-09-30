// Speaking English with the device's own voices. British by default. Every phrase is spoken by `speak(text)`, so
// recorded audio files can replace this later without touching the screens.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
// Tests and previews open the app with ?mute: everything behaves the same, without a sound.
export const muted = typeof location !== 'undefined' && /[?&]mute(?:[=&]|$)/.test(location.search);

const PREFERRED = /natural|neural|premium|enhanced|serena|daniel|kate|sonia|libby|ryan|google uk/i;
const NOVELTY = /bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i;

const state = { accent: 'en-GB', voice: null, pool: [], loaded: false };
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
  // Other English voices, for sound drills: hearing a word from several speakers trains the ear better than one.
  state.pool = [state.voice, ...accent.filter(v => v !== state.voice && v.localService), ...english.filter(v => !accent.includes(v) && v.localService)].filter(Boolean).slice(0, 4);
  listeners.forEach(fn => fn(state.voice));
}

/** How many different English voices the sound drills can rotate through. */
export const voiceCount = () => Math.max(1, state.pool.length);

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

/** Speaks `text`; resolves when it's finished (or failed). Online-only voices fall back to a local one when offline.
 *  `pitch` gives each person in the story a voice of their own; `variant` picks another English voice. */
export function speak(text, { rate = 0.95, pitch = 1, variant = 0 } = {}) {
  if (muted) return new Promise(resolve => setTimeout(() => resolve(true), navigator.webdriver ? 5 : 300));
  if (!canSpeak) return Promise.resolve(false);
  return new Promise(resolve => {
    let finished = false;
    const done = ok => { if (!finished) { finished = true; resolve(ok); } };
    const say = (voice, retry) => {
      const u = new SpeechSynthesisUtterance(text);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = state.accent;
      u.rate = rate;
      u.pitch = pitch;
      u.onend = () => done(true);
      u.onerror = () => {
        const local = retry && speechSynthesis.getVoices().find(v => v.localService && norm(v.lang).startsWith('en') && !NOVELTY.test(v.name));
        if (local) say(local, false); else done(false);
      };
      speechSynthesis.speak(u);
    };
    try {
      speechSynthesis.cancel();
      const voice = variant ? state.pool[variant % state.pool.length] || state.voice : state.voice;
      say(voice, voice && !voice.localService);
    } catch { done(false); }
    // Some engines never fire `end`; don't leave the caller hanging.
    setTimeout(() => done(true), Math.max(1500, text.length * 110 / rate));
  });
}

/** Stops whatever is being said. */
export function hush() { try { if (canSpeak) speechSynthesis.cancel(); } catch {} }

/** iOS only lets a page speak once it has spoken inside a tap: call this from the tap that starts an episode. */
export function unlockSpeech() {
  if (!canSpeak || muted) return;
  try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch {}
}
