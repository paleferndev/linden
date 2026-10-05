import { VERB_BOOK } from '../content/verbbook.js';
import { LESSONS } from '../content/lessons.js';
import { VERB, VERBS, formsLine } from '../content/verbs.js';
import { GRAMMAR } from '../content/grammar.js';
import { ICONS } from '../art/icons.js';
import { $$, esc, sub, bold, openSheet } from '../app/ui.js';
import { epDone } from '../app/store.js';

// The book: a page for every verb (forms, how it's used, examples in different tenses, phrases, the mistakes Romanian
// speakers make) and a lesson for every grammar point (the rule, a table, examples, the usual mistakes). Both open in
// the sheet, over whatever is on screen: from a verb in the chat, the verb album, "De ce?" after a wrong answer,
// a note in the chat, or Colecții → Gramatică. Every English line can be tapped to hear it.

export const TENSES = { ps: 'prezent simplu', pc: 'prezent continuu', past: 'trecut simplu', pp: 'prezent perfect', will: 'viitor cu `will`', going: 'viitor cu `going to`', can: 'cu `can`, `should`, `must`', imp: 'imperativ' };

/** Romanian with `English` marked: the English is set in the serif. */
export const roHTML = s => esc(s).replace(/`([^`]+)`/g, '<span class="en">$1</span>');
/** What the voice says for an English line with **marks**. */
export const plain = s => String(s).replace(/\*\*/g, '');

const head = (title, sub, en = false) => `<div class="sh-head plain"><div>${sub ? `<p class="kick">${sub}</p>` : ''}<h3${en ? ' class="en"' : ''}>${title}</h3></div>
  <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>`;
const hear = (en, ro = '', marked = false) => `<button type="button" class="bk-say" data-say="${esc(plain(sub(en)))}"><span class="en">${marked ? bold(en) : esc(sub(en))}</span>${ICONS.speaker}</button>${ro ? `<small>${esc(ro)}</small>` : ''}`;
const traps = list => list?.length ? `<section><h4>Greșeli frecvente</h4><ul class="bk-traps">${list.map(([no, yes, why]) => `<li>
  <p class="no"><span class="mk" aria-label="greșit">✗</span><span class="en">${esc(no)}</span></p><p class="yes"><span class="mk" aria-label="corect">✓</span><span class="en">${esc(yes)}</span></p><small>${roHTML(why)}</small></li>`).join('')}</ul></section>` : '';

// [data-say] buttons speak through the app's own click handler (main.js); the sheet only links verbs.
function bind(sheet) {
  $$('[data-verb]', sheet).forEach(b => b.addEventListener('click', () => openVerb(b.dataset.verb)));
  return sheet;
}

/** The page of a verb. */
export function openVerb(base) {
  const v = VERB[base], p = VERB_BOOK[base];
  if (!v || !p) return null;
  const forms = [['forma de bază', v.base], [`<span class="en">he, she, it</span>`, p.s], ['cu <span class="en">-ing</span>', p.ing], ['trecut', v.past], ['participiu', v.pp]];
  return bind(openSheet(`${head(esc(v.base), `${esc(v.ro)} · ${v.irregular ? 'neregulat' : 'regulat'}`, true)}
    <div class="bk">
      <div class="bk-forms">${forms.map(([l, f]) => `<div><small>${l}</small><b class="en">${esc(f)}</b></div>`).join('')}
        <button type="button" class="ghost-btn" data-say="${esc(formsLine(v))}">${ICONS.speaker}Ascultă formele</button></div>
      <section><h4>Cum se folosește</h4><p>${roHTML(p.use)}</p></section>
      <section><h4>Exemple</h4><ul class="bk-ex">${p.ex.map(([t, en, ro]) => `<li><span class="bk-tag">${roHTML(TENSES[t] || t)}</span>${hear(en, ro)}</li>`).join('')}</ul></section>
      ${p.phrases?.length ? `<section><h4>Expresii</h4><ul class="bk-ph">${p.phrases.map(([en, ro]) => `<li>${hear(en, ro)}</li>`).join('')}</ul></section>` : ''}
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
  const [headRow, ...rows] = L.table || [];
  // the verbs of the season that the lesson's table lists, as links to their pages
  const verbs = L.table ? [...new Set(rows.flat().join(' ').split(/[^a-z]+/))].filter(w => VERB[w] && VERB_BOOK[w] && w.length > 2) : [];
  return bind(openSheet(`${head(esc(G.title), 'Gramatică')}
    <div class="bk">
      ${mine ? `<div class="bk-mine"><p><span class="lbl">Ai trimis</span><span class="en">${esc(sub(mine.said))}</span></p>${mine.why ? `<p>${roHTML(mine.why)}</p>` : ''}</div>` : ''}
      <section><h4>Regula</h4>${L.rule.map(r => `<p>${roHTML(r)}</p>`).join('')}</section>
      ${L.table ? `<div class="bk-table"><table><thead><tr>${headRow.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr>${r.map(c => `<td class="en">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}
      <section><h4>Exemple</h4><ul class="bk-ex">${L.ex.map(([en, ro]) => `<li>${hear(en, ro, true)}</li>`).join('')}</ul></section>
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
