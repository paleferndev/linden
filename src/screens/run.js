import { ITEMS } from '../content/items.js';
import { TRAPS } from '../content/traps.js';
import { LESSONS, place } from '../content/lessons.js';
import { ICONS } from '../art/icons.js';
import { sceneSVG, sceneKey, objIcon, SCENES, thisThat } from '../art/scenes.js';
import { laneSVG, BUILDINGS } from '../art/lane.js';
import { avatar, avatarBg } from '../art/people.js';
import { PICS, timePanel, TIMES, MOUTH, MOUTHS } from '../art/things.js';
import { Store, record, finishLesson, addDays, today, markDay, lessonDone } from '../app/store.js';
import { $, $$, esc, reflow, shuffle, sub, respell, reduceMotion } from '../app/ui.js';
import { say, tone, isSlow, setSlow } from '../app/sound.js';
import { setBusy } from '../pwa.js';
import { DRILL_VIEW, DRILL_BIND } from './drills.js';

// The lesson runner. A run is a list of steps shown one screen at a time: a lesson's own steps, or the drills of a
// review. Every step has the same frame: top bar (close, lamps, slow voice), the step, and the tray that rises with
// feedback. Nothing scrolls inside a step except the chat.

let R = null;

const t = s => esc(sub(s));
const en = s => `<span class="en">${t(s)}</span>`;
const foot = (label, attrs = 'data-next') => `<div class="foot"><button type="button" class="btn act" ${attrs}>${label}</button></div>`;
const trapCard = id => {
  const x = TRAPS[id];
  if (!x) return '';
  if (R?.kind !== 'demo' && !Store.d.traps.includes(id)) { Store.d.traps.push(id); Store.save(); }
  return `<div class="trap"><p class="trap-k">${ICONS.trap}Capcană pentru români</p>
    <p class="x ${x.badSay ? 'say-x' : 'en'}">${esc(x.bad)}</p><p class="v en">${esc(x.good)}</p><p class="why">${esc(x.why)}</p></div>`;
};
const pickPic = ref => ref.startsWith('tt:') ? thisThat(ref.slice(3)) : objIcon(ref);

/* ======================================================================== the frame */

/**
 * opts: { kind: 'lesson' | 'review', lessonId?, steps, start?, onExit(), title }
 */
export function openRun(opts) {
  const layer = $('#layer');
  layer.innerHTML = `<div class="run" role="dialog" aria-modal="true" aria-label="${esc(opts.title)}">
    <div class="run-top">
      <button type="button" class="icon-btn" data-exit aria-label="Închide">${ICONS.close}</button>
      <div class="lamps" aria-hidden="true"></div>
      <button type="button" class="speed" data-slow aria-pressed="${isSlow()}" title="Vocea mai rar">${ICONS.slow}Rar</button>
    </div>
    <div class="stage"></div>
    <div class="tray" aria-live="polite" inert></div>
  </div>`;
  layer.hidden = false;
  document.body.classList.add('in-run');
  R = { ...opts, i: -1, steps: opts.steps.map((s, k) => ({ ...s, orig: k })), right: 0, total: 0, missed: [], started: Date.now(), layer };
  setBusy(true);
  enterFullscreen();

  $('[data-exit]', layer).onclick = () => opts.onExit();
  $('[data-slow]', layer).onclick = e => {
    setSlow(!isSlow());
    e.currentTarget.setAttribute('aria-pressed', String(isSlow()));
  };
  layer.onclick = e => {
    const s = e.target.closest('[data-say]');
    if (s && !s.disabled) say(s.dataset.say, { el: s });
  };
  document.addEventListener('keydown', onKey);
  go(opts.start || 0);
}

export function closeRun() {
  if (!R) return;
  document.removeEventListener('keydown', onKey);
  R.cleanup?.();
  speechSynthesis?.cancel?.();
  const layer = R.layer;
  R = null;
  layer.hidden = true;
  layer.innerHTML = '';
  document.body.classList.remove('in-run');
  setBusy(false);
  exitFullscreen();
}

export const runOpen = () => !!R;

function onKey(e) {
  if (!R || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.matches('input, textarea')) return;
  const step = $('.step:not(.leave)', R.layer);
  const tray = $('.tray.show', R.layer);
  if (e.key === 'Escape') { e.preventDefault(); R.onExit(); return; }
  if (/^[1-9]$/.test(e.key)) {
    const b = step && $$('[data-opt]:not([disabled]), .reply:not([disabled])', step)[+e.key - 1];
    if (b && !tray) { e.preventDefault(); b.click(); }
    return;
  }
  if (e.key === 'Enter') {
    const b = tray ? $('[data-tray]', tray) : step && $('.foot .act:not([disabled])', step);
    if (b && document.activeElement?.closest('.tile, .opt, .reply, .card, .mt') == null) { e.preventDefault(); b.click(); }
    return;
  }
  if (e.key === ' ' && step) {
    const r = $('[data-replay]', step);
    if (r) { e.preventDefault(); r.click(); }
  }
}

/* Android: lessons run full screen, the status bar comes back on the street. */
const canFullscreen = () => /Android/i.test(navigator.userAgent) && matchMedia('(display-mode: standalone)').matches && document.fullscreenEnabled;
function enterFullscreen() {
  if (canFullscreen() && !document.fullscreenElement) document.documentElement.requestFullscreen?.({ navigationUI: 'hide' }).catch(() => {});
}
function exitFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
}

function lamps() {
  const n = R.steps.length;
  $('.lamps', R.layer).innerHTML = Array.from({ length: n }, (_, k) => `<span class="lamp${k < R.i ? ' on' : ''}${k === R.i ? ' now' : ''}"></span>`).join('');
}

function go(n) {
  hideTray();
  if (R.kind === 'review' && n < R.steps.length - 1 && Date.now() - R.started > 3 * 60 * 1000) n = R.steps.length - 1; // the review stops at three minutes
  R.i = n;
  const s = R.steps[n];
  const stage = $('.stage', R.layer);
  const old = $('.step:not(.leave)', stage);
  if (old) { old.classList.add('leave'); setTimeout(() => old.remove(), reduceMotion() ? 0 : 220); }
  R.cleanup?.(); R.cleanup = null;
  const el = document.createElement('div');
  el.className = `step s-${s.t}`;
  el.dataset.orig = s.orig;
  el.innerHTML = VIEW[s.t](s);
  stage.appendChild(el);
  $$('[data-next]', el).forEach(b => b.addEventListener('click', next));
  BIND[s.t]?.(el, s);
  lamps();
  if (R.kind === 'lesson' && s.t !== 'done') { Store.d.resume = { lesson: R.lessonId, step: s.orig, day: today() }; Store.save(); }
  if (usingKeys) requestAnimationFrame(() => $('[data-opt], .obj, .card, .ltile, .ntile, .reply, .foot .act', el)?.focus?.({ preventScroll: true }));
}
// Focus follows the step only for keyboard users; on touch it would just draw a ring.
let usingKeys = false;
addEventListener('keydown', () => { usingKeys = true; }, true);
addEventListener('pointerdown', () => { usingKeys = false; }, true);
const next = () => { if (R && R.i < R.steps.length - 1) go(R.i + 1); };

/* ---------- tray */
function showTray({ ok, title, html = '', label = 'Continuă', onNext = next }) {
  const tray = $('.tray', R.layer);
  tray.className = `tray ${ok ? 'good' : 'bad'}`;
  tray.innerHTML = `<h4>${ok ? ICONS.check : ICONS.hint}${esc(title)}</h4>${html ? `<p>${html}</p>` : ''}<button type="button" class="btn" data-tray>${label}</button>`;
  tray.inert = false;
  reflow(tray);
  tray.classList.add('show');
  $('[data-tray]', tray).onclick = onNext;
  if (usingKeys) setTimeout(() => $('[data-tray]', tray)?.focus({ preventScroll: true }), 50);
}
function hideTray() {
  const tray = R && $('.tray', R.layer);
  if (!tray) return;
  tray.classList.remove('show');
  tray.inert = true;
}

/* ---------- grading: the schedule hears about first answers; a wrong one comes back two steps later */
function grade(s, ok) {
  R.total++;
  if (ok) R.right++;
  if (s.again || R.kind === 'demo') return;
  for (const id of s.ids || []) record(id, ok);
  if (!ok) {
    R.missed.push(...(s.ids || []));
    const stop = R.steps.findIndex((x, k) => k > R.i && (x.t === 'talk' || x.t === 'done'));
    const at = Math.min(R.i + 3, stop === -1 ? R.steps.length : stop);
    R.steps.splice(at, 0, { ...s, again: true });
  }
  Store.save();
}

/* ======================================================================== views */

const VIEW = {};
const BIND = {};

/* ---------- scene: a neighbour says one line */
VIEW.scene = s => {
  const L = LESSONS[s.from || R.lessonId], P = place(L.place), key = sceneKey(s.scene, s.set), S = SCENES[key];
  const sp = S.speaker;
  return `<div class="scene" style="--wall:var(${S.wall})">${sceneSVG(key)}
      <button type="button" class="bubble" style="left:${sp.left};top:${sp.top};max-width:${sp.width}" data-line>${en(s.line.en)}${ICONS.speaker}</button>
    </div>
    <div class="body">
      <p class="ro-line" data-ro hidden>„${t(s.line.ro)}”</p>
      <p class="kick">${esc(P.name)} · Lecția ${L.index + 1}</p>
      <h2 class="title">${esc(L.title)}</h2>
      <p class="goal">${esc(L.goal)}</p>
      <div class="meta"><span>≈ 5 min</span><span>${L.items.length} ${L.items.length === 1 ? 'cuvânt' : 'cuvinte'}</span>${lessonDone(L.id) ? '<span class="done-chip">terminată</span>' : ''}</div>
      ${L.can?.length ? `<div class="can"><p class="kick">Vei putea spune</p>${L.can.map(c => `<button type="button" class="say-row" data-say="${esc(c)}">${en(c)}${ICONS.speaker}</button>`).join('')}</div>` : ''}
    </div>
    ${foot('Începe')}`;
};
BIND.scene = (el, s) => {
  const b = $('[data-line]', el), sc = $('.scene', el);
  const play = (auto = false) => {
    sc.classList.add('talking');
    say(s.line.tts || s.line.en, { el: b, auto }).then(() => sc.classList.remove('talking'));
    if (!auto) $('[data-ro]', el).hidden = false;
  };
  b.addEventListener('click', () => play());
  play(true);
};

/* ---------- explore: tap the things in the picture */
VIEW.explore = s => {
  const key = sceneKey(s.scene, s.set), S = SCENES[key];
  const labels = Object.fromEntries(Object.entries(s.objects).map(([k, id]) => [k, esc(ITEMS[id].en)]));
  return `<div class="scene" style="--wall:var(${S.wall})">${sceneSVG(key, { interactive: true, labels })}</div>
    <div class="body">
      <div class="head-row"><h2 class="q">Atinge fiecare lucru.</h2><span class="counter" data-count>0 / ${Object.keys(s.objects).length}</span></div>
      <div class="slots">${Object.entries(s.objects).map(([k, id]) => `<button type="button" class="slot" data-k="${k}" data-say="${esc(id)}" disabled>
        <span class="si">${objIcon(`${key}:${k}`)}</span><span class="st"><b>?</b><small></small></span></button>`).join('')}</div>
    </div>
    ${foot('Continuă')}`;
};
BIND.explore = (el, s) => {
  const scene = $('.scene', el), found = new Set();
  const total = Object.keys(s.objects).length;
  let tag = null;
  const spots = () => {
    $$('.spot', scene).forEach(x => x.remove());
    const box = scene.getBoundingClientRect();
    $$('.obj', scene).forEach((g, j) => {
      if (found.has(g.dataset.k)) return;
      const r = $('.hit', g).getBoundingClientRect();
      scene.insertAdjacentHTML('beforeend', `<span class="spot" style="left:${r.left - box.left + r.width / 2}px;top:${r.top - box.top + r.height / 2}px;animation-delay:${(j * 0.37).toFixed(2)}s"></span>`);
    });
  };
  const reveal = g => {
    const k = g.dataset.k, id = s.objects[k], it = ITEMS[id];
    g.classList.remove('bump'); reflow(g); g.classList.add('bump');
    tag?.remove();
    const box = scene.getBoundingClientRect(), r = $('.hit', g).getBoundingClientRect();
    const x = Math.max(56, Math.min(box.width - 56, r.left - box.left + r.width / 2));
    tag = document.createElement('span');
    tag.className = 'tag';
    tag.style.left = x + 'px';
    tag.style.top = Math.max(44, r.top - box.top) + 'px';
    tag.innerHTML = `<b>${t(it.en)}</b><small>${t(it.ro[0])}</small>`;
    scene.appendChild(tag);
    say(id);
    if (!found.has(k)) {
      found.add(k);
      const sl = $(`.slot[data-k="${k}"]`, el);
      sl.disabled = false;
      sl.classList.add('got');
      $('.st', sl).innerHTML = `<b>${t(it.en)}</b><small>${t(it.ro[0])}</small>`;
      $('[data-count]', el).textContent = `${found.size} / ${total}`;
      spots();
      if (found.size === total) tone('ok');
    }
  };
  $$('.obj', scene).forEach(g => {
    g.addEventListener('click', () => reveal(g));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(g); } });
  });
  requestAnimationFrame(spots);
  const ro = new ResizeObserver(() => { tag?.remove(); tag = null; spots(); });
  ro.observe(scene);
  R.cleanup = () => ro.disconnect();
};

/* ---------- cards: tap each word or phrase */
VIEW.cards = s => {
  const items = s.ids.map(id => ITEMS[id]);
  const list = items.some(it => it.kind === 'phrase') || !s.pics;
  return `<div class="body">
      <div class="head-row"><h2 class="q">Atinge și ascultă.</h2><span class="counter" data-count>0 / ${items.length}</span></div>
      <div class="cards ${list ? 'list' : 'grid'}">${items.map(it => `<button type="button" class="card" data-id="${it.id}">
        ${s.pics?.[it.id] ? `<span class="pic">${s.pics[it.id].startsWith('tt:') ? pickPic(s.pics[it.id]) : PICS[s.pics[it.id]]}</span>` : ''}
        <span class="c-txt"><span class="en">${t(it.en)}</span><span class="c-more"><span class="say">${respell(it.say)}</span><span class="c-ro">${t(it.ro[0])}</span></span></span>
        <span class="c-spk">${ICONS.speaker}</span></button>`).join('')}</div>
    </div>
    ${foot('Continuă')}`;
};
BIND.cards = (el, s) => {
  const heard = new Set();
  $$('.card', el).forEach(c => c.addEventListener('click', () => {
    say(c.dataset.id, { el: c });
    c.classList.add('open');
    if (!heard.has(c.dataset.id)) {
      heard.add(c.dataset.id);
      $('[data-count]', el).textContent = `${heard.size} / ${s.ids.length}`;
      if (heard.size === s.ids.length) tone('ok');
    }
  }));
};

/* ---------- letters: the whole alphabet */
VIEW.letters = () => `<div class="body">
    <div class="head-row"><h2 class="q">Atinge fiecare literă.</h2><span class="counter" data-count>0 / 26</span></div>
    <div class="letters">${'abcdefghijklmnopqrstuvwxyz'.split('').map(l => { const it = ITEMS['w.l-' + l]; return `<button type="button" class="ltile" data-id="${it.id}"><b class="en">${it.en}</b><small>${respell(it.say, { force: true })}</small></button>`; }).join('')}</div>
  </div>
  ${foot('Continuă')}`;
BIND.letters = el => {
  const heard = new Set();
  $$('.ltile', el).forEach(b => b.addEventListener('click', () => {
    say(b.dataset.id, { el: b });
    b.classList.add('open');
    heard.add(b.dataset.id);
    $('[data-count]', el).textContent = `${heard.size} / 26`;
  }));
};

/* ---------- numbers */
VIEW.numbers = s => {
  const ns = Array.from({ length: s.to - s.from + 1 }, (_, k) => s.from + k);
  return `<div class="body">
      <div class="head-row"><h2 class="q">Atinge fiecare număr.</h2><span class="counter" data-count>0 / ${ns.length}</span></div>
      <div class="numbers" style="--cols:${ns.length > 10 ? 4 : 5}">${ns.map(n => { const it = ITEMS['w.n-' + n]; return `<button type="button" class="ntile" data-id="${it.id}"><b>${n}</b><span class="en">${it.en}</span></button>`; }).join('')}</div>
      <p class="say-line" data-sayline>&nbsp;</p>
    </div>
    ${foot('Continuă')}`;
};
BIND.numbers = (el, s) => {
  const heard = new Set(), total = s.to - s.from + 1;
  $$('.ntile', el).forEach(b => b.addEventListener('click', () => {
    const it = ITEMS[b.dataset.id];
    say(it.id, { el: b });
    b.classList.add('open');
    heard.add(it.id);
    $('[data-count]', el).textContent = `${heard.size} / ${total}`;
    $('[data-sayline]', el).innerHTML = `<b>${it.n}</b> · <span class="en">${it.en}</span> · ${respell(it.say, { force: true })}`;
  }));
};

/* ---------- times of day */
VIEW.times = s => `<div class="body">
    <h2 class="q">Salutul depinde de ora din zi.</h2>
    <div class="times">${TIMES.map(x => { const it = ITEMS[x.id]; return `<button type="button" class="tpanel" data-say="${it.id}">${timePanel(x.k)}<span class="en">${t(it.en)}</span><small>${x.when}</small></button>`; }).join('')}</div>
    ${trapCard(s.trap)}
  </div>
  ${foot('Continuă')}`;

/* ---------- pattern: one pattern, the changing part highlighted */
VIEW.pattern = s => {
  const [a, b] = s.text.split('{}'), [ra, rb] = s.ro.split('{}');
  const pic = s.slots[0].pic;
  return `<div class="body">
      <p class="kick">Tiparul</p>
      <button type="button" class="pattern en" data-pat>${t(a)}<span class="mk sweep" data-slot>${t(s.slots[0].en)}</span>${t(b)}</button>
      <p class="ro-line" data-pro>${t(ra)}<span data-rslot>${t(s.slots[0].ro)}</span>${t(rb)}</p>
      ${s.hand ? `<p class="hand">${esc(s.hand)}</p>` : ''}
      <div class="swap">${s.slots.map((x, k) => `<button type="button" class="pill en" data-k="${k}" aria-pressed="${k === 0}">${t(x.en)}</button>`).join('')}</div>
      ${pic ? `<div class="slot-pic" data-pic>${pickPic(pic)}</div>` : ''}
      ${s.trap ? trapCard(s.trap) : ''}
    </div>
    ${foot('Continuă')}`;
};
BIND.pattern = (el, s) => {
  let k = 0;
  const [a, b] = s.text.split('{}');
  const sayIt = () => say(`${a}${s.slots[k].en}${b}`, { el: $('[data-pat]', el) });
  $('[data-pat]', el).addEventListener('click', sayIt);
  $$('.pill', el).forEach(p => p.addEventListener('click', () => {
    k = +p.dataset.k;
    $$('.pill', el).forEach(q => q.setAttribute('aria-pressed', String(q === p)));
    const slot = $('[data-slot]', el);
    slot.textContent = sub(s.slots[k].en);
    slot.classList.remove('sweep'); reflow(slot); slot.classList.add('sweep');
    $('[data-rslot]', el).textContent = sub(s.slots[k].ro);
    const pic = $('[data-pic]', el);
    if (pic && s.slots[k].pic) pic.innerHTML = pickPic(s.slots[k].pic);
    sayIt();
  }));
  setTimeout(() => { if (R && R.steps[R.i] === s) say(`${a}${s.slots[k].en}${b}`, { el: $('[data-pat]', el), auto: true }); }, 450);
};

/* ---------- stress: where the weight of the word falls */
VIEW.stress = s => `<div class="body">
    <h2 class="q">Le știi, dar accentul e altundeva.</h2>
    <p class="sub">Punctul mare e silaba apăsată. Atinge un cuvânt.</p>
    <div class="stress">${s.rows.map((r, k) => { const it = ITEMS[r.id]; return `<button type="button" class="srow" data-k="${k}">
      <span class="s-w"><span class="en">${it.en}</span><span class="say">${respell(it.say, { force: true })}</span></span>
      <span class="beat-col"><span class="beats" data-en><small>EN</small>${r.en.map((_, j) => `<i class="${j === r.s ? 's' : ''}"></i>`).join('')}</span>
      <span class="beats ro"><small>RO</small>${r.ro.map((_, j) => `<i class="${j === r.rs ? 's' : ''}"></i>`).join('')}</span></span></button>`; }).join('')}</div>
    ${trapCard(s.trap)}
  </div>
  ${foot('Continuă')}`;
BIND.stress = (el, s) => {
  $$('.srow', el).forEach(row => row.addEventListener('click', () => {
    const r = s.rows[+row.dataset.k];
    say(r.id, { el: row, rate: 0.8 });
    $$('[data-en] i', row).forEach((d, j) => {
      setTimeout(() => d.classList.add('hit'), 120 + j * 260);
      setTimeout(() => d.classList.remove('hit'), 120 + j * 260 + 230);
    });
  }));
};

/* ---------- the sound key */
VIEW.soundkey = () => `<div class="body">
    <h2 class="q">Cum citești «scrierea pe românește»</h2>
    <div class="key">
      <button type="button" class="krow" data-say="w.hotel"><span class="k-s">«hou-<b>TEL</b>»</span><span class="k-d">Silaba cu majuscule e cea apăsată.</span></button>
      <button type="button" class="krow" data-say="w.doctor"><span class="k-s">«DOC-t<u>ă</u>r»</span><span class="k-d">«ă» e vocala din „măr”. O auzi în aproape orice silabă neapăsată.</span></button>
      <button type="button" class="krow" data-say="w.think"><span class="k-s">«<mark>th</mark>ink» «<mark>dh</mark>is»</span><span class="k-d">Sunete care nu există în română: vârful limbii între dinți. Sufli pentru «th», pui voce pentru «dh».</span></button>
    </div>
    <p class="sub">Restul se citește ca în română.</p>
  </div>
  ${foot('Continuă')}`;

/* ---------- letter names */
VIEW.lettersnote = () => {
  const row = ls => ls.map(l => { const it = ITEMS['w.l-' + l]; return `<button type="button" class="lname" data-say="${it.id}"><b class="en">${it.en}</b><span>${respell(it.say, { force: true })}</span></button>`; }).join('');
  return `<div class="body">
      <h2 class="q">Literele se numesc altfel</h2>
      <p class="sub">Vocalele, mai ales, nu sună ca în română.</p>
      <div class="lnames">${row(['a', 'e', 'i', 'o', 'u'])}</div>
      <p class="kick">Atenție și la</p>
      <div class="lnames">${row(['g', 'j', 'r', 'w', 'y'])}</div>
      <p class="hand">W = „doi de U”</p>
    </div>
    ${foot('Continuă')}`;
};

/* ---------- mouth shapes: three, tree, free */
VIEW.mouth = s => `<div class="body">
    <h2 class="q">Trei guri, trei cuvinte</h2>
    <div class="swap center">${MOUTHS.map((m, k) => `<button type="button" class="pill en" data-m="${m.m}" aria-pressed="${k === 0}">${m.word}</button>`).join('')}</div>
    <div class="mouth-box">${MOUTH}</div>
    <p class="m-cap" data-cap></p>
    ${trapCard(s.trap)}
  </div>
  ${foot('Continuă')}`;
BIND.mouth = el => {
  const setM = (m, speak) => {
    const x = MOUTHS.find(y => y.m === m);
    $('.mouth', el).setAttribute('class', 'mouth m-' + m);
    $('[data-cap]', el).innerHTML = `<b class="en">${x.word}</b> · ${x.ro}. ${esc(x.cap)}`;
    $$('[data-m]', el).forEach(p => p.setAttribute('aria-pressed', String(p.dataset.m === m)));
    if (speak) say(x.word, { rate: 0.8 });
  };
  $$('[data-m]', el).forEach(p => p.addEventListener('click', () => setM(p.dataset.m, true)));
  setM('th', false);
};

/* ---------- -teen or -ty */
VIEW.teenty = s => {
  const pairs = [[13, 30], [14, 40], [15, 50], [16, 60], [17, 70], [18, 80], [19, 90]];
  const side = n => { const it = ITEMS['w.n-' + n]; const teen = n < 20; return `<button type="button" class="tt-side" data-say="${it.id}">
    <b>${n}</b><span class="en">${it.en}</span><span class="beats"><i class="${teen ? '' : 's'}"></i><i class="${teen ? 's' : ''}"></i></span><small>${respell(it.say, { force: true })}</small></button>`; };
  return `<div class="body">
      <h2 class="q">-teen sau -ty</h2>
      <p class="sub">Diferența e unde apeși. Atinge și ascultă.</p>
      <div class="swap">${pairs.map(([a, b], k) => `<button type="button" class="pill" data-k="${k}" aria-pressed="${k === 2}">${a} · ${b}</button>`).join('')}</div>
      <div class="teen-ty" data-tt>${side(15)}${side(50)}</div>
      ${trapCard(s.trap)}
    </div>
    ${foot('Continuă')}`;
};
BIND.teenty = el => {
  const pairs = [[13, 30], [14, 40], [15, 50], [16, 60], [17, 70], [18, 80], [19, 90]];
  $$('.swap .pill', el).forEach(p => p.addEventListener('click', () => {
    const [a, b] = pairs[+p.dataset.k];
    $$('.swap .pill', el).forEach(q => q.setAttribute('aria-pressed', String(q === p)));
    const sides = $$('.tt-side', el);
    [a, b].forEach((n, j) => {
      const it = ITEMS['w.n-' + n], teen = n < 20, sd = sides[j];
      sd.dataset.say = it.id;
      sd.innerHTML = `<b>${n}</b><span class="en">${it.en}</span><span class="beats"><i class="${teen ? '' : 's'}"></i><i class="${teen ? 's' : ''}"></i></span><small>${respell(it.say, { force: true })}</small>`;
    });
    say(`w.n-${a}`).then(() => say(`w.n-${b}`));
  }));
};

/* ---------- excuse me / sorry */
VIEW.compare = s => {
  if (R.kind !== 'demo' && !Store.d.traps.includes(s.trap)) { Store.d.traps.push(s.trap); Store.save(); }
  return `<div class="body">
    <h2 class="q">Excuse me înainte, sorry după</h2>
    <div class="compare">
      <button type="button" class="cmp" data-say="Excuse me, where is the hotel?"><span class="kick">Înainte</span><span class="en">Excuse me, where is the hotel?</span><small>Ca să atragi atenția cuiva.</small>${ICONS.speaker}</button>
      <button type="button" class="cmp" data-say="Oh, sorry!"><span class="kick">După</span><span class="en">Oh, sorry!</span><small>Când ai greșit ceva: ai călcat pe cineva, ai vărsat cafeaua.</small>${ICONS.speaker}</button>
    </div>
    <div class="trap slim"><p class="trap-k">${ICONS.trap}Capcană pentru români</p><p class="why">„Scuzați-mă” se spune la noi în ambele situații. În engleză sunt două cuvinte.</p></div>
  </div>
  ${foot('Continuă')}`;
};

/* ---------- this one / that one */
VIEW.thisthat = () => `<div class="body">
    <h2 class="q">Aici sau acolo</h2>
    <div class="tthat">
      <button type="button" class="ttc" data-say="p.this-one">${thisThat('this')}<span class="en">this one</span><small>acesta, de lângă tine</small></button>
      <button type="button" class="ttc" data-say="p.that-one">${thisThat('that')}<span class="en">that one</span><small>acela, mai departe</small></button>
    </div>
    <p class="sub">Nu știi cum se numește? Arăți și spui this one sau that one.</p>
  </div>
  ${foot('Continuă')}`;

/* ---------- exercises: see drills.js */
const X = {
  showTray: o => showTray(o),
  grade: (s, ok) => grade(s, ok),
  next: () => next(),
  onCleanup: fn => { const prev = R.cleanup; R.cleanup = () => { prev?.(); fn(); }; },
};
for (const [k, view] of Object.entries(DRILL_VIEW)) { VIEW[k] = view; BIND[k] = (el, s) => DRILL_BIND[k](el, s, X); }

/* ---------- talk: a short chat with the neighbour */
VIEW.talk = s => `<div class="body chat-body">
    <div class="chat" data-chat><p class="chat-k">${esc(place(LESSONS[s.from || R.lessonId].place).name)}</p></div>
    <div class="replies" data-replies></div>
  </div>
  <div class="foot" data-tfoot hidden><button type="button" class="btn act" data-next>Continuă</button></div>`;
BIND.talk = (el, s) => {
  const who = s.who || place(LESSONS[s.from || R.lessonId].place).who;
  const chat = $('[data-chat]', el), replies = $('[data-replies]', el), footEl = $('[data-tfoot]', el);
  const removed = new Set();
  let stage = 0, first = true, busy = false, alive = true;
  R.cleanup = () => { alive = false; };
  const scroll = () => { chat.scrollTop = chat.scrollHeight; };
  const wait = ms => new Promise(res => setTimeout(res, reduceMotion() ? Math.min(ms, 200) : ms));
  // A reply comes after a short pause and a "typing" bubble, and only once the line before it has finished playing.
  const them = async (text, ro, delay) => {
    await wait(Math.min(delay, 400));
    if (!alive) return;
    chat.insertAdjacentHTML('beforeend', `<div class="msg-row typing"><span class="ava" style="--c:var(${avatarBg(who)})">${avatar(who)}</span><span class="msg them dots" aria-label="scrie"><i></i><i></i><i></i></span></div>`);
    scroll();
    await wait(Math.min(1500, 450 + text.length * 20));
    $('.typing', chat)?.remove();
    if (!alive) return;
    const row = document.createElement('div');
    row.className = 'msg-row';
    row.innerHTML = `<span class="ava" style="--c:var(${avatarBg(who)})">${avatar(who)}</span><button type="button" class="msg them en">${t(text)}<small hidden>${t(ro)}</small></button>`;
    chat.appendChild(row);
    const b = $('.msg', row);
    b.addEventListener('click', () => { $('small', b).hidden = false; say(text, { el: b }); scroll(); });
    scroll();
    await say(text, { auto: true });
  };
  const me = text => { chat.insertAdjacentHTML('beforeend', `<div class="msg-row me"><div class="msg me en">${t(text)}</div></div>`); scroll(); };
  const coach = text => { chat.insertAdjacentHTML('beforeend', `<p class="coach">${esc(sub(text))}</p>`); scroll(); };
  const drawReplies = () => {
    const st = s.script[stage];
    replies.innerHTML = `<p class="reply-k">Tu spui</p>` + st.replies.map((r, k) => removed.has(`${stage}:${k}`) ? '' : `<button type="button" class="reply en" data-k="${k}">${t(r.en)}</button>`).join('');
    $$('.reply', replies).forEach(b => b.addEventListener('click', () => choose(+b.dataset.k)));
  };
  const open = async (n, delay) => {
    stage = n;
    const st = s.script[n];
    await them(st.them, st.ro, delay);
    if (!alive) return;
    if (first) { first = false; coach(`Atinge ce spune ${{ tom: 'Tom', priya: 'Priya', hughes: 'Mrs Hughes' }[who]} ca să vezi traducerea.`); }
    if (st.coach) coach(st.coach);
    if (st.end) { replies.hidden = true; footEl.hidden = false; tone('ok'); if (usingKeys) $('.act', footEl).focus({ preventScroll: true }); return; }
    drawReplies();
  };
  const choose = async k => {
    if (busy) return;
    busy = true;
    const r = s.script[stage].replies[k];
    replies.innerHTML = '';
    me(r.en);
    await say(r.en); // your line plays to the end before anyone answers
    if (!alive) return;
    if (!r.ok || r.stay) {
      removed.add(`${stage}:${k}`);
      await them(r.after, r.aro, 1000);
      if (!alive) return;
      if (r.coach) coach(r.coach);
      drawReplies();
      busy = false;
      return;
    }
    tone('ok');
    if (r.after) await them(r.after, r.aro, 950);
    busy = false;
    open(r.next, r.after ? 1200 : 1000);
  };
  open(0, 350);
};

/* ---------- done: a window lights up on the street */
function litMap() {
  const lit = {};
  for (const [id, r] of Object.entries(Store.d.lessons)) {
    const L = LESSONS[id];
    if (r.done && L) (lit[L.place] ||= []).push(L.index);
  }
  return lit;
}
VIEW.done = () => {
  const L = LESSONS[R.lessonId];
  const wasDone = lessonDone(L.id);
  finishLesson(L.id, L.items);
  const lit = litMap();
  if (!wasDone) lit[L.place] = lit[L.place].filter(i => i !== L.index); // it flickers on in a moment
  const [x] = BUILDINGS[L.place];
  const tomorrow = addDays(today(), 1);
  const back = L.items.filter(id => Store.d.items[id]?.due === tomorrow).length;
  const chips = L.items.filter(id => ITEMS[id].kind !== 'letter' && ITEMS[id].en.length <= 20).slice(0, 7);
  return `<div class="done-scene">${laneSVG(lit, { vb: `${x - 170} 30 340 370`, par: 'xMidYMax slice' })}</div>
    <div class="body center">
      <h2 class="done-h">Lecție terminată.</h2>
      <p class="sub">${esc(L.done)}</p>
      ${chips.length ? `<div class="chips">${chips.map(id => `<button type="button" class="chip en" data-say="${id}">${t(ITEMS[id].en)}</button>`).join('')}</div>` : ''}
      <div class="next-card">${ICONS.tea}<span>${back ? `Mâine revin <b>${back} ${back === 1 ? 'cuvânt' : 'cuvinte'}</b> la recapitulare.` : 'Le reîntâlnești la recapitulare.'}</span></div>
    </div>
    ${foot('Înapoi pe stradă', 'data-finish')}`;
};
BIND.done = el => {
  const L = LESSONS[R.lessonId];
  setTimeout(() => {
    const w = $(`.win[data-u="${L.place}"][data-i="${L.index}"]`, el);
    w?.classList.add('flick', 'on');
    tone('done');
  }, 500);
  $('[data-finish]', el).addEventListener('click', () => R.onExit());
};

/* ---------- review done */
VIEW.rdone = () => {
  markDay(1);
  Store.save();
  const missed = [...new Set(R.missed)].filter(id => ITEMS[id]);
  return `<div class="done-art">${ICONS.tea}</div>
    <div class="body center">
      <h2 class="done-h">Recapitulare terminată.</h2>
      <p class="sub">${R.right} din ${R.total} corecte.</p>
      ${missed.length ? `<p class="kick">Revin mâine</p><div class="chips">${missed.slice(0, 10).map(id => `<button type="button" class="chip en" data-say="${id}">${t(ITEMS[id].en)}</button>`).join('')}</div>` : ''}
    </div>
    ${foot('Înapoi', 'data-finish')}`;
};
BIND.rdone = el => {
  tone('done');
  $('[data-finish]', el).addEventListener('click', () => R.onExit());
};

/* ---------- the end of a try-out from the exercise list: nothing was saved */
VIEW.ddone = () => `<div class="done-art">${ICONS.check}</div>
  <div class="body center">
    <h2 class="done-h">Gata.</h2>
    <p class="sub">${R.total ? `${R.right} din ${R.total} corecte. ` : ''}Încercările de aici nu schimbă progresul.</p>
  </div>
  ${foot('Înapoi la exerciții', 'data-finish')}`;
BIND.ddone = el => { $('[data-finish]', el).addEventListener('click', () => R.onExit()); };
