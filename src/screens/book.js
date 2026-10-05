import { VERB_BOOK } from '../content/verbbook.js';
import { LESSONS } from '../content/lessons.js';
import { VERB, VERBS, formsLine } from '../content/verbs.js';
import { GRAMMAR } from '../content/grammar.js';
import { EP } from '../content/episodes.js';
import { ICONS } from '../art/icons.js';
import { WHERE } from '../art/props.js';
import { artBox } from '../art/art.js';
import { $$, esc, sub, bold, openSheet } from '../app/ui.js';
import { epDone } from '../app/store.js';

// The book: a page for every verb (its forms, what it means, examples in different tenses, phrases, the mistakes
// Romanian speakers make) and a lesson for every grammar point. Both open in the sheet, over whatever is on screen:
// from a verb in the chat, the verb album, "De ce?" after a wrong answer, a note in the chat, or Colecții → Gramatică.
// A page is made of the app's own things, so it reads like Linden: the picture of the episode where you met it, a
// handwritten line, the chat's word tiles and bubbles, notes pinned like on the plan board, a house with lit windows.
// No prose: short Romanian labels, and what matters **marked** in the English.

export const TENSES = { ps: 'prezent simplu', pc: 'prezent continuu', past: 'trecut simplu', pp: 'prezent perfect', will: 'viitor cu `will`', going: 'viitor cu `going to`', can: 'cu `can`, `should`, `must`', imp: 'imperativ' };

/** Romanian with `English` marked: the English is set in the serif. */
export const roHTML = s => esc(s).replace(/`([^`]+)`/g, '<span class="en">$1</span>');
/** A title that keeps a suffix whole: "the -est" never breaks after the hyphen. */
export const titleHTML = s => esc(s).replace(/(^|\s)-(?=\p{L})/gu, '$1\u2011');
/** What the voice says for an English line with **marks**. */
export const plain = s => String(s).replace(/\*\*/g, '');

const ARROW = '<svg class="arr" viewBox="0 0 24 12" aria-hidden="true"><path d="M2 7.5c5-3.5 11-4 18-1.5M15.5 2.5l5 4-5.5 3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// pinned by hand: each note a little crooked, never twice the same way
const TILT = [-1.6, 1.3, -.8, 1.9];

const head = (title, kick, en = false) => `<div class="sh-head plain"><div><p class="kick">${kick}</p><h3${en ? ' class="en"' : ''}>${title}</h3></div>
  <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>`;
/** The picture of the episode where the page was met. */
const band = n => EP[n] ? `<figure class="bk-band">${artBox('ep:' + n)}<figcaption>Episodul ${n} · <span class="en">${esc(EP[n].title)}</span></figcaption></figure>` : '';
const bub = (html, cls = '') => `<p class="bub${cls ? ' ' + cls : ''} en">${html}</p>`;
const pin = (inner, i = 0, cls = '') => `<div class="pin${cls ? ' ' + cls : ''}" style="--r:${TILT[i % TILT.length]}deg">${inner}</div>`;
/** A line in a bubble you can tap to hear, its Romanian under it. `html`: the line as shown; `label`: over it. */
const said = (en, ro, html = esc(sub(en)), label = '') => `<button type="button" class="bub" data-say="${esc(plain(sub(en)))}">${label ? `<span class="who-l">${roHTML(label)}</span>` : ''}<span class="en">${html}</span>${ro ? `<span class="ro">${esc(ro)}</span>` : ''}${ICONS.speaker}</button>`;
/** A mistake the way the chat shows it: what was sent, struck; the right one; one line why. */
const mistake = (no, yes, why) => `<div class="bk-trap">${bub(esc(no), 'me bad')}${yes ? bub(esc(yes), 'me') : ''}${why ? `<div class="why-l">${ICONS.hint}<p>${roHTML(why)}</p></div>` : ''}</div>`;
const traps = list => list?.length ? `<section><h4>Greșeli frecvente</h4><div class="bk-traps">${list.map(t => mistake(...t)).join('')}</div></section>` : '';

/** The ways a lesson shows its rule. English with **x** has x highlighted; Romanian has `English` in the serif. */
const BLOCKS = {
  // who → form, one row each: [['I', 'am'], …]; a longer row is a chain: tall → taller → the tallest
  forms: b => `<div class="bk-map" style="--n:${Math.max(...b.rows.map(r => r.length)) - 1}">${b.rows.map(([who, ...fs]) => `<span class="who">${esc(who)}</span>${fs.map(f => `<span class="f">${ARROW}<span class="tile en">${esc(f)}</span></span>`).join('')}`).join('')}</div>`,
  // a sentence turned into another; what changes is **marked**
  turn: b => `<div class="bk-turn">${bub(bold(b.from))}${ARROW}${bub(bold(b.to))}</div>${b.note ? `<p class="hand-note">${roHTML(b.note)}</p>` : ''}`,
  // how it's built: tiles joined with +, and an example
  formula: b => `<div class="bk-formula">${b.parts.map(x => `<span class="tile">${roHTML(x)}</span>`).join('<span class="plus" aria-hidden="true">+</span>')}</div>${b.ex ? bub(bold(b.ex)) : ''}`,
  // cases side by side, pinned: [label, example]
  pair: b => `<div class="bk-pins">${b.items.map(([l, ex], i) => pin(`<span class="pl">${roHTML(l)}</span><p class="en">${bold(ex)}</p>`, i)).join('')}</div>`,
  // two questions decide the word: the house at night, the word in the window where they meet
  grid: b => `<div class="bk-house night"><div class="g" style="--cols:${b.cols.length}"><span></span>${b.cols.map(c => `<span class="hl">${roHTML(c)}</span>`).join('')}${b.rows.map(([l, ...cs]) => `<span class="hl">${roHTML(l)}</span>${cs.map(c => `<b class="win">${esc(c)}</b>`).join('')}`).join('')}</div></div>`,
  // words and what they mean, as tiles, with a picture when there is one: [en, ro, picture]
  words: b => `<div class="bk-words">${b.items.map(([en, ro, pic]) => `<div class="tile">${pic && WHERE[pic] ? WHERE[pic]() : ''}<b class="en">${esc(en)}</b><small>${roHTML(ro)}</small></div>`).join('')}</div>`,
  // the one thing to remember, pinned
  tip: (b, i = 0) => pin(`<p class="tp">${roHTML(b.ro)}</p>${b.ex ? `<p class="en">${bold(b.ex)}</p>` : ''}`, i + 1, 'wide'),
};
const block = (b, i) => `<section>${b.title ? `<h4>${roHTML(b.title)}</h4>` : ''}${BLOCKS[b.t]?.(b, i) || ''}</section>`;

// [data-say] buttons speak through the app's own click handler (main.js); the sheet only links verbs.
function bind(sheet) {
  $$('[data-verb]', sheet).forEach(b => b.addEventListener('click', () => openVerb(b.dataset.verb)));
  return sheet;
}

/** The page of a verb. */
export function openVerb(base) {
  const v = VERB[base], p = VERB_BOOK[base];
  if (!v || !p) return null;
  const forms = [['de bază', v.base], ['`he, she, it`', p.s], ['`-ing`', p.ing], ['trecut', v.past], ['participiu', v.pp]];
  return bind(openSheet(`${head(esc(v.base), `${esc(v.ro)} · ${v.irregular ? 'neregulat' : 'regulat'}`, true)}
    <div class="bk">
      ${band(v.ep)}
      <section><div class="bk-forms">${forms.map(([l, f]) => `<span class="fm"><span class="tile en">${esc(f)}</span><small>${roHTML(l)}</small></span>`).join('')}</div>
        <button type="button" class="ghost-btn" data-say="${esc(formsLine(v))}">${ICONS.speaker}Ascultă formele</button></section>
      <section><h4>Înseamnă</h4><div class="bk-means">${p.means.map(([ro, en]) => `<div><span class="hl">${roHTML(ro)}</span>${bub(bold(en))}</div>`).join('')}</div></section>
      ${p.tip ? BLOCKS.tip({ ro: p.tip }) : ''}
      <section><h4>Exemple</h4><div class="bk-bubs">${p.ex.map(([t, en, ro]) => said(en, ro, formsIn(en, base), TENSES[t] || t)).join('')}</div></section>
      ${p.phrases?.length ? `<section><h4>Expresii</h4><div class="bk-bubs">${p.phrases.map(([en, ro]) => said(en, ro, formsIn(en, base))).join('')}</div></section>` : ''}
      ${traps(p.traps)}
      ${epDone(v.ep) ? `<section><h4>Din poveste</h4>${bub(esc(sub(v.ex)))}</section>` : ''}
    </div>`));
}

/**
 * The lesson of a grammar point. `mine`: { said, why } when it opens after a wrong answer: what you sent and the
 * one-line reason, shown first, the way the chat showed them.
 */
export function openLesson(point, mine = null) {
  const L = LESSONS[point], G = GRAMMAR[point];
  if (!L || !G) return null;
  // the verbs of the season that the lesson's forms list, as links to their pages
  const listed = L.blocks.filter(b => b.t === 'forms').flatMap(b => b.rows.flat());
  const verbs = [...new Set(listed.join(' ').split(/[^a-z]+/))].filter(w => VERB[w] && VERB_BOOK[w] && w.length > 2);
  let tips = 0;
  return bind(openSheet(`${head(titleHTML(G.title), 'Gramatică')}
    <div class="bk">
      ${mine?.said ? `<section><h4>Ai trimis</h4>${mistake(sub(mine.said), '', mine.why)}</section>` : ''}
      ${band(G.ep)}
      <p class="bk-gist">${roHTML(L.gist)}</p>
      ${L.blocks.map(b => block(b, b.t === 'tip' ? tips++ : 0)).join('')}
      <section><h4>Exemple</h4><div class="bk-bubs">${L.ex.map(([en, ro]) => said(en, ro, bold(en))).join('')}</div></section>
      ${traps(L.traps)}
      ${verbs.length ? `<section><h4>Verbe</h4><p class="bk-verbs">${verbs.map(w => `<button type="button" class="tile en" data-verb="${esc(w)}">${esc(w)}</button>`).join('')}</p></section>` : ''}
    </div>`));
}

export const hasLesson = point => !!(point && LESSONS[point] && GRAMMAR[point]);
export const hasVerb = base => !!(base && VERB[base] && VERB_BOOK[base]);

/* ---------------------------------------------------------------- verbs in the chat */
// Every form of every verb, to find them in a line: "saw" → see, "looking forward to" → look forward to.
const FORMS = new Map();
for (const v of VERBS) {
  const p = VERB_BOOK[v.base];
  if (!p) continue;
  const parts = v.base.split(' '), rest = parts.slice(1).join(' ');
  const heads = new Set([parts[0], p.s.split(' ')[0], p.ing.split(' ')[0], ...v.past.split(' / ').map(f => f.split(' ')[0]), v.pp.split(' ')[0]]);
  if (v.base === 'be') ['am', 'is', 'are', 'was', 'were', 'been', 'being'].forEach(f => heads.add(f));
  for (const h of heads) FORMS.set(rest ? `${h} ${rest}` : h, v.base);
}
const FORM_RE = new RegExp(`(^|[^\\p{L}’'])(${[...FORMS.keys()].sort((a, b) => b.length - a.length).map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?=$|[^\\p{L}’'])`, 'giu');

/** An English line with the forms of one verb highlighted: "I **saw** Tom" on the page of see. */
const formsIn = (en, base) => esc(sub(en)).replace(FORM_RE, (m, pre, form) => FORMS.get(form.toLowerCase()) === base ? `${pre}<b>${form}</b>` : m);

/**
 * Marks, in an English line already turned into HTML, the first time each of `verbs` comes up (`seen` keeps track
 * across the conversation). Marked words are <span class="vb" data-verb>, so the chat can open their page.
 */
export function markVerbs(html, verbs, seen) {
  if (!verbs?.length) return html;
  // only text between tags, so marks and spans already there stay whole
  return html.replace(/(^|>)([^<]+)/g, (_, gt, text) => gt + text.replace(FORM_RE, (m, pre, form) => {
    const base = FORMS.get(form.toLowerCase());
    if (!base || !verbs.includes(base) || seen.has(base)) return m;
    seen.add(base);
    return `${pre}<span class="vb" data-verb="${esc(base)}">${form}</span>`;
  }));
}
