import { cat } from './people.js';

// Small drawings for word cards, the times of day and the mouth shapes.

export const PICS = {
  cat: `<svg viewBox="-6 -8 92 76" aria-hidden="true">${cat()}</svg>`,
  glass: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 10h30l-4 44a4 4 0 0 1-4 3.6H25a4 4 0 0 1-4-3.6z" fill="var(--pen-soft)" stroke="var(--pen)" stroke-width="2"/><path d="M19.6 26h24.8l-2.6 28a2 2 0 0 1-2 1.8H24.2a2 2 0 0 1-2-1.8z" fill="var(--sky)"/><path d="M24 30c3 2 6 2 9 0s6-2 9 0" stroke="var(--china)" stroke-width="1.8" fill="none" opacity=".8"/><path d="M40 14l-2 26" stroke="var(--china)" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></svg>`,
  bus: `<svg viewBox="0 0 96 64" aria-hidden="true"><rect x="6" y="6" width="84" height="46" rx="8" fill="var(--postbox)"/><path d="M6 29h84" stroke="var(--awning-a)" stroke-width="3" opacity=".6"/>${[12, 30, 48, 66].map(x => `<rect x="${x}" y="11" width="15" height="12" rx="2" fill="var(--window)"/>`).join('')}${[12, 30, 48].map(x => `<rect x="${x}" y="33" width="15" height="11" rx="2" fill="var(--window)"/>`).join('')}<rect x="68" y="33" width="16" height="17" rx="2" fill="var(--b-navy)"/><circle cx="24" cy="54" r="7" fill="var(--b-navy)"/><circle cx="72" cy="54" r="7" fill="var(--b-navy)"/><circle cx="24" cy="54" r="2.6" fill="var(--china-line)"/><circle cx="72" cy="54" r="2.6" fill="var(--china-line)"/></svg>`,
  thought: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 40c-8 0-12-6-10-12 1-4 5-6 8-6 0-7 7-12 14-10 3-5 11-6 16-2 6-1 12 4 11 10 5 2 7 8 4 13-2 4-6 6-10 5-2 4-7 6-12 4-4 3-10 3-13 0-3 0-6 0-8-2z" fill="var(--card)" stroke="var(--pen)" stroke-width="2"/><circle cx="14" cy="49" r="4" fill="var(--card)" stroke="var(--pen)" stroke-width="2"/><circle cx="7" cy="57" r="2.4" fill="var(--card)" stroke="var(--pen)" stroke-width="2"/><path d="M26 28h14M24 34h18" stroke="var(--pen)" stroke-width="2" stroke-linecap="round" opacity=".5"/></svg>`,
};

/* ---------- times of day: always their own colours, whatever the app theme */
const T = {
  morning: { sky: ['#FBE3C4', '#F6C7A1'], sun: [28, 44, 11, '#F5B84E'], lit: false, ground: '#C9B79E', house: ['#94B8CC', '#E2B461'] },
  afternoon: { sky: ['#BFDDE8', '#D9ECF1'], sun: [92, 20, 11, '#F5C24E'], lit: false, ground: '#BDB19B', house: ['#94B8CC', '#E2B461'] },
  evening: { sky: ['#E68A63', '#7A5A8E'], sun: [98, 52, 12, '#F46E3E'], lit: true, ground: '#6E5A55', house: ['#5A6F86', '#9A7543'] },
  night: { sky: ['#101B30', '#24324E'], moon: [92, 22], lit: true, ground: '#262C35', house: ['#2E3E54', '#4D4030'] },
};
let TID = 0;
export function timePanel(k) {
  const t = T[k], id = 'tp' + (++TID);
  const win = (x, y) => `<rect x="${x}" y="${y}" width="6" height="7" rx="1" fill="${t.lit ? '#FFD36B' : '#E4EFF1'}"/>`;
  return `<svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky[1]}"/><stop offset="1" stop-color="${t.sky[0]}"/></linearGradient></defs>
    <rect width="120" height="80" fill="url(#${id})"/>
    ${t.moon ? `<circle cx="${t.moon[0]}" cy="${t.moon[1]}" r="9" fill="#F1E4BF"/><circle cx="${t.moon[0] + 4}" cy="${t.moon[1] - 3}" r="8" fill="${t.sky[1]}"/>${[[14, 12], [34, 26], [58, 10], [72, 30], [110, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#F1E4BF"/>`).join('')}` : `<circle cx="${t.sun[0]}" cy="${t.sun[1]}" r="${t.sun[2]}" fill="${t.sun[3]}"/>`}
    <path d="M14 52l14-11 14 11z" fill="#5B4B47"/><rect x="16" y="52" width="24" height="20" fill="${t.house[0]}"/>${win(21, 57)}${win(30, 57)}
    <rect x="52" y="44" width="26" height="28" fill="${t.house[1]}"/><rect x="50" y="41" width="30" height="4" fill="#5B4B47"/>${win(56, 50)}${win(66, 50)}${win(56, 60)}
    <rect x="86" y="56" width="3" height="16" fill="#33415E"/><circle cx="87.5" cy="55" r="${t.lit ? 5 : 2.5}" fill="#FFD36B" opacity="${t.lit ? .9 : .6}"/>
    <rect y="72" width="120" height="8" fill="${t.ground}"/></svg>`;
}
export const TIMES = [
  { k: 'morning', id: 'p.good-morning', when: 'dimineața' },
  { k: 'afternoon', id: 'p.good-afternoon', when: 'după-amiaza' },
  { k: 'evening', id: 'p.good-evening', when: 'seara, când ajungi' },
  { k: 'night', id: 'p.good-night', when: 'la plecare, seara' },
];

/* ---------- mouth shapes: three, tree, free */
export const MOUTH = `<svg class="mouth m-th" viewBox="0 0 240 150" aria-hidden="true">
  <rect width="240" height="150" rx="24" fill="var(--skin-1)"/>
  <path d="M84 128c20 10 52 10 72 0" stroke="var(--skin-2)" stroke-width="2" fill="none" opacity=".4"/>
  <g class="mv cav"><ellipse cx="120" cy="74" rx="58" ry="26" fill="var(--mouth)"/></g>
  <rect class="mv uteeth" x="78" y="50" width="84" height="15" rx="5" fill="var(--tooth)"/>
  <rect class="mv lteeth" x="84" y="84" width="72" height="12" rx="5" fill="var(--tooth)"/>
  <ellipse class="mv tongue" cx="120" cy="73" rx="26" ry="9" fill="var(--tongue)"/>
  <path class="mv llip" d="M56 72c20 36 108 36 128 0-16 14-40 20-64 20s-48-6-64-20z" fill="var(--lip)"/>
  <path class="mv llipF" d="M56 72c20 30 108 30 128 0-18-6-40-8-64-8s-46 2-64 8z" fill="var(--lip)"/>
  <path class="mv ulip" d="M56 70c18-26 40-30 64-22 24-8 46-4 64 22-22-12-42-14-64-10-22-4-42-2-64 10z" fill="var(--lip)"/>
</svg>`;
export const MOUTHS = [
  { m: 'th', word: 'three', ro: 'trei', cap: 'Vârful limbii iese puțin între dinți și sufli ușor. Sunetul nu există în română.' },
  { m: 't', word: 'tree', ro: 'copac', cap: 'Limba stă în spatele dinților. Asta se aude când spui „tri”.' },
  { m: 'f', word: 'free', ro: 'liber, gratuit', cap: 'Dinții de sus se sprijină pe buza de jos.' },
];
