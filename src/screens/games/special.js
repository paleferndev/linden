import { face } from '../../art/art.js';
import { no9, NO9 } from '../../art/night.js';
import { ITEMS, LOST, NIGHT_PANELS, COMPARE, COMPARE_NAMES } from '../../art/props.js';
import { say } from '../../app/sound.js';
import { shell, intro, result, pick, gapHTML, filled, clearOpts, wait, esc, sub, $, $$, shuffle, tone, hook } from './kit.js';

// The games with their own move: asking Tom the right questions (does), putting Sam's night in order (the past),
// filling Priya's shelves (much and many), finding things in Mrs Hughes's garden (prepositions), and comparing the
// things on Dr Okafor's table.

const NAMES = { priya: 'Priya', sam: 'Sam', hughes: 'Mrs Hughes', okafor: 'Dr Okafor', lily: 'Lily', ben: 'Ben' };
const shake = el => { el.classList.remove('nope'); void el.offsetWidth; el.classList.add('nope'); };
/** Resolves with the element tapped among `sel`, once `accept(el)` says yes. Wrong taps shake and call `miss`. */
const tapOne = (root, sel, accept, miss) => new Promise(resolve => {
  const els = $$(sel, root);
  els.forEach(el => el.classList.add('tappable'));
  const on = e => {
    const el = e.target.closest(sel);
    if (!el || !root.contains(el) || el.classList.contains('out')) return;
    if (accept(el)) { els.forEach(x => x.classList.remove('tappable')); root.removeEventListener('click', on); resolve(el); }
    else { shake(el); miss?.(el); }
  };
  root.addEventListener('click', on);
});

/* ---------------------------------------------------------------- 2 · who saw the light? */
export async function guesswho(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length + 1 });
  const who = Object.keys(G.people), target = G.people[G.answer];
  S.board.innerHTML = `<div class="gw-tom"><span class="ava" style="--c:var(--cafe-wall)">${face('tom')}</span><p class="bub en" data-bub>Hmm… who was it?</p></div>
    <div class="gw-grid">${who.map(w => `<button type="button" class="gw-card" data-who="${w}"><span class="ava" style="--c:var(--sunk)">${face(w)}</span><b>${NAMES[w]}</b></button>`).join('')}</div>`;
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    const ok = await pick(S, { right: r.right, wrong: r.wrong, why: r.why, g: G.g }, { record: ctx.record });
    const yes = target[r.key];
    const [en, ro] = yes ? r.yes : r.no;
    $('[data-bub]', S.board).innerHTML = `${esc(en)}<small>${esc(ro)}</small>`;
    say(en, { who: 'tom', auto: true });
    await wait(500);
    for (const w of who) if (G.people[w][r.key] !== yes) $(`[data-who="${w}"]`, S.board).classList.add('out');
    S.tally(ok);
    clearOpts(S);
    await wait(900);
  }
  S.board.dataset.round = 'who';
  S.msg('Cine e? Atinge persoana.');
  hook({ act: 'tap', sel: `.gw-card[data-who="${G.answer}"]` });
  await tapOne(S.board, '.gw-card', el => el.dataset.who === G.answer);
  $(`[data-who="${G.answer}"]`, S.board).classList.add('found');
  tone('reveal');
  S.board.dataset.round = 'last';
  S.msg('');
  $('[data-bub]', S.board).innerHTML = gapHTML(G.last.text);
  const ok = await pick(S, { ...G.last, g: 'ps-s' }, { record: ctx.record });
  $('[data-bub]', S.board).innerHTML = filled(G.last.text, G.last.right);
  S.tally(ok);
  await wait(700);
  clearOpts(S);
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 4 · Sam's night, in order */
export async function order(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  const panels = shuffle(G.rounds.map(r => r.panel));
  S.board.innerHTML = `<div class="ord-slots">${G.rounds.map((_, k) => `<span class="ord-slot" data-slot="${k}"><i>${k + 1}</i></span>`).join('')}</div>
    <div class="ord-pile">${panels.map(p => `<button type="button" class="ord-card" data-panel="${p}">${NIGHT_PANELS[p]()}</button>`).join('')}</div>
    <p class="gb-line en" data-line></p>`;
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    $('[data-line]', S.board).innerHTML = `<span class="who-s">Sam:</span> ${gapHTML(r.text)}`;
    let ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
    $('[data-line]', S.board).innerHTML = `<span class="who-s">Sam:</span> ${filled(r.text, r.right)}`;
    clearOpts(S);
    S.msg('Acum atinge imaginea.');
    S.board.dataset.step = 'panel';
    hook({ act: 'tap', sel: `.ord-card[data-panel="${r.panel}"]` });
    await tapOne(S.board, '.ord-card', el => el.dataset.panel === r.panel, () => { ok = false; S.msg('Nu asta. Citește ce spune Sam.', 'why'); });
    delete S.board.dataset.step;
    const card = $(`[data-panel="${r.panel}"]`, S.board);
    $(`[data-slot="${k}"]`, S.board).innerHTML = NIGHT_PANELS[r.panel]();
    $(`[data-slot="${k}"]`, S.board).classList.add('got');
    card.remove();
    S.msg('');
    S.tally(ok);
    await wait(500);
  }
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 5 · Priya's shelves */
export async function shelves(host, G, ctx) {
  const items = ctx.items || shuffle(G.items).slice(0, 10);
  const S = shell(host, G, { total: items.length });
  S.board.innerHTML = `<div class="sh-item" data-item></div>
    <div class="baskets"><button type="button" class="basket" data-opt data-b="many"><b class="en">How many…?</b><small>se numără</small><span class="got"></span></button>
    <button type="button" class="basket" data-opt data-b="much"><b class="en">How much…?</b><small>nu se numără</small><span class="got"></span></button></div>`;
  await intro(host, G);
  for (const [k, [key, word, kind]] of items.entries()) {
    S.board.dataset.round = key;
    const card = $('[data-item]', S.board);
    card.innerHTML = `<span class="pic">${ITEMS[key]()}</span><b class="en">${esc(word)}</b>`;
    card.classList.remove('in'); void card.offsetWidth; card.classList.add('in');
    hook({ act: 'tap', sel: `[data-b="${kind}"]` });
    const b = await new Promise(resolve => $$('[data-b]', S.board).forEach(x => { x.onclick = () => resolve(x); }));
    $$('[data-b]', S.board).forEach(x => { x.onclick = null; });
    const ok = b.dataset.b === kind;
    ctx.record(G.g, ok);
    const right = $(`[data-b="${kind}"]`, S.board);
    right.classList.remove('flash-ok', 'flash-no'); b.classList.remove('flash-ok', 'flash-no'); void b.offsetWidth;
    b.classList.add(ok ? 'flash-ok' : 'flash-no');
    $('.got', right).insertAdjacentHTML('beforeend', `<span class="mini">${ITEMS[key]()}</span>`);
    $$('.got .mini', right).slice(0, -5).forEach(m => m.remove());
    S.msg(ok ? `<span class="en">How ${kind} ${esc(word)}?</span>` : `<span>${esc(G.why[kind].replace('{w}', word[0].toUpperCase() + word.slice(1)))}</span>`, ok ? '' : 'why');
    S.tally(ok);
    await wait(ok ? 500 : 1200);
  }
  S.msg('');
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 6 · Mrs Hughes's garden */
export async function room(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  const spots = Object.entries(NO9).map(([k, [x, y, w, h]]) => `<rect class="spot-hit" data-spot="${k}" x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="6" fill="transparent"/>`).join('');
  S.board.innerHTML = `<div class="instr"><button type="button" class="spk" data-hear aria-label="Ascultă">${'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6"/></svg>'}</button><span class="en" data-say></span></div>
    <div class="gb-art garden9"><svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMax meet" aria-hidden="true">${no9()}<g data-found></g><g data-marks></g>${spots}</svg></div>`;
  await intro(host, G);
  const svg = $('.garden9 svg', S.board);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    $('[data-say]', S.board).textContent = sub(r.text);
    $('[data-hear]', S.board).onclick = () => say(r.text, { who: 'hughes' });
    say(r.text, { who: 'hughes', auto: true });
    hook({ act: 'tap', sel: `[data-spot="${r.at}"]` });
    const hit = await new Promise(resolve => { svg.onclick = e => resolve(e.target.closest('[data-spot]')?.dataset.spot || null); });
    svg.onclick = null;
    const ok = hit === r.at;
    ctx.record(G.g, ok);
    const [x, y, w, h] = NO9[r.at], cx = x + w / 2, cy = y + h / 2;
    $('[data-marks]', svg).innerHTML = ok ? `<circle cx="${cx}" cy="${cy}" r="16" class="mk ok"/>`
      : `${hit ? `<circle cx="${NO9[hit][0] + NO9[hit][2] / 2}" cy="${NO9[hit][1] + NO9[hit][3] / 2}" r="14" class="mk no"/>` : ''}<circle cx="${cx}" cy="${cy}" r="16" class="mk show"/>`;
    $('[data-found]', svg).insertAdjacentHTML('beforeend', LOST[r.item]?.(cx, cy) || '');
    S.msg(ok ? '' : `<span>Era aici: <b class="en">${esc(r.at)}</b>.</span>`, ok ? '' : 'why');
    S.tally(ok);
    await wait(ok ? 800 : 1500);
    $('[data-marks]', svg).innerHTML = '';
  }
  S.msg('');
  await result(host, S);
  return { right: S.right, total: S.total };
}

/* ---------------------------------------------------------------- 11 · the brightest */
export async function compare(host, G, ctx) {
  const S = shell(host, G, { total: G.rounds.length });
  await intro(host, G);
  for (const [k, r] of G.rounds.entries()) {
    S.board.dataset.round = k;
    const names = COMPARE_NAMES[r.set];
    S.board.innerHTML = `<div class="cmp">${COMPARE[r.set].map((d, i) => `<button type="button" class="cmp-it" data-i="${i}">${d()}${names[i] ? `<small class="en">${esc(names[i])}</small>` : ''}</button>`).join('')}</div>
      <p class="gb-line en" data-line>${r.tap ? esc(r.tap) : gapHTML(r.text)}</p>`;
    let ok;
    if (r.tap) {
      ok = true;
      S.msg('Atinge.');
      hook({ act: 'tap', sel: `.cmp-it[data-i="${r.at}"]` });
      await tapOne(S.board, '.cmp-it', el => +el.dataset.i === r.at, () => { if (ok) ctx.record(r.g || G.g, false); ok = false; S.msg(esc(r.why), 'why'); });
      if (ok) ctx.record(r.g || G.g, true);
      $(`[data-i="${r.at}"]`, S.board).classList.add('found');
      S.msg('');
    } else {
      ok = await pick(S, { ...r, g: r.g || G.g }, { record: ctx.record });
      $('[data-line]', S.board).innerHTML = filled(r.text, r.right);
    }
    clearOpts(S);
    S.tally(ok);
    await wait(700);
  }
  await result(host, S);
  return { right: S.right, total: S.total };
}
