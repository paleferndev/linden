import { CAST, nameOf } from '../content/cast.js';
import { GAMES } from '../content/games.js';
import { ICONS } from '../art/icons.js';
import { face, artBox } from '../art/art.js';
import { sparkSVG } from '../art/stranger.js';
import { $, $$, esc, sub, bold, shuffle, wait, FAST, reduceMotion, hook, fillGap } from '../app/ui.js';
import { say, tone, buzz, hush, autoVoice } from '../app/sound.js';
import { check, words } from '../app/grade.js';

// The chat: an episode (or a training session) played as a conversation. Other people's lines arrive one at a time
// with "typing…" and their voice; your replies are the exercises, in the box at the bottom. A wrong reply is sent
// anyway, the other person reacts in character, a one-line note says why, and you pick again.
// Nothing moves on until your reply is right. Tap any message to hear it again and see it in Romanian.

const PLAY = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>`;
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordsOf = s => s.replace(/[.,!?;:“”"]/g, ' ').split(/\s+/).filter(Boolean);
const stripHint = s => s.replace(/\s*\([^)]*\)\s*$/, '');
const readTime = s => Math.min(2600, 500 + s.length * 30);

/**
 * Plays `script` into `host`. Resolves with { right, total } when it ends, or null when stopped.
 * o: { ep, frame, start, right, total, points (default grammar), record(g, ok), onGame(x), onSignal(x), onSave(at, right, total) }
 */
export function runChat(host, script, o) {
  host.innerHTML = `<div class="chat"><div class="log" data-log role="log" aria-live="polite"></div><div class="comp" data-comp data-active></div></div>`;
  const log = $('[data-log]', host), comp = $('[data-comp]', host);
  const names = {};
  const C = { alive: true, right: o.right || 0, total: o.total || 0, last: 'stranger', prevWho: '' };
  let hurry = null;

  const name = who => names[who] || nameOf(who, o.ep);
  const scroll = () => requestAnimationFrame(() => { log.scrollTop = log.scrollHeight; });
  // A pause the learner can cut short by tapping the conversation.
  const pause = ms => new Promise(r => { const t = setTimeout(done, FAST ? Math.min(ms, 20) : ms); function done() { clearTimeout(t); hurry = null; r(); } hurry = done; });
  log.addEventListener('click', e => { if (!e.target.closest('button, .gw') && hurry) { hush(); hurry(); } });
  const add = html => { log.insertAdjacentHTML('beforeend', html); scroll(); return log.lastElementChild; };
  const ava = who => `<span class="ava" style="--c:var(${CAST[who]?.bg || '--sunk'})">${face(who)}</span>`;
  const graded = (x, ok) => { C.total++; if (ok) C.right++; o.record?.(gOf(x), ok, x); };
  const gOf = x => x.g !== undefined ? x.g : o.points?.[0];

  /* ---------------------------------------------------------------- things that happen */
  function markText(en, mark = []) {
    let h = esc(sub(en));
    for (const w of mark) h = h.replace(new RegExp(`(^|[^\\p{L}’'])(${reEsc(esc(w))})(?=$|[^\\p{L}’'])`, 'u'), '$1<mark>$2</mark>');
    return h;
  }
  function bubble(x, { instant = false } = {}) {
    const group = C.prevWho === x.who;
    C.prevWho = x.who;
    const row = add(`<div class="row them${group ? ' group' : ''}${instant ? ' still' : ''}">${group ? '<span class="ava-sp"></span>' : ava(x.who)}
      <button type="button" class="m" data-who="${x.who}">${group ? '' : `<span class="who-l">${esc(name(x.who))}</span>`}<span class="en" data-en>${x.glitch ? glitchHTML(x) : markText(x.en, x.mark)}</span><small class="ro" hidden>${esc(sub(x.ro))}</small></button></div>`);
    const b = $('.m', row);
    b.addEventListener('click', e => {
      if (e.target.closest('.gw')) return;
      const ro = $('.ro', b); ro.hidden = !ro.hidden; scroll();
      say(x.en, { who: x.who, el: b });
    });
    return b;
  }
  function glitchHTML(x) {
    const en = sub(x.en), at = en.indexOf(x.glitch);
    const words = s => s.split(' ').filter(Boolean).map(w => `<span class="gw">${esc(w)}</span>`).join(' ');
    return `${words(en.slice(0, at))} <span class="gw" data-g>${esc(x.glitch)}</span> ${words(en.slice(at + x.glitch.length))}`.trim();
  }
  function mine(text, bad = false) {
    C.prevWho = '';
    return add(`<div class="row me"><div class="m${bad ? ' bad' : ''}"><span class="en">${esc(sub(text))}</span></div></div>`);
  }
  const why = (text, kind = 'why', html = false) => text && add(`<div class="why ${kind}"><span class="k">${ICONS.hint}</span><p>${html ? text : esc(sub(text))}</p></div>`);
  /** The answer with only the words you got shown, the rest hidden: "I called ▒▒▒▒▒. She wants…" */
  const partial = (given, answer) => { const got = new Set(words(given)); return answer.split(' ').map(t => words(t).every(w => got.has(w)) ? esc(t) : `<span class="hid">${'▒'.repeat(Math.max(2, t.replace(/[.,!?]/g, '').length))}</span>`).join(' '); };
  const sysLine = t => add(`<p class="sys">${esc(sub(t))}</p>`);

  async function them(x, { instant = false } = {}) {
    if (!instant && x.who !== 'mimi') {
      o.frame?.status(`${name(x.who)} scrie…`, true);
      const row = add(`<div class="row them typing">${ava(x.who)}<span class="m dots" aria-label="scrie"><i></i><i></i><i></i></span></div>`);
      await wait(reduceMotion() ? 150 : Math.min(1300, 380 + x.en.length * 14));
      row.remove();
      o.frame?.status();
      if (!C.alive) return;
    }
    if (x.who !== 'mimi') C.last = x.who;
    const b = bubble(x, { instant });
    if (instant) return;
    tone('tick');
    const spoken = await say(x.en, { who: x.who, el: b, auto: true });
    if (!C.alive) return;
    await pause(spoken ? 250 : readTime(x.en));
  }

  function story(x) {
    C.prevWho = '';
    return add(`<figure class="story">${x.art ? artBox(x.art) : ''}<figcaption>${esc(sub(x.ro))}</figcaption></figure>`);
  }
  function note(x) {
    C.prevWho = '';
    return add(`<div class="note"><p class="nh">${ICONS.hint}<span>Notă · ${esc(x.title)}</span></p><p>${esc(x.ro)}</p>${x.ex.length ? `<p class="ex en">${x.ex.map(bold).join('<br>')}</p>` : ''}</div>`);
  }
  function voiceNote(x, { instant = false } = {}) {
    C.prevWho = '';
    const row = add(`<div class="row them">${ava(x.who)}<div class="m voice-m"><span class="who-l">${esc(name(x.who))} · mesaj vocal</span>
      <span class="voice"><button type="button" class="vp" aria-label="Ascultă">${PLAY}</button><span class="vw">${Array.from({ length: 24 }, (_, k) => `<i style="height:${28 + Math.abs(Math.sin(k * 1.7 + x.en.length)) * 72}%"></i>`).join('')}</span><span class="vt">0:0${Math.min(9, Math.round(x.en.length / 12) + 1)}</span></span>
      <span class="transcript" ${instant ? '' : 'hidden'}><span class="en">${esc(sub(x.en))}</span><small class="ro">${esc(sub(x.ro))}</small></span></div></div>`);
    const v = $('.voice', row);
    const play = async (slowly = false) => { v.classList.add('playing'); await say(x.en, { who: x.who, rate: slowly ? .7 : undefined }); v.classList.remove('playing'); };
    $('.vp', row).addEventListener('click', () => play());
    C.voice = { x, row, play };
    return row;
  }
  function sparkCard() {
    C.prevWho = '';
    return add(`<div class="spark-card"><span class="sp">${sparkSVG()}</span><b>O scânteie!</b></div>`);
  }
  function pic(x) {
    C.prevWho = x.who;
    return add(`<div class="row them">${ava(x.who)}<div class="m pic-m"><span class="who-l">${esc(name(x.who))}</span>${artBox(x.art)}${x.en ? `<span class="en">${esc(sub(x.en))}</span>` : ''}</div></div>`);
  }

  /* ---------------------------------------------------------------- the reply box */
  const clear = () => { comp.innerHTML = ''; comp.classList.remove('open'); };
  const open = html => { comp.innerHTML = html; comp.classList.add('open'); scroll(); };
  const qHTML = q => `<p class="c-q">${esc(sub(q))}</p>`;
  const draft = text => `<p class="c-draft en">${esc(sub(stripHint(text))).replace('{}', '<span class="gap">&nbsp;</span>')}${/\([^)]*\)\s*$/.test(text) ? ` <span class="hint-w">${esc(text.match(/\(([^)]*)\)\s*$/)[1])}</span>` : ''}</p>`;

  /** Options as buttons; resolves with the one tapped. `stack` puts them one per line. */
  const pickOne = (html, options, { stack = false, ro = false } = {}) => new Promise(resolve => {
    open(`${html}<div class="opts${stack ? ' stack' : ''}">${options.map(t => `<button type="button" class="opt${ro ? ' ro' : ' en'}" data-opt data-o="${esc(t)}">${esc(sub(t))}</button>`).join('')}</div>`);
    $$('[data-opt]', comp).forEach(b => b.addEventListener('click', () => { $$('[data-opt]', comp).forEach(x => { x.disabled = true; }); resolve(b.dataset.o); }, { once: true }));
  });

  async function react(re) {
    const who = C.last;
    const huh = CAST[who]?.huh?.length ? CAST[who].huh : CAST.stranger.huh;
    const [en, ro] = re || huh[Math.floor(Math.random() * huh.length)];
    await them({ who, en, ro });
  }

  /** complete, choose: a wrong reply is sent, gets a reaction and a why, and you pick again from what's left. */
  async function pickReply(x) {
    let options = shuffle([x.right, ...x.wrong.map(w => w.text)]);
    let first = true;
    for (;;) {
      const html = x.t === 'complete' ? qHTML(x.q) + draft(x.text) : qHTML(x.q);
      const pending = pickOne(html, options, { stack: x.t === 'choose' });
      hook({ act: 'opt', o: x.right });
      const p = await pending;
      if (!C.alive) return;
      clear();
      const ok = p === x.right;
      mine(x.t === 'complete' ? fillGap(x.text, p) : p, !ok);
      if (first) graded(x, ok);
      first = false;
      if (ok) { tone('ok'); buzz(); await pause(350); return; }
      const w = x.wrong.find(t => t.text === p);
      await react(w?.re);
      if (!C.alive) return;
      why(w?.why);
      options = options.filter(t => t !== p);
    }
  }

  async function build(x) {
    const answer = wordsOf(sub(x.en));
    let first = true;
    for (;;) {
      const tiles = shuffle([...answer, ...x.extra]);
      const got = await new Promise(resolve => {
        open(`${qHTML(x.q)}<div class="line" data-line></div><div class="bank" data-bank>${tiles.map((w, k) => `<button type="button" class="tile en" data-opt data-k="${k}" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div>
          <div class="c-act"><button type="button" class="send" data-send data-enter disabled>Trimite</button></div>`);
        let order = [];
        const line = $('[data-line]', comp), send = $('[data-send]', comp);
        const draw = () => {
          line.innerHTML = order.map(k => `<button type="button" class="tile en" data-k="${k}">${esc(tiles[k])}</button>`).join('');
          $$('[data-bank] .tile', comp).forEach(b => b.classList.toggle('used', order.includes(+b.dataset.k)));
          send.disabled = !order.length;
        };
        $('[data-bank]', comp).addEventListener('click', e => { const b = e.target.closest('.tile'); if (b && !b.classList.contains('used')) { order.push(+b.dataset.k); draw(); } });
        line.addEventListener('click', e => { const b = e.target.closest('.tile'); if (b) { order = order.filter(k => k !== +b.dataset.k); draw(); } });
        send.addEventListener('click', () => resolve(order.map(k => tiles[k])));
        hook({ act: 'tiles', words: answer });
      });
      if (!C.alive) return;
      clear();
      const ok = got.join(' ') === answer.join(' ');
      mine(ok ? x.en : got.join(' ') + '.', !ok);
      if (first) graded(x, ok);
      first = false;
      if (ok) { tone('ok'); buzz(); await pause(350); return; }
      await react();
      if (!C.alive) return;
      why(x.why);
    }
  }

  /** Typing: a word in a gap (write) or the whole voice note (dictate). Two misses show the answer, which you then type. */
  async function typed(x, { answers, frameText, whyText, onTry }) {
    let misses = 0, first = true;
    for (;;) {
      const given = await new Promise(resolve => {
        const input = `<input class="c-in en" data-in autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="send" aria-label="Răspunsul tău">`;
        open(`${qHTML(x.q)}${frameText ? `<p class="c-draft en">${esc(sub(stripHint(frameText))).replace('{}', input)}${/\([^)]*\)\s*$/.test(frameText) ? ` <span class="hint-w">${esc(frameText.match(/\(([^)]*)\)\s*$/)[1])}</span>` : ''}</p>` : input}
          <div class="c-act">${onTry ? `<button type="button" class="ghost-btn" data-again>${ICONS.speaker}Din nou</button><button type="button" class="ghost-btn" data-slowly>${ICONS.slow}Rar</button>` : ''}<button type="button" class="ghost-btn" data-idk>Nu știu</button><button type="button" class="send" data-send data-enter>Trimite</button></div>`);
        const inp = $('[data-in]', comp);
        if (!FAST) setTimeout(() => inp.focus({ preventScroll: true }), 60);
        const go = () => { if (inp.value.trim()) resolve(inp.value); };
        $('[data-send]', comp).addEventListener('click', go);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
        $('[data-idk]', comp).addEventListener('click', () => resolve(null));
        $('[data-again]', comp)?.addEventListener('click', () => onTry(false));
        $('[data-slowly]', comp)?.addEventListener('click', () => onTry(true));
        hook({ act: 'type', text: answers[0] });
      });
      if (!C.alive) return null;
      const r = given == null ? { ok: false } : check(given, answers, { strict: !!frameText });
      clear();
      if (first) graded(x, r.ok);
      first = false;
      if (r.ok) {
        const typo = r.typos.length > 0;
        mine(frameText ? stripHint(frameText).replace('{}', typo ? r.answer : given.trim()) : (typo ? r.answer : given.trim()));
        tone('ok'); buzz();
        if (typo) why(`Aproape perfect. Se scrie: ${r.answer}.`, 'soft');
        await pause(350);
        return true;
      }
      misses++;
      if (given != null) {
        mine(frameText ? stripHint(frameText).replace('{}', given.trim()) : given.trim(), true);
        await react();
        if (!C.alive) return null;
      }
      if (given == null || misses >= 2) why(`Răspunsul: ${answers[0]}. Scrie-l tu.`);
      else if (!frameText) why(`Aproape. Ai prins: ${partial(given, sub(answers[0]))}`, 'why', true);
      else why(whyText);
    }
  }

  async function listen(x) {
    const v = C.voice;
    let options = shuffle([x.right, ...x.wrong.map(w => w.text)]);
    let first = true;
    for (;;) {
      const html = `${qHTML(x.q)}<div class="c-act left"><button type="button" class="ghost-btn" data-again>${ICONS.speaker}Ascultă din nou</button><button type="button" class="ghost-btn" data-slowly>${ICONS.slow}Rar</button></div>`;
      const pending = pickOne(html, options, { stack: true, ro: true });
      hook({ act: 'opt', o: x.right });
      $('[data-again]', comp)?.addEventListener('click', () => v?.play());
      $('[data-slowly]', comp)?.addEventListener('click', () => v?.play(true));
      const p = await pending;
      if (!C.alive) return;
      const ok = p === x.right;
      if (first) graded(x, ok);
      first = false;
      if (ok) { clear(); tone('ok'); buzz(); reveal(); sysLine('✓ ' + x.right); await pause(350); return; }
      const w = x.wrong.find(t => t.text === p);
      clear();
      why(w?.why || 'Ascultă din nou.');
      options = options.filter(t => t !== p);
    }
  }
  const reveal = () => { const t = C.voice && $('.transcript', C.voice.row); if (t) t.hidden = false; scroll(); };

  async function fix(x) {
    const b = $$('.row.them .m', log).filter(m => $('[data-g]', m)).pop();
    const words = b ? $$('.gw', b) : [];
    let first = true, missed = false;
    open(qHTML(x.q));
    words.forEach(w => w.classList.add('tap'));
    hook({ act: 'glitch' });
    await new Promise(resolve => {
      words.forEach(w => w.addEventListener('click', e => {
        e.stopPropagation();
        if (!w.hasAttribute('data-g')) { w.classList.remove('nope'); void w.offsetWidth; w.classList.add('nope'); missed = true; return; }
        words.forEach(x2 => x2.classList.remove('tap'));
        w.classList.add('hit');
        resolve();
      }));
    });
    if (!C.alive) return;
    tone('ok');
    let options = shuffle([x.right, ...x.wrong]);
    for (;;) {
      const pending = pickOne(qHTML('Ce trebuia să fie?'), options);
      hook({ act: 'opt', o: x.right });
      const p = await pending;
      if (!C.alive) return;
      const ok = p === x.right;
      if (first) graded(x, ok && !missed);
      first = false;
      if (ok) {
        clear(); tone('ok'); buzz();
        const hit = $('[data-g]', b); if (hit) hit.innerHTML = `<s>${hit.textContent}</s> <ins>${esc(x.right)}</ins>`;
        await pause(500);
        return;
      }
      clear();
      why(x.why);
      options = options.filter(t => t !== p);
    }
  }

  async function quiz(x) {
    let combo = 0, got = 0;
    for (let k = 0; k < x.items.length; k++) {
      const q = x.items[k];
      const options = shuffle([q.right, ...q.wrong]);
      const p = await new Promise(resolve => {
        open(`<div class="quiz"><p class="qh"><span>Întrebarea ${k + 1} din ${x.items.length}</span><span class="combo">${combo > 1 ? `combo ×${combo}` : ''}</span></p><span class="bar"><i data-bar></i></span>
          <p class="qq en">${esc(sub(q.text)).replace('{}', '<span class="gap">&nbsp;</span>')}</p></div><div class="opts">${options.map(t => `<button type="button" class="opt en" data-opt data-o="${esc(t)}">${esc(t)}</button>`).join('')}</div>`);
        const bar = $('[data-bar]', comp);
        let timer = 0;
        if (!FAST) {
          requestAnimationFrame(() => { bar.style.transition = 'transform 9s linear'; bar.style.transform = 'scaleX(0)'; });
          timer = setTimeout(() => resolve(null), 9000);
        }
        $$('[data-opt]', comp).forEach(b => b.addEventListener('click', () => { clearTimeout(timer); resolve(b.dataset.o); }, { once: true }));
        hook({ act: 'opt', o: q.right });
      });
      if (!C.alive) return;
      const ok = p === q.right;
      graded(x, ok);
      if (ok) { got++; combo++; tone(combo > 1 ? 'combo' : 'ok'); buzz(); }
      else { combo = 0; $$('[data-opt]', comp).forEach(b => b.classList.toggle('yes', b.dataset.o === q.right)); await wait(900); }
    }
    clear();
    sysLine(`Quiz: ${got} din ${x.items.length}${got === x.items.length ? ' · perfect' : ''}`);
    if (got === x.items.length) tone('reveal');
    await pause(500);
  }

  /* ---------------------------------------------------------------- one entry at a time */
  async function play(x, i) {
    switch (x.t) {
      case 'msg': return them(x);
      case 'story': {
        story(x); tone('reveal');
        await new Promise(r => { open(`<div class="c-act"><button type="button" class="btn next" data-opt data-enter data-next>Continuă</button></div>`); $('[data-next]', comp).addEventListener('click', r, { once: true }); hook({ act: 'go', sel: '[data-next]' }); });
        clear(); return;
      }
      case 'sys': sysLine(x.ro); C.prevWho = ''; return pause(Math.min(2000, 700 + x.ro.length * 18));
      case 'note': note(x); return pause(900);
      case 'voice': {
        o.frame?.status(`${name(x.who)} înregistrează…`, true);
        await wait(600);
        o.frame?.status();
        const row = voiceNote(x);
        await pause(200);
        const v = $('.voice', row);
        v.classList.add('playing');
        const spoken = await say(x.en, { who: x.who, auto: true });
        v.classList.remove('playing');
        if (!spoken) await pause(600);
        return;
      }
      case 'pic': pic(x); return pause(900);
      case 'spark': sparkCard(); tone('spark'); buzz(30); o.onSpark?.(); return pause(1300);
      case 'rename': names[x.who] = x.name; return;
      case 'complete': case 'choose': return pickReply(x);
      case 'build': return build(x);
      case 'write': return typed(x, { answers: x.a, frameText: x.text, whyText: x.why });
      case 'dictate': {
        const v = C.voice;
        const ok = await typed(x, { answers: [sub(v.x.en)], whyText: '', onTry: slowly => v.play(slowly) });
        if (ok) reveal();
        return;
      }
      case 'listen': return listen(x);
      case 'fix': return fix(x);
      case 'quiz': return quiz(x);
      case 'game': {
        const r = await o.onGame(x);
        if (!C.alive || !r) return;
        C.right += r.right; C.total += r.total;
        sysLine(`✓ ${GAMES[x.set]?.title || 'Joc'} · ${r.right} din ${r.total}`);
        return pause(400);
      }
      case 'signal': {
        const r = await o.onSignal(x);
        if (!C.alive || !r) return;
        C.right += r.right; C.total += r.total;
        return;
      }
    }
  }

  /** The conversation so far, drawn at once: for coming back to an unfinished episode. */
  function replay(x) {
    switch (x.t) {
      case 'msg': return them(x, { instant: true });
      case 'story': return story(x);
      case 'sys': return sysLine(x.ro);
      case 'note': return note(x);
      case 'voice': return voiceNote(x, { instant: true });
      case 'pic': return pic(x);
      case 'spark': return sparkCard();
      case 'rename': names[x.who] = x.name; return;
      case 'complete': return mine(fillGap(x.text, x.right));
      case 'choose': return mine(x.right);
      case 'build': return mine(x.en);
      case 'write': return mine(stripHint(x.text).replace('{}', x.a[0]));
      case 'dictate': return C.voice && mine(C.voice.x.en);
      case 'fix': { const hit = $$('[data-g]', log).pop(); if (hit) hit.innerHTML = `<s>${hit.textContent}</s> <ins>${esc(x.right)}</ins>`; return; }
      case 'quiz': return sysLine('Quiz');
      case 'game': return sysLine(`✓ ${GAMES[x.set]?.title || 'Joc'}`);
    }
  }

  const done = (async () => {
    const start = o.start || 0;
    for (let i = 0; i < start; i++) replay(script[i]);
    for (let i = start; i < script.length; i++) {
      if (!C.alive) return null;
      o.frame?.progress(i / script.length);
      if (i > start && /^(complete|choose|build|write|listen|dictate|fix|quiz|game|signal|story)$/.test(script[i].t)) o.onSave?.(i, C.right, C.total);
      await play(script[i], i);
    }
    o.frame?.progress(1);
    return C.alive ? { right: C.right, total: C.total } : null;
  })();

  return { done, stop() { C.alive = false; hush(); hurry?.(); } };
}

/** Whether the automatic voice is on, for the frame's button. */
export { autoVoice };
