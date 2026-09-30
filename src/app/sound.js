import { speak, setAccent, muted, hush, unlockSpeech } from '../speech.js';
import { CAST } from '../content/cast.js';
import { Store } from './store.js';
import { sub } from './ui.js';

// Everything the app says goes through here: each person's voice at normal or slow speed, and a few small sounds.

let slow = false;
export const isSlow = () => slow;
export const setSlow = v => { slow = !!v; };
export { setAccent, hush, unlockSpeech, muted };

// Lines that play by themselves (a chat message) wait until the person has touched the page, and stay quiet when the
// automatic voice is off in Profil. A tap on a message always plays it.
let touched = false;
addEventListener('pointerdown', () => { touched = true; }, true);
addEventListener('keydown', () => { touched = true; }, true);
const activated = () => touched || navigator.userActivation?.hasBeenActive === true;
export const autoVoice = () => Store.d.profile.autoVoice !== false;

/** Speaks English as `who` (a CAST key). `el` gets .speaking while it plays. `auto`: a line nobody tapped. */
export function say(text, { who, el, auto = false, rate } = {}) {
  if (auto && (!activated() || !autoVoice())) return Promise.resolve(false);
  const v = CAST[who]?.voice || { pitch: 1, rate: .95 };
  el?.classList.add('speaking');
  return speak(sub(text), { rate: rate ?? v.rate * (slow ? .72 : 1), pitch: v.pitch })
    .then(ok => { el?.classList.remove('speaking'); return ok; });
}

// The small sounds: a tap for a right answer, a rising run for a combo, a chime for a spark or a decoded signal, and
// two notes when an episode ends. Nothing on a wrong answer.
let ctx = null;
const SEQ = {
  ok: [[1046.5, 0, .07]],
  combo: [[784, 0, .06], [1046.5, .07, .06], [1318.5, .14, .07]],
  reveal: [[523.25, 0, .05], [659.25, .09, .05], [783.99, .18, .06]],
  spark: [[1318.5, 0, .05], [1760, .08, .05], [2093, .16, .04], [2637, .24, .03]],
  done: [[587.33, 0, .12], [880, .14, .12]],
  tick: [[1568, 0, .025]],
};
export function tone(kind) {
  if (muted) return;
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime + 0.01, long = kind === 'done' || kind === 'spark';
    for (const [f, d, peak] of SEQ[kind] || []) {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = kind === 'ok' || kind === 'tick' ? 'triangle' : 'sine';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + d);
      g.gain.exponentialRampToValueAtTime(peak, t0 + d + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + (long ? 0.9 : 0.18));
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t0 + d); osc.stop(t0 + d + 1);
    }
  } catch {}
}

/** A light buzz on Android for a right answer or a spark. */
export const buzz = (ms = 12) => { try { if (!muted) navigator.vibrate?.(ms); } catch {} };
