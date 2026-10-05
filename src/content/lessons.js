// The grammar lessons: each point of grammar.js shown at a glance, for "De ce?" after a wrong answer, a note's "Lecția"
// and Colecții → Gramatică (screens/book.js). Not prose: a gist, then blocks that show the rule, then examples and the
// usual mistakes. Romanian is kept short and marks English with `backticks`; English marks what matters with **x**.
//   gist: one line · blocks: forms, turn, formula, pair, grid, words, tip (see BLOCKS in screens/book.js)
//   ex: [English, Romanian] × 3–4 · traps: [wrong, right, why] × 2–3

export const LESSONS = {
  be: {
    gist: '`be` = a fi',
    blocks: [
      { t: 'forms', title: 'Formele', rows: [['I', 'am'], ['he · she · it', 'is'], ['you · we · they', 'are']] },
      { t: 'turn', title: 'Întrebare', from: 'You **are** cold.', to: '**Are** you cold?', note: 'Verbul trece în față.' },
      { t: 'turn', title: 'Negație', from: 'It’s cold.', to: 'It’s **not** cold.' },
      { t: 'tip', ro: 'Vârsta, frigul, foamea: cu `be`.', ex: 'I**’m** thirty. I**’m** hungry.' },
    ],
    ex: [
      ['I**’m** cold.', 'Mi-e frig.'],
      ['**Is** Tom at the café?', 'E Tom la cafenea?'],
      ['We **aren’t** tired.', 'Nu suntem obosiți.'],
      ['How old **are** you?', 'Câți ani ai?'],
    ],
    traps: [
      ['I have thirty years.', 'I’m thirty.', 'Vârsta: cu `be`.'],
      ['Is cold today.', 'It’s cold today.', 'Lipsește subiectul: `it`.'],
      ['I am agree.', 'I agree.', '`Agree` e verb. Fără `am`.'],
    ],
  },

  'have-got': {
    gist: 'Spui ce ai: lucruri, familie, animale.',
    blocks: [
      { t: 'forms', title: 'Formele', rows: [['I · you · we · they', 'have got'], ['he · she · it', 'has got']] },
      { t: 'turn', title: 'Întrebare', from: 'You **have** got a key.', to: '**Have** you got a key?', note: '`Have` trece în față, fără `do`.' },
      { t: 'turn', title: 'Negație', from: 'He **has** got a car.', to: 'He **hasn’t** got a car.' },
      { t: 'tip', ro: '`’s got` = `has got`, nu `is`.', ex: 'I**’ve got** a cat. She**’s got** a dog.' },
    ],
    ex: [
      ['My sister **has got** two children.', 'Sora mea are doi copii.'],
      ['We**’ve got** a big garden.', 'Avem o grădină mare.'],
      ['**Has** Mimi **got** green eyes?', 'Mimi are ochi verzi?'],
      ['Sorry, we **haven’t got** any milk.', 'Îmi pare rău, n-avem lapte.'],
    ],
    traps: [
      ['Priya have got a small shop.', 'Priya has got a small shop.', 'Priya = `she`: `has got`.'],
      ['Do you have got a pen?', 'Have you got a pen?', 'Cu `got`: fără `do`.'],
      ['I don’t have got any money.', 'I haven’t got any money.', 'Negativ: `haven’t got`.'],
    ],
  },

  'this-that': {
    gist: 'Aproape sau departe? Unul sau mai multe?',
    blocks: [
      { t: 'grid', cols: ['aproape', 'departe'], rows: [['unul', 'this', 'that'], ['mai multe', 'these', 'those']] },
      { t: 'pair', items: [['aproape', '**This** is my cup.'], ['departe', '**That** is the moon.']] },
      { t: 'tip', ro: 'Mai multe: `these are`, `those are`.', ex: '**These are** my keys.' },
    ],
    ex: [
      ['**This** is my phone.', 'Acesta e telefonul meu.'],
      ['**These** are my keys.', 'Acestea sunt cheile mele.'],
      ['Look up! **That**’s the moon.', 'Uită-te în sus: aceea e luna.'],
      ['Who are **those** people?', 'Cine sunt oamenii aceia?'],
    ],
    traps: [
      ['This are my keys.', 'These are my keys.', 'Mai multe chei: `these`.'],
      ['Look up! This is the moon.', 'Look up! That’s the moon.', 'Luna e departe: `that`.'],
      ['Who are that people?', 'Who are those people?', '`People` e plural: `those`.'],
    ],
  },

  'ps-s': {
    gist: 'Ce faci de obicei sau mereu.',
    blocks: [
      { t: 'forms', title: 'Formele', rows: [['I · you · we · they', 'work'], ['he · she · it', 'works']] },
      { t: 'forms', title: 'Nu doar `-s`', rows: [['go', 'goes'], ['watch', 'watches'], ['try', 'tries'], ['have', 'has']] },
      { t: 'tip', ro: 'Un nume sau un lucru: tot cu `-s`.', ex: 'The bus **leaves** at ten.' },
      { t: 'tip', ro: 'Doar verbul: fără `is`, fără `-ing`.', ex: 'Mimi **sleeps** all day.' },
    ],
    ex: [
      ['I **drink** tea with milk.', 'Beau ceai cu lapte.'],
      ['Tom **makes** very good tea.', 'Tom face un ceai foarte bun.'],
      ['Priya **works** in a shop.', 'Priya lucrează într-un magazin.'],
      ['Sam **goes** to bed in the morning.', 'Sam se culcă dimineața.'],
    ],
    traps: [
      ['Tom open the café at six.', 'Tom opens the café at six.', 'Tom = `he`: `opens`.'],
      ['She is speak two languages.', 'She speaks two languages.', 'Fără `is` în fața verbului.'],
      ['My parents lives in Romania.', 'My parents live in Romania.', '`They`: fără `-s`.'],
    ],
  },

  'do-does': {
    gist: 'Întrebi și spui „nu” la prezentul simplu.',
    blocks: [
      { t: 'grid', cols: ['întrebare', 'negație'], rows: [['`I · you · we · they`', 'do', 'don’t'], ['`he · she · it`', 'does', 'doesn’t']] },
      { t: 'turn', title: 'Întrebare', from: 'She **likes** milk.', to: '**Does** she **like** milk?', note: '`-s` trece pe `does`.' },
      { t: 'turn', title: 'Negație', from: 'Tom **works** on Mondays.', to: 'Tom **doesn’t work** on Mondays.' },
      { t: 'tip', ro: 'În română întrebi din ton. În engleză, cu `do`.', ex: 'Where **do** you **live**?' },
    ],
    ex: [
      ['**Do** you **like** coffee?', 'Îți place cafeaua?'],
      ['I **don’t eat** meat.', 'Nu mănânc carne.'],
      ['Mimi **doesn’t like** the rain.', 'Lui Mimi nu-i place ploaia.'],
      ['What time **does** the bus **come**?', 'La ce oră vine autobuzul?'],
    ],
    traps: [
      ['Does Sam works at night?', 'Does Sam work at night?', 'După `does`: fără `-s`.'],
      ['I not understand.', 'I don’t understand.', 'Nu doar `not`: `don’t`.'],
      ['Is Tom work on Sundays?', 'Does Tom work on Sundays?', '`Work` e verb: întrebi cu `does`.'],
    ],
  },

  pc: {
    gist: 'Ce se întâmplă chiar acum.',
    blocks: [
      { t: 'formula', parts: ['`am` · `is` · `are`', 'verbul + `-ing`'], ex: 'I**’m reading**. She**’s sleeping**.' },
      { t: 'turn', title: 'Întrebare', from: 'You**’re** working.', to: '**Are** you working?' },
      { t: 'words', title: 'Cuvinte care îl anunță', items: [['now', 'acum'], ['right now', 'chiar acum'], ['Look!', 'Uite!'], ['Listen!', 'Ascultă!']] },
      { t: 'tip', ro: 'În română: „plouă”. Acum, în engleză:', ex: 'It**’s raining**.' },
    ],
    ex: [
      ['Look! Mimi **is sleeping**.', 'Uite, Mimi doarme.'],
      ['What **are** you **doing**?', 'Ce faci acum?'],
      ['It**’s raining**. Take an umbrella.', 'Plouă. Ia o umbrelă.'],
      ['They **aren’t watching** TV.', 'Nu se uită la televizor.'],
    ],
    traps: [
      ['It rains now.', 'It’s raining now.', 'Acum: `is raining`.'],
      ['She talking on the phone.', 'She’s talking on the phone.', 'Lipsește `is`.'],
      ['What do you doing?', 'What are you doing?', 'Cu `-ing` întrebi cu `are`.'],
    ],
  },

  'pc-ps': {
    gist: 'Româna are un prezent, engleza are două.',
    blocks: [
      { t: 'pair', items: [['de obicei', 'Sam **drives** at night.'], ['acum', 'He**’s sleeping**.']] },
      { t: 'words', title: 'Cuvinte pentru „de obicei”', items: [['usually', 'de obicei'], ['always', 'mereu'], ['every day', 'în fiecare zi'], ['on Sundays', 'duminica']] },
      { t: 'words', title: 'Cuvinte pentru „acum”', items: [['now', 'acum'], ['at the moment', 'în clipa asta'], ['Look!', 'Uite!'], ['Listen!', 'Ascultă!']] },
      { t: 'tip', ro: '`know`, `like`, `want`, `need`: fără `-ing`, chiar și acum.', ex: 'I **want** a coffee now.' },
    ],
    ex: [
      ['We usually **have** dinner at seven.', 'De obicei luăm cina la șapte.'],
      ['Tom **is making** tea right now.', 'Tom face ceai chiar acum.'],
      ['Priya **reads** the paper every morning.', 'Priya citește ziarul în fiecare dimineață.'],
      ['Look! Mrs Hughes **is watering** her roses.', 'Uite, doamna Hughes își udă trandafirii.'],
    ],
    traps: [
      ['I am walking to work every day.', 'I walk to work every day.', '`Every day`: prezentul simplu.'],
      ['Listen! Somebody plays the piano.', 'Listen! Somebody is playing the piano.', '`Listen!`: se întâmplă acum.'],
      ['I am knowing what you mean.', 'I know what you mean.', '`Know` nu ia `-ing`.'],
    ],
  },

  'past-ed': {
    gist: 'Ce s-a întâmplat și s-a terminat.',
    blocks: [
      { t: 'formula', title: 'La fel pentru toți', parts: ['verbul', '`-ed`'], ex: 'I **watched** TV. Sam **watched** a film.' },
      { t: 'forms', title: 'Atenție la scriere', rows: [['arrive', 'arrived'], ['try', 'tried'], ['stay', 'stayed'], ['stop', 'stopped']] },
      { t: 'words', title: 'Cuvinte care îl anunță', items: [['yesterday', 'ieri'], ['last night', 'aseară'], ['last week', 'săptămâna trecută'], ['two days ago', 'acum două zile']] },
      { t: 'tip', ro: '„Am sunat” = `called`. Un cuvânt, fără `was`.', ex: 'We **called** a taxi.' },
    ],
    ex: [
      ['The bus **stopped** at the corner.', 'Autobuzul a oprit la colț.'],
      ['We **stayed** at home all day.', 'Am stat acasă toată ziua.'],
      ['Sam **arrived** at midnight.', 'Sam a ajuns la miezul nopții.'],
      ['What **happened** last night?', 'Ce s-a întâmplat aseară?'],
    ],
    traps: [
      ['I was call my mum yesterday.', 'I called my mum yesterday.', 'Un singur cuvânt: `called`.'],
      ['I tryed to fix it.', 'I tried to fix it.', '`try` → `tried`.'],
      ['Yesterday I walk to work.', 'Yesterday I walked to work.', '`Yesterday`: trecutul, cu `-ed`.'],
    ],
  },

  'was-were': {
    gist: 'Trecutul lui `be`: era, a fost.',
    blocks: [
      { t: 'forms', title: 'Formele', rows: [['I · he · she · it', 'was'], ['you · we · they', 'were']] },
      { t: 'turn', title: 'Întrebare', from: 'They **were** at work.', to: '**Were** they at work?', note: 'Verbul trece în față. Fără `did`.' },
      { t: 'turn', title: 'Negație', from: 'It **was** cold.', to: 'It **wasn’t** cold.' },
      { t: 'tip', ro: '`You` ia `were`, chiar și pentru o persoană.', ex: 'Where **were** you, Tom?' },
    ],
    ex: [
      ['It **was** very quiet last night.', 'Aseară a fost foarte liniște.'],
      ['The shops **were** closed.', 'Magazinele erau închise.'],
      ['Where **was** Sam at midnight?', 'Unde era Sam la miezul nopții?'],
      ['We **weren’t** on the bus.', 'Nu eram în autobuz.'],
    ],
    traps: [
      ['You was very kind.', 'You were very kind.', '`You`: mereu `were`.'],
      ['The streets was empty.', 'The streets were empty.', 'Plural: `were`.'],
      ['Did you be at home yesterday?', 'Were you at home yesterday?', 'Fără `did`: `were` trece în față.'],
    ],
  },

  'there-is': {
    gist: 'Spui ce există și unde.',
    blocks: [
      { t: 'grid', cols: ['acum', 'în trecut'], rows: [['unul', 'there is', 'there was'], ['mai multe', 'there are', 'there were']] },
      { t: 'turn', title: 'Întrebare', from: 'There **is** a bus at six.', to: '**Is** there a bus at six?', note: 'Verbul trece în față.' },
      { t: 'tip', ro: '„E un magazin pe colț”: începi cu `there`.', ex: '**There’s** a shop on the corner.' },
    ],
    ex: [
      ['**There’s** a cat in the garden.', 'În grădină e o pisică.'],
      ['**Is there** any milk in the fridge?', 'E lapte în frigider?'],
      ['**There isn’t** a bank on our street.', 'Pe strada noastră nu e nicio bancă.'],
      ['**Were there** many people on the bus?', 'Erau mulți oameni în autobuz?'],
    ],
    traps: [
      ['Is a problem with the lift.', 'There’s a problem with the lift.', 'Există: începi cu `there`.'],
      ['They are some eggs in the fridge.', 'There are some eggs in the fridge.', '`They are` înseamnă „ei sunt”.'],
      ['There is two buses every hour.', 'There are two buses every hour.', 'Plural: `there are`.'],
    ],
  },

  'some-any': {
    gist: '„Niște”: `some` sau `any`?',
    blocks: [
      { t: 'pair', items: [['afirmativ', 'I’ve got **some** eggs.'], ['negativ', 'I haven’t got **any** eggs.'], ['întrebare', 'Have you got **any** eggs?']] },
      { t: 'tip', ro: '„Nu am niciun…”: în engleză, o singură negație.', ex: 'I **don’t** need **any** help.' },
      { t: 'tip', ro: 'Cu `milk`, `bread`, `water`: `some`, nu `a`.', ex: 'There’s **some** milk in the fridge.' },
    ],
    ex: [
      ['I need **some** batteries.', 'Am nevoie de niște baterii.'],
      ['Are there **any** candles in the drawer?', 'Sunt lumânări în sertar?'],
      ['We haven’t got **any** bread.', 'Nu avem pâine.'],
      ['There are **some** coins in the jar.', 'În borcan sunt niște monede.'],
    ],
    traps: [
      ['I haven’t got no candles.', 'I haven’t got any candles.', 'O singură negație: `any`.'],
      ['There isn’t some milk.', 'There isn’t any milk.', 'Negativ: `any`.'],
      ['There’s a bread on the table.', 'There’s some bread on the table.', '`Bread` nu se numără: `some`.'],
    ],
  },

  'much-many': {
    gist: '„Câți?” sau „cât?”: se numără sau nu?',
    blocks: [
      { t: 'pair', items: [['se numără', 'How **many** eggs?'], ['nu se numără', 'How **much** milk?']] },
      { t: 'words', title: 'În engleză, fără plural', items: [['money', 'bani'], ['information', 'informații'], ['advice', 'sfaturi'], ['homework', 'teme']] },
      { t: 'tip', ro: 'În afirmativ, de obicei: `a lot of`.', ex: 'Tom has got **a lot of** friends.' },
    ],
    ex: [
      ['How **many** coins are in the jar?', 'Câte monede sunt în borcan?'],
      ['How **much** sugar do you want?', 'Cât zahăr vrei?'],
      ['There aren’t **many** people here.', 'Nu sunt mulți oameni aici.'],
      ['We haven’t got **much** time.', 'Nu avem prea mult timp.'],
    ],
    traps: [
      ['How many money have you got?', 'How much money have you got?', '`Money` nu se numără: `much`.'],
      ['How much eggs do we need?', 'How many eggs do we need?', '`Eggs` se numără: `many`.'],
      ['Can you give me some informations?', 'Can you give me some information?', '`Information` nu are plural.'],
    ],
  },

  prep: {
    gist: 'Unde e?',
    blocks: [
      { t: 'words', items: [['in', 'în', 'in'], ['on', 'pe', 'on'], ['under', 'sub', 'under'], ['behind', 'în spatele', 'behind'], ['in front of', 'în fața', 'front'], ['next to', 'lângă', 'next'], ['between', 'între', 'between']] },
      { t: 'tip', ro: '`in front of` și `next to` merg întregi.', ex: 'Wait **in front of** the café.' },
      { t: 'tip', ro: 'În autobuz: `on the bus`.', ex: 'I met Sam **on** the bus.' },
    ],
    ex: [
      ['The keys are **in** my bag.', 'Cheile sunt în geantă.'],
      ['Mimi is sleeping **on** the sofa.', 'Mimi doarme pe canapea.'],
      ['The ball is **under** the table.', 'Mingea e sub masă.'],
      ['The bank is **between** the shop and the café.', 'Banca e între magazin și cafenea.'],
    ],
    traps: [
      ['Wait for me in front the café.', 'Wait for me in front of the café.', '„În fața”: `in front of`.'],
      ['I sat near of Tom.', 'I sat next to Tom.', '„Lângă”: `next to`.'],
      ['The shed is after the house.', 'The shed is behind the house.', '„În spatele”: `behind`.'],
    ],
  },

  'past-irr': {
    gist: 'Multe verbe au trecutul lor, fără `-ed`.',
    blocks: [
      { t: 'forms', title: 'Pe de rost', rows: [['go', 'went'], ['see', 'saw'], ['take', 'took'], ['give', 'gave'], ['find', 'found']] },
      { t: 'pair', title: '`bought` sau `brought`?', items: [['a cumpărat', 'I **bought** some flowers.'], ['a adus', 'I **brought** some flowers.']] },
      { t: 'pair', title: '`said` sau `told`?', items: [['a spus', 'Tom **said** hello.'], ['mi-a spus', 'Tom **told me** a secret.']] },
    ],
    ex: [
      ['I **went** to the shop after work.', 'M-am dus la magazin după serviciu.'],
      ['We **took** the night bus home.', 'Am luat autobuzul de noapte spre casă.'],
      ['Tom **made** a cake for Mrs Hughes.', 'Tom i-a făcut o prăjitură doamnei Hughes.'],
      ['I **found** my keys in my coat.', 'Mi-am găsit cheile în haină.'],
    ],
    traps: [
      ['Yesterday I goed to the market.', 'Yesterday I went to the market.', '`go` → `went`, fără `-ed`.'],
      ['We seen a fox in the garden.', 'We saw a fox in the garden.', 'Trecut: `saw`. `seen` vine după `have`.'],
      ['She said me a story.', 'She told me a story.', 'Mi-a spus: `told me`.'],
    ],
  },

  did: {
    gist: 'Întrebări și negații la trecut: cu `did`.',
    blocks: [
      { t: 'turn', title: 'Întrebare', from: 'You **saw** the fox.', to: '**Did** you **see** the fox?', note: 'După `did`: forma de bază.' },
      { t: 'turn', title: 'Negație', from: 'She **went** home.', to: 'She **didn’t go** home.' },
      { t: 'pair', title: '`did` sau `was`, `were`?', items: [['cu un verb', '**Did** you **call** Tom?'], ['cu `be`', '**Were** you at home?']] },
      { t: 'tip', ro: 'Cu `where`, `what`, `why`: tot `did`.', ex: 'Where **did** you **go**?' },
    ],
    ex: [
      ['**Did** you **sleep** well?', 'Ai dormit bine?'],
      ['I **didn’t hear** anything.', 'N-am auzit nimic.'],
      ['What **did** Tom **say**?', 'Ce a zis Tom?'],
      ['Sam **didn’t work** last night.', 'Sam n-a lucrat azi-noapte.'],
    ],
    traps: [
      ['Did you saw my keys?', 'Did you see my keys?', 'După `did`: `see`.'],
      ['Where you went yesterday?', 'Where did you go yesterday?', 'Lipsește `did`.'],
      ['She doesn’t come yesterday.', 'She didn’t come yesterday.', 'Trecut: `didn’t`, nu `doesn’t`.'],
    ],
  },

  pp: {
    gist: 'Ceva din trecut care contează acum.',
    blocks: [
      { t: 'formula', parts: ['`have` · `has`', 'participiul'], ex: 'I**’ve lost** my keys. Tom **has found** them.' },
      { t: 'forms', title: 'Verb, trecut, participiu', rows: [['be', 'was · were', 'been'], ['go', 'went', 'gone'], ['see', 'saw', 'seen'], ['do', 'did', 'done'], ['call', 'called', 'called']] },
      { t: 'words', title: 'Cuvinte care îl anunță', items: [['ever', 'vreodată'], ['never', 'niciodată'], ['just', 'tocmai']] },
      { t: 'tip', ro: 'Nu `Did you ever…?`, ci `Have you ever…?`', ex: '**Have** you ever **been** to Scotland?' },
    ],
    ex: [
      ['We**’ve never seen** snow here.', 'N-am văzut niciodată zăpadă aici.'],
      ['Tom **has** just **made** some tea.', 'Tom tocmai a făcut ceai.'],
      ['**Have** you **done** your homework?', 'Ți-ai făcut temele?'],
      ['My sister **hasn’t called** me.', 'Sora mea nu m-a sunat.'],
    ],
    traps: [
      ['I’ve never went to London.', 'I’ve never been to London.', 'După `have`: participiul, `been`.'],
      ['She have lost her keys.', 'She has lost her keys.', 'Cu `she`: `has`.'],
      ['Did you ever see snow?', 'Have you ever seen snow?', 'Experiență: `Have you ever…?`'],
    ],
  },

  'for-since': {
    gist: 'Cât timp (`for`) sau de când (`since`)?',
    blocks: [
      { t: 'pair', items: [['cât timp', 'I’ve been here **for an hour**.'], ['de când', 'I’ve been here **since six**.']] },
      { t: 'words', title: 'În română, tot „de”', items: [['for two years', 'de doi ani'], ['since Monday', 'de luni'], ['for a week', 'de o săptămână'], ['since nine', 'de la nouă'], ['for a long time', 'de mult'], ['since lunch', 'de la prânz']] },
      { t: 'tip', ro: 'Ține până acum: `I’ve lived`, nu `I live`.', ex: 'We**’ve lived** here for years.' },
    ],
    ex: [
      ['I’ve known Tom **for** ten years.', 'Îl cunosc pe Tom de zece ani.'],
      ['I’ve had this phone **since** Christmas.', 'Am telefonul ăsta de la Crăciun.'],
      ['Mrs Hughes has lived here **for** forty years.', 'Doamna Hughes locuiește aici de patruzeci de ani.'],
      ['I haven’t seen her **since** last summer.', 'N-am mai văzut-o din vara trecută.'],
    ],
    traps: [
      ['I live here since 2010.', 'I’ve lived here since 2010.', 'Ține până acum: `I’ve lived`.'],
      ['I’ve known her since ten years.', 'I’ve known her for ten years.', 'Zece ani e o durată: `for`.'],
      ['We’ve been here from Monday.', 'We’ve been here since Monday.', 'De când: `since`, nu `from`.'],
    ],
  },

  'pp-past': {
    gist: 'Trecutul simplu sau prezentul perfect?',
    blocks: [
      { t: 'pair', items: [['cu moment', 'I **saw** him **yesterday**.'], ['fără moment', 'I**’ve seen** him **before**.']] },
      { t: 'words', title: 'Trecutul simplu', items: [['yesterday', 'ieri'], ['last week', 'săptămâna trecută'], ['two days ago', 'acum două zile'], ['in 2010', 'în 2010']] },
      { t: 'words', title: 'Prezentul perfect', items: [['ever', 'vreodată'], ['never', 'niciodată'], ['just', 'tocmai'], ['since Monday', 'de luni']] },
      { t: 'tip', ro: '`When…?` cere un moment: trecutul simplu.', ex: '**When did** you **meet** her?' },
    ],
    ex: [
      ['We **met** two years **ago**.', 'Ne-am cunoscut acum doi ani.'],
      ['**Have** you **ever lost** your keys?', 'Ți-ai pierdut vreodată cheile?'],
      ['I **called** my mum **last night**.', 'Am sunat-o pe mama aseară.'],
      ['She**’s lived** here **since** 2010.', 'Locuiește aici din 2010.'],
    ],
    traps: [
      ['I have seen him yesterday.', 'I saw him yesterday.', 'Cu `yesterday`: trecutul simplu.'],
      ['I’ve been to the seaside last summer.', 'I went to the seaside last summer.', '`last summer`: trecutul simplu.'],
      ['When have you arrived?', 'When did you arrive?', '`When` întreabă de un moment.'],
    ],
  },

  will: {
    gist: 'Hotărâri pe loc, promisiuni, păreri despre viitor.',
    blocks: [
      { t: 'formula', parts: ['`will` · `won’t`', 'verbul'], ex: 'I**’ll help** you. She **won’t come**.' },
      { t: 'pair', items: [['hotărâre pe loc', 'It’s cold. I**’ll close** the window.'], ['promisiune', 'I**’ll call** you tomorrow.'], ['părere', 'I think it**’ll rain**.']] },
      { t: 'tip', ro: 'În română: „răspund eu”. În engleză:', ex: 'The phone’s ringing. I**’ll get** it.' },
    ],
    ex: [
      ['I’m tired. I**’ll go** to bed.', 'Sunt obosit. Mă duc la culcare.'],
      ['**Will** you **help** me with these boxes?', 'Mă ajuți cu cutiile astea?'],
      ['Maybe Tom **will come** later.', 'Poate vine Tom mai târziu.'],
      ['Don’t worry. I **won’t be** late.', 'Nu-ți face griji, nu întârzii.'],
    ],
    traps: [
      ['It’s late. I take a taxi.', 'It’s late. I’ll take a taxi.', 'Hotărâre pe loc: `I’ll`.'],
      ['I promise I don’t tell anyone.', 'I promise I won’t tell anyone.', 'Promisiune: `won’t`, nu `don’t`.'],
      ['I will to help you.', 'I will help you.', 'După `will`: fără `to`.'],
    ],
  },

  'going-to': {
    gist: 'Planuri și ce se vede că urmează.',
    blocks: [
      { t: 'formula', parts: ['`am` · `is` · `are`', '`going to`', 'verbul'], ex: 'I**’m going to** buy a new coat.' },
      { t: 'pair', items: [['plan', 'We**’re going to** move in May.'], ['se vede', 'Look at the sky. It**’s going to** rain.']] },
      { t: 'turn', title: 'Întrebare', from: 'You**’re** going to stay.', to: '**Are** you going to stay?', note: 'Cu `are`, nu cu `do`.' },
      { t: 'tip', ro: 'Hotărăști chiar acum? Atunci `will`.', ex: 'Oh, no milk. I**’ll** get some.' },
    ],
    ex: [
      ['What **are** you **going to** do tomorrow?', 'Ce ai de gând să faci mâine?'],
      ['My sister **isn’t going to** come tonight.', 'Sora mea n-o să vină diseară.'],
      ['Careful! You**’re going to** fall.', 'Ai grijă, o să cazi.'],
      ['Priya **is going to** open a second shop.', 'Priya o să deschidă încă un magazin.'],
    ],
    traps: [
      ['We going to leave on Friday.', 'We’re going to leave on Friday.', 'Lipsește `are`.'],
      ['I’m going buy a coat.', 'I’m going to buy a coat.', 'Lipsește `to`.'],
      ['She doesn’t going to come.', 'She isn’t going to come.', 'Negația: `isn’t`, nu `doesn’t`.'],
    ],
  },

  must: {
    gist: 'Obligatoriu, interzis sau nu e nevoie.',
    blocks: [
      { t: 'forms', title: 'Obligatoriu', rows: [['I · you · we · they', 'must · have to'], ['he · she · it', 'must · has to']] },
      { t: 'pair', title: '„Nu trebuie” în engleză', items: [['interzis', 'You **mustn’t** park here.'], ['nu e nevoie', 'You **don’t have to** wait.']] },
      { t: 'tip', ro: 'După `must`: verbul, fără `to`.', ex: 'I **must call** my mum.' },
    ],
    ex: [
      ['I **have to** get up at six.', 'Trebuie să mă trezesc la șase.'],
      ['Sam **has to** work at night.', 'Sam trebuie să lucreze noaptea.'],
      ['We **must** be quiet. The baby’s sleeping.', 'Trebuie să facem liniște. Doarme copilul.'],
      ['**Do** you **have to** wear a uniform?', 'Trebuie să porți uniformă?'],
    ],
    traps: [
      ['It’s free. You mustn’t pay.', 'It’s free. You don’t have to pay.', 'Nu e nevoie: `don’t have to`.'],
      ['You don’t have to smoke here.', 'You mustn’t smoke here.', 'E interzis: `mustn’t`.'],
      ['She have to work on Saturdays.', 'She has to work on Saturdays.', 'Cu `she`: `has to`.'],
    ],
  },

  can: {
    gist: 'Pot, puteam, ar trebui.',
    blocks: [
      { t: 'pair', items: [['pot', 'I **can** help you.'], ['nu puteam', 'I **couldn’t** sleep.'], ['ar trebui', 'You **should** rest.']] },
      { t: 'forms', title: 'Negația, fără `don’t`', rows: [['can', 'can’t'], ['could', 'couldn’t'], ['should', 'shouldn’t']] },
      { t: 'tip', ro: 'Cerere politicoasă: `Could you…?`', ex: '**Could** you close the door, please?' },
    ],
    ex: [
      ['**Can** I **sit** here?', 'Pot să stau aici?'],
      ['I **can’t find** my glasses.', 'Nu-mi găsesc ochelarii.'],
      ['You **should see** a doctor.', 'Ar trebui să mergi la doctor.'],
      ['It’s late. You **shouldn’t drink** coffee now.', 'E târziu. N-ar trebui să mai bei cafea.'],
    ],
    traps: [
      ['She can to speak English.', 'She can speak English.', 'După `can`: fără `to`.'],
      ['I don’t can come tonight.', 'I can’t come tonight.', 'Negația: `can’t`, fără `don’t`.'],
      ['When I was five, I can’t read.', 'When I was five, I couldn’t read.', 'Trecut: `couldn’t`.'],
    ],
  },

  comp: {
    gist: 'Compari două lucruri: mai mare, mai frumos.',
    blocks: [
      { t: 'forms', title: 'Cuvinte scurte: `-er`', rows: [['cold', 'colder'], ['big', 'bigger'], ['easy', 'easier']] },
      { t: 'forms', title: 'Cuvinte lungi: `more`', rows: [['expensive', 'more expensive'], ['interesting', 'more interesting']] },
      { t: 'forms', title: 'Altfel', rows: [['good', 'better'], ['bad', 'worse']] },
      { t: 'formula', title: '„decât” = `than`', parts: ['`colder`', '`than`'], ex: 'Today is **colder than** yesterday.' },
    ],
    ex: [
      ['My sister is **taller than** me.', 'Sora mea e mai înaltă decât mine.'],
      ['The train is **more expensive than** the bus.', 'Trenul e mai scump decât autobuzul.'],
      ['Tom’s tea is **better than** mine.', 'Ceaiul lui Tom e mai bun decât al meu.'],
    ],
    traps: [
      ['It’s more cold today.', 'It’s colder today.', 'Cuvânt scurt: `colder`.'],
      ['This tea is more good.', 'This tea is better.', '`good` → `better`.'],
      ['She is more taller than me.', 'She is taller than me.', 'Ori `-er`, ori `more`.'],
    ],
  },

  sup: {
    gist: 'Dintr-un grup: cel mai mare, cel mai frumos.',
    blocks: [
      { t: 'forms', title: 'Cuvinte scurte: `the -est`', rows: [['cold', 'the coldest'], ['big', 'the biggest'], ['easy', 'the easiest']] },
      { t: 'forms', title: 'Cuvinte lungi: `the most`', rows: [['expensive', 'the most expensive'], ['interesting', 'the most interesting']] },
      { t: 'forms', title: 'Altfel', rows: [['good', 'the best'], ['bad', 'the worst']] },
      { t: 'formula', title: 'Locul: `in`', parts: ['`the best`', '`in`'], ex: 'Tom makes **the best** tea **in** town.' },
    ],
    ex: [
      ['Who is **the tallest** in your family?', 'Cine e cel mai înalt din familia ta?'],
      ['Mrs Hughes has **the most beautiful** roses.', 'Doamna Hughes are cei mai frumoși trandafiri.'],
      ['It was **the worst** film I’ve ever seen.', 'A fost cel mai prost film pe care l-am văzut.'],
    ],
    traps: [
      ['She’s the most tall in the class.', 'She’s the tallest in the class.', 'Cuvânt scurt: `the tallest`.'],
      ['It was the more beautiful day of my life.', 'It was the most beautiful day of my life.', '„Cel mai”: `the most`, nu `more`.'],
      ['It’s the tallest building of the world.', 'It’s the tallest building in the world.', '„Din lume”: `in the world`.'],
    ],
  },

  if1: {
    gist: 'Dacă se întâmplă ceva, urmează altceva.',
    blocks: [
      { t: 'formula', parts: ['`if` + prezent', '`will` + verbul'], ex: '**If** it **rains**, we**’ll stay** at home.' },
      { t: 'tip', ro: 'După `if`: prezentul, chiar și pentru viitor.', ex: '**If** she **calls** tomorrow, I’ll tell you.' },
      { t: 'pair', title: 'Se poate și invers', items: [['cu virgulă', '**If** it’s sunny**,** we’ll go out.'], ['fără virgulă', 'We’ll go out **if** it’s sunny.']] },
    ],
    ex: [
      ['I**’ll call** you **if** I**’m** late.', 'Te sun dacă întârzii.'],
      ['**If** you **hurry**, you**’ll catch** the bus.', 'Dacă te grăbești, prinzi autobuzul.'],
      ['What **will** you **do** if she **doesn’t come**?', 'Ce faci dacă nu vine?'],
      ['**If** Mimi **is** hungry, she**’ll wake** me up.', 'Dacă lui Mimi îi e foame, mă trezește.'],
    ],
    traps: [
      ['If I will have time, I’ll help you.', 'If I have time, I’ll help you.', 'După `if`: prezentul, nu `will`.'],
      ['If she won’t come, I’ll call her.', 'If she doesn’t come, I’ll call her.', 'După `if`: `doesn’t`, nu `won’t`.'],
      ['If you’re tired, you should to rest.', 'If you’re tired, you should rest.', 'După `should`: fără `to`.'],
    ],
  },
};
