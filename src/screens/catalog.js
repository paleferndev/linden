import { LESSONS, COURSE } from '../content/lessons.js';
import { ICONS } from '../art/icons.js';
import { esc } from '../app/ui.js';
import { sampleReview } from './review.js';

// Every way the app teaches, in one list, each with a "try it" that plays real examples from the lessons.
// Try-outs don't touch progress. Reached from Profil.

export const KINDS = [
  { group: 'Ca să înveți', items: [
    ['scene', 'Scena', 'Un vecin spune o replică. O auzi înainte s-o citești.'],
    ['explore', 'Explorează imaginea', 'Atingi lucrurile din desen: auzi cuvântul și vezi traducerea.'],
    ['cards', 'Cuvinte și fraze', 'Atingi fiecare card ca să auzi și să vezi ce înseamnă.'],
    ['pattern', 'Tiparul', 'O frază-model; schimbi partea marcată și auzi rezultatul.'],
    ['stress', 'Accentul', 'Unde apeși în cuvinte pe care le știi deja.'],
    ['soundkey', 'Cheia sunetelor', 'Cum citești scrierea «pe românește».'],
    ['mouth', 'Poziția gurii', 'three, tree, free: unde stă limba.'],
    ['teenty', '-teen sau -ty', 'fifteen față de fifty: diferența e accentul.'],
    ['times', 'Momentele zilei', 'Salutul potrivit pentru fiecare oră.'],
    ['letters', 'Alfabetul', 'Numele literelor în engleză.'],
    ['numbers', 'Numerele', 'Atingi și asculți.'],
    ['compare', 'Două situații', 'Excuse me înainte, sorry după.'],
    ['thisthat', 'Aici sau acolo', 'this one și that one, cu desen.'],
  ] },
  { group: 'Ca să exersezi', items: [
    ['minimal', 'Perechi de sunete', 'Auzi un cuvânt și alegi între două care sună aproape la fel. Vocea se schimbă de la o rundă la alta.'],
    ['listen', 'Ascultă și înțelege', 'O replică la viteză normală și o întrebare despre ea. Variantele diferă printr-un singur detaliu.'],
    ['dictation', 'Dictare', 'Scrii ce auzi: cuvinte, numere, prețuri.'],
    ['listenbuild', 'Ascultă și construiește', 'Pui piesele în ordinea în care le auzi.'],
    ['translate', 'Tradu cu piese', 'Construiești fraza în engleză. Printre piese sunt și capcane.'],
    ['translate-type', 'Tradu scriind', 'Scrii fraza în engleză, fără ajutor.'],
    ['cloze', 'Completează', 'Alegi cuvântul care lipsește: is sau are, a sau some, this sau that.'],
    ['pick', 'Alege', 'Ce spui într-o situație, sau care frază e corectă. Variantele greșite sunt greșeli tipice.'],
    ['speak', 'Spune cu voce tare', 'Spui fraza; telefonul verifică. Fără microfon, o spui și te verifici singur.'],
    ['talk', 'Dialog', 'O conversație scurtă cu un vecin. Ce alegi schimbă ce răspunde.'],
    ['review', 'Recapitulare', 'Exercițiile de mai sus, amestecate, pe cuvinte din toate lecțiile.'],
  ] },
];

/** Up to `max` examples of a step type, each from a different lesson, tagged with where it came from. */
export function samples(kind, max = 3) {
  if (kind === 'review') return sampleReview(8);
  const type = kind === 'translate-type' ? 'translate' : kind;
  const out = [];
  for (const id of COURSE) {
    const s = LESSONS[id].steps.find(x => x.t === type && !out.some(o => o.from === id));
    if (s) out.push({ ...s, from: id, ...(kind === 'translate-type' ? { mode: 'type' } : {}) });
    if (out.length >= max) break;
  }
  return out;
}

export function renderCatalog(view) {
  view.innerHTML = `<div class="wrap page">
    <a class="back-link" href="#/profil" data-nav="#/profil">${ICONS.back}Profil</a>
    <h1 class="page-h">Exerciții</h1>
    <p class="page-sub">Tot ce folosește aplicația ca să te învețe. Încercările de aici nu schimbă progresul.</p>
    ${KINDS.map(g => `<section class="ph-group"><p class="ph-sec">${esc(g.group)}</p>
      ${g.items.map(([k, name, d]) => `<button type="button" class="kind-row" data-try="${k}"><span><b>${esc(name)}</b><span>${esc(d)}</span></span><span class="go">Încearcă</span></button>`).join('')}
    </section>`).join('')}
  </div>`;
}
