// The neighbours, all built from the same five parts: head, hair, body, clothes, one detail. Drawn in a 120 × 160 box.

export function person(o) {
  const s = `var(${o.skin})`, h = `var(${o.hair})`;
  let back = '', front = '';
  if (o.style === 'quiff') front = `<path d="M35 60C33 31 50 29 60 29c20 0 27 10 26 29-4-10-12-14-22-13-9-6-21-2-29 15z" fill="${h}"/>`;
  if (o.style === 'bun') { back = `<circle cx="60" cy="31" r="12" fill="${h}"/>`; front = `<path d="M35 66C32 44 44 36 60 36s28 8 25 30c-4-12-12-19-25-19s-21 7-25 19z" fill="${h}"/>`; }
  if (o.style === 'curls') front = [[37, 55, 9], [42, 43, 10], [52, 35, 10.5], [64, 33, 10.5], [75, 38, 10], [83, 50, 9], [47, 48, 6], [70, 45, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${h}"/>`).join('');
  if (o.style === 'afro') back = `<circle cx="60" cy="52" r="33" fill="${h}"/><circle cx="38" cy="44" r="16" fill="${h}"/><circle cx="82" cy="44" r="16" fill="${h}"/>`;
  if (o.style === 'cap') front = `<path d="M36 58c-1 4 0 8 1 10M84 58c1 4 0 8-1 10" stroke="${h}" stroke-width="5" stroke-linecap="round"/><path d="M35 57c0-17 10-26 25-26s25 9 25 26z" fill="var(--b-navy)"/><rect x="35" y="48" width="50" height="7" fill="var(--postbox)"/><path d="M33 56h55c3 0 3 5-1 5H33z" fill="var(--b-navy)"/>`;
  return `<g>${back}<path d="M16 162v-38c0-19 16-30 44-30s44 11 44 30v38z" fill="var(${o.shirt})"/>${o.body || ''}
    <rect x="52" y="80" width="16" height="18" rx="6" fill="${s}"/>
    <circle cx="36" cy="64" r="5" fill="${s}"/><circle cx="84" cy="64" r="5" fill="${s}"/>
    <ellipse cx="60" cy="62" rx="24" ry="27" fill="${s}"/>${front}
    <circle cx="51" cy="64" r="2.4" fill="var(--eye)"/><circle cx="69" cy="64" r="2.4" fill="var(--eye)"/>
    <circle cx="45" cy="72" r="4" fill="var(--cheek)"/><circle cx="75" cy="72" r="4" fill="var(--cheek)"/>
    <path d="M53 75.5q7 5.5 14 0" fill="none" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>${o.extra || ''}</g>`;
}

export const CAST = {
  tom: { name: 'Tom', skin: '--skin-1', hair: '--hair-1', style: 'quiff', shirt: '--shirt-1', bg: '--cafe-wall',
    body: `<path d="M38 116h44v46H38z" fill="var(--apron)"/><path d="M44 116l7-20M76 116l-7-20" stroke="var(--apron)" stroke-width="3.5"/><rect x="52" y="128" width="16" height="10" rx="2" fill="none" stroke="var(--shirt-1)" stroke-width="1.5" opacity=".6"/>` },
  priya: { name: 'Priya', skin: '--skin-2', hair: '--hair-3', style: 'bun', shirt: '--b-ochre', bg: '--shop-wall',
    body: `<path d="M49 95l11 22 11-22z" fill="var(--china)"/><path d="M60 117v45" stroke="var(--pastry-dark)" stroke-width="1.5"/>`,
    extra: `<circle cx="36" cy="71" r="2" fill="var(--sun)"/><circle cx="84" cy="71" r="2" fill="var(--sun)"/>` },
  sam: { name: 'Sam', skin: '--skin-3', hair: '--hair-3', style: 'cap', shirt: '--b-navy', bg: '--pen-soft',
    body: `<path d="M50 95l10 14 10-14z" fill="var(--china)"/><rect x="72" y="120" width="14" height="9" rx="2" fill="var(--sun)"/>` },
  okafor: { name: 'Dr Okafor', skin: '--skin-3', hair: '--hair-3', style: 'afro', shirt: '--pen-soft', bg: '--leaf-soft',
    body: `<path d="M40 104l20 12 20-12v58H40z" fill="var(--china)"/><rect x="66" y="120" width="12" height="16" rx="2" fill="var(--pen)"/><path d="M69 120v-4h6v4" stroke="var(--pen)" stroke-width="1.5" fill="none"/>`,
    extra: `<g fill="none" stroke="var(--eye)" stroke-width="1.8"><rect x="43" y="58" width="14" height="11" rx="3"/><rect x="63" y="58" width="14" height="11" rx="3"/><path d="M57 63h6"/></g>` },
  lily: { name: 'Lily', skin: '--skin-2', hair: '--hair-1', style: 'bun', shirt: '--leaf-soft', bg: '--leaf-soft',
    body: `<path d="M50 95l10 14 10-14z" fill="var(--china)"/><rect x="70" y="118" width="12" height="12" rx="2" fill="var(--china)"/><path d="M76 120v8M72 124h8" stroke="var(--postbox)" stroke-width="2"/>` },
  ben: { name: 'Ben', skin: '--skin-1', hair: '--hair-3', style: 'curls', shirt: '--b-ochre', bg: '--marker-soft',
    body: `<path d="M44 100q16 10 32 0" stroke="var(--pastry-dark)" stroke-width="3" fill="none"/>` },
  hughes: { name: 'Mrs Hughes', skin: '--skin-1', hair: '--hair-2', style: 'curls', shirt: '--b-rose', bg: '--postbox-soft',
    body: `<g fill="var(--china)">${[48, 54, 60, 66, 72].map((x, i) => `<circle cx="${x}" cy="${[98, 100, 101, 100, 98][i]}" r="2.2"/>`).join('')}</g>`,
    extra: `<g fill="none" stroke="var(--eye)" stroke-width="1.7"><circle cx="51" cy="64" r="6.5"/><circle cx="69" cy="64" r="6.5"/><path d="M57.5 64h5"/></g>` },
};

/** Mimi, the cat at No. 1: a brown mackerel tabby with a white chin, a pink nose, green eyes and big ears.
 *  Lying down, head up. Drawn in an 80 × 60 box. `sleep` closes her eyes. */
export function cat({ sleep = false } = {}) {
  const eyes = sleep
    ? `<path d="M14.4 31.6q2.6 1.8 5.2 0M24.4 31.6q2.6 1.8 5.2 0" stroke="var(--cat-dark)" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
    : [17, 27].map(x => `<ellipse cx="${x}" cy="31" rx="3" ry="2.4" fill="var(--cat-eye)" stroke="var(--cat-dark)" stroke-width=".9"/><ellipse cx="${x}" cy="31" rx=".9" ry="2" fill="var(--eye)"/><circle cx="${x + .9}" cy="30.1" r=".6" fill="#fff"/>`).join('');
  return `<g class="cat">
  <path class="cattail" d="M63 45c10-1 16-8 13-20" stroke="var(--cat)" stroke-width="5.2" fill="none" stroke-linecap="round"/>
  <path class="cattail" d="M63 45c10-1 16-8 13-20" stroke="var(--cat-dark)" stroke-width="5.2" fill="none" stroke-dasharray="2.6 4.2" stroke-dashoffset="-2"/>
  <ellipse cx="44" cy="43" rx="23" ry="13" fill="var(--cat)"/>
  <path d="M30 31.5q15-5 31 2.5" stroke="var(--cat-dark)" stroke-width="2.8" fill="none" stroke-linecap="round"/>
  <path d="M36 32c-2.4 5-2.2 15 .6 21M44.5 31c-2.4 6-2.2 18 .2 24M52.5 32c-2 5-2 15 .8 21M59.5 35c-1.4 4-1.2 11 .8 15" stroke="var(--cat-dark)" stroke-width="2.3" fill="none" stroke-linecap="round" opacity=".85"/>
  <ellipse cx="27" cy="54" rx="6.2" ry="3.2" fill="var(--cat)"/><ellipse cx="40" cy="55" rx="6.2" ry="3.2" fill="var(--cat)"/>
  <path d="M25 52.6v2.6M29 52.6v2.6M38 53.6v2.6M42 53.6v2.6" stroke="var(--cat-dark)" stroke-width="1" opacity=".6"/>
  <path d="M10.5 27 9 10.5l11.5 9.5zM23.5 20 35 10.5 33.5 27z" fill="var(--cat)"/>
  <path d="M12.4 24.5 11.6 15l6 5zM26 20.4l6.6-5.4-.8 9.4z" fill="var(--cat-ear)"/>
  <circle cx="22" cy="32.5" r="12.8" fill="var(--cat)"/>
  <path d="M17.6 23.6l2 3.8 2.4-3.6 2.4 3.6 2-3.8" stroke="var(--cat-dark)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.6 32.4h4.2M9.8 35.6h4M30.2 32.4h4.2M30.2 35.6h4" stroke="var(--cat-dark)" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="22" cy="39.2" rx="7" ry="5.6" fill="var(--cat-white)"/>
  ${eyes}
  <path d="M20.4 35.2h3.2l-1.6 2.2z" fill="var(--cat-nose)"/>
  <path d="M22 37.4v1.2M22 38.6q-1.7 1.5-3.2.4M22 38.6q1.7 1.5 3.2.4" stroke="var(--cat-dark)" stroke-width=".9" fill="none" stroke-linecap="round"/>
  <path d="M15.5 38.5l-7 -1.2M15.6 40.2l-6.8.6M28.5 38.5l7-1.2M28.4 40.2l6.8.6" stroke="var(--cat-white)" stroke-width=".7" opacity=".8"/></g>`;
}

/** Mimi's blanket: cream wool with black dashes and knotted fringes along the bottom. `w` × `h` at (x, y). */
export function blanket(x, y, w, h) {
  const rows = [];
  for (let r = 0; r * 9 + 6 < h - 4; r++) {
    const yy = y + 6 + r * 9;
    for (let c = 0; c * 12 + 5 < w - 6; c++) rows.push(`M${x + 5 + c * 12 + (r % 2 ? 6 : 0)} ${yy}h4.5`);
  }
  const fringe = [];
  for (let fx = x + 4; fx < x + w - 2; fx += 5) fringe.push(`M${fx} ${y + h}l${fx % 2 ? -.8 : .8} 7`);
  return `<g class="blanket"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="var(--blanket)"/>
    <path d="${rows.join('')}" stroke="var(--blanket-line)" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
    <path d="${fringe.join('')}" stroke="var(--blanket)" stroke-width="1.6" stroke-linecap="round"/>
    ${Array.from({ length: Math.floor((w - 6) / 10) }, (_, k) => `<circle cx="${x + 6.5 + k * 10}" cy="${y + h + 2}" r="1.4" fill="var(--blanket)"/>`).join('')}</g>`;
}

/** The radio on the shelf at No. 1: the voice of the lessons at home. Drawn in a 70 × 52 box. */
export function radio() {
  return `<g><rect x="2" y="12" width="66" height="40" rx="9" fill="var(--postbox)"/><rect x="2" y="12" width="66" height="8" rx="4" fill="var(--awning-a)" opacity=".5"/>
    <path d="M18 12 44 1" stroke="var(--b-navy)" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="1.5" r="2" fill="var(--b-navy)"/>
    <circle cx="22" cy="33" r="12" fill="var(--china)"/><circle cx="22" cy="33" r="12" fill="none" stroke="var(--china-line)" stroke-width="1.5"/>
    ${[27, 31, 35, 39].map(y => `<path d="M13 ${y}h18" stroke="var(--china-line)" stroke-width="1.4"/>`).join('')}
    <rect x="40" y="24" width="20" height="9" rx="2" fill="var(--sun)"/><path d="M45 24v9" stroke="var(--pastry-dark)" stroke-width="1.2"/>
    <circle cx="44" cy="42" r="3.5" fill="var(--b-navy)"/><circle cx="56" cy="42" r="3.5" fill="var(--b-navy)"/></g>`;
}

/** A round portrait for chats and sheets: 'tom' | 'priya' | 'sam' | 'hughes' | 'mimi' | 'radio'. */
export function avatar(who) {
  if (who === 'mimi') return `<svg viewBox="-6 -10 92 80" aria-hidden="true">${cat()}</svg>`;
  if (who === 'radio') return `<svg viewBox="-12 -14 94 80" aria-hidden="true">${radio()}</svg>`;
  const c = CAST[who];
  return c ? `<svg viewBox="28 24 64 64" aria-hidden="true">${person(c)}</svg>` : '';
}

export const avatarBg = who => who === 'mimi' || who === 'radio' ? '--b-blue' : CAST[who]?.bg || '--sunk';
