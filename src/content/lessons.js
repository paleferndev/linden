// The course: places on Linden Lane, their lessons, and each lesson's steps. Lesson ids are permanent.
//
// A lesson is a list of steps, one screen each:
//   scene     a neighbour says one line; the goal and what you'll be able to say
//   explore   tap the things in the picture       · cards    tap each word or phrase
//   letters / numbers / times                     other ways to meet new words
//   pattern   one pattern, the changing part highlighted, plus a trap
//   stress / soundkey / lettersnote / mouth / teenty / compare / thisthat   a picture that explains one idea
//   listen    hear it, pick what you heard (one tap answers)
//   pick      read it, pick the answer            · build    put the tiles in order
//   match     pair English with Romanian          · talk     a short chat with the neighbour
// A wrong answer comes back two steps later. `ids` names the items a drill trains, for the review schedule.

export const PLACES = [
  { id: 'home', name: 'No. 1', ro: 'Acasă', sub: 'Sunete, litere, numere', who: 'mimi', color: '--b-blue',
    lessons: ['h.known', 'h.sounds', 'h.abc', 'h.spell', 'h.num', 'h.help'] },
  { id: 'kettle', name: 'The Kettle', ro: 'Cafeneaua', sub: 'Saluți, comanzi, plătești', who: 'tom', color: '--b-ochre',
    lessons: ['k.hello', 'k.order', 'k.pay', 'k.polite', 'k.first'] },
  { id: 'shop', name: "Priya's", ro: 'Magazinul din colț', sub: 'Prețuri, numere, cumpărături', who: 'priya', color: '--b-sage',
    lessons: ['p.price', 'p.nums', 'p.this', 'p.bag', 'p.till'] },
  { id: 'bus', name: 'Bus stop', ro: 'Stația', sub: 'Drumuri, ore, bilete', who: 'sam', color: '--pen-soft', soon: true },
  { id: 'no9', name: 'No. 9', ro: 'Vecina', sub: 'Vremea, familia, vorba de vecini', who: 'hughes', color: '--b-rose', soon: true },
  { id: 'office', name: 'The office', ro: 'Serviciul', sub: 'Meserii, program, e-mailuri', who: null, color: '--b-cream', soon: true },
];

// The suggested order. Nothing is locked; "next" is the first lesson in this order that isn't done.
export const COURSE = ['h.known', 'h.sounds', 'k.hello', 'k.order', 'h.abc', 'h.spell', 'k.pay', 'k.polite',
  'h.num', 'h.help', 'k.first', 'p.price', 'p.nums', 'p.this', 'p.bag', 'p.till'];

const L = {};

/* ================================================================ No. 1 */

L['h.known'] = {
  title: 'Engleza pe care o știi deja', goal: 'Zece cuvinte cunoscute, cu sunetul corect.',
  items: ['w.hotel', 'w.taxi', 'w.doctor', 'w.problem', 'w.pizza', 'w.music', 'w.restaurant', 'w.football', 'w.coffee', 'w.internet'],
  can: ['No problem!', 'A coffee, please.'],
  done: 'Zece cuvinte cunoscute, cu accentul corect.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'Pizza, coffee, football, music.', ro: 'Pizza, cafea, fotbal, muzică.' } },
    { t: 'explore', scene: 'room', objects: { taxi: 'w.taxi', music: 'w.music', internet: 'w.internet', pizza: 'w.pizza', coffee: 'w.coffee', football: 'w.football' } },
    { t: 'stress', trap: 'trap.stress', rows: [
      { id: 'w.problem', en: ['PROB', 'lem'], s: 0, ro: ['pro', 'ble', 'mă'], rs: 1 },
      { id: 'w.restaurant', en: ['RES', 'trant'], s: 0, ro: ['res', 'tau', 'rant'], rs: 2 },
      { id: 'w.internet', en: ['IN', 'ter', 'net'], s: 0, ro: ['in', 'ter', 'net'], rs: 2 },
      { id: 'w.hotel', en: ['ho', 'TEL'], s: 1, ro: ['ho', 'tel'], rs: 1 },
    ] },
    { t: 'pick', show: { en: 'restaurant' }, q: 'Cum se pronunță?', lang: 'say', options: ['RES-trănt', 'res-tau-RANT', 'res-TRĂNT', 'RES-tau-rant'], answer: 0,
      why: 'Două silabe, accentul pe prima.', ids: ['w.restaurant'] },
    { t: 'listen', audio: 'doctor', q: 'Ce ai auzit?', options: ['doctor', 'hotel', 'taxi', 'pizza'], answer: 0, ids: ['w.doctor'] },
    { t: 'pick', show: { en: 'hotel' }, q: 'Cum se pronunță?', lang: 'say', options: ['hou-TEL', 'HO-tel', 'ho-TEL', 'hou-TIL'], answer: 0,
      why: 'O-ul devine «ou», accentul rămâne la final.', ids: ['w.hotel'] },
    { t: 'listen', audio: 'football', q: 'Ce ai auzit?', options: ['football', 'music', 'problem', 'internet'], answer: 0, ids: ['w.football'] },
    { t: 'build', ro: 'Nicio problemă!', answer: 'No problem!', extra: ['not', 'the'], ids: ['w.problem'] },
  ],
};

L['h.sounds'] = {
  title: 'Cheia sunetelor', goal: 'Cum citești scrierea «pe românește».',
  items: ['w.this', 'w.that', 'w.think', 'w.cat', 'w.water', 'w.bus'],
  can: ['This is Linden Lane.'],
  done: 'Poți citi scrierea «pe românește» a oricărui cuvânt.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'This is Linden Lane.', ro: 'Aici e Linden Lane.' } },
    { t: 'cards', ids: ['w.this', 'w.that', 'w.think', 'w.cat', 'w.water', 'w.bus'], pics: { 'w.this': 'tt:this', 'w.that': 'tt:that', 'w.cat': 'cat', 'w.water': 'glass', 'w.bus': 'bus', 'w.think': 'thought' } },
    { t: 'soundkey' },
    { t: 'pick', show: { en: 'think' }, q: 'Cum se pronunță?', lang: 'say', options: ['think', 'tinc', 'sinc', 'fink'], answer: 0,
      why: '«th»: vârful limbii între dinți, și sufli.', ids: ['w.think'] },
    { t: 'pick', show: { en: 'this' }, q: 'Cum se pronunță?', lang: 'say', options: ['dhis', 'dis', 'zis', 'tis'], answer: 0,
      why: '«dh»: ca «th», dar cu voce.', ids: ['w.this'] },
    { t: 'listen', audio: 'water', q: 'Ce ai auzit?', options: ['water', 'winter', 'waiter', 'weather'], answer: 0, ids: ['w.water'] },
    { t: 'pick', show: { en: 'doctor' }, q: 'Cum se pronunță?', lang: 'say', options: ['DOC-tăr', 'doc-TOR', 'DOC-tor', 'DOC-țăr'], answer: 0,
      why: 'Silaba neaccentuată devine «ă».', ids: ['w.doctor'] },
    { t: 'match', pairs: [['cat', 'pisică'], ['bus', 'autobuz'], ['water', 'apă'], ['think', 'a crede']], ids: ['w.cat', 'w.bus', 'w.water', 'w.think'] },
  ],
};

L['h.abc'] = {
  title: 'Alfabetul', goal: 'Cum se numesc literele în engleză.',
  items: 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => 'w.l-' + l),
  can: [],
  done: 'Știi cum se numesc literele.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'A, B, C, D, E, F, G.', tts: 'ay, bee, see, dee, ee, ef, gee.', ro: 'A, B, C, D, E, F, G.' } },
    { t: 'letters' },
    { t: 'lettersnote' },
    { t: 'listen', audio: 'w.l-e', q: 'Ce literă ai auzit?', lang: 'letter', options: ['E', 'I', 'A', 'Y'], answer: 0, why: '«ii» e E. I se numește «ai».', ids: ['w.l-e', 'w.l-i'] },
    { t: 'listen', audio: 'w.l-i', q: 'Ce literă ai auzit?', lang: 'letter', options: ['I', 'E', 'Y', 'A'], answer: 0, why: '«ai» e I.', ids: ['w.l-i'] },
    { t: 'listen', audio: 'w.l-g', q: 'Ce literă ai auzit?', lang: 'letter', options: ['G', 'J', 'Z', 'C'], answer: 0, why: '«gii» e G. J se numește «gei».', ids: ['w.l-g', 'w.l-j'] },
    { t: 'listen', audio: 'w.l-a', q: 'Ce literă ai auzit?', lang: 'letter', options: ['A', 'E', 'R', 'H'], answer: 0, why: '«ei» e A.', ids: ['w.l-a'] },
    { t: 'pick', show: { en: 'W' }, q: 'Cum se numește?', lang: 'say', options: ['DA-băl-iu', 'vii', 'uai', 'du-blu-VE'], answer: 0, why: 'W e „doi de U”: «DA-băl-iu».', ids: ['w.l-w'] },
    { t: 'listen', audio: 'w.l-y', q: 'Ce literă ai auzit?', lang: 'letter', options: ['Y', 'I', 'W', 'J'], answer: 0, why: '«uai» e Y.', ids: ['w.l-y'] },
  ],
};

L['h.spell'] = {
  title: 'Se scrie cu…', goal: 'Ceri să ți se spună un cuvânt pe litere.',
  items: ['p.how-spell-that', 'p.how-spell-name', 'w.double', 'p.write-it-down'],
  can: ['How do you spell that?', 'Can you write it down?'],
  done: 'Poți cere să ți se scrie un cuvânt.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'How do you spell that?', ro: 'Cum se scrie?' } },
    { t: 'cards', ids: ['p.how-spell-that', 'p.how-spell-name', 'w.double', 'p.write-it-down'] },
    { t: 'pattern', text: 'How do you spell {}?', ro: 'Cum se scrie {}?', ids: ['p.how-spell-that', 'p.how-spell-name'],
      slots: [{ en: 'that', ro: 'asta' }, { en: 'your name', ro: 'numele tău' }, { en: 'coffee', ro: 'coffee' }],
      hand: 'LL = double L' },
    { t: 'listen', audio: 'tee. ay. ex. eye.', transcript: 'T – A – X – I', q: 'Ce cuvânt ai auzit pe litere?', options: ['taxi', 'taksi', 'toxi', 'taxy'], answer: 0, ids: ['w.l-t', 'w.l-x'] },
    { t: 'listen', audio: 'bee. you. ess.', transcript: 'B – U – S', q: 'Ce cuvânt ai auzit pe litere?', options: ['bus', 'box', 'buzz', 'bis'], answer: 0, ids: ['w.l-b', 'w.l-u'] },
    { t: 'listen', audio: 'see. oh. double ef. double ee.', transcript: 'C – O – double F – double E', q: 'Ce cuvânt ai auzit pe litere?', options: ['coffee', 'cofee', 'coffe', 'cofe'], answer: 0, ids: ['w.double'] },
    { t: 'listen', audio: 'em. eye. em. eye.', transcript: 'M – I – M – I', q: 'Ce nume ai auzit pe litere?', options: ['Mimi', 'Nimi', 'Mini', 'Mimy'], answer: 0, ids: ['w.l-m', 'w.l-i'] },
    { t: 'build', ro: 'Cum se scrie?', answer: 'How do you spell that?', extra: ['write', 'name'], ids: ['p.how-spell-that'] },
  ],
};

L['h.num'] = {
  title: 'Numere 0–10', goal: 'Numeri până la zece.',
  items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => 'w.n-' + n),
  can: [],
  done: 'Numeri până la zece.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'One, two, three, four, five.', ro: 'Unu, doi, trei, patru, cinci.' } },
    { t: 'numbers', from: 0, to: 10 },
    { t: 'mouth', trap: 'trap.three-tree' },
    { t: 'listen', audio: 'three', q: 'Ce număr ai auzit?', lang: 'digit', options: ['3', '2', '8', '0'], answer: 0, ids: ['w.n-3'] },
    { t: 'listen', audio: 'eight', q: 'Ce număr ai auzit?', lang: 'digit', options: ['8', '6', '3', '9'], answer: 0, ids: ['w.n-8'] },
    { t: 'listen', audio: 'five', q: 'Ce număr ai auzit?', lang: 'digit', options: ['5', '9', '4', '1'], answer: 0, ids: ['w.n-5'] },
    { t: 'pick', show: { digit: '7' }, q: 'Cum se spune?', lang: 'en', options: ['seven', 'eleven', 'six', 'nine'], answer: 0, ids: ['w.n-7'] },
    { t: 'match', pairs: [['one', '1'], ['two', '2'], ['four', '4'], ['ten', '10']], right: 'digit', ids: ['w.n-1', 'w.n-2', 'w.n-4', 'w.n-10'] },
  ],
};

L['h.help'] = {
  title: '„Nu înțeleg”', goal: 'Ce spui când nu înțelegi.',
  items: ['p.dont-understand', 'p.repeat', 'p.slowly', 'p.what-does-mean', 'p.how-say', 'p.im-learning', 'p.speak-romanian', 'p.no-english'],
  can: ["Sorry, I don't understand.", 'More slowly, please.'],
  done: 'Știi ce să spui când nu înțelegi.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: "Sorry, I don't understand.", ro: 'Scuze, nu înțeleg.' } },
    { t: 'cards', ids: ['p.dont-understand', 'p.repeat', 'p.slowly', 'p.what-does-mean'] },
    { t: 'cards', ids: ['p.how-say', 'p.im-learning', 'p.speak-romanian', 'p.no-english'] },
    { t: 'pattern', text: 'Can you {}, please?', ro: 'Poți {}, te rog?', ids: ['p.repeat', 'p.write-it-down'],
      slots: [{ en: 'repeat that', ro: 'repeta' }, { en: 'speak more slowly', ro: 'vorbi mai rar' }, { en: 'write it down', ro: 'să scrii' }, { en: 'spell that', ro: 'spune pe litere' }],
      hand: 'Can you…, please? = o rugăminte politicoasă' },
    { t: 'pick', show: { ro: 'Scuze, nu înțeleg.' }, q: 'Cum spui în engleză?', lang: 'en',
      options: ["Sorry, I don't understand.", "Sorry, I not understand.", "Sorry, I no understand.", "Sorry, I don't understanding."], answer: 0,
      why: 'Nu se face cu don\'t: I don\'t understand.', ids: ['p.dont-understand'] },
    { t: 'listen', audio: 'More slowly, please.', q: 'Ce înseamnă?', lang: 'ro', options: ['Mai rar, te rog.', 'Mai tare, te rog.', 'Încă o dată, te rog.', 'Mai încet, te rog.'], answer: 0, ids: ['p.slowly'] },
    { t: 'build', ro: 'Învăț engleză.', answer: "I'm learning English.", extra: ['learn', 'the'], ids: ['p.im-learning'] },
    { t: 'talk', who: 'hughes', script: [
      { them: "Oh, hello! Lovely weather for the time of year, isn't it?", ro: 'O, bună! Ce vreme frumoasă pentru perioada asta, nu?', replies: [
        { en: "Sorry, I don't understand.", ok: true, next: 1 },
        { en: 'Yes.', ok: false, after: "Isn't it just! Anyway, as I was saying…", aro: 'Nu-i așa! În fine, cum spuneam…', coach: 'Dacă n-ai înțeles, spune: „Sorry, I don\'t understand.”' },
      ] },
      { them: 'Oh, sorry! The weather is very nice today.', ro: 'O, pardon! Vremea e foarte frumoasă azi.', replies: [
        { en: 'More slowly, please.', ok: true, after: 'The. Weather. Is. Nice.', aro: 'Vremea. E. Frumoasă.', next: 2 },
        { en: 'Can you repeat that, please?', ok: true, after: 'The weather is very nice today.', aro: 'Vremea e foarte frumoasă azi.', next: 2 },
      ] },
      { them: 'Are you new on the street?', ro: 'Ești nou pe stradă?', replies: [
        { en: "Yes. I'm learning English.", ok: true, next: 3 },
        { en: 'What does that mean?', ok: true, stay: true, after: 'New. You just moved here?', aro: 'Nou. Abia te-ai mutat aici?' },
      ] },
      { them: 'Wonderful! Welcome to Linden Lane.', ro: 'Minunat! Bine ai venit pe Linden Lane.', end: true },
    ] },
  ],
};

/* ================================================================ The Kettle */

L['k.hello'] = {
  title: 'Salut și la revedere', goal: 'Saluți potrivit la orice oră și pleci frumos.',
  items: ['w.hello', 'w.hi', 'p.good-morning', 'p.good-afternoon', 'p.good-evening', 'p.good-night', 'w.goodbye', 'w.bye',
    'p.see-you-later', 'p.see-you-tomorrow', 'p.how-are-you', 'p.im-fine-thanks', 'p.and-you', 'p.not-bad'],
  can: ["I'm fine, thanks. And you?", 'See you tomorrow!'],
  done: 'Saluți potrivit la orice oră.',
  steps: [
    { t: 'scene', scene: 'cafe', line: { en: 'Morning! How are you?', ro: 'Bună dimineața! Ce mai faci?' } },
    { t: 'cards', ids: ['w.hello', 'w.hi', 'w.goodbye', 'w.bye', 'p.see-you-later', 'p.see-you-tomorrow'] },
    { t: 'times', trap: 'trap.good-night' },
    { t: 'pattern', text: "I'm {}, thanks. And you?", ro: 'Sunt {}, mulțumesc. Tu?', ids: ['p.im-fine-thanks', 'p.and-you'],
      slots: [{ en: 'fine', ro: 'bine' }, { en: 'OK', ro: 'ok' }, { en: 'great', ro: 'super' }, { en: 'tired', ro: 'obosit' }],
      trap: 'trap.how-are-you' },
    { t: 'pick', show: { ro: 'Pleci seara de la cineva. Ce spui?' }, q: 'Alege:', lang: 'en', options: ['Good night!', 'Good evening!', 'Good morning!', 'Good afternoon!'], answer: 0,
      why: 'Good evening e când ajungi. La plecare, seara: good night.', ids: ['p.good-night'] },
    { t: 'listen', audio: 'See you tomorrow.', q: 'Ce înseamnă?', lang: 'ro', options: ['Ne vedem mâine.', 'Pe mai târziu.', 'La revedere.', 'Noapte bună.'], answer: 0, ids: ['p.see-you-tomorrow'] },
    { t: 'pick', show: { ro: 'Intri în cafenea la ora 19. Ce spui?' }, q: 'Alege:', lang: 'en', options: ['Good evening!', 'Good night!', 'Good morning!', 'Goodbye!'], answer: 0,
      why: 'Seara, când ajungi: good evening.', ids: ['p.good-evening'] },
    { t: 'build', ro: 'Bine, mulțumesc. Tu?', answer: "I'm fine, thanks. And you?", extra: ['am', 'tired'], ids: ['p.im-fine-thanks', 'p.and-you'] },
    { t: 'talk', script: [
      { them: 'Morning! How are you?', ro: 'Bună dimineața! Ce mai faci?', replies: [
        { en: "I'm fine, thanks. And you?", ok: true, next: 1 },
        { en: "I'm fine.", ok: false, after: 'Good, good.', aro: 'Bine, bine.', coach: 'Merge, dar întreabă și tu: „And you?”' },
        { en: 'Good night!', ok: false, after: "Night? It's eight in the morning!", aro: 'Noapte? E opt dimineața!', coach: 'Good night e doar la plecare, seara. Dimineața: good morning.' },
      ] },
      { them: "Not bad, thanks. Here's your tea.", ro: 'Nu-i rău, mersi. Poftim ceaiul.', replies: [
        { en: 'Thanks! See you tomorrow.', ok: true, next: 2 },
        { en: 'Thanks! Goodbye.', ok: true, next: 2 },
        { en: 'Thanks! Good night.', ok: false, after: 'Good night? At this hour?', aro: 'Noapte bună? La ora asta?', coach: 'Dimineața pleci cu bye sau see you later.' },
      ] },
      { them: 'Bye! Have a good day.', ro: 'Pa! O zi bună.', end: true },
    ] },
  ],
};

L['k.order'] = {
  title: 'Comanzi ceva de băut', goal: 'Ceri politicos un ceai sau o cafea.',
  items: ['w.teapot', 'w.tea', 'w.croissant', 'w.sugar', 'w.coffee', 'w.milk', 'p.can-i-have', 'p.just-milk', 'p.with-milk'],
  can: ['Can I have a tea, please?', 'Just milk, please.'],
  done: 'Poți comanda un ceai sau o cafea.',
  steps: [
    { t: 'scene', scene: 'cafe', line: { en: 'Morning! What can I get you?', ro: 'Bună dimineața! Ce vă servesc?' } },
    { t: 'explore', scene: 'cafe', objects: { teapot: 'w.teapot', tea: 'w.tea', croissant: 'w.croissant', sugar: 'w.sugar', coffee: 'w.coffee', milk: 'w.milk' } },
    { t: 'pattern', text: 'Can I have {}, please?', ro: 'Pot să iau {}, vă rog?', ids: ['p.can-i-have'],
      slots: [{ en: 'a tea', ro: 'un ceai', pic: 'cafe:tea' }, { en: 'a coffee', ro: 'o cafea', pic: 'cafe:coffee' }, { en: 'a croissant', ro: 'un croissant', pic: 'cafe:croissant' }, { en: 'some milk', ro: 'niște lapte', pic: 'cafe:milk' }],
      hand: 'please la final = politicos', trap: 'trap.give-me' },
    { t: 'listen', audio: 'Hi! Can I have a coffee and a croissant, please?', q: 'Ce cere clientul?', answer: 1,
      options: [{ pics: ['cafe:tea', 'cafe:croissant'], cap: 'a tea + a croissant' }, { pics: ['cafe:coffee', 'cafe:croissant'], cap: 'a coffee + a croissant' }, { pics: ['cafe:coffee', 'cafe:sugar'], cap: 'a coffee + sugar' }],
      why: ['A cerut a coffee, nu a tea.', '', 'A mai cerut ceva: a croissant.'], ids: ['w.coffee', 'w.croissant'] },
    { t: 'pick', show: { ro: 'Doar lapte, vă rog.' }, q: 'Cum spui în engleză?', lang: 'en', options: ['Just milk, please.', 'Only milk, please.', 'Just milk, thanks you.', 'Milk only, please me.'], answer: 0,
      why: '„Doar” se spune just.', ids: ['p.just-milk'] },
    { t: 'build', ro: 'Pot să iau un ceai cu lapte, vă rog?', answer: 'Can I have a tea with milk, please?', extra: ['Give', 'me'], ids: ['p.can-i-have', 'p.with-milk'],
      why: 'Give me sună a poruncă.' },
    { t: 'talk', script: [
      { them: 'Morning! What can I get you?', ro: 'Bună dimineața! Ce vă servesc?', replies: [
        { en: 'Can I have a tea, please?', ok: true, next: 1 },
        { en: 'Give me a tea.', ok: false, after: 'Er… sure.', aro: 'Ăă… sigur.', coach: 'Merge, dar sună a ordin. Încearcă „Can I have…, please?”' },
        { en: 'I am a tea.', ok: false, after: 'Ha! Nice to meet you, Tea.', aro: 'Ha! Încântat de cunoștință, Ceai.', coach: 'I am înseamnă „eu sunt”. Tocmai i-ai spus că ești un ceai.' },
      ] },
      { them: 'Sure. Milk and sugar?', ro: 'Sigur. Lapte și zahăr?', replies: [
        { en: 'Just milk, please.', ok: true, after: 'Just milk. Lovely.', aro: 'Doar lapte. Perfect.', next: 2 },
        { en: 'Yes, please.', ok: true, after: 'Milk and sugar it is.', aro: 'Deci lapte și zahăr.', next: 2 },
        { en: 'No, thanks.', ok: true, after: 'Just as it comes, then.', aro: 'Simplu, atunci.', next: 2 },
      ] },
      { them: "That's two pounds forty.", ro: 'Face două lire și patruzeci.', replies: [
        { en: 'Here you go. Thanks!', ok: true, next: 3 },
        { en: 'Sorry, how much?', ok: true, stay: true, after: 'Two forty. Two pounds forty.', aro: 'Două patruzeci. Două lire și patruzeci.' },
      ] },
      { them: 'Thank you! Have a lovely day.', ro: 'Mulțumesc! O zi frumoasă!', end: true },
    ] },
  ],
};

L['k.pay'] = {
  title: 'Plătești', goal: 'Înțelegi prețul și plătești cu cardul sau cash.',
  items: ['w.menu', 'w.bill', 'w.card', 'w.cash', 'w.change', 'w.receipt', 'p.how-much', 'p.by-card', 'p.the-bill', 'p.here-you-go', 'w.pound'],
  can: ['Can I pay by card?', 'Can I have the bill, please?'],
  done: 'Poți plăti la cafenea.',
  steps: [
    { t: 'scene', scene: 'cafe', set: 'pay', line: { en: "That's two pounds forty, please.", ro: 'Face două lire și patruzeci, vă rog.' } },
    { t: 'explore', scene: 'cafe', set: 'pay', objects: { menu: 'w.menu', bill: 'w.bill', card: 'w.card', cash: 'w.cash', change: 'w.change', receipt: 'w.receipt' } },
    { t: 'pattern', text: 'Can I pay {}?', ro: 'Pot să plătesc {}?', ids: ['p.by-card'],
      slots: [{ en: 'by card', ro: 'cu cardul', pic: 'cafe-pay:card' }, { en: 'in cash', ro: 'cash', pic: 'cafe-pay:cash' }],
      trap: 'trap.note-bill' },
    { t: 'listen', audio: "That's two pounds forty.", q: 'Cât ai de plată?', lang: 'price', options: ['£2.40', '£4.20', '£2.14', '£12.40'], answer: 0,
      why: 'Two pounds forty: 2 lire și 40 de pence.', ids: ['w.pound'] },
    { t: 'listen', audio: "It's one pound ninety.", q: 'Cât costă?', lang: 'price', options: ['£1.90', '£9.10', '£1.19', '£19.00'], answer: 0, ids: ['w.pound'] },
    { t: 'pick', show: { ro: 'Nota, vă rog.' }, q: 'Cum spui în engleză?', lang: 'en',
      options: ['Can I have the bill, please?', 'Can I have the note, please?', 'Give me the bill.', 'How much is the note?'], answer: 0,
      why: 'Nota de plată e the bill. Note e o bancnotă.', ids: ['p.the-bill', 'w.bill'] },
    { t: 'build', ro: 'Pot să plătesc cu cardul?', answer: 'Can I pay by card?', extra: ['with', 'the'], ids: ['p.by-card'] },
    { t: 'talk', script: [
      { them: "That's two pounds forty, please.", ro: 'Face două lire și patruzeci, vă rog.', replies: [
        { en: 'Can I pay by card?', ok: true, next: 1 },
        { en: 'Sorry, how much?', ok: true, stay: true, after: 'Two pounds forty.', aro: 'Două lire și patruzeci.' },
        { en: 'How much costs it?', ok: false, after: 'Two forty.', aro: 'Două patruzeci.', coach: 'Se întreabă „How much is it?”. Și Tom ți-a spus deja prețul.' },
      ] },
      { them: 'Of course. Just tap here.', ro: 'Sigur. Apropiați cardul aici.', replies: [
        { en: 'Thanks! Can I have a receipt, please?', ok: true, next: 2 },
        { en: 'Thanks!', ok: true, next: 2 },
      ] },
      { them: 'There you go. Have a lovely day!', ro: 'Poftiți. O zi frumoasă!', end: true },
    ] },
  ],
};

L['k.polite'] = {
  title: 'Te rog, mulțumesc, scuze', goal: 'Cuvintele care te fac politicos oriunde.',
  items: ['w.please', 'p.thank-you', 'w.thanks', 'p.youre-welcome', 'w.sorry', 'p.excuse-me', 'w.yes', 'w.no'],
  can: ['Excuse me, can I have some sugar?', 'Thank you!'],
  done: 'Știi când spui please, thank you, sorry și excuse me.',
  steps: [
    { t: 'scene', scene: 'cafe', line: { en: 'Here you go. Anything else?', ro: 'Poftiți. Altceva?' } },
    { t: 'cards', ids: ['w.please', 'p.thank-you', 'w.thanks', 'p.youre-welcome'] },
    { t: 'cards', ids: ['w.sorry', 'p.excuse-me', 'w.yes', 'w.no'] },
    { t: 'compare', trap: 'trap.excuse-sorry' },
    { t: 'pick', show: { ro: 'Vrei să întrebi ceva un străin. Cum începi?' }, q: 'Alege:', lang: 'en', options: ['Excuse me, …', 'Sorry, …', 'Please, …', 'Thank you, …'], answer: 0,
      why: 'Ca să atragi atenția: excuse me.', ids: ['p.excuse-me'] },
    { t: 'listen', audio: "You're welcome.", q: 'Ce înseamnă?', lang: 'ro', options: ['Cu plăcere.', 'Bine ai venit.', 'Mulțumesc.', 'Nu, mulțumesc.'], answer: 0,
      why: "You're welcome e răspunsul la thank you. „Bine ai venit” e welcome.", ids: ['p.youre-welcome'] },
    { t: 'pick', show: { ro: 'Nu, mulțumesc.' }, q: 'Cum spui în engleză?', lang: 'en', options: ['No, thank you.', 'Not, thank you.', 'No, thanks you.', 'Now, thank you.'], answer: 0, ids: ['w.no', 'p.thank-you'] },
    { t: 'build', ro: 'Nu vă supărați, unde e hotelul?', answer: 'Excuse me, where is the hotel?', extra: ['Sorry', 'a'], ids: ['p.excuse-me'] },
    { t: 'talk', script: [
      { them: "Here's your tea.", ro: 'Poftim ceaiul.', replies: [
        { en: 'Thank you!', ok: true, next: 1 },
        { en: 'Sorry!', ok: false, after: 'Sorry? What for?', aro: 'Scuze? Pentru ce?', coach: 'Sorry e când ai greșit ceva. Aici mulțumești.' },
        { en: "You're welcome.", ok: false, after: 'Ha! That’s my line.', aro: 'Ha! Asta e replica mea.', coach: "You're welcome răspunde el, după ce îi mulțumești." },
      ] },
      { them: "You're welcome!", ro: 'Cu plăcere!', coach: 'Tom s-a întors cu spatele. Vrei zahăr.', replies: [
        { en: 'Excuse me, can I have some sugar?', ok: true, next: 2 },
        { en: 'Sorry, can I have some sugar?', ok: false, after: 'Oh! Yes, sure.', aro: 'O! Da, sigur.', coach: 'Merge, dar ca să atragi atenția se spune excuse me.' },
        { en: 'Give me sugar.', ok: false, after: 'Er… OK.', aro: 'Ăă… bine.', coach: 'Sună a ordin. „Excuse me, can I have some sugar?”' },
      ] },
      { them: 'Of course. Here you go.', ro: 'Sigur. Poftiți.', replies: [
        { en: 'Thanks!', ok: true, next: 3 },
        { en: 'Please.', ok: false, after: 'Please…?', aro: 'Vă rog…?', coach: 'Please e când ceri. Când primești: thanks.' },
      ] },
      { them: 'No problem!', ro: 'Nicio problemă!', end: true },
    ] },
  ],
};

L['k.first'] = {
  title: 'Dialog: prima ta cafea', goal: 'Tot ce ai învățat la The Kettle, într-o singură comandă.',
  items: ['w.name', 'w.i-am', 'p.whats-your-name', 'p.my-name-is', 'p.nice-to-meet-you', 'p.nice-to-meet-you-too'],
  can: ["I'm {name}.", 'Nice to meet you.'],
  done: 'Ai comandat, te-ai prezentat și ai plătit, în engleză.',
  steps: [
    { t: 'scene', scene: 'cafe', line: { en: "Hi! What's your name?", ro: 'Salut! Cum te cheamă?' } },
    { t: 'cards', ids: ['w.name', 'w.i-am', 'p.whats-your-name', 'p.my-name-is', 'p.nice-to-meet-you'] },
    { t: 'pattern', text: '{} {name}.', ro: '{} {name}.', ids: ['p.my-name-is', 'w.i-am'],
      slots: [{ en: "I'm", ro: 'Sunt' }, { en: 'My name is', ro: 'Mă numesc' }],
      hand: "I'm = I am" },
    { t: 'listen', audio: "What's your name?", q: 'Ce te-a întrebat?', lang: 'ro', options: ['Cum te cheamă?', 'De unde ești?', 'Ce mai faci?', 'Ce vrei să comanzi?'], answer: 0, ids: ['p.whats-your-name'] },
    { t: 'pick', show: { en: 'Nice to meet you.' }, q: 'Ce răspunzi?', lang: 'en', options: ['Nice to meet you too.', 'Thank you very much.', 'See you tomorrow.', 'How do you spell that?'], answer: 0, ids: ['p.nice-to-meet-you-too'] },
    { t: 'build', ro: 'Îmi pare bine.', answer: 'Nice to meet you.', extra: ['see', 'me'], ids: ['p.nice-to-meet-you'] },
    { t: 'talk', script: [
      { them: 'Morning! What can I get you?', ro: 'Bună dimineața! Ce vă servesc?', replies: [
        { en: 'Can I have a coffee, please?', ok: true, next: 1 },
        { en: 'Give me a coffee.', ok: false, after: 'Er… right.', aro: 'Ăă… bine.', coach: 'Mai politicos: „Can I have a coffee, please?”' },
      ] },
      { them: "Sure. What's your name? It's for the cup.", ro: 'Sigur. Cum te cheamă? E pentru pahar.', replies: [
        { en: "I'm {name}.", ok: true, next: 2 },
        { en: 'My name is {name}.', ok: true, next: 2 },
        { en: 'Nice to meet you.', ok: false, after: 'Nice to meet you too! And your name is…?', aro: 'Îmi pare bine și mie! Și te cheamă…?', coach: 'Mai întâi îți spui numele.' },
      ] },
      { them: "Nice to meet you, {name}. I'm Tom.", ro: 'Îmi pare bine, {name}. Eu sunt Tom.', replies: [
        { en: 'Nice to meet you too.', ok: true, next: 3 },
        { en: 'Thank you.', ok: false, after: 'Ha, you’re welcome.', aro: 'Ha, cu plăcere.', coach: 'La „Nice to meet you” răspunzi „Nice to meet you too.”' },
      ] },
      { them: "That's two pounds eighty.", ro: 'Face două lire și optzeci.', replies: [
        { en: 'Can I pay by card?', ok: true, next: 4 },
        { en: 'Here you go.', ok: true, next: 4 },
      ] },
      { them: "Thanks! Here's your coffee, {name}.", ro: 'Mersi! Poftim cafeaua, {name}.', replies: [
        { en: 'Thank you! See you tomorrow.', ok: true, next: 5 },
        { en: 'Good night!', ok: false, after: 'Night? It’s the morning!', aro: 'Noapte? E dimineață!', coach: 'Good night e la plecare, seara.' },
      ] },
      { them: 'See you tomorrow!', ro: 'Ne vedem mâine!', end: true },
    ] },
  ],
};

/* ================================================================ Priya's */

L['p.price'] = {
  title: 'Cât costă?', goal: 'Întrebi prețul pentru un lucru sau pentru mai multe.',
  items: ['w.bread', 'w.apples', 'w.bananas', 'w.eggs', 'w.water', 'w.newspaper', 'p.how-much-is', 'p.how-much-are'],
  can: ['How much is the bread?', 'How much are the apples?'],
  done: 'Poți întreba cât costă orice.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: 'Hi there! Can I help you?', ro: 'Bună! Vă pot ajuta?' } },
    { t: 'explore', scene: 'shop', objects: { bread: 'w.bread', apples: 'w.apples', bananas: 'w.bananas', eggs: 'w.eggs', water: 'w.water', newspaper: 'w.newspaper' } },
    { t: 'pattern', text: 'How much {}?', ro: 'Cât costă {}?', ids: ['p.how-much-is', 'p.how-much-are'],
      slots: [{ en: 'is the bread', ro: 'pâinea', pic: 'shop:bread' }, { en: 'are the apples', ro: 'merele', pic: 'shop:apples' }, { en: 'is the newspaper', ro: 'ziarul', pic: 'shop:newspaper' }, { en: 'are the eggs', ro: 'ouăle', pic: 'shop:eggs' }],
      hand: 'un lucru: is · mai multe: are', trap: 'trap.how-much-costs' },
    { t: 'listen', audio: 'How much are the bananas?', q: 'Despre ce întreabă?', answer: 0,
      options: [{ pics: ['shop:bananas'], cap: 'bananas' }, { pics: ['shop:apples'], cap: 'apples' }, { pics: ['shop:bread'], cap: 'bread' }], ids: ['w.bananas'] },
    { t: 'pick', show: { ro: 'Cât costă ziarul?' }, q: 'Cum spui în engleză?', lang: 'en',
      options: ['How much is the newspaper?', 'How much are the newspaper?', 'How much costs the newspaper?', 'How many is the newspaper?'], answer: 0,
      why: 'Un singur ziar: is.', ids: ['p.how-much-is', 'w.newspaper'] },
    { t: 'listen', audio: "They're one pound twenty.", q: 'Cât costă?', lang: 'price', options: ['£1.20', '£1.02', '£12.00', '£2.10'], answer: 0, ids: ['w.pound'] },
    { t: 'build', ro: 'Cât costă ouăle?', answer: 'How much are the eggs?', extra: ['is', 'costs'], ids: ['p.how-much-are', 'w.eggs'], why: 'Ouăle sunt mai multe: are.' },
    { t: 'talk', script: [
      { them: 'Hi there! Can I help you?', ro: 'Bună! Vă pot ajuta?', replies: [
        { en: 'How much is the bread?', ok: true, next: 1 },
        { en: 'How much costs the bread?', ok: false, after: 'The bread? One pound fifty.', aro: 'Pâinea? O liră cincizeci.', coach: 'Spune „How much is…?”. Costs nu intră aici.' },
      ] },
      { them: "It's one pound fifty.", ro: 'O liră și cincizeci.', replies: [
        { en: 'And how much are the apples?', ok: true, next: 2 },
        { en: 'And how much is the apples?', ok: false, after: 'The apples? Two pounds a bag.', aro: 'Merele? Două lire punga.', coach: 'Merele sunt mai multe: are.' },
      ] },
      { them: 'Two pounds a bag.', ro: 'Două lire punga.', replies: [
        { en: 'The bread, please.', ok: true, next: 3 },
        { en: 'The apples, please.', ok: true, next: 3 },
      ] },
      { them: 'Lovely. Anything else?', ro: 'Bun. Altceva?', end: true },
    ] },
  ],
};

L['p.nums'] = {
  title: 'Numere 11–100', goal: 'Auzi diferența dintre fifteen și fifty.',
  items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(n => 'w.n-' + n),
  can: ['Sorry, fifteen or fifty?'],
  done: 'Numeri până la o sută.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: "That's fifteen pounds, please.", ro: 'Face cincisprezece lire, vă rog.' } },
    { t: 'numbers', from: 11, to: 20 },
    { t: 'teenty', trap: 'trap.teen-ty' },
    { t: 'listen', audio: 'fifteen', q: 'Ce număr ai auzit?', lang: 'digit', options: ['15', '50', '5', '51'], answer: 0, why: 'fifTEEN, cu accentul la final: 15.', ids: ['w.n-15'] },
    { t: 'listen', audio: 'forty', q: 'Ce număr ai auzit?', lang: 'digit', options: ['40', '14', '4', '44'], answer: 0, why: 'FORty, cu accentul la început: 40.', ids: ['w.n-40'] },
    { t: 'listen', audio: 'seventeen', q: 'Ce număr ai auzit?', lang: 'digit', options: ['17', '70', '7', '71'], answer: 0, why: 'seventEEN, cu accentul la final: 17.', ids: ['w.n-17'] },
    { t: 'pick', show: { digit: '12' }, q: 'Cum se spune?', lang: 'en', options: ['twelve', 'twenty', 'eleven', 'two'], answer: 0, ids: ['w.n-12'] },
    { t: 'listen', audio: 'a hundred', q: 'Ce număr ai auzit?', lang: 'digit', options: ['100', '1000', '10', '110'], answer: 0, ids: ['w.n-100'] },
    { t: 'talk', script: [
      { them: "That's fifteen pounds, please.", ro: 'Face cincisprezece lire, vă rog.', replies: [
        { en: 'Sorry, fifteen or fifty?', ok: true, next: 1 },
        { en: 'Here you go. Fifty.', ok: false, after: 'Fifty? No, no. Fifteen! One, five.', aro: 'Cincizeci? Nu, nu. Cincisprezece! Unu, cinci.', coach: 'Dacă nu ești sigur, întreabă: „Fifteen or fifty?”' },
      ] },
      { them: 'Fifteen. One, five.', ro: 'Cincisprezece. Unu, cinci.', replies: [
        { en: 'Here you go. Twenty.', ok: true, next: 2 },
        { en: 'Can I pay by card?', ok: true, next: 3 },
      ] },
      { them: 'Thanks. And five pounds change.', ro: 'Mersi. Și cinci lire rest.', replies: [{ en: 'Thank you!', ok: true, next: 4 }] },
      { them: 'Of course. Just tap here.', ro: 'Sigur. Apropiați cardul.', replies: [{ en: 'Thank you!', ok: true, next: 4 }] },
      { them: 'Thank you! Bye!', ro: 'Mulțumesc! Pa!', end: true },
    ] },
  ],
};

L['p.this'] = {
  title: 'This și that', goal: 'Arăți ce vrei: acesta de aici sau acela de acolo.',
  items: ['w.this', 'w.that', 'p.this-one', 'p.that-one', 'p.which-one'],
  can: ['That one, please.', 'Can I have this one, please?'],
  done: 'Poți arăta ce vrei, fără să știi cum se numește.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: 'Which one?', ro: 'Care?' } },
    { t: 'thisthat' },
    { t: 'pattern', text: 'Can I have {}, please?', ro: 'Pot să iau {}, vă rog?', ids: ['p.this-one', 'p.that-one'],
      slots: [{ en: 'this one', ro: 'acesta', pic: 'tt:this' }, { en: 'that one', ro: 'acela', pic: 'tt:that' }],
      hand: 'this = aici · that = acolo' },
    { t: 'listen', audio: 'That one, please.', q: 'Pe care îl vrea?', answer: 0,
      options: [{ pics: ['tt:that'], cap: 'acela, de acolo' }, { pics: ['tt:this'], cap: 'acesta, de aici' }], ids: ['p.that-one'] },
    { t: 'pick', show: { ro: 'Pe acela, vă rog.' }, q: 'Cum spui în engleză?', lang: 'en', options: ['That one, please.', 'This one, please.', 'That, please, one.', 'The one, please.'], answer: 0, ids: ['p.that-one'] },
    { t: 'listen', audio: 'Which one?', q: 'Ce te-a întrebat?', lang: 'ro', options: ['Care?', 'Cât costă?', 'Altceva?', 'Unde?'], answer: 0, ids: ['p.which-one'] },
    { t: 'build', ro: 'Pot să iau acesta, vă rog?', answer: 'Can I have this one, please?', extra: ['that', 'Give'], ids: ['p.this-one'] },
    { t: 'talk', script: [
      { them: 'Which chocolate would you like?', ro: 'Ce ciocolată doriți?', replies: [
        { en: 'That one, please.', ok: true, next: 1 },
        { en: 'Give me that.', ok: false, after: 'Er… this one?', aro: 'Ăă… asta?', coach: 'Mai politicos: „That one, please.”' },
      ] },
      { them: 'This one here?', ro: 'Asta de aici?', replies: [
        { en: 'No, sorry. That one.', ok: true, next: 2 },
        { en: 'Yes, please.', ok: true, next: 2 },
      ] },
      { them: 'Here you go. Anything else?', ro: 'Poftiți. Altceva?', end: true },
    ] },
  ],
};

L['p.bag'] = {
  title: 'O pungă, vă rog', goal: 'Întrebi dacă au ceva și termini cumpărăturile.',
  items: ['w.bag', 'w.basket', 'w.chocolate', 'w.milk', 'w.receipt', 'w.change', 'p.do-you-have', 'p.anything-else', 'p.thats-all', 'p.need-a-bag'],
  can: ['Do you have any milk?', "That's all, thanks."],
  done: 'Poți întreba dacă au ceva și poți încheia cumpărăturile.',
  steps: [
    { t: 'scene', scene: 'shop', set: 'bag', line: { en: 'Anything else?', ro: 'Altceva?' } },
    { t: 'explore', scene: 'shop', set: 'bag', objects: { bag: 'w.bag', basket: 'w.basket', chocolate: 'w.chocolate', milk: 'w.milk', receipt: 'w.receipt', change: 'w.change' } },
    { t: 'pattern', text: 'Do you have {}?', ro: 'Aveți {}?', ids: ['p.do-you-have'],
      slots: [{ en: 'any milk', ro: 'lapte', pic: 'shop-bag:milk' }, { en: 'any bread', ro: 'pâine', pic: 'shop:bread' }, { en: 'any eggs', ro: 'ouă', pic: 'shop:eggs' }],
      trap: 'trap.do-you-have' },
    { t: 'listen', audio: 'Do you need a bag?', q: 'Ce te-a întrebat?', lang: 'ro', options: ['Vă trebuie o pungă?', 'Aveți o pungă?', 'Cât costă punga?', 'Altceva?'], answer: 0, ids: ['p.need-a-bag', 'w.bag'] },
    { t: 'pick', show: { ro: 'Asta e tot, mulțumesc.' }, q: 'Cum spui în engleză?', lang: 'en', options: ["That's all, thanks.", "It's all, thanks.", 'This is all, please.', "That's everything, thanks you."], answer: 0, ids: ['p.thats-all'] },
    { t: 'build', ro: 'Aveți ciocolată?', answer: 'Do you have any chocolate?', extra: ['You', 'is'], ids: ['p.do-you-have', 'w.chocolate'], why: 'Întrebarea începe cu do.' },
    { t: 'talk', script: [
      { them: 'Anything else?', ro: 'Altceva?', replies: [
        { en: 'Do you have any milk?', ok: true, next: 1 },
        { en: 'You have milk?', ok: false, after: 'Milk? Yes, in the fridge.', aro: 'Lapte? Da, în frigider.', coach: 'Întrebarea începe cu do: „Do you have any milk?”' },
      ] },
      { them: 'Yes, in the fridge. Anything else?', ro: 'Da, în frigider. Altceva?', replies: [
        { en: "No, that's all, thanks.", ok: true, next: 2 },
      ] },
      { them: 'Do you need a bag?', ro: 'Vă trebuie o pungă?', replies: [
        { en: 'Yes, please.', ok: true, next: 3 },
        { en: 'No, thanks.', ok: true, next: 3 },
      ] },
      { them: 'Lovely. Have a nice day!', ro: 'Perfect. O zi bună!', end: true },
    ] },
  ],
};

L['p.till'] = {
  title: 'Dialog: la casă', goal: 'Tot ce ai învățat la Priya’s, într-o singură vizită.',
  items: ['p.keep-the-change', 'p.have-a-nice-day'],
  can: ['Keep the change.', 'Have a nice day!'],
  done: 'Ai făcut cumpărături de la cap la coadă, în engleză.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: 'Hello again! Can I help you?', ro: 'Bună din nou! Vă pot ajuta?' } },
    { t: 'cards', ids: ['p.anything-else', 'p.keep-the-change', 'p.have-a-nice-day', 'w.receipt'] },
    { t: 'listen', audio: "That's six pounds twenty.", q: 'Cât ai de plată?', lang: 'price', options: ['£6.20', '£2.60', '£60.20', '£6.02'], answer: 0, ids: ['w.pound'] },
    { t: 'pick', show: { ro: 'Păstrați restul.' }, q: 'Cum spui în engleză?', lang: 'en', options: ['Keep the change.', 'Keep the rest.', 'Stay the change.', 'Hold the rest.'], answer: 0,
      why: 'Restul de bani e the change.', ids: ['p.keep-the-change'] },
    { t: 'match', pairs: [['bread', 'pâine'], ['eggs', 'ouă'], ['bag', 'pungă'], ['change', 'rest']], ids: ['w.bread', 'w.eggs', 'w.bag', 'w.change'] },
    { t: 'talk', script: [
      { them: 'Hello again! Can I help you?', ro: 'Bună din nou! Vă pot ajuta?', replies: [
        { en: 'Do you have any eggs?', ok: true, next: 1 },
        { en: 'Give me eggs.', ok: false, after: 'Eggs? Right here.', aro: 'Ouă? Chiar aici.', coach: 'Mai politicos: „Do you have any eggs?”' },
      ] },
      { them: 'Yes, right here. Anything else?', ro: 'Da, chiar aici. Altceva?', replies: [
        { en: 'How much is the bread?', ok: true, next: 2 },
        { en: "No, that's all, thanks.", ok: true, next: 3 },
      ] },
      { them: 'One pound fifty.', ro: 'O liră cincizeci.', replies: [
        { en: 'The bread too, please.', ok: true, next: 3 },
      ] },
      { them: "That's six pounds twenty. Do you need a bag?", ro: 'Face șase lire douăzeci. Vă trebuie o pungă?', replies: [
        { en: 'No, thanks.', ok: true, next: 4 },
        { en: 'Yes, please.', ok: true, next: 4 },
      ] },
      { them: 'Six twenty, then.', ro: 'Șase douăzeci, atunci.', replies: [
        { en: 'Here you go. Keep the change.', ok: true, next: 5 },
        { en: 'Can I pay by card?', ok: true, next: 5 },
      ] },
      { them: 'Thank you! Have a nice day!', ro: 'Mulțumesc! O zi bună!', end: true },
    ] },
  ],
};

export const LESSONS = L;
for (const p of PLACES) (p.lessons || []).forEach((id, i) => Object.assign(L[id], { id, place: p.id, index: i }));

export const place = id => PLACES.find(p => p.id === id);
