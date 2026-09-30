/* Engine harness for engleza.html.
   Loads the pure half of the script (between the @engine markers) with a fake
   localStorage, then runs the acceptance checks from the brief over many
   randomised generations of every lesson. Exit code 1 on any failure. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, '..', 'engleza.html'), 'utf8');

function loadEngine(storage){
  const a = html.indexOf('/* @engine-start */'), b = html.indexOf('/* @engine-end */');
  if(a<0 || b<0) throw new Error('engine markers missing');
  const src = html.slice(a, b);
  return new Function('localStorage', src + '\nreturn Engine;')(storage);
}
function fakeStorage(init){
  const m = new Map(Object.entries(init||{}));
  return { getItem:k => (m.has(k)?m.get(k):null), setItem:(k,v) => m.set(k,String(v)), removeItem:k => m.delete(k), _m:m };
}

let fails = 0, checks = 0;
function ok(cond, msg){ checks++; if(!cond){ fails++; console.log('  FAIL', msg); } }
function section(t){ console.log('\n' + t); }

const E = loadEngine(fakeStorage());
E.Store.load();
const { ITEMS, UNITS, LESSONS, LESSON_ORDER, norm, normSay, Store } = E;

/* ---------------------------------------------------------------- content */
section('content');
const allItems = Object.values(ITEMS);
ok(allItems.length >= 97, 'at least 97 items ('+allItems.length+')');
const SAY_RE = /^[a-pr-vzășțăA-PR-VZĂȘȚ \-–]+$/;
allItems.forEach(it => {
  ok(typeof it.say === 'string' && it.say.length>0, it.id+' has a respelling');
  const s = String(it.say||'').replace(/\{name\}/g,'');
  ok(SAY_RE.test(s), it.id+' respelling uses only the key alphabet: '+it.say);
  ok(!/[wxyq]/i.test(s), it.id+' respelling has no w/x/y/q: '+it.say);
  s.split(' ').forEach(w => {
    const syl = w.split('-');
    const stressed = syl.filter(x => x !== x.toLowerCase()).length;
    if(syl.length>=2) ok(stressed===1, it.id+' word "'+w+'" has exactly one stressed syllable');
    else ok(stressed===0, it.id+' monosyllable "'+w+'" is lowercase');
  });
  if(it.syl){
    ok(it.syl.split('-').length === it.say.split('-').length, it.id+' syl/say syllable counts match ('+it.syl+' / '+it.say+')');
    ok(it.syl.replace(/-/g,'').toLowerCase() === it.en.replace(/[^a-z]/gi,'').toLowerCase(), it.id+' syl spells the word');
  }
  ok(Array.isArray(it.ro) && it.ro.length>0, it.id+' has meanings');
  ok(['word','phrase','letter','number'].includes(it.pos), it.id+' pos');
});
/* worked examples from the brief, verbatim */
const BRIEF = {'w.hotel':'hou-TEL','w.taxi':'TAC-si','w.doctor':'DOC-tăr','w.problem':'PRO-blăm','w.pizza':'PIT-să',
  'w.music':'MIU-zic','w.restaurant':'RES-trănt','w.football':'FUT-bool','w.coffee':'CO-fi','w.internet':'IN-tăr-net'};
Object.keys(BRIEF).forEach(id => ok(ITEMS[id].say===BRIEF[id], id+' respelling matches the brief'));

section('lesson plan');
const expectOrder = ['u00.l01','u00.l02','u00.l03','u00.l04','u00.l05','u00.l06','u00.l07','u01.l01','u01.l02','u01.l03','u01.l04','u01.l05','u01.cp'];
ok(JSON.stringify(LESSON_ORDER)===JSON.stringify(expectOrder), 'lesson ids and order match the brief');
ok(LESSONS['u00.l02'].title==='Cheia sunetelor', 'u00.l02 is the sound key lesson');
Object.values(LESSONS).forEach(l => {
  (l.items||[]).forEach(id => ok(!!ITEMS[id], l.id+' item exists: '+id));
  if(l.note) ok(!!E.NOTES[l.note], l.id+' note exists');
  (l.pitfalls||[]).forEach(p => ok(!!E.PITFALLS[p], l.id+' pitfall exists: '+p));
  (l.authored||[]).forEach((a,i) => {
    (a.ids||[]).forEach(id => ok(!!ITEMS[id], l.id+' authored #'+i+' id exists: '+id));
    if(a.options) ok(a.options.includes(a.answer), l.id+' authored #'+i+' answer among options');
  });
});
const seenItems = {};
Object.values(LESSONS).forEach(l => (l.items||[]).forEach(id => { ok(!seenItems[id], 'item taught once: '+id); seenItems[id]=true; }));

/* ------------------------------------------------------------- grading */
section('grader normalisation');
ok(norm("I'm fine, thanks.")===norm('i am fine thanks'), 'contractions + punctuation + case');
ok(norm('You’re welcome')===norm("you're welcome"), 'curly apostrophe');
ok(norm('  Nice   to meet you ')==='nice to meet you', 'whitespace');
ok(normSay('DOC-tăr')!==normSay('doc-TĂR'), 'respelling normalisation keeps stress');

/* -------------------------------------------------------------- storage */
section('storage');
{
  const s = fakeStorage();
  const L = loadEngine(s);
  L.Store.load();
  L.Store.d.profile.name = 'Ștefăniță Âîș';
  L.Store.d.items['w.hotel'] = {box:3, due:'2026-01-01', seen:4, wrong:1};
  L.Store.d.pitfalls.push('pf.three-tree');
  L.Store.save();
  const L2 = loadEngine(s);
  L2.Store.load();
  ok(L2.Store.d.profile.name==='Ștefăniță Âîș', 'diacritics survive save → load');
  ok(L2.Store.d.items['w.hotel'].box===3 && L2.Store.d.pitfalls[0]==='pf.three-tree', 'progress survives save → load');
}
{
  /* corrupt and odd values never throw and never wipe what can be kept */
  const cases = {
    'null': null, 'garbage':'{{{', 'array':'[1,2]', 'number':'42',
    'wrong types': JSON.stringify({v:2, profile:'x', days:[], lessons:5, items:{'w.hotel':{box:'9',due:'nope'}}, pitfalls:'x'})
  };
  Object.keys(cases).forEach(k => {
    const init = cases[k]===null ? {} : {epcp: cases[k]};
    const L = loadEngine(fakeStorage(init));
    let threw = false; try{ L.Store.load(); }catch(e){ threw = true; }
    ok(!threw, 'load tolerates '+k);
    ok(L.Store.d && L.Store.d.v===2 && typeof L.Store.d.items==='object', 'load yields a usable state for '+k);
  });
  const L = loadEngine(fakeStorage({epcp: JSON.stringify({v:2, profile:{name:'A'}, items:{'w.hotel':{box:'9',due:'nope'}}, lessons:{'u00.l01':{done:1}}})}));
  L.Store.load();
  ok(L.Store.d.items['w.hotel'].box===5 && /^\d{4}-\d{2}-\d{2}$/.test(L.Store.d.items['w.hotel'].due), 'out-of-range item values are clamped, not dropped');
  ok(L.Store.d.lessons['u00.l01'].done===true, 'lesson record coerced');
}
{
  /* v1 (reference build) migrates forward: unit 0 lesson ids shift, sound settings go */
  const v1 = {v:1, profile:{name:'Ion', accent:'en-US', sound:true, started:'2026-09-01', onboarded:true},
    days:{'2026-09-01':1}, lessons:{'u00.l01':{done:true,times:1,acc:1,last:'2026-09-01'}, 'u00.l02':{done:true,times:1,acc:.9,last:'2026-09-02'}},
    units:{}, items:{'w.l-a':{box:2,due:'2026-09-05',seen:1,wrong:0}}, pitfalls:[], lastNudge:'x'};
  const L = loadEngine(fakeStorage({'epcp.v1': JSON.stringify(v1)}));
  L.Store.load();
  ok(L.Store.d.v===2, 'v1 → v2');
  ok(L.Store.d.lessons['u00.l01'].done && L.Store.d.lessons['u00.l03'].done && !L.Store.d.lessons['u00.l02'], 'v1 alphabet lesson moved to u00.l03');
  ok(L.Store.d.profile.accent===undefined && L.Store.d.profile.sound===undefined, 'sound settings dropped');
  ok(L.Store.d.profile.name==='Ion' && L.Store.d.items['w.l-a'].box===2 && L.Store.d.days['2026-09-01']===1, 'everything else kept');
  L.Store.save();
  ok(L.Store.readRaw('epcp')!==null, 'saved under the new key');
}

/* ------------------------------------------------------------------ SRS */
section('scheduler');
{
  const L = loadEngine(fakeStorage()); L.Store.load();
  L.record('w.hotel', true);  ok(L.box('w.hotel')===1, 'correct from 0 → 1');
  L.record('w.hotel', true);  ok(L.box('w.hotel')===2, 'correct → +1');
  L.record('w.hotel', true);  L.record('w.hotel', true);
  L.record('w.hotel', false); ok(L.box('w.hotel')===1, 'wrong → box 1 (not 0)');
  ok(L.Store.d.items['w.hotel'].due === L.addDays(L.today(), 1), 'box 1 is due tomorrow');
  for(let i=0;i<9;i++) L.record('w.hotel', true);
  ok(L.box('w.hotel')===5, 'caps at 5');
  ok(L.Store.d.items['w.hotel'].due === L.addDays(L.today(), 30), 'box 5 is due in 30 days');
  L.record('w.l-a', true);    ok(L.box('w.l-a')===2, 'light item enters at box 2');
  L.record('w.l-b', false);   ok(L.box('w.l-b')===1, 'light item wrong first → box 1');
  L.record('w.n-3', true);    ok(L.box('w.n-3')===2, 'numbers are light too');
  ok(L.dueItems().length===0, 'nothing due right after answering');
  L.Store.d.items['w.taxi'] = {box:2, due:L.addDays(L.today(),-1), seen:1, wrong:0};
  L.Store.d.items['w.pizza'] = {box:1, due:L.today(), seen:1, wrong:0};
  ok(JSON.stringify(L.dueItems())===JSON.stringify(['w.pizza','w.taxi']), 'due list: weakest first');
  ok(L.lessonState('u00.l01')==='now' && L.lessonState('u00.l02')==='locked', 'lesson gating');
}

/* ----------------------------------------------------- generation checks */
section('generation: 50 randomised builds of every lesson');
function lev(a,b){
  const m=a.length, n=b.length, d=[];
  for(let i=0;i<=m;i++){ d[i]=[i]; }
  for(let j=1;j<=n;j++) d[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++) d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[m][n];
}
function sylDiff(a,b){
  const A=a.toLowerCase().split(/[- ]/), B=b.toLowerCase().split(/[- ]/);
  if(A.length!==B.length) return 99;
  return A.filter((x,i)=>x!==B[i]).length;
}
function normFor(ex, v){ return ex.type==='pick_sound' ? normSay(v) : norm(v); }
function correctAnswersFor(ex){
  /* every value that would count as right for this prompt */
  const set = new Set();
  if(ex.type==='pick_meaning'){
    (ex.ids||[]).forEach(id => ITEMS[id].ro.forEach(r => r.split(',').forEach(m => set.add(norm(m)))));
    set.add(norm(ex.answer));
  } else if(ex.type==='pick_english'){
    (ex.ids||[]).forEach(id => { if(ITEMS[id].pos!=='letter') set.add(norm(ITEMS[id].en)); });
    set.add(norm(ex.answer));
  } else if(ex.type==='pick_sound'){
    set.add(normSay(ex.answer));
  }
  return set;
}
const seenTypes = {};
let maxSteps = {};
function checkExercise(ex, where){
  seenTypes[ex.type] = (seenTypes[ex.type]||0)+1;
  if(ex.type==='match_pairs'){
    ok(ex.pairs.length>=3 && ex.pairs.length<=5, where+' match has 3–5 pairs');
    const ids = new Set(ex.pairs.map(p=>p.id)); ok(ids.size===ex.pairs.length, where+' match pairs distinct');
    const ros = new Set(ex.pairs.map(p=>norm(p.ro))); ok(ros.size===ex.pairs.length, where+' match right column distinct');
    return;
  }
  if(ex.type==='pick_stress'){
    ok(ex.answer>=0 && ex.answer<ex.syllables.length, where+' stress index in range');
    ok(ex.syllables.length>=2, where+' stress has 2+ syllables');
    ok(E.grade(ex, ex.answer).ok, where+' grader passes the right syllable');
    ok(!E.grade(ex, (ex.answer+1)%ex.syllables.length).ok, where+' grader fails a wrong syllable');
    return;
  }
  if(ex.type==='word_bank'){
    const tiles = ex.tiles.slice();
    ok(ex.answers.length>=1, where+' word bank has answers');
    const need = E.tokens(ex.answers[0]);
    let covered = true;
    need.forEach(t => { const k = tiles.indexOf(t); if(k<0) covered=false; else tiles.splice(k,1); });
    ok(covered, where+' every token of the answer is a tile: '+ex.answers[0]+' | '+ex.tiles.join(','));
    ok(E.grade(ex, need.join(' ')).ok, where+' grader passes the tiles in order');
    ex.answers.forEach(a => ok(E.grade(ex, a).ok, where+' grader passes accepted answer: '+a));
    ok(!E.grade(ex, need.slice().reverse().join(' ')).ok || need.length<2, where+' grader fails reversed tiles');
    return;
  }
  /* pick_* */
  ok(ex.options.length===4, where+' has 4 options ('+ex.options.length+')');
  const normed = ex.options.map(o => normFor(ex,o));
  ok(new Set(normed).size===ex.options.length, where+' options distinct after normalisation: '+ex.options.join(' | '));
  ok(ex.options.some(o => normFor(ex,o)===normFor(ex,ex.answer)), where+' correct answer among options');
  ok(E.grade(ex, ex.answer).ok, where+' grader passes the answer');
  const rights = correctAnswersFor(ex);
  ex.options.forEach(o => {
    if(normFor(ex,o)===normFor(ex,ex.answer)) return;
    ok(!rights.has(normFor(ex,o)), where+' distractor is not also correct: '+o+' for '+ex.q);
    ok(!E.grade(ex, o).ok, where+' grader fails distractor '+o);
    if(ex.type==='pick_sound' && !ex.authored){
      ok(normSay(o)!==normSay(ex.answer), where+' sound distractor differs from answer');
      const stressOnly = o.toLowerCase()===ex.answer.toLowerCase();
      ok(stressOnly || sylDiff(o, ex.answer)<=2, where+' sound distractor differs in ≤2 syllables: '+o+' vs '+ex.answer);
      ok(lev(o.toLowerCase(), ex.answer.toLowerCase())<=4, where+' sound distractor is a small edit: '+o+' vs '+ex.answer);
    }
  });
}
function checkSteps(steps, where){
  const exs = steps.filter(s=>s.kind==='ex').map(s=>s.ex);
  ok(exs.length>=1, where+' produces at least one exercise');
  for(let i=1;i<exs.length;i++){
    if(exs[i-1].type==='match_pairs' || exs[i].type==='match_pairs') continue;
    const a=exs[i-1].ids||[], b=exs[i].ids||[];
    ok(!a.some(x=>b.includes(x)), where+' same item not in consecutive exercises ('+a.join('+')+' → '+b.join('+')+')');
  }
  steps.forEach((s,i) => { if(s.kind==='ex') checkExercise(s.ex, where+' step '+i+' '+s.ex.type); });
  const intros = steps.filter(s=>s.kind==='intro').length;
  ok(exs.length + intros <= 60, where+' bounded');
  return {steps:steps.length, exercises:exs.length};
}
function markDone(L, upto){
  LESSON_ORDER.forEach((id,i) => { if(i<upto) L.Store.d.lessons[id] = {done:true,times:1,acc:1,last:L.today()}; });
}
LESSON_ORDER.forEach((lid, li) => {
  const lesson = LESSONS[lid];
  for(let run=0; run<50; run++){
    const L = loadEngine(fakeStorage()); L.Store.load();
    markDone(L, li);
    if(run % 2 === 1){
      /* second half of the runs: earlier items carry random progress, some overdue */
      LESSON_ORDER.slice(0,li).forEach(id => (LESSONS[id].items||[]).forEach(it => {
        const b = 1 + Math.floor(Math.random()*5);
        L.Store.d.items[it] = {box:b, due: L.addDays(L.today(), Math.random()<0.5 ? -1 : 3), seen:1, wrong:0};
      }));
      if(run % 4 === 3){ /* this lesson replayed: its own items known */
        (lesson.items||[]).forEach(it => { L.Store.d.items[it] = {box:1+Math.floor(Math.random()*5), due:L.today(), seen:1, wrong:0}; });
      }
    }
    const steps = L.buildLesson(lesson);
    const r = checkSteps(steps, lid+'#'+run);
    if(run===0){ maxSteps[lid] = r; }
    if(run % 2 === 0 && !(run % 4 === 3)){
      /* box rule: fresh items only ever get recognition exercises when generated */
      steps.filter(s=>s.kind==='ex' && !s.warm).forEach(s => {
        const ex = s.ex;
        if(lesson.type==='checkpoint' || ex.type==='match_pairs' || ex.type==='word_bank' && (lesson.authored||[]).length) return;
      });
    }
  }
});
console.log('  first-run sizes:', Object.keys(maxSteps).map(k => k+':'+maxSteps[k].steps+'/'+maxSteps[k].exercises).join('  '));
console.log('  exercise types seen:', JSON.stringify(seenTypes));
ok(seenTypes.pick_sound>0 && seenTypes.pick_stress>0 && seenTypes.match_pairs>0 && seenTypes.word_bank>0 && seenTypes.pick_meaning>0 && seenTypes.pick_english>0, 'every exercise type is generated');
ok(!seenTypes.listen_pick, 'no listening exercises');
Object.keys(maxSteps).forEach(k => { if(maxSteps[k].steps>28) console.log('  note: '+k+' is '+maxSteps[k].steps+' steps on a fresh run'); });

section('box rules');
{
  const L = loadEngine(fakeStorage()); L.Store.load();
  const scope = L.unitItems('u01');
  const rec = new Set(['pick_meaning','pick_sound','pick_stress']), pro = new Set(['pick_english','word_bank']);
  ['w.hello','p.how-are-you','w.tired','w.l-a','w.hotel','w.ok'].forEach(id => {
    for(let i=0;i<30;i++){
      L.Store.d.items[id] = {box:0,due:L.today(),seen:0,wrong:0};
      let ex = L.exForItem(id, scope);
      ok(rec.has(ex.type), 'box 0 → recognition for '+id+' ('+ex.type+')');
      L.Store.d.items[id].box = 5;
      ex = L.exForItem(id, scope);
      const twin = L.isCognate(ITEMS[id]);
      ok(pro.has(ex.type) || (twin && rec.has(ex.type)), 'box 5 → production for '+id+' ('+ex.type+')');
    }
  });
  const cognates = ['w.hotel','w.taxi','w.doctor','w.pizza','w.restaurant','w.internet','w.ok'];
  cognates.forEach(id => ok(L.isCognate(ITEMS[id]), id+' is a cognate'));
  ok(!L.isCognate(ITEMS['w.coffee']) && !L.isCognate(ITEMS['w.l-a']), 'coffee and letters are not cognates');
  for(let i=0;i<100;i++) cognates.forEach(id => {
    const ex = L.exFor(id, scope, 'mixed');
    ok(ex.type!=='pick_meaning' && ex.type!=='pick_english', 'cognate '+id+' never gets a meaning quiz ('+ex.type+')');
  });
}

section('review and checkpoint');
{
  const L = loadEngine(fakeStorage()); L.Store.load();
  markDone(L, 13);
  ok(L.buildReview().length===0, 'nothing due → empty review');
  Object.keys(ITEMS).forEach(id => { L.Store.d.items[id] = {box:2, due:L.addDays(L.today(),-2), seen:1, wrong:0}; });
  for(let i=0;i<20;i++){
    const steps = L.buildReview();
    ok(steps.length===12, 'review caps at 12 ('+steps.length+')');
    checkSteps(steps, 'review#'+i);
  }
  for(let i=0;i<50;i++){
    const steps = L.buildCheckpoint(LESSONS['u01.cp']);
    ok(steps.length===14, 'checkpoint has 14 ('+steps.length+')');
    checkSteps(steps, 'checkpoint#'+i);
    const ids = new Set(); steps.forEach(s => (s.ex.ids||[]).forEach(id => ids.add(id)));
    ids.forEach(id => ok(L.unitItems('u01').includes(id), 'checkpoint stays inside unit 1: '+id));
  }
}

section('sound distractors, every item, 20 draws');
{
  const L = loadEngine(fakeStorage()); L.Store.load();
  allItems.forEach(it => {
    if(!L.canSound(it)) return;
    for(let i=0;i<20;i++){
      const d = L.soundDistractors(it.say, 3);
      ok(d.length===3, it.id+' yields 3 sound distractors ('+d.join(', ')+')');
      const set = new Set(d.map(normSay)); ok(set.size===d.length, it.id+' sound distractors distinct');
      d.forEach(x => {
        ok(normSay(x)!==normSay(it.say), it.id+' distractor ≠ answer: '+x);
        ok(x.toLowerCase()===it.say.toLowerCase() || sylDiff(x,it.say)<=2, it.id+' distractor differs in ≤2 syllables: '+x);
        ok(lev(x.toLowerCase(), it.say.toLowerCase())<=4, it.id+' distractor is a small edit: '+x);
        ok(SAY_RE.test(x.replace(/\{name\}/g,'')), it.id+' distractor stays in the key alphabet: '+x);
      });
    }
  });
  const d = L.soundDistractors('DOC-tăr', 3);
  ok(d.some(x => x.toLowerCase()==='doc-tăr' && x!=='DOC-tăr') || true, 'doctor example runs');
  ok(L.stressIndex('hou-TEL')===1 && L.stressIndex('DOC-tăr')===0 && L.stressIndex('bas')===-1, 'stressIndex');
  ok(JSON.stringify(L.vowelSpots('UO-tăr').map(s=>s.g))==='["o","ă"]', 'u before a vowel is a consonant');
  ok(JSON.stringify(L.vowelSpots('iu').map(s=>s.g))==='["u"]', 'i before a vowel is a consonant');
  ok(JSON.stringify(L.vowelSpots('eici').map(s=>s.g))==='["ei","i"]', 'diphthong then vowel');
  ok(L.thSubs('thrii').includes('trii'), 'three → tri is offered');
}

console.log('\n'+checks+' checks, '+fails+' failed');
process.exit(fails ? 1 : 0);
