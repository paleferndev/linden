import { radio } from '../art/people.js';
import { ICONS } from '../art/icons.js';
import { $, esc, sub, FAST, hook } from '../app/ui.js';
import { say, tone, buzz } from '../app/sound.js';
import { words, lev } from '../app/grade.js';

// The signal: at the end of every episode the radio at No. 1 picks up a transmission. You type what you hear, and
// every word you get right is decoded on the screen. What it says is the clue to the next episode.
// "Arată un cuvânt" decodes the next word for you; the signal counts as right only without it.

const near = (a, b) => a === b || (b.length >= 5 && lev(a, b) <= 1 && !(a.startsWith(b) || b.startsWith(a)));

export function playSignal(host, x, { n } = {}) {
  const tokens = sub(x.en).split(' ');
  host.innerHTML = `<div class="signal night" data-active>
    <div class="sg-top"><span class="sg-radio"><svg viewBox="-12 -14 94 80" aria-hidden="true">${radio()}</svg></span>
      <div><p class="kick">Transmisia ${n ?? ''}</p><div class="sg-wave" data-wave>${Array.from({ length: 30 }, (_, k) => `<i style="height:${22 + Math.abs(Math.sin(k * 2.3)) * 78}%"></i>`).join('')}</div></div></div>
    <div class="sg-out en" data-out></div>
    <p class="sg-clue" data-clue hidden></p>
    <div class="sg-in"><input class="c-in en" data-in placeholder="Scrie ce auzi…" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Transmisia">
      <div class="c-act"><button type="button" class="ghost-btn" data-play>${ICONS.speaker}Ascultă</button><button type="button" class="ghost-btn" data-slow>${ICONS.slow}Rar</button><button type="button" class="ghost-btn" data-hint>Arată un cuvânt</button></div>
      <button type="button" class="btn" data-go data-enter hidden>Continuă</button></div>
  </div>`;
  const out = $('[data-out]', host), inp = $('[data-in]', host), wave = $('[data-wave]', host);
  const shown = tokens.map(() => false);
  let hints = 0;
  const draw = () => {
    out.innerHTML = tokens.map((t, i) => shown[i] ? `<span class="w got">${esc(t)}</span>` : `<span class="w">${'▒'.repeat(Math.max(2, t.replace(/[.,!?]/g, '').length))}</span>`).join(' ');
  };
  const play = async slowly => { wave.classList.add('on'); await say(x.en, { who: 'voice', rate: slowly ? .62 : undefined }); wave.classList.remove('on'); };
  draw();
  return new Promise(resolve => {
    const finish = () => {
      if ($('[data-go]', host).hidden === false) return;
      inp.disabled = true;
      tone('reveal'); buzz(30);
      out.classList.add('done');
      const c = $('[data-clue]', host);
      c.innerHTML = `<span class="ro">${esc(sub(x.ro))}</span>${esc(x.clue)}`;
      c.hidden = false;
      $('.sg-in .c-act', host).hidden = true;
      inp.hidden = true;
      const go = $('[data-go]', host);
      go.hidden = false;
      go.addEventListener('click', () => resolve({ right: hints ? 0 : 1, total: 1, hints }), { once: true });
      hook({ act: 'go', sel: '.signal [data-go]' });
    };
    const update = () => {
      const typed = words(inp.value);
      tokens.forEach((t, i) => {
        if (shown[i]) return;
        const w = words(t);
        if (w.length && w.every(p => typed.some(q => near(q, p)))) { shown[i] = true; tone('tick'); }
      });
      draw();
      if (shown.every(Boolean)) finish();
    };
    inp.addEventListener('input', update);
    $('[data-play]', host).addEventListener('click', () => play(false));
    $('[data-slow]', host).addEventListener('click', () => play(true));
    $('[data-hint]', host).addEventListener('click', () => {
      const i = shown.indexOf(false);
      if (i < 0) return;
      shown[i] = true; hints++;
      draw();
      if (shown.every(Boolean)) finish();
    });
    if (!FAST) setTimeout(() => { play(false); }, 500);
    hook({ act: 'type', text: sub(x.en), signal: true });
  });
}
