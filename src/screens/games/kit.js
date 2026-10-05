import { ICONS } from '../../art/icons.js';
import { $, $$, esc, sub, shuffle, wait, hook, fillGap } from '../../app/ui.js';
import { tone, buzz } from '../../app/sound.js';

// What every game shares: an intro card, the header with the score and a combo, the board, a line for feedback,
// the options, and the result card. A round is right only if it was right the first time; a wrong option is marked,
// its one-line why is shown, and you pick again.

export function shell(host, G, { total }) {
  host.innerHTML = `<div class="game" data-active>
    <header class="g-head"><span class="g-t">${esc(G.title)}</span><span class="g-combo" data-combo></span><span class="g-score" data-score>0 / ${total}</span></header>
    <div class="g-dots" aria-hidden="true">${Array.from({ length: total }, () => '<i></i>').join('')}</div>
    <div class="g-board" data-board></div>
    <p class="g-msg" data-msg aria-live="polite"></p>
    <div class="g-opts" data-opts></div>
  </div>`;
  const root = $('.game', host);
  const S = {
    root, total, right: 0, done: 0, combo: 0, best: 0,
    board: $('[data-board]', root), opts: $('[data-opts]', root),
    msg(text = '', kind = '') { const m = $('[data-msg]', root); m.innerHTML = text; m.className = 'g-msg ' + kind; },
    /** Scores a finished round. */
    tally(ok) {
      const dot = $$('.g-dots i', root)[S.done];
      dot?.classList.add(ok ? 'ok' : 'no');
      S.done++;
      if (ok) { S.right++; S.combo++; S.best = Math.max(S.best, S.combo); tone(S.combo >= 3 ? 'combo' : 'ok'); buzz(); }
      else S.combo = 0;
      $('[data-score]', root).textContent = `${S.right} / ${total}`;
      const c = $('[data-combo]', root);
      c.textContent = S.combo >= 2 ? `combo ×${S.combo}` : '';
      if (S.combo >= 2) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
    },
  };
  return S;
}

/** The card before a game: what it is and what it teaches. Resolves on "Începe". */
export function intro(host, G, art = '') {
  return new Promise(resolve => {
    host.insertAdjacentHTML('beforeend', `<div class="g-intro" data-active>
      <div class="gi-card">${art ? `<div class="gi-art">${art}</div>` : ''}<p class="kick">Joc</p><h2>${esc(G.title)}</h2><p class="gi-teach">${esc(G.teaches)}</p><p class="gi-text">${esc(G.intro)}</p>
      <button type="button" class="btn" data-go data-enter>Începe</button></div></div>`);
    const el = host.lastElementChild;
    $('[data-go]', el).addEventListener('click', () => { el.remove(); resolve(); }, { once: true });
    hook({ act: 'go', sel: '.g-intro [data-go]' });
  });
}

/** The card after: the score, the best combo, and a button. */
export function result(host, S, { lines = '' } = {}) {
  const pct = S.total ? S.right / S.total : 1;
  tone(pct >= .9 ? 'reveal' : 'done');
  return new Promise(resolve => {
    host.insertAdjacentHTML('beforeend', `<div class="g-result" data-active>
      <div class="gi-card"><p class="kick">Gata</p><p class="big">${S.right}<span> din ${S.total}</span></p>
      <p class="gi-text">${pct === 1 ? 'Totul din prima.' : pct >= .7 ? 'Bine. Ce ai greșit revine la antrenament.' : 'Ce ai greșit revine la antrenament.'}${S.best >= 3 ? ` Cel mai lung șir: ${S.best}.` : ''}</p>${lines}
      <button type="button" class="btn" data-go data-enter>Continuă</button></div></div>`);
    const el = host.lastElementChild;
    $('[data-go]', el).addEventListener('click', () => { el.remove(); resolve(); }, { once: true });
    hook({ act: 'go', sel: '.g-result [data-go]' });
  });
}

/** A tall picture (w × h) that fills its board: on a taller board the sky grows upwards, on a wider one the board
 *  narrows to the picture. The board's own rounded corners clip it. Call it once the round's options are shown. */
export function fitTall(art, w, h) {
  art.style.width = '';
  const svg = $('svg', art), box = art.getBoundingClientRect();
  if (!svg || !box.width || !box.height) return;
  if (box.height / box.width >= h / w) {
    const vh = Math.min(w * box.height / box.width, h * 1.6);
    svg.setAttribute('viewBox', `0 ${h - vh} ${w} ${vh}`);
  } else {
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    art.style.width = `${Math.round(box.height * w / h)}px`;
  }
}

/** Sentence with a gap, as HTML. */
export const gapHTML = text => esc(sub(text)).replace('{}', '<span class="gap">&nbsp;</span>');
export const filled = (text, word) => {
  const [a, b = ''] = sub(text).split('{}');
  return esc(/^[’']/.test(word) ? a.replace(/ $/, '') : a) + `<b class="fill">${esc(word)}</b>` + esc(b);
};

/**
 * Options under the board; resolves with true when the right one is picked (first try or not → `first`).
 * r: { right, wrong[], why, g }. `onWrong(option)` can add a reaction on the board.
 */
export function pick(S, r, { record, onWrong, fixed } = {}) {
  return new Promise(resolve => {
    const options = fixed || shuffle([r.right, ...r.wrong]);
    S.opts.innerHTML = options.map(t => `<button type="button" class="opt en" data-opt data-o="${esc(t)}">${esc(t)}</button>`).join('');
    S.opts.classList.toggle('grid2', options.length === 4);
    let first = true;
    hook({ act: 'opt', o: r.right });
    $$('[data-opt]', S.opts).forEach(b => b.addEventListener('click', () => {
      if (b.disabled) return;
      const ok = b.dataset.o === r.right;
      if (first) record?.(r.g, ok);
      if (ok) {
        $$('[data-opt]', S.opts).forEach(x => { x.disabled = true; });
        b.classList.add('yes');
        S.msg('');
        resolve(first);
        return;
      }
      first = false;
      b.disabled = true; b.classList.add('no');
      S.msg(`${ICONS.hint}<span>${esc(r.why || '')}</span>`, 'why');
      onWrong?.(b.dataset.o);
    }));
  });
}

export const clearOpts = S => { S.opts.innerHTML = ''; };
export { wait, esc, sub, shuffle, $, $$, tone, buzz, hook };
