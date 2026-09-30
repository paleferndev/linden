import { GAMES } from '../../content/games.js';
import { thisthat, photos, machine, timeline, plan, signs, lights } from './boards.js';
import { guesswho, order, shelves, room, compare } from './special.js';

const PLAY = { thisthat, guesswho, photos, order, shelves, room, machine, timeline, plan, signs, compare, lights };

/**
 * Plays a game into `host`; resolves with { right, total }.
 * ctx: { record(g, ok), recordVerb?(base, ok), rounds? (a custom set of rounds, for training), items? }
 */
export function playGame(kind, host, ctx) {
  const G = GAMES[kind];
  return PLAY[kind](host, G, { record: () => {}, ...ctx });
}
export const GAME_KINDS = Object.keys(PLAY);
