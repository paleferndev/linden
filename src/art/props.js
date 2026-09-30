import { objIcon } from './scenes.js';
import { person, CAST, cat, blanket } from './people.js';
import { spark } from './stranger.js';
import { busstop } from './night.js';

// Small drawings for the games: things on Priya's shelves, Mrs Hughes's lost things, the office signs, the notes of
// the plan, Sam's night in five pictures, the things Dr Okafor compares, and the neighbours' photos.

const svg = (vb, inner) => `<svg viewBox="${vb}" aria-hidden="true">${inner}</svg>`;

/* ---------------------------------------------------------------- Priya's delivery */
export const ITEMS = {
  apples: () => objIcon('shop:apples'), milk: () => objIcon('cafe:milk'), eggs: () => objIcon('shop:eggs'), bread: () => objIcon('shop:bread'),
  sugar: () => objIcon('cafe:sugar'), bananas: () => objIcon('shop:bananas'),
  candles: () => svg('0 0 64 64', [14, 28, 42].map((x, i) => `<rect x="${x}" y="${22 + i * 3}" width="9" height="${34 - i * 3}" rx="2" fill="var(--cream)" stroke="var(--china-line)"/><path d="M${x + 4.5} ${22 + i * 3}v-4" stroke="var(--ink)" stroke-width="1.4"/><path d="M${x + 4.5} ${12 + i * 3}c3 3 2 6 0 6s-3-3 0-6z" fill="var(--sun)"/>`).join('') + '<rect x="8" y="54" width="48" height="5" rx="2" fill="var(--wood)"/>'),
  money: () => svg('0 0 64 64', `<g transform="rotate(-10 32 32)"><rect x="8" y="18" width="46" height="26" rx="3" fill="var(--leaf-soft)" stroke="var(--leaf)" stroke-width="1.6"/><circle cx="31" cy="31" r="7" fill="none" stroke="var(--leaf)" stroke-width="1.6"/><text x="31" y="35" text-anchor="middle" class="note-t" style="fill:var(--leaf)">£</text></g><g transform="rotate(6 34 40)"><rect x="12" y="30" width="46" height="24" rx="3" fill="var(--plum-soft)" stroke="var(--plum)" stroke-width="1.6"/><circle cx="35" cy="42" r="6.5" fill="none" stroke="var(--plum)" stroke-width="1.6"/><text x="35" y="46" text-anchor="middle" class="note-t" style="fill:var(--plum)">£</text></g>`),
  coins: () => svg('0 0 64 64', [[20, 44], [36, 48], [30, 36], [46, 38]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="4" fill="var(--sun)" stroke="var(--pastry-dark)" stroke-width="1.3"/><ellipse cx="${x}" cy="${y - 2.4}" rx="10" ry="4" fill="var(--sun)" stroke="var(--pastry-dark)" stroke-width="1.3"/>`).join('')),
  info: () => svg('0 0 64 64', `<rect x="14" y="8" width="36" height="48" rx="3" fill="var(--china)" stroke="var(--china-line)" stroke-width="1.6"/><circle cx="32" cy="22" r="7" fill="var(--pen)"/><rect x="30.6" y="19.5" width="2.8" height="7" rx="1" fill="#fff"/><circle cx="32" cy="17" r="1.5" fill="#fff"/><path d="M21 36h22M21 42h22M21 48h14" stroke="var(--china-line)" stroke-width="2" stroke-linecap="round"/>`),
  batteries: () => svg('0 0 64 64', [10, 24, 38].map(x => `<rect x="${x}" y="16" width="12" height="36" rx="2" fill="var(--b-navy)"/><rect x="${x}" y="16" width="12" height="12" rx="2" fill="var(--sun)"/><rect x="${x + 3.5}" y="12" width="5" height="4" rx="1" fill="var(--faint)"/>`).join('')),
  time: () => svg('0 0 64 64', `<circle cx="32" cy="34" r="20" fill="var(--china)" stroke="var(--b-navy)" stroke-width="3"/><path d="M32 34V22M32 34l9 5" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/><circle cx="32" cy="34" r="2" fill="var(--postbox)"/><path d="M18 14l-6 6M46 14l6 6" stroke="var(--b-navy)" stroke-width="3" stroke-linecap="round"/>`),
};

/* ---------------------------------------------------------------- Mrs Hughes's lost things, drawn on the garden */
export const LOST = {
  glasses: (x, y) => `<g transform="translate(${x - 12} ${y - 6})" fill="none" stroke="var(--ink)" stroke-width="2"><circle cx="6" cy="6" r="5"/><circle cx="18" cy="6" r="5"/><path d="M11 6h2"/></g>`,
  key: (x, y) => `<g transform="translate(${x - 12} ${y - 5})"><circle cx="5" cy="5" r="4.5" fill="none" stroke="var(--brass)" stroke-width="2.4"/><path d="M9 5h14M19 5v4M22 5v3" stroke="var(--brass)" stroke-width="2.4"/></g>`,
  phone: (x, y) => `<g transform="translate(${x - 7} ${y - 11})"><rect width="14" height="22" rx="3" fill="var(--b-navy)"/><rect x="2" y="3" width="10" height="14" rx="1" fill="var(--sky)"/></g>`,
  gloves: (x, y) => `<g transform="translate(${x - 10} ${y - 9})" fill="var(--postbox)"><path d="M2 18V8a3 3 0 0 1 6 0V3a2 2 0 0 1 4 0v5h1v-4a2 2 0 0 1 4 0v14z"/></g>`,
  paper: (x, y) => `<g transform="translate(${x - 11} ${y - 8}) rotate(-8 11 8)"><rect width="22" height="15" fill="var(--china)" stroke="var(--china-line)"/><path d="M3 4h16M3 8h9M3 11h12" stroke="var(--ink)" stroke-width="1.4" opacity=".6"/></g>`,
  ball: (x, y) => `<g transform="translate(${x} ${y})"><circle r="7" fill="var(--postbox)"/><path d="M-7 0q7-5 14 0" stroke="var(--sun)" stroke-width="1.6" fill="none"/></g>`,
  spark: (x, y) => `<g transform="translate(${x} ${y}) scale(.8)">${spark()}</g>`,
};

/* ---------------------------------------------------------------- the office signs */
const round = (ring, inner, bar = false) => svg('0 0 100 100', `<circle cx="50" cy="50" r="44" fill="var(--card)" stroke="${ring}" stroke-width="9"/>${inner}${bar ? `<path d="M20 20l60 60" stroke="${ring}" stroke-width="9" stroke-linecap="round"/>` : ''}`);
const board = inner => svg('0 0 100 100', `<rect x="8" y="14" width="84" height="72" rx="8" fill="var(--pen)"/>${inner}`);
export const SIGNS = {
  helmet: () => round('var(--pen)', `<path d="M28 60a22 22 0 0 1 44 0z" fill="var(--pen)"/><rect x="24" y="58" width="52" height="7" rx="3" fill="var(--pen)"/><path d="M50 38v-4" stroke="var(--card)" stroke-width="4"/>`),
  nofood: () => round('var(--postbox)', `<path d="M36 30v40M32 30v12a4 4 0 0 0 8 0V30M60 30c-6 4-6 16 0 18v22" stroke="var(--ink)" stroke-width="4" fill="none" stroke-linecap="round"/>`, true),
  lift: () => board(`<rect x="26" y="24" width="48" height="50" rx="3" fill="var(--card)"/><path d="M50 24v50" stroke="var(--pen)" stroke-width="2"/><path d="M40 40l-6 7h12zM60 54l-6-7h12z" fill="var(--pen)"/><rect x="14" y="62" width="72" height="14" rx="3" fill="var(--sun)"/><text x="50" y="72.5" text-anchor="middle" style="font:800 9px var(--f-ui);fill:var(--ink)">OUT OF ORDER</text>`),
  signin: () => board(`<rect x="28" y="24" width="44" height="52" rx="3" fill="var(--card)"/><path d="M34 36h32M34 46h32M34 56h20" stroke="var(--china-line)" stroke-width="3" stroke-linecap="round"/><path d="M60 72l14-26 6 3-14 26-7 3z" fill="var(--sun)" stroke="var(--ink)" stroke-width="1.5"/>`),
  stairs: () => board(`<path d="M22 74h14V62h14V50h14V38h14" stroke="var(--card)" stroke-width="6" fill="none" stroke-linejoin="round"/><text x="72" y="30" text-anchor="middle" style="font:800 13px var(--f-ui);fill:var(--sun)">8</text>`),
  coffee: () => board(`<path d="M34 42h28v14a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10z" fill="var(--card)"/><path d="M62 46h4a5 5 0 0 1 0 10h-4" stroke="var(--card)" stroke-width="3.5" fill="none"/><path d="M42 30c-3 3 3 5 0 8M52 30c-3 3 3 5 0 8" stroke="var(--card)" stroke-width="2.5" fill="none"/><text x="50" y="82" text-anchor="middle" style="font:800 10px var(--f-ui);fill:var(--sun)">FREE</text>`),
  quiet: () => round('var(--pen)', `<path d="M34 42h10l12-10v36L44 58H34z" fill="var(--pen)"/><path d="M62 42q6 8 0 16" stroke="var(--pen)" stroke-width="3.5" fill="none"/>`, true),
};

/* ---------------------------------------------------------------- the notes of the plan */
export const DOODLES = {
  clouds: () => svg('0 0 60 40', `<g fill="var(--faint)"><ellipse cx="22" cy="22" rx="14" ry="9"/><circle cx="30" cy="16" r="9"/><ellipse cx="40" cy="24" rx="12" ry="8"/></g><path d="M18 34l-2 4M28 34l-2 4M38 34l-2 4" stroke="var(--pen)" stroke-width="2" stroke-linecap="round"/>`),
  calendar: () => svg('0 0 60 40', `<rect x="14" y="6" width="32" height="30" rx="3" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/><rect x="14" y="6" width="32" height="8" fill="var(--postbox)"/><text x="30" y="30" text-anchor="middle" style="font:800 12px var(--f-ui);fill:var(--ink)">FRI</text>`),
  window: () => svg('0 0 60 40', `<rect x="16" y="4" width="28" height="32" rx="2" fill="var(--sky)" stroke="var(--ink)" stroke-width="2"/><path d="M30 4v32M16 20h28" stroke="var(--ink)" stroke-width="2"/>`),
  moon: () => svg('0 0 60 40', `<circle cx="30" cy="20" r="12" fill="var(--sun)"/><circle cx="35" cy="16" r="10.5" fill="var(--marker-soft)"/><circle cx="12" cy="10" r="1.6" fill="var(--sun)"/><circle cx="50" cy="28" r="1.6" fill="var(--sun)"/>`),
  candle: () => svg('0 0 60 40', `<rect x="25" y="14" width="10" height="22" rx="2" fill="var(--cream)" stroke="var(--china-line)"/><path d="M30 14v-3" stroke="var(--ink)" stroke-width="1.4"/><path d="M30 3c3 3 2 7 0 7s-3-4 0-7z" fill="var(--sun)"/>`),
  heart: () => svg('0 0 60 40', `<path d="M30 34C18 26 12 20 12 13a8 8 0 0 1 18-4 8 8 0 0 1 18 4c0 7-6 13-18 21z" fill="var(--postbox)"/>`),
};

/* ---------------------------------------------------------------- Sam's night, five pictures (120 × 80, always night) */
const nightBg = inner => svg('0 0 120 80', `<rect width="120" height="80" fill="#15233A"/>${[[12, 10], [40, 18], [70, 8], [96, 20], [110, 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#F1E4BF"/>`).join('')}<rect y="66" width="120" height="14" fill="#262C35"/>${inner}`);
const miniBus = (x, y, lit = true) => `<g transform="translate(${x} ${y})"><rect width="60" height="30" rx="5" fill="#CF4430"/>${[5, 18, 31, 44].map(k => `<rect x="${k}" y="5" width="10" height="8" rx="1.5" fill="${lit ? '#FFC857' : '#26344B'}"/>`).join('')}<circle cx="12" cy="31" r="5" fill="#222C44"/><circle cx="48" cy="31" r="5" fill="#222C44"/></g>`;
export const NIGHT_PANELS = {
  stop: () => nightBg(`<rect x="10" y="30" width="4" height="36" fill="#222C44"/><rect x="4" y="22" width="16" height="10" rx="2" fill="#CF4430"/>${miniBus(44, 34)}<circle cx="100" cy="20" r="9" fill="#F1E4BF"/><path d="M100 14v6h4" stroke="#15233A" stroke-width="1.6" fill="none"/>`),
  quiet: () => nightBg(`<g stroke="#9C9387" stroke-width="1" opacity=".5">${Array.from({ length: 14 }, (_, k) => `<path d="M${(k * 17) % 120} ${(k * 11) % 60}l-3 8"/>`).join('')}</g><rect x="30" y="30" width="60" height="4" rx="1" fill="#222C44"/><rect x="34" y="34" width="3" height="32" fill="#222C44"/><rect x="83" y="34" width="3" height="32" fill="#222C44"/><rect x="40" y="54" width="34" height="4" rx="1" fill="#6A4A32"/>`),
  light: () => nightBg(`<path d="M118 6Q70 14 40 52" stroke="#FFDB7A" stroke-width="3" fill="none" stroke-linecap="round"/><g transform="translate(40 52) scale(.6)">${spark()}</g><g fill="#222C44"><rect x="10" y="46" width="22" height="20"/><rect x="60" y="40" width="26" height="26"/><path d="M58 42l15-10 15 10z"/></g>`),
  window: () => nightBg(`${miniBus(20, 30, false)}<g transform="translate(28 20) scale(.26)">${person(CAST.sam)}</g><path d="M40 28L80 6" stroke="#FFDB7A" stroke-width="1.5" stroke-dasharray="3 3"/><g transform="translate(86 8) scale(.5)">${spark()}</g>`),
  phone: () => nightBg(`<g transform="translate(34 14) scale(.44)">${person(CAST.sam)}</g><rect x="76" y="36" width="10" height="17" rx="2" fill="#0E151E" stroke="#9C9387"/><path d="M90 34q5 6 0 12M94 30q8 10 0 20" stroke="#6FF0E0" stroke-width="1.6" fill="none"/>`),
};

/* ---------------------------------------------------------------- Dr Okafor's table: three of each */
export const COMPARE = {
  lanterns: ['var(--pen)', 'var(--leaf)', 'var(--postbox)'].map((c, i) => () => svg('0 0 60 90', `<circle cx="30" cy="50" r="${10 + i * 12}" fill="var(--spark)" opacity="${.15 + i * .2}"/><path d="M22 20q8-12 16 0" stroke="var(--b-navy)" stroke-width="2.4" fill="none"/><path d="M18 26h24l-4-7H22z" fill="${c}"/><rect x="20" y="26" width="20" height="30" rx="3" fill="var(--spark)" opacity="${.25 + i * .35}"/><rect x="20" y="26" width="20" height="30" rx="3" fill="none" stroke="${c}" stroke-width="3"/><rect x="17" y="56" width="26" height="5" rx="2" fill="${c}"/>`)),
  ladders: [40, 64, 84].map(h => () => svg('0 0 60 90', `<path d="M20 88V${88 - h}M40 88V${88 - h}" stroke="var(--wood)" stroke-width="4" stroke-linecap="round"/>${Array.from({ length: Math.floor(h / 12) }, (_, k) => `<path d="M20 ${84 - k * 12}h20" stroke="var(--wood-line)" stroke-width="3"/>`).join('')}`)),
  thermo: [[70, 'Azi'], [40, 'Vineri'], [55, 'Joi']].map(([lvl, l]) => () => svg('0 0 60 90', `<rect x="24" y="8" width="12" height="62" rx="6" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/><rect x="27" y="${70 - lvl * .8}" width="6" height="${lvl * .8}" rx="3" fill="var(--pen)"/><circle cx="30" cy="74" r="9" fill="var(--pen)" stroke="var(--ink)" stroke-width="2"/><text x="30" y="89" text-anchor="middle" style="font:700 8px var(--f-ui);fill:var(--muted)">${l}</text>`)),
  cups: [['var(--tea-brown)', 3], ['var(--tea-brown)', 1], ['var(--kraft)', 2]].map(([c, stars]) => () => svg('0 0 60 90', `<path d="M16 40h26v16a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10z" fill="var(--china)" stroke="var(--china-line)" stroke-width="2"/><ellipse cx="29" cy="41" rx="12" ry="2.6" fill="${c}"/><path d="M42 44h3a5 5 0 0 1 0 10h-3" stroke="var(--china-line)" stroke-width="2.6" fill="none"/>${Array.from({ length: stars }, (_, k) => `<path d="M${16 + k * 13} 22l2.4 5 5.4.6-4 3.6 1 5.4-4.8-2.8-4.8 2.8 1-5.4-4-3.6 5.4-.6z" fill="var(--sun)"/>`).join('')}`)),
  sparks: [.7, 1.25, .95].map(s => () => svg('-30 -30 60 60', spark(s))),
};
export const COMPARE_NAMES = { lanterns: ['the blue lantern', 'the green lantern', 'the red lantern'], ladders: ['Sam’s', 'Priya’s', 'Tom’s'], thermo: ['azi', 'vineri', 'joi'], cups: ['Tom’s', 'mine', 'Priya’s'], sparks: ['', '', ''] };

/* ---------------------------------------------------------------- the Stranger's photos of the neighbours */
const PROPS = {
  boxes: `<rect x="34" y="104" width="52" height="34" rx="3" fill="var(--kraft)"/><path d="M34 118h52M60 104v14" stroke="var(--pastry-dark)" stroke-width="2"/><rect x="40" y="84" width="40" height="22" rx="3" fill="var(--kraft)"/><path d="M40 94h40" stroke="var(--pastry-dark)" stroke-width="2"/>`,
  paper: `<g transform="rotate(-6 60 118)"><rect x="28" y="100" width="64" height="44" rx="2" fill="var(--china)" stroke="var(--china-line)"/><path d="M60 100v44" stroke="var(--china-line)"/><path d="M34 108h20M34 114h20M34 120h14M66 108h20M66 114h20M66 120h14" stroke="var(--ink)" stroke-width="2" opacity=".55"/></g>`,
  sleep: `<rect x="10" y="112" width="100" height="50" rx="14" fill="var(--pen-soft)"/><path d="M10 124q50-14 100 0" stroke="var(--pen)" stroke-width="2" fill="none" opacity=".4"/><text x="92" y="40" style="font:800 16px var(--f-ui);fill:var(--pen)">z</text><text x="100" y="28" style="font:800 12px var(--f-ui);fill:var(--pen)">z</text>`,
  can: `<path d="M64 112h30v26H64z" fill="var(--leaf)"/><path d="M94 116l16-12" stroke="var(--leaf)" stroke-width="5" stroke-linecap="round"/><path d="M110 104l4 6M112 102l6 4" stroke="var(--pen)" stroke-width="1.6"/><circle cx="104" cy="140" r="5" fill="var(--postbox)"/><circle cx="112" cy="146" r="4" fill="var(--sun)"/>`,
  phone: `<rect x="80" y="50" width="12" height="22" rx="3" fill="var(--b-navy)"/><path d="M78 72l6 20" stroke="var(--skin-3)" stroke-width="8" stroke-linecap="round"/>`,
};
/** A photo of `who` doing `prop`. 120 × 150. */
export function photo(who, prop) {
  if (who === 'mimi') return svg('0 0 120 150', `<rect width="120" height="150" fill="var(--room-wall)"/>${blanket(8, 80, 104, 44)}<g transform="translate(18 44) scale(1.1)">${cat({ sleep: true })}</g>`);
  const c = CAST[who];
  const hide = prop === 'sleep' ? `<path d="M44 64h14M62 64h14" stroke="var(--eye)" stroke-width="2.4" stroke-linecap="round"/>` : '';
  return svg('0 0 120 150', `<rect width="120" height="150" fill="var(${c.bg})"/><g transform="translate(0 -4)">${person(c)}${hide ? `<g><circle cx="51" cy="64" r="4" fill="var(${c.skin})"/><circle cx="69" cy="64" r="4" fill="var(${c.skin})"/>${hide}</g>` : ''}</g>${PROPS[prop] || ''}`);
}

export { busstop };
