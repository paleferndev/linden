// The minigames' content, one set per episode. The games themselves are in src/screens/games/. Rounds list the right
// answer first; wrong options are real mistakes. `why` is the one Romanian line shown after a miss.

export const GAMES = {
  /* ---------------------------------------------------------------- 1 · this, that, these, those */
  thisthat: {
    title: 'Ce e asta?', teaches: 'this, that, these, those', g: 'this-that',
    intro: 'Lanterna luminează ceva. E aproape sau departe? Unul sau mai multe?',
    options: ['This is', 'That is', 'These are', 'Those are'],
    rounds: [
      { at: 'cup', text: '{} my cup.', right: 'This is', why: 'Aproape și una: this is.' },
      { at: 'moon', text: '{} the moon.', right: 'That is', why: 'Departe și una: that is.' },
      { at: 'keys', text: '{} my keys.', right: 'These are', why: 'Aproape și mai multe: these are.' },
      { at: 'stars', text: '{} stars.', right: 'Those are', why: 'Departe și mai multe: those are.' },
      { at: 'tree', text: '{} a linden tree.', right: 'That is', why: 'Departe și unul: that is.' },
      { at: 'apples', text: '{} apples.', right: 'These are', why: 'Aproape și mai multe: these are.' },
      { at: 'birds', text: '{} birds.', right: 'Those are', why: 'Departe și mai multe: those are.' },
      { at: 'book', text: '{} an old book.', right: 'This is', why: 'Aproape și una: this is.' },
    ],
  },

  /* ---------------------------------------------------------------- 2 · does…? */
  guesswho: {
    title: 'Cine a văzut lumina?', teaches: 'întrebări cu does', g: 'do-does',
    intro: 'Tom își amintește doar obiceiurile persoanei. Pune-i întrebările corect și află cine e.',
    people: {
      priya: { tea: false, night: false, lane: true },
      sam: { tea: true, night: true, lane: false },
      hughes: { tea: true, night: false, lane: true },
      okafor: { tea: false, night: false, lane: false },
      lily: { tea: true, night: true, lane: true },
      ben: { tea: false, night: true, lane: true },
    },
    answer: 'sam',
    rounds: [
      { key: 'tea', right: 'Does this person drink tea?', wrong: ['Do this person drink tea?', 'Does this person drinks tea?'],
        why: 'This person = he sau she: does. După does, verbul fără -s: drink.',
        yes: ['Yes. Very strong tea, every morning.', 'Da. Ceai foarte tare, în fiecare dimineață.'] },
      { key: 'night', right: 'Does this person work at night?', wrong: ['Is this person work at night?', 'Does this person works at night?'],
        why: 'Întrebarea cu un verb obișnuit se face cu does, nu cu is.',
        yes: ['Yes. Every night.', 'Da. În fiecare noapte.'] },
      { key: 'lane', right: 'Does this person live on Linden Lane?', wrong: ['Do this person live on Linden Lane?', 'Does this person living on Linden Lane?'],
        why: 'Does + verbul simplu: Does this person live…?',
        no: ['No. Not on this street.', 'Nu. Nu pe strada asta.'] },
    ],
    last: { text: 'It’s Sam! He {} the night bus.', right: 'drives', wrong: ['drive', 'driving'], why: 'Sam = he: drives, cu -s.' },
  },

  /* ---------------------------------------------------------------- 3 · now or usually */
  photos: {
    title: 'Poze de pe stradă', teaches: 'acum sau de obicei', g: 'pc-ps',
    intro: 'Străinul a făcut poze cu vecinii. Ce fac chiar acum, și ce fac de obicei?',
    rounds: [
      { who: 'tom', prop: 'boxes', text: 'Look! Tom {} some boxes.', right: 'is carrying', wrong: ['carries', 'carrying'], why: 'Look!: se întâmplă acum: is carrying.' },
      { who: 'priya', prop: 'paper', text: 'Priya {} the newspaper right now.', right: 'is reading', wrong: ['reads', 'read'], why: 'Right now: is reading.' },
      { who: 'priya', prop: 'paper', when: 'every', text: 'Priya {} the newspaper every morning.', right: 'reads', wrong: ['is reading', 'reading'], why: 'Every morning: de obicei: reads.' },
      { who: 'sam', prop: 'sleep', text: 'Shh! Sam {}. He works at night.', right: 'is sleeping', wrong: ['sleeps', 'sleep'], why: 'Shh!: chiar acum: is sleeping.' },
      { who: 'hughes', prop: 'can', text: 'Look! Mrs Hughes {} the flowers.', right: 'is watering', wrong: ['waters', 'watering'], why: 'În poză, acum: is watering.' },
      { who: 'mimi', prop: 'blanket', when: 'every', text: 'Mimi {} on the blanket every afternoon.', right: 'sleeps', wrong: ['is sleeping', 'sleep'], why: 'Every afternoon: sleeps.' },
      { who: 'okafor', prop: 'phone', text: 'Dr Okafor {} a phone call.', right: 'is making', wrong: ['is doing', 'makes'], why: 'Un telefon se dă cu make: is making a call.' },
    ],
  },

  /* ---------------------------------------------------------------- 4 · the past with -ed */
  order: {
    title: 'Noaptea aceea', teaches: 'trecutul: -ed, was, were', g: 'past-ed',
    intro: 'Sam povestește noaptea aceea. Completează ce spune, apoi alege imaginea potrivită.',
    rounds: [
      { panel: 'stop', text: 'The bus {} at the stop at midnight.', right: 'stopped', wrong: ['stoped', 'stops'], why: 'Stop dublează p-ul: stopped.' },
      { panel: 'quiet', text: 'It {} very quiet. There were no people.', right: 'was', wrong: ['were', 'is'], why: 'It: was.' },
      { panel: 'light', text: 'Then something strange {}.', right: 'happened', wrong: ['happens', 'was happen'], why: 'Trecut: happened.' },
      { panel: 'window', text: 'I {} to the window and looked up.', right: 'walked', wrong: ['walk', 'was walk'], why: 'Trecut: walked.' },
      { panel: 'phone', text: 'I {} my wife. She laughed at me!', right: 'called', wrong: ['call', 'was call'], why: 'Trecut: called.' },
    ],
  },

  /* ---------------------------------------------------------------- 5 · much and many */
  shelves: {
    title: 'Rafturile lui Priya', teaches: 'much, many', g: 'much-many',
    intro: 'Pune fiecare lucru pe raftul lui: how many pentru ce se numără, how much pentru ce nu se numără.',
    items: [
      ['apples', 'apples', 'many'], ['milk', 'milk', 'much'], ['candles', 'candles', 'many'], ['money', 'money', 'much'],
      ['eggs', 'eggs', 'many'], ['bread', 'bread', 'much'], ['coins', 'coins', 'many'], ['info', 'information', 'much'],
      ['batteries', 'batteries', 'many'], ['sugar', 'sugar', 'much'], ['time', 'time', 'much'], ['bananas', 'bananas', 'many'],
    ],
    why: { many: '{w} se numără: how many.', much: '{w} nu se numără: how much.' },
  },

  /* ---------------------------------------------------------------- 6 · prepositions */
  room: {
    title: 'Grădina de la No. 9', teaches: 'in, on, under, behind…', g: 'prep',
    intro: 'Mrs Hughes spune unde a pus lucrurile. Atinge locul din grădină.',
    rounds: [
      { item: 'glasses', text: 'Her glasses are on the bench.', at: 'on the bench' },
      { item: 'key', text: 'Her key is under the watering can.', at: 'under the watering can' },
      { item: 'phone', text: 'Her phone is in the wheelbarrow.', at: 'in the wheelbarrow' },
      { item: 'gloves', text: 'Her gloves are between the pots.', at: 'between the pots' },
      { item: 'paper', text: 'The newspaper is next to the birdbath.', at: 'next to the birdbath' },
      { item: 'ball', text: 'Mimi’s ball is under the bench.', at: 'under the bench' },
      { item: 'spark', text: 'And the spark… is in front of the gnome.', at: 'in front of the gnome' },
    ],
  },

  /* ---------------------------------------------------------------- 7 · irregular past */
  machine: {
    title: 'Mașina de verbe', teaches: 'trecutul verbelor neregulate', g: 'past-irr',
    intro: 'Mașina arată un verb. Alege trecutul lui. Cinci la rând aprind toate becurile.',
    rounds: [
      ['go', 'went', 'goed', 'gone'], ['take', 'took', 'taked', 'taken'], ['get', 'got', 'getted', 'gotten'], ['give', 'gave', 'gived', 'given'],
      ['say', 'said', 'sayed', 'says'], ['tell', 'told', 'telled', 'said'], ['see', 'saw', 'seed', 'seen'], ['buy', 'bought', 'buyed', 'brought'],
      ['find', 'found', 'finded', 'fund'], ['come', 'came', 'comed', 'come'], ['bring', 'brought', 'bringed', 'bought'], ['think', 'thought', 'thinked', 'taught'],
    ],
    count: 8,
  },

  /* ---------------------------------------------------------------- 8 · present perfect or past */
  timeline: {
    title: 'Linia timpului', teaches: 'prezent perfect sau trecut', g: 'pp-past',
    intro: 'Un moment exact din trecut, sau până acum? Completează, și propoziția își găsește locul.',
    zones: [['then', 'Atunci', 'un moment din trecut'], ['until', 'Până acum', 'de atunci încoace']],
    rounds: [
      { z: 'until', text: 'Mrs Hughes {} on Linden Lane since 1966.', right: 'has lived', wrong: ['lived', 'lives'], why: 'Since 1966, până azi: has lived.' },
      { z: 'then', text: 'In 1966 she {} a light in the sky.', right: 'saw', wrong: ['has seen', 'sees'], why: 'In 1966, un moment exact: saw.' },
      { z: 'until', text: '{} a falling star?', right: 'Have you ever seen', wrong: ['Did you ever saw', 'Have you ever saw'], why: 'Ever, fără moment: Have you ever seen…?' },
      { z: 'until', text: 'Tom {} The Kettle for ten years now.', right: 'has had', wrong: ['had', 'has'], why: 'For ten years, până acum: has had.' },
      { z: 'then', text: 'Last week Priya {} some very old coins.', right: 'found', wrong: ['has found', 'finds'], why: 'Last week: found.' },
      { z: 'then', text: 'I {} Mr Moss yesterday.', right: 'met', wrong: ['have met', 'meet'], why: 'Yesterday: met.' },
      { z: 'until', text: 'We {} each other for sixty years now.', right: 'have known', wrong: ['knew', 'know'], why: 'For sixty years, până azi: have known.' },
      { z: 'then', text: 'The tree {} for the first time that night.', right: 'glowed', wrong: ['has glowed', 'glows'], why: 'That night: un moment exact: glowed.' },
    ],
  },

  /* ---------------------------------------------------------------- 9 · will or going to */
  plan: {
    title: 'Planul de vineri', teaches: 'will, going to', g: 'going-to',
    intro: 'Toată strada pregătește vinerea. Completează fiecare bilet și prinde-l pe panou.',
    rounds: [
      { doodle: 'clouds', text: 'Look at those clouds! It {} rain.', right: '’s going to', wrong: ['going to', 'rains'], why: 'Se vede că urmează: it’s going to rain, cu is.', g: 'going-to' },
      { doodle: 'calendar', text: 'We {} on Friday night. It’s all planned.', right: '’re going to leave', wrong: ['going to leave', 'will to leave'], why: 'Plan hotărât dinainte: we’re going to leave, cu are.', g: 'going-to' },
      { doodle: 'window', text: 'I’m cold. — I {} the window.', right: '’ll close', wrong: ['close', 'am close'], why: 'Hotărăști chiar acum: I’ll close.', g: 'will' },
      { doodle: 'moon', text: 'I think the sky {} clear on Friday.', right: 'will be', wrong: ['is being', 'be'], why: 'Părere despre viitor: will be.', g: 'will' },
      { doodle: 'candle', text: 'Priya {} candles. She bought them yesterday.', right: 'is going to bring', wrong: ['brings', 'will to bring'], why: 'Plan hotărât: is going to bring.', g: 'going-to' },
      { doodle: 'heart', text: 'Don’t worry. I {} anyone. I promise.', right: 'won’t tell', wrong: ['don’t tell', 'am not tell'], why: 'Promisiune: I won’t tell.', g: 'will' },
    ],
  },

  /* ---------------------------------------------------------------- 10 · must, have to, can, should */
  signs: {
    title: 'Regulile biroului', teaches: 'must, have to, can, should', g: 'must',
    intro: 'Pe drumul spre acoperiș sunt multe semne. Ce spune fiecare?',
    rounds: [
      { sign: 'helmet', text: 'You {} wear a helmet on the roof.', right: 'must', wrong: ['mustn’t', 'must to'], why: 'Obligatoriu: must, fără „to”.' },
      { sign: 'nofood', text: 'You {} eat in the lab.', right: 'mustn’t', wrong: ['don’t have to', 'must'], why: 'Interzis: mustn’t.' },
      { sign: 'lift', text: 'You {} use the lift. It’s broken.', right: 'can’t', wrong: ['must', 'should'], why: 'Nu se poate: can’t.', g: 'can' },
      { sign: 'signin', text: 'Visitors {} sign in at reception.', right: 'have to', wrong: ['has to', 'don’t have to'], why: 'Visitors, plural: have to.' },
      { sign: 'stairs', text: 'It’s eight floors. You {} take some water.', right: 'should', wrong: ['mustn’t', 'should to'], why: 'Un sfat: should.', g: 'can' },
      { sign: 'coffee', text: 'The coffee is free. You {} pay.', right: 'don’t have to', wrong: ['mustn’t', 'haven’t'], why: 'Nu e nevoie: don’t have to.' },
      { sign: 'quiet', text: 'You {} talk loudly here.', right: 'mustn’t', wrong: ['don’t have to', 'must'], why: 'Interzis: mustn’t.' },
    ],
  },

  /* ---------------------------------------------------------------- 11 · comparatives */
  compare: {
    title: 'Cea mai strălucitoare', teaches: 'comparativ, superlativ', g: 'comp',
    intro: 'Compară lucrurile. Uneori completezi, alteori atingi.',
    rounds: [
      { set: 'lanterns', text: 'The red lantern is {} than the blue one.', right: 'brighter', wrong: ['more bright', 'the brightest'], why: 'Bright e scurt: brighter than.' },
      { set: 'lanterns', tap: 'Which lantern is the brightest?', at: 2, why: 'Cea care luminează cel mai tare.', g: 'sup' },
      { set: 'ladders', text: 'Tom’s ladder is {} than Sam’s.', right: 'longer', wrong: ['more long', 'longest'], why: 'Long → longer.' },
      { set: 'ladders', tap: 'Which ladder is the shortest?', at: 0, why: 'Cea mai mică.', g: 'sup' },
      { set: 'thermo', text: 'Friday will be {} than tonight.', right: 'colder', wrong: ['more cold', 'coldest'], why: 'Cold → colder.' },
      { set: 'cups', text: 'Tom’s tea is {} than mine.', right: 'better', wrong: ['gooder', 'more good'], why: 'Good → better.' },
      { set: 'sparks', tap: 'Which spark is the biggest?', at: 1, why: 'Cea mai mare.', g: 'sup' },
      { set: 'sparks', text: 'This one is the {} spark of all.', right: 'most beautiful', wrong: ['beautifulest', 'more beautiful'], why: 'Cuvânt lung: the most beautiful.', g: 'sup' },
    ],
  },

  /* ---------------------------------------------------------------- 12 · the whole season */
  lights: {
    title: 'Aprinde strada', teaches: 'tot sezonul', g: 'if1',
    intro: 'Fiecare răspuns bun aprinde o fereastră. Aprinde toată strada pentru Aster.',
    rounds: [
      { text: 'If the sky {} clear, Aster will go home.', right: 'is', wrong: ['will be', 'was'], why: 'După if: prezent.', g: 'if1' },
      { text: 'If you miss me, {} at the tree.', right: 'look', wrong: ['will look', 'looking'], why: 'Un îndemn: look.', g: 'if1' },
      { text: 'Mimi {} the blanket.', right: 'loves', wrong: ['love', 'is loving'], why: 'Mimi = she: loves.', g: 'ps-s' },
      { text: '{} you ever seen a star so close?', right: 'Have', wrong: ['Did', 'Are'], why: 'Ever: Have you ever seen…?', g: 'pp' },
      { text: 'Mrs Hughes has lived here {} 1966.', right: 'since', wrong: ['for', 'from'], why: 'De când: since.', g: 'for-since' },
      { text: 'How {} candles did Priya bring?', right: 'many', wrong: ['much', 'lot'], why: 'Candles se numără: many.', g: 'much-many' },
      { text: 'Look! Everyone {} on the roof.', right: 'is waiting', wrong: ['waits', 'waiting'], why: 'Look!: acum: is waiting.', g: 'pc' },
      { text: 'Yesterday Aster {} its name.', right: 'remembered', wrong: ['remember', 'has remembered'], why: 'Yesterday: trecut simplu.', g: 'past-ed' },
      { text: 'Tonight is the {} night of the year.', right: 'clearest', wrong: ['most clear', 'clearer'], why: 'Cel mai: the clearest.', g: 'sup' },
      { text: 'You {} be sad. It isn’t goodbye forever.', right: 'shouldn’t', wrong: ['shouldn’t to', 'don’t should'], why: 'Sfat: shouldn’t, fără „to”.', g: 'can' },
      { text: 'Mr Moss {} stay on Linden Lane.', right: 'is going to', wrong: ['is going', 'will to'], why: 'Plan hotărât: is going to.', g: 'going-to' },
      { text: 'If you come back, we {} have tea.', right: 'will', wrong: ['would', 'are'], why: 'A doua parte: will.', g: 'if1' },
    ],
  },
};

/** Which game each episode plays, and the ones a set of episodes has unlocked. */
export const EP_GAME = { 1: 'thisthat', 2: 'guesswho', 3: 'photos', 4: 'order', 5: 'shelves', 6: 'room', 7: 'machine', 8: 'timeline', 9: 'plan', 10: 'signs', 11: 'compare', 12: 'lights' };
