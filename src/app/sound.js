import { speak, setAccent, muted } from '../speech.js';
import { ITEMS } from '../content/items.js';
import { sub } from './ui.js';

// Everything the app says goes through here: the English voice at normal or slow speed, and the three small sounds.

let slow = false;
export const isSlow = () => slow;
export const setSlow = v => { slow = !!v; };
export { setAccent };

// Lines that play by themselves (a new step, a chat message) wait until the person has touched the page: opening the
// app, or a reload, never starts talking on its own.
let touched = false;
addEventListener('pointerdown', () => { touched = true; }, true);
addEventListener('keydown', () => { touched = true; }, true);
const activated = () => touched || navigator.userActivation?.hasBeenActive === true;

/** Speaks English. `el` gets the .speaking class while it plays. Item ids speak their item.
 *  `auto` marks a line nobody asked for; it stays silent until the page has been touched. */
export function say(text, { el, rate, variant = 0, auto = false } = {}) {
  if (auto && !activated()) return Promise.resolve(false);
  const it = ITEMS[text];
  const spoken = it ? (it.tts || sub(it.en)) : sub(text);
  el?.classList.add('speaking');
  return speak(spoken, { rate: rate ?? (slow ? 0.7 : 0.95), variant }).then(ok => { el?.classList.remove('speaking'); return ok; });
}

// Three sounds only: a soft tap on a right answer, a two-note chime when a lesson ends, nothing on a wrong one.
let ctx = null;
export function tone(kind) {
  if (muted) return;
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime + 0.01;
    const notes = kind === 'done' ? [[587.33, 0], [880, 0.14]] : [[1046.5, 0]];
    for (const [f, d] of notes) {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = kind === 'done' ? 'sine' : 'triangle';
      osc.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + d);
      g.gain.exponentialRampToValueAtTime(kind === 'done' ? 0.12 : 0.07, t0 + d + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + (kind === 'done' ? 0.9 : 0.16));
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t0 + d); osc.stop(t0 + d + 1);
    }
  } catch {}
}
