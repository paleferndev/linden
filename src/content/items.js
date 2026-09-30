// Everything the learner can hear and learn. Ids are permanent: progress is stored against them, so text can change
// but an id is never renamed or reused. Ids shared with the old app keep its meaning.
//
// en    the English, as said
// ro    Romanian meaning(s); the first one is shown
// say   Romanian respelling, syllables joined by "-", the stressed one in CAPITALS (see the sound key lesson)
// kind  word | phrase | letter | number
// light letters and numbers: they enter the review a step higher, so the alphabet doesn't flood it

export const ITEMS = {};
const add = (kind, id, en, ro, say, o = {}) => { ITEMS[id] = { id, kind, en, ro: [].concat(ro), say, ...o }; };
const W = (...a) => add('word', ...a);
const P = (...a) => add('phrase', ...a);

/* ---------- No. 1 · words you already know */
W('w.hotel', 'hotel', 'hotel', 'hou-TEL');
W('w.taxi', 'taxi', 'taxi', 'TAC-si');
W('w.doctor', 'doctor', 'doctor', 'DOC-tăr');
W('w.problem', 'problem', 'problemă', 'PRO-blăm');
W('w.pizza', 'pizza', 'pizza', 'PIT-să');
W('w.music', 'music', 'muzică', 'MIU-zic');
W('w.restaurant', 'restaurant', 'restaurant', 'RES-trănt');
W('w.football', 'football', 'fotbal', 'FUT-bool');
W('w.coffee', 'coffee', 'cafea', 'CO-fi');
W('w.internet', 'internet', 'internet', 'IN-tăr-net');

/* ---------- No. 1 · the sound key */
W('w.this', 'this', ['asta, acesta', 'acesta'], 'dhis');
W('w.that', 'that', ['aia, acela', 'acela'], 'dhet');
W('w.think', 'think', ['a crede, a gândi'], 'think');
W('w.cat', 'cat', 'pisică', 'chet');
W('w.water', 'water', 'apă', 'UO-tăr');
W('w.bus', 'bus', 'autobuz', 'bas');

/* ---------- No. 1 · the alphabet: letter, its name, a word that starts with it */
export const LETTERS = [
  ['a', 'ei', 'apple'], ['b', 'bii', 'bus'], ['c', 'sii', 'cat'], ['d', 'dii', 'dog'], ['e', 'ii', 'egg'], ['f', 'ef', 'fish'],
  ['g', 'gii', 'good'], ['h', 'eici', 'hat'], ['i', 'ai', 'ice'], ['j', 'gei', 'jam'], ['k', 'chei', 'key'], ['l', 'el', 'lemon'],
  ['m', 'em', 'map'], ['n', 'en', 'no'], ['o', 'ou', 'orange'], ['p', 'pii', 'pizza'], ['q', 'chiu', 'queen'], ['r', 'aar', 'red'],
  ['s', 'es', 'sun'], ['t', 'tii', 'tea'], ['u', 'iu', 'umbrella'], ['v', 'vii', 'van'], ['w', 'DA-băl-iu', 'water'], ['x', 'ecs', 'box'],
  ['y', 'uai', 'yes'], ['z', 'zed', 'zero'],
];
// A lone letter is often read as a word ("A" as "uh"), so each one is spoken through a word that sounds like its name.
const LETTER_TTS = { a: 'ay', b: 'bee', c: 'see', d: 'dee', e: 'ee', f: 'eff', g: 'gee', h: 'aitch', i: 'eye', j: 'jay', k: 'kay', l: 'el', m: 'em',
  n: 'en', o: 'oh', p: 'pee', q: 'queue', r: 'ar', s: 'ess', t: 'tee', u: 'you', v: 'vee', w: 'double-you', x: 'ex', y: 'why', z: 'zed' };
for (const [l, name, word] of LETTERS) add('letter', 'w.l-' + l, l.toUpperCase(), `litera ${l.toUpperCase()}`, name, { light: true, tts: LETTER_TTS[l], word });

/* ---------- No. 1 · spelling */
P('p.how-spell-that', 'How do you spell that?', 'Cum se scrie?', 'hau du iu spel dhet');
P('p.how-spell-name', 'How do you spell your name?', 'Cum se scrie numele tău?', 'hau du iu spel iur neim');
W('w.double', 'double', ['doi de', 'dublu'], 'DA-băl');
P('p.write-it-down', 'Can you write it down?', 'Poți să scrii?', 'chen iu rait it daun');

/* ---------- numbers */
const NUMBERS = [
  [0, 'zero', 'zero', 'ZI-rou'], [1, 'one', 'unu', 'uan'], [2, 'two', 'doi', 'tuu'], [3, 'three', 'trei', 'thrii'],
  [4, 'four', 'patru', 'foor'], [5, 'five', 'cinci', 'faiv'], [6, 'six', 'șase', 'sics'], [7, 'seven', 'șapte', 'SE-văn'],
  [8, 'eight', 'opt', 'eit'], [9, 'nine', 'nouă', 'nain'], [10, 'ten', 'zece', 'ten'],
  [11, 'eleven', 'unsprezece', 'i-LE-văn'], [12, 'twelve', 'doisprezece', 'tuelv'], [13, 'thirteen', 'treisprezece', 'thăr-TIIN'],
  [14, 'fourteen', 'paisprezece', 'foor-TIIN'], [15, 'fifteen', 'cincisprezece', 'fif-TIIN'], [16, 'sixteen', 'șaisprezece', 'sics-TIIN'],
  [17, 'seventeen', 'șaptesprezece', 'se-văn-TIIN'], [18, 'eighteen', 'optsprezece', 'ei-TIIN'], [19, 'nineteen', 'nouăsprezece', 'nain-TIIN'],
  [20, 'twenty', 'douăzeci', 'TUEN-ti'], [30, 'thirty', 'treizeci', 'THĂR-ti'], [40, 'forty', 'patruzeci', 'FOR-ti'],
  [50, 'fifty', 'cincizeci', 'FIF-ti'], [60, 'sixty', 'șaizeci', 'SICS-ti'], [70, 'seventy', 'șaptezeci', 'SE-văn-ti'],
  [80, 'eighty', 'optzeci', 'EI-ti'], [90, 'ninety', 'nouăzeci', 'NAIN-ti'], [100, 'a hundred', 'o sută', 'ă HAN-dred'],
];
for (const [n, en, ro, say] of NUMBERS) add('number', 'w.n-' + n, en, ro, say, { light: true, n });

/* ---------- No. 1 · when you don't understand */
P('p.dont-understand', "Sorry, I don't understand.", 'Scuze, nu înțeleg.', 'SO-ri, ai dount an-dăr-STEND');
P('p.repeat', 'Can you repeat that, please?', 'Poți repeta, te rog?', 'chen iu ri-PIIT dhet, pliiz');
P('p.slowly', 'More slowly, please.', 'Mai rar, te rog.', 'moor SLOU-li, pliiz');
P('p.what-does-mean', 'What does that mean?', 'Ce înseamnă asta?', 'uot daz dhet miin');
P('p.how-say', 'How do you say this in English?', 'Cum se spune asta în engleză?', 'hau du iu sei dhis in IN-gliș');
P('p.im-learning', "I'm learning English.", 'Învăț engleză.', 'aim LĂR-ning IN-gliș');
P('p.speak-romanian', 'Do you speak Romanian?', 'Vorbești română?', 'du iu spiic rou-MEI-ni-ăn');
P('p.no-english', "I don't speak English very well.", 'Nu vorbesc engleza foarte bine.', 'ai dount spiic IN-gliș VE-ri uel');

/* ---------- The Kettle · hello and goodbye */
W('w.hello', 'hello', ['salut', 'bună'], 'hă-LOU');
W('w.hi', 'hi', 'salut', 'hai');
P('p.good-morning', 'good morning', 'bună dimineața', 'gud MOOR-ning');
P('p.good-afternoon', 'good afternoon', 'bună ziua', 'gud aaf-tăr-NUUN');
P('p.good-evening', 'good evening', 'bună seara', 'gud IIV-ning');
P('p.good-night', 'good night', 'noapte bună', 'gud nait');
W('w.goodbye', 'goodbye', 'la revedere', 'gud-BAI');
W('w.bye', 'bye', 'pa', 'bai');
P('p.see-you-later', 'See you later.', 'Pe mai târziu.', 'sii iu LEI-tăr');
P('p.see-you-tomorrow', 'See you tomorrow.', 'Ne vedem mâine.', 'sii iu tă-MO-rou');
P('p.how-are-you', 'How are you?', 'Ce mai faci?', 'hau aar iu');
P('p.im-fine-thanks', "I'm fine, thanks.", 'Bine, mulțumesc.', 'aim fain, thencs');
P('p.and-you', 'And you?', 'Tu?', 'end iu');
P('p.not-bad', 'Not bad.', 'Nu-i rău.', 'not bed');

/* ---------- The Kettle · ordering */
W('w.tea', 'tea', 'ceai', 'tii');
W('w.teapot', 'teapot', 'ceainic', 'TII-pot');
W('w.croissant', 'croissant', 'croissant', 'CUA-son');
W('w.sugar', 'sugar', 'zahăr', 'ȘU-găr');
W('w.milk', 'milk', 'lapte', 'milc');
P('p.can-i-have', 'Can I have a tea, please?', 'Pot să iau un ceai, vă rog?', 'chen ai hev ă TII, pliiz');
P('p.just-milk', 'Just milk, please.', 'Doar lapte, vă rog.', 'giast MILC, pliiz');
P('p.with-milk', 'with milk', 'cu lapte', 'uidh milc');

/* ---------- The Kettle · paying */
W('w.menu', 'menu', 'meniu', 'ME-niu');
W('w.bill', 'bill', 'nota de plată', 'bil');
W('w.card', 'card', 'card', 'caard');
W('w.cash', 'cash', 'numerar', 'keș');
W('w.change', 'change', 'rest', 'ceinj');
W('w.receipt', 'receipt', 'bon', 'ri-SIIT');
P('p.how-much', 'How much is it?', 'Cât costă?', 'hau mac iz it');
P('p.by-card', 'Can I pay by card?', 'Pot să plătesc cu cardul?', 'chen ai pei bai CAARD');
P('p.the-bill', 'Can I have the bill, please?', 'Nota, vă rog.', 'chen ai hev dhă BIL, pliiz');
P('p.here-you-go', 'Here you go.', 'Poftiți.', 'HIR iu gou');

/* ---------- The Kettle · please and thank you */
W('w.please', 'please', ['te rog', 'vă rog'], 'pliiz');
P('p.thank-you', 'thank you', 'mulțumesc', 'THENC iu');
W('w.thanks', 'thanks', 'mersi', 'thencs');
P('p.youre-welcome', "You're welcome.", 'Cu plăcere.', 'iur UEL-căm');
W('w.sorry', 'sorry', ['scuze', 'îmi pare rău'], 'SO-ri');
P('p.excuse-me', 'excuse me', ['nu vă supărați', 'mă scuzați'], 'ic-SCHIUZ mi');
W('w.yes', 'yes', 'da', 'ies');
W('w.no', 'no', 'nu', 'nou');

/* ---------- The Kettle · your name */
W('w.name', 'name', 'nume', 'neim');
W('w.i-am', "I'm", 'eu sunt', 'aim');
P('p.whats-your-name', "What's your name?", 'Cum te cheamă?', 'uots iur NEIM');
P('p.my-name-is', 'My name is {name}.', 'Mă numesc {name}.', 'mai neim iz {name}');
P('p.nice-to-meet-you', 'Nice to meet you.', 'Îmi pare bine.', 'nais tu MIIT iu');
P('p.nice-to-meet-you-too', 'Nice to meet you too.', 'Și mie îmi pare bine.', 'nais tu miit iu TUU');

/* ---------- Priya's · what does it cost */
W('w.bread', 'bread', 'pâine', 'bred');
W('w.apples', 'apples', 'mere', 'E-pălz');
W('w.bananas', 'bananas', 'banane', 'bă-NAA-năz');
W('w.eggs', 'eggs', 'ouă', 'egz');
W('w.newspaper', 'newspaper', 'ziar', 'NIUZ-pei-păr');
W('w.pound', 'pound', 'liră', 'paund');
P('p.how-much-is', 'How much is the bread?', 'Cât costă pâinea?', 'hau mac IZ dhă bred');
P('p.how-much-are', 'How much are the apples?', 'Cât costă merele?', 'hau mac AAR dhi E-pălz');

/* ---------- Priya's · this and that */
P('p.this-one', 'this one', 'acesta (de aici)', 'DHIS uan');
P('p.that-one', 'that one', 'acela (de acolo)', 'DHET uan');
P('p.which-one', 'Which one?', 'Care?', 'uici UAN');

/* ---------- Priya's · a bag, please */
W('w.bag', 'bag', ['pungă', 'sacoșă'], 'beg');
W('w.chocolate', 'chocolate', 'ciocolată', 'CIOC-lăt');
W('w.basket', 'basket', 'coș', 'BAAS-chit');
P('p.do-you-have', 'Do you have any milk?', 'Aveți lapte?', 'du iu hev E-ni MILC');
P('p.anything-else', 'Anything else?', 'Altceva?', 'E-ni-thing ELS');
P('p.thats-all', "That's all, thanks.", 'Asta e tot, mulțumesc.', 'dhets OOL, thencs');
P('p.need-a-bag', 'Do you need a bag?', 'Vă trebuie o pungă?', 'du iu niid ă BEG');
P('p.keep-the-change', 'Keep the change.', 'Păstrați restul.', 'chiip dhă CEINJ');
P('p.have-a-nice-day', 'Have a nice day!', 'O zi bună!', 'hev ă nais DEI');

export const item = id => ITEMS[id];
export const ro = it => it.ro[0];
