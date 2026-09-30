import { GAMES, EP_GAME } from './games.js';

// Every kind of reply and every game, as listed in Profil → Exerciții.
export const KINDS = [
  { name: 'În chat', items: [
    ['complete', 'Completează mesajul', 'Răspunsul are un gol. Opțiunile diferă doar prin forma care contează.'],
    ['choose', 'Alege răspunsul', 'Trei răspunsuri, unul corect. Celelalte sunt greșeli pe care românii chiar le fac.'],
    ['build', 'Construiește mesajul', 'Din cuvinte, cu câteva în plus care seamănă.'],
    ['write', 'Scrie cuvântul', 'Scrii forma potrivită în gol.'],
    ['listen', 'Mesaj vocal', 'Asculți și alegi ce a vrut să spună.'],
    ['dictate', 'Scrie ce auzi', 'Asculți un mesaj vocal și îl scrii.'],
    ['fix', 'Corectează-l pe Străin', 'Găsești cuvântul greșit din mesaj și îl repari.'],
    ['quiz', 'Quiz rapid', 'Trei întrebări, contra timp.'],
  ] },
  { name: 'Jocuri', items: [
    ...Object.entries(EP_GAME).map(([n, k]) => [k, GAMES[k].title, `${GAMES[k].teaches} · episodul ${n}`]),
    ['signal', 'Semnalul', 'Scrii transmisia de la radio. Cuvintele se decodează pe măsură ce le prinzi.'],
  ] },
];
