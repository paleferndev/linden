import { linden } from '../../art/night.js';
import { stranger } from '../../art/stranger.js';
import { laneSVG, BUILDINGS, nextId } from '../../art/lane.js';
import { reduceMotion } from '../../app/ui.js';
import { photo, SIGNS, DOODLES } from '../../art/props.js';
import { shell, intro, result, pick, gapHTML, filled, clearOpts, fitTall, wait, esc, $, $$, shuffle } from './kit.js';
import { VERB, pastOf } from '../../content/verbs.js';

// The games where the rule is a choice in a sentence, each with its own board: the lantern in the garden (this and
// that), the Stranger's photos (now or usually), the verb machine, the timeline, the plan board, the office signs, and
// the finale that lights up the street.

/* ---------------------------------------------------------------- 1 · the lantern in the garden */
// A tall picture, so it fills a phone: the table in front of you (this, these) and the garden and the sky beyond it
// (that, those). The lantern dims everything but what it points at, and a ring sized to the thing goes round it.
const LW = 360, LH = 412;
const LANTERN = [300, 284];
// where each thing is, and the radius of its ring
const SPOTS = { cup: [56, 318, 36], keys: [128, 333, 36], apples: [206, 318, 38], book: [288, 334, 40], moon: [298, 64, 38], stars: [92, 62, 48], tree: [128, 186, 70], birds: [212, 146, 42] };
const twinkle = (x, y, s) => `<path d="M${x} ${y - s}q${s * .18} ${s * .82} ${s} ${s}q${-s * .82} ${s * .18} ${-s} ${s}q${-s * .18} ${-s * .82} ${-s} ${-s}q${s * .82} ${-s * .18} ${s} ${-s}z" fill="var(--sun)"/>`;
const bird = (x, y, s = 1) => `<path d="M${x - 12 * s} ${y - 2 * s}q${6 * s} ${-7 * s} ${12 * s} ${2 * s}q${6 * s} ${-9 * s} ${12 * s} ${-2 * s}" stroke="var(--cream)" stroke-width="${2.6 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
function lanternBoard() {
  const warm = nextId('lw');
  const sky = `<rect y="-${LH}" width="${LW}" height="${LH * 2}" fill="var(--sky)"/>
    <g opacity=".55">${[[24, 120], [160, 30], [190, 92], [246, 30], [340, 120], [30, 200], [258, 110], [350, 20], [142, 110], [60, -30], [200, -60], [310, -20], [130, -120], [280, -150], [30, -180], [220, -200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="var(--sun)"/>`).join('')}</g>
    ${[[70, 46, 6], [104, 36, 7.5], [120, 70, 6], [84, 86, 5.5], [58, 70, 4.5], [98, 62, 8]].map(([x, y, s]) => twinkle(x, y, s)).join('')}
    <circle cx="298" cy="64" r="44" fill="var(--sun)" opacity=".07"/><circle cx="298" cy="64" r="24" fill="var(--sun)"/><circle cx="309" cy="56" r="21" fill="var(--sky)"/>
    ${bird(194, 152, 1)}${bird(216, 136, 1.1)}${bird(236, 156, .9)}`;
  const far = `<g fill="var(--b-navy)" opacity=".8"><rect x="200" y="214" width="44" height="52"/><path d="M196 216l26-18 26 18z"/><rect x="292" y="206" width="68" height="60"/><rect x="0" y="222" width="40" height="44"/></g>
    <g fill="var(--lit)"><rect x="210" y="226" width="8" height="10" rx="1"/><rect x="306" y="220" width="8" height="10" rx="1"/><rect x="334" y="240" width="8" height="10" rx="1"/></g>
    ${linden(128, 236, 1.05, { glow: .45 })}
    <g fill="var(--b-cream)" opacity=".9">${Array.from({ length: 23 }, (_, k) => `<path d="M${k * 16 + 2} 274v-34l5-6 5 6v34z"/>`).join('')}<rect x="0" y="246" width="360" height="4"/><rect x="0" y="262" width="360" height="4"/></g>
    <rect x="0" y="272" width="360" height="56" fill="var(--tree)"/><path d="M0 272h360" stroke="var(--tree-2)" stroke-width="3" opacity=".6"/>
    <g transform="translate(232 186) scale(.74)">${stranger('calm', { light: .7 })}</g>`;
  // the table, seen a little from above so what lies on it shows
  const table = `<path d="M-4 312h368v44H-4z" fill="var(--wood-top)"/><path d="M-4 356h368v12H-4z" fill="var(--wood-line)"/><rect x="-4" y="368" width="368" height="50" fill="var(--wood)"/>
    <path d="M0 326h360M0 341h360" stroke="var(--wood-line)" stroke-width="1" opacity=".35"/><path d="M60 368v50M180 368v50M300 368v50" stroke="var(--wood-line)" stroke-width="2" opacity=".5"/>
    <ellipse cx="180" cy="330" rx="230" ry="70" fill="url(#${warm})"/>`;
  const cup = `<g transform="translate(56 318)"><ellipse cx="0" cy="22" rx="30" ry="7" fill="var(--china-line)"/><ellipse cx="0" cy="20" rx="28" ry="6" fill="var(--china)"/>
    <path d="M-20 -10h40c-1 22-8 30-20 30s-19-8-20-30z" fill="var(--china)" stroke="var(--china-line)" stroke-width="1.5"/>
    <path d="M19 -4c11-1 12 14-1 15" stroke="var(--china-line)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-10" rx="20" ry="4.5" fill="var(--tea-brown)"/><path d="M-12 2h24" stroke="var(--postbox)" stroke-width="2.4" opacity=".7"/>
    <path d="M-6 -18q-5-7 0-13M5 -18q-5-7 0-13" stroke="var(--cream)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/></g>`;
  const keys = `<g transform="translate(130 334) scale(1.35)"><circle cx="-12" cy="-6" r="10" fill="none" stroke="var(--brass)" stroke-width="3.2"/>
    <g transform="rotate(14 -4 -2)"><circle cx="0" cy="-2" r="6.5" fill="var(--brass)"/><circle cx="0" cy="-2" r="2.4" fill="var(--wood-top)"/><path d="M5 -2h22v4h-3v4h-3v-4h-4v5h-3v-5H5z" fill="var(--brass)"/></g>
    <g transform="rotate(-18 -14 4)"><circle cx="-12" cy="8" r="6" fill="var(--china-line)"/><circle cx="-12" cy="8" r="2.2" fill="var(--wood-top)"/><path d="M-7 8h19v3.6h-3v3.6h-3v-3.6h-3v3h-3v-3h-7z" fill="var(--china-line)"/></g></g>`;
  const apple = (x, y) => `<circle cx="${x}" cy="${y}" r="13" fill="var(--postbox)"/><path d="M${x - 6} ${y - 6}a7 7 0 0 1 6-3" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55" fill="none"/>
    <path d="M${x} ${y - 12}l1-6" stroke="var(--trunk)" stroke-width="2.2" stroke-linecap="round"/><path d="M${x + 1} ${y - 16}c4-5 10-4 11-1-4 3-8 3-11 1z" fill="var(--tree-2)"/>`;
  const apples = `<g><ellipse cx="206" cy="342" rx="34" ry="7" fill="var(--wood-line)" opacity=".5"/>${apple(192, 330)}${apple(220, 330)}${apple(206, 309)}</g>`;
  const book = `<g transform="translate(288 334) rotate(-6)"><path d="M-32 -14h64l4 26h-64z" fill="var(--cream)"/><path d="M-34 -16h64l4 26h-64z" fill="#7B4A2E"/>
    <path d="M-28 -12h52l3 18h-52z" fill="none" stroke="var(--brass)" stroke-width="1.6"/><path d="M-6 -6h18M-5 0h16" stroke="var(--brass)" stroke-width="1.6"/>
    <path d="M-34 -16l-2 2 4 26 2-2z" fill="#5E3721"/><path d="M14 10l2 14 3-3 3 3-2-14" fill="var(--postbox)"/></g>`;
  return `<svg viewBox="0 0 ${LW} ${LH}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <defs><radialGradient id="${warm}"><stop offset="0" style="stop-color:var(--lit);stop-opacity:.22"/><stop offset="1" style="stop-color:var(--lit);stop-opacity:0"/></radialGradient></defs>
    ${sky}${far}${table}${cup}${keys}${apples}${book}<g data-beam></g></svg>`;
}
function point(root, at) {
  const [x, y, r] = SPOTS[at];
  const [lx, ly] = LANTERN;
  const hole = nextId('lh'), mask = nextId('lm');
  // the beam: from the lantern to the two sides of the ring
  const a = Math.atan2(y - ly, x - lx), px = Math.cos(a + Math.PI / 2) * r * .8, py = Math.sin(a + Math.PI / 2) * r * .8;
  $('[data-beam]', root).innerHTML = `<defs><radialGradient id="${hole}"><stop offset=".72" stop-color="#000"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <mask id="${mask}"><rect y="-${LH}" width="${LW}" height="${LH * 2}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${r * 1.35}" fill="url(#${hole})"/></mask></defs>
    <rect y="-${LH}" width="${LW}" height="${LH * 2}" fill="#05080F" opacity=".5" mask="url(#${mask})"/>
    <path d="M${lx} ${ly}L${x + px} ${y + py}L${x - px} ${y - py}z" fill="var(--spark)" opacity=".12"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--spark)" stroke-width="7" opacity=".22"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="var(--spark)" stroke-width="3" class="ring"/>`;
}
export async function thisthat(host, G, ctx) {
  const rounds = G.rounds;
  const S = shell(host, G, { total: rounds.length });
  S.board.innerHTML = `<div class="gb-art pic night">${lanternBoard()}</div><p class="gb-line en" data-line></p>`;
  await intro(host, G);
  for (const [k, r] of rounds.entries()) {
    S.board.dataset.round = k;
    point(S.board, r.at);
    $('[data-line]', S.board).innerHTML = gapHTML(r.text);
    const pending = pick(S, { ...r, wrong: G.options.filter(o => o !== r.right), g: G.g }, { record: ctx.record, fixed: G.options });
    fitTall($('.gb-art', S.board), LW, LH);
    const ok = await pending;
    $('[data-line]', S.board).innerHTML = filled(r.text, r.right);
    S.tally(ok);
    await wait(650);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 3 · photos: now or usually */
export async function photos(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    const every = r.when === 'every';
    S.board.innerHTML = `<div class="polaroids${every ? ' many' : ''}">${every
      ? Array.from({ length: 3 }, (_, i) => `<figure class="pol small" style="--r:${[-6, 3, 8][i]}deg">${photo(r.who, r.prop)}<figcaption>${['Mon', 'Tue', 'Wed'][i]}</figcaption></figure>`).join('')
      : `<figure class="pol" style="--r:-3deg">${photo(r.who, r.prop)}<figcaption>now</figcaption></figure>`}</div>
      <p class="gb-line en" data-line>${gapHTML(r.text)}</p>`;
    const ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    $('[data-line]', S.board).innerHTML = filled(r.text, r.right);
    S.tally(ok);
    await wait(700);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 7 · the verb machine */
const machineSVG = (base, past, lit, pulled) => `<svg viewBox="0 0 340 200" class="mach${pulled ? ' pulled' : ''}" aria-hidden="true">
  <rect x="14" y="22" width="262" height="168" rx="20" fill="var(--brass)"/><rect x="22" y="30" width="246" height="152" rx="15" fill="var(--cream)"/>
  <g>${[0, 1, 2, 3, 4].map(i => `<circle cx="${70 + i * 38}" cy="50" r="8" fill="${i < lit ? 'var(--lit)' : 'var(--line)'}" ${i < lit ? 'class="bulb-on"' : ''}/>`).join('')}</g>
  <rect x="38" y="72" width="102" height="66" rx="11" fill="var(--screen)"/><rect x="150" y="72" width="102" height="66" rx="11" fill="var(--screen)"/>
  <text x="89" y="113" text-anchor="middle" class="win-t" style="fill:#F0E9DB">${esc(base)}</text><text x="201" y="113" text-anchor="middle" class="win-t" style="fill:${past === '?' ? '#6FF0E0' : '#FFC857'}">${esc(past)}</text>
  <text x="89" y="158" text-anchor="middle" class="win-l">ACUM</text><text x="201" y="158" text-anchor="middle" class="win-l">TRECUT</text>
  <g class="lever"><rect x="292" y="72" width="9" height="74" rx="4.5" fill="var(--b-navy)"/><circle cx="296.5" cy="68" r="14" fill="var(--postbox)"/></g>
  <rect x="282" y="140" width="30" height="20" rx="6" fill="var(--b-navy)"/></svg>`;
const OTHER = { brought: 'bring', bought: 'buy', taught: 'teach', said: 'say', told: 'tell' };
export function machineWhy(base, w) {
  const v = VERB[base];
  if (OTHER[w] && OTHER[w] !== base) return `${w} e trecutul lui ${OTHER[w]}, nu al lui ${base}.`;
  if (v && v.pp === w && pastOf(v) !== w) return `${w} e participiul: I have ${w}. Trecutul simplu e altul.`;
  if (w === base || w === base + 's') return `${w} e prezentul. Trecutul e altul.`;
  if (/ed$/.test(w)) return `${w} nu există: ${base} e un verb neregulat.`;
  return `${w} nu e trecutul lui ${base}.`;
}
export async function machine(host, G, ctx) {
  const rounds = ctx.rounds || shuffle(G.rounds).slice(0, G.count || 8);
  const S = shell(host, G, { total: rounds.length });
  await intro(host, G);
  let streak = 0;
  for (const [k, [base, past, ...wrong]] of rounds.entries()) {
    S.board.dataset.round = base;
    S.board.innerHTML = `<div class="machine">${machineSVG(base, '?', Math.min(5, streak))}</div>`;
    const ok = await pick(S, { right: past, wrong, g: G.g, why: '' }, {
      record: (g, o) => { ctx.record(g, o); ctx.recordVerb?.(base, o); },
      onWrong: w => {
        streak = 0;
        const m = $('.mach', S.board); m.classList.remove('jam'); void m.getBoundingClientRect(); m.classList.add('jam');
        S.msg(`<span>${esc(machineWhy(base, w))}</span>`, 'why');
      },
    });
    if (ok) streak++;
    S.board.innerHTML = `<div class="machine">${machineSVG(base, past, Math.min(5, streak), true)}</div>`;
    S.tally(ok);
    await wait(750);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 8 · the timeline */
export async function timeline(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  const zones = G.zones;
  S.board.innerHTML = `<div class="tl z${zones.length}">
    <svg class="tl-axis" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path d="M6 20H286" stroke="var(--line)" stroke-width="3"/><path d="M280 13l8 7-8 7" stroke="var(--line)" stroke-width="3" fill="none"/>
      <circle cx="70" cy="20" r="7" fill="var(--postbox)"/><path d="M160 20H270" stroke="var(--signal-ink)" stroke-width="5" stroke-linecap="round"/><circle cx="160" cy="20" r="5" fill="var(--signal-ink)"/><circle cx="276" cy="20" r="6" fill="var(--pen)"/></svg>
    <div class="tl-zones">${zones.map(([z, l, sub]) => `<div class="tl-zone" data-z="${z}"><b>${esc(l)}</b><small>${esc(sub)}</small><div class="tl-cards"></div></div>`).join('')}</div>
    <p class="gb-line en" data-line></p></div>`;
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    $('[data-line]', S.board).innerHTML = gapHTML(r.text);
    const ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    const cards = $(`[data-z="${r.z}"] .tl-cards`, S.board);
    cards.insertAdjacentHTML('afterbegin', `<span class="tl-card en">${filled(r.text, r.right)}</span>`);
    $$('.tl-card', cards).slice(2).forEach(c => c.remove());
    $('[data-line]', S.board).innerHTML = '';
    S.tally(ok);
    await wait(600);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 9 · the plan board */
export async function plan(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  S.board.innerHTML = `<div class="cork"><div class="notes" data-notes>${G.rounds.map(() => '<span class="slot"></span>').join('')}</div></div><p class="gb-line en" data-line></p>`;
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    $('[data-line]', S.board).innerHTML = gapHTML(r.text);
    const ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    $$('[data-notes] > *', S.board)[k].outerHTML = `<span class="pin-note" style="--r:${[-4, 3, -2, 5, -3, 2][k % 6]}deg">${DOODLES[r.doodle]?.() || ''}<span class="en">${filled(r.text, r.right)}</span></span>`;
    $('[data-line]', S.board).innerHTML = '';
    S.tally(ok);
    await wait(600);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 10 · the office signs */
export async function signs(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    S.board.innerHTML = `<div class="sign">${SIGNS[r.sign]?.() || ''}</div><p class="gb-line en" data-line>${gapHTML(r.text)}</p>`;
    const ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    $('[data-line]', S.board).innerHTML = filled(r.text, r.right);
    S.tally(ok);
    await wait(650);
  }
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 12 · light up the lane */
const WINDOWS = [['home', 0], ['kettle', 0], ['shop', 0], ['no9', 0], ['office', 0], ['home', 3], ['kettle', 3], ['shop', 3], ['no9', 3], ['office', 3], ['home', 5], ['no9', 4]];
export async function lights(host, G, ctx) {
  const rounds = ctx.rounds || G.rounds;
  const S = shell(host, G, { total: rounds.length });
  S.board.innerHTML = `<div class="gb-art lane night" data-lane>${laneSVG({}, { vb: '0 40 1440 360', par: 'xMidYMid slice' })}</div><p class="gb-line en" data-line></p>`;
  const svg = $('[data-lane] svg', S.board);
  const look = u => zoom(svg, u ? [Math.max(0, Math.min(1440 - 520, BUILDINGS[u][0] - 260)), 60, 520, 330] : [0, 40, 1440, 360]);
  look(WINDOWS[0][0]);
  await intro(host, G);
  let n = 0;
  for (const [k, r] of rounds.entries()) {
    S.board.dataset.round = k;
    $('[data-line]', S.board).innerHTML = gapHTML(r.text);
    const ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    $('[data-line]', S.board).innerHTML = filled(r.text, r.right);
    const [u, i] = WINDOWS[n++ % WINDOWS.length];
    $(`.win[data-u="${u}"][data-i="${i}"]`, S.board)?.classList.add('on');
    S.tally(ok);
    await wait(700);
    if (k < rounds.length - 1) look(WINDOWS[n % WINDOWS.length][0]);
  }
  clearOpts(S);
  look(null);
  await wait(900);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/** Glides an svg's viewBox to `to` ([x, y, w, h]). */
function zoom(svg, to) {
  const from = svg.getAttribute('viewBox').split(' ').map(Number);
  const t0 = performance.now(), dur = reduceMotion() ? 0 : 650;
  const step = now => {
    const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
    svg.setAttribute('viewBox', from.map((f, j) => (f + (to[j] - f) * e).toFixed(1)).join(' '));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export { linden };
