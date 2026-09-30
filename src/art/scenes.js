import { person, CAST, cat, radio } from './people.js';
import { glowDef, nextId } from './lane.js';

// The places inside: The Kettle café, the living room at No. 1 and Priya's corner shop. Every scene is 360 × 250.
// Objects are the things you can tap: `box` is the hit area and the crop for the object's icon, `at` is where its name
// tag points (top centre), `svg` is the drawing. A scene can have more than one set of objects on the same background.

const steam = (xs, y) => `<g class="steam">${xs.map(x => `<path d="M${x} ${y}c-4-5 4-8 0-13" stroke="var(--china-line)" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
const coins = (x, y) => `${[0, 1, 2].map(k => `<ellipse cx="${x}" cy="${y - k * 4}" rx="11" ry="4" fill="var(--sun)" stroke="var(--pastry-dark)" stroke-width="1.2"/>`).join('')}<ellipse cx="${x}" cy="${y - 8}" rx="6" ry="2" fill="none" stroke="var(--pastry-dark)" stroke-width="1"/><ellipse cx="${x + 18}" cy="${y + 1}" rx="8" ry="3.2" fill="var(--china-line)" stroke="var(--faint)" stroke-width="1"/>`;
const receipt = (x, y) => `<path d="M${x} ${y}l3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5v44c0 4-2 6-6 6h-18z" fill="var(--china)" stroke="var(--china-line)"/><path d="M${x + 4} ${y + 9}h14M${x + 4} ${y + 15}h9M${x + 4} ${y + 21}h14M${x + 4} ${y + 27}h7" stroke="var(--china-line)" stroke-width="1.6"/><path d="M${x + 4} ${y + 36}h16" stroke="var(--ink)" stroke-width="2" opacity=".7"/>`;
const chalkboard = `<rect x="236" y="54" width="110" height="68" rx="4" fill="var(--chalk-bg)" stroke="var(--wood)" stroke-width="4"/>
  <text x="291" y="69" text-anchor="middle" class="chalk-h">MENU</text>
  <text x="246" y="85" class="chalk">tea</text><text x="336" y="85" text-anchor="end" class="chalk">£2.40</text>
  <text x="246" y="99" class="chalk">coffee</text><text x="336" y="99" text-anchor="end" class="chalk">£2.80</text>
  <text x="246" y="113" class="chalk">croissant</text><text x="336" y="113" text-anchor="end" class="chalk">£1.90</text>`;

/* ---------------------------------------------------------------- The Kettle */
function cafeBg(gid, set) {
  return `<rect width="360" height="250" fill="var(--cafe-wall)"/>
  <rect x="16" y="18" width="92" height="84" rx="4" fill="var(--sky)"/>
  <g class="stars"><circle cx="30" cy="30" r="1.3" fill="var(--sun)"/><circle cx="52" cy="46" r="1" fill="var(--sun)"/><circle cx="70" cy="28" r="1.4" fill="var(--sun)"/></g>
  <circle cx="88" cy="36" r="9" fill="var(--sun)"/>
  <path d="M20 72l17-12 17 12z" fill="var(--roof)"/><rect x="22" y="72" width="30" height="30" fill="var(--b-rose)"/><rect x="58" y="60" width="28" height="42" fill="var(--b-blue)"/>
  <rect x="28" y="80" width="7" height="9" fill="var(--lit)" class="stars"/><rect x="66" y="68" width="7" height="9" fill="var(--lit)" class="stars"/>
  <rect x="16" y="18" width="92" height="84" rx="4" fill="none" stroke="var(--cafe-trim)" stroke-width="5"/><path d="M62 18v84M16 60h92" stroke="var(--cafe-trim)" stroke-width="4"/>
  <line x1="176" y1="0" x2="176" y2="27" stroke="var(--b-navy)" stroke-width="2"/>
  <circle class="glow" cx="176" cy="46" r="80" fill="url(#${gid})"/>
  <path d="M163 41h26l-6-14h-14z" fill="var(--b-navy)"/><circle class="bulb" cx="176" cy="43" r="4.5" fill="var(--lit)"/>
  <rect x="232" y="42" width="116" height="5" rx="2" fill="var(--wood)"/>
  ${[240, 266, 292, 318].map((x, i) => `<path d="M${x} 29h15q0 13-7.5 13T${x} 29z" fill="${['var(--pot)', 'var(--postbox)', 'var(--china)', 'var(--b-ochre)'][i]}"/>`).join('')}
  ${set === 'pay' ? '' : chalkboard}
  <g transform="translate(116 44)">${person(CAST.tom)}</g>
  <rect x="0" y="164" width="360" height="86" fill="var(--wood)"/><rect x="0" y="160" width="360" height="9" fill="var(--wood-top)"/>
  <path d="M60 169v81M140 169v81M220 169v81M300 169v81" stroke="var(--wood-line)" stroke-width="2"/>
  ${set === 'pay' ? `<g opacity=".95"><path d="M236 126h22l-3 36h-16z" fill="var(--kraft)"/><rect x="233" y="121" width="28" height="7" rx="3" fill="var(--china)" stroke="var(--china-line)"/></g>` : ''}`;
}

const CAFE = {
  teapot: { box: [6, 116, 82, 50], at: [45, 120], svg: `<ellipse cx="45" cy="145" rx="22" ry="17" fill="var(--pot)"/><path d="M63 141c8-2 14-7 16-15l4 1c-2 11-8 20-19 25z" fill="var(--pot)"/><path d="M25 136c-15 3-11 20 1 18" stroke="var(--pot-dark)" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="129" rx="11" ry="4" fill="var(--pot-dark)"/><circle cx="45" cy="124" r="3.5" fill="var(--pot-dark)"/><rect x="31" y="159" width="28" height="4" rx="2" fill="var(--pot-dark)"/><path d="M33 146q12 6 24 0" stroke="var(--china)" stroke-width="2" fill="none" opacity=".6"/>` },
  tea: { box: [82, 104, 52, 62], at: [107, 112], svg: `${steam([101, 112], 133)}<ellipse cx="107" cy="161" rx="22" ry="3.5" fill="var(--china)" stroke="var(--china-line)"/><path d="M122.5 143c8.5 0 8 10-1.5 10" stroke="var(--china-line)" stroke-width="2.6" fill="none"/><path d="M91 139h32c-1 13-7 20-16 20s-15-7-16-20z" fill="var(--china)" stroke="var(--china-line)"/><ellipse cx="107" cy="139.5" rx="16" ry="2.8" fill="var(--tea-brown)"/>` },
  croissant: { box: [126, 136, 52, 30], at: [152, 140], svg: `<ellipse cx="152" cy="161" rx="24" ry="3.5" fill="var(--china)" stroke="var(--china-line)"/><path d="M131 158c6-15 13-16 21-16s15 1 21 16c-5-3-9-3-12-2-4-5-13-5-18 0-3-1-7-1-12 2z" fill="var(--pastry)"/><path d="M142 147l3 8M152 143v10M162 147l-3 8" stroke="var(--pastry-dark)" stroke-width="1.6" stroke-linecap="round"/>` },
  sugar: { box: [186, 134, 52, 32], at: [208, 138], svg: `<path d="M190 147h30c-1 10-6 15-15 15s-14-5-15-15z" fill="var(--china)" stroke="var(--china-line)"/><ellipse cx="205" cy="147" rx="15.5" ry="3.5" fill="var(--china)" stroke="var(--china-line)"/><circle cx="205" cy="142.5" r="3" fill="var(--china)" stroke="var(--china-line)"/><rect x="223" y="154" width="8" height="8" rx="1.2" fill="var(--china)" stroke="var(--china-line)"/><rect x="226" y="146" width="7" height="7" rx="1.2" fill="var(--china)" stroke="var(--china-line)" transform="rotate(12 229.5 149.5)"/>` },
  coffee: { box: [230, 112, 40, 54], at: [250, 114], svg: `<path d="M239 122h22l-4 40h-14z" fill="var(--kraft)"/><path d="M240.2 134h19.6l-1.4 16h-16.8z" fill="var(--leaf)"/><circle cx="250" cy="142" r="2.6" fill="var(--china)"/><rect x="236" y="116" width="28" height="8" rx="3" fill="var(--china)" stroke="var(--china-line)"/>` },
  milk: { box: [276, 120, 46, 46], at: [300, 124], svg: `<path d="M283 139c-9 3-6 15 1 15" stroke="var(--china-line)" stroke-width="3" fill="none"/><path d="M289 132h20l5-7 3 3-5 9c5 11 3 21-2 25h-20c-5-5-6-16-1-30z" fill="var(--china)" stroke="var(--china-line)"/><path d="M290 139h19" stroke="var(--china-line)" opacity=".7"/>` },
};

const CAFE_PAY = {
  menu: { box: [232, 50, 118, 76], at: [291, 54], svg: chalkboard },
  card: { box: [16, 100, 54, 66], at: [42, 104], svg: `<rect x="31" y="100" width="22" height="16" rx="2" fill="var(--pen)"/><rect x="31" y="103.5" width="22" height="3" fill="var(--sun)"/><rect x="24" y="110" width="36" height="54" rx="7" fill="var(--b-navy)"/><rect x="29" y="116" width="26" height="15" rx="2.5" fill="var(--sky)"/><path d="M34 123.5h10" stroke="var(--pen)" stroke-width="2" stroke-linecap="round"/><g fill="var(--china-line)">${[139, 147, 155].map(y => [33, 42, 51].map(x => `<circle cx="${x}" cy="${y}" r="2.3"/>`).join('')).join('')}</g>` },
  cash: { box: [72, 126, 64, 40], at: [104, 130], svg: `<g transform="rotate(-8 103 148)"><rect x="76" y="136" width="54" height="24" rx="3" fill="var(--leaf-soft)" stroke="var(--leaf)" stroke-width="1.5"/><circle cx="103" cy="148" r="7" fill="none" stroke="var(--leaf)" stroke-width="1.5"/><text x="103" y="152" text-anchor="middle" class="note-t" style="fill:var(--leaf)">£</text></g><g transform="rotate(5 106 155)"><rect x="80" y="145" width="54" height="21" rx="3" fill="var(--plum-soft)" stroke="var(--plum)" stroke-width="1.5"/><circle cx="107" cy="155.5" r="6.5" fill="none" stroke="var(--plum)" stroke-width="1.5"/><text x="107" y="159.3" text-anchor="middle" class="note-t" style="fill:var(--plum)">£</text></g>` },
  change: { box: [138, 138, 50, 28], at: [158, 142], svg: coins(152, 161) },
  receipt: { box: [186, 104, 36, 62], at: [202, 108], svg: receipt(190, 112) },
  bill: { box: [278, 122, 64, 44], at: [310, 126], svg: `<ellipse cx="310" cy="161" rx="30" ry="5" fill="var(--china)" stroke="var(--china-line)"/><path d="M292 158 299 131 325 134 320 158z" fill="var(--china)" stroke="var(--china-line)"/><path d="M299 131 306 158" stroke="var(--china-line)"/><path d="M309 141h10M308.5 146h8M308 151h10" stroke="var(--china-line)" stroke-width="1.5"/><text x="301" y="150" class="note-t" style="fill:var(--ink);font-size:9px">£</text>` },
};

/* ---------------------------------------------------------------- No. 1, the living room */
function roomBg(gid) {
  return `<rect width="360" height="250" fill="var(--room-wall)"/><rect y="132" width="360" height="52" fill="var(--room-wall-2)"/>
  <rect x="24" y="16" width="100" height="96" rx="3" fill="var(--sky)"/>
  <g class="stars"><circle cx="40" cy="26" r="1.2" fill="var(--sun)"/><circle cx="66" cy="34" r="1" fill="var(--sun)"/><circle cx="104" cy="24" r="1.3" fill="var(--sun)"/></g>
  <circle cx="98" cy="34" r="8" fill="var(--sun)"/>
  <path d="M28 70l14-10 14 10zM88 66h28v10H88z" fill="var(--roof)"/><rect x="30" y="70" width="24" height="18" fill="var(--b-sage)"/><rect x="90" y="76" width="24" height="12" fill="var(--b-ochre)"/>
  <rect x="36" y="74" width="5" height="6" fill="var(--lit)" class="stars"/><rect x="96" y="79" width="5" height="5" fill="var(--lit)" class="stars"/>
  <rect x="24" y="88" width="100" height="8" fill="var(--pave)"/><rect x="24" y="96" width="100" height="16" fill="var(--road)"/>
  <rect x="24" y="16" width="100" height="96" rx="3" fill="none" stroke="var(--win-frame)" stroke-width="5"/><path d="M24 44h100" stroke="var(--win-frame)" stroke-width="4"/>
  <rect x="18" y="112" width="112" height="6" rx="2" fill="var(--win-frame)"/>
  <path d="M8 10h140" stroke="var(--wood-line)" stroke-width="3" stroke-linecap="round"/>
  <path d="M10 11h16c-2 36 2 70 4 106H12c-3-36-4-70-2-106zM122 11h16c2 36 1 70-2 106h-18c2-36 6-70 4-106z" fill="var(--rug-2)"/>
  <path d="M16 20c1 30 1 62 4 92M130 20c-1 30-2 62-5 92" stroke="var(--rug)" stroke-width="2" opacity=".5" fill="none"/>
  <line x1="196" y1="0" x2="196" y2="20" stroke="var(--b-navy)" stroke-width="2"/>
  <circle class="glow" cx="196" cy="34" r="74" fill="url(#${gid})"/>
  <path d="M183 31h26l-6-12h-14z" fill="var(--b-navy)"/><circle class="bulb" cx="196" cy="33" r="4" fill="var(--lit)"/>
  <rect x="170" y="52" width="52" height="52" rx="2" fill="var(--card)" stroke="var(--wood)" stroke-width="4"/>
  <g transform="translate(180 60) scale(.5)" opacity=".9"><path d="M32 55C18 46 6 36 8 22 10 12 20 8 28 13c1.8 1.2 3.3 3 4 5 1-4 6-9 13-9 10 1 15 11 11 23-4 12-14 18-24 23z" fill="var(--leaf)"/><path d="M32 55c-1 3-3 5-6 6.5" stroke="var(--leaf)" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <rect x="236" y="76" width="112" height="6" rx="2" fill="var(--wood)"/><path d="M248 82v8M336 82v8" stroke="var(--wood-line)" stroke-width="3"/>
  <rect x="240" y="50" width="7" height="26" rx="1" fill="var(--leaf)"/><rect x="248" y="54" width="6" height="22" rx="1" fill="var(--pen)"/><rect x="255" y="47" width="8" height="29" rx="1" fill="var(--postbox)"/>
  <g class="waves" fill="none" stroke="var(--pen)" stroke-width="2.4" stroke-linecap="round"><path d="M338 42q6 8 0 16"/><path d="M344 36q10 14 0 28"/></g>
  <rect x="0" y="184" width="360" height="66" fill="var(--floor)"/><rect x="0" y="180" width="360" height="5" fill="var(--wood-line)" opacity=".6"/>
  <path d="M0 204h360M0 226h360" stroke="var(--floor-line)" stroke-width="1.5"/><path d="M70 184v20M190 204v22M300 184v20M120 226v24M250 226v24" stroke="var(--floor-line)" stroke-width="1.5"/>
  <ellipse cx="200" cy="228" rx="128" ry="16" fill="var(--rug)"/><ellipse cx="200" cy="228" rx="112" ry="11" fill="none" stroke="var(--rug-2)" stroke-width="2" stroke-dasharray="6 5"/>
  <rect x="14" y="122" width="126" height="44" rx="12" fill="var(--sofa)"/>
  <g transform="rotate(-8 42 140)"><rect x="27" y="128" width="30" height="24" rx="8" fill="var(--rug-2)"/></g>
  <rect x="8" y="150" width="138" height="34" rx="10" fill="var(--sofa-dark)"/>
  <rect x="22" y="146" width="54" height="16" rx="7" fill="var(--sofa)"/><rect x="80" y="146" width="54" height="16" rx="7" fill="var(--sofa)"/>
  <rect x="3" y="138" width="19" height="46" rx="8" fill="var(--sofa-dark)"/><rect x="132" y="138" width="19" height="46" rx="8" fill="var(--sofa-dark)"/>
  <path d="M16 184v8M138 184v8" stroke="var(--wood-line)" stroke-width="4" stroke-linecap="round"/>
  <rect x="152" y="166" width="180" height="7" rx="2" fill="var(--wood-top)"/><rect x="152" y="173" width="180" height="4" fill="var(--wood)"/>
  <rect x="162" y="177" width="7" height="32" fill="var(--wood)"/><rect x="315" y="177" width="7" height="32" fill="var(--wood)"/>
  <g transform="translate(38 196) scale(.62)">${cat()}</g>`;
}

const ROOM = {
  taxi: { box: [30, 58, 88, 46], at: [74, 62], svg: `<rect x="66" y="64" width="16" height="7" rx="2" fill="var(--sun)" stroke="var(--pastry-dark)" stroke-width="1"/><path d="M50 84l8-12h32l8 12z" fill="var(--sun)"/><path d="M58 83l5-8h9v8zM76 83v-8h11l5 8z" fill="var(--window)"/><rect x="36" y="82" width="76" height="15" rx="6" fill="var(--sun)"/><path d="M36 90h76" stroke="var(--pastry-dark)" stroke-width="1.2" opacity=".6"/><rect x="103" y="86" width="7" height="4" rx="1.5" fill="var(--china)"/><circle cx="52" cy="98" r="6" fill="var(--b-navy)"/><circle cx="96" cy="98" r="6" fill="var(--b-navy)"/><circle cx="52" cy="98" r="2.2" fill="var(--china-line)"/><circle cx="96" cy="98" r="2.2" fill="var(--china-line)"/>` },
  music: { box: [258, 20, 80, 58], at: [297, 22], svg: `<g transform="translate(262 24)">${radio()}</g>` },
  internet: { box: [156, 124, 68, 46], at: [191, 128], svg: `<path d="M168 130h46a3 3 0 0 1 3 3v29h-52v-29a3 3 0 0 1 3-3z" fill="var(--laptop)"/><rect x="170" y="134" width="42" height="25" rx="1.5" fill="var(--sky)"/><path d="M182.5 147.5a12 12 0 0 1 17 0M186.5 151.5a6 6 0 0 1 9 0" stroke="var(--pen)" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="191" cy="155" r="1.9" fill="var(--pen)"/><path d="M158 161h66l-4 5h-58z" fill="var(--china-line)"/>` },
  coffee: { box: [226, 126, 34, 42], at: [242, 130], svg: `${steam([237, 246], 140)}<path d="M231 145h20v15a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" fill="var(--pen)"/><path d="M251 149h2.5a4.5 4.5 0 0 1 0 9H251" stroke="var(--pen)" stroke-width="3" fill="none"/><ellipse cx="241" cy="145" rx="10" ry="2.6" fill="var(--tea-brown)"/>` },
  pizza: { box: [262, 124, 64, 44], at: [294, 128], svg: `<path d="M268 150l6-22h40l6 22z" fill="var(--kraft)"/><path d="M276 132h36" stroke="var(--pastry-dark)" stroke-width="1.2" opacity=".5"/><rect x="264" y="150" width="60" height="16" rx="2" fill="var(--kraft)"/><path d="M264 156h60" stroke="var(--pastry-dark)" stroke-width="1" opacity=".4"/><ellipse cx="294" cy="152" rx="26" ry="7.5" fill="var(--pastry)"/><ellipse cx="294" cy="152" rx="22" ry="5.8" fill="var(--postbox)" opacity=".85"/><g fill="var(--sun)"><ellipse cx="284" cy="151" rx="4" ry="1.6"/><ellipse cx="299" cy="154" rx="4" ry="1.5"/><ellipse cx="303" cy="149.5" rx="3" ry="1.3"/></g><g fill="var(--wood-line)"><circle cx="291" cy="149.5" r="1.8"/><circle cx="306" cy="153" r="1.6"/><circle cx="280" cy="154" r="1.5"/></g><path d="M294 152l-22 0M294 152l14 5" stroke="var(--pastry-dark)" stroke-width=".9" opacity=".6"/>` },
  football: { box: [314, 204, 40, 40], at: [333, 206], svg: `<circle cx="333" cy="226" r="16" fill="var(--china)" stroke="var(--eye)" stroke-width="1.6"/><path d="M333 220l5.7 4.1-2.2 6.7h-7l-2.2-6.7z" fill="var(--eye)"/><path d="M333 220v-6M338.7 224.1l6-2.3M336.5 230.8l3.6 5.3M329.5 230.8l-3.6 5.3M327.3 224.1l-6-2.3" stroke="var(--eye)" stroke-width="1.4"/><path d="M319 219l2.5 2M346 219l-2.5 2" stroke="var(--eye)" stroke-width="1.4"/>` },
};

/* ---------------------------------------------------------------- Priya's */
function bread(x, y) {
  return `<ellipse cx="${x + 20}" cy="${y + 18}" rx="19" ry="10.5" fill="var(--pastry)"/><path d="M${x + 9} ${y + 14}l4 6M${x + 17} ${y + 11}l4 7M${x + 25} ${y + 12}l4 6" stroke="var(--pastry-dark)" stroke-width="1.8" stroke-linecap="round"/>
    <g transform="rotate(-12 ${x + 58} ${y + 16})"><rect x="${x + 40}" y="${y + 10}" width="38" height="13" rx="6.5" fill="var(--pastry)"/><path d="M${x + 48} ${y + 12}l3 8M${x + 57} ${y + 12}l3 8M${x + 66} ${y + 12}l3 8" stroke="var(--pastry-dark)" stroke-width="1.6" stroke-linecap="round"/></g>`;
}
function shopBg(gid, set) {
  const jar = (x, c) => `<rect x="${x}" y="30" width="15" height="20" rx="3" fill="${c}"/><rect x="${x - 1}" y="27" width="17" height="5" rx="1.5" fill="var(--wood-line)"/>`;
  const tin = (x, y, c) => `<rect x="${x}" y="${y}" width="12" height="16" rx="1.5" fill="${c}"/><rect x="${x}" y="${y + 5}" width="12" height="5" fill="var(--china)" opacity=".7"/>`;
  return `<rect width="360" height="250" fill="var(--shop-wall)"/>
  <path d="M0 0h360v10H0z" fill="var(--awning-c)"/>
  <rect x="8" y="20" width="130" height="138" fill="var(--wood-line)" opacity=".18"/>
  ${[50, 92, 132].map(y => `<rect x="6" y="${y}" width="134" height="5" rx="1.5" fill="var(--wood)"/>`).join('')}
  ${jar(14, 'var(--postbox)')}${jar(33, 'var(--sun)')}${jar(52, 'var(--leaf)')}${jar(71, 'var(--pen)')}${jar(90, 'var(--b-rose)')}${jar(109, 'var(--sun)')}
  ${set === 'bag' ? `<g transform="translate(14 60)">${bread(0, 0)}</g>` : ''}
  <rect x="96" y="60" width="17" height="32" rx="1.5" fill="var(--pen-soft)" stroke="var(--pen)" stroke-width="1"/><rect x="115" y="64" width="17" height="28" rx="1.5" fill="var(--marker-soft)" stroke="var(--pastry-dark)" stroke-width="1"/>
  ${[14, 28, 42, 56, 70, 84, 98, 112].map((x, i) => tin(x, 116, ['var(--postbox)', 'var(--leaf)', 'var(--pen)', 'var(--sun)'][i % 4])).join('')}
  <line x1="214" y1="0" x2="214" y2="16" stroke="var(--b-navy)" stroke-width="2"/>
  <circle class="glow" cx="214" cy="30" r="70" fill="url(#${gid})"/>
  <path d="M202 28h24l-5-12h-14z" fill="var(--b-navy)"/><circle class="bulb" cx="214" cy="29" r="4" fill="var(--lit)"/>
  <rect x="286" y="22" width="68" height="136" rx="5" fill="var(--fridge)" stroke="var(--china-line)" stroke-width="2"/>
  <rect x="292" y="28" width="56" height="124" rx="3" fill="var(--sky)" opacity=".55"/>
  <path d="M292 72h56M292 114h56" stroke="var(--china-line)" stroke-width="2"/>
  ${[298, 312, 326].map(x => `<rect x="${x}" y="48" width="10" height="24" rx="3" fill="var(--china)" stroke="var(--china-line)"/><rect x="${x + 2}" y="44" width="6" height="5" rx="1" fill="var(--pen)"/>`).join('')}
  ${[298, 314, 330].map((x, i) => `<rect x="${x}" y="92" width="11" height="22" rx="4" fill="${i === 1 ? 'var(--b-rose)' : 'var(--pen-soft)'}" stroke="var(--china-line)"/>`).join('')}
  ${[300, 318].map(x => `<rect x="${x}" y="130" width="14" height="22" rx="2" fill="var(--marker-soft)" stroke="var(--china-line)"/>`).join('')}
  <rect x="290" y="70" width="3" height="32" rx="1.5" fill="var(--china-line)"/>
  <g transform="translate(150 40)">${person(CAST.priya)}</g>
  <rect x="0" y="156" width="360" height="9" fill="var(--wood-top)"/>
  <rect x="0" y="165" width="360" height="85" fill="var(--awning-c)"/>
  <path d="M90 165v85M270 165v85" stroke="var(--shop-wall)" opacity=".22" stroke-width="3"/>
  <rect x="136" y="188" width="88" height="24" rx="4" fill="var(--sign)"/><text x="180" y="204.5" text-anchor="middle" class="sign-t">PRIYA'S</text>`;
}

const SHOP = {
  bread: { box: [12, 58, 82, 32], at: [50, 62], svg: `<g transform="translate(14 60)">${bread(0, 0)}</g>` },
  apples: { box: [6, 116, 70, 48], at: [40, 120], svg: `${[[20, 136], [34, 133], [48, 136], [62, 134], [27, 128], [55, 128], [41, 125]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="var(--postbox)"/><path d="M${x - 2} ${y - 3}a3 3 0 0 1 3-2" stroke="var(--china)" stroke-width="1.4" fill="none" opacity=".7"/><path d="M${x} ${y - 7}l1-3" stroke="var(--wood-line)" stroke-width="1.4" stroke-linecap="round"/>`).join('')}<rect x="10" y="138" width="62" height="26" rx="2" fill="var(--wood)"/><path d="M10 147h62M10 155h62" stroke="var(--wood-line)" stroke-width="1.5"/><path d="M16 138v26M66 138v26" stroke="var(--wood-line)" stroke-width="2"/>` },
  bananas: { box: [80, 122, 56, 42], at: [108, 126], svg: `${[0, 1, 2].map(k => `<path d="M${88 + k * 8} ${160 - k * 2}c-4-14 2-26 14-31 2 0 3 2 2 3-9 6-12 15-9 27z" fill="var(--sun)" stroke="var(--pastry-dark)" stroke-width="1.1"/>`).join('')}<path d="M103 127l6-4" stroke="var(--wood-line)" stroke-width="3" stroke-linecap="round"/><path d="M88 160l2 3M96 158l2 3M104 156l2 3" stroke="var(--wood-line)" stroke-width="2" stroke-linecap="round"/>` },
  newspaper: { box: [136, 130, 54, 36], at: [163, 134], svg: `<path d="M142 163l7-27h37l-7 27z" fill="var(--china)" stroke="var(--china-line)"/><path d="M151 141h29" stroke="var(--ink)" stroke-width="3"/><path d="M149 148h13M148 153h13M147 158h13M165 148h12M164 153h12M163 158h12" stroke="var(--china-line)" stroke-width="1.6"/>` },
  eggs: { box: [196, 130, 64, 36], at: [228, 134], svg: `${[212, 228, 244].map(x => `<ellipse cx="${x}" cy="145" rx="6.8" ry="8.5" fill="var(--egg)" stroke="var(--china-line)"/>`).join('')}<path d="M200 150h56l-5 14h-46z" fill="var(--kraft)"/><path d="M214 150v14M228 150v14M242 150v14" stroke="var(--pastry-dark)" stroke-width="1" opacity=".5"/><path d="M198 150l3-10" stroke="var(--kraft)" stroke-width="3"/>` },
  water: { box: [264, 94, 30, 72], at: [279, 98], svg: `<rect x="275" y="98" width="8" height="7" rx="1.5" fill="var(--pen)"/><path d="M275 105h8l6 12v44a3 3 0 0 1-3 3h-14a3 3 0 0 1-3-3v-44z" fill="var(--pen-soft)" stroke="var(--pen)" stroke-width="1.2"/><rect x="269" y="128" width="20" height="14" fill="var(--china)" opacity=".9"/><path d="M273 135h12" stroke="var(--pen)" stroke-width="1.6"/>` },
};

const SHOP_BAG = {
  bag: { box: [8, 102, 66, 62], at: [42, 106], svg: `<path d="M26 126c0-20 32-20 32 0" stroke="var(--wood-line)" stroke-width="3.5" fill="none"/><path d="M14 124h56l-5 40H19z" fill="var(--kraft)"/><path d="M42 136c-5-4-10 0-6 5l6 6 6-6c4-5-1-9-6-5z" fill="var(--awning-c)"/>` },
  basket: { box: [78, 114, 66, 50], at: [111, 118], svg: `<path d="M88 138c3-24 43-24 46 0" stroke="var(--wood-line)" stroke-width="3.5" fill="none"/><path d="M82 138h58l-6 26H88z" fill="var(--wood)"/><path d="M84 146h54M86 154h50" stroke="var(--wood-line)" stroke-width="1.6"/><path d="M96 138l-2 26M106 138v26M116 138v26M126 138l2 26" stroke="var(--wood-line)" stroke-width="1.2" opacity=".7"/>` },
  chocolate: { box: [146, 136, 54, 30], at: [173, 140], svg: `<rect x="150" y="146" width="46" height="17" rx="2" fill="var(--choc)"/><path d="M161 146v17M172 146v17M150 154.5h22" stroke="var(--choc-dark)" stroke-width="1.4"/><path d="M170 146h26v17h-26z" fill="var(--plum)"/><path d="M170 146l-4 17h4z" fill="var(--china-line)"/><rect x="178" y="151" width="14" height="7" rx="1" fill="var(--sun)"/>` },
  milk: { box: [204, 96, 34, 70], at: [221, 100], svg: `<rect x="216" y="100" width="10" height="7" rx="1.5" fill="var(--pen)"/><path d="M215 107h12l5 10v44a3 3 0 0 1-3 3h-16a3 3 0 0 1-3-3v-44z" fill="var(--china)" stroke="var(--china-line)"/><rect x="210" y="128" width="22" height="16" fill="var(--pen-soft)"/><path d="M215 136h12" stroke="var(--pen)" stroke-width="1.8"/>` },
  receipt: { box: [242, 110, 36, 56], at: [259, 114], svg: receipt(247, 118) },
  change: { box: [282, 138, 52, 28], at: [302, 142], svg: coins(296, 161) },
};

/* ---------------------------------------------------------------- lookup */

// name → { bg, objects, wall (the colour around the picture), speaker (where the opener's bubble sits) }
export const SCENES = {
  cafe: { bg: gid => cafeBg(gid), objects: CAFE, wall: '--cafe-wall', speaker: { left: '4%', top: '6%', width: '54%' } },
  'cafe-pay': { bg: gid => cafeBg(gid, 'pay'), objects: CAFE_PAY, wall: '--cafe-wall', speaker: { left: '4%', top: '6%', width: '54%' } },
  room: { bg: gid => roomBg(gid), objects: ROOM, wall: '--room-wall', speaker: { left: '5%', top: '7%', width: '64%' } },
  shop: { bg: gid => shopBg(gid), objects: SHOP, wall: '--shop-wall', speaker: { left: '3%', top: '6%', width: '44%' } },
  'shop-bag': { bg: gid => shopBg(gid, 'bag'), objects: SHOP_BAG, wall: '--shop-wall', speaker: { left: '3%', top: '6%', width: '44%' } },
};

export const sceneKey = (scene, set) => set ? `${scene}-${set}` : scene;

/** The whole scene. With `interactive`, objects become buttons named by `labels[key]`. */
export function sceneSVG(key, { interactive = false, labels = {} } = {}) {
  const S = SCENES[key];
  const gid = nextId('sg');
  const objs = Object.entries(S.objects).map(([k, o]) => interactive && labels[k]
    ? `<g class="obj" data-k="${k}" tabindex="0" role="button" aria-label="${labels[k]}"><rect class="hit" x="${o.box[0]}" y="${o.box[1]}" width="${o.box[2]}" height="${o.box[3]}" rx="8" fill="transparent"/>${o.svg}</g>`
    : `<g class="obj-still">${o.svg}</g>`).join('');
  return `<svg viewBox="0 0 360 250" preserveAspectRatio="xMidYMid meet" ${interactive ? 'role="group"' : 'aria-hidden="true"'}>${glowDef(gid)}${S.bg(gid)}${objs}</svg>`;
}

/** One object on its own, cropped to its box: "cafe:tea". The radio needs the room's radio drawing. */
export function objIcon(ref) {
  const [key, k] = ref.split(':');
  if (key === 'tt') return thisThat(k);
  const o = SCENES[key]?.objects[k];
  if (!o) return '';
  return `<svg viewBox="${o.box.join(' ')}" aria-hidden="true">${o.svg}</svg>`;
}

/** "this one" (right by the hand) and "that one" (over on the shelf). 120 × 80. */
export function thisThat(which) {
  const hand = `<path d="M18 62c-6-2-8-8-4-12l10-9c2-2 5-2 7 0l4-3c2-2 5-1 6 1l3 6c1 3 0 6-3 7l-8 5c-2 6-8 8-15 5z" fill="var(--skin-1)" stroke="var(--skin-2)" stroke-width="1.2"/>`;
  const bar = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="0" width="40" height="15" rx="2" fill="var(--choc)"/><path d="M20 0h20v15H20z" fill="var(--plum)"/><rect x="25" y="4" width="11" height="7" rx="1" fill="var(--sun)"/></g>`;
  const shelf = `<rect x="70" y="30" width="46" height="4" rx="1.5" fill="var(--wood)"/>`;
  if (which === 'this') {
    return `<svg viewBox="0 0 120 80" aria-hidden="true">${shelf}${bar(80, 19, .7)}<g transform="translate(6 0)">${hand}<path d="M44 46l14 8" stroke="var(--pen)" stroke-width="2.4" stroke-linecap="round"/></g>${bar(50, 56, 1.1)}<circle cx="72" cy="64" r="22" fill="none" stroke="var(--pen)" stroke-width="2" stroke-dasharray="4 4"/></svg>`;
  }
  return `<svg viewBox="0 0 120 80" aria-hidden="true">${shelf}${bar(80, 19, .7)}<g transform="translate(6 0)">${hand}</g><path d="M50 40 Q66 26 78 24" stroke="var(--pen)" stroke-width="2.4" fill="none" stroke-dasharray="4 4" stroke-linecap="round"/><path d="M74 20l6 4-6 4" stroke="var(--pen)" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="94" cy="24" r="16" fill="none" stroke="var(--pen)" stroke-width="2" stroke-dasharray="4 4"/>${bar(40, 60, .9)}</svg>`;
}
