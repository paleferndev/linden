// The neighbours, all built from the same five parts: head, hair, body, clothes, one detail. Drawn in a 120 × 160 box.

export function person(o) {
  const s = `var(${o.skin})`, h = `var(${o.hair})`;
  let back = '', front = '';
  if (o.style === 'quiff') front = `<path d="M35 60C33 31 50 29 60 29c20 0 27 10 26 29-4-10-12-14-22-13-9-6-21-2-29 15z" fill="${h}"/>`;
  if (o.style === 'bun') { back = `<circle cx="60" cy="31" r="12" fill="${h}"/>`; front = `<path d="M35 66C32 44 44 36 60 36s28 8 25 30c-4-12-12-19-25-19s-21 7-25 19z" fill="${h}"/>`; }
  if (o.style === 'curls') front = [[37, 55, 9], [42, 43, 10], [52, 35, 10.5], [64, 33, 10.5], [75, 38, 10], [83, 50, 9], [47, 48, 6], [70, 45, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${h}"/>`).join('');
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
  hughes: { name: 'Mrs Hughes', skin: '--skin-1', hair: '--hair-2', style: 'curls', shirt: '--b-rose', bg: '--postbox-soft',
    body: `<g fill="var(--china)">${[48, 54, 60, 66, 72].map((x, i) => `<circle cx="${x}" cy="${[98, 100, 101, 100, 98][i]}" r="2.2"/>`).join('')}</g>`,
    extra: `<g fill="none" stroke="var(--eye)" stroke-width="1.7"><circle cx="51" cy="64" r="6.5"/><circle cx="69" cy="64" r="6.5"/><path d="M57.5 64h5"/></g>` },
};

/** Mimi, the cat at No. 1. Drawn in an 80 × 60 box. */
export function cat() {
  return `<g><path class="cattail" d="M62 40c10-2 16-8 14-20" stroke="var(--cat)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="42" rx="23" ry="13" fill="var(--cat)"/>
  <path d="M34 31c2 5 2 17 0 22M44 30c2 5 2 18 0 24M54 32c2 5 2 14 0 20" stroke="var(--cat-dark)" stroke-width="2.4" fill="none" opacity=".7"/>
  <circle cx="20" cy="33" r="12" fill="var(--cat)"/><path d="M10 28 11 15l8 8zM21 22l9-8 1 13z" fill="var(--cat)"/>
  <path d="M13 33q2.5-2.5 5 0M22 33q2.5-2.5 5 0" stroke="var(--eye)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="37" r="1.3" fill="var(--eye)"/>
  <ellipse cx="30" cy="53" rx="6" ry="3" fill="var(--cat)"/><ellipse cx="52" cy="54" rx="6" ry="3" fill="var(--cat)"/></g>`;
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
