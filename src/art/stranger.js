import { nextId } from './lane.js';

// The Stranger: a small figure in a coat and a hat that are both too big for it. Under the brim there is only shadow
// and two points of warm light. It carries a lantern; the lantern gets brighter with every spark it gets back.
// Warm colours on purpose (camel coat, knitted scarf, gold light), so it reads as mysterious, never spooky.
// Drawn in a 120 × 160 box, standing on y = 150. Moods: calm, happy, surprised, thinking, shy, sleep, star.

const EYES = {
  calm: e => `${halo(54, 53, 5.5, .28)}${halo(66, 53, 5.5, .28)}<circle cx="54" cy="53" r="2.4" fill="${e}"/><circle cx="66" cy="53" r="2.4" fill="${e}"/>`,
  happy: e => `${halo(54, 53, 6, .3)}${halo(66, 53, 6, .3)}<path d="M51 54.5q3-4.2 6 0M63 54.5q3-4.2 6 0" stroke="${e}" stroke-width="2.3" fill="none" stroke-linecap="round"/>`,
  surprised: e => `${halo(54, 52, 7.5, .35)}${halo(66, 52, 7.5, .35)}<circle cx="54" cy="52" r="3.3" fill="${e}"/><circle cx="66" cy="52" r="3.3" fill="${e}"/>`,
  thinking: e => `${halo(56, 51, 5, .25)}${halo(68, 51, 5, .25)}<circle cx="56" cy="51" r="2.2" fill="${e}"/><circle cx="68" cy="51" r="2.2" fill="${e}"/>`,
  shy: e => `${halo(53, 56, 4.5, .2)}${halo(65, 56, 4.5, .2)}<circle cx="53" cy="56" r="1.9" fill="${e}"/><circle cx="65" cy="56" r="1.9" fill="${e}"/>`,
  sleep: e => `<path d="M51 54h6M63 54h6" stroke="${e}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,
};
const halo = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--eyes)" opacity="${o}"/>`;

/** The lantern, hanging from a hand at (hx, hy). `light` is 0–1. */
function lanternAt(hx, hy, light, gid) {
  const x = hx - 8, y = hy + 6;
  return `<g class="lantern">
    <circle class="lantern-glow" cx="${hx}" cy="${y + 13}" r="${14 + 22 * light}" fill="url(#${gid})" opacity="${.35 + .55 * light}"/>
    <path d="M${hx - 5} ${y + 1}q5-10 10 0" stroke="var(--b-navy)" stroke-width="1.7" fill="none"/>
    <path d="M${x + 1} ${y + 4}h14l-2.5-4.5h-9z" fill="var(--brass)"/>
    <rect x="${x + 2}" y="${y + 4}" width="12" height="16" rx="2" fill="var(--spark)" opacity="${.18 + .82 * light}"/>
    <rect x="${x + 2}" y="${y + 4}" width="12" height="16" rx="2" fill="none" stroke="var(--brass)" stroke-width="1.6"/>
    <path d="M${hx} ${y + 4}v16" stroke="var(--brass)" stroke-width="1.1" opacity=".8"/>
    <circle cx="${hx}" cy="${y + 12}" r="${1.6 + 1.8 * light}" fill="#FFF8E1" opacity="${.3 + .7 * light}"/>
    <rect x="${x}" y="${y + 20}" width="16" height="3.6" rx="1.4" fill="var(--brass)"/>
  </g>`;
}

const glowGrad = gid => `<defs><radialGradient id="${gid}"><stop offset="0" style="stop-color:var(--spark);stop-opacity:.9"/><stop offset=".45" style="stop-color:var(--spark);stop-opacity:.32"/><stop offset="1" style="stop-color:var(--spark);stop-opacity:0"/></radialGradient></defs>`;

function hat({ moss = false } = {}) {
  return `<g class="hat" transform="rotate(-5 60 40)">
    <ellipse cx="60" cy="41.5" rx="37" ry="8.5" fill="var(--hat)"/>
    <path d="M40 41c-1-11 0-21 6-27 7-5 21-5 28 0 6 6 7 16 6 27z" fill="var(--hat)"/>
    <path d="M46 14c7-4 20-4 28 0" stroke="var(--hat-hi)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M52 13q8 5 16 0" stroke="var(--shade)" stroke-width="1.6" fill="none" opacity=".5"/>
    <path d="M40.3 33.5q19.7 4.5 39.4 0l.3 6.5q-20 4.5-40 0z" fill="var(--hat-band)"/>
    <path d="M24 42q36 8 72 0" stroke="var(--hat-hi)" stroke-width="1.4" fill="none" opacity=".55"/>
    ${moss ? `<g fill="var(--moss)"><ellipse cx="50" cy="16" rx="7" ry="3"/><ellipse cx="68" cy="22" rx="5" ry="2.4"/><ellipse cx="30" cy="42" rx="6" ry="2.2"/><ellipse cx="86" cy="44" rx="7" ry="2.4"/></g>
      <g transform="translate(58 4)"><path d="M0 8c0-5 3-8 7-8s7 3 7 7H3z" fill="var(--b-rose)"/><circle cx="7" cy="5" r="3" fill="none" stroke="var(--roof)" stroke-width="1"/><path d="M12 8h5l-1-2" stroke="var(--stone)" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`
    : `<path d="M73 36c3-5 9-6 12-4-2 4-7 6-12 4z" fill="var(--tree-2)"/><path d="M73 36l9-3" stroke="var(--tree)" stroke-width=".9"/>`}
  </g>`;
}

export function stranger(mood = 'calm', o = {}) {
  const light = Math.max(0, Math.min(1, o.light ?? .5));
  const gid = nextId('st');
  const eyes = (EYES[mood] || EYES.calm)('var(--eyes)');
  const star = mood === 'star';
  const face = star
    ? `<circle cx="60" cy="50" r="30" fill="url(#${gid})" opacity=".9"/>
       <g stroke="var(--spark)" stroke-width="2" stroke-linecap="round" opacity=".8">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = Math.PI * a / 180; return `<path d="M${(60 + Math.cos(r) * 20).toFixed(1)} ${(50 + Math.sin(r) * 20).toFixed(1)}L${(60 + Math.cos(r) * 26).toFixed(1)} ${(50 + Math.sin(r) * 26).toFixed(1)}"/>`; }).join('')}</g>
       <circle cx="60" cy="50" r="15.5" fill="var(--spark)"/><circle cx="60" cy="50" r="15.5" fill="#FFF8E1" opacity=".55"/>
       <path d="M52.5 51q3-4 6 0M61.5 51q3-4 6 0" stroke="var(--roof)" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="60" cy="52" rx="16.5" ry="15" fill="var(--shade)"/>
       <ellipse cx="60" cy="61" rx="12" ry="5" fill="var(--spark)" opacity="${.05 + .12 * light}"/>${eyes}`;
  return `<g class="stranger st-${mood}">${glowGrad(gid)}
    <ellipse cx="60" cy="152" rx="36" ry="5" fill="var(--ink)" opacity=".14"/>
    <ellipse cx="48" cy="149" rx="8.5" ry="4.8" fill="var(--boot)"/><ellipse cx="72" cy="149" rx="8.5" ry="4.8" fill="var(--boot)"/>
    <path d="M42 68q18-7 36 0l14 52q5 17 7 27-39 8-78 0 2-10 7-27z" fill="var(--coat)"/>
    <path d="M21 147q39 8 78 0l-.6-4q-38.4 7.5-76.8 0z" fill="var(--coat-dark)"/>
    <path d="M60 70l-2 78" stroke="var(--coat-dark)" stroke-width="1.6"/>
    <path d="M45 98q-5 24-10 46M75 98q5 24 10 46" stroke="var(--coat-dark)" stroke-width="1.5" fill="none" opacity=".55"/>
    <path d="M31 117h13M76 117h13" stroke="var(--coat-dark)" stroke-width="2" stroke-linecap="round"/>
    ${[[63, 88], [62.5, 104], [62, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="var(--brass)"/>`).join('')}
    <path d="M43 71q-13 14-15 45l12 2q1-22 9-37z" fill="var(--coat)"/><path d="M28 113.5l12 2-.6 5-12-1.8z" fill="var(--coat-dark)"/>
    <path d="M77 71q14 12 19 36l-10 4q-3-19-12-30z" fill="var(--coat)"/><path d="M86 108.5l10-4 1.6 4.6-10 4z" fill="var(--coat-dark)"/>
    ${face}
    <path d="M40 62q20 11 40 0l1 9q-21 11-42 0z" fill="var(--scarf)"/>
    <path d="M40.4 66q19.6 10 39.6 0" stroke="var(--scarf-2)" stroke-width="2.4" fill="none"/>
    <path d="M47 70l-5 32 9 1 3-31z" fill="var(--scarf)"/>
    <path d="M45.4 80l7.6.6M44.2 88l7.8.6M43 96l8 .6" stroke="var(--scarf-2)" stroke-width="2.2"/>
    <path d="M43 103l-1 4M46 103.4l-.6 4M49 103.6l-.2 4" stroke="var(--scarf)" stroke-width="1.6" stroke-linecap="round"/>
    ${star ? `<g transform="translate(4 70) scale(.46) rotate(-14 60 40)">${hat()}</g>` : hat()}
    ${o.lantern === false ? '' : lanternAt(92, 110, star ? 1 : light, gid)}
  </g>`;
}

/** The whole figure as an <svg>. `crop: 'face'` frames the head, for chat avatars. */
export function strangerSVG(mood = 'calm', o = {}) {
  const vb = o.crop === 'face' ? '26 12 68 68' : o.crop === 'bust' ? '14 4 92 92' : '-10 0 140 160';
  return `<svg viewBox="${vb}" aria-hidden="true">${stranger(mood, o)}</svg>`;
}

/** A spark: one of the twelve pieces of the Stranger's light. Drawn around (0, 0), radius about 12. */
export function spark(r = 1) {
  return `<g class="spark"><circle r="${12 * r}" fill="var(--spark)" opacity=".22"/><circle r="${6.5 * r}" fill="var(--spark)" opacity=".45"/>
    <path d="M0 ${-10 * r}L${1.6 * r} ${-1.6 * r} ${10 * r} 0 ${1.6 * r} ${1.6 * r} 0 ${10 * r} ${-1.6 * r} ${1.6 * r} ${-10 * r} 0 ${-1.6 * r} ${-1.6 * r}z" fill="var(--spark)"/>
    <circle r="${2.6 * r}" fill="#FFF8E1"/></g>`;
}
export const sparkSVG = () => `<svg viewBox="-14 -14 28 28" aria-hidden="true">${spark()}</svg>`;

// Where the sparks float inside the big lantern, first to last.
const SPOTS = [[40, 74], [30, 62], [50, 60], [36, 86], [46, 90], [41, 50], [28, 76], [53, 76], [34, 98], [48, 102], [30, 50], [51, 48]];

/** The big lantern for home and the collection: `n` of 12 sparks inside. 80 × 130. */
export function lantern(n = 0) {
  const gid = nextId('lt');
  const k = n / 12;
  return `<g class="big-lantern">${glowGrad(gid)}
    <circle cx="40" cy="76" r="${22 + 40 * k}" fill="url(#${gid})" opacity="${n ? .35 + .5 * k : 0}"/>
    <path d="M26 20q14-22 28 0" stroke="var(--b-navy)" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="7" r="4" fill="none" stroke="var(--b-navy)" stroke-width="2.4"/>
    <path d="M18 34h44l-7-14H25z" fill="var(--brass)"/><path d="M25 20h30" stroke="var(--brass-dark)" stroke-width="2"/>
    <rect x="20" y="34" width="40" height="78" rx="6" fill="var(--screen)" opacity=".92"/>
    <rect x="20" y="34" width="40" height="78" rx="6" fill="var(--spark)" opacity="${.06 + .4 * k}"/>
    ${SPOTS.slice(0, n).map(([x, y], i) => `<g transform="translate(${x} ${y}) scale(${i === n - 1 ? .62 : .5})">${spark()}</g>`).join('')}
    <rect x="20" y="34" width="40" height="78" rx="6" fill="none" stroke="var(--brass)" stroke-width="3.2"/>
    <path d="M40 34v78" stroke="var(--brass)" stroke-width="2.2"/>
    <path d="M24 40l6-2M24 46l3-1" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".25"/>
    <path d="M14 112h52l-5 10H19z" fill="var(--brass)"/><path d="M19 122h42" stroke="var(--brass-dark)" stroke-width="2"/>
  </g>`;
}
export const lanternSVG = n => `<svg viewBox="-6 -2 92 134" aria-hidden="true">${lantern(n)}</svg>`;

/** Mr Moss: the "garden gnome" at No. 9, sitting on a stone. Another visitor, who stayed. 120 × 140. `awake` opens his eyes. */
export function moss({ awake = false } = {}) {
  return `<g class="moss">
    <ellipse cx="60" cy="134" rx="40" ry="5" fill="var(--ink)" opacity=".14"/>
    <path d="M26 132q-2-20 10-26h48q12 6 10 26z" fill="var(--stone)"/><path d="M34 112q26-4 52 0" stroke="var(--stone-dark)" stroke-width="2" fill="none"/>
    <path d="M40 66q20-6 40 0l10 40q2 8-2 12H32q-4-4-2-12z" fill="var(--moss-coat)"/>
    <g fill="var(--moss)"><ellipse cx="44" cy="96" rx="7" ry="4"/><ellipse cx="74" cy="84" rx="6" ry="3.2"/><ellipse cx="66" cy="110" rx="8" ry="3.4"/><circle cx="38" cy="80" r="3"/></g>
    <ellipse cx="46" cy="122" rx="9" ry="5" fill="var(--boot)"/><ellipse cx="74" cy="122" rx="9" ry="5" fill="var(--boot)"/>
    <path d="M36 104q-4-14 6-24" stroke="var(--moss-coat)" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M84 104q4-14-6-24" stroke="var(--moss-coat)" stroke-width="11" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="52" rx="16.5" ry="15" fill="var(--shade)"/>
    ${awake ? `${halo(54, 53, 5, .22)}${halo(66, 53, 5, .22)}<circle cx="54" cy="53" r="2.1" fill="var(--eyes)"/><circle cx="66" cy="53" r="2.1" fill="var(--eyes)"/>`
      : `<path d="M51 54h6M63 54h6" stroke="var(--eyes)" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>`}
    <path d="M40 62q20 11 40 0l1 9q-21 11-42 0z" fill="var(--b-sage)"/><path d="M40.4 66q19.6 10 39.6 0" stroke="var(--moss)" stroke-width="2.2" fill="none"/>
    ${hat({ moss: true })}
  </g>`;
}
export const mossSVG = o => `<svg viewBox="0 0 120 140" aria-hidden="true">${moss(o)}</svg>`;
