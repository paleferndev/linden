// The verb book: a page for every verb of the season, like a page in a grammar book. Opened by tapping a verb in the
// chat, in the episode's ending or in the verb album. Romanian text marks English with `backticks`.
//   s, ing: the he/she/it and -ing forms (past and past participle are in verbs.js)
//   use: what it means and how it's used · ex: [tense, English, Romanian] × 5 (tenses: TENSES in screens/book.js)
//   phrases: [English, Romanian] · traps: [wrong, right, why]: the mistakes Romanian speakers make

export const VERB_BOOK = {
  be: {
    s: 'am / is / are', ing: 'being',
    use: 'A fi. Cu `be` spui cine ești, cum ești, unde ești și câți ani ai: `I’m thirty`. La trecut are două forme: `was` (cu `I`, `he`, `she`, `it`) și `were` (cu `you`, `we`, `they`).',
    ex: [
      ['ps', 'Is Tom at the café today?', 'E Tom la cafenea azi?'],
      ['past', 'We were at home all evening.', 'Am fost acasă toată seara.'],
      ['pp', 'I’ve never been to Scotland.', 'N-am fost niciodată în Scoția.'],
      ['will', 'It’ll be cold tomorrow.', 'Mâine o să fie frig.'],
      ['imp', 'Don’t be late, please.', 'Te rog, nu întârzia.'],
    ],
    phrases: [['How are you?', 'Ce mai faci?'], ['I’m hungry.', 'Mi-e foame.'], ['Be careful!', 'Ai grijă.']],
    traps: [
      ['I have thirty years.', 'I’m thirty.', 'Vârsta se spune cu `be`, nu cu `have`.'],
      ['Where you are?', 'Where are you?', 'La întrebare, `are` trece înaintea subiectului.'],
      ['Is very cold today.', 'It’s very cold today.', 'Propoziția are mereu subiect: aici, `it`.'],
    ],
  },

  have: {
    s: 'has', ing: 'having',
    use: 'A avea. Cu același sens, mai ales în vorbire, se spune des `have got`: `I’ve got a cat`, `she’s got a car`. `Have` apare și în expresii ca `have breakfast` (a lua micul dejun) sau `have a shower` (a face duș).',
    ex: [
      ['ps', 'Mrs Hughes has got a garden with roses.', 'Mrs Hughes are o grădină cu trandafiri.'],
      ['past', 'We had breakfast at Tom’s café.', 'Am luat micul dejun la cafeneaua lui Tom.'],
      ['pp', 'Have you had lunch yet?', 'Ai mâncat deja de prânz?'],
      ['can', 'Can I have a glass of water, please?', 'Îmi dați un pahar cu apă, vă rog?'],
      ['will', 'We won’t have time tomorrow.', 'Mâine n-o să avem timp.'],
    ],
    phrases: [['have breakfast', 'a lua micul dejun'], ['have a shower', 'a face duș'], ['have a good time', 'a se distra'], ['Have a good weekend!', 'Weekend plăcut.']],
    traps: [
      ['She have got a cat.', 'She has got a cat.', 'Cu `he`, `she`, `it`: `has got`.'],
      ['Do you have got a pen?', 'Have you got a pen?', 'Ori `Have you got…?`, ori `Do you have…?`, nu amândouă.'],
      ['I make a shower every morning.', 'I have a shower every morning.', 'Dușul se face cu `have`: `have a shower`.'],
    ],
  },

  look: {
    s: 'looks', ing: 'looking',
    use: 'A se uita, cu intenție: `look at` (la ceva), `look for` (a căuta). Cu un adjectiv înseamnă „a arăta”: `You look tired`.',
    ex: [
      ['ps', 'Tom looks tired today.', 'Tom arată obosit azi.'],
      ['pc', 'I’m looking for my keys.', 'Îmi caut cheile.'],
      ['past', 'She looked at the photo and smiled.', 'S-a uitat la poză și a zâmbit.'],
      ['pp', 'Have you looked in the kitchen?', 'Te-ai uitat în bucătărie?'],
      ['imp', 'Don’t look down.', 'Nu te uita în jos.'],
    ],
    phrases: [['look at', 'a se uita la'], ['look for', 'a căuta'], ['look after', 'a avea grijă de'], ['look like', 'a semăna cu']],
    traps: [
      ['Look this photo.', 'Look at this photo.', 'Te uiți la ceva: `look at`, cu `at`.'],
      ['I’m looking after my keys.', 'I’m looking for my keys.', '„Mă uit după” = `look for`. `Look after` înseamnă „a avea grijă de”.'],
      ['You look like tired.', 'You look tired.', 'Înaintea unui adjectiv, fără `like`: `look tired`.'],
    ],
  },

  see: {
    s: 'sees', ing: 'seeing',
    use: 'A vedea: ce observi cu ochii. `I see` înseamnă și „înțeleg”. Nu se pune la prezentul continuu: pentru ce vezi chiar acum se spune `I can see`.',
    ex: [
      ['ps', 'Mimi sees everything from the window.', 'Mimi vede totul de la fereastră.'],
      ['can', 'I can’t see the moon tonight.', 'Nu văd luna în seara asta.'],
      ['past', 'I saw Tom at the café this morning.', 'L-am văzut pe Tom la cafenea azi-dimineață.'],
      ['pp', 'Have you seen my keys?', 'Mi-ai văzut cheile?'],
      ['will', 'You’ll see the shop on your left.', 'O să vezi magazinul pe stânga.'],
    ],
    phrases: [['I see.', 'Înțeleg.'], ['See you later!', 'Ne vedem mai târziu.'], ['Let’s see.', 'Să vedem.']],
    traps: [
      ['I am seeing the moon.', 'I can see the moon.', 'Ce vezi acum: `can see`, nu `am seeing`.'],
      ['I saw at the picture.', 'I looked at the picture.', 'Când te uiți la ceva: `look at`. `See` nu se folosește cu `at`.'],
      ['I have saw this film.', 'I have seen this film.', 'După `have` vine participiul: `seen`, nu `saw`.'],
    ],
  },

  open: {
    s: 'opens', ing: 'opening',
    use: 'A deschide: o ușă, o fereastră, o sticlă, o scrisoare. Despre magazine înseamnă „a se deschide”: `The café opens at seven`. Pentru „e deschis” se folosește adjectivul: `The shop is open`.',
    ex: [
      ['ps', 'What time does the shop open?', 'La ce oră se deschide magazinul?'],
      ['past', 'Priya opened her shop ten years ago.', 'Priya și-a deschis magazinul acum zece ani.'],
      ['pp', 'I haven’t opened the letter yet.', 'Încă n-am deschis scrisoarea.'],
      ['imp', 'Open the window, please. It’s hot in here.', 'Deschide fereastra, te rog. E cald aici.'],
      ['can', 'I can’t open this jar.', 'Nu pot să deschid borcanul ăsta.'],
    ],
    phrases: [['The shop is open.', 'Magazinul e deschis.'], ['open a bank account', 'a deschide un cont în bancă'], ['open a present', 'a desface un cadou']],
    traps: [
      ['Can you open the light?', 'Can you turn on the light?', 'Lumina și televizorul nu se „deschid”: `turn on`.'],
      ['The shop is opened now.', 'The shop is open now.', 'Starea, „e deschis”: `is open`, fără -ed.'],
    ],
  },

  help: {
    s: 'helps', ing: 'helping',
    use: 'A ajuta pe cineva: `help someone`, fără prepoziție. La ce ajuți: `help with` (`help me with my bags`). Poate urma un verb, cu sau fără `to`: `help me carry`, `help me to carry`.',
    ex: [
      ['ps', 'My sister often helps me with my English.', 'Sora mea mă ajută des la engleză.'],
      ['past', 'You helped me a lot yesterday. Thank you.', 'M-ai ajutat mult ieri. Mulțumesc.'],
      ['pp', 'Has the medicine helped?', 'Te-a ajutat medicamentul?'],
      ['can', 'Sorry, I can’t help you today.', 'Îmi pare rău, azi nu te pot ajuta.'],
      ['will', 'Don’t worry. I’ll help you.', 'Nu-ți face griji. Te ajut eu.'],
    ],
    phrases: [['Can I help you?', 'Cu ce vă pot ajuta?'], ['Help yourself.', 'Servește-te.'], ['I can’t help it.', 'Nu mă pot abține.']],
    traps: [
      ['Can you help me at my homework?', 'Can you help me with my homework?', 'Ajuți pe cineva la ceva: `help with`, nu `at`.'],
      ['Can you help to me?', 'Can you help me?', 'Fără prepoziție: `help me`.'],
      ['Wait, I help you.', 'Wait, I’ll help you.', 'Când te oferi chiar acum: `I’ll help`.'],
    ],
  },

  drink: {
    s: 'drinks', ing: 'drinking',
    use: 'A bea. Fără complement înseamnă de obicei „a bea alcool”: `I don’t drink`. Când comanzi ceva se spune mai des `have`: `I’ll have a coffee, please`.',
    ex: [
      ['ps', 'I don’t drink coffee in the evening.', 'Seara nu beau cafea.'],
      ['pc', 'Mimi is drinking from my glass again.', 'Mimi bea iar din paharul meu.'],
      ['past', 'We drank tea in the garden.', 'Am băut ceai în grădină.'],
      ['pp', 'Who has drunk all the milk?', 'Cine a băut tot laptele?'],
      ['can', 'You should drink more water.', 'Ar trebui să bei mai multă apă.'],
    ],
    phrases: [['something to drink', 'ceva de băut'], ['go for a drink', 'a ieși la un pahar'], ['Drink up.', 'Bea tot.']],
    traps: [
      ['I drinked all the milk.', 'I drank all the milk.', '`Drink` e neregulat: `drank`.'],
      ['I have drank the tea.', 'I have drunk the tea.', 'După `have` vine participiul: `drunk`.'],
      ['I drink a pill every morning.', 'I take a pill every morning.', 'Pastilele se iau: `take`, nu `drink`.'],
    ],
  },

  like: {
    s: 'likes', ing: 'liking',
    use: 'A-i plăcea. În engleză subiectul e persoana căreia îi place: „îmi place cafeaua” = `I like coffee`. După `like` vine des un verb cu -ing (`I like reading`); nu se pune la prezentul continuu.',
    ex: [
      ['ps', 'My brother doesn’t like cats.', 'Fratelui meu nu-i plac pisicile.'],
      ['past', 'Did you like the film?', 'Ți-a plăcut filmul?'],
      ['pp', 'I’ve always liked rainy days.', 'Mi-au plăcut mereu zilele ploioase.'],
      ['will', 'You’ll like Tom. He’s very kind.', 'O să-ți placă Tom. E foarte amabil.'],
      ['going', 'Mimi isn’t going to like this.', 'Lui Mimi n-o să-i placă asta.'],
    ],
    phrases: [['Would you like some tea?', 'Vrei niște ceai?'], ['I’d like a coffee, please.', 'Aș vrea o cafea, vă rog.'], ['I like it here.', 'Îmi place aici.']],
    traps: [
      ['I like very much tea.', 'I like tea very much.', '`Very much` nu stă între verb și complement: vine la sfârșit.'],
      ['Do you like?', 'Do you like it?', '`Like` cere complement: `Do you like it?`'],
      ['She doesn’t likes milk.', 'She doesn’t like milk.', 'După `doesn’t`, verbul e fără -s.'],
    ],
  },

  want: {
    s: 'wants', ing: 'wanting',
    use: 'A vrea; cu alt verb vine `to`: `I want to go home`. Când vrei ca altcineva să facă ceva: `I want you to stay`. Când ceri ceva într-un magazin, `I’d like` sună mai politicos.',
    ex: [
      ['ps', 'What do you want for dinner?', 'Ce vrei la cină?'],
      ['past', 'Sorry, I didn’t want to wake you.', 'Scuze, n-am vrut să te trezesc.'],
      ['pp', 'I’ve always wanted a dog.', 'Mereu mi-am dorit un câine.'],
      ['will', 'Tom will want to see this.', 'Tom o să vrea să vadă asta.'],
      ['going', 'The children are going to want ice cream.', 'Copiii o să vrea înghețată.'],
    ],
    phrases: [['if you want', 'dacă vrei'], ['Do you want a lift?', 'Vrei să te duc cu mașina?'], ['I just wanted to say thank you.', 'Voiam doar să-ți mulțumesc.']],
    traps: [
      ['I want that you stay.', 'I want you to stay.', 'Nu `want that`, ci `want someone to do something`.'],
      ['I want go home.', 'I want to go home.', 'Între `want` și verb vine `to`.'],
      ['No, I don’t want.', 'No, I don’t want to.', 'Când verbul nu se repetă, `to` rămâne: `I don’t want to`.'],
    ],
  },

  need: {
    s: 'needs', ing: 'needing',
    use: 'A avea nevoie de ceva: `I need help`, fără `of`. Cu alt verb vine `to`: `I need to go`. Nu se pune la prezentul continuu.',
    ex: [
      ['ps', 'Do you need anything from the shop?', 'Ai nevoie de ceva de la magazin?'],
      ['past', 'We needed help, so I called Tom.', 'Aveam nevoie de ajutor, așa că l-am sunat pe Tom.'],
      ['pp', 'I’ve never needed a car here.', 'N-am avut niciodată nevoie de mașină aici.'],
      ['will', 'You’ll need an umbrella today.', 'Azi o să ai nevoie de umbrelă.'],
      ['going', 'We’re going to need more chairs.', 'O să avem nevoie de mai multe scaune.'],
    ],
    phrases: [['You don’t need to.', 'Nu e nevoie.'], ['I need a break.', 'Am nevoie de o pauză.'], ['if you need anything', 'dacă ai nevoie de ceva']],
    traps: [
      ['I have need of a pen.', 'I need a pen.', '„Am nevoie de” e un singur verb: `need`, fără `have` și fără `of`.'],
      ['I need go now.', 'I need to go now.', 'Cu alt verb: `need to`.'],
    ],
  },

  work: {
    s: 'works', ing: 'working',
    use: 'A lucra, a munci: `work at` (un loc), `work for` (o firmă), `work as` (o meserie). Despre aparate înseamnă „a merge, a funcționa”: `The lift doesn’t work`.',
    ex: [
      ['ps', 'Priya works six days a week.', 'Priya lucrează șase zile pe săptămână.'],
      ['pc', 'My phone isn’t working again.', 'Iar nu-mi merge telefonul.'],
      ['past', 'Did you work late yesterday?', 'Ai lucrat până târziu ieri?'],
      ['pp', 'Dr Okafor has worked in that office for years.', 'Dr Okafor lucrează în biroul acela de ani de zile.'],
      ['will', 'I’ll work from home tomorrow.', 'Mâine lucrez de acasă.'],
    ],
    phrases: [['go to work', 'a merge la serviciu'], ['at work', 'la serviciu'], ['work hard', 'a munci din greu'], ['It doesn’t work.', 'Nu merge.']],
    traps: [
      ['I work like a teacher.', 'I work as a teacher.', 'Meseria: `work as`, nu `like`.'],
      ['I go to the work at eight.', 'I go to work at eight.', 'Serviciul, fără `the`: `go to work`, `at work`.'],
      ['The lift doesn’t function.', 'The lift doesn’t work.', 'Despre aparate se spune `work`; `function` sună prea tehnic.'],
    ],
  },

  make: {
    s: 'makes', ing: 'making',
    use: 'A face, în sensul de a produce, a crea, a prepara: `make tea`, `make a cake`. Pentru activități și treburi în general se folosește `do`. Multe expresii cu `make` se învață ca atare.',
    ex: [
      ['ps', 'Who makes the coffee in your office?', 'Cine face cafeaua la voi la birou?'],
      ['pc', 'I’m making a cake for Sunday.', 'Fac un tort pentru duminică.'],
      ['past', 'Sorry, I made a mistake.', 'Scuze, am greșit.'],
      ['pp', 'Tom has made tea for everyone.', 'Tom a făcut ceai pentru toată lumea.'],
      ['imp', 'Don’t make a noise. Mimi is sleeping.', 'Nu face zgomot. Mimi doarme.'],
    ],
    phrases: [['make a mistake', 'a greși'], ['make friends', 'a-și face prieteni'], ['make a decision', 'a lua o hotărâre'], ['make a phone call', 'a da un telefon']],
    traps: [
      ['I make my homework in the evening.', 'I do my homework in the evening.', 'Temele se fac cu `do`: `do homework`.'],
      ['I made a photo of the garden.', 'I took a photo of the garden.', 'Pozele se fac cu `take`: `take a photo`.'],
      ['How much does it make?', 'How much is it?', '„Cât face?” se spune `How much is it?`'],
    ],
  },

  do: {
    s: 'does', ing: 'doing',
    use: 'A face, pentru activități și treburi în general: `do homework`, `do the shopping`. Ca verb auxiliar, `do` și `does` formează întrebarea și negația la prezentul simplu (`Do you work?`, `She doesn’t work`), iar `did` la trecut. Când e și verb principal, apare de două ori: `What do you do?`',
    ex: [
      ['ps', 'What do you do on Sundays?', 'Ce faci duminica?'],
      ['pc', 'I’m doing the washing-up.', 'Spăl vasele.'],
      ['past', 'I didn’t do much yesterday.', 'Ieri n-am făcut mare lucru.'],
      ['pp', 'Have you done your homework?', 'Ți-ai făcut temele?'],
      ['will', 'I’ll do the shopping tomorrow.', 'Mâine fac eu cumpărăturile.'],
    ],
    phrases: [['What do you do?', 'Cu ce te ocupi?'], ['do the cleaning', 'a face curat'], ['do your best', 'a face tot ce poți'], ['do some exercise', 'a face mișcare']],
    traps: [
      ['Where you work?', 'Where do you work?', 'La întrebare, la prezentul simplu, ai nevoie de `do`.'],
      ['Does she works here?', 'Does she work here?', 'După `does`, verbul e fără -s.'],
      ['I did a mistake.', 'I made a mistake.', 'Greșeala se face cu `make`: `make a mistake`.'],
    ],
  },

  try: {
    s: 'tries', ing: 'trying',
    use: 'A încerca. `Try to` + verb: faci un efort (`I’ll try to come`). `Try` + un lucru: îl guști sau îl probezi (`Try this cake`); hainele se probează cu `try on`.',
    ex: [
      ['ps', 'Mimi tries to catch birds every day.', 'Mimi încearcă în fiecare zi să prindă păsări.'],
      ['pc', 'I’m trying to sleep. Please be quiet.', 'Încerc să dorm. Te rog, fă liniște.'],
      ['past', 'I tried to call you twice.', 'Am încercat de două ori să te sun.'],
      ['pp', 'Have you ever tried Indian food?', 'Ai gustat vreodată mâncare indiană?'],
      ['imp', 'Don’t try to fix it yourself.', 'Nu încerca să-l repari tu.'],
    ],
    phrases: [['try on', 'a proba (haine)'], ['Try again.', 'Mai încearcă.'], ['try hard', 'a se strădui']],
    traps: [
      ['I tryed to call you.', 'I tried to call you.', 'Consoană + `y`: la trecut `tried`.'],
      ['I try to come tomorrow.', 'I’ll try to come tomorrow.', 'Pentru viitor: `I’ll try`.'],
      ['Try to don’t worry.', 'Try not to worry.', 'Negația: `try not to`.'],
    ],
  },

  fix: {
    s: 'fixes', ing: 'fixing',
    use: 'A repara ceva stricat: `fix the radio`, `fix a bike`. În vorbire se spune mai des decât `repair`. La `he`, `she`, `it`: `fixes`, cu -es.',
    ex: [
      ['ps', 'My dad fixes everything in the house.', 'Tata repară tot prin casă.'],
      ['pc', 'Tom is fixing the coffee machine.', 'Tom repară aparatul de cafea.'],
      ['past', 'Who fixed your bike?', 'Cine ți-a reparat bicicleta?'],
      ['pp', 'They haven’t fixed the lift yet.', 'Încă n-au reparat liftul.'],
      ['will', 'Leave it. I’ll fix it.', 'Lasă, îl repar eu.'],
    ],
    phrases: [['fix a problem', 'a rezolva o problemă'], ['get something fixed', 'a da ceva la reparat'], ['It’s easy to fix.', 'Se repară ușor.']],
    traps: [
      ['I fixed my phone at a shop.', 'I got my phone fixed at a shop.', 'Dacă l-a reparat altcineva: `get something fixed`.'],
      ['He fixs bikes in his garage.', 'He fixes bikes in his garage.', 'După `x`, la `he`, `she`, `it` se adaugă -es: `fixes`.'],
    ],
  },

  build: {
    s: 'builds', ing: 'building',
    use: 'A construi: o casă, un zid, un pod, un model din bucăți. Despre clădiri se folosește des la pasiv: `The house was built in 1900`.',
    ex: [
      ['ps', 'Birds build their nests in spring.', 'Păsările își fac cuiburi primăvara.'],
      ['pc', 'They’re building a new school near us.', 'Construiesc o școală nouă lângă noi.'],
      ['past', 'When was this house built?', 'Când a fost construită casa asta?'],
      ['pp', 'They still haven’t built the new bridge.', 'Încă n-au construit podul cel nou.'],
      ['going', 'We’re going to build a shed in the garden.', 'O să facem o magazie în grădină.'],
    ],
    phrases: [['build a snowman', 'a face un om de zăpadă'], ['build a sandcastle', 'a face un castel de nisip'], ['build a fire', 'a face un foc']],
    traps: [
      ['My grandfather builded this house.', 'My grandfather built this house.', '`Build` e neregulat: `built`.'],
      ['This house was build in 1900.', 'This house was built in 1900.', 'La pasiv, după `was` vine participiul: `built`.'],
      ['We made a house in the village.', 'We built a house in the village.', 'Casa se construiește: `build`, nu `make`.'],
    ],
  },

  watch: {
    s: 'watches', ing: 'watching',
    use: 'A privi, a urmări ceva care se mișcă sau se schimbă: `watch TV`, `watch a film`, `watch a match`. Pentru o poză sau ceva care stă pe loc se spune `look at`. `Watch out` înseamnă „ai grijă”.',
    ex: [
      ['ps', 'Do you watch the news every evening?', 'Te uiți la știri în fiecare seară?'],
      ['pc', 'Mimi is watching the rain.', 'Mimi se uită la ploaie.'],
      ['past', 'We watched a film last night.', 'Aseară ne-am uitat la un film.'],
      ['pp', 'I haven’t watched TV for weeks.', 'Nu m-am mai uitat la televizor de câteva săptămâni.'],
      ['can', 'Can you watch my bag for a minute?', 'Îmi păzești geanta un minut?'],
    ],
    phrases: [['watch TV', 'a se uita la televizor'], ['Watch out!', 'Ai grijă.'], ['Watch your step.', 'Ai grijă pe unde calci.']],
    traps: [
      ['I watched the photo.', 'I looked at the photo.', 'O poză stă pe loc: `look at`. `Watch` e pentru ce se mișcă.'],
      ['We watched at TV all evening.', 'We watched TV all evening.', '`Watch` nu cere prepoziție: `watch TV`.'],
      ['I looked at a film last night.', 'I watched a film last night.', 'Un film îl urmărești: `watch`.'],
    ],
  },

  carry: {
    s: 'carries', ing: 'carrying',
    use: 'A căra, a duce ceva cu tine: în mâini, în brațe, în geantă (`carry a bag`, `carry a baby`). Pentru haine și ochelari, „a purta” e `wear`, nu `carry`.',
    ex: [
      ['ps', 'I always carry a book in my bag.', 'Am mereu o carte în geantă.'],
      ['pc', 'Why are you carrying an umbrella? It’s sunny.', 'De ce ai umbrelă la tine? E soare.'],
      ['past', 'My dad carried me on his shoulders.', 'Tata mă purta pe umeri.'],
      ['pp', 'Has anyone carried the chairs inside?', 'A dus cineva scaunele înăuntru?'],
      ['can', 'This box is too heavy. I can’t carry it.', 'Cutia asta e prea grea. Nu pot s-o car.'],
    ],
    phrases: [['carry on', 'a continua'], ['carry a baby', 'a ține un copil în brațe'], ['carry the shopping', 'a căra cumpărăturile']],
    traps: [
      ['I carry glasses.', 'I wear glasses.', 'Ochelarii și hainele se poartă: `wear`.'],
      ['He carrys the bags.', 'He carries the bags.', 'Consoană + `y`: `carries`, `carried`.'],
    ],
  },

  happen: {
    s: 'happens', ing: 'happening',
    use: 'A se întâmpla. Subiectul e întâmplarea, nu omul: `It happened yesterday.` Cui i se întâmplă ceva: `happen to` cineva.',
    ex: [
      ['ps', 'It happens to everyone.', 'I se întâmplă oricui.'],
      ['pc', 'What’s happening in the street?', 'Ce se întâmplă pe stradă?'],
      ['past', 'What happened to your phone?', 'Ce s-a întâmplat cu telefonul tău?'],
      ['pp', 'This has never happened to me before.', 'Nu mi s-a mai întâmplat niciodată.'],
      ['will', 'Sorry. It won’t happen again.', 'Îmi pare rău. Nu se va mai întâmpla.'],
    ],
    phrases: [['What happened?', 'Ce s-a întâmplat?'], ['What happened to you?', 'Ce ți s-a întâmplat?'], ['These things happen.', 'Se mai întâmplă.']],
    traps: [
      ['It was happened yesterday.', 'It happened yesterday.', '`Happen` nu are pasiv: „s-a întâmplat” e simplu `happened`.'],
      ['What happened with you?', 'What happened to you?', 'Ceva i se întâmplă cuiva: `happen to`, nu `with`.'],
      ['What did happen?', 'What happened?', 'Când `what` e subiectul, întrebarea se face fără `did`.'],
    ],
  },
  stop: {
    s: 'stops', ing: 'stopping',
    use: 'A (se) opri. Ceva se oprește singur (`The bus stops here.`) sau oprești tu ceva. Când nu mai faci un lucru: `stop` + verbul cu `-ing` (`stop talking`).',
    ex: [
      ['ps', 'Does this bus stop near the station?', 'Autobuzul ăsta oprește lângă gară?'],
      ['imp', 'Please stop talking and listen.', 'Vă rog, nu mai vorbiți și ascultați.'],
      ['past', 'The car stopped in front of the house.', 'Mașina s-a oprit în fața casei.'],
      ['pp', 'It has stopped raining.', 'S-a oprit ploaia.'],
      ['can', 'I can’t stop thinking about it.', 'Nu pot să nu mă gândesc la asta.'],
    ],
    phrases: [['Stop it!', 'Încetează.'], ['stop smoking', 'a se lăsa de fumat'], ['stop for a coffee', 'a se opri la o cafea']],
    traps: [
      ['I stopped to smoke last year.', 'I stopped smoking last year.', 'Când te lași de ceva: `stop` + `-ing`. `Stop to smoke` înseamnă că te oprești ca să fumezi.'],
      ['Can you stop the TV?', 'Can you turn off the TV?', 'Aparatele se opresc cu `turn off`, nu cu `stop`.'],
      ['The bus stoped at the corner.', 'The bus stopped at the corner.', 'Vocală scurtă și o consoană la final: consoana se dublează (`stopped`, `stopping`).'],
    ],
  },
  arrive: {
    s: 'arrives', ing: 'arriving',
    use: 'A sosi, a ajunge undeva. Într-un oraș sau o țară: `arrive in` (`arrive in London`); într-un loc anume: `arrive at` (`arrive at the station`). Cu `home` nu se pune prepoziție: `arrive home`.',
    ex: [
      ['ps', 'The train arrives at ten past six.', 'Trenul sosește la șase și zece.'],
      ['pc', 'Hurry up, the guests are arriving.', 'Grăbește-te, sosesc musafirii.'],
      ['past', 'What time did you arrive?', 'La ce oră ai ajuns?'],
      ['pp', 'Your parcel has arrived.', 'Ți-a sosit coletul.'],
      ['will', 'The letter won’t arrive before Monday.', 'Scrisoarea nu ajunge înainte de luni.'],
    ],
    phrases: [['arrive home', 'a ajunge acasă'], ['arrive on time', 'a ajunge la timp'], ['arrive at work', 'a ajunge la serviciu']],
    traps: [
      ['We arrived to the hotel at nine.', 'We arrived at the hotel at nine.', 'După `arrive` nu vine `to`: „la hotel” e `at the hotel`.'],
      ['We arrived at Paris on Monday.', 'We arrived in Paris on Monday.', 'La orașe și țări: `arrive in`.'],
    ],
  },
  walk: {
    s: 'walks', ing: 'walking',
    use: 'A merge pe jos. Spre un loc: `walk to` (`walk to work`); acasă: `walk home`, fără `to`. Plimbarea e `a walk`: `go for a walk`.',
    ex: [
      ['ps', 'I walk to work every day.', 'Merg pe jos la serviciu în fiecare zi.'],
      ['pc', 'I’m not walking in this rain.', 'Nu merg pe jos pe ploaia asta.'],
      ['past', 'We walked home after the film.', 'După film, ne-am întors acasă pe jos.'],
      ['pp', 'I’ve walked ten kilometres today.', 'Azi am mers zece kilometri pe jos.'],
      ['can', 'Can we walk there, or is it too far?', 'Putem merge pe jos până acolo sau e prea departe?'],
    ],
    phrases: [['go for a walk', 'a ieși la plimbare'], ['walk the dog', 'a plimba câinele'], ['walk to school', 'a merge pe jos la școală']],
    traps: [
      ['We walked to home.', 'We walked home.', 'Cu `home` nu se pune `to`: `walk home`.'],
      ['Let’s make a walk.', 'Let’s go for a walk.', '„A face o plimbare” se spune `go for a walk`, nu `make a walk`.'],
    ],
  },
  call: {
    s: 'calls', ing: 'calling',
    use: 'A suna pe cineva la telefon sau a chema pe cineva. Persoana vine direct după verb, fără prepoziție: `call Tom`. Mai înseamnă „a numi”: `We call her Mimi.`',
    ex: [
      ['ps', 'My mum calls me every Sunday.', 'Mama mă sună în fiecare duminică.'],
      ['past', 'I called you twice yesterday.', 'Te-am sunat de două ori ieri.'],
      ['pp', 'Has anyone called the doctor?', 'A chemat cineva doctorul?'],
      ['will', 'I’ll call you tonight.', 'Te sun diseară.'],
      ['imp', 'Please don’t call after ten.', 'Te rog, nu suna după ora zece.'],
    ],
    phrases: [['call someone back', 'a suna pe cineva înapoi'], ['call a taxi', 'a chema un taxi'], ['What’s it called?', 'Cum se numește?']],
    traps: [
      ['I called to Tom yesterday.', 'I called Tom yesterday.', 'Pe cine suni vine direct după `call`, fără `to`.'],
      ['How do you call this in English?', 'What do you call this in English?', '„Cum îi spui?” se spune `What do you call…?`, nu `How`.'],
    ],
  },
  stay: {
    s: 'stays', ing: 'staying',
    use: 'A rămâne undeva sau a sta undeva o vreme: `stay at home`, `stay at a hotel`, `stay with friends`. Nu înseamnă „a sta jos” (`sit`) și nici „a locui” (`live`).',
    ex: [
      ['ps', 'We usually stay with my aunt in summer.', 'Vara stăm de obicei la mătușa mea.'],
      ['past', 'I stayed at home all weekend.', 'Am stat acasă tot weekendul.'],
      ['pp', 'Have you ever stayed in a hotel by the sea?', 'Ai stat vreodată la un hotel la mare?'],
      ['going', 'I’m not going to stay long.', 'N-o să stau mult.'],
      ['imp', 'Stay here. I’ll be back in a minute.', 'Rămâi aici. Mă întorc imediat.'],
    ],
    phrases: [['stay in bed', 'a sta în pat'], ['stay up late', 'a sta treaz până târziu'], ['stay in touch', 'a păstra legătura']],
    traps: [
      ['I stay in London with my family.', 'I live in London with my family.', 'Unde locuiești: `live`. `Stay` e doar pentru o vreme.'],
      ['Stay down, please.', 'Sit down, please.', '„Stai jos” se spune `sit down`. `Stay` înseamnă „a rămâne”.'],
    ],
  },
  buy: {
    s: 'buys', ing: 'buying',
    use: 'A cumpăra. De la cineva: `buy from`; pentru cineva: `buy something for someone` sau `buy someone something`. Trecutul e neregulat: `bought`.',
    ex: [
      ['ps', 'I buy bread at Priya’s shop.', 'Cumpăr pâine de la magazinul lui Priya.'],
      ['past', 'I bought a new coat last week.', 'Mi-am cumpărat o haină nouă săptămâna trecută.'],
      ['pp', 'Have you bought the tickets yet?', 'Ai cumpărat deja biletele?'],
      ['going', 'We’re going to buy a flat next year.', 'Anul viitor o să ne cumpărăm un apartament.'],
      ['can', 'I can’t buy it. It’s too expensive.', 'Nu pot să-l cumpăr. E prea scump.'],
    ],
    phrases: [['buy a ticket', 'a cumpăra un bilet'], ['buy someone a present', 'a-i cumpăra cuiva un cadou'], ['buy something online', 'a cumpăra ceva online']],
    traps: [
      ['I buyed a jacket.', 'I bought a jacket.', '`Buy` e neregulat: `buy – bought – bought`.'],
      ['I bought for my sister a present.', 'I bought my sister a present.', 'Persoana vine imediat după verb, sau la sfârșit cu `for`: `a present for my sister`.'],
      ['I brought it for ten pounds.', 'I bought it for ten pounds.', '`Bought` e trecutul lui `buy`; `brought` vine de la `bring` (a aduce).'],
    ],
  },
  sell: {
    s: 'sells', ing: 'selling',
    use: 'A vinde. Cui vinzi: `sell something to someone` sau `sell someone something`. Prețul vine cu `for`: `sell it for ten pounds`.',
    ex: [
      ['ps', 'The shop on the corner doesn’t sell stamps.', 'Magazinul din colț nu vinde timbre.'],
      ['pc', 'Our neighbours are selling their house.', 'Vecinii noștri își vând casa.'],
      ['past', 'I sold my old bike last month.', 'Mi-am vândut bicicleta veche luna trecută.'],
      ['pp', 'Have they sold all the tickets?', 'Au vândut toate biletele?'],
      ['will', 'I’ll sell you my old phone for twenty pounds.', 'Îți vând telefonul meu vechi cu douăzeci de lire.'],
    ],
    phrases: [['for sale', 'de vânzare'], ['sold out', 'epuizat, s-a vândut tot'], ['sell well', 'a se vinde bine']],
    traps: [
      ['I selled my car.', 'I sold my car.', '`Sell` e neregulat: `sell – sold – sold`.'],
      ['I sold my bike with fifty pounds.', 'I sold my bike for fifty pounds.', '„Cu cincizeci de lire” se spune `for fifty pounds`, nu `with`.'],
      ['She sold to me a lamp.', 'She sold me a lamp.', 'Când persoana vine imediat după verb, nu se pune `to`: `sold me a lamp`.'],
    ],
  },
  cost: {
    s: 'costs', ing: 'costing',
    use: 'A costa. Întrebi prețul cu `How much does it cost?` sau, mai simplu, `How much is it?`. Are aceeași formă la trecut și la participiu (`cost`) și nu se folosește la prezentul continuu.',
    ex: [
      ['ps', 'How much does this lamp cost?', 'Cât costă lampa asta?'],
      ['past', 'My new phone cost a lot of money.', 'Telefonul meu nou a costat mulți bani.'],
      ['pp', 'This trip has cost us a fortune.', 'Excursia asta ne-a costat o avere.'],
      ['will', 'It won’t cost much to fix.', 'Reparația n-o să coste mult.'],
      ['can', 'A taxi to the airport can cost fifty pounds.', 'Un taxi până la aeroport poate costa cincizeci de lire.'],
    ],
    phrases: [['How much is it?', 'Cât costă?'], ['cost a lot', 'a costa mult'], ['It doesn’t cost anything.', 'Nu costă nimic.']],
    traps: [
      ['How much it costs?', 'How much does it cost?', 'La întrebare e nevoie de `does`; după el, `cost` e fără `-s`.'],
      ['It costed ten pounds.', 'It cost ten pounds.', '`Cost` nu se schimbă: `cost – cost – cost`.'],
      ['This coat costs very expensive.', 'This coat is very expensive.', '„Costă scump” se spune `is expensive` sau `costs a lot`.'],
    ],
  },
  pay: {
    s: 'pays', ing: 'paying',
    use: 'A plăti. Suma, persoana sau factura vin direct după verb: `pay ten pounds`, `pay Tom`, `pay the bill`. Lucrul pe care îl cumperi vine cu `for`: `pay for the coffee`.',
    ex: [
      ['ps', 'I usually pay by card.', 'De obicei plătesc cu cardul.'],
      ['past', 'Who paid for the coffee?', 'Cine a plătit cafeaua?'],
      ['pp', 'I haven’t paid the rent yet.', 'Încă n-am plătit chiria.'],
      ['can', 'Can I pay in cash?', 'Pot să plătesc în numerar?'],
      ['will', 'Put your money away. I’ll pay.', 'Lasă banii. Plătesc eu.'],
    ],
    phrases: [['pay the bill', 'a plăti nota'], ['pay attention', 'a fi atent'], ['pay someone back', 'a-i da cuiva banii înapoi']],
    traps: [
      ['I paid the coffee.', 'I paid for the coffee.', 'Pentru lucrul cumpărat: `pay for`.'],
      ['I payed ten pounds.', 'I paid ten pounds.', 'Trecutul se scrie `paid`, nu `payed`.'],
    ],
  },
  find: {
    s: 'finds', ing: 'finding',
    use: 'A găsi. Cât timp cauți, folosești `look for`; `find` e momentul în care ai dat de ce căutai. `Find out` înseamnă „a afla”.',
    ex: [
      ['ps', 'Mimi always finds the warmest place in the house.', 'Mimi găsește mereu cel mai cald loc din casă.'],
      ['past', 'I found some money in my old coat.', 'Am găsit niște bani în haina veche.'],
      ['pp', 'Have you found a new job?', 'Ți-ai găsit o slujbă nouă?'],
      ['can', 'I can’t find my phone anywhere.', 'Nu-mi găsesc telefonul nicăieri.'],
      ['will', 'We’ll find a good flat soon.', 'O să găsim curând un apartament bun.'],
    ],
    phrases: [['find out', 'a afla'], ['find the way', 'a găsi drumul'], ['find time', 'a-și face timp']],
    traps: [
      ['I’m finding my keys.', 'I’m looking for my keys.', 'Cât timp cauți: `look for`. `Find` înseamnă că ai găsit.'],
      ['I finded it under the bed.', 'I found it under the bed.', '`Find` e neregulat: `find – found – found`.'],
    ],
  },
  bring: {
    s: 'brings', ing: 'bringing',
    use: 'A aduce ceva sau pe cineva spre locul în care ești tu (sau în care va fi cel cu care vorbești). Când duci ceva de aici în altă parte, folosești `take`.',
    ex: [
      ['ps', 'The postman brings the letters at ten.', 'Poștașul aduce scrisorile la zece.'],
      ['past', 'My sister brought a cake to the party.', 'Sora mea a adus un tort la petrecere.'],
      ['pp', 'I haven’t brought an umbrella.', 'Nu mi-am luat umbrelă.'],
      ['can', 'Can you bring me a glass of water?', 'Îmi poți aduce un pahar cu apă?'],
      ['will', 'I’ll bring the photos tomorrow.', 'Aduc pozele mâine.'],
    ],
    phrases: [['bring something back', 'a aduce ceva înapoi'], ['bring a friend', 'a veni cu un prieten'], ['bring someone something', 'a-i aduce cuiva ceva']],
    traps: [
      ['Can you bring this letter to the post office?', 'Can you take this letter to the post office?', 'Spre alt loc, nu spre tine: `take`. `Bring` înseamnă spre tine.'],
      ['She bringed some flowers.', 'She brought some flowers.', '`Bring` e neregulat: `bring – brought – brought`.'],
      ['I bought my laptop to work.', 'I brought my laptop to work.', '`Brought` vine de la `bring`; `bought` e trecutul lui `buy`.'],
    ],
  },
  put: {
    s: 'puts', ing: 'putting',
    use: 'A pune ceva undeva. După `put` vin lucrul și locul: `put the cup on the table`. Are o singură formă: `put – put – put`.',
    ex: [
      ['ps', 'I always put sugar in my tea.', 'Pun mereu zahăr în ceai.'],
      ['pc', 'Tom is putting the chairs outside.', 'Tom scoate scaunele afară.'],
      ['past', 'Where did you put the scissors?', 'Unde ai pus foarfeca?'],
      ['pp', 'I’ve put the milk in the fridge.', 'Am pus laptele în frigider.'],
      ['imp', 'Don’t put your feet on the sofa.', 'Nu pune picioarele pe canapea.'],
    ],
    phrases: [['put on a coat', 'a-și pune o haină'], ['put away', 'a pune la loc'], ['put the kettle on', 'a pune apa la fiert']],
    traps: [
      ['I putted the book on the shelf.', 'I put the book on the shelf.', '`Put` nu se schimbă: `put – put – put`.'],
      ['Put your coat. It’s cold.', 'Put your coat on. It’s cold.', 'Pentru haine: `put on`. Fără `on`, după `put` trebuie un loc.'],
    ],
  },
  leave: {
    s: 'leaves', ing: 'leaving',
    use: 'Are două sensuri: a pleca (`leave home`, `leave at six`) și a lăsa ceva undeva (`leave your bag here`). Locul din care pleci vine direct după verb (`leave the office`); spre un loc: `leave for London`.',
    ex: [
      ['ps', 'My train leaves at half past seven.', 'Trenul meu pleacă la șapte și jumătate.'],
      ['pc', 'Are you leaving already?', 'Pleci deja?'],
      ['past', 'I left my umbrella on the bus.', 'Mi-am uitat umbrela în autobuz.'],
      ['pp', 'Dr Okafor has just left the office.', 'Dr Okafor tocmai a plecat de la birou.'],
      ['imp', 'Don’t leave the door open.', 'Nu lăsa ușa deschisă.'],
    ],
    phrases: [['leave a message', 'a lăsa un mesaj'], ['leave someone alone', 'a lăsa pe cineva în pace'], ['leave for work', 'a pleca la serviciu']],
    traps: [
      ['I forgot my keys at home.', 'I left my keys at home.', 'Când spui unde ai uitat ceva: `leave`. `Forget` nu merge cu locul.'],
      ['Leave me to pay.', 'Let me pay.', '„Lasă-mă să…” se spune `let me`, nu `leave me`.'],
      ['We’re leaving to Paris on Friday.', 'We’re leaving for Paris on Friday.', 'Spre un loc: `leave for`, nu `to`.'],
    ],
  },
  hide: {
    s: 'hides', ing: 'hiding',
    use: 'A ascunde ceva (`hide the money`) sau a se ascunde. Pentru „a se ascunde” e de ajuns `hide`: `Mimi is hiding.` De cineva: `hide from someone`.',
    ex: [
      ['ps', 'Mimi hides under the bed when there’s a storm.', 'Mimi se ascunde sub pat când e furtună.'],
      ['pc', 'Why are you hiding behind the door?', 'De ce te ascunzi după ușă?'],
      ['past', 'I hid the presents in the wardrobe.', 'Am ascuns cadourile în șifonier.'],
      ['pp', 'I haven’t hidden anything from you.', 'Nu ți-am ascuns nimic.'],
      ['imp', 'Hide the chocolate before the children see it.', 'Ascunde ciocolata până n-o văd copiii.'],
    ],
    phrases: [['hide from someone', 'a se ascunde de cineva'], ['hide something from someone', 'a ascunde ceva de cineva'], ['play hide-and-seek', 'a se juca de-a v-ați ascunselea']],
    traps: [
      ['I hided the key.', 'I hid the key.', '`Hide` e neregulat: `hide – hid – hidden`.'],
      ['Where have you hid the money?', 'Where have you hidden the money?', 'După `have` vine participiul: `hidden`.'],
    ],
  },
  lose: {
    s: 'loses', ing: 'losing',
    use: 'A pierde: un lucru (`lose your keys`), un meci, kilograme (`lose weight`). Un autobuz sau o ocazie nu le pierzi cu `lose`, ci le ratezi: `miss`.',
    ex: [
      ['ps', 'My brother often loses his gloves.', 'Fratele meu își pierde des mănușile.'],
      ['past', 'We lost the match on Saturday.', 'Am pierdut meciul de sâmbătă.'],
      ['pp', 'Have you lost something?', 'Ai pierdut ceva?'],
      ['going', 'You’re going to lose your hat in this wind.', 'O să-ți pierzi pălăria pe vântul ăsta.'],
      ['imp', 'Don’t lose the receipt.', 'Să nu pierzi bonul.'],
    ],
    phrases: [['lose weight', 'a slăbi'], ['lose your way', 'a te rătăci'], ['lose touch', 'a pierde legătura']],
    traps: [
      ['I lost the bus this morning.', 'I missed the bus this morning.', 'Autobuzul, trenul sau o ocazie: `miss`, nu `lose`.'],
      ['I losed my wallet.', 'I lost my wallet.', '`Lose` e neregulat: `lose – lost – lost`.'],
      ['I don’t want to loose my job.', 'I don’t want to lose my job.', 'Verbul se scrie `lose`; `loose` înseamnă „larg”.'],
    ],
  },
  move: {
    s: 'moves', ing: 'moving',
    use: 'A (se) mișca și a muta ceva din loc (`move the table`). Mai înseamnă „a se muta” în altă casă sau în alt oraș: `move house`, `move to London`.',
    ex: [
      ['ps', 'The queue moves very slowly.', 'Coada înaintează foarte încet.'],
      ['past', 'We moved to a bigger flat last year.', 'Anul trecut ne-am mutat într-un apartament mai mare.'],
      ['pp', 'Have you ever moved house?', 'Te-ai mutat vreodată?'],
      ['can', 'Can you help me move the sofa?', 'Mă ajuți să mut canapeaua?'],
      ['imp', 'Don’t move. There’s a bee on your arm.', 'Nu mișca. Ai o albină pe braț.'],
    ],
    phrases: [['move house', 'a se muta'], ['move in', 'a se muta (într-o locuință)'], ['move out', 'a se muta (dintr-o locuință)']],
    traps: [
      ['We moved in London last year.', 'We moved to London last year.', 'Te muți într-un oraș: `move to`.'],
      ['I moved myself to a new flat.', 'I moved to a new flat.', '„A se muta” e doar `move`, fără `myself`.'],
    ],
  },
  fall: {
    s: 'falls', ing: 'falling',
    use: 'A cădea: `fall off` (de pe ceva), `fall down` (jos), `fall into` (în ceva). `Fall asleep` înseamnă „a adormi”. Când scapi ceva din mână, folosești `drop`.',
    ex: [
      ['ps', 'The leaves fall in autumn.', 'Frunzele cad toamna.'],
      ['past', 'I fell off my bike yesterday.', 'Ieri am căzut de pe bicicletă.'],
      ['pp', 'Has Mimi fallen asleep?', 'A adormit Mimi?'],
      ['can', 'Be careful. You could fall.', 'Ai grijă. Ai putea să cazi.'],
      ['will', 'Don’t worry, the ladder won’t fall.', 'Stai liniștit, scara nu cade.'],
    ],
    phrases: [['fall asleep', 'a adormi'], ['fall in love', 'a se îndrăgosti'], ['fall over', 'a cădea (împiedicându-te)']],
    traps: [
      ['I falled down the stairs.', 'I fell down the stairs.', '`Fall` e neregulat: `fall – fell – fallen`.'],
      ['I fell my phone.', 'I dropped my phone.', 'Ce scapi din mână: `drop`. `Fall` nu are obiect.'],
      ['I felt off the chair.', 'I fell off the chair.', '`Fell` e trecutul lui `fall`; `felt` e trecutul lui `feel`.'],
    ],
  },

  go: {
    s: 'goes', ing: 'going',
    use: 'Înseamnă „a merge”, „a se duce”. Locul vine cu `to` (`go to work`), dar `home` nu ia `to`: `go home`. Cu activități: `go shopping`, `go for a walk`.',
    ex: [
      ['ps', 'Mimi doesn’t go out when it rains.', 'Mimi nu iese afară când plouă.'],
      ['pc', 'Where are you going?', 'Unde te duci?'],
      ['past', 'We went to the seaside last summer.', 'Am fost la mare vara trecută.'],
      ['pp', 'Priya isn’t here. She’s gone home.', 'Priya nu e aici. A plecat acasă.'],
      ['will', 'I’ll go with you.', 'Merg eu cu tine.'],
    ],
    phrases: [['go home', 'a merge acasă'], ['go shopping', 'a merge la cumpărături'], ['go to bed', 'a merge la culcare'], ['go for a walk', 'a merge la plimbare']],
    traps: [
      ['I went to home.', 'I went home.', 'Înainte de `home` nu se pune `to`.'],
      ['We go to shopping on Saturdays.', 'We go shopping on Saturdays.', 'Cu activitățile în `-ing` nu se pune `to`: `go shopping`, `go swimming`.'],
      ['Have you ever gone to Scotland?', 'Have you ever been to Scotland?', '„Ai fost vreodată” se spune cu `been`, nu cu `gone`.'],
    ],
  },
  take: {
    s: 'takes', ing: 'taking',
    use: 'Înseamnă „a lua”: iei ceva cu mâna sau duci ceva cu tine în alt loc (spre tine e `bring`). Se folosește și pentru transport (`take the bus`) și pentru timp (`it takes an hour` = durează o oră).',
    ex: [
      ['ps', 'It takes ten minutes to walk to the café.', 'Până la cafenea faci zece minute pe jos.'],
      ['past', 'Who took my umbrella?', 'Cine mi-a luat umbrela?'],
      ['pp', 'I’ve taken lots of photos today.', 'Am făcut o grămadă de poze azi.'],
      ['imp', 'Take a coat. It’s cold outside.', 'Ia-ți o haină. E frig afară.'],
      ['can', 'You can’t take photos in the museum.', 'În muzeu nu ai voie să faci poze.'],
    ],
    phrases: [['take a photo', 'a face o poză'], ['take the bus', 'a lua autobuzul'], ['take a break', 'a lua o pauză'], ['It takes an hour.', 'Durează o oră.']],
    traps: [
      ['Can you take me a glass of water?', 'Can you bring me a glass of water?', 'Ce vine spre tine: `bring`. Ce duci în altă parte: `take`.'],
      ['I made a photo of the garden.', 'I took a photo of the garden.', 'Poza se face cu `take`: `take a photo`, nu `make`.'],
    ],
  },
  get: {
    s: 'gets', ing: 'getting',
    use: 'Are multe sensuri: „a primi” (`get a message`), „a ajunge” (`get home`, `get to work`), „a lua, a cumpăra” (`get some milk`) și „a deveni” (`get cold`, `get tired`). Trecutul și participiul sunt `got`.',
    ex: [
      ['ps', 'I usually get home at six.', 'De obicei ajung acasă la șase.'],
      ['pc', 'It’s getting dark outside.', 'Afară se întunecă.'],
      ['past', 'Did you get my message?', 'Ai primit mesajul meu?'],
      ['pp', 'My sister has just got home.', 'Sora mea tocmai a ajuns acasă.'],
      ['can', 'I couldn’t get a taxi last night.', 'Aseară n-am reușit să prind un taxi.'],
    ],
    phrases: [['get up', 'a se scula'], ['get home', 'a ajunge acasă'], ['get on the bus', 'a urca în autobuz'], ['get better', 'a se face bine']],
    traps: [
      ['How do I get at the station?', 'How do I get to the station?', 'Ajungi undeva: `get to`, nu `get at`.'],
      ['It makes cold.', 'It’s getting cold.', '„Se face frig” e `it’s getting cold`, nu `it makes`.'],
    ],
  },
  give: {
    s: 'gives', ing: 'giving',
    use: 'Înseamnă „a da”. Persoana poate veni direct după verb, fără `to` (`give Tom the key`), sau la sfârșit, cu `to` (`give the key to Tom`).',
    ex: [
      ['ps', 'Mrs Hughes gives me roses every summer.', 'Doamna Hughes îmi dă trandafiri în fiecare vară.'],
      ['past', 'My dad gave me this watch.', 'Ceasul ăsta mi l-a dat tata.'],
      ['pp', 'Have you given Mimi her dinner?', 'I-ai dat de mâncare lui Mimi?'],
      ['imp', 'Give me a minute, please.', 'Dă-mi un minut, te rog.'],
      ['can', 'I can’t give you an answer today.', 'Nu-ți pot da un răspuns azi.'],
    ],
    phrases: [['give someone a hand', 'a da cuiva o mână de ajutor'], ['give up', 'a renunța'], ['give back', 'a da înapoi'], ['give someone a call', 'a da cuiva un telefon']],
    traps: [
      ['Give to me the key.', 'Give me the key.', 'Persoana vine direct după `give`, fără `to`.'],
      ['I gave the exam yesterday.', 'I took the exam yesterday.', '„A da un examen” se spune `take an exam`.'],
    ],
  },
  say: {
    s: 'says', ing: 'saying',
    use: 'Înseamnă „a spune”, „a zice”: contează ce spui, nu cui. Când spui și cui, se folosește de obicei `tell`: `tell me`, `tell Tom`.',
    ex: [
      ['ps', 'Tom always says hello to Mimi.', 'Tom o salută mereu pe Mimi.'],
      ['past', 'He didn’t say a word all evening.', 'N-a scos o vorbă toată seara.'],
      ['pp', 'I’ve already said sorry twice.', 'Mi-am cerut deja scuze de două ori.'],
      ['can', 'Could you say that again, please?', 'Poți să repeți, te rog?'],
      ['imp', 'Say thank you to Mrs Hughes.', 'Mulțumește-i doamnei Hughes.'],
    ],
    phrases: [['say hello', 'a saluta'], ['say sorry', 'a-și cere scuze'], ['say yes', 'a spune da, a accepta']],
    traps: [
      ['He said me his name.', 'He told me his name.', '`Say` nu ia persoana direct după el. Cu persoană: `tell me`.'],
      ['What said Tom?', 'What did Tom say?', 'Întrebarea la trecut se face cu `did`, iar verbul rămâne `say`.'],
    ],
  },
  tell: {
    s: 'tells', ing: 'telling',
    use: 'Înseamnă „a spune cuiva”: după `tell` vine aproape mereu persoana, fără `to` (`tell me`, `tell Tom`). Se mai folosește în `tell a story` și `tell the truth`.',
    ex: [
      ['ps', 'My gran tells the best stories.', 'Bunica mea spune cele mai frumoase povești.'],
      ['past', 'Why didn’t you tell me?', 'De ce nu mi-ai spus?'],
      ['pp', 'I’ve told you a hundred times.', 'Ți-am spus de o sută de ori.'],
      ['can', 'Can you tell me the way to the station?', 'Îmi poți spune cum ajung la gară?'],
      ['will', 'I won’t tell anyone.', 'N-o să spun nimănui.'],
    ],
    phrases: [['tell the truth', 'a spune adevărul'], ['tell a story', 'a spune o poveste'], ['tell a lie', 'a spune o minciună']],
    traps: [
      ['Tell to me what happened.', 'Tell me what happened.', 'Persoana vine direct după `tell`, fără `to`.'],
      ['He told that he was tired.', 'He said that he was tired.', 'Fără persoană: `say`. Cu persoană: `tell me`, `tell Tom`.'],
    ],
  },
  hear: {
    s: 'hears', ing: 'hearing',
    use: 'Înseamnă „a auzi”: sunetul îți ajunge la ureche, fără să vrei. Când asculți cu atenție, se spune `listen to`. De obicei nu se folosește la prezentul continuu: ce auzi acum e `I can hear`.',
    ex: [
      ['ps', 'My grandad doesn’t hear very well.', 'Bunicul meu nu aude prea bine.'],
      ['can', 'Can you hear me?', 'Mă auzi?'],
      ['past', 'I heard a strange noise last night.', 'Azi-noapte am auzit un zgomot ciudat.'],
      ['pp', 'Have you heard the news?', 'Ai auzit noutățile?'],
      ['will', 'You’ll hear from me soon.', 'O să-ți dau de veste curând.'],
    ],
    phrases: [['hear from someone', 'a primi vești de la cineva'], ['hear about something', 'a afla despre ceva'], ['I can’t hear you.', 'Nu te aud.']],
    traps: [
      ['I am hearing music.', 'I can hear music.', 'Ce auzi acum: `can hear`, nu `am hearing`.'],
      ['Hear me, please.', 'Listen to me, please.', 'Când vrei atenția cuiva: `listen to`. `Hear` e doar „a auzi”.'],
    ],
  },
  feel: {
    s: 'feels', ing: 'feeling',
    use: 'Înseamnă „a simți” și „a se simți”. După el vine un adjectiv (`I feel tired`, `I feel better`), fără `myself`. Despre cum te simți acum se poate folosi și prezentul continuu: `How are you feeling?`',
    ex: [
      ['ps', 'I feel much better today.', 'Azi mă simt mult mai bine.'],
      ['pc', 'How are you feeling?', 'Cum te simți?'],
      ['past', 'I didn’t feel well yesterday.', 'Ieri nu m-am simțit bine.'],
      ['pp', 'I’ve felt tired all week.', 'M-am simțit obosit toată săptămâna.'],
      ['can', 'I can feel the wind on my face.', 'Simt vântul pe față.'],
    ],
    phrases: [['feel like a cup of tea', 'a avea chef de un ceai'], ['feel at home', 'a se simți ca acasă'], ['feel sorry for someone', 'a-i părea rău de cineva']],
    traps: [
      ['I feel myself tired.', 'I feel tired.', '„Mă simt” e doar `I feel`, fără `myself`.'],
      ['I don’t feel like to go out.', 'I don’t feel like going out.', 'După `feel like` vine forma cu `-ing`.'],
    ],
  },
  forget: {
    s: 'forgets', ing: 'forgetting',
    use: 'Înseamnă „a uita”. `Forget to` + verb: uiți să faci ceva. Când spui și locul unde ai uitat un lucru, se folosește `leave`: `I left my keys at home`.',
    ex: [
      ['ps', 'I often forget people’s names.', 'Uit des numele oamenilor.'],
      ['past', 'Did you forget your keys again?', 'Iar ți-ai uitat cheile?'],
      ['pp', 'I’ve forgotten my password.', 'Mi-am uitat parola.'],
      ['imp', 'Don’t forget to call your mum.', 'Nu uita s-o suni pe mama ta.'],
      ['will', 'I’ll never forget that day.', 'N-o să uit niciodată ziua aceea.'],
    ],
    phrases: [['forget to do something', 'a uita să faci ceva'], ['Forget it.', 'Lasă, nu contează.'], ['I almost forgot.', 'Era să uit.']],
    traps: [
      ['I forgot my umbrella at home.', 'I left my umbrella at home.', 'Când spui locul, se folosește `leave`: `I left it at home`.'],
      ['Don’t forget calling me.', 'Don’t forget to call me.', 'Ce ai de făcut: `forget to` + verb.'],
    ],
  },
  remember: {
    s: 'remembers', ing: 'remembering',
    use: 'Înseamnă „a-și aminti”, „a ține minte”, fără pronume: „îmi amintesc” e `I remember`. `Remember to` + verb: să nu uiți să faci ceva. Nu se folosește la prezentul continuu.',
    ex: [
      ['ps', 'I don’t remember his name.', 'Nu-mi amintesc cum îl cheamă.'],
      ['past', 'Did you remember to buy milk?', 'Ți-ai amintit să cumperi lapte?'],
      ['pp', 'I’ve just remembered something.', 'Tocmai mi-am amintit ceva.'],
      ['imp', 'Remember to take your keys.', 'Nu uita să-ți iei cheile.'],
      ['can', 'I can still remember my first day at school.', 'Îmi amintesc și acum prima zi de școală.'],
    ],
    phrases: [['remember to do something', 'a nu uita să faci ceva'], ['if I remember correctly', 'dacă îmi amintesc bine'], ['remember someone’s birthday', 'a ține minte ziua cuiva']],
    traps: [
      ['I remember myself that day.', 'I remember that day.', '„Îmi amintesc” e doar `I remember`, fără `myself`.'],
      ['Remember me to call Tom.', 'Remind me to call Tom.', 'Când altcineva te ajută să-ți amintești: `remind`.'],
      ['I’m remembering her face.', 'I remember her face.', '`Remember` nu se folosește la prezentul continuu.'],
    ],
  },
  meet: {
    s: 'meets', ing: 'meeting',
    use: 'Înseamnă „a se întâlni cu cineva” (`meet Tom at the café`) și „a cunoaște pe cineva” prima dată (`Nice to meet you`). Fără pronume: „ne întâlnim” e `we meet`.',
    ex: [
      ['ps', 'We meet at the café every Friday.', 'Ne vedem la cafenea în fiecare vineri.'],
      ['pc', 'I’m meeting Sam after work.', 'Mă văd cu Sam după serviciu.'],
      ['past', 'I met my best friend at school.', 'Pe cel mai bun prieten al meu l-am cunoscut la școală.'],
      ['pp', 'Have you met Priya?', 'Ai cunoscut-o pe Priya?'],
      ['can', 'I can’t meet you tomorrow.', 'Mâine nu pot să ne vedem.'],
    ],
    phrases: [['Nice to meet you.', 'Încântat de cunoștință.'], ['meet new people', 'a cunoaște oameni noi'], ['meet for coffee', 'a se vedea la o cafea']],
    traps: [
      ['I knew him last year.', 'I met him last year.', 'Când cunoști pe cineva prima dată: `meet`. `Know` e „a cunoaște” de mai mult timp.'],
      ['We met us at the café.', 'We met at the café.', '„Ne-am întâlnit” e doar `we met`, fără `us`.'],
    ],
  },
  know: {
    s: 'knows', ing: 'knowing',
    use: 'Înseamnă „a ști” (`I know the answer`) și „a cunoaște” pe cineva sau un loc (`I know Tom`). Nu se folosește la prezentul continuu.',
    ex: [
      ['ps', 'Do you know Mrs Hughes?', 'O cunoști pe doamna Hughes?'],
      ['past', 'I didn’t know that.', 'Nu știam asta.'],
      ['pp', 'I’ve known Tom for ten years.', 'Îl cunosc pe Tom de zece ani.'],
      ['will', 'We’ll know the results tomorrow.', 'Mâine o să știm rezultatele.'],
      ['can', 'Ask Sam. He should know the way.', 'Întreabă-l pe Sam. El ar trebui să știe drumul.'],
    ],
    phrases: [['I don’t know.', 'Nu știu.'], ['Let me know.', 'Anunță-mă.'], ['as far as I know', 'din câte știu']],
    traps: [
      ['I am knowing the answer.', 'I know the answer.', '`Know` nu se folosește la prezentul continuu.'],
      ['I know him since 2010.', 'I’ve known him since 2010.', 'De atunci până acum: prezentul perfect, `I’ve known`.'],
    ],
  },
  plan: {
    s: 'plans', ing: 'planning',
    use: 'Înseamnă „a plănui”, „a avea de gând”. Merge cu un substantiv (`plan a trip`) sau cu `to` + verb (`plan to visit`). La `-ing` și la trecut se dublează `n`: `planning`, `planned`.',
    ex: [
      ['ps', 'We usually plan our holidays in January.', 'De obicei ne plănuim vacanțele în ianuarie.'],
      ['pc', 'What are you planning to do this weekend?', 'Ce ai de gând să faci weekendul ăsta?'],
      ['past', 'I didn’t plan to stay so long.', 'N-aveam de gând să stau atât.'],
      ['pp', 'Tom has planned a party for Saturday.', 'Tom a plănuit o petrecere pentru sâmbătă.'],
      ['can', 'We should plan the trip together.', 'Ar trebui să plănuim excursia împreună.'],
    ],
    phrases: [['plan a trip', 'a plănui o călătorie'], ['plan to do something', 'a avea de gând să faci ceva'], ['plan ahead', 'a plănui din timp']],
    traps: [
      ['I planed everything.', 'I planned everything.', 'La trecut se dublează `n`: `planned`.'],
      ['I’m planning visit my aunt.', 'I’m planning to visit my aunt.', 'După `plan` vine `to` + verb.'],
    ],
  },
  send: {
    s: 'sends', ing: 'sending',
    use: 'Înseamnă „a trimite”: un mesaj, o scrisoare, un colet. Persoana poate veni direct după verb (`send me a photo`) sau la sfârșit, cu `to` (`send it to Tom`).',
    ex: [
      ['ps', 'My mum sends me a message every morning.', 'Mama îmi trimite un mesaj în fiecare dimineață.'],
      ['past', 'I sent you an email last night.', 'Ți-am trimis un e-mail aseară.'],
      ['pp', 'Have you sent the card to your gran?', 'I-ai trimis felicitarea bunicii tale?'],
      ['will', 'I’ll send you the photos tomorrow.', 'Îți trimit pozele mâine.'],
      ['imp', 'Don’t send it yet.', 'Nu-l trimite încă.'],
    ],
    phrases: [['send a message', 'a trimite un mesaj'], ['send a parcel', 'a trimite un colet'], ['Send my love to your mum.', 'Transmite-i mamei tale salutări cu drag.']],
    traps: [
      ['I sended the letter.', 'I sent the letter.', 'Trecutul lui `send` e `sent`.'],
      ['Send to me the photo.', 'Send me the photo.', 'Persoana vine direct după `send`, fără `to`.'],
    ],
  },
  decide: {
    s: 'decides', ing: 'deciding',
    use: 'Înseamnă „a hotărî”, „a se decide”. Merge cu `to` + verb (`decide to stay`) sau cu un cuvânt de întrebare (`decide what to do`). Fără pronume: „mă hotărăsc” e `I decide`.',
    ex: [
      ['ps', 'My sister always decides where we go.', 'Mereu sora mea hotărăște unde mergem.'],
      ['past', 'We decided to stay at home.', 'Am hotărât să rămânem acasă.'],
      ['pp', 'Have you decided what to order?', 'Te-ai hotărât ce comanzi?'],
      ['can', 'I can’t decide which one to buy.', 'Nu mă pot hotărî pe care să-l cumpăr.'],
      ['will', 'We’ll decide after dinner.', 'Hotărâm după cină.'],
    ],
    phrases: [['decide to do something', 'a hotărî să faci ceva'], ['decide what to do', 'a hotărî ce să faci'], ['make a decision', 'a lua o hotărâre']],
    traps: [
      ['I decided staying at home.', 'I decided to stay at home.', 'După `decide` vine `to` + verb.'],
      ['I have decided yesterday.', 'I decided yesterday.', 'Cu `yesterday` se folosește trecutul simplu.'],
      ['I can’t decide me.', 'I can’t decide.', '„Nu mă pot hotărî” e `I can’t decide`, fără `me`.'],
    ],
  },
  prepare: {
    s: 'prepares', ing: 'preparing',
    use: 'Înseamnă „a pregăti” ceva (`prepare dinner`, `prepare a room`). „A se pregăti pentru ceva” e `prepare for` sau, mai des în vorbire, `get ready for`.',
    ex: [
      ['ps', 'Tom prepares the sandwiches every morning.', 'Tom pregătește sandvișurile în fiecare dimineață.'],
      ['pc', 'I’m preparing for an exam.', 'Mă pregătesc pentru un examen.'],
      ['past', 'Who prepared this lovely dinner?', 'Cine a pregătit cina asta minunată?'],
      ['pp', 'We haven’t prepared anything yet.', 'Încă n-am pregătit nimic.'],
      ['going', 'I’m going to prepare the spare room for my sister.', 'O să pregătesc camera de oaspeți pentru sora mea.'],
    ],
    phrases: [['prepare dinner', 'a pregăti cina'], ['prepare for an exam', 'a se pregăti pentru un examen'], ['be prepared', 'a fi pregătit']],
    traps: [
      ['We prepared us for the trip.', 'We got ready for the trip.', '„Ne-am pregătit” e `we got ready` sau `we prepared`, fără `us`.'],
      ['I’m preparing my exam.', 'I’m preparing for my exam.', 'Când înveți pentru examen: `prepare for`. `Prepare an exam` face profesorul.'],
    ],
  },
  promise: {
    s: 'promises', ing: 'promising',
    use: 'Înseamnă „a promite”. Merge cu `to` + verb (`promise to call`) sau cu o propoziție (`I promise I’ll call`). Ce promiți pentru viitor se spune cu `will`.',
    ex: [
      ['ps', 'I promise I’ll be careful.', 'Promit că o să fiu atent.'],
      ['past', 'You promised to help me.', 'Ai promis că mă ajuți.'],
      ['pp', 'Tom hasn’t promised anything.', 'Tom n-a promis nimic.'],
      ['can', 'Can you promise me that?', 'Poți să-mi promiți asta?'],
      ['imp', 'Promise me you won’t tell anyone.', 'Promite-mi că nu spui nimănui.'],
    ],
    phrases: [['I promise.', 'Promit.'], ['keep a promise', 'a-și ține promisiunea'], ['break a promise', 'a nu-și ține promisiunea']],
    traps: [
      ['I promise I come tomorrow.', 'I promise I’ll come tomorrow.', 'Ce promiți pentru viitor: `will`.'],
      ['She promised to me a present.', 'She promised me a present.', 'Persoana vine direct după `promise`, fără `to`.'],
    ],
  },
  return: {
    s: 'returns', ing: 'returning',
    use: 'Înseamnă „a se întoarce” (`return home`) și „a da înapoi” (`return a book`). E puțin mai formal; în vorbire se spune des `come back`, `go back` sau `give back`.',
    ex: [
      ['ps', 'Sam returns home at six in the morning.', 'Sam se întoarce acasă la șase dimineața.'],
      ['past', 'When did you return from your holiday?', 'Când te-ai întors din concediu?'],
      ['pp', 'I haven’t returned the book to the library yet.', 'Încă n-am dus cartea înapoi la bibliotecă.'],
      ['will', 'Dr Okafor will return on Monday.', 'Dr Okafor se întoarce luni.'],
      ['can', 'You must return the key by Friday.', 'Trebuie să dai cheia înapoi până vineri.'],
    ],
    phrases: [['return home', 'a se întoarce acasă'], ['return a book', 'a returna o carte'], ['return a call', 'a suna pe cineva înapoi'], ['a return ticket', 'un bilet dus-întors']],
    traps: [
      ['I returned back home.', 'I returned home.', '`Return` înseamnă deja „a se întoarce”: fără `back`.'],
      ['I’ll return you the book tomorrow.', 'I’ll return the book to you tomorrow.', 'Cu `return`, persoana vine la sfârșit, cu `to`.'],
    ],
  },

  borrow: {
    s: 'borrows', ing: 'borrowing',
    use: 'Iei ceva de la cineva și îl dai înapoi mai târziu: `borrow something from someone`. Când tu dai ceva cuiva, verbul e `lend`.',
    ex: [
      ['ps', 'My sister often borrows my clothes.', 'Sora mea îmi ia des hainele.'],
      ['can', 'Can I borrow your pen for a minute?', 'Îmi dai puțin pixul?'],
      ['past', 'I borrowed a ladder from Mrs Hughes.', 'Am împrumutat o scară de la doamna Hughes.'],
      ['pp', 'Have you ever borrowed money from a friend?', 'Ai luat vreodată bani cu împrumut de la un prieten?'],
      ['going', 'I’m not going to borrow his car again.', 'Nu-i mai cer mașina împrumut.'],
    ],
    phrases: [
      ['borrow a book from the library', 'a împrumuta o carte de la bibliotecă'],
      ['borrow money from the bank', 'a lua bani cu împrumut de la bancă'],
      ['Can I borrow…?', 'Îmi împrumuți…?'],
    ],
    traps: [
      ['Can you borrow me your pen?', 'Can you lend me your pen?', 'Când dai ceva cuiva se spune `lend`. `Borrow` înseamnă să iei.'],
      ['Can I borrow from you a pen?', 'Can I borrow a pen from you?', 'Întâi ce iei, apoi de la cine: `borrow a pen from you`.'],
    ],
  },
  lend: {
    s: 'lends', ing: 'lending',
    use: 'Dai ceva cuiva pentru o vreme, ca să ți-l dea înapoi: `lend someone something` sau `lend something to someone`. Când iei tu ceva de la cineva, verbul e `borrow`.',
    ex: [
      ['ps', 'Priya never lends money to anyone.', 'Priya nu împrumută niciodată bani nimănui.'],
      ['can', 'Could you lend me your umbrella?', 'Mi-ai putea împrumuta umbrela?'],
      ['past', 'Tom lent me his bike last week.', 'Tom mi-a împrumutat bicicleta săptămâna trecută.'],
      ['pp', 'I’ve lent my car to my brother.', 'I-am împrumutat mașina fratelui meu.'],
      ['will', 'Don’t worry, I’ll lend you some money.', 'Nu-ți face griji, îți împrumut eu niște bani.'],
    ],
    phrases: [
      ['lend a hand', 'a da o mână de ajutor'],
      ['lend someone money', 'a împrumuta pe cineva cu bani'],
      ['lend a book to a friend', 'a împrumuta o carte unui prieten'],
    ],
    traps: [
      ['I lended him my bike.', 'I lent him my bike.', '`Lend` e neregulat: trecutul e `lent`.'],
      ['Can you borrow me ten pounds?', 'Can you lend me ten pounds?', 'Dai cuiva: `lend`. Iei de la cineva: `borrow`.'],
    ],
  },
  allow: {
    s: 'allows', ing: 'allowing',
    use: 'Lași pe cineva să facă ceva: `allow someone to do something`. Apare des la pasiv: `be allowed to`, „a avea voie să”.',
    ex: [
      ['ps', 'Mimi isn’t allowed on the bed.', 'Mimi n-are voie în pat.'],
      ['past', 'My boss allowed me to leave early.', 'Șeful m-a lăsat să plec mai devreme.'],
      ['pp', 'The doctor has allowed him to go home.', 'Doctorul i-a dat voie să meargă acasă.'],
      ['will', 'Will they allow us to bring food?', 'O să ne lase să aducem mâncare?'],
      ['can', 'You shouldn’t allow your dog on the sofa.', 'N-ar trebui să-ți lași câinele pe canapea.'],
    ],
    phrases: [
      ['be allowed to', 'a avea voie să'],
      ['Smoking isn’t allowed.', 'Fumatul este interzis.'],
      ['allow someone in', 'a lăsa pe cineva să intre'],
    ],
    traps: [
      ['My mum doesn’t allow me go out.', 'My mum doesn’t allow me to go out.', 'După `allow someone` urmează `to` și verbul.'],
      ['It’s not allowed to smoke here.', 'You aren’t allowed to smoke here.', 'Subiectul e cel care n-are voie: `you aren’t allowed to`.'],
      ['I’m not allow to park here.', 'I’m not allowed to park here.', '„A avea voie” se spune `be allowed`, cu `-ed`.'],
    ],
  },
  climb: {
    s: 'climbs', ing: 'climbing',
    use: 'Urci cu efort, adesea folosindu-te de mâini și de picioare: `climb a tree`, `climb a hill`, `climb the stairs`. Pentru lift, autobuz sau tren nu se folosește `climb`.',
    ex: [
      ['ps', 'Mimi climbs the fence every morning.', 'Mimi se cațără pe gard în fiecare dimineață.'],
      ['pc', 'Why is Tom climbing the ladder?', 'De ce se urcă Tom pe scară?'],
      ['past', 'We climbed the hill behind the village.', 'Am urcat dealul din spatele satului.'],
      ['pp', 'I’ve never climbed a mountain.', 'N-am urcat niciodată pe munte.'],
      ['can', 'My grandma can’t climb the stairs any more.', 'Bunica nu mai poate urca scările.'],
    ],
    phrases: [
      ['climb the stairs', 'a urca scările'],
      ['climb a tree', 'a se cățăra într-un copac'],
      ['climb into bed', 'a se băga în pat'],
    ],
    traps: [
      ['I climbed in the bus.', 'I got on the bus.', 'În autobuz sau în tren urci cu `get on`, nu cu `climb`.'],
      ['I climbed to the fifth floor by lift.', 'I went up to the fifth floor by lift.', 'Cu liftul nu e efort: `go up`. `Climb` e pe jos, cu efort.'],
    ],
  },
  check: {
    s: 'checks', ing: 'checking',
    use: 'Te uiți dacă ceva e corect, sigur sau în regulă: `check the door`, `check your answers`. Se spune și pentru mesaje sau e-mail: `check your email`.',
    ex: [
      ['ps', 'Tom checks the oven before he goes home.', 'Tom verifică cuptorul înainte să plece acasă.'],
      ['pc', 'Sorry, I’m just checking my messages.', 'Scuze, mă uit puțin la mesaje.'],
      ['past', 'Did you check the back door?', 'Ai verificat ușa din spate?'],
      ['pp', 'I haven’t checked my email today.', 'Nu mi-am verificat e-mailul azi.'],
      ['can', 'You should check the bill before you pay.', 'Ar trebui să verifici nota înainte să plătești.'],
    ],
    phrases: [
      ['check the time', 'a te uita la ceas'],
      ['check the weather', 'a vedea cum e vremea'],
      ['check in at the hotel', 'a te caza la hotel'],
    ],
    traps: [
      ['The police controlled my passport.', 'The police checked my passport.', '„A controla” actele se spune `check`. `Control` înseamnă „a ține sub control”.'],
      ['I can’t talk, I check my email.', 'I can’t talk, I’m checking my email.', 'Ce faci chiar acum: prezentul continuu, `I’m checking`.'],
    ],
  },
  repair: {
    s: 'repairs', ing: 'repairing',
    use: 'Faci ca ceva stricat să meargă din nou: o mașină, un drum, un acoperiș. E puțin mai formal decât `fix`, care se aude mai des în vorbire.',
    ex: [
      ['ps', 'Sam repairs old bikes in his free time.', 'Sam repară biciclete vechi în timpul liber.'],
      ['past', 'They repaired the road last summer.', 'Au reparat drumul vara trecută.'],
      ['pp', 'Has anyone repaired the lift yet?', 'A reparat cineva liftul?'],
      ['going', 'We’re going to repair the fence in spring.', 'La primăvară o să reparăm gardul.'],
      ['can', 'I can’t repair this old watch.', 'Nu pot să repar ceasul ăsta vechi.'],
    ],
    phrases: [
      ['get the car repaired', 'a da mașina la reparat'],
      ['repair the damage', 'a repara stricăciunile'],
      ['a repair shop', 'un atelier de reparații'],
    ],
    traps: [
      ['I repaired my car at the garage.', 'I had my car repaired at the garage.', 'Dacă altcineva a reparat-o pentru tine: `have it repaired`.'],
      ['We must to repair the door.', 'We must repair the door.', 'După `must` verbul vine fără `to`.'],
    ],
  },
  compare: {
    s: 'compares', ing: 'comparing',
    use: 'Te uiți prin ce se aseamănă și prin ce diferă două lucruri: `compare A with B` sau `compare A to B`. Se folosește des cu prețuri, oferte sau rezultate.',
    ex: [
      ['ps', 'Priya always compares prices before buying anything.', 'Priya compară mereu prețurile înainte să cumpere ceva.'],
      ['pc', 'We’re comparing two flats in the centre.', 'Comparăm două apartamente din centru.'],
      ['past', 'I compared my answers with Tom’s.', 'Mi-am comparat răspunsurile cu ale lui Tom.'],
      ['pp', 'Have you compared the two offers?', 'Ai comparat cele două oferte?'],
      ['imp', 'Don’t compare yourself to your sister.', 'Nu te compara cu sora ta.'],
    ],
    phrases: [
      ['compare prices', 'a compara prețurile'],
      ['compared to last year', 'față de anul trecut'],
      ['compare notes', 'a face schimb de impresii'],
    ],
    traps: [
      ['Let’s compare between the two phones.', 'Let’s compare the two phones.', 'După `compare` vin direct lucrurile comparate, fără `between`.'],
      ['I compare always the prices.', 'I always compare the prices.', '`Always` stă înaintea verbului, nu după el.'],
    ],
  },
  grow: {
    s: 'grows', ing: 'growing',
    use: 'Devine mai mare: un copil, o plantă, un oraș. Cu obiect înseamnă „a cultiva”: `grow tomatoes`. Despre oameni, „a crește mare” se spune `grow up`.',
    ex: [
      ['ps', 'Mrs Hughes grows roses in her garden.', 'Doamna Hughes cultivă trandafiri în grădină.'],
      ['pc', 'My hair is growing really fast.', 'Îmi crește părul foarte repede.'],
      ['past', 'I grew up in a small town.', 'Am crescut într-un oraș mic.'],
      ['pp', 'The tomatoes haven’t grown much this year.', 'Roșiile n-au crescut prea mult anul ăsta.'],
      ['can', 'Can you grow lemons in England?', 'Se pot cultiva lămâi în Anglia?'],
    ],
    phrases: [
      ['grow up', 'a crește mare'],
      ['grow vegetables', 'a cultiva legume'],
      ['grow a beard', 'a-și lăsa barbă'],
    ],
    traps: [
      ['My grandparents grew me.', 'My grandparents brought me up.', 'Pe cineva îl crești cu `bring up`. `Grow up` e despre tine: `I grew up`.'],
      ['I growed up in a village.', 'I grew up in a village.', '`Grow` e neregulat: `grew`, `grown`.'],
    ],
  },
  shine: {
    s: 'shines', ing: 'shining',
    use: 'Dă lumină sau strălucește: soarele, luna, o lampă, ceva lucios. Despre soare se spune des la prezentul continuu: `The sun is shining.`',
    ex: [
      ['ps', 'The moon shines through my window at night.', 'Noaptea, lumina lunii intră pe fereastra mea.'],
      ['pc', 'The sun is shining. Let’s go out.', 'E soare. Hai să ieșim.'],
      ['past', 'The sun shone all day yesterday.', 'Ieri a fost soare toată ziua.'],
      ['pp', 'The sun hasn’t shone for days.', 'De câteva zile n-a mai ieșit soarele.'],
      ['can', 'Can you shine your torch over here?', 'Poți să luminezi încoace cu lanterna?'],
    ],
    phrases: [
      ['shine a torch on something', 'a lumina ceva cu lanterna'],
      ['shine brightly', 'a străluci puternic'],
      ['rain or shine', 'pe orice vreme'],
    ],
    traps: [
      ['The sun shined all day.', 'The sun shone all day.', '`Shine` e neregulat: `shone`.'],
      ['Today is sun.', 'The sun is shining today.', '„E soare” nu se spune `is sun`, ci `the sun is shining` sau `it’s sunny`.'],
    ],
  },
  rise: {
    s: 'rises', ing: 'rising',
    use: 'Se ridică sau urcă singur, fără obiect: soarele, luna, prețurile, apa. Despre soare și lună înseamnă „a răsări”. Când ridici tu ceva, verbul e `raise` sau `lift`.',
    ex: [
      ['ps', 'The sun rises early in summer.', 'Vara, soarele răsare devreme.'],
      ['pc', 'The water in the river is rising.', 'Apa râului crește.'],
      ['past', 'Prices rose a lot last year.', 'Anul trecut prețurile au crescut mult.'],
      ['pp', 'Has the rent risen again?', 'Iar a crescut chiria?'],
      ['will', 'The bread won’t rise in a cold kitchen.', 'Aluatul nu crește într-o bucătărie rece.'],
    ],
    phrases: [
      ['The sun rises in the east.', 'Soarele răsare la est.'],
      ['prices rise', 'cresc prețurile'],
      ['a pay rise', 'o mărire de salariu'],
    ],
    traps: [
      ['They rose the prices again.', 'They raised the prices again.', 'Când ridici tu ceva: `raise`. `Rise` urcă singur.'],
      ['The sun rised at six.', 'The sun rose at six.', '`Rise` e neregulat: `rose`, `risen`.'],
    ],
  },
  reach: {
    s: 'reaches', ing: 'reaching',
    use: 'Ajungi la un loc, la capătul unui drum: `reach the station`, `reach the top`. Sau ajungi la ceva cu mâna: `reach the top shelf`. Locul vine direct după verb, fără prepoziție.',
    ex: [
      ['ps', 'This bus reaches the centre in ten minutes.', 'Autobuzul ăsta ajunge în centru în zece minute.'],
      ['past', 'We reached the top of the hill at noon.', 'Am ajuns în vârful dealului la prânz.'],
      ['pp', 'Have you reached the station yet?', 'Ai ajuns la gară?'],
      ['can', 'I can’t reach the top shelf.', 'Nu ajung la raftul de sus.'],
      ['will', 'You’ll reach the village before dark.', 'Ajungi în sat înainte să se întunece.'],
    ],
    phrases: [
      ['You can reach me on this number.', 'Mă găsești la numărul ăsta.'],
      ['reach a decision', 'a lua o hotărâre'],
      ['out of reach', 'unde nu ajungi cu mâna'],
    ],
    traps: [
      ['We reached at the hotel late.', 'We reached the hotel late.', 'După `reach` nu vine `at` sau `to`: `reach the hotel`.'],
    ],
  },
  win: {
    s: 'wins', ing: 'winning',
    use: 'Ieși primul într-un joc, un meci sau un concurs, sau primești un premiu: `win a match`, `win a prize`. Banii de la muncă nu se câștigă cu `win`, ci cu `earn`.',
    ex: [
      ['ps', 'Tom always wins at cards.', 'Tom câștigă mereu la cărți.'],
      ['pc', 'Who’s winning the match?', 'Cine câștigă meciul?'],
      ['past', 'My sister won a prize at school.', 'Sora mea a câștigat un premiu la școală.'],
      ['pp', 'I’ve never won anything.', 'N-am câștigat niciodată nimic.'],
      ['will', 'Do you think they’ll win?', 'Crezi că o să câștige?'],
    ],
    phrases: [
      ['win the lottery', 'a câștiga la loterie'],
      ['win a race', 'a câștiga o cursă'],
      ['win a game of chess', 'a câștiga o partidă de șah'],
    ],
    traps: [
      ['How much do you win a month?', 'How much do you earn a month?', 'Banii de la muncă: `earn`. `Win` e pentru jocuri și concursuri.'],
      ['We won them 3–0.', 'We beat them 3–0.', 'Meciul îl câștigi (`win`), dar pe adversar îl învingi (`beat`).'],
    ],
  },
  'set off': {
    s: 'sets off', ing: 'setting off',
    use: 'Pornești la drum, pleci într-o călătorie: `set off early`, `set off for the coast`. Formele nu se schimbă: `set off` e și trecutul, și participiul.',
    ex: [
      ['ps', 'Sam sets off for work at ten every night.', 'Sam pleacă la muncă în fiecare seară la zece.'],
      ['past', 'We set off early to miss the traffic.', 'Am plecat devreme ca să scăpăm de trafic.'],
      ['pp', 'Have they set off yet?', 'Au pornit deja la drum?'],
      ['going', 'We’re going to set off after breakfast.', 'Pornim la drum după micul dejun.'],
      ['imp', 'Don’t set off without a map.', 'Nu pleca la drum fără hartă.'],
    ],
    phrases: [
      ['set off early', 'a pleca devreme'],
      ['set off on a journey', 'a porni la drum'],
      ['set off for home', 'a o porni spre casă'],
    ],
    traps: [
      ['We setted off at six.', 'We set off at six.', '`Set` nu se schimbă la trecut: `set off`.'],
      ['When you set off?', 'When did you set off?', 'Întrebarea la trecut are nevoie de `did`.'],
    ],
  },
  'come back': {
    s: 'comes back', ing: 'coming back',
    use: 'Te întorci în locul de unde ai plecat sau unde e cel care vorbește: `come back home`, `come back later`. Dacă te întorci într-un loc unde nu ești acum, se spune `go back`.',
    ex: [
      ['ps', 'What time does your dad come back from work?', 'La ce oră se întoarce tatăl tău de la muncă?'],
      ['past', 'She came back from Spain last week.', 'S-a întors din Spania săptămâna trecută.'],
      ['pp', 'Mimi hasn’t come back yet.', 'Mimi nu s-a întors încă.'],
      ['will', 'I’ll come back in five minutes.', 'Mă întorc în cinci minute.'],
      ['imp', 'Come back later, please. We’re closed.', 'Reveniți mai târziu, vă rog. Acum e închis.'],
    ],
    phrases: [
      ['come back home', 'a se întoarce acasă'],
      ['come back from holiday', 'a se întoarce din concediu'],
      ['come back later', 'a reveni mai târziu'],
    ],
    traps: [
      ['Wait, I come back in five minutes.', 'Wait, I’ll come back in five minutes.', 'Când promiți pe loc, folosești `I’ll`, nu prezentul.'],
      ['I loved Rome. I want to come back there.', 'I loved Rome. I want to go back there.', 'Acolo, unde nu ești acum: `go back`. `Come back` e spre locul unde ești.'],
    ],
  },
  'say goodbye': {
    s: 'says goodbye', ing: 'saying goodbye',
    use: 'Îți iei rămas-bun de la cineva când pleci: `say goodbye to someone`. Merge cu `say`, nu cu `tell`.',
    ex: [
      ['ps', 'My son never says goodbye when he leaves.', 'Fiul meu nu-și ia niciodată la revedere când pleacă.'],
      ['past', 'We said goodbye at the station.', 'Ne-am luat rămas-bun la gară.'],
      ['pp', 'Have you said goodbye to Grandma?', 'Ți-ai luat la revedere de la bunica?'],
      ['can', 'I must say goodbye to Tom first.', 'Întâi trebuie să-mi iau la revedere de la Tom.'],
      ['imp', 'Let’s say goodbye here.', 'Hai să ne luăm rămas-bun aici.'],
    ],
    phrases: [
      ['say goodbye to someone', 'a-și lua rămas-bun de la cineva'],
      ['wave goodbye', 'a face cu mâna la plecare'],
      ['Say hello to Tom for me.', 'Salută-l pe Tom din partea mea.'],
    ],
    traps: [
      ['I said goodbye from my friends.', 'I said goodbye to my friends.', 'Rămas-bun „de la” cineva se spune `say goodbye to`.'],
      ['I told goodbye to her.', 'I said goodbye to her.', 'Cu `goodbye` merge `say`, nu `tell`.'],
    ],
  },
  'look forward to': {
    s: 'looks forward to', ing: 'looking forward to',
    use: 'Aștepți ceva cu drag, te bucuri dinainte de el. După `to` vine un substantiv sau un verb cu `-ing`: `I’m looking forward to the weekend`, `to seeing you`. `I look forward to…` e mai formal, mai ales în scrisori.',
    ex: [
      ['ps', 'Sam looks forward to his days off.', 'Sam își așteaptă cu drag zilele libere.'],
      ['pc', 'Are you looking forward to seeing your family?', 'Abia aștepți să-ți vezi familia?'],
      ['past', 'Mrs Hughes always looked forward to Sundays.', 'Doamna Hughes aștepta mereu cu drag duminicile.'],
      ['pp', 'I’ve never looked forward to Mondays.', 'N-am așteptat niciodată cu drag zilele de luni.'],
      ['can', 'We can look forward to some sun this weekend.', 'La sfârșitul săptămânii ne putem bucura de puțin soare.'],
    ],
    phrases: [
      ['I’m looking forward to it.', 'Abia aștept.'],
      ['I look forward to hearing from you.', 'Aștept cu interes răspunsul dumneavoastră.'],
      ['look forward to the holidays', 'a aștepta cu drag vacanța'],
    ],
    traps: [
      ['I’m looking forward to see you.', 'I’m looking forward to seeing you.', 'Aici `to` e prepoziție, așa că urmează `-ing`: `to seeing`.'],
      ['We’re looking forward the weekend.', 'We’re looking forward to the weekend.', 'Verbul are trei părți: `look forward to`. Fără `to` nu merge.'],
    ],
  },
  miss: {
    s: 'misses', ing: 'missing',
    use: 'Ți-e dor de cineva sau de ceva: `I miss you`, „mi-e dor de tine”; cel căruia îi e dor e subiectul. Mai înseamnă că pierzi ceva ce trebuia să prinzi: `miss the bus`, `miss a call`.',
    ex: [
      ['ps', 'I don’t miss my old job at all.', 'Nu-mi lipsește deloc vechiul serviciu.'],
      ['past', 'Sorry, I missed your call.', 'Scuze, n-am răspuns când m-ai sunat.'],
      ['pp', 'Have you ever missed a flight?', 'Ai pierdut vreodată avionul?'],
      ['will', 'You’ll miss Mimi when you’re away.', 'O să-ți fie dor de Mimi cât ești plecat.'],
      ['can', 'We mustn’t miss the last bus.', 'Să nu pierdem ultimul autobuz.'],
    ],
    phrases: [
      ['miss the bus', 'a pierde autobuzul'],
      ['I miss you.', 'Mi-e dor de tine.'],
      ['You can’t miss it.', 'N-ai cum să nu-l vezi.'],
    ],
    traps: [
      ['I lost the bus.', 'I missed the bus.', '„Am pierdut autobuzul” se spune `missed`. `Lose` e când nu mai găsești ceva.'],
      ['You miss me a lot.', 'I miss you a lot.', '„Îmi lipsești” = `I miss you`: cel căruia îi e dor e subiectul.'],
    ],
  },
  fly: {
    s: 'flies', ing: 'flying',
    use: 'Se mișcă prin aer: o pasăre, un avion. Sau călătorești cu avionul: `fly to Rome`. `Fly` spune singur „cu avionul”.',
    ex: [
      ['ps', 'My sister flies to Spain every summer.', 'Sora mea merge cu avionul în Spania în fiecare vară.'],
      ['pc', 'Are you flying or going by train?', 'Mergi cu avionul sau cu trenul?'],
      ['past', 'The birds flew away when Mimi came out.', 'Păsările au zburat când a ieșit Mimi.'],
      ['pp', 'I’ve never flown before.', 'N-am mai zburat niciodată.'],
      ['going', 'We’re going to fly to Rome in May.', 'În mai mergem cu avionul la Roma.'],
    ],
    phrases: [
      ['fly a kite', 'a înălța un zmeu'],
      ['fly to London', 'a merge cu avionul la Londra'],
      ['Time flies.', 'Timpul zboară.'],
    ],
    traps: [
      ['I flied to Rome last year.', 'I flew to Rome last year.', '`Fly` e neregulat: `flew`, `flown`.'],
      ['We went with the plane to Rome.', 'We flew to Rome.', '„Am mers cu avionul” se spune scurt: `we flew`.'],
      ['She flys a lot for work.', 'She flies a lot for work.', 'Cu `he`, `she`, `it`: `flies`, cu `-ies`.'],
    ],
  },
};
