import { person, CAST, cat, blanket, radio } from './people.js';
import { stranger, moss, spark } from './stranger.js';
import { glowDef, nextId, laneSVG } from './lane.js';
import { sceneSVG } from './scenes.js';

// The places of the story that the lessons never needed: the garden of No. 1 under the linden, the bus stop at night,
// Mrs Hughes's garden at No. 9 and the office roof. Every scene is 360 × 250. Night scenes are drawn with the night
// tokens (the caller wraps them in .night), so they stay night whatever the reader's theme.
// `panel(n)` composes the album picture of episode n from the scenes and the cast.

const stars = (pts, r = 1.3) => `<g class="stars">${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? r : r * 1.6}" fill="var(--sun)"/>`).join('')}</g>`;
const moon = (x, y, r, sky = 'var(--sky)') => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--sun)"/><circle cx="${x + r * .45}" cy="${y - r * .3}" r="${r * .88}" fill="${sky}"/>`;
const at = (x, y, s, svg) => `<g transform="translate(${x} ${y}) scale(${s})">${svg}</g>`;
const bust = (who, x, y, s = .5) => at(x, y, s, person(CAST[who]));
const heart = (x, y, s, c) => `<path d="M${x} ${y + 5 * s}c-3-3-7-1-7 2 0 3 7 7 7 7s7-4 7-7c0-3-4-5-7-2z" transform="scale(1)" fill="${c}"/>`;

/* ---------------------------------------------------------------- the linden: a tree of little heart leaves */
export function linden(x, y, s = 1, { glow = 0 } = {}) {
  const gid = nextId('lg');
  const leaves = [[-26, -30], [18, -40], [-6, -58], [30, -12], [-34, 0], [4, -20], [-18, -44], [24, -54], [-40, -24], [40, -32]];
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${glow ? `<defs><radialGradient id="${gid}"><stop offset="0" style="stop-color:var(--spark);stop-opacity:.5"/><stop offset="1" style="stop-color:var(--spark);stop-opacity:0"/></radialGradient></defs><circle class="treeglow" cx="0" cy="-30" r="${80 + 30 * glow}" fill="url(#${gid})" opacity="${.35 + .5 * glow}"/>` : ''}
    <path d="M-7 70V10q-12-10-22-14l3-4q12 5 19 12V-6h14v16q8-8 20-12l3 4q-11 4-23 14v60z" fill="var(--trunk)"/>
    <circle cx="-34" cy="-6" r="32" fill="var(--tree)"/><circle cx="34" cy="-8" r="34" fill="var(--tree)"/><circle cx="0" cy="-34" r="44" fill="var(--tree)"/>
    <circle cx="-24" cy="-58" r="26" fill="var(--tree)"/><circle cx="26" cy="-60" r="28" fill="var(--tree)"/><circle cx="0" cy="-2" r="30" fill="var(--tree)"/>
    ${leaves.map(([lx, ly]) => heart(lx, ly, 1, 'var(--tree-2)')).join('')}
    ${glow ? [[-20, -40], [22, -26], [4, -62], [-38, -12], [36, -50], [-6, -14]].slice(0, Math.ceil(glow * 6)).map(([lx, ly]) => `<circle cx="${lx}" cy="${ly}" r="2.6" fill="var(--spark)"/><circle cx="${lx}" cy="${ly}" r="6" fill="var(--spark)" opacity=".3"/>`).join('') : ''}
  </g>`;
}

/* ---------------------------------------------------------------- No. 1, the front garden */
export function garden({ tree = .4, door = true } = {}) {
  const gid = nextId('gg');
  return `${glowDef(gid)}<rect width="360" height="250" fill="var(--sky)"/>
    ${stars([[150, 22], [186, 50], [214, 16], [292, 30], [330, 60], [262, 64], [120, 40], [346, 18]])}
    ${moon(318, 38, 13)}
    <path d="M0 196h360" stroke="var(--kerb)" stroke-width="2"/>
    <g fill="var(--b-navy)" opacity=".75"><rect x="150" y="128" width="40" height="66"/><path d="M146 130l24-16 24 16z"/><rect x="196" y="140" width="34" height="54"/><rect x="300" y="120" width="60" height="76"/></g>
    <g fill="var(--lit)"><rect x="158" y="140" width="8" height="10" rx="1"/><rect x="204" y="152" width="7" height="9" rx="1"/><rect x="312" y="134" width="8" height="10" rx="1"/><rect x="336" y="156" width="8" height="10" rx="1"/></g>
    ${door ? `<rect x="0" y="16" width="128" height="190" fill="var(--b-blue)"/><path d="M-6 20h140" stroke="var(--roof)" stroke-width="10"/>
      <rect x="16" y="52" width="40" height="52" rx="3" class="win on"/><path d="M36 52v52M16 76h40" stroke="var(--win-frame)" stroke-width="3"/>
      <circle class="glow" cx="100" cy="112" r="46" fill="url(#${gid})"/>
      <path d="M78 206v-66c0-12 9-20 20-20s20 8 20 20v66z" fill="var(--door)"/><circle cx="111" cy="168" r="2.2" fill="var(--sun)"/>
      <rect x="90" y="138" width="16" height="12" rx="2" fill="var(--card)"/><text x="98" y="147.5" text-anchor="middle" class="plate">1</text>
      <path d="M92 108h12l-2 8h-8z" fill="var(--b-navy)"/><circle class="bulb" cx="98" cy="117" r="3.4" fill="var(--lit)"/>
      <rect x="18" y="176" width="16" height="30" rx="2" fill="var(--postbox)"/><circle cx="26" cy="172" r="9" fill="var(--tree)"/><circle cx="20" cy="166" r="5" fill="var(--tree-2)"/>` : ''}
    <g fill="var(--b-cream)" opacity=".9">${Array.from({ length: 14 }, (_, k) => `<path d="M${132 + k * 16} 206v-30l4-5 4 5v30z"/>`).join('')}<rect x="130" y="182" width="230" height="4"/><rect x="130" y="196" width="230" height="4"/></g>
    ${linden(262, 150, 1, { glow: tree })}
    <rect x="0" y="204" width="360" height="46" fill="var(--tree)"/><path d="M0 204h360" stroke="var(--tree-2)" stroke-width="3" opacity=".6"/>
    ${[[92, 222, 18], [124, 236, 16], [160, 244, 14]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .36}" fill="var(--pave)"/>`).join('')}
    <g><rect x="286" y="194" width="62" height="7" rx="2" fill="var(--wood-top)"/><rect x="286" y="182" width="62" height="6" rx="2" fill="var(--wood)"/><path d="M292 201v14M342 201v14" stroke="var(--wood-line)" stroke-width="4" stroke-linecap="round"/></g>`;
}

/* ---------------------------------------------------------------- the bus stop at night */
export function busstop({ bus = true, rain = true, lights = 0 } = {}) {
  const gid = nextId('bg');
  return `${glowDef(gid)}<rect width="360" height="250" fill="var(--sky)"/>
    ${stars([[40, 20], [96, 44], [150, 18], [206, 36], [250, 14], [330, 26], [300, 56]])}
    ${lights ? [[250, 44], [290, 30]].slice(0, lights).map(([x, y], i) => `<path d="M${x + 70} ${y - 30}L${x} ${y}" stroke="var(--spark)" stroke-width="2" opacity=".5" stroke-linecap="round"/><g transform="translate(${x} ${y})">${spark(i ? .7 : 1)}</g>`).join('') : ''}
    <g fill="var(--b-navy)" opacity=".7"><rect x="0" y="110" width="60" height="80"/><rect x="230" y="96" width="70" height="94"/><path d="M226 98l39-24 39 24z"/><rect x="304" y="126" width="56" height="64"/></g>
    <g fill="var(--lit)"><rect x="12" y="124" width="8" height="10" rx="1"/><rect x="40" y="150" width="8" height="10" rx="1"/><rect x="246" y="116" width="9" height="11" rx="1"/><rect x="276" y="146" width="9" height="11" rx="1"/><rect x="318" y="140" width="8" height="10" rx="1"/></g>
    <rect x="0" y="186" width="360" height="16" fill="var(--pave)"/><rect x="0" y="200" width="360" height="4" fill="var(--kerb)"/><rect x="0" y="204" width="360" height="46" fill="var(--road)"/>
    <g fill="var(--dash)">${[10, 90, 170, 250, 330].map(x => `<rect x="${x}" y="226" width="40" height="4" rx="2"/>`).join('')}</g>
    <g><rect x="64" y="104" width="112" height="8" rx="2" fill="var(--b-navy)"/><rect x="68" y="112" width="4" height="76" fill="var(--b-navy)"/><rect x="168" y="112" width="4" height="76" fill="var(--b-navy)"/>
      <rect x="72" y="116" width="96" height="62" fill="var(--window)" opacity=".55"/><rect x="80" y="164" width="60" height="6" rx="2" fill="var(--wood)"/>
      <rect x="146" y="122" width="16" height="30" rx="2" fill="var(--card)"/>${[0, 1, 2, 3].map(i => `<rect x="149" y="${127 + i * 6}" width="10" height="2" fill="var(--faint)"/>`).join('')}</g>
    <rect x="44" y="96" width="4" height="92" fill="var(--b-navy)"/><rect x="30" y="80" width="32" height="20" rx="4" fill="var(--postbox)"/><text x="46" y="94" text-anchor="middle" class="bus-t">BUS</text>
    <circle class="glow" cx="214" cy="84" r="60" fill="url(#${gid})"/><rect x="212" y="84" width="4" height="104" fill="var(--b-navy)"/><path d="M205 84h18l-3-11h-12z" fill="var(--b-navy)"/><circle class="bulb" cx="214" cy="86" r="4" fill="var(--lit)"/>
    ${bus ? `<g><rect x="232" y="132" width="132" height="72" rx="10" fill="var(--postbox)"/><path d="M232 162h132" stroke="var(--awning-a)" stroke-width="3" opacity=".6"/>
      ${[244, 272, 300, 328].map(x => `<rect x="${x}" y="140" width="22" height="16" rx="2" fill="var(--lit)" opacity=".85"/>`).join('')}
      <rect x="238" y="168" width="22" height="30" rx="2" fill="var(--b-navy)"/><circle cx="262" cy="206" r="10" fill="var(--b-navy)"/><circle cx="340" cy="206" r="10" fill="var(--b-navy)"/>
      <circle cx="262" cy="206" r="3.6" fill="var(--china-line)"/><circle cx="340" cy="206" r="3.6" fill="var(--china-line)"/>
      <rect x="248" y="142" width="18" height="12" rx="2" fill="var(--b-navy)" opacity=".25"/><text x="330" y="186" text-anchor="middle" class="bus-t">NIGHT BUS</text></g>` : ''}
    ${rain ? `<g stroke="var(--china-line)" stroke-width="1.2" opacity=".35" stroke-linecap="round">${Array.from({ length: 26 }, (_, k) => { const x = (k * 53) % 360, y = (k * 37) % 170; return `<path d="M${x} ${y}l-4 12"/>`; }).join('')}</g>` : ''}
    <ellipse cx="120" cy="196" rx="30" ry="3" fill="var(--lit)" opacity=".18"/>`;
}

/* ---------------------------------------------------------------- Mrs Hughes's garden at No. 9 (follows the theme) */
// Named places, for the prepositions game: the hit box [x, y, w, h] of each.
export const NO9 = {
  'on the bench': [74, 134, 76, 18], 'under the bench': [80, 158, 64, 22], 'in the wheelbarrow': [272, 186, 58, 16],
  'behind the shed': [320, 60, 38, 30], 'next to the birdbath': [206, 150, 28, 30], 'between the pots': [130, 206, 22, 26],
  'in front of the gnome': [196, 214, 40, 20], 'in the tree': [14, 24, 64, 52], 'on the shed roof': [252, 58, 62, 14],
  'under the watering can': [6, 204, 38, 22], 'in the birdbath': [168, 126, 36, 12], 'next to the gnome': [240, 176, 26, 30],
};
export function no9() {
  return `<rect width="360" height="250" fill="var(--sky)"/>
    <rect x="96" y="20" width="160" height="112" fill="var(--b-rose)"/><path d="M90 24h172" stroke="var(--roof)" stroke-width="10"/>
    <rect x="112" y="42" width="34" height="42" rx="3" class="win"/><rect x="206" y="42" width="34" height="42" rx="3" class="win"/>
    <rect x="164" y="70" width="28" height="62" rx="3" fill="var(--door-2)"/><circle cx="186" cy="102" r="2" fill="var(--sun)"/>
    <g fill="var(--b-cream)">${Array.from({ length: 23 }, (_, k) => `<path d="M${k * 16} 150v-40l5-6 5 6v40z"/>`).join('')}<rect x="0" y="116" width="360" height="4"/><rect x="0" y="138" width="360" height="4"/></g>
    <circle cx="46" cy="56" r="34" fill="var(--tree)"/><circle cx="24" cy="76" r="22" fill="var(--tree)"/><circle cx="68" cy="78" r="22" fill="var(--tree)"/><rect x="40" y="86" width="12" height="70" fill="var(--trunk)"/>
    ${[[30, 48], [58, 40], [46, 70], [22, 70], [70, 66]].map(([x, y]) => heart(x, y, 1, 'var(--tree-2)')).join('')}
    <g><rect x="258" y="68" width="92" height="96" fill="var(--wood)"/><path d="M250 72l54-18 54 18z" fill="var(--roof)"/><rect x="286" y="102" width="30" height="62" fill="var(--wood-line)"/><circle cx="310" cy="134" r="2" fill="var(--sun)"/>
      <path d="M258 86h92M258 104h28M316 104h34M258 122h28M316 122h34M258 140h28M316 140h34" stroke="var(--wood-line)" stroke-width="1.5" opacity=".7"/></g>
    <rect x="0" y="152" width="360" height="98" fill="var(--tree-2)"/><path d="M0 152h360" stroke="var(--tree)" stroke-width="3"/>
    <g><rect x="72" y="142" width="80" height="7" rx="2" fill="var(--wood-top)"/><rect x="72" y="128" width="80" height="7" rx="2" fill="var(--wood)"/><path d="M80 149v28M144 149v28" stroke="var(--wood-line)" stroke-width="5" stroke-linecap="round"/></g>
    <g><rect x="182" y="134" width="8" height="40" fill="var(--stone)"/><path d="M166 126h40l-6 10h-28z" fill="var(--stone)"/><ellipse cx="186" cy="127" rx="18" ry="3" fill="var(--sky)"/><rect x="176" y="172" width="20" height="5" rx="2" fill="var(--stone-dark)"/></g>
    ${[[112, 206], [156, 206]].map(([x, y]) => `<path d="M${x} ${y}h20l-3 24h-14z" fill="var(--postbox)"/><rect x="${x - 2}" y="${y - 4}" width="24" height="6" rx="2" fill="var(--awning-a)"/><circle cx="${x + 10}" cy="${y - 10}" r="9" fill="var(--tree)"/><circle cx="${x + 5}" cy="${y - 14}" r="3" fill="var(--sun)"/><circle cx="${x + 14}" cy="${y - 12}" r="3" fill="var(--b-rose)"/>`).join('')}
    ${at(196, 160, .42, moss())}
    <g><path d="M274 186h58l-6 18h-46z" fill="var(--pen)"/><path d="M274 186l-10-8M330 196l22 10" stroke="var(--b-navy)" stroke-width="3.5" stroke-linecap="round"/><circle cx="300" cy="212" r="8" fill="var(--b-navy)"/><circle cx="300" cy="212" r="3" fill="var(--china-line)"/></g>
    <g><path d="M10 206h28v18H10z" fill="var(--leaf)"/><path d="M38 210l14-10" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round"/><path d="M14 206q10-14 20 0" stroke="var(--leaf)" stroke-width="3" fill="none"/></g>`;
}

/* ---------------------------------------------------------------- the office roof, with Dr Okafor's telescope */
export function roof({ okafor = false } = {}) {
  const gid = nextId('rg');
  return `${glowDef(gid)}<rect width="360" height="250" fill="var(--sky)"/>
    ${stars([[20, 20], [60, 50], [90, 14], [132, 38], [170, 20], [228, 46], [262, 18], [300, 40], [340, 16], [320, 70], [48, 80], [110, 70], [196, 66]], 1.4)}
    ${moon(300, 44, 14)}
    <g fill="var(--b-navy)" opacity=".8"><rect x="0" y="150" width="46" height="60"/><rect x="50" y="128" width="30" height="82"/><rect x="84" y="160" width="60" height="50"/><rect x="226" y="140" width="40" height="70"/><rect x="270" y="118" width="36" height="92"/><rect x="310" y="152" width="50" height="58"/></g>
    <g fill="var(--lit)">${[[8, 160], [30, 176], [58, 138], [66, 164], [96, 170], [124, 184], [236, 150], [250, 176], [280, 130], [292, 160], [322, 164], [342, 182]].map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="8" rx="1"/>`).join('')}</g>
    <rect x="0" y="196" width="360" height="54" fill="var(--pave)"/><rect x="0" y="190" width="360" height="10" fill="var(--kerb)"/>
    <g><rect x="14" y="128" width="60" height="62" rx="4" fill="var(--b-cream)"/><path d="M14 142h60M14 160h60M14 176h60" stroke="var(--wood-line)" stroke-width="1.5" opacity=".5"/><path d="M20 190v8M68 190v8" stroke="var(--b-navy)" stroke-width="4"/></g>
    <g><rect x="96" y="136" width="54" height="60" fill="var(--b-cream)"/><path d="M92 138h62" stroke="var(--roof)" stroke-width="6"/><rect x="110" y="152" width="26" height="44" fill="var(--door)"/><rect x="114" y="156" width="18" height="14" rx="2" fill="var(--lit)" opacity=".9"/></g>
    <circle class="glow" cx="123" cy="150" r="40" fill="url(#${gid})"/>
    <g><path d="M322 196V52" stroke="var(--b-navy)" stroke-width="3"/><path d="M310 76h24M314 96h16M306 60l16-12 16 12" stroke="var(--b-navy)" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="322" cy="48" r="3" fill="var(--postbox)"/></g>
    <g><path d="M226 200l14-44 14 44M240 156v44" stroke="var(--b-navy)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g transform="rotate(-32 240 150)"><rect x="200" y="140" width="84" height="20" rx="6" fill="var(--brass)"/><rect x="278" y="136" width="14" height="28" rx="4" fill="var(--brass-dark)"/><rect x="196" y="144" width="10" height="12" rx="3" fill="var(--b-navy)"/><path d="M214 140v20M262 140v20" stroke="var(--brass-dark)" stroke-width="2"/></g>
      <circle cx="240" cy="152" r="5" fill="var(--b-navy)"/></g>
    ${okafor ? bust('okafor', 160, 128, .5) : ''}`;
}

/* ---------------------------------------------------------------- the album: one picture per episode */
const svgWrap = (inner, vb = '0 0 360 250') => `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
const inScene = (key, extra) => sceneSVG(key).replace(/<\/svg>$/, `${extra}</svg>`);
const streak = `<g class="streak"><path d="M360 12Q260 30 200 118" stroke="var(--spark)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/></g>`;

/** Night pictures carry `night: true`; the album wraps them in .night. */
export const PANELS = {
  1: { night: true, svg: () => svgWrap(garden({ tree: .5 }) + streak + at(196, 110, .62, stranger('surprised', { light: .1 })) + at(116, 188, .5, cat())) },
  2: { night: false, svg: () => inScene('cafe', `${at(64, 70, .52, stranger('happy', { light: .2 }))}<g transform="translate(45 112)">${spark(1.3)}</g>`) },
  3: { night: true, svg: () => inScene('room', `${at(196, 164, .5, stranger('thinking', { light: .28 }))}<g transform="translate(78 196)">${spark(.8)}</g>`) },
  4: { night: true, svg: () => svgWrap(busstop({ bus: true, lights: 2 }) + bust('sam', 104, 116, .46)) },
  5: { night: false, svg: () => inScene('shop', `${at(236, 104, .5, stranger('shy', { light: .42 }))}<g fill="var(--sun)" stroke="var(--pastry-dark)">${[[118, 176], [132, 180], [124, 186]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3"/>`).join('')}</g>`) },
  6: { night: false, svg: () => svgWrap(no9() + at(222, 118, .52, stranger('surprised', { light: .5 }))) },
  7: { night: true, svg: () => svgWrap(garden({ tree: .6, door: false }) + at(24, 96, .7, stranger('happy', { light: .58 })) + `<rect x="112" y="196" width="78" height="8" rx="2" fill="var(--wood-top)"/><path d="M120 204v14M182 204v14" stroke="var(--wood-line)" stroke-width="4"/>${at(116, 146, .9, radio())}<g transform="translate(186 150)"><g fill="none" stroke="var(--signal)" stroke-width="2.6" stroke-linecap="round" opacity=".85"><path d="M0 0q8 10 0 20"/><path d="M10-8q14 18 0 36"/><path d="M20-16q20 26 0 52"/></g></g>`) },
  8: { night: false, svg: () => inScene('cafe', `${bust('hughes', 20, 96, .56)}<g transform="translate(236 128) rotate(6)"><rect width="58" height="46" rx="3" fill="var(--china)" stroke="var(--china-line)"/><rect x="5" y="5" width="48" height="30" fill="var(--b-navy)"/><g transform="translate(29 20)">${spark(.5)}</g><text x="29" y="43" text-anchor="middle" style="font:700 7px var(--f-hand);fill:var(--ink)">1966</text></g>`) },
  9: { night: true, svg: () => inScene('room', `${at(170, 136, .5, stranger('calm', { light: .75 }))}${at(250, 146, .38, moss({ awake: true }))}`) },
  10: { night: true, svg: () => svgWrap(roof({ okafor: true }) + at(278, 128, .44, stranger('surprised', { light: .83 }))) },
  11: { night: true, svg: () => svgWrap(garden({ tree: 1, door: false }) + `<g transform="translate(262 26)">${spark(1.5)}</g>` + at(120, 100, .62, stranger('happy', { light: .92 }))) },
  12: { night: true, svg: () => svgWrap(roof() + at(150, 40, .7, stranger('star', { light: 1 })) + bust('tom', 0, 150, .5) + bust('priya', 290, 150, .5) + at(80, 208, .5, cat())) },
};

export const panelSVG = n => PANELS[n]?.svg() || '';
export { blanket, radio };

/* ---------------------------------------------------------------- the opening picture of each episode */
const laneCrop = (vb, lit) => laneSVG(lit, { vb, par: 'xMidYMid slice' });
export const START = {
  1: { night: true, svg: () => svgWrap(garden({ tree: .3 }) + streak) },
  2: { night: false, svg: () => inScene('cafe', at(40, 70, .52, stranger('calm', { light: .1 }))) },
  3: { night: true, svg: () => inScene('room', at(290, 132, .5, stranger('thinking', { light: .18 }))) },
  4: { night: true, svg: () => svgWrap(busstop({ bus: false }) + bust('sam', 96, 118, .46)) },
  5: { night: false, svg: () => inScene('shop', `<g fill="var(--sun)" stroke="var(--pastry-dark)">${[[118, 176], [132, 180], [124, 186]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3"/>`).join('')}</g>`) },
  6: { night: false, svg: () => svgWrap(no9()) },
  7: { night: true, svg: () => laneCrop('640 90 400 280', { shop: [0, 2, 4], no9: [0, 1, 3], bus: [0, 1, 2, 3, 4] }) },
  8: { night: false, svg: () => inScene('cafe', `${bust('hughes', 20, 96, .56)}${at(236, 106, .5, stranger('calm', { light: .6 }))}`) },
  9: { night: true, svg: () => inScene('room', `${at(170, 136, .5, stranger('surprised', { light: .66 }))}${at(250, 146, .38, moss())}`) },
  10: { night: true, svg: () => laneCrop('1085 40 360 250', { office: [0, 3, 5] }) },
  11: { night: true, svg: () => svgWrap(garden({ tree: .9, door: false }) + at(150, 100, .62, stranger('thinking', { light: .83 }))) },
  12: { night: true, svg: () => inScene('room', at(200, 136, .5, stranger('calm', { light: .92 }))) },
};
