import { VERB_BOOK } from '../content/verbbook.js';
import { LESSONS } from '../content/lessons.js';
import { VERB, VERBS, formsLine } from '../content/verbs.js';
import { GRAMMAR } from '../content/grammar.js';
import { ICONS } from '../art/icons.js';
import { WHERE } from '../art/props.js';
import { $$, esc, sub, bold, openSheet } from '../app/ui.js';
import { epDone } from '../app/store.js';

// The book: a page for every verb (forms, what it means, examples in different tenses, phrases, the mistakes Romanian
// speakers make) and a lesson for every grammar point. Both open in the sheet, over whatever is on screen: from a verb
// in the chat, the verb album, "De ce?" after a wrong answer, a note in the chat, or Colecții → Gramatică.
// A lesson is not prose: a one-line gist, then blocks that show the rule (BLOCKS below), then examples you can tap to
// hear and the usual mistakes. Romanian is kept to short labels; what matters is **marked** in the English.

export const TENSES = { ps: 'prezent simplu', pc: 'prezent continuu', past: 'trecut simplu', pp: 'prezent perfect', will: 'viitor cu `will`', going: 'viitor cu `going to`', can: 'cu `can`, `should`, `must`', imp: 'imperativ' };

/** Romanian with `English` marked: the English is set in the serif. */
export const roHTML = s => esc(s).replace(/`([^`]+)`/g, '<span class="en">$1</span>');
/** A title that keeps a suffix whole: "the -est" never breaks after the hyphen. */
export const titleHTML = s => esc(s).replace(/(^|\s)-(?=\p{L})/gu, '$1\u2011');
/** What the voice says for an English line with **marks**. */
export const plain = s => String(s).replace(/\*\*/g, '');

const head = (title, sub, en = false) => `<div class="sh-head plain"><div>${sub ? `<p class="kick">${sub}</p>` : ''}<h3${en ? ' class="en"' : ''}>${title}</h3></div>
  <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>`;
/** An English line you can tap to hear, with its Romanian under it. `html`: the line as shown (with highlights). */
const hear = (en, ro = '', html = esc(sub(en))) => `<button type="button" class="bk-say" data-say="${esc(plain(sub(en)))}"><span class="en">${html}</span>${ICONS.speaker}</button>${ro ? `<small>${esc(ro)}</small>` : ''}`;
const traps = list => list?.length ? `<section><h4>Greșeli frecvente</h4><ul class="bk-traps">${list.map(([no, yes, why]) => `<li>
  <p class="no"><span class="mk" aria-label="greșit">✗</span><span class="en">${esc(no)}</span></p><p class="yes"><span class="mk" aria-label="corect">✓</span><span class="en">${esc(yes)}</span></p><small>${roHTML(why)}</small></li>`).join('')}</ul></section>` : '';

/** The ways a lesson shows its rule. English with **x** has x highlighted; Romanian has `English` in the serif. */
const BLOCKS = {
  // who → form, one row each: [['I', 'am'], …]; a longer row is a chain: tall → taller → the tallest
  forms: b => `<div class="bk-map" style="--n:${Math.max(...b.rows.map(r => r.length)) - 1}">${b.rows.map(([who, ...fs]) => `<span class="who en">${esc(who)}</span>${fs.map(f => `<span class="f"><span class="arr" aria-hidden="true">→</span><span class="pill en">${esc(f)}</span></span>`).join('')}`).join('')}</div>`,
  // a sentence turned into another; what changes is **marked**
  turn: b => `<div class="bk-turn"><p class="en">${bold(b.from)}</p><span class="arr" aria-hidden="true">→</span><p class="en">${bold(b.to)}</p></div>${b.note ? `<p class="bk-note">${roHTML(b.note)}</p>` : ''}`,
  // how it's built: parts joined with +, and an example
  formula: b => `<div class="bk-formula">${b.parts.map(x => `<span class="part">${roHTML(x)}</span>`).join('<span class="plus" aria-hidden="true">+</span>')}</div>${b.ex ? `<p class="bk-line en">${bold(b.ex)}</p>` : ''}`,
  // cases side by side: [label, example]
  pair: b => `<div class="bk-pair">${b.items.map(([l, ex]) => `<div><span class="lbl">${roHTML(l)}</span><p class="en">${bold(ex)}</p></div>`).join('')}</div>`,
  // a little grid with labelled columns and rows (this, that, these, those)
  grid: b => `<div class="bk-grid" style="--cols:${b.cols.length}"><span></span>${b.cols.map(c => `<span class="lbl">${roHTML(c)}</span>`).join('')}${b.rows.map(([l, ...cs]) => `<span class="lbl">${roHTML(l)}</span>${cs.map(c => `<b class="en">${esc(c)}</b>`).join('')}`).join('')}</div>`,
  // words and what they mean, with a picture when there is one: [en, ro, picture]
  words: b => `<div class="bk-words${b.items.some(i => i[2]) ? ' pics' : ''}">${b.items.map(([en, ro, pic]) => `<div>${pic && WHERE[pic] ? WHERE[pic]() : ''}<b class="en">${esc(en)}</b><small>${roHTML(ro)}</small></div>`).join('')}</div>`,
  // the one thing to remember
  tip: b => `<div class="bk-tip">${ICONS.hint}<div><p>${roHTML(b.ro)}</p>${b.ex ? `<p class="en">${bold(b.ex)}</p>` : ''}</div></div>`,
};
const block = b => `<section>${b.title ? `<h4>${roHTML(b.title)}</h4>` : ''}${BLOCKS[b.t]?.(b) || ''}</section>`;

// [data-say] buttons speak through the app's own click handler (main.js); the sheet only links verbs.
function bind(sheet) {
  $$('[data-verb]', sheet).forEach(b => b.addEventListener('click', () => openVerb(b.dataset.verb)));
  return sheet;
}

/** The page of a verb. */
export function openVerb(base) {
  const v = VERB[base], p = VERB_BOOK[base];
  if (!v || !p) return null;
  const forms = [['de bază', v.base], ['<span class="en">he, she, it</span>', p.s], ['<span class="en">-ing</span>', p.ing], ['trecut', v.past], ['participiu', v.pp]];
  return bind(openSheet(`${head(esc(v.base), `${esc(v.ro)} · ${v.irregular ? 'neregulat' : 'regulat'}`, true)}
    <div class="bk">
      <div class="bk-forms">${forms.map(([l, f]) => `<div><small>${l}</small><b class="en">${esc(f)}</b></div>`).join('')}
        <button type="button" class="ghost-btn" data-say="${esc(formsLine(v))}">${ICONS.speaker}Ascultă formele</button></div>
      <section><h4>Înseamnă</h4><div class="bk-means">${p.means.map(([ro, en]) => `<div><b>${roHTML(ro)}</b><p class="en">${bold(en)}</p></div>`).join('')}</div></section>
      ${p.tip ? BLOCKS.tip({ ro: p.tip }) : ''}
      <section><h4>Exemple</h4><ul class="bk-ex">${p.ex.map(([t, en, ro]) => `<li><span class="bk-tag">${roHTML(TENSES[t] || t)}</span>${hear(en, ro, formsIn(en, base))}</li>`).join('')}</ul></section>
      ${p.phrases?.length ? `<section><h4>Expresii</h4><ul class="bk-ph">${p.phrases.map(([en, ro]) => `<li>${hear(en, ro, formsIn(en, base))}</li>`).join('')}</ul></section>` : ''}
      ${traps(p.traps)}
      ${epDone(v.ep) ? `<section><h4>Din poveste · episodul ${v.ep}</h4><p class="bk-story en">${esc(sub(v.ex))}</p></section>` : ''}
    </div>`));
}

/**
 * The lesson of a grammar point. `mine`: { said, why } when it opens after a wrong answer (what you sent and the
 * one-line reason), shown above the lesson.
 */
export function openLesson(point, mine = null) {
  const L = LESSONS[point], G = GRAMMAR[point];
  if (!L || !G) return null;
  // the verbs of the season that the lesson's table lists, as links to their pages
  const listed = L.blocks.filter(b => b.t === 'forms').flatMap(b => b.rows.flat());
  const verbs = [...new Set(listed.join(' ').split(/[^a-z]+/))].filter(w => VERB[w] && VERB_BOOK[w] && w.length > 2);
  return bind(openSheet(`${head(titleHTML(G.title), 'Gramatică')}
    <div class="bk">
      ${mine ? `<div class="bk-mine"><p><span class="lbl">Ai trimis</span><span class="en">${esc(sub(mine.said))}</span></p>${mine.why ? `<p>${roHTML(mine.why)}</p>` : ''}</div>` : ''}
      <p class="bk-gist">${roHTML(L.gist)}</p>
      ${L.blocks.map(block).join('')}
      <section><h4>Exemple</h4><ul class="bk-ex">${L.ex.map(([en, ro]) => `<li>${hear(en, ro, bold(en))}</li>`).join('')}</ul></section>
      ${traps(L.traps)}
      ${verbs.length ? `<section><h4>Verbe</h4><p class="bk-verbs">${verbs.map(w => `<button type="button" class="chip en" data-verb="${esc(w)}">${esc(w)}</button>`).join('')}</p></section>` : ''}
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
