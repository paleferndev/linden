import { garden, linden } from '../../art/night.js';
import { stranger } from '../../art/stranger.js';
import { laneSVG, BUILDINGS } from '../../art/lane.js';
import { reduceMotion } from '../../app/ui.js';
import { photo, SIGNS, DOODLES } from '../../art/props.js';
import { shell, intro, result, pick, gapHTML, filled, clearOpts, wait, esc, $, $$, shuffle } from './kit.js';
import { VERB, pastOf } from '../../content/verbs.js';

// The games where the rule is a choice in a sentence, each with its own board: the lantern in the garden (this and
// that), the Stranger's photos (now or usually), the verb machine, the timeline, the plan board, the office signs, and
// the finale that lights up the street.

/* ---------------------------------------------------------------- 1 · the lantern in the garden */
// The table is drawn 1.25× bigger than the rest (nearer), so its spots are scaled too.
const T = ([x, y]) => [x * 1.25, y * 1.25 - 62.5];
const SPOTS = { cup: T([42, 198]), keys: T([76, 212]), apples: T([112, 202]), book: T([146, 214]), moon: [318, 38], stars: [184, 30], tree: [262, 88], birds: [176, 164] };
const near = { cup: 1, keys: 1, apples: 1, book: 1 };
function gardenBoard() {
  const table = `<g transform="translate(0 -62.5) scale(1.25)"><rect x="10" y="216" width="170" height="40" rx="4" fill="var(--wood)"/><rect x="10" y="212" width="170" height="8" rx="3" fill="var(--wood-top)"/>
    <g transform="translate(30 186)"><path d="M0 4h22c-1 12-5 18-11 18S1 16 0 4z" fill="var(--china)" stroke="var(--china-line)"/><path d="M22 8c7 0 7 9-1 9" stroke="var(--china-line)" stroke-width="2.4" fill="none"/><ellipse cx="11" cy="4.5" rx="11" ry="2.4" fill="var(--tea-brown)"/></g>
    <g transform="translate(64 204)"><circle cx="5" cy="5" r="4.5" fill="none" stroke="var(--brass)" stroke-width="2.4"/><path d="M9 5h14M19 5v4M22 5v3" stroke="var(--brass)" stroke-width="2.4"/><circle cx="13" cy="10" r="4" fill="none" stroke="var(--faint)" stroke-width="2"/><path d="M16 12l8 4" stroke="var(--faint)" stroke-width="2.2"/></g>
    ${[[104, 206], [116, 206], [110, 197]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="var(--postbox)"/><path d="M${x} ${y - 7}l1-3" stroke="var(--wood-line)" stroke-width="1.4"/>`).join('')}
    <g transform="translate(132 204) rotate(-6)"><rect width="30" height="10" rx="1.5" fill="var(--pen)"/><rect x="2" y="2" width="26" height="4" fill="var(--china)"/></g></g>
    ${[[162, 166], [176, 164], [190, 167]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="5" ry="3.6" fill="var(--b-navy)"/><circle cx="4" cy="-3" r="2.4" fill="var(--b-navy)"/><path d="M6 -3l2.4 .8" stroke="var(--sun)" stroke-width="1.2"/></g>`).join('')}`;
  return `<svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMax meet" aria-hidden="true">${garden({ tree: .45, door: false })}${table}
    <g transform="translate(276 128) scale(.66)">${stranger('calm', { light: .6 })}</g>
    <g data-beam></g></svg>`;
}
function point(root, at) {
  const [x, y] = SPOTS[at];
  const [lx, ly] = [276 + 92 * .66, 128 + 132 * .66];
  $('[data-beam]', root).innerHTML = `<path d="M${lx} ${ly}L${x - 16} ${y}L${x + 16} ${y}z" fill="var(--spark)" opacity=".18"/><circle cx="${x}" cy="${y}" r="${near[at] ? 16 : 22}" fill="none" stroke="var(--spark)" stroke-width="3" class="ring"/>`;
}
export async function thisthat(host, G, ctx) {
  const rounds = G.rounds;
  const S = shell(host, G, { total: rounds.length });
  S.board.innerHTML = `<div class="gb-art night">${gardenBoard()}</div><p class="gb-line en" data-line></p>`;
  await intro(host, G);
  for (const [k, r] of rounds.entries()) {
    S.board.dataset.round = k;
    point(S.board, r.at);
    $('[data-line]', S.board).innerHTML = gapHTML(r.text);
    const ok = await pick(S, { ...r, wrong: G.options.filter(o => o !== r.right), g: G.g }, { record: ctx.record, fixed: G.options });
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
