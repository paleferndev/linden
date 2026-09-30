// The course: places on Linden Lane, their lessons, and each lesson's steps. Lesson ids are permanent.
//
// A lesson is a list of steps, one screen each. First it teaches, then it makes you work:
//   scene     a neighbour says one line; the goal and what you'll be able to say
//   explore   tap the things in the picture       · cards    tap each word or phrase
//   letters / numbers / times                     other ways to meet new words
//   pattern   one pattern, the changing part highlighted, plus a trap
//   stress / soundkey / lettersnote / mouth / teenty / compare / thisthat   a picture that explains one idea
// The exercises (see src/screens/drills.js):
//   minimal · listen · dictation · listenbuild · translate · cloze · pick · speak · talk
// Every exercise must take some effort: options that differ in one detail, wrong answers that are real mistakes of
// Romanian speakers, typing and speaking. A wrong answer comes back two steps later. `ids` names the items an
// exercise trains, for the review schedule.

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

// Sound pairs that Romanian speakers mix up, with what each word means, so the difference matters.
const TH = { pairs: [['three', 'tree'], ['think', 'sink'], ['thin', 'tin'], ['mouth', 'mouse']],
  gloss: { three: 'trei', tree: 'copac', think: 'a gândi', sink: 'chiuvetă', thin: 'subțire', tin: 'cutie de conservă', mouth: 'gură', mouse: 'șoarece' } };
const AE = { pairs: [['bad', 'bed'], ['man', 'men'], ['cat', 'cut'], ['hat', 'hut']],
  gloss: { bad: 'rău', bed: 'pat', man: 'bărbat', men: 'bărbați', cat: 'pisică', cut: 'a tăia', hat: 'pălărie', hut: 'colibă' } };
const WV = { pairs: [['wine', 'vine'], ['west', 'vest'], ['wet', 'vet']],
  gloss: { wine: 'vin', vine: 'viță-de-vie', west: 'vest', vest: 'maiou', wet: 'ud', vet: 'veterinar' } };
const TEENS = [['13', '30'], ['14', '40'], ['15', '50'], ['17', '70'], ['19', '90']];
const NUM_AUDIO = { 13: 'thirteen', 30: 'thirty', 14: 'fourteen', 40: 'forty', 15: 'fifteen', 50: 'fifty', 17: 'seventeen', 70: 'seventy', 19: 'nineteen', 90: 'ninety' };

const L = {};

/* ================================================================ No. 1 */

L['h.known'] = {
  title: 'Engleza pe care o știi deja', goal: 'Zece cuvinte cunoscute, cu sunetul corect.',
  items: ['w.hotel', 'w.taxi', 'w.doctor', 'w.problem', 'w.pizza', 'w.music', 'w.restaurant', 'w.football', 'w.coffee', 'w.internet'],
  can: ['No problem!', 'I need a taxi to the hotel.'],
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
    { t: 'listen', audio: 'Two pizzas and a coffee, please.', q: 'Ce comandă?', answer: 0,
      options: [{ pics: ['room:pizza', 'room:pizza', 'room:coffee'], cap: 'two pizzas, a coffee' }, { pics: ['room:pizza', 'room:coffee', 'room:coffee'], cap: 'a pizza, two coffees' }, { pics: ['room:pizza', 'room:pizza', 'room:coffee', 'room:coffee'], cap: 'two pizzas, two coffees' }],
      why: ['', 'A cerut două pizza (two pizzas) și o cafea (a coffee).', 'O singură cafea: a coffee.'], ids: ['w.pizza', 'w.coffee'] },
    { t: 'listenbuild', audio: 'I need a taxi to the hotel.', extra: ['at', 'an'], ids: ['w.taxi', 'w.hotel'] },
    { t: 'speak', repeat: true, answer: 'restaurant', id: 'w.restaurant', ids: ['w.restaurant'] },
    { t: 'translate', ro: 'Nicio problemă!', answer: 'No problem!', extra: ['not', 'problems'], ids: ['w.problem'] },
    { t: 'speak', ro: 'Doctorul e la hotel.', answer: 'The doctor is at the hotel.', alts: ['The doctor is in the hotel.'], ids: ['w.doctor', 'w.hotel'] },
  ],
};

L['h.sounds'] = {
  title: 'Cheia sunetelor', goal: 'Auzi și spui sunetele care nu există în română.',
  items: ['w.this', 'w.that', 'w.think', 'w.cat', 'w.water', 'w.bus'],
  can: ['This is my cat.'],
  done: 'Deosebești th de t, «e» de «a» și w de v.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'This is Linden Lane.', ro: 'Aici e Linden Lane.' } },
    { t: 'cards', ids: ['w.this', 'w.that', 'w.think', 'w.cat', 'w.water', 'w.bus'], pics: { 'w.this': 'tt:this', 'w.that': 'tt:that', 'w.cat': 'cat', 'w.water': 'glass', 'w.bus': 'bus', 'w.think': 'thought' } },
    { t: 'soundkey' },
    { t: 'minimal', ...TH, rounds: 5, note: 'Cu «th», vârful limbii iese între dinți.', ids: ['w.think'] },
    { t: 'minimal', ...AE, rounds: 5, note: 'Bad are gura mai deschisă, aproape de «a».', ids: ['w.cat'] },
    { t: 'minimal', ...WV, rounds: 4, note: 'W e cu buzele rotunjite, ca «u». V e cu dinții pe buză.', ids: ['w.water'] },
    { t: 'dictation', audio: 'This is my cat.', answer: 'This is my cat.', ids: ['w.this', 'w.cat'] },
    { t: 'speak', repeat: true, answer: 'three', ids: ['w.think'] },
  ],
};

L['h.abc'] = {
  title: 'Alfabetul', goal: 'Cum se numesc literele, ca să poți spune ceva pe litere.',
  items: 'abcdefghijklmnopqrstuvwxyz'.split('').map(l => 'w.l-' + l),
  can: [],
  done: 'Știi numele literelor și poți scrie un cuvânt spus pe litere.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'A, B, C, D, E, F, G.', tts: 'ay, bee, see, dee, ee, eff, gee.', ro: 'A, B, C, D, E, F, G.' } },
    { t: 'letters' },
    { t: 'lettersnote' },
    { t: 'minimal', show: 'letter', q: 'Ce literă ai auzit?', rounds: 6, note: 'Vocalele sunt cele mai înșelătoare.',
      pairs: [['E', 'I'], ['A', 'E'], ['G', 'J'], ['I', 'Y'], ['A', 'R']],
      audio: { E: 'ee', I: 'eye', A: 'ay', G: 'gee', J: 'jay', Y: 'why', R: 'ar' }, ids: ['w.l-e', 'w.l-i', 'w.l-a', 'w.l-g', 'w.l-j', 'w.l-y'] },
    { t: 'dictation', audio: 'em. ay. pee.', q: 'Scrie cuvântul spus pe litere.', answer: 'map', ids: ['w.l-m', 'w.l-a', 'w.l-p'] },
    { t: 'dictation', audio: 'jay. ee. tee.', q: 'Scrie cuvântul spus pe litere.', answer: 'jet', why: 'J se numește «gei»; G ar fi fost «gii». E se numește «ii».', ids: ['w.l-j', 'w.l-e'] },
    { t: 'speak', self: true, ro: 'Spune pe litere: CAT', answer: 'C – A – T', audio: 'see. ay. tee.', ids: ['w.l-c', 'w.l-a', 'w.l-t'] },
  ],
};

L['h.spell'] = {
  title: 'Se scrie cu…', goal: 'Spui un cuvânt pe litere și notezi unul spus de altcineva.',
  items: ['p.how-spell-that', 'p.how-spell-name', 'w.double', 'p.write-it-down'],
  can: ['How do you spell that?', 'Can you write it down?'],
  done: 'Poți nota un nume spus pe litere și îl poți spune pe al tău.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'How do you spell that?', ro: 'Cum se scrie?' } },
    { t: 'cards', ids: ['p.how-spell-that', 'p.how-spell-name', 'w.double', 'p.write-it-down'] },
    { t: 'pattern', text: 'How do you spell {}?', ro: 'Cum se scrie {}?', ids: ['p.how-spell-that', 'p.how-spell-name'],
      slots: [{ en: 'that', ro: 'asta' }, { en: 'your name', ro: 'numele tău' }, { en: 'coffee', ro: 'coffee' }],
      hand: 'LL = double L' },
    { t: 'dictation', audio: 'tee. ay. ex. eye.', q: 'Scrie cuvântul spus pe litere.', answer: 'taxi', ids: ['w.l-t', 'w.l-x'] },
    { t: 'dictation', audio: 'see. oh. double eff. double ee.', q: 'Scrie cuvântul spus pe litere.', answer: 'coffee', why: 'Double F = FF, double E = EE.', ids: ['w.double'] },
    { t: 'dictation', audio: 'Hi, my name is Greg. gee. ar. ee. gee.', q: 'Cum îl cheamă? Scrie numele.', answer: 'Greg', why: 'G se numește «gii», R «aar», E «ii».', ids: ['w.l-g', 'w.l-r', 'w.l-e'] },
    { t: 'cloze', text: 'How do you {} that?', ro: 'Cum se scrie?', options: ['spell', 'write', 'say', 'tell'], answer: 0,
      why: 'Spell = a spune sau a scrie pe litere. How do you say that? = cum se spune.', ids: ['p.how-spell-that'] },
    { t: 'speak', spellName: true, ids: ['p.how-spell-name'] },
  ],
};

L['h.num'] = {
  title: 'Numere 0–10', goal: 'Înțelegi un număr de telefon spus în engleză.',
  items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => 'w.n-' + n),
  can: ['My number is oh-seven-five…'],
  done: 'Poți nota un număr de telefon spus în engleză.',
  steps: [
    { t: 'scene', scene: 'room', line: { en: 'One, two, three, four, five.', ro: 'Unu, doi, trei, patru, cinci.' } },
    { t: 'numbers', from: 0, to: 10 },
    { t: 'mouth', trap: 'trap.three-tree' },
    { t: 'minimal', q: 'Ce ai auzit?', rounds: 4, pairs: [['three', 'tree'], ['three', 'free']], gloss: { three: 'trei', tree: 'copac', free: 'liber' }, ids: ['w.n-3'] },
    { t: 'listen', audio: 'Bus number nine, not number five.', q: 'Ce autobuz aștepți?', lang: 'digit', options: ['9', '5', '19', '95'], answer: 0, ids: ['w.n-9', 'w.n-5'] },
    { t: 'dictation', audio: 'My number is oh, seven, three. Two, eight, six. Four, one, nine, zero.', q: 'Scrie numărul de telefon.', answer: '0732864190', digits: true,
      why: 'La telefon, zero se spune adesea «ou», ca litera O.', ids: ['w.n-0', 'w.n-7', 'w.n-3', 'w.n-2', 'w.n-8', 'w.n-6', 'w.n-4', 'w.n-1', 'w.n-9'] },
    { t: 'dictation', audio: 'Room ten, on floor four.', q: 'Scrie numărul camerei.', answer: '10', number: true, ids: ['w.n-10'] },
    { t: 'speak', repeat: true, answer: 'three', ids: ['w.n-3'] },
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
    { t: 'listen', audio: 'Sorry, can you speak more slowly?', q: 'Ce îți cere?', lang: 'ro', options: ['Să vorbești mai rar.', 'Să repeți.', 'Să scrii.', 'Să vorbești mai tare.'], answer: 0,
      why: ['', 'Repeat ar fi „repetă”. Aici: more slowly, mai rar.', 'Write ar fi „scrie”. Aici: more slowly, mai rar.', 'Louder ar fi „mai tare”. Slowly e „rar”.'], ids: ['p.slowly'] },
    { t: 'pick', q: 'Care e corect?', options: ["I don't understand.", 'I not understand.', 'I no understand.', "I don't understanding."], answer: 0,
      why: 'Negația se face cu don\'t: I don\'t understand.', ids: ['p.dont-understand'] },
    { t: 'translate', ro: 'Mai rar, te rog.', answer: 'More slowly, please.', extra: ['slow', 'very'], ids: ['p.slowly'] },
    { t: 'speak', ro: 'Scuze, nu înțeleg.', answer: "Sorry, I don't understand.", ids: ['p.dont-understand'] },
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
    { t: 'listen', audio: 'Good afternoon!', q: 'Cam ce oră e?', lang: 'ro', options: ['după-amiaza', 'dimineața', 'seara', 'noaptea, la plecare'], answer: 0, ids: ['p.good-afternoon'] },
    { t: 'pick', show: { ro: 'Intri în cafenea la ora 19. Ce spui?' }, q: 'Alege:', options: ['Good evening!', 'Good night!', 'Good afternoon!', 'Goodbye!'], answer: 0,
      why: 'Seara, când ajungi: good evening. Good night e doar la plecare.', ids: ['p.good-evening', 'p.good-night'] },
    { t: 'cloze', text: 'How {} you?', ro: 'Ce mai faci?', options: ['are', 'is', 'do', 'am'], answer: 0, why: 'Cu you merge are: you are, how are you?', ids: ['p.how-are-you'] },
    { t: 'listenbuild', audio: "I'm fine, thanks. And you?", extra: ['am', 'me'], ids: ['p.im-fine-thanks', 'p.and-you'] },
    { t: 'speak', ro: 'Ne vedem mâine!', answer: 'See you tomorrow!', ids: ['p.see-you-tomorrow'] },
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
    { t: 'cloze', text: 'Can I have {} tea, please?', pic: 'cafe:tea', options: ['a', 'an', 'any'], answer: 0,
      why: 'An se pune doar înainte de o vocală: an apple. Înainte de tea: a.', ids: ['p.can-i-have'] },
    { t: 'cloze', text: 'Can I have {} milk, please?', pic: 'cafe:milk', options: ['some', 'a', 'an'], answer: 0,
      why: 'Laptele nu se numără, deci nu a milk. Spui some milk.', ids: ['w.milk'] },
    { t: 'pick', q: 'Care sună politicos?', options: ['Can I have a coffee, please?', 'Give me a coffee.', 'I want a coffee.', 'Coffee!'], answer: 0,
      why: 'Give me și I want sună a ordin în engleză, chiar dacă la noi sunt normale.', ids: ['p.can-i-have'] },
    { t: 'translate', ro: 'Pot să iau un ceai cu lapte, vă rog?', answer: 'Can I have a tea with milk, please?', extra: ['Give', 'me', 'some'], ids: ['p.can-i-have', 'p.with-milk'] },
    { t: 'speak', ro: 'Pot să iau o cafea, vă rog?', answer: 'Can I have a coffee, please?', ids: ['p.can-i-have'] },
    { t: 'talk', script: [
      { them: 'Morning! What can I get you?', ro: 'Bună dimineața! Ce vă servesc?', replies: [
        { en: 'Can I have a tea, please?', ok: true, next: 1 },
        { en: 'Give me a tea.', ok: false, after: 'Er… sure.', aro: 'Ăă… sigur.', coach: 'Merge, dar sună a ordin. Încearcă „Can I have…, please?”' },
        { en: 'I want tea.', ok: false, after: 'Right… one tea.', aro: 'Bine… un ceai.', coach: 'I want sună direct. Cu „Can I have a tea, please?” ești politicos.' },
      ] },
      { them: 'Sure. Milk and sugar?', ro: 'Sigur. Lapte și zahăr?', replies: [
        { en: 'Just milk, please.', ok: true, after: 'Just milk. Lovely.', aro: 'Doar lapte. Perfect.', next: 2 },
        { en: 'Yes, please.', ok: true, after: 'Milk and sugar it is.', aro: 'Deci lapte și zahăr.', next: 2 },
        { en: 'Only milk, please.', ok: true, after: 'Just milk. Lovely.', aro: 'Doar lapte. Perfect.', next: 2 },
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
    { t: 'dictation', audio: "The croissant? It's one pound ninety.", q: 'Scrie prețul croissantului.', answer: '1.90', number: true, price: true, ids: ['w.pound'] },
    { t: 'pick', show: { ro: 'Vrei nota de plată.' }, q: 'Ce spui?', options: ['Can I have the bill, please?', 'Can I have the note, please?', 'Can I have the check, please?', 'Can I have the receipt, please?'], answer: 0,
      why: 'În Marea Britanie, nota de plată e the bill. Note e o bancnotă; receipt e bonul, după ce plătești; check se spune în America.', ids: ['p.the-bill', 'w.bill'] },
    { t: 'cloze', text: 'Can I pay in {}?', options: ['cash', 'card', 'money'], answer: 0, why: 'In cash, dar by card: Can I pay by card?', ids: ['w.cash', 'p.by-card'] },
    { t: 'translate', ro: 'Pot să plătesc cu cardul?', answer: 'Can I pay by card?', alts: ['Can I pay with card?', 'Can I pay with my card?'], extra: ['with', 'the'], ids: ['p.by-card'] },
    { t: 'speak', ro: 'Nota, vă rog.', answer: 'Can I have the bill, please?', alts: ['The bill, please.'], ids: ['p.the-bill'] },
    { t: 'talk', script: [
      { them: "That's two pounds forty, please.", ro: 'Face două lire și patruzeci, vă rog.', replies: [
        { en: 'Can I pay by card?', ok: true, next: 1 },
        { en: 'Sorry, how much?', ok: true, stay: true, after: 'Two pounds forty.', aro: 'Două lire și patruzeci.' },
        { en: 'How much costs it?', ok: false, after: 'Two forty.', aro: 'Două patruzeci.', coach: 'Se întreabă „How much is it?”. Și Tom ți-a spus deja prețul.' },
      ] },
      { them: 'Of course. Just tap here.', ro: 'Sigur. Apropiați cardul aici.', replies: [
        { en: 'Thanks! Can I have a receipt, please?', ok: true, next: 2 },
        { en: 'Thanks! Can I have the note?', ok: false, after: 'The… note?', aro: 'Ce… bancnotă?', coach: 'Bonul e the receipt. Note e o bancnotă.' },
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
    { t: 'pick', show: { ro: 'Ai călcat pe cineva pe picior.' }, q: 'Ce spui?', options: ['Sorry!', 'Excuse me!', 'Please!', "You're welcome!"], answer: 0,
      why: 'După ce ai greșit ceva: sorry.', ids: ['w.sorry'] },
    { t: 'pick', show: { ro: 'Vrei să treci printre oameni, în autobuz.' }, q: 'Ce spui?', options: ['Excuse me.', 'Sorry.', 'Please.', 'Thanks.'], answer: 0,
      why: 'Înainte, ca să-ți faci loc sau să atragi atenția: excuse me.', ids: ['p.excuse-me'] },
    { t: 'listen', audio: "You're welcome.", q: 'Ce înseamnă?', lang: 'ro', options: ['Cu plăcere.', 'Bine ai venit.', 'Mulțumesc.', 'Nu, mulțumesc.'], answer: 0,
      why: ['', "Bine ai venit e welcome. You're welcome e răspunsul la thank you.", 'Mulțumesc e thank you.', 'Nu, mulțumesc e no, thank you.'], ids: ['p.youre-welcome'] },
    { t: 'cloze', text: '{} me, where is the hotel?', options: ['Excuse', 'Sorry', 'Please'], answer: 0, why: 'Ca să întrebi un străin: excuse me.', ids: ['p.excuse-me'] },
    { t: 'listenbuild', audio: 'No, thank you.', extra: ['thanks', 'not'], ids: ['w.no', 'p.thank-you'] },
    { t: 'speak', ro: 'Nu vă supărați, unde e hotelul?', answer: 'Excuse me, where is the hotel?', ids: ['p.excuse-me'] },
    { t: 'talk', script: [
      { them: "Here's your tea.", ro: 'Poftim ceaiul.', replies: [
        { en: 'Thank you!', ok: true, next: 1 },
        { en: 'Sorry!', ok: false, after: 'Sorry? What for?', aro: 'Scuze? Pentru ce?', coach: 'Sorry e când ai greșit ceva. Aici mulțumești.' },
        { en: "You're welcome.", ok: false, after: "Ha! That's my line.", aro: 'Ha! Asta e replica mea.', coach: "You're welcome răspunde el, după ce îi mulțumești." },
      ] },
      { them: "You're welcome!", ro: 'Cu plăcere!', coach: 'Tom s-a întors cu spatele. Vrei zahăr.', replies: [
        { en: 'Excuse me, can I have some sugar?', ok: true, next: 2 },
        { en: 'Sorry, can I have some sugar?', ok: false, after: 'Oh! Yes, sure.', aro: 'O! Da, sigur.', coach: 'Merge, dar ca să atragi atenția se spune excuse me.' },
        { en: 'Please, give me sugar.', ok: false, after: 'Er… OK.', aro: 'Ăă… bine.', coach: 'Sună a ordin, chiar și cu please. „Excuse me, can I have some sugar?”' },
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
    { t: 'listen', audio: "Hi, I'm Tom. What's your name?", q: 'Ce vrea să afle?', lang: 'ro', options: ['Cum te cheamă.', 'De unde ești.', 'Ce vrei să bei.', 'Cât ai de plată.'], answer: 0, ids: ['p.whats-your-name'] },
    { t: 'cloze', text: 'Nice to meet you {}.', ro: 'Și mie îmi pare bine.', options: ['too', 'to', 'two', 'also'], answer: 0,
      why: 'Too la final înseamnă „și eu”. To și two se aud la fel, dar înseamnă altceva.', ids: ['p.nice-to-meet-you-too'] },
    { t: 'dictation', audio: "Hello, I'm Tom. Nice to meet you.", answer: "Hello, I'm Tom. Nice to meet you.", ids: ['p.nice-to-meet-you', 'w.i-am'] },
    { t: 'speak', ro: 'Spune cum te cheamă.', answer: "I'm {name}.", alts: ['My name is {name}.', 'I am {name}.'], ids: ['p.my-name-is', 'w.i-am'] },
    { t: 'talk', script: [
      { them: 'Morning! What can I get you?', ro: 'Bună dimineața! Ce vă servesc?', replies: [
        { en: 'Can I have a coffee, please?', ok: true, next: 1 },
        { en: 'Give me a coffee.', ok: false, after: 'Er… right.', aro: 'Ăă… bine.', coach: 'Mai politicos: „Can I have a coffee, please?”' },
      ] },
      { them: "Sure. What's your name? It's for the cup.", ro: 'Sigur. Cum te cheamă? E pentru pahar.', replies: [
        { en: "I'm {name}.", ok: true, next: 2 },
        { en: 'My name is {name}.', ok: true, next: 2 },
        { en: 'I am called {name}.', ok: false, after: 'Nice one. {name} it is.', aro: 'Bun. Atunci {name}.', coach: 'Se înțelege, dar se spune simplu: „I\'m {name}.”' },
      ] },
      { them: "Nice to meet you, {name}. I'm Tom.", ro: 'Îmi pare bine, {name}. Eu sunt Tom.', replies: [
        { en: 'Nice to meet you too.', ok: true, next: 3 },
        { en: 'Me too.', ok: false, after: 'Ha, you too.', aro: 'Ha, și mie.', coach: 'La „Nice to meet you” răspunzi „Nice to meet you too.”' },
      ] },
      { them: "That's two pounds eighty.", ro: 'Face două lire și optzeci.', replies: [
        { en: 'Can I pay by card?', ok: true, next: 4 },
        { en: 'Here you go.', ok: true, next: 4 },
      ] },
      { them: "Thanks! Here's your coffee, {name}.", ro: 'Mersi! Poftim cafeaua, {name}.', replies: [
        { en: 'Thank you! See you tomorrow.', ok: true, next: 5 },
        { en: 'Thank you! Good night.', ok: false, after: "Night? It's the morning!", aro: 'Noapte? E dimineață!', coach: 'Good night e la plecare, seara.' },
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
    { t: 'cloze', text: 'How much {} the apples?', pic: 'shop:apples', ro: 'Cât costă merele?', options: ['are', 'is', 'costs', 'do'], answer: 0,
      why: 'Merele sunt mai multe: are.', ids: ['p.how-much-are', 'w.apples'] },
    { t: 'cloze', text: 'How much {} the bread?', pic: 'shop:bread', ro: 'Cât costă pâinea?', options: ['is', 'are', 'costs', 'does'], answer: 0,
      why: 'Pâinea e un singur lucru: is.', ids: ['p.how-much-is', 'w.bread'] },
    { t: 'listen', audio: 'The apples are two pounds, and the bread is one fifty.', q: 'Cât costă pâinea?', lang: 'price', options: ['£1.50', '£2.00', '£1.15', '£2.50'], answer: 0,
      why: ['', 'Two pounds e prețul merelor.', 'One fifty: o liră și 50 de pence.', 'One fifty: o liră și 50 de pence.'], ids: ['w.bread'] },
    { t: 'pick', q: 'Care e corect?', options: ['How much is the bread?', 'How much costs the bread?', 'How much the bread costs?', 'How many is the bread?'], answer: 0,
      why: '„Cât costă” devine How much is…? Costs nu intră în întrebare.', ids: ['p.how-much-is'] },
    { t: 'speak', ro: 'Cât costă ouăle?', answer: 'How much are the eggs?', ids: ['p.how-much-are', 'w.eggs'] },
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
  done: 'Numeri până la o sută și nu mai încurci fifteen cu fifty.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: "That's fifteen pounds, please.", ro: 'Face cincisprezece lire, vă rog.' } },
    { t: 'numbers', from: 11, to: 20 },
    { t: 'teenty', trap: 'trap.teen-ty' },
    { t: 'minimal', show: 'digit', q: 'Ce număr ai auzit?', rounds: 6, note: 'Ascultă unde apasă vocea: la început sau la final.', pairs: TEENS, audio: NUM_AUDIO,
      ids: ['w.n-13', 'w.n-14', 'w.n-15', 'w.n-17', 'w.n-19', 'w.n-30', 'w.n-40', 'w.n-50', 'w.n-70', 'w.n-90'] },
    { t: 'dictation', audio: 'eighteen', q: 'Scrie numărul pe care îl auzi.', answer: '18', number: true, ids: ['w.n-18'] },
    { t: 'dictation', audio: 'sixty', q: 'Scrie numărul pe care îl auzi.', answer: '60', number: true, ids: ['w.n-60'] },
    { t: 'listen', audio: "That's fifteen pounds.", q: 'Cât ai de plată?', lang: 'price', options: ['£15', '£50', '£5', '£51'], answer: 0, why: 'fifTEEN, cu accentul la final: 15.', ids: ['w.n-15'] },
    { t: 'dictation', audio: "It's a hundred and twenty pounds.", q: 'Scrie prețul.', answer: '120', number: true, price: true, ids: ['w.n-100', 'w.n-20'] },
    { t: 'speak', self: true, repeat: true, answer: 'fifteen, fifty', ids: ['w.n-15', 'w.n-50'] },
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
  done: 'Poți arăta ce vrei, chiar dacă nu știi cum se numește.',
  steps: [
    { t: 'scene', scene: 'shop', line: { en: 'Which one?', ro: 'Care?' } },
    { t: 'thisthat' },
    { t: 'pattern', text: 'Can I have {}, please?', ro: 'Pot să iau {}, vă rog?', ids: ['p.this-one', 'p.that-one'],
      slots: [{ en: 'this one', ro: 'acesta', pic: 'tt:this' }, { en: 'that one', ro: 'acela', pic: 'tt:that' }],
      hand: 'this = aici · that = acolo' },
    { t: 'listen', audio: 'That one, please.', q: 'Pe care îl vrea?', answer: 0,
      options: [{ pics: ['tt:that'], cap: 'acela, de acolo' }, { pics: ['tt:this'], cap: 'acesta, de aici' }], ids: ['p.that-one'] },
    { t: 'cloze', text: 'Can I have {} one, please?', pic: 'tt:that', q: 'Vrei ciocolata de pe raft. Ce cuvânt lipsește?', options: ['that', 'this', 'it'], answer: 0,
      why: 'E departe de tine: that.', ids: ['p.that-one'] },
    { t: 'cloze', text: 'Can I have {} one, please?', pic: 'tt:this', q: 'Vrei ciocolata din fața ta. Ce cuvânt lipsește?', options: ['this', 'that', 'these'], answer: 0,
      why: 'E chiar lângă tine: this.', ids: ['p.this-one'] },
    { t: 'translate', ro: 'Pot să iau acesta, vă rog?', answer: 'Can I have this one, please?', extra: ['that', 'Give'], ids: ['p.this-one'] },
    { t: 'speak', ro: 'Pe acela, vă rog.', answer: 'That one, please.', ids: ['p.that-one'] },
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
    { t: 'cloze', text: '{} you have any milk?', ro: 'Aveți lapte?', options: ['Do', 'Are', 'Have', 'Is'], answer: 0, why: 'Întrebarea cu have începe cu do.', ids: ['p.do-you-have'] },
    { t: 'pick', q: 'Care e corect?', options: ['Do you have any bread?', 'You have bread?', 'Are you have bread?', 'Do you have breads?'], answer: 0,
      why: 'Întrebarea începe cu do, iar bread nu are plural aici.', ids: ['p.do-you-have', 'w.bread'] },
    { t: 'listen', audio: 'Do you need a bag?', q: 'Ce te-a întrebat?', lang: 'ro', options: ['Vă trebuie o pungă?', 'Aveți o pungă?', 'Cât costă punga?', 'Altceva?'], answer: 0,
      why: ['', 'Need = a avea nevoie. „Aveți o pungă?” ar fi Do you have a bag?', 'Cât costă ar începe cu How much.', 'Altceva e Anything else?'], ids: ['p.need-a-bag', 'w.bag'] },
    { t: 'dictation', audio: "No, that's all, thanks.", answer: "No, that's all, thanks.", ids: ['p.thats-all'] },
    { t: 'speak', ro: 'Aveți ciocolată?', answer: 'Do you have any chocolate?', alts: ['Do you have chocolate?'], ids: ['p.do-you-have', 'w.chocolate'] },
    { t: 'talk', script: [
      { them: 'Anything else?', ro: 'Altceva?', replies: [
        { en: 'Do you have any milk?', ok: true, next: 1 },
        { en: 'You have milk?', ok: false, after: 'Milk? Yes, in the fridge.', aro: 'Lapte? Da, în frigider.', coach: 'Întrebarea începe cu do: „Do you have any milk?”' },
      ] },
      { them: 'Yes, in the fridge. Anything else?', ro: 'Da, în frigider. Altceva?', replies: [
        { en: "No, that's all, thanks.", ok: true, next: 2 },
        { en: "No, it's all.", ok: false, after: 'All right.', aro: 'Bine.', coach: "Se spune „That's all, thanks.”" },
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
    { t: 'dictation', audio: 'Four pounds eighty, please.', q: 'Scrie prețul.', answer: '4.80', number: true, price: true, ids: ['w.pound'] },
    { t: 'pick', show: { ro: 'Vrei să-i lași restul.' }, q: 'Ce spui?', options: ['Keep the change.', 'Keep the rest.', 'Stay with the change.', "It's for you, the rest."], answer: 0,
      why: 'Restul de bani e the change. The rest înseamnă „restul lucrurilor”.', ids: ['p.keep-the-change'] },
    { t: 'listenbuild', audio: 'Keep the change. Have a nice day!', extra: ['rest', 'good'], ids: ['p.keep-the-change', 'p.have-a-nice-day'] },
    { t: 'speak', ro: 'Asta e tot, mulțumesc.', answer: "That's all, thanks.", alts: ["That's all, thank you.", 'That is all, thanks.'], ids: ['p.thats-all'] },
    { t: 'talk', script: [
      { them: 'Hello again! Can I help you?', ro: 'Bună din nou! Vă pot ajuta?', replies: [
        { en: 'Do you have any eggs?', ok: true, next: 1 },
        { en: 'You have eggs?', ok: false, after: 'Eggs? Right here.', aro: 'Ouă? Chiar aici.', coach: 'Întrebarea începe cu do: „Do you have any eggs?”' },
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
        { en: 'Here you go. Keep the rest.', ok: false, after: 'The change? Oh, thank you!', aro: 'Restul? O, mulțumesc!', coach: 'Restul de bani e the change.' },
        { en: 'Can I pay by card?', ok: true, next: 5 },
      ] },
      { them: 'Thank you! Have a nice day!', ro: 'Mulțumesc! O zi bună!', end: true },
    ] },
  ],
};

export const LESSONS = L;
for (const p of PLACES) (p.lessons || []).forEach((id, i) => Object.assign(L[id], { id, place: p.id, index: i }));

export const place = id => PLACES.find(p => p.id === id);
