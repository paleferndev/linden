import e01 from './episodes/e01.js';
import e02 from './episodes/e02.js';
import e03 from './episodes/e03.js';
import e04 from './episodes/e04.js';
import e05 from './episodes/e05.js';
import e06 from './episodes/e06.js';
import e07 from './episodes/e07.js';
import e08 from './episodes/e08.js';
import e09 from './episodes/e09.js';
import e10 from './episodes/e10.js';
import e11 from './episodes/e11.js';
import e12 from './episodes/e12.js';

// Season one, in order. Episodes open one after another; finished ones can be played again.
export const EPISODES = [e01, e02, e03, e04, e05, e06, e07, e08, e09, e10, e11, e12];
export const EP = Object.fromEntries(EPISODES.map(e => [e.n, e]));

// The window each finished episode lights on the street: [building, window].
export const LIT = { 1: ['home', 1], 2: ['kettle', 0], 3: ['home', 2], 4: ['bus', 0], 5: ['shop', 1], 6: ['no9', 0], 7: ['no9', 2],
  8: ['kettle', 2], 9: ['home', 3], 10: ['office', 1], 11: ['kettle', 4], 12: ['office', 4] };
