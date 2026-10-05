// The language episodes are written in. An episode is a list of entries played in order in the chat:
// things that happen (messages, notes, pictures) and things you do (replies, games, the signal).
// Everything anyone says is English with its Romanian beside it; only notes, task labels and narration are Romanian.
// `{name}` is the learner's name. A wrong option is [text, why] or [text, why, [reaction en, reaction ro]]:
// the reply is sent, the other person reacts, and `why` is the one-line Romanian explanation.

const wrongs = ws => ws.map(w => (Array.isArray(w) ? { text: w[0], why: w[1] || '', re: w[2] || null } : { text: w, why: '', re: null }));

/* ---------------------------------------------------------------- things that happen */
/** A message. o: { mark: ['does'] (words to highlight), glitch: 'is' (a wrong word to fix next) } */
export const m = (who, en, ro, o = {}) => ({ t: 'msg', who, en, ro, ...o });
/** A panel of narration: a drawing (art key) with one Romanian line. */
export const story = (ro, art = null) => ({ t: 'story', ro, art });
/** A small line in the middle of the chat: "Mimi toarce." */
export const sys = ro => ({ t: 'sys', ro });
/** A rule, in one Romanian line, with examples; **x** marks the part that matters. */
export const note = (title, ro, ex = []) => ({ t: 'note', title, ro, ex });
/** A voice note: you hear it, the text is hidden until the task after it is done. */
export const voice = (who, en, ro) => ({ t: 'voice', who, en, ro });
/** A photo someone sends (art key), with an optional line. */
export const pic = (who, art, en = '', ro = '') => ({ t: 'pic', who, art, en, ro });
/** A spark comes back: the lantern gets brighter. */
export const spark = () => ({ t: 'spark' });
/** From here on, `who` is called `name`. */
export const rename = (who, name) => ({ t: 'rename', who, name });

/* ---------------------------------------------------------------- things you do */
/** Your reply has a gap: `text` with {} and the right word first. */
export const complete = (q, text, right, ...wrong) => ({ t: 'complete', q, text, right, wrong: wrongs(wrong) });
/** Pick the right reply among real mistakes. */
export const choose = (q, right, ...wrong) => ({ t: 'choose', q, right, wrong: wrongs(wrong) });
/** Build the sentence from word tiles; `extra` are near-miss tiles. */
export const build = (q, en, extra = [], why = '') => ({ t: 'build', q, en, extra, why });
/** Type the missing word(s). `a` is the answer or a list of accepted answers, the first being the one shown. */
export const write = (q, text, a, why = '') => ({ t: 'write', q, text, a: [].concat(a), why });
/** About the voice note just before: pick what it meant (Romanian options, right first). */
export const listen = (q, right, ...wrong) => ({ t: 'listen', q, right, wrong: wrongs(wrong) });
/** Type what the voice note just before said. */
export const dictate = q => ({ t: 'dictate', q });
/** The message just before has a `glitch`: tap the wrong word, then pick the fix (right first). */
export const fix = (q, right, wrong, why) => ({ t: 'fix', q, right, wrong: [].concat(wrong), why });
/** Quick questions against the clock: [text with {}, right, wrong, (why)]. */
export const quiz = (...items) => ({ t: 'quiz', items: items.map(([text, right, wrong, why]) => ({ text, right, wrong: [].concat(wrong), why: why || '' })) });
/** A minigame, with its data set (src/content/games.js). */
export const game = (kind, set) => ({ t: 'game', kind, set });
/** The radio transmission at the end: type what you hear. `clue` (Romanian) says what it means for the story.
 *  `who`: whose voice it is, 'voice' (the others, far away) or 'oldvoice' (someone much nearer). */
export const signal = (en, ro, clue, who = 'voice') => ({ t: 'signal', en, ro, clue, who });

/** Tasks carry their grammar point for the review: `g('do-does', complete(…))`. */
export const g = (point, task) => ({ ...task, g: point });

export const TASKS = new Set(['complete', 'choose', 'build', 'write', 'listen', 'dictate', 'fix', 'quiz']);
