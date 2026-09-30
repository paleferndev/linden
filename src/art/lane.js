// Linden Lane: the street. Each building is a unit and each window a lesson; `lit` says how many windows are on per unit,
// e.g. laneSVG({home: 3, kettle: 1}). Colours come from the tokens, so the same drawing is the noon street and the evening street.

let GID = 0; // gradient ids must be unique per SVG instance

const glowDef = id => `<defs><radialGradient id="${id}"><stop offset="0" style="stop-color:var(--lit);stop-opacity:.75"/><stop offset=".4" style="stop-color:var(--lit);stop-opacity:.28"/><stop offset="1" style="stop-color:var(--lit);stop-opacity:0"/></radialGradient></defs>`;

export function cat() {
  return `<g><path class="cattail" d="M62 40c10-2 16-8 14-20" stroke="var(--cat)" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="42" rx="23" ry="13" fill="var(--cat)"/>
  <path d="M34 31c2 5 2 17 0 22M44 30c2 5 2 18 0 24M54 32c2 5 2 14 0 20" stroke="var(--cat-dark)" stroke-width="2.4" fill="none" opacity=".7"/>
  <circle cx="20" cy="33" r="12" fill="var(--cat)"/><path d="M10 28 11 15l8 8zM21 22l9-8 1 13z" fill="var(--cat)"/>
  <path d="M13 33q2.5-2.5 5 0M22 33q2.5-2.5 5 0" stroke="var(--eye)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="37" r="1.3" fill="var(--eye)"/>
  <ellipse cx="30" cy="53" rx="6" ry="3" fill="var(--cat)"/><ellipse cx="52" cy="54" rx="6" ry="3" fill="var(--cat)"/></g>`;
}

export function laneSVG(lit = {}, o = {}) {
  const gid = 'lg' + (++GID);
  const on = (u, i) => i < (lit[u] || 0) ? ' on' : '';
  const W = (u, i, x, y, w, h) => `<rect class="win${on(u, i)}" data-u="${u}" data-i="${i}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
  const awning = (x, y, w, a, b, n) => { let g = ''; const sw = w / n; for (let k = 0; k < n; k++) { const c = k % 2 ? b : a; g += `<rect x="${(x + k * sw).toFixed(1)}" y="${y}" width="${(sw + .6).toFixed(1)}" height="16" fill="${c}"/><circle cx="${(x + k * sw + sw / 2).toFixed(1)}" cy="${y + 16}" r="${(sw / 2).toFixed(1)}" fill="${c}"/>`; } return g; };
  const cloud = (x, y, k, c) => `<g class="cloud ${c}"><g transform="translate(${x} ${y}) scale(${k})" fill="var(--cloud)"><ellipse cx="0" cy="10" rx="46" ry="14"/><circle cx="-16" cy="2" r="16"/><circle cx="10" cy="-4" r="20"/><circle cx="30" cy="6" r="12"/></g></g>`;
  const lamp = x => `<g><circle class="glow" cx="${x}" cy="250" r="52" fill="url(#${gid})"/><rect x="${x - 2}" y="246" width="4" height="84" fill="var(--b-navy)"/><path d="M${x - 9} 248h18l-3-11h-12z" fill="var(--b-navy)"/><circle class="bulb" cx="${x}" cy="250" r="4" fill="var(--lit)"/></g>`;
  const stars = [[60,40],[150,96],[236,28],[330,70],[420,40],[512,20],[640,64],[700,26],[760,110],[990,36],[1060,18],[1128,74],[1236,30],[1310,58],[1398,96],[1420,24]];
  let office = '', k = 0;
  for (const y of [110, 160, 210]) for (const x of [1190, 1247, 1304]) { office += k < 6 ? W('office', k, x, y, 36, 34) : `<rect class="win" x="${x}" y="${y}" width="36" height="34" rx="3"/>`; k++; }
  return `<svg viewBox="${o.vb || '0 0 1440 400'}" preserveAspectRatio="${o.par || 'xMidYMax slice'}" aria-hidden="true">${glowDef(gid)}
  <g class="stars">${stars.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1.5 : 2.3}" fill="var(--sun)"/>`).join('')}</g>
  <circle cx="905" cy="96" r="30" fill="var(--sun)"/>
  <g class="clouds">${cloud(170, 76, 1, 'c1')}${cloud(1090, 54, .9, 'c2')}${cloud(620, 44, .7, 'c3')}</g>
  <g fill="var(--tree-2)" opacity=".7"><circle cx="20" cy="296" r="46"/><circle cx="282" cy="300" r="34"/><circle cx="812" cy="292" r="44"/><circle cx="1162" cy="300" r="30"/><circle cx="1420" cy="296" r="44"/></g>
  <g class="bld" data-u="home">
    <rect x="226" y="80" width="18" height="44" fill="var(--roof)"/><path d="M58 136 170 66l112 70z" fill="var(--roof)"/>
    <rect x="70" y="130" width="200" height="200" fill="var(--b-blue)"/>
    <circle class="win${on('home', 0)}" data-u="home" data-i="0" cx="170" cy="108" r="12"/>
    ${W('home', 1, 92, 152, 34, 44)}${W('home', 2, 153, 152, 34, 44)}${W('home', 3, 214, 152, 34, 44)}${W('home', 4, 92, 222, 34, 44)}${W('home', 5, 214, 222, 34, 44)}
    <rect x="160" y="230" width="20" height="15" rx="2" fill="var(--card)"/><text x="170" y="241.5" text-anchor="middle" class="plate">1</text>
    <path d="M150 330v-58c0-11 9-20 20-20s20 9 20 20v58z" fill="var(--door)"/><circle cx="183" cy="292" r="2.2" fill="var(--sun)"/>
    <rect x="142" y="326" width="56" height="4" fill="var(--kerb)"/></g>
  <g class="bld" data-u="kettle">
    <rect x="290" y="170" width="230" height="160" fill="var(--b-ochre)"/><rect x="284" y="162" width="242" height="10" rx="2" fill="var(--roof)"/>
    ${[305, 348, 391, 434, 477].map((x, i) => W('kettle', i, x, 182, 30, 30)).join('')}
    <rect x="325" y="219" width="160" height="21" rx="3" fill="var(--sign)"/><text x="405" y="234" text-anchor="middle" class="sign-t">THE KETTLE</text>
    ${awning(298, 244, 214, 'var(--awning-a)', 'var(--awning-b)', 8)}
    <rect x="306" y="272" width="140" height="58" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/>
    <path d="M322 316h14l-2 12h-10zM344 314h12l-2 14h-8z" fill="var(--china)" opacity=".85"/>
    <rect x="462" y="268" width="42" height="62" fill="var(--door)"/><rect x="468" y="276" width="30" height="24" rx="2" fill="var(--window)"/></g>
  <g><rect x="540" y="236" width="12" height="94" fill="var(--trunk)"/>
    <circle cx="518" cy="238" r="30" fill="var(--tree)"/><circle cx="576" cy="236" r="32" fill="var(--tree)"/><circle cx="546" cy="212" r="42" fill="var(--tree)"/><circle cx="548" cy="176" r="28" fill="var(--tree)"/>
    ${[[530, 196], [560, 222], [536, 236], [566, 186], [512, 222], [548, 168]].map(([x, y]) => `<path d="M${x} ${y + 5}c-3-3-7-1-7 2 0 3 7 7 7 7s7-4 7-7c0-3-4-5-7-2z" fill="var(--tree-2)"/>`).join('')}</g>
  <g class="bld" data-u="shop">
    <rect x="600" y="150" width="200" height="180" fill="var(--b-sage)"/><rect x="594" y="142" width="212" height="10" rx="2" fill="var(--roof)"/>
    ${[614, 651, 688, 725, 762].map((x, i) => W('shop', i, x, 164, 28, 36)).join('')}
    <rect x="620" y="211" width="160" height="21" rx="3" fill="var(--door-2)"/><text x="700" y="226" text-anchor="middle" class="sign-t">PRIYA'S</text>
    ${awning(606, 238, 188, 'var(--awning-c)', 'var(--awning-b)', 7)}
    <rect x="612" y="266" width="118" height="64" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/>
    <rect x="614" y="312" width="52" height="18" fill="var(--wood)"/>
    ${[622, 633, 644, 655].map((x, i) => `<circle cx="${x}" cy="${310 - (i % 2)}" r="5.5" fill="${i % 2 ? 'var(--sun)' : 'var(--postbox)'}"/>`).join('')}
    <rect x="744" y="262" width="40" height="68" fill="var(--door-2)"/><rect x="750" y="270" width="28" height="24" rx="2" fill="var(--window)"/></g>
  <g class="bld" data-u="bus">
    <rect x="842" y="200" width="5" height="130" fill="var(--b-navy)"/>
    <rect x="826" y="176" width="38" height="26" rx="4" fill="var(--postbox)"/><text x="845" y="193.5" text-anchor="middle" class="bus-t">BUS</text>
    <rect x="866" y="252" width="66" height="60" fill="var(--window)" opacity=".75"/>
    <rect x="862" y="246" width="74" height="6" rx="2" fill="var(--b-navy)"/><rect x="864" y="246" width="3" height="84" fill="var(--b-navy)"/><rect x="931" y="246" width="3" height="84" fill="var(--b-navy)"/>
    <rect x="872" y="304" width="46" height="6" rx="2" fill="var(--wood)"/>
    <rect x="902" y="258" width="24" height="44" rx="2" fill="var(--card)"/>
    ${[0, 1, 2, 3, 4].map(i => `<circle class="win dot${on('bus', i)}" data-u="bus" data-i="${i}" cx="914" cy="${266 + i * 8}" r="2.8"/>`).join('')}</g>
  <g class="bld" data-u="no9">
    <path d="M940 118 1050 58l110 60z" fill="var(--roof)"/><rect x="950" y="112" width="200" height="218" fill="var(--b-rose)"/>
    ${W('no9', 0, 972, 132, 34, 44)}${W('no9', 1, 1033, 132, 34, 44)}${W('no9', 2, 1094, 132, 34, 44)}
    ${[968, 1029, 1090].map(x => `<rect x="${x}" y="176" width="42" height="7" rx="2" fill="var(--tree)"/>` + [8, 17, 26, 35].map((d, j) => `<circle cx="${x + d}" cy="174" r="2.8" fill="${j % 2 ? 'var(--sun)' : 'var(--postbox)'}"/>`).join('')).join('')}
    ${W('no9', 3, 972, 196, 34, 40)}${W('no9', 4, 1094, 196, 34, 40)}
    <circle cx="1050" cy="214" r="12" fill="var(--card)"/><text x="1050" y="218.5" text-anchor="middle" class="plate">9</text>
    <path d="M962 258l10-10h78l10 10z" fill="var(--roof)"/>
    <rect x="968" y="258" width="86" height="62" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/><path d="M997 258v62M1025 258v62" stroke="var(--win-frame)" stroke-width="2"/>
    <path d="M1086 330v-60c0-11 9-19 21-19s21 8 21 19v60z" fill="var(--door-2)"/><circle cx="1119" cy="292" r="2.2" fill="var(--sun)"/></g>
  <g class="bld" data-u="office">
    <rect x="1170" y="90" width="190" height="240" fill="var(--b-cream)"/><rect x="1164" y="84" width="202" height="10" rx="2" fill="var(--roof)"/>
    ${office}
    <rect x="1230" y="254" width="70" height="8" fill="var(--b-navy)"/>
    <rect x="1238" y="262" width="54" height="68" fill="var(--window)" stroke="var(--win-frame)" stroke-width="3"/><path d="M1265 262v68" stroke="var(--win-frame)" stroke-width="2"/></g>
  ${[280, 592, 812, 942, 1160].map(lamp).join('')}
  <rect x="0" y="330" width="1440" height="22" fill="var(--pave)"/><rect x="0" y="350" width="1440" height="4" fill="var(--kerb)"/><rect x="0" y="354" width="1440" height="46" fill="var(--road)"/>
  <g fill="var(--dash)">${Array.from({ length: 18 }, (_, i) => `<rect x="${20 + i * 80}" y="375" width="40" height="4" rx="2"/>`).join('')}</g>
  <g transform="translate(316 304) scale(.56)">${cat()}</g>
  </svg>`;
}
