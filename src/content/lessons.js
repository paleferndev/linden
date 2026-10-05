// The grammar lessons: each point of grammar.js explained a bit more than its note, for "De ce?" after a wrong answer
// and for Colecții → Gramatică. Romanian text marks English with `backticks`; examples mark the rule with **x**.
//   rule: short paragraphs · table: optional, first row is the header · ex: [English, Romanian] · traps: [wrong, right, why]

export const LESSONS = {
  be: {
    rule: [
      'Verbul `be` („a fi”) are trei forme la prezent: `am` cu `I`, `is` cu `he`, `she`, `it` și `are` cu `you`, `we`, `they`. Un nume sau un singur lucru ia `is` (`Mimi is`), pluralul ia `are` (`my keys are`).',
      'La întrebare, verbul trece în fața subiectului: `You are cold.` → `Are you cold?` La negație adaugi `not`: `I’m not`, `it isn’t`, `we aren’t`.',
      'Cu `be` spui vârsta, starea și locul: `I’m thirty`, `I’m hungry`, `Tom is at the café`. Aici româna folosește des „a avea” („am treizeci de ani”), engleza nu.',
      'Propoziția engleză are mereu subiect. Unde româna spune doar „E frig”, engleza spune `It’s cold`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I', 'I am · I’m', 'I’m not', 'Am I?'],
      ['he, she, it', 'he is · he’s', 'he isn’t', 'Is he?'],
      ['you, we, they', 'you are · you’re', 'you aren’t', 'Are you?'],
    ],
    ex: [
      ['I**’m** cold.', 'Mi-e frig.'],
      ['**Is** Tom at the café?', 'E Tom la cafenea?'],
      ['We **aren’t** tired.', 'Nu suntem obosiți.'],
      ['How old **are** you?', 'Câți ani ai?'],
      ['Where **are** my keys?', 'Unde sunt cheile mele?'],
      ['**It’s** very cold tonight.', 'E foarte frig în seara asta.'],
    ],
    traps: [
      ['I have thirty years.', 'I’m thirty.', 'Vârsta se spune cu `be`, nu cu `have`.'],
      ['Is cold today.', 'It’s cold today.', 'În engleză propoziția are mereu subiect: `it`.'],
      ['I am agree.', 'I agree.', '`Agree` e verb: nu-i mai trebuie `am`.'],
      ['The people here is very nice.', 'The people here are very nice.', '`People` e plural în engleză: `people are`.'],
    ],
  },

  'have-got': {
    rule: [
      'Cu `have got` spui ce ai: lucruri, familie, animale, cum arată cineva. Cu `I`, `you`, `we`, `they` e `have got` (`I’ve got`), cu `he`, `she`, `it` e `has got` (`she’s got`).',
      'La negație pui `not` după `have` sau `has`: `I haven’t got`, `she hasn’t got`. La întrebare, `have` sau `has` trece în față: `Have you got a pen?`',
      'Cu `got` nu folosești `do` sau `does`. Fără `got` se poate spune și `Do you have a pen?`, dar cele două nu se amestecă.',
      'Un nume sau un singur lucru ia `has`: `Priya has got a shop`, `Has Mimi got green eyes?`',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I, you, we, they', 'I have got · I’ve got', 'I haven’t got', 'Have you got…?'],
      ['he, she, it', 'she has got · she’s got', 'she hasn’t got', 'Has she got…?'],
    ],
    ex: [
      ['I**’ve got** a cat.', 'Am o pisică.'],
      ['Priya **has got** a small shop.', 'Priya are un magazin mic.'],
      ['**Have** you **got** a pen?', 'Ai un pix?'],
      ['Sorry, I **haven’t got** any money.', 'Îmi pare rău, n-am bani.'],
      ['**Has** Mimi **got** green eyes?', 'Mimi are ochi verzi?'],
      ['We**’ve got** a big garden.', 'Avem o grădină mare.'],
    ],
    traps: [
      ['Priya have got a small shop.', 'Priya has got a small shop.', 'Priya = `she`: `has got`.'],
      ['Do you have got a pen?', 'Have you got a pen?', 'Cu `got`, întrebarea se face cu `have`, fără `do`.'],
      ['I don’t have got any money.', 'I haven’t got any money.', 'Negativ cu `got`: `haven’t got`, fără `don’t`.'],
    ],
  },

  'this-that': {
    rule: [
      '`This` și `these` arată ce e aproape de tine: în mână, lângă tine. `That` și `those` arată ce e mai departe: acolo, mai încolo.',
      '`This` și `that` sunt pentru un singur lucru, `these` și `those` pentru mai multe. Verbul se potrivește: `this is`, `these are`.',
      'Pot sta singure (`This is my phone.`) sau înaintea unui substantiv (`this cup`, `those people`). După `these` și `those`, substantivul e la plural.',
      'Atenție la plural: nu `this keys`, ci `these keys`; nu `that people`, ci `those people`.',
    ],
    table: [
      ['aproape', 'departe'],
      ['this cup', 'that cup'],
      ['these cups', 'those cups'],
    ],
    ex: [
      ['**This** is my phone.', 'Acesta e telefonul meu.'],
      ['**These** are my keys.', 'Acestea sunt cheile mele.'],
      ['Look up! **That**’s the moon.', 'Uită-te în sus: aceea e luna.'],
      ['Who are **those** people over there?', 'Cine sunt oamenii aceia de acolo?'],
      ['**These** apples are very good.', 'Merele acestea sunt foarte bune.'],
      ['I like **this** cup.', 'Îmi place cana asta.'],
    ],
    traps: [
      ['This are my keys.', 'These are my keys.', 'Mai multe chei, aici: `these are`.'],
      ['Look up! This is the moon.', 'Look up! That’s the moon.', 'Luna e departe: `that`, nu `this`.'],
      ['Who are that people?', 'Who are those people?', '`People` e plural: `those people`.'],
    ],
  },

  'ps-s': {
    rule: [
      'Prezentul simplu spune ce faci de obicei, ce e mereu adevărat și ce se întâmplă la ore fixe: `I drink tea every morning`, `The café opens at six`.',
      'Verbul are aceeași formă cu `I`, `you`, `we`, `they`. Doar cu `he`, `she`, `it`, sau cu un nume ori un lucru la singular, primește `-s`: `Tom makes tea`.',
      'Verbele terminate în `-o`, `-ch`, `-sh`, `-ss`, `-x` primesc `-es`: `goes`, `watches`. `Have` devine `has`.',
      'Nu pune `is` sau `am` în fața verbului și nu folosi `-ing`: `She speaks`, nu `She is speak`; `I drink`, nu `I drinking`.',
    ],
    table: [
      ['', 'verbul'],
      ['I, you, we, they', 'work, drink, go, have'],
      ['he, she, it', 'works, drinks, goes, has'],
    ],
    ex: [
      ['I **drink** tea with milk.', 'Beau ceai cu lapte.'],
      ['Tom **makes** very good tea.', 'Tom face un ceai foarte bun.'],
      ['Priya **works** in a shop.', 'Priya lucrează într-un magazin.'],
      ['The café **opens** at six.', 'Cafeneaua se deschide la șase.'],
      ['My parents **live** in Romania.', 'Părinții mei locuiesc în România.'],
      ['Sam **goes** to bed in the morning.', 'Sam se culcă dimineața.'],
    ],
    traps: [
      ['Tom open the café at six.', 'Tom opens the café at six.', 'Tom = `he`: verbul primește `-s`.'],
      ['She is speak two languages.', 'She speaks two languages.', 'La prezentul simplu nu pui `is` în fața verbului.'],
      ['My parents lives in Romania.', 'My parents live in Romania.', '`They`: verbul rămâne fără `-s`.'],
      ['I drinking tea every morning.', 'I drink tea every morning.', 'Pentru un obicei: forma simplă, fără `-ing`.'],
    ],
  },

  'do-does': {
    rule: [
      'La prezentul simplu, întrebarea și negația se fac cu un verb ajutător: `do`, sau `does` cu `he`, `she`, `it`. Româna nu are așa ceva, de aceea e ușor de uitat.',
      'Întrebarea: `do` sau `does`, apoi subiectul și verbul: `Do you like coffee?` Un cuvânt de întrebare vine primul: `Where does Priya live?`',
      'Negația: `don’t` (`do not`) sau `doesn’t` (`does not`) înaintea verbului: `I don’t understand`. Doar `not` nu ajunge.',
      'Terminația `-s` trece pe `does`, iar verbul rămâne la forma de bază: `Does Sam work?`, `She doesn’t like milk`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I, you, we, they', 'you work', 'you don’t work', 'Do you work?'],
      ['he, she, it', 'she works', 'she doesn’t work', 'Does she work?'],
    ],
    ex: [
      ['**Do** you **like** coffee?', 'Îți place cafeaua?'],
      ['Where **does** Priya **live**?', 'Unde locuiește Priya?'],
      ['I **don’t understand**.', 'Nu înțeleg.'],
      ['Mimi **doesn’t like** the rain.', 'Lui Mimi nu-i place ploaia.'],
      ['What time **does** the bus **come**?', 'La ce oră vine autobuzul?'],
      ['**Does** Tom **work** on Sundays? — No, he **doesn’t**.', 'Tom lucrează duminica? — Nu.'],
    ],
    traps: [
      ['Does Sam works at night?', 'Does Sam work at night?', 'După `does`, verbul e fără `-s`.'],
      ['Where Priya lives?', 'Where does Priya live?', 'Întrebarea are nevoie de `does`, iar verbul rămâne fără `-s`.'],
      ['I not understand.', 'I don’t understand.', 'Negația la prezentul simplu se face cu `don’t`, nu doar cu `not`.'],
      ['Is Tom work on Sundays?', 'Does Tom work on Sundays?', 'Cu un verb ca `work`, întrebi cu `does`, nu cu `is`.'],
    ],
  },

  pc: {
    rule: [
      'Prezentul continuu spune ce se întâmplă chiar acum. Îl anunță cuvinte ca `now`, `right now`, `at the moment`, `Look!`, `Listen!`.',
      'Se formează cu `am`, `is` sau `are` și verbul cu `-ing`: `I’m looking`, `she’s talking`, `they’re watching`. Îți trebuie amândouă părțile.',
      'La întrebare, `am`, `is` sau `are` trece în față: `What are you doing?` La negație adaugi `not`: `It isn’t raining.`',
      'Româna are un singur prezent („plouă”), engleza are două. Pentru ce se întâmplă acum spui `It’s raining`, nu `It rains`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I', 'I’m working', 'I’m not working', 'Am I working?'],
      ['he, she, it', 'she’s working', 'she isn’t working', 'Is she working?'],
      ['you, we, they', 'you’re working', 'you aren’t working', 'Are you working?'],
    ],
    ex: [
      ['Look! Mimi **is sleeping**.', 'Uite, Mimi doarme.'],
      ['What **are** you **doing**?', 'Ce faci acum?'],
      ['It**’s raining**. Take an umbrella.', 'Plouă. Ia o umbrelă.'],
      ['I**’m looking** for my keys.', 'Îmi caut cheile.'],
      ['They **aren’t watching** TV.', 'Nu se uită la televizor.'],
      ['She**’s talking** on the phone right now.', 'Acum vorbește la telefon.'],
    ],
    traps: [
      ['Look! Tom carries some boxes.', 'Look! Tom is carrying some boxes.', '`Look!` arată că se întâmplă acum: `is carrying`.'],
      ['She talking on the phone.', 'She’s talking on the phone.', 'Lipsește `is`: forma cu `-ing` nu stă singură.'],
      ['It rains now.', 'It’s raining now.', 'Acum: `is raining`, nu prezentul simplu.'],
      ['What do you doing?', 'What are you doing?', 'Cu `-ing` întrebi cu `are`, nu cu `do`.'],
    ],
  },

  'pc-ps': {
    rule: [
      'Prezentul simplu e pentru ce faci de obicei, des sau mereu: `Sam drives the bus every night.`',
      'Prezentul continuu e pentru ce se întâmplă chiar acum, în clipa asta: `Right now he’s sleeping.`',
      'Româna are un singur prezent („Sam conduce”), așa că în engleză uită-te după cuvintele care arată timpul: `every night` cere prezentul simplu, `now` cere prezentul continuu.',
      'Verbele care arată ce știi, ce-ți place sau ce vrei nu se pun la `-ing`: `know`, `like`, `want`, `need`, `understand`. Spui `I know`, chiar dacă e vorba de acum.',
    ],
    table: [
      ['prezentul simplu', 'prezentul continuu'],
      ['usually, always, often', 'now, right now'],
      ['every day, every night', 'at the moment'],
      ['on Sundays', 'Look! Listen!'],
    ],
    ex: [
      ['Sam **drives** the bus every night.', 'Sam conduce autobuzul în fiecare noapte.'],
      ['Right now he **is sleeping**.', 'Acum doarme.'],
      ['I usually **walk** to work.', 'De obicei merg pe jos la serviciu.'],
      ['Listen! Somebody **is playing** the piano.', 'Ascultă, cineva cântă la pian.'],
      ['Priya **reads** the newspaper every morning.', 'Priya citește ziarul în fiecare dimineață.'],
      ['I **know** what you mean.', 'Știu ce vrei să spui.'],
    ],
    traps: [
      ['I am walking to work every day.', 'I walk to work every day.', '`Every day` arată un obicei: prezentul simplu.'],
      ['Listen! Somebody plays the piano.', 'Listen! Somebody is playing the piano.', '`Listen!` arată că se întâmplă acum: `is playing`.'],
      ['I am knowing what you mean.', 'I know what you mean.', '`Know` nu se pune la `-ing`.'],
      ['Are you liking this song?', 'Do you like this song?', '`Like` nu se pune la `-ing`: întrebi cu `do`.'],
    ],
  },

  'past-ed': {
    rule: [
      'Trecutul simplu spune ce s-a întâmplat și s-a terminat, adesea cu un moment precis: `yesterday`, `last night`, `two days ago`.',
      'La verbele regulate adaugi `-ed`: `walk` → `walked`. E aceeași formă pentru toate persoanele: `I walked`, `she walked`, `we walked`.',
      'La scriere: după `-e` adaugi doar `-d` (`arrived`); consoană + `y` devine `-ied` (`tried`), dar `stay` → `stayed`; la `stop` consoana se dublează (`stopped`).',
      'Româna spune „am sunat”, cu două cuvinte, dar engleza spune doar `called`. Nu pune `was` în fața verbului: `I called`, nu `I was call`.',
    ],
    table: [
      ['verbul', 'trecutul'],
      ['walk', 'walked'],
      ['arrive', 'arrived'],
      ['try', 'tried'],
      ['stay', 'stayed'],
      ['stop', 'stopped'],
    ],
    ex: [
      ['The bus **stopped** at the corner.', 'Autobuzul a oprit la colț.'],
      ['I **called** my mum yesterday.', 'Am sunat-o pe mama ieri.'],
      ['We **stayed** at home all day.', 'Am stat acasă toată ziua.'],
      ['Sam **arrived** late last night.', 'Sam a ajuns târziu aseară.'],
      ['I **tried** to fix it, but I couldn’t.', 'Am încercat să-l repar, dar n-am reușit.'],
      ['What **happened** last night?', 'Ce s-a întâmplat aseară?'],
    ],
    traps: [
      ['I was call my mum yesterday.', 'I called my mum yesterday.', 'Trecutul e un singur cuvânt: `called`, fără `was`.'],
      ['The bus stoped at the corner.', 'The bus stopped at the corner.', 'La `stop` se dublează `p`: `stopped`.'],
      ['I tryed to fix it.', 'I tried to fix it.', 'Consoană + `y` devine `-ied`: `tried`.'],
      ['Yesterday I walk home.', 'Yesterday I walked home.', '`Yesterday` cere trecutul: `walked`.'],
    ],
  },

  'was-were': {
    rule: [
      '`Was` și `were` sunt trecutul lui `be`. Cu `I`, `he`, `she`, `it` e `was`; cu `you`, `we`, `they` e `were`.',
      '`You` ia mereu `were`, chiar când vorbești cu o singură persoană. Pluralul ia și el `were`: `The streets were empty.`',
      'La întrebare, `was` sau `were` trece în față: `Were you at home?` La negație: `wasn’t`, `weren’t`.',
      'Cu `was` și `were` nu folosești `did`: `Where was Sam?`, `Were you tired?`',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I, he, she, it', 'he was', 'he wasn’t', 'Was he?'],
      ['you, we, they', 'you were', 'you weren’t', 'Were you?'],
    ],
    ex: [
      ['It **was** very quiet last night.', 'Aseară a fost foarte liniște.'],
      ['The streets **were** empty.', 'Străzile erau goale.'],
      ['**Were** you at home yesterday?', 'Ai fost acasă ieri?'],
      ['Where **was** Sam at midnight?', 'Unde era Sam la miezul nopții?'],
      ['We **weren’t** on the bus.', 'Nu eram în autobuz.'],
      ['There **were** no people in the street.', 'Pe stradă nu era nimeni.'],
    ],
    traps: [
      ['You was at home yesterday.', 'You were at home yesterday.', '`You` ia `were`, chiar pentru o singură persoană.'],
      ['The streets was empty.', 'The streets were empty.', 'Plural: `were`.'],
      ['Did you be at home yesterday?', 'Were you at home yesterday?', 'Cu `was` și `were` nu folosești `did`: verbul trece în față.'],
    ],
  },

  'there-is': {
    rule: [
      'Când spui că ceva există sau se află undeva, folosești `there is` (`there’s`) pentru un singur lucru și `there are` pentru mai multe.',
      'La întrebare, `is` sau `are` trece în față: `Is there any milk?` La negație: `there isn’t`, `there aren’t`.',
      'În română spui doar „E un magazin pe colț” sau „Sunt ouă”. În engleză nu începi cu `is` sau `are` și nici cu `it` sau `they`: pui `there`.',
      'La trecut: `there was`, `there were`, iar întrebarea e `Was there…?`, `Were there…?`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['a shop', 'there is · there’s', 'there isn’t', 'Is there…?'],
      ['two shops', 'there are', 'there aren’t', 'Are there…?'],
    ],
    ex: [
      ['**There’s** a shop on the corner.', 'Pe colț e un magazin.'],
      ['**There are** some eggs in the fridge.', 'În frigider sunt niște ouă.'],
      ['**Is there** any milk in the fridge?', 'E lapte în frigider?'],
      ['**There are** two buses every hour.', 'Trec două autobuze pe oră.'],
      ['**There isn’t** a bank on our street.', 'Pe strada noastră nu e nicio bancă.'],
      ['**Were there** many people on the bus?', 'Erau mulți oameni în autobuz?'],
    ],
    traps: [
      ['Is a shop on the corner.', 'There’s a shop on the corner.', 'Pentru „există” îți trebuie `there`: nu începi doar cu `is`.'],
      ['They are some eggs in the fridge.', 'There are some eggs in the fridge.', '`They are` înseamnă „ei sunt”. Pentru „există”: `there are`.'],
      ['There is two buses every hour.', 'There are two buses every hour.', 'Plural: `there are`.'],
    ],
  },

  'some-any': {
    rule: [
      '`Some` și `any` înseamnă „niște”. Le folosești cu pluralul (`some eggs`) și cu ce nu se numără (`some milk`).',
      'În propoziții afirmative pui `some`: `I need some batteries.` În întrebări și negații pui `any`: `Have you got any candles?`, `There isn’t any milk.`',
      'În română negația e dublă („nu am nicio lumânare”). În engleză e una singură: `I haven’t got any candles`, nu `I haven’t got no candles`.',
      '`A` merge doar cu un singur lucru care se numără (`a candle`). Cu `milk`, `bread`, `water` pui `some`, nu `a`.',
    ],
    table: [
      ['afirmativ', 'negativ', 'întrebare'],
      ['I need some eggs.', 'I don’t need any eggs.', 'Do you need any eggs?'],
      ['There’s some milk.', 'There isn’t any milk.', 'Is there any milk?'],
    ],
    ex: [
      ['I need **some** batteries.', 'Am nevoie de niște baterii.'],
      ['I haven’t got **any** candles.', 'Nu am nicio lumânare.'],
      ['There’s **some** milk in the fridge.', 'În frigider e lapte.'],
      ['Have you got **any** batteries?', 'Ai baterii?'],
      ['We haven’t got **any** bread.', 'Nu avem pâine.'],
      ['There are **some** coins in the jar.', 'În borcan sunt niște monede.'],
    ],
    traps: [
      ['I haven’t got no candles.', 'I haven’t got any candles.', 'În engleză negația e una singură: după `haven’t` vine `any`.'],
      ['I need any batteries.', 'I need some batteries.', 'În propoziții afirmative: `some`.'],
      ['There isn’t some milk.', 'There isn’t any milk.', 'La negație: `any`.'],
      ['There’s a milk in the fridge.', 'There’s some milk in the fridge.', '`Milk` nu se numără: fără `a`, cu `some`.'],
    ],
  },

  'much-many': {
    rule: [
      'Unele substantive se numără (`one egg`, `two eggs`), altele nu (`milk`, `money`, `time`, `sugar`). Cu cele care se numără folosești `many`, cu celelalte `much`.',
      '`How many…?` înseamnă „câți?, câte?”: `How many eggs?` `How much…?` înseamnă „cât?, câtă?”: `How much sugar?`',
      'Atenție la cuvintele care în română au plural, dar în engleză nu se numără: `money` („bani”), `information` („informații”), `advice` („sfaturi”). Nu primesc `-s` și nici `a`, `an`.',
      '`Much` și `many` apar mai ales în întrebări și negații. În propoziții afirmative se spune mai des `a lot of`: `We’ve got a lot of time.`',
    ],
    table: [
      ['se numără', 'nu se numără'],
      ['How many eggs?', 'How much milk?'],
      ['How many coins?', 'How much money?'],
      ['How many people?', 'How much time?'],
    ],
    ex: [
      ['How **many** eggs do we need?', 'De câte ouă avem nevoie?'],
      ['How **much** money have you got?', 'Câți bani ai?'],
      ['We haven’t got **much** time.', 'Nu avem prea mult timp.'],
      ['There aren’t **many** people here.', 'Nu sunt mulți oameni aici.'],
      ['Can you give me some **information**?', 'Îmi puteți da niște informații?'],
      ['Tom always gives good **advice**.', 'Tom dă mereu sfaturi bune.'],
    ],
    traps: [
      ['How many money have you got?', 'How much money have you got?', '`Money` nu se numără în engleză, deși în română zici „câți bani”.'],
      ['How much eggs do we need?', 'How many eggs do we need?', '`Eggs` se numără: `many`.'],
      ['Can you give me some informations?', 'Can you give me some information?', '`Information` nu are plural în engleză.'],
      ['Can you give me an advice?', 'Can you give me some advice?', '`Advice` nu se numără: fără `an`, cu `some`.'],
    ],
  },

  prep: {
    rule: [
      'Ca să spui unde e ceva: `in` (în, înăuntru), `on` (pe), `under` (sub), `behind` (în spatele), `in front of` (în fața), `next to` (lângă), `between` (între).',
      '`In front of` și `next to` au mai multe cuvinte: nu le scurta (`in front of the café`, `next to Tom`). Restul nu primesc `of`: `under the table`, `near the door`.',
      '`Behind` înseamnă „în spatele”; `after` e doar pentru timp, deci „după casă” e `behind the house`. `Between` e între două lucruri: `between the shop and the café`.',
      'Câteva se învață ca atare: `at home` (acasă), `on the bus` (în autobuz), dar `in the car`.',
    ],
    ex: [
      ['The keys are **in** my bag.', 'Cheile sunt în geantă.'],
      ['Mimi is sleeping **on** the sofa.', 'Mimi doarme pe canapea.'],
      ['The ball is **under** the table.', 'Mingea e sub masă.'],
      ['The shed is **behind** the house.', 'Magazia e în spatele casei.'],
      ['Wait for me **in front of** the café.', 'Așteaptă-mă în fața cafenelei.'],
      ['The bank is **between** the shop and the café.', 'Banca e între magazin și cafenea.'],
    ],
    traps: [
      ['Wait for me in front the café.', 'Wait for me in front of the café.', '„În fața”: `in front of`, cu `of`.'],
      ['I sat near of Tom on the bus.', 'I sat next to Tom on the bus.', '„Lângă”: `next to`. `Near` nu are `of`.'],
      ['The shed is after the house.', 'The shed is behind the house.', '„În spatele”: `behind`. `After` e pentru timp.'],
      ['I met Sam in the bus.', 'I met Sam on the bus.', '„În autobuz” se spune `on the bus`.'],
    ],
  },

  'past-irr': {
    rule: [
      'Multe verbe des folosite nu primesc `-ed` la trecut. Au o formă proprie, care se învață pe de rost: `go` → `went`, `see` → `saw`, `take` → `took`.',
      'Ca la verbele regulate, forma e aceeași pentru toate persoanele: `I went`, `she went`, `they went`.',
      'Nu pune `-ed` la un verb neregulat (`goed`, `buyed`) și nu folosi participiul în locul trecutului: `I saw`, nu `I seen`. Participiul (`seen`, `gone`, `taken`) vine după `have`.',
      'Atenție la perechile care se confundă: `she said goodbye`, dar `she told me` (cu persoana). `Buy` → `bought` (a cumpărat), dar `bring` → `brought` (a adus).',
    ],
    table: [
      ['verb', 'trecut', 'verb', 'trecut'],
      ['go', 'went', 'buy', 'bought'],
      ['see', 'saw', 'bring', 'brought'],
      ['take', 'took', 'say', 'said'],
      ['give', 'gave', 'tell', 'told'],
      ['make', 'made', 'find', 'found'],
    ],
    ex: [
      ['I **went** to the shop after work.', 'M-am dus la magazin după serviciu.'],
      ['We **took** the night bus home.', 'Am luat autobuzul de noapte spre casă.'],
      ['Tom **made** a cake for Mrs Hughes.', 'Tom i-a făcut o prăjitură doamnei Hughes.'],
      ['Priya **told** me a funny story.', 'Priya mi-a spus o poveste amuzantă.'],
      ['I **found** my keys in my coat.', 'Mi-am găsit cheile în haină.'],
      ['She **said** goodbye and **left**.', 'Și-a luat la revedere și a plecat.'],
    ],
    traps: [
      ['Yesterday I goed to the market.', 'Yesterday I went to the market.', '`Go` e neregulat: trecutul e `went`.'],
      ['I brought a new phone last week.', 'I bought a new phone last week.', 'A cumpărat: `bought`, de la `buy`. `Brought` vine de la `bring`.'],
      ['She said me a story.', 'She told me a story.', 'Când spui cui: `told me`. `Said` nu se leagă direct de `me`.'],
      ['We seen a fox in the garden.', 'We saw a fox in the garden.', '`Seen` e participiul. Trecutul lui `see` e `saw`.'],
    ],
  },

  did: {
    rule: [
      'La trecut, întrebarea și negația se fac cu `did`, la fel pentru toate persoanele: `Did you go?`, `Did she go?`, `I didn’t go`.',
      'Trecutul se vede deja în `did`, așa că verbul rămâne la forma de bază: `Did you see?`, nu `Did you saw?`; `I didn’t go`, nu `I didn’t went`.',
      'În română întrebarea se face doar din ton („Ai văzut?”). În engleză îți trebuie `did`: `Where did you go?`, nu `Where you went?`',
      'La afirmativ nu se pune `did`: `I saw Tom.` Nici `be` nu are nevoie de el: `Were you at home?`, `It wasn’t late.`',
    ],
    table: [
      ['afirmativ', 'negativ', 'întrebare'],
      ['I saw it.', 'I didn’t see it.', 'Did you see it?'],
      ['She went home.', 'She didn’t go home.', 'Did she go home?'],
      ['They found it.', 'They didn’t find it.', 'Did they find it?'],
      ['Tom said that.', 'Tom didn’t say that.', 'Did Tom say that?'],
    ],
    ex: [
      ['**Did** you **sleep** well?', 'Ai dormit bine?'],
      ['I **didn’t hear** anything.', 'N-am auzit nimic.'],
      ['Where **did** you **find** my keys?', 'Unde mi-ai găsit cheile?'],
      ['Sam **didn’t work** last night.', 'Sam n-a lucrat azi-noapte.'],
      ['What **did** Tom **say**?', 'Ce a zis Tom?'],
      ['Why **did** she **leave** so early?', 'De ce a plecat atât de devreme?'],
    ],
    traps: [
      ['Did you saw Tom?', 'Did you see Tom?', 'După `did`, verbul e la forma de bază: `see`.'],
      ['I didn’t went to work.', 'I didn’t go to work.', 'Trecutul e deja în `didn’t`: `go`, nu `went`.'],
      ['Where you went yesterday?', 'Where did you go yesterday?', 'Întrebarea la trecut are nevoie de `did`.'],
      ['She doesn’t come yesterday.', 'She didn’t come yesterday.', '`Yesterday` cere trecutul: `didn’t`, nu `doesn’t`.'],
    ],
  },

  pp: {
    rule: [
      'Prezentul perfect se face cu `have` (la `he`, `she`, `it`: `has`) și participiul: `I have seen`, `she has lost`. Forme scurte: `I’ve`, `she’s`, `haven’t`, `hasn’t`.',
      'Îl folosești pentru ceva petrecut în trecut, fără un moment anume, care contează acum: `I’ve lost my keys` (încă nu le-am găsit). Și pentru experiențe de până acum: `Have you ever been to London?`',
      'La verbele regulate participiul e la fel ca trecutul: `called`, `walked`. Multe verbe neregulate au o a treia formă: `see – saw – seen`, `do – did – done`.',
      '`Ever` (vreodată), `never` (niciodată) și `just` (tocmai) stau chiar înaintea participiului: `I’ve never seen it.`, `She’s just left.`',
    ],
    table: [
      ['verb', 'trecut', 'participiu'],
      ['be', 'was, were', 'been'],
      ['go', 'went', 'gone'],
      ['see', 'saw', 'seen'],
      ['do', 'did', 'done'],
      ['make', 'made', 'made'],
    ],
    ex: [
      ['**Have** you ever **been** to Scotland?', 'Ai fost vreodată în Scoția?'],
      ['I**’ve lost** my keys.', 'Mi-am pierdut cheile.'],
      ['Tom **has** just **made** some tea.', 'Tom tocmai a făcut ceai.'],
      ['We**’ve never seen** snow here.', 'N-am văzut niciodată zăpadă aici.'],
      ['**Have** you **done** your homework?', 'Ți-ai făcut temele?'],
      ['My sister **hasn’t called** me.', 'Sora mea nu m-a sunat.'],
    ],
    traps: [
      ['Did you ever see snow?', 'Have you ever seen snow?', 'Experiență de până acum, fără moment anume: `Have you ever seen…?`'],
      ['I’ve never went to London.', 'I’ve never been to London.', 'După `have` vine participiul (`been`), nu trecutul (`went`).'],
      ['She have lost her keys.', 'She has lost her keys.', 'Cu `she`: `has`.'],
    ],
  },

  'for-since': {
    rule: [
      'În română spui „de” la amândouă („de zece ani”, „de luni”), de aceea se încurcă ușor. Întreabă-te: cât timp sau de când?',
      '`For` + cât timp, adică o durată: `for ten minutes`, `for three years`, `for a long time`.',
      '`Since` + de când, adică momentul în care a început: `since Monday`, `since 2015`, `since last summer`.',
      'Când ceva ține până acum, verbul e la prezentul perfect: `I’ve lived here for ten years`, nu `I live here for ten years`. Nu folosi `from` aici: `from` merge cu `to` (`from nine to five`).',
    ],
    table: [
      ['cât timp', 'de când'],
      ['for ten minutes', 'since nine o’clock'],
      ['for three days', 'since Monday'],
      ['for two years', 'since 2020'],
      ['for a long time', 'since last summer'],
      ['for ages', 'since I was a child'],
    ],
    ex: [
      ['I’ve known Tom **for** ten years.', 'Îl cunosc pe Tom de zece ani.'],
      ['We’ve been here **since** Monday.', 'Suntem aici de luni.'],
      ['I’ve had this phone **since** Christmas.', 'Am telefonul ăsta de la Crăciun.'],
      ['My parents have lived in Cluj **for** thirty years.', 'Părinții mei locuiesc în Cluj de treizeci de ani.'],
      ['I haven’t seen her **since** last summer.', 'N-am mai văzut-o din vara trecută.'],
    ],
    traps: [
      ['I live here since 2010.', 'I’ve lived here since 2010.', 'Ține până acum: prezentul perfect, nu prezentul simplu.'],
      ['I’ve known her since ten years.', 'I’ve known her for ten years.', 'Zece ani e o durată: `for`. `Since` cere un moment.'],
      ['We’ve been here from Monday.', 'We’ve been here since Monday.', 'De când: `since`, nu `from`.'],
      ['He’s worked there during a long time.', 'He’s worked there for a long time.', 'Cât timp: `for`. `During` înseamnă „în timpul” (`during the film`).'],
    ],
  },

  'pp-past': {
    rule: [
      'Dacă spui când anume s-a întâmplat (`yesterday`, `last week`, `in 2010`, `two days ago`), folosești trecutul simplu: `I saw him yesterday.`',
      'Dacă momentul nu se spune sau nu contează, ori dacă e vorba de o perioadă care ține până acum (`ever`, `never`, `before`, `since`), folosești prezentul perfect: `I’ve seen this film before.`',
      'În română amândouă se spun la fel („l-am văzut”), așa că uită-te după cuvântul care arată timpul. Prezentul perfect nu merge cu `yesterday`, `last week` sau `ago`.',
      'Întrebarea cu `When…?` cere un moment, deci trecutul simplu: `When did you arrive?`',
    ],
    table: [
      ['trecutul simplu', 'prezentul perfect'],
      ['yesterday', 'ever, never'],
      ['last week, last year', 'before'],
      ['in 2010', 'just'],
      ['two days ago', 'since Monday, for a year'],
      ['When…?', 'How long…?'],
    ],
    ex: [
      ['We **met** two years **ago**.', 'Ne-am cunoscut acum doi ani.'],
      ['I**’ve met** her **before**.', 'Am mai întâlnit-o.'],
      ['I **called** my mum **last night**.', 'Am sunat-o pe mama aseară.'],
      ['**Have** you **ever lost** your keys?', 'Ți-ai pierdut vreodată cheile?'],
      ['**When did** you **arrive**?', 'Când ai ajuns?'],
      ['She**’s lived** here **since** 2010.', 'Locuiește aici din 2010.'],
    ],
    traps: [
      ['I have seen him yesterday.', 'I saw him yesterday.', 'Cu `yesterday` nu merge prezentul perfect: `saw`.'],
      ['When have you arrived?', 'When did you arrive?', '`When` întreabă de un moment: trecutul simplu.'],
      ['I’ve been to the seaside last summer.', 'I went to the seaside last summer.', '`Last summer` e un moment din trecut: trecutul simplu.'],
    ],
  },

  will: {
    rule: [
      '`Will` + verbul, la fel pentru toate persoanele: `I will go`, `she will go`. Formele scurte sunt `I’ll`, `she’ll`, iar negativul e `won’t`.',
      'Îl folosești pentru ce hotărăști chiar atunci (`I’m cold. I’ll close the window.`), pentru promisiuni (`I won’t tell anyone.`) și pentru ce crezi că va fi (`I think it will be sunny.`).',
      'Hotărârea luată pe loc nu se spune la prezent, ca în română („Închid eu geamul”): `I’ll close it`, nu `I close it`.',
      'După `will` nu vine `to` și nici `-ing`: `I will help`, nu `I will to help`.',
    ],
    ex: [
      ['The phone’s ringing. — I**’ll get** it.', 'Sună telefonul. — Răspund eu.'],
      ['I’m tired. I think I**’ll go** to bed.', 'Sunt obosit. Cred că mă duc la culcare.'],
      ['I think it **will be** sunny tomorrow.', 'Cred că mâine o să fie soare.'],
      ['Don’t worry, I **won’t tell** anyone.', 'Nu-ți face griji, nu spun nimănui.'],
      ['**Will** you **help** me with these boxes?', 'Mă ajuți cu cutiile astea?'],
      ['Maybe Tom **will come** later.', 'Poate vine Tom mai târziu.'],
    ],
    traps: [
      ['It’s cold. I close the window.', 'It’s cold. I’ll close the window.', 'Hotărâre luată acum: `I’ll`, nu prezentul.'],
      ['I promise I don’t tell anyone.', 'I promise I won’t tell anyone.', 'Promisiune pentru viitor: `won’t`, nu `don’t`.'],
      ['I will to help you.', 'I will help you.', 'După `will`, verbul vine fără `to`.'],
      ['Maybe she comes later.', 'Maybe she’ll come later.', 'Ce crezi că se va întâmpla: `will`.'],
    ],
  },

  'going-to': {
    rule: [
      'Forma: `am`, `is`, `are` + `going to` + verbul: `I’m going to buy`, `she’s going to call`. Negativul e `isn’t going to`, întrebarea `Are you going to…?`',
      'Îl folosești pentru planuri hotărâte dinainte: `We’re going to leave on Friday.` Totul e deja stabilit.',
      'Îl folosești și pentru ce se vede că urmează: `Look at those clouds. It’s going to rain.`',
      'Spre deosebire de `will`, care e pentru hotărârea luată pe loc, cu `going to` hotărârea era luată deja. Nu uita `am`, `is`, `are`: `we’re going to`, nu `we going to`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['I', 'I’m going to', 'I’m not going to', 'Am I going to…?'],
      ['he, she, it', 'she’s going to', 'she isn’t going to', 'Is she going to…?'],
      ['you, we, they', 'we’re going to', 'we aren’t going to', 'Are we going to…?'],
    ],
    ex: [
      ['I**’m going to** buy a new coat.', 'O să-mi cumpăr o haină nouă.'],
      ['We**’re going to** visit my parents on Sunday.', 'Duminică mergem în vizită la părinții mei.'],
      ['Look at the sky. It**’s going to** rain.', 'Uită-te la cer. O să plouă.'],
      ['What **are** you **going to** do tomorrow?', 'Ce ai de gând să faci mâine?'],
      ['My sister **isn’t going to** come tonight.', 'Sora mea n-o să vină diseară.'],
      ['Careful! You**’re going to** fall.', 'Ai grijă, o să cazi.'],
    ],
    traps: [
      ['We going to leave on Friday.', 'We’re going to leave on Friday.', 'Lipsește `are`: `we’re going to`.'],
      ['I’m going buy a coat.', 'I’m going to buy a coat.', 'După `going` vine `to`, apoi verbul.'],
      ['What do you going to do?', 'What are you going to do?', 'Întrebarea se face cu `are`, nu cu `do`.'],
      ['She doesn’t going to come.', 'She isn’t going to come.', 'Negativul se face cu `isn’t`, nu cu `doesn’t`.'],
    ],
  },

  must: {
    rule: [
      '`Must` și `have to` arată că ceva e obligatoriu: `You must wear a helmet.`, `I have to work on Saturday.` La `he`, `she`, `it` se spune `has to`.',
      'După `must` verbul vine direct, fără `to`: `you must go`, nu `you must to go`. `Must` are aceeași formă la toate persoanele: `she must`.',
      '`Mustn’t` înseamnă că e interzis: `You mustn’t smoke here.` `Don’t have to` înseamnă că nu e nevoie: `It’s free. You don’t have to pay.`',
      'În română „nu trebuie” le acoperă pe amândouă, așa că întreabă-te: e interzis sau doar nu e nevoie?',
    ],
    table: [
      ['', 'obligatoriu', 'interzis', 'nu e nevoie'],
      ['I, you, we, they', 'I must · I have to', 'I mustn’t', 'I don’t have to'],
      ['he, she, it', 'she must · she has to', 'she mustn’t', 'she doesn’t have to'],
    ],
    ex: [
      ['I **have to** get up at six.', 'Trebuie să mă trezesc la șase.'],
      ['Sam **has to** work at night.', 'Sam trebuie să lucreze noaptea.'],
      ['We **must** be quiet. The baby’s sleeping.', 'Trebuie să facem liniște. Doarme copilul.'],
      ['You **mustn’t** park here.', 'Aici n-ai voie să parchezi.'],
      ['It’s Sunday. I **don’t have to** work.', 'E duminică. Nu trebuie să lucrez.'],
      ['**Do** you **have to** wear a uniform?', 'Trebuie să porți uniformă?'],
    ],
    traps: [
      ['You must to wear a helmet.', 'You must wear a helmet.', 'După `must` nu vine `to`.'],
      ['It’s free. You mustn’t pay.', 'It’s free. You don’t have to pay.', 'Nu e nevoie: `don’t have to`. `Mustn’t` înseamnă „e interzis”.'],
      ['You don’t have to smoke here.', 'You mustn’t smoke here.', 'E interzis: `mustn’t`. `Don’t have to` înseamnă doar „nu e nevoie”.'],
      ['She have to work on Saturdays.', 'She has to work on Saturdays.', 'Cu `she`: `has to`.'],
    ],
  },

  can: {
    rule: [
      '`Can` înseamnă „a putea”: ești în stare sau ai voie (`I can swim.`, `Can I sit here?`). Negativul e `can’t`.',
      '`Could` e trecutul lui `can` (`When I was five, I couldn’t read.`) și, la întrebare, o cerere mai politicoasă: `Could you help me, please?`',
      '`Should` dă un sfat, „ar trebui”: `You should take a coat.` Negativul e `shouldn’t`.',
      'Toate trei au aceeași formă la toate persoanele, iar verbul vine după ele fără `to`: `she can swim`, nu `she can to swim`. Negația și întrebarea se fac fără `do`: `I can’t`, nu `I don’t can`.',
    ],
    table: [
      ['', 'afirmativ', 'negativ', 'întrebare'],
      ['can', 'I can swim.', 'I can’t swim.', 'Can you swim?'],
      ['could', 'I could swim.', 'I couldn’t swim.', 'Could you help me?'],
      ['should', 'You should rest.', 'You shouldn’t go.', 'Should I call him?'],
    ],
    ex: [
      ['**Can** I **sit** here?', 'Pot să stau aici?'],
      ['I **can’t find** my glasses.', 'Nu-mi găsesc ochelarii.'],
      ['**Could** you **close** the door, please?', 'Ai putea să închizi ușa, te rog?'],
      ['When I was a child, I **couldn’t swim**.', 'Când eram mic, nu știam să înot.'],
      ['You **should see** a doctor.', 'Ar trebui să mergi la doctor.'],
      ['It’s late. You **shouldn’t drink** coffee now.', 'E târziu. N-ar trebui să mai bei cafea acum.'],
    ],
    traps: [
      ['I can to help you.', 'I can help you.', 'După `can`, `could` și `should`, verbul vine fără `to`.'],
      ['I don’t can come tonight.', 'I can’t come tonight.', 'Negativul lui `can` e `can’t`, fără `don’t`.'],
      ['When I was a child, I can’t swim.', 'When I was a child, I couldn’t swim.', 'La trecut: `couldn’t`.'],
      ['Can I lend your pen?', 'Can I borrow your pen?', 'Iei tu cu împrumut: `borrow`. `Lend` înseamnă „a da cu împrumut”.'],
    ],
  },

  comp: {
    rule: [
      'Când compari două lucruri, la cuvintele scurte adaugi `-er`, apoi `than` („decât”): `cold` → `colder than`, `tall` → `taller than`.',
      'Uneori se schimbă puțin scrierea: `big` → `bigger`, `easy` → `easier`, `nice` → `nicer`.',
      'La cuvintele lungi pui `more` în față: `more interesting than`, `more expensive than`. În română spui mereu „mai”, dar în engleză `more` nu se pune la cuvintele scurte: `colder`, nu `more cold`.',
      'Două sunt neregulate: `good` → `better`, `bad` → `worse`. Nu pune `more` și `-er` împreună: `taller`, nu `more taller`.',
    ],
    table: [
      ['cuvântul', 'comparativul'],
      ['cold', 'colder'],
      ['big', 'bigger'],
      ['easy', 'easier'],
      ['expensive', 'more expensive'],
      ['good · bad', 'better · worse'],
    ],
    ex: [
      ['Today is **colder than** yesterday.', 'Azi e mai frig decât ieri.'],
      ['My sister is **taller than** me.', 'Sora mea e mai înaltă decât mine.'],
      ['This flat is **bigger than** our old one.', 'Apartamentul ăsta e mai mare decât cel vechi.'],
      ['The train is **more expensive than** the bus.', 'Trenul e mai scump decât autobuzul.'],
      ['Tom’s tea is **better than** mine.', 'Ceaiul lui Tom e mai bun decât al meu.'],
      ['English is **easier than** I thought.', 'Engleza e mai ușoară decât credeam.'],
    ],
    traps: [
      ['It’s more cold today.', 'It’s colder today.', 'Cuvânt scurt: `colder`, fără `more`.'],
      ['This tea is more good than coffee.', 'This tea is better than coffee.', '`Good` e neregulat: `better`.'],
      ['She is more taller than me.', 'She is taller than me.', 'Ori `-er`, ori `more`, nu amândouă.'],
    ],
  },

  sup: {
    rule: [
      'Când spui „cel mai” dintr-un grup, la cuvintele scurte adaugi `-est` și pui `the` în față: `the tallest`, `the coldest`, `the biggest`.',
      'La cuvintele lungi folosești `the most`: `the most beautiful`, `the most expensive`.',
      'Două sunt neregulate: `good` → `the best`, `bad` → `the worst`. Locul se spune cu `in`: `the best café in town`.',
      'În română „mai” apare la amândouă („mai înalt”, „cel mai înalt”). În engleză formele diferă: `taller` (mai înalt), `the tallest` (cel mai înalt).',
    ],
    table: [
      ['cuvântul', 'comparativul', 'superlativul'],
      ['tall', 'taller', 'the tallest'],
      ['big', 'bigger', 'the biggest'],
      ['easy', 'easier', 'the easiest'],
      ['beautiful', 'more beautiful', 'the most beautiful'],
      ['good · bad', 'better · worse', 'the best · the worst'],
    ],
    ex: [
      ['It’s **the coldest** day of the year.', 'E cea mai friguroasă zi din an.'],
      ['Tom makes **the best** tea in town.', 'Tom face cel mai bun ceai din oraș.'],
      ['Who is **the tallest** in your family?', 'Cine e cel mai înalt din familia ta?'],
      ['Mrs Hughes has **the most beautiful** roses.', 'Doamna Hughes are cei mai frumoși trandafiri.'],
      ['This is **the most expensive** shop on our street.', 'Ăsta e cel mai scump magazin de pe strada noastră.'],
      ['It was **the worst** film I’ve ever seen.', 'A fost cel mai prost film pe care l-am văzut vreodată.'],
    ],
    traps: [
      ['She’s the most tall in the class.', 'She’s the tallest in the class.', 'Cuvânt scurt: `the tallest`, fără `most`.'],
      ['It was the more beautiful day of my life.', 'It was the most beautiful day of my life.', '„Cel mai” se spune `the most`, nu `the more`.'],
      ['It’s the tallest building of the world.', 'It’s the tallest building in the world.', 'Locul după superlativ: `in the world`, nu `of`.'],
      ['It’s the most good café in town.', 'It’s the best café in town.', '`Good` e neregulat: `the best`.'],
    ],
  },

  if1: {
    rule: [
      'Pentru ceva posibil în viitor: `if` + prezent, apoi `will` + verbul: `If it rains, we’ll stay at home.`',
      'După `if` nu vine `will`, chiar dacă vorbești despre viitor: `if I have time`, nu `if I will have time`. În română se poate spune „dacă o să am timp”; în engleză, nu.',
      'Ordinea se poate inversa: `We’ll stay at home if it rains.` Când `if` e la început, pui virgulă între cele două părți.',
      'În a doua parte poate veni și `can`, `should` sau un imperativ: `If you’re tired, you should rest.`',
    ],
    table: [
      ['condiția', 'ce urmează'],
      ['If it rains,', 'we’ll stay at home.'],
      ['If you’re late,', 'I’ll wait for you.'],
      ['If she doesn’t come,', 'I’ll call her.'],
      ['If you’re tired,', 'you should rest.'],
    ],
    ex: [
      ['**If** I **have** time, I**’ll help** you.', 'Dacă am timp, te ajut.'],
      ['I**’ll call** you **if** I**’m** late.', 'Te sun dacă întârzii.'],
      ['**If** you **hurry**, you**’ll catch** the bus.', 'Dacă te grăbești, prinzi autobuzul.'],
      ['What **will** you **do** if she **doesn’t come**?', 'Ce faci dacă nu vine?'],
      ['**If** Mimi **is** hungry, she**’ll wake** me up.', 'Dacă lui Mimi îi e foame, mă trezește.'],
      ['**If** you **see** Tom, **tell** him to call me.', 'Dacă-l vezi pe Tom, spune-i să mă sune.'],
    ],
    traps: [
      ['If I will have time, I’ll help you.', 'If I have time, I’ll help you.', 'După `if` vine prezentul, nu `will`.'],
      ['If she won’t come, I’ll call her.', 'If she doesn’t come, I’ll call her.', 'După `if`: `doesn’t`, nu `won’t`.'],
      ['If you’re tired, you should to rest.', 'If you’re tired, you should rest.', 'După `should`, verbul vine fără `to`.'],
    ],
  },
};
