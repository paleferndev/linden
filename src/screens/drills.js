import { ITEMS } from '../content/items.js';
import { ICONS } from '../art/icons.js';
import { objIcon, thisThat } from '../art/scenes.js';
import { $, $$, esc, reflow, shuffle, sub, respell, learnerName } from '../app/ui.js';
import { say, tone } from '../app/sound.js';
import { voiceCount } from '../speech.js';
import { check, checkNumber, spokenMatch, markMissed, words } from '../app/grade.js';
import { canRecognize, recognize, stopRecognizing } from '../app/mic.js';
import { Store } from '../app/store.js';

// The exercises. Each one asks for effort: close options instead of obvious ones, typing and speaking once a word is
// familiar, sounds that Romanian speakers actually confuse. `x` is the runner's toolkit: showTray, grade, next.
//
//   minimal      sound pairs: several quick rounds of "which one did you hear?" (three/tree, 15/50), in more than one voice
//   listen       listen and understand: a natural line, a question in Romanian, options that differ in one detail
//   dictation    type what you hear (numbers and prices get a number keyboard)
//   listenbuild  build what you hear from tiles, with look-alike extra tiles
//   translate    Romanian to English, from tiles or typed
//   cloze        the missing word in a sentence (is/are, a/some, do, this/that…)
//   pick         choose what to say, or which sentence is right (the wrong ones are real Romanian-speaker mistakes)
//   speak        say it aloud: speech recognition when the phone has it, otherwise say it and check yourself

export const DRILL_VIEW = {};
export const DRILL_BIND = {};

const t = s => esc(sub(s));
const en = s => `<span class="en">${t(s)}</span>`;
const foot = (label, attrs = 'data-next') => `<div class="foot"><button type="button" class="btn act" ${attrs}>${label}</button></div>`;
const pickPic = ref => ref.startsWith('tt:') ? thisThat(ref.slice(3)) : objIcon(ref);
const WAVE = `<div class="wave" data-wave>${[30, 55, 40, 70, 35, 60, 45, 80, 50, 30, 65, 40, 75, 55, 35, 60, 45, 70, 30, 50, 40, 25].map(h => `<i style="height:${h}%"></i>`).join('')}</div>`;
const player = (small = false) => `<div class="listen-row${small ? ' small' : ''}"><button type="button" class="play-big" data-replay aria-label="Ascultă din nou">${ICONS.speaker}</button>${WAVE}</div>`;
const textOf = a => ITEMS[a] ? sub(ITEMS[a].en) : sub(a);

function playWith(el, audio, opts = {}) {
  const wave = $('[data-wave]', el), btn = $('[data-replay]', el);
  const play = (o = {}) => { wave?.classList.add('on'); return say(audio, { el: btn, ...opts, ...o }).then(() => wave?.classList.remove('on')); };
  btn?.addEventListener('click', () => play());
  return () => play({ auto: true }); // the first play is automatic
}

/* ======================================================================== sound pairs */

DRILL_VIEW.minimal = s => `<div class="body">
    <p class="kick">Perechi de sunete</p>
    <div class="head-row"><h2 class="q">${esc(s.q || 'Ce ai auzit?')}</h2><span class="counter" data-count>1 / ${s.rounds || 4}</span></div>
    ${s.note ? `<p class="sub">${esc(s.note)}</p>` : ''}
    <div class="mid">${player()}<p class="rounds" data-dots>${Array.from({ length: s.rounds || 4 }, () => '<i></i>').join('')}</p></div>
    <div class="opts ${s.show === 'word' || !s.show ? 'pair' : 'grid'}" data-opts></div>
  </div>
  ${foot('Continuă', 'data-next disabled')}`;

DRILL_BIND.minimal = (el, s, x) => {
  const n = s.rounds || 4;
  // every sound in the pairs gets a turn as the answer, then the order is shuffled
  const plan = [];
  const pairs = shuffle(s.pairs);
  for (let k = 0; k < n; k++) { const p = pairs[k % pairs.length]; plan.push({ pair: p, target: p[(k + Math.floor(k / pairs.length)) % p.length] }); }
  const rounds = shuffle(plan);
  let k = 0, right = 0, locked = false;
  const opts = $('[data-opts]', el), dots = $$('[data-dots] i', el);
  const wave = $('[data-wave]', el), btn = $('[data-replay]', el);
  let audio = '';
  const play = (auto = false) => { wave.classList.add('on'); say(audio, { el: btn, variant: k % voiceCount(), auto }).then(() => wave.classList.remove('on')); };
  btn.addEventListener('click', () => play());
  const label = w => s.show === 'digit' ? `<span class="digit">${esc(w)}</span>` : s.show === 'letter' ? `<span class="en big">${esc(w)}</span>`
    : `<span class="en">${esc(w)}</span>${s.gloss?.[w] ? `<small>${esc(s.gloss[w])}</small>` : ''}`;
  const round = () => {
    const r = rounds[k];
    $('[data-count]', el).textContent = `${k + 1} / ${n}`;
    opts.innerHTML = r.pair.map((w, j) => `<button type="button" class="opt" data-opt="${j}">${label(w)}</button>`).join('');
    audio = s.audio?.[r.target] || r.target;
    locked = false;
    $$('.opt', opts).forEach(b => b.addEventListener('click', () => answer(b, r)));
    play(true);
  };
  const answer = (b, r) => {
    if (locked) return;
    locked = true;
    const chosen = r.pair[+b.dataset.opt], ok = chosen === r.target;
    $$('.opt', opts).forEach(o => { o.disabled = true; });
    $$('.opt', opts)[r.pair.indexOf(r.target)].classList.add('right');
    if (ok) { right++; tone('ok'); } else b.classList.add('wrong');
    dots[k].className = ok ? 'ok' : 'no';
    setTimeout(() => {
      if (++k < n) return round();
      const passed = right >= n - 1;
      x.grade(s, passed);
      $('.foot .act', el).disabled = false;
      x.showTray({ ok: passed, title: `${right} din ${n}.`, html: passed ? '' : esc(s.why || 'Ascultă-le încă o dată. Revin puțin mai încolo.') });
    }, ok ? 650 : 1300);
  };
  round();
};

/* ======================================================================== listen and understand */

function optionsHTML(s) {
  const lang = s.lang || 'en';
  const grid = ['digit', 'letter', 'price'].includes(lang);
  const pics = typeof s.options[0] === 'object';
  const inner = o => {
    if (pics) return `<span class="pics">${o.pics.map(pickPic).join('')}</span><span class="cap en">${t(o.cap)}</span>`;
    if (lang === 'ro') return `<span class="ro">${t(o)}</span>`;
    if (lang === 'digit') return `<span class="digit">${esc(o)}</span>`;
    if (lang === 'price') return `<span class="price en">${esc(o)}</span>`;
    if (lang === 'letter') return `<span class="en big">${esc(o)}</span>`;
    return `<span class="en">${t(o)}</span>`;
  };
  return `<div class="opts ${grid ? 'grid' : ''} ${pics ? 'pics-list' : ''}">${s.options.map((o, k) => `<button type="button" class="opt" data-opt="${k}">${inner(o)}</button>`).join('')}</div>`;
}

function bindOptions(el, s, x, { onAnswer, okHTML = '' } = {}) {
  let done = false;
  const opts = $$('.opt', el);
  const rightText = () => {
    const o = s.options[s.answer];
    if (typeof o === 'object') return en(o.cap);
    if (s.lang === 'ro') return t(o);
    if (['digit', 'price', 'letter'].includes(s.lang)) return `<b>${esc(o)}</b>`;
    return en(o);
  };
  opts.forEach(b => b.addEventListener('click', () => {
    if (done) return;
    done = true;
    const k = +b.dataset.opt, ok = k === s.answer;
    $('.opts', el).classList.add('answered');
    opts.forEach(o => { o.disabled = true; });
    opts[s.answer].classList.add('right');
    opts[s.answer].insertAdjacentHTML('beforeend', `<span class="tick">${ICONS.check}</span>`);
    if (!ok) b.classList.add('wrong');
    onAnswer?.(ok, k);
    $('.foot .act', el).disabled = false;
    x.grade(s, ok);
    const why = Array.isArray(s.why) ? s.why[k] : s.why;
    if (ok) { tone('ok'); x.showTray({ ok: true, title: 'Corect.', html: okHTML || (s.why && !Array.isArray(s.why) ? esc(s.why) : '') }); }
    else x.showTray({ ok: false, title: 'Nu chiar.', html: `${why ? esc(why) + ' ' : ''}Corect: ${rightText()}.` });
  }));
}

DRILL_VIEW.listen = s => {
  const text = s.transcript || textOf(s.audio);
  const showTranscript = !!s.transcript || (!ITEMS[s.audio] && text.split(' ').length > 1);
  return `<div class="body">
      <p class="kick">Ascultă și înțelege</p>
      <h2 class="q">${esc(s.q || 'Ce ai auzit?')}</h2>
      <div class="mid">${player()}
        ${showTranscript ? `<div class="transcript" data-trans>${text.split(' ').map(w => `<i style="width:${Math.max(3, w.length) * 7}px"></i>`).join('')}</div>` : ''}
      </div>
      ${optionsHTML(s)}
    </div>
    ${foot('Continuă', 'data-next disabled')}`;
};
DRILL_BIND.listen = (el, s, x) => {
  playWith(el, s.audio)();
  const text = s.transcript || textOf(s.audio);
  bindOptions(el, s, x, { onAnswer: () => {
    const tr = $('[data-trans]', el);
    if (tr) tr.innerHTML = text.split(' ').map((w, j) => `<b style="animation-delay:${j * 40}ms">${esc(w)}</b>`).join(' ');
  } });
};

/* ======================================================================== choose */

DRILL_VIEW.pick = s => {
  const sh = s.show || {};
  const prompt = sh.en ? `<button type="button" class="prompt-en en" data-replay data-say="${esc(sh.en)}">${t(sh.en)}${ICONS.speaker}</button>`
    : sh.digit ? `<p class="prompt-digit">${esc(sh.digit)}</p>`
    : sh.ro ? `<p class="prompt-ro">${t(sh.ro)}</p>` : '';
  // With nothing to show, the question itself is the prompt.
  return `<div class="body">
      <p class="kick">${esc(s.kick || 'Alege')}</p>
      ${prompt || sh.pic ? `<h2 class="q">${esc(s.q || 'Alege varianta potrivită.')}</h2>` : ''}
      <div class="mid">${sh.pic ? `<div class="slot-pic big">${pickPic(sh.pic)}</div>` : ''}${prompt || (sh.pic ? '' : `<p class="prompt-q">${esc(s.q || 'Alege varianta potrivită.')}</p>`)}</div>
      ${optionsHTML(s)}
    </div>
    ${foot('Continuă', 'data-next disabled')}`;
};
DRILL_BIND.pick = (el, s, x) => {
  if (s.show?.en) say(s.show.en, { auto: true });
  bindOptions(el, s, x, { onAnswer: ok => { if (ok && (s.lang || 'en') === 'en') say(s.options[s.answer]); } });
};

/* ======================================================================== the missing word */

DRILL_VIEW.cloze = s => {
  const [a, b] = s.text.split('{}');
  return `<div class="body">
      <p class="kick">Completează</p>
      <h2 class="q">${esc(s.q || 'Ce cuvânt lipsește?')}</h2>
      <div class="mid">
        ${s.pic ? `<div class="slot-pic">${pickPic(s.pic)}</div>` : ''}
        <p class="cloze en">${t(a)}<span class="gap" data-gap>&nbsp;</span>${t(b)}</p>
        ${s.ro ? `<p class="ro-line center">${t(s.ro)}</p>` : ''}
      </div>
      <div class="opts grid words" style="--cols:${s.options.length === 3 ? 3 : 2}">${s.options.map((o, k) => `<button type="button" class="opt" data-opt="${k}"><span class="en">${t(o)}</span></button>`).join('')}</div>
    </div>
    ${foot('Continuă', 'data-next disabled')}`;
};
DRILL_BIND.cloze = (el, s, x) => {
  const [a, b] = s.text.split('{}');
  bindOptions(el, s, x, { onAnswer: (ok, k) => {
    const gap = $('[data-gap]', el);
    gap.textContent = sub(s.options[k]);
    gap.classList.add(ok ? 'right' : 'wrong');
    if (!ok) gap.insertAdjacentHTML('afterend', `<span class="gap right fix">${t(s.options[s.answer])}</span>`);
    if (ok) say(`${a}${s.options[s.answer]}${b}`);
  } });
};

/* ======================================================================== typing: dictation and typed translation */

function typedField(s) {
  if (s.digits) s = { ...s, number: true };
  const kind = s.number ? (String(s.answer).includes('.') ? 'decimal' : 'numeric') : 'text';
  return `<div class="type-box"><input class="type-in ${s.number ? 'num' : 'en'}" data-in type="text" inputmode="${kind}" autocomplete="off" autocorrect="off" autocapitalize="${s.number ? 'off' : 'sentences'}" spellcheck="false" enterkeyhint="done" placeholder="${s.number ? (s.price ? '0.00' : '0') : 'Scrie aici'}" aria-label="Răspunsul tău">${s.price ? '<span class="type-pre">£</span>' : ''}</div>`;
}

function bindTyped(el, s, x, { accepted, spoken }) {
  const input = $('[data-in]', el), btn = $('[data-check]', el);
  input.addEventListener('input', () => { btn.disabled = !input.value.trim(); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && input.value.trim()) { e.preventDefault(); btn.click(); } });
  btn.addEventListener('click', () => {
    const given = input.value;
    const r = s.digits ? { ok: given.replace(/\D/g, '') === String(s.answer), answer: s.answer }
      : s.number ? checkNumber(given, s.answer) : check(given, accepted);
    input.disabled = true; btn.disabled = true;
    input.blur();
    x.grade(s, r.ok);
    input.classList.add(r.ok ? 'right' : 'wrong');
    if (spoken) say(spoken);
    const shown = s.number || s.digits ? `<b>${s.price ? '£' : ''}${esc(s.answer)}</b>` : en(r.answer);
    if (r.ok && r.exact !== false) { tone('ok'); x.showTray({ ok: true, title: 'Corect.', html: shown }); }
    else if (r.ok) { tone('ok'); x.showTray({ ok: true, title: 'Corect, cu o greșeală de scriere.', html: `${r.typos.map(([g, w]) => `${esc(g)} → <b>${esc(w)}</b>`).join(', ')}` }); }
    else x.showTray({ ok: false, title: 'Nu chiar.', html: `Corect: ${s.number || s.digits ? shown : `<span class="en">${markMissed(given, sub(r.answer), esc)}</span>`}${s.why ? ' ' + esc(s.why) : ''}` });
  });
  setTimeout(() => input.focus({ preventScroll: true }), 350);
}

DRILL_VIEW.dictation = s => `<div class="body">
    <p class="kick">Dictare</p>
    <h2 class="q">${esc(s.q || 'Scrie ce auzi.')}</h2>
    <div class="mid">${player()}${typedField(s)}</div>
  </div>
  ${foot('Verifică', 'data-check disabled')}`;
DRILL_BIND.dictation = (el, s, x) => {
  playWith(el, s.audio)();
  bindTyped(el, s, x, { accepted: [s.answer, ...(s.alts || [])] });
};

/* ======================================================================== tiles: build what you hear, translate */

function tilesView(s, { kick, q, prompt, answer }) {
  const tiles = shuffle([...sub(answer).replace(/[.,!?]/g, '').split(' '), ...(s.extra || [])]);
  return `<div class="body">
      <p class="kick">${kick}</p>
      <h2 class="q">${q}</h2>
      <div class="mid">${prompt}<div class="answer-line" data-line aria-label="Răspunsul tău"></div></div>
      <div class="bank" data-bank>${tiles.map((w, k) => `<button type="button" class="tile en" data-k="${k}" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div>
    </div>
    ${foot('Verifică', 'data-check disabled')}`;
}
function bindTiles(el, s, x, { answer, accepted }) {
  const line = $('[data-line]', el), bank = $('[data-bank]', el), btn = $('[data-check]', el);
  let order = [];
  const w = k => $(`.bank [data-k="${k}"]`, el).dataset.w;
  const draw = () => {
    line.innerHTML = order.map(k => `<button type="button" class="tile en in" data-k="${k}">${esc(w(k))}</button>`).join('');
    $$('.tile', bank).forEach(b => b.classList.toggle('used', order.includes(+b.dataset.k)));
    btn.disabled = !order.length;
  };
  bank.addEventListener('click', e => { const b = e.target.closest('.tile'); if (!b || b.classList.contains('used')) return; order.push(+b.dataset.k); draw(); });
  line.addEventListener('click', e => { const b = e.target.closest('.tile'); if (!b) return; order = order.filter(k => k !== +b.dataset.k); draw(); });
  btn.addEventListener('click', () => {
    const given = order.map(w).join(' ');
    const r = check(given, accepted);
    const ok = r.ok && r.exact;
    $$('.tile', el).forEach(b => { b.disabled = true; });
    btn.disabled = true;
    x.grade(s, ok);
    say(answer);
    line.classList.add(ok ? 'right' : 'wrong');
    if (ok) { tone('ok'); x.showTray({ ok: true, title: 'Corect.', html: en(answer) }); }
    else x.showTray({ ok: false, title: 'Nu chiar.', html: `Corect: <span class="en">${markMissed(given, sub(answer), esc)}</span>${s.why ? ' ' + esc(s.why) : ''}` });
  });
}

DRILL_VIEW.listenbuild = s => tilesView(s, { kick: 'Ascultă și construiește', q: 'Pune piesele în ordinea în care le auzi.', prompt: player(true), answer: s.audio });
DRILL_BIND.listenbuild = (el, s, x) => {
  playWith(el, s.audio)();
  bindTiles(el, s, x, { answer: s.audio, accepted: [s.audio] });
};

DRILL_VIEW.translate = s => s.mode === 'type'
  ? `<div class="body">
      <p class="kick">Tradu</p>
      <h2 class="q">Scrie în engleză:</h2>
      <div class="mid"><p class="prompt-ro">${t(s.ro)}</p>${typedField(s)}</div>
    </div>
    ${foot('Verifică', 'data-check disabled')}`
  : tilesView(s, { kick: 'Tradu', q: 'Spune în engleză:', prompt: `<p class="prompt-ro">${t(s.ro)}</p>`, answer: s.answer });
DRILL_BIND.translate = (el, s, x) => {
  const accepted = [s.answer, ...(s.alts || [])];
  if (s.mode === 'type') bindTyped(el, s, x, { accepted, spoken: s.answer });
  else bindTiles(el, s, x, { answer: s.answer, accepted });
};

/* ======================================================================== say it aloud */

// Spelling your own name: "A – L – E – X", spoken through the letters' names.
function spelledName() {
  const letters = learnerName().normalize('NFD').replace(/[^A-Za-z]/g, '').toLowerCase().split('');
  return { show: letters.map(l => l.toUpperCase()).join(' – '), audio: letters.map(l => ITEMS['w.l-' + l]?.tts || l).join('. ') + '.' };
}
// Repeating after the model and spelling are always checked by yourself: recognition can't judge single letters or
// tell three from tree. It's used for whole sentences said from a Romanian cue.
const speakParts = s => s.spellName ? { ...spelledName(), ro: 'Spune-ți numele pe litere.', self: true } : { show: s.show || s.answer, audio: s.audio || s.answer, ro: s.ro, self: s.self || s.repeat };

DRILL_VIEW.speak = s => {
  const p = speakParts(s);
  return `<div class="body">
    <p class="kick">Spune cu voce tare</p>
    <h2 class="q">${s.repeat ? 'Ascultă, apoi repetă.' : p.self && !s.ro ? 'Spune cu voce tare:' : 'Spune în engleză:'}</h2>
    <div class="mid">
      ${s.repeat ? `<button type="button" class="prompt-en en" data-replay data-say="${esc(p.audio)}">${t(p.show)}${ICONS.speaker}</button>${respell(ITEMS[s.id]?.say) ? `<p class="say center">${respell(ITEMS[s.id].say)}</p>` : ''}`
        : `<p class="prompt-ro">${t(p.ro)}</p>`}
      <div class="speak-zone" data-zone></div>
    </div>
  </div>
  <div class="foot" data-sfoot></div>`;
};

DRILL_BIND.speak = (el, s, x) => {
  const zone = $('[data-zone]', el), sfoot = $('[data-sfoot]', el);
  const p = speakParts(s);
  const accepted = [s.answer, ...(s.alts || [])];
  let tries = 0;
  if (s.repeat) say(p.audio, { auto: true });
  x.onCleanup(stopRecognizing);

  const selfCheck = () => {
    stopRecognizing();
    if (s.repeat) { // repeating after the model: nothing to check, just say it
      zone.innerHTML = `<p class="speak-hint">Repetă cu voce tare de două-trei ori. Atinge textul ca s-o mai auzi.</p>`;
      sfoot.innerHTML = `<button type="button" class="btn act" data-said>Am repetat</button>`;
      $('[data-said]', el).addEventListener('click', () => { x.grade(s, true); x.next(); });
      return;
    }
    zone.innerHTML = `<p class="speak-hint">Spune-o cu voce tare, apoi verifică.</p>`;
    sfoot.innerHTML = `<button type="button" class="btn act" data-reveal>Arată răspunsul</button>`;
    $('[data-reveal]', el).addEventListener('click', () => {
      zone.innerHTML = `<button type="button" class="model en" data-say="${esc(s.answer)}">${t(s.answer)}${ICONS.speaker}</button><p class="speak-hint">Ai spus la fel?</p>`;
      say(s.answer);
      sfoot.innerHTML = `<div class="two"><button type="button" class="btn ghost" data-self="0">Nu încă</button><button type="button" class="btn act" data-self="1">Da</button></div>`;
      $$('[data-self]', el).forEach(b => b.addEventListener('click', () => {
        const ok = b.dataset.self === '1';
        x.grade(s, ok);
        if (ok) tone('ok');
        x.next();
      }));
    });
  };

  const micMode = () => {
    zone.innerHTML = `<button type="button" class="mic" data-mic aria-label="Vorbește">${MIC}</button><p class="speak-hint" data-status>Atinge microfonul și vorbește.</p>`;
    sfoot.innerHTML = `<button type="button" class="btn ghost act" data-nomic>Nu pot vorbi acum</button>`;
    $('[data-nomic]', el).addEventListener('click', selfCheck);
    const mic = $('[data-mic]', el), status = $('[data-status]', el);
    mic.addEventListener('click', async () => {
      if (mic.classList.contains('on')) { stopRecognizing(); return; }
      mic.classList.add('on');
      status.textContent = 'Te ascult…';
      try {
        const heard = await recognize(Store.d.profile.voice);
        mic.classList.remove('on');
        const best = heard.map(h => ({ h, m: Math.max(...accepted.map(a => spokenMatch(h, sub(a)))) })).sort((a, b) => b.m - a.m)[0];
        tries++;
        if (best.m >= 0.8) {
          x.grade(s, true); tone('ok');
          x.showTray({ ok: true, title: 'Corect.', html: `Am auzit: <span class="en">„${esc(best.h)}”</span>` });
          say(s.answer);
        } else if (tries < 2) {
          status.innerHTML = `Am auzit: <span class="en">„${esc(best.h)}”</span>. Mai încearcă o dată.`;
        } else {
          x.grade(s, false);
          x.showTray({ ok: false, title: 'Nu chiar.', html: `Am auzit: <span class="en">„${esc(best.h)}”</span>. Corect: <span class="en">${markMissed(best.h, sub(s.answer), esc)}</span>` });
          say(s.answer);
        }
      } catch (e) {
        mic.classList.remove('on');
        if (e.message === 'denied' || e.message === 'failed') selfCheck();
        else status.textContent = 'Nu am auzit nimic. Mai încearcă.';
      }
    });
  };

  if (canRecognize && !p.self) micMode(); else selfCheck();
};
const MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/></svg>';

export { optionsHTML, bindOptions, words };
