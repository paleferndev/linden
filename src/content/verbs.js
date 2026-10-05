// The verb album: six verbs per episode, collected when the episode ends. Forms: base, past, past participle.
// `ex` is a line from the story where the verb comes up. Review ids are 'v:<base>'.

// Phrasal verbs are regular or not by their verb: look forward to → looked, come back → came.
const V = (ep, base, past, pp, ro, ex) => ({ ep, base, past, pp, ro, ex, irregular: past.split(/[ /]/)[0] !== regular(base.split(' ')[0]) });
function regular(b) {
  if (/e$/.test(b)) return b + 'd';
  if (/[^aeiou]y$/.test(b)) return b.slice(0, -1) + 'ied';
  if (/^(stop|plan)$/.test(b)) return b + b.slice(-1) + 'ed';
  return b + 'ed';
}

export const VERBS = [
  V(1, 'be', 'was / were', 'been', 'a fi', 'Where am I? Is this a garden?'),
  V(1, 'have', 'had', 'had', 'a avea', 'My lantern has got one spark.'),
  V(1, 'look', 'looked', 'looked', 'a se uita', 'Look! Is that a spark?'),
  V(1, 'see', 'saw', 'seen', 'a vedea', 'I can see something by the gate.'),
  V(1, 'open', 'opened', 'opened', 'a deschide', 'Can you open the gate?'),
  V(1, 'help', 'helped', 'helped', 'a ajuta', 'Can you help me?'),

  V(2, 'drink', 'drank', 'drunk', 'a bea', 'What does your friend drink?'),
  V(2, 'like', 'liked', 'liked', 'a-i plăcea', 'Does your friend like milk?'),
  V(2, 'want', 'wanted', 'wanted', 'a vrea', 'I want to find my sparks.'),
  V(2, 'need', 'needed', 'needed', 'a avea nevoie', 'I don’t eat. I only need light.'),
  V(2, 'work', 'worked', 'worked', 'a lucra', 'Sam works at night.'),
  V(2, 'make', 'made', 'made', 'a face (a prepara)', 'Tom makes very good tea.'),

  V(3, 'do', 'did', 'done', 'a face', 'What is the Stranger doing?'),
  V(3, 'try', 'tried', 'tried', 'a încerca', 'I am trying to fix the radio.'),
  V(3, 'fix', 'fixed', 'fixed', 'a repara', 'It is fixing the old radio.'),
  V(3, 'build', 'built', 'built', 'a construi', 'I am building an antenna.'),
  V(3, 'watch', 'watched', 'watched', 'a privi', 'Mimi is watching us.'),
  V(3, 'carry', 'carried', 'carried', 'a căra', 'Tom is carrying some boxes.'),

  V(4, 'happen', 'happened', 'happened', 'a se întâmpla', 'What happened that night?'),
  V(4, 'stop', 'stopped', 'stopped', 'a (se) opri', 'The bus stopped at midnight.'),
  V(4, 'arrive', 'arrived', 'arrived', 'a sosi', 'I arrived at the stop at twelve.'),
  V(4, 'walk', 'walked', 'walked', 'a merge pe jos', 'I walked to the window.'),
  V(4, 'call', 'called', 'called', 'a suna', 'I called my wife.'),
  V(4, 'stay', 'stayed', 'stayed', 'a rămâne', 'I stayed on the bus.'),

  V(5, 'buy', 'bought', 'bought', 'a cumpăra', 'Someone bought all my candles.'),
  V(5, 'sell', 'sold', 'sold', 'a vinde', 'I sell a bit of everything.'),
  V(5, 'cost', 'cost', 'cost', 'a costa', 'How much do the batteries cost?'),
  V(5, 'pay', 'paid', 'paid', 'a plăti', 'He paid with very old coins.'),
  V(5, 'find', 'found', 'found', 'a găsi', 'I found this in the coin box.'),
  V(5, 'bring', 'brought', 'brought', 'a aduce', 'Can you bring some batteries?'),

  V(6, 'put', 'put', 'put', 'a pune', 'I put my glasses on the bench.'),
  V(6, 'leave', 'left', 'left', 'a lăsa, a pleca', 'Did I leave them in the garden?'),
  V(6, 'hide', 'hid', 'hidden', 'a ascunde', 'The spark is hiding somewhere.'),
  V(6, 'lose', 'lost', 'lost', 'a pierde', 'I always lose my glasses.'),
  V(6, 'move', 'moved', 'moved', 'a (se) mișca', 'The gnome moved last night.'),
  V(6, 'fall', 'fell', 'fallen', 'a cădea', 'The light fell into my garden.'),

  V(7, 'go', 'went', 'gone', 'a merge', 'The gnome went to Priya’s shop.'),
  V(7, 'take', 'took', 'taken', 'a lua', 'He took the last candles.'),
  V(7, 'get', 'got', 'got', 'a primi, a ajunge', 'We got a message on the radio.'),
  V(7, 'give', 'gave', 'given', 'a da', 'He gave Priya three old coins.'),
  V(7, 'say', 'said', 'said', 'a spune', 'What did the Voice say?'),
  V(7, 'tell', 'told', 'told', 'a spune (cuiva)', 'Sam told me everything.'),

  V(8, 'hear', 'heard', 'heard', 'a auzi', 'Have you ever heard this song?'),
  V(8, 'feel', 'felt', 'felt', 'a simți', 'I have never felt so warm.'),
  V(8, 'forget', 'forgot', 'forgotten', 'a uita', 'I have never forgotten that night.'),
  V(8, 'remember', 'remembered', 'remembered', 'a-și aminti', 'I remember it very well.'),
  V(8, 'meet', 'met', 'met', 'a întâlni', 'I met him in 1966.'),
  V(8, 'know', 'knew', 'known', 'a ști, a cunoaște', 'I have known him for sixty years.'),

  V(9, 'plan', 'planned', 'planned', 'a plănui', 'We planned everything.'),
  V(9, 'send', 'sent', 'sent', 'a trimite', 'We are going to send a message.'),
  V(9, 'decide', 'decided', 'decided', 'a hotărî', 'Have you decided?'),
  V(9, 'prepare', 'prepared', 'prepared', 'a pregăti', 'We will prepare the lantern.'),
  V(9, 'promise', 'promised', 'promised', 'a promite', 'I promise I will come back.'),
  V(9, 'return', 'returned', 'returned', 'a se întoarce', 'When will you return?'),

  V(10, 'borrow', 'borrowed', 'borrowed', 'a împrumuta (de la cineva)', 'Can we borrow your telescope?'),
  V(10, 'lend', 'lent', 'lent', 'a împrumuta (cuiva)', 'I can lend you my key.'),
  V(10, 'allow', 'allowed', 'allowed', 'a permite', 'Visitors aren’t allowed on the roof.'),
  V(10, 'climb', 'climbed', 'climbed', 'a urca', 'You mustn’t climb the antenna.'),
  V(10, 'check', 'checked', 'checked', 'a verifica', 'I should check the weather.'),
  V(10, 'repair', 'repaired', 'repaired', 'a repara', 'We have to repair the door.'),

  V(11, 'compare', 'compared', 'compared', 'a compara', 'Let’s compare the sparks.'),
  V(11, 'grow', 'grew', 'grown', 'a crește', 'The light is growing.'),
  V(11, 'shine', 'shone', 'shone', 'a străluci', 'This one shines more than the others.'),
  V(11, 'rise', 'rose', 'risen', 'a se ridica, a răsări', 'The moon rises later tonight.'),
  V(11, 'reach', 'reached', 'reached', 'a ajunge la', 'Can you reach the top branch?'),
  V(11, 'win', 'won', 'won', 'a câștiga', 'Nobody wins. It isn’t a race.'),

  V(12, 'set off', 'set off', 'set off', 'a porni la drum', 'We will set off at midnight.'),
  V(12, 'come back', 'came back', 'come back', 'a se întoarce', 'Will you come back?'),
  V(12, 'say goodbye', 'said goodbye', 'said goodbye', 'a-și lua rămas-bun', 'I don’t want to say goodbye.'),
  V(12, 'look forward to', 'looked forward to', 'looked forward to', 'a aștepta cu drag', 'I look forward to your next message.'),
  V(12, 'miss', 'missed', 'missed', 'a-i fi dor de', 'If you miss me, look at the tree.'),
  V(12, 'fly', 'flew', 'flown', 'a zbura', 'If the sky is clear, I will fly home.'),
];

export const VERB = Object.fromEntries(VERBS.map(v => [v.base, v]));
export const verbsOf = ep => VERBS.filter(v => v.ep === ep);
/** The forms said in one breath, for the verb's page: "see. saw. seen." */
export const formsLine = v => `${v.base}. ${v.past.replace(' / ', ', ')}. ${v.pp}.`;
/** The first past form, for games and checks ("was / were" → "was"). */
export const pastOf = v => v.past.split(' / ')[0];
