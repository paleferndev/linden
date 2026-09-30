import { PANELS, START, garden, busstop, no9, roof } from './night.js';
import { sceneSVG } from './scenes.js';
import { stranger, moss } from './stranger.js';
import { person, CAST as PEOPLE, cat, radio } from './people.js';
import { laneSVG } from './lane.js';

// Drawings by name, so the story's content can point at pictures without importing any drawing code.
//   ep:<n>     the opening picture of episode n          panel:<n>  its album picture
//   scene:<k>  cafe | room | shop                        night:<k>  garden | busstop | roof (always at night)
//   day:no9    Mrs Hughes's garden                       lane       the whole street at night

const wrap = inner => `<svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
const NIGHT = { garden: () => garden(), busstop: () => busstop(), roof: () => roof() };

/** { svg, night } for an art key. `night` asks the caller to wrap it in .night. Pictures always fill their frame. */
export function art(key) {
  const a = pick(key);
  return { ...a, svg: a.svg.replace('xMidYMid meet', 'xMidYMid slice') };
}
function pick(key) {
  const [kind, k] = String(key).split(':');
  if (kind === 'ep' && START[k]) return { svg: START[k].svg(), night: START[k].night };
  if (kind === 'panel' && PANELS[k]) return { svg: PANELS[k].svg(), night: PANELS[k].night };
  if (kind === 'scene') return { svg: sceneSVG(k), night: false };
  if (kind === 'night' && NIGHT[k]) return { svg: wrap(NIGHT[k]()), night: true };
  if (kind === 'day' && k === 'no9') return { svg: wrap(no9()), night: false };
  if (kind === 'lane') return { svg: laneSVG({}, { vb: '0 40 1440 360', par: 'xMidYMid slice' }), night: true };
  return { svg: '', night: false };
}
/** The picture in a frame div: `<div class="art night">…</div>`. */
export const artBox = (key, cls = 'art') => { const a = art(key); return `<div class="${cls}${a.night ? ' night' : ''}">${a.svg}</div>`; };

/** A round portrait for the chat. The Stranger's face sits on the night sky. */
export function face(who) {
  if (who === 'stranger') return `<svg viewBox="26 14 68 68" aria-hidden="true">${stranger('calm', { light: .6, lantern: false })}</svg>`;
  if (who === 'moss') return `<svg viewBox="26 14 68 68" aria-hidden="true">${moss({ awake: true })}</svg>`;
  if (who === 'mimi') return `<svg viewBox="-2 6 50 50" aria-hidden="true">${cat()}</svg>`;
  if (who === 'voice') return `<svg viewBox="-12 -14 94 80" aria-hidden="true">${radio()}</svg>`;
  const c = PEOPLE[who];
  return c ? `<svg viewBox="28 24 64 64" aria-hidden="true">${person(c)}</svg>` : '';
}
