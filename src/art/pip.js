// Pip, the small survey robot that lands at No. 1, and the ship it rebuilds over the season.
// Pip looks enough like a teapot that Tom mistakes it for one: cream body, brass trim, a screen for a face and an
// antenna with a light on top. Drawn in a 120 × 120 box. Moods: happy, calm, surprised, thinking, glitch, sleep.

const EYES = {
  calm: `<ellipse cx="50" cy="55" rx="3.6" ry="4.6" fill="var(--signal)"/><ellipse cx="70" cy="55" rx="3.6" ry="4.6" fill="var(--signal)"/>`,
  happy: `<path d="M45 57q5-7 10 0M65 57q5-7 10 0" stroke="var(--signal)" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  surprised: `<circle cx="50" cy="55" r="5.4" fill="none" stroke="var(--signal)" stroke-width="2.6"/><circle cx="70" cy="55" r="5.4" fill="none" stroke="var(--signal)" stroke-width="2.6"/>`,
  thinking: `<path d="M45 56h10" stroke="var(--signal)" stroke-width="3.2" stroke-linecap="round"/><ellipse cx="70" cy="54" rx="3.6" ry="4.6" fill="var(--signal)"/><circle cx="83" cy="42" r="1.6" fill="var(--signal)"/><circle cx="88" cy="37" r="2.2" fill="var(--signal)"/>`,
  glitch: `<path d="M44 52l4 5 4-5 4 5M64 52l4 5 4-5 4 5" stroke="var(--signal)" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="41" y="60" width="14" height="2.5" fill="var(--postbox)" opacity=".8"/><rect x="62" y="47" width="12" height="2.5" fill="var(--signal)" opacity=".7"/>`,
  sleep: `<path d="M45 56q5 4 10 0M65 56q5 4 10 0" stroke="var(--signal)" stroke-width="3" fill="none" stroke-linecap="round"/>`,
};

export function pip(mood = 'calm', { glow = true } = {}) {
  return `<g class="pip pip-${mood}">
    <ellipse cx="60" cy="112" rx="30" ry="4.5" fill="var(--ink)" opacity=".12"/>
    <rect x="40" y="96" width="12" height="14" rx="4" fill="var(--b-navy)"/><rect x="68" y="96" width="12" height="14" rx="4" fill="var(--b-navy)"/>
    <path d="M28 58c-16 2-16 26 0 28" stroke="var(--brass)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M92 62c12-3 17-12 19-19l5 3c-3 12-11 22-24 26z" fill="var(--pip-body)" stroke="var(--brass)" stroke-width="2"/>
    <path d="M24 66c0-26 16-38 36-38s36 12 36 38-15 36-36 36-36-10-36-36z" fill="var(--pip-body)" stroke="var(--brass)" stroke-width="2.2"/>
    <path d="M27 80q33 12 66 0" stroke="var(--brass)" stroke-width="3" fill="none"/>
    <ellipse cx="60" cy="30" rx="20" ry="5.5" fill="var(--brass)"/>
    <path d="M60 25V11" stroke="var(--b-navy)" stroke-width="2.4" stroke-linecap="round"/>
    ${glow ? `<circle class="pip-light" cx="60" cy="9" r="9" fill="var(--signal)" opacity=".28"/>` : ''}
    <circle cx="60" cy="9" r="4.5" fill="var(--signal)"/>
    <rect x="37" y="40" width="46" height="30" rx="13" fill="var(--screen)"/>
    <rect x="41" y="43" width="16" height="4" rx="2" fill="#fff" opacity=".12"/>
    ${EYES[mood] || EYES.calm}
  </g>`;
}

export const pipSVG = (mood, cls = '') => `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true">${pip(mood)}</svg>`;

/** Pip's ship, one piece per episode: `n` of 12 parts in place, the rest drawn as dashed outlines. 160 × 200. */
export const SHIP_PARTS = ['antena', 'lumina', 'hubloul', 'panoul stâng', 'panoul drept', 'motorul', 'aripioara stângă', 'aripioara dreaptă', 'ușa', 'scara', 'bateria', 'semnalul'];
export function ship(n = 0) {
  const part = (k, svg) => k < n ? svg.replace(/data-p/g, 'class="on"') : svg.replace(/data-p/g, 'class="off"');
  return `<g class="ship">
    ${part(9, `<path data-p d="M58 176l-8 16M102 176l8 16" stroke-width="4" stroke-linecap="round"/>`)}
    ${part(6, `<path data-p d="M46 140c-18 10-24 30-22 44l24-12z"/>`)}
    ${part(7, `<path data-p d="M114 140c18 10 24 30 22 44l-24-12z"/>`)}
    ${part(5, `<path data-p d="M60 170h40l-6 14H66z"/>`)}
    ${part(3, `<path data-p d="M80 40c-26 0-38 38-38 74 0 26 14 56 38 56z"/>`)}
    ${part(4, `<path data-p d="M80 40c26 0 38 38 38 74 0 26-14 56-38 56z"/>`)}
    ${part(8, `<rect data-p x="70" y="126" width="20" height="34" rx="8"/>`)}
    ${part(2, `<circle data-p cx="80" cy="92" r="14"/>`)}
    ${part(10, `<rect data-p x="72" y="112" width="16" height="8" rx="2"/>`)}
    ${part(0, `<path data-p d="M80 40V16" stroke-width="3" stroke-linecap="round"/>`)}
    ${part(1, `<circle data-p cx="80" cy="12" r="6"/>`)}
    ${part(11, `<path data-p d="M62 8q18-14 36 0M68 2q12-9 24 0" stroke-width="2.5" fill="none" stroke-linecap="round"/>`)}
  </g>`;
}
