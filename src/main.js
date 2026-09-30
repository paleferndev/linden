import '@fontsource-variable/besley/wght.css';
import '@fontsource-variable/figtree/wght.css';
import './styles/tokens.css';
import './styles/app.css';
import { LEAF } from './art/leaf.js';
import { laneSVG } from './art/lane.js';
import { canSpeak, onVoice, speak } from './speech.js';
import { initPWA, isStandalone, justUpdated, onInstallable, promptInstall } from './pwa.js';

/* global __VERSION__ */
const $ = (sel, el = document) => el.querySelector(sel);

const HELLO = { en: "Hello again! The kettle's on.", ro: 'Bună din nou! Am pus de un ceai.' };
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.6v12.8a1 1 0 0 0 1.53.85l10.1-6.4a1 1 0 0 0 0-1.7L9.53 4.75A1 1 0 0 0 8 5.6z" fill="currentColor"/></svg>',
  share: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14V3.5M8 7.5l4-4 4 4M8.5 10.5H6.5a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const ACCENTS = { 'en-gb': 'engleză britanică', 'en-us': 'engleză americană', 'en-au': 'engleză australiană', 'en-ie': 'engleză irlandeză' };
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

$('#app').innerHTML = `
  <header class="cover">
    <div class="wrap cover-top">
      <h1 class="wordmark">${LEAF}<span class="en">Linden</span></h1>
      <p class="tagline">Engleza de pe strada ta. Câte cinci minute pe zi.</p>
    </div>
    <div class="lane" id="lane" aria-label="Linden Lane: strada cu lecții">${laneSVG()}</div>
  </header>

  <main class="wrap">
    <div class="stack">
      <section class="card">
        <p class="eyebrow">În curând</p>
        <h2>Strada se construiește.</h2>
        <p class="body">Lecțiile se mută aici în curând. Până atunci, verifică dacă se aude vocea:</p>
        <button class="say" id="hello" type="button">
          <span class="play">${ICON.play}</span>
          <span class="en">${HELLO.en}</span>
        </button>
        <p class="gloss">${HELLO.ro}</p>
        <p class="voice" id="voice">Caut o voce în engleză…</p>
      </section>

      <section class="card" id="install" hidden></section>
    </div>
    <footer class="foot">Linden · <span id="ver">${__VERSION__}</span></footer>
  </main>`;

/* ---------- sound check */
const voiceLine = $('#voice');
const noVoice = () => { voiceLine.textContent = 'Nu am găsit o voce în engleză pe acest dispozitiv.'; };
if (!canSpeak) voiceLine.textContent = 'Browserul acesta nu poate citi cu voce tare.';
else {
  const wait = setTimeout(noVoice, 2500);
  onVoice(v => {
    clearTimeout(wait);
    if (!v) return noVoice();
    const name = v.name.replace(/^Microsoft\s+/, '').replace(/\s+Online\b.*$/, '').split(/\s+[-–(]/)[0];
    voiceLine.textContent = `Vocea: ${name} · ${ACCENTS[v.lang.replace('_', '-').toLowerCase()] || 'engleză'}`;
  });
}
$('#hello').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (!canSpeak) return toast('Browserul acesta nu poate citi cu voce tare.');
  btn.classList.add('speaking');
  speak(HELLO.en).then(() => btn.classList.remove('speaking'));
});

/* ---------- install card */
const install = $('#install');
function renderInstall(canPrompt) {
  if (isStandalone()) { install.hidden = true; return; }
  install.hidden = false;
  const head = `<p class="eyebrow">Instalează</p><h2>Pune Linden pe ecranul principal.</h2>`;
  const why = `<p class="body">Așa se deschide ca o aplicație, merge și fără internet și se actualizează singură.</p>`;
  if (isIOS) {
    install.innerHTML = `${head}
      <ol class="steps">
        <li><span>În Safari, apasă <b>Partajează</b> ${ICON.share}</span></li>
        <li><span>Alege <b>Adaugă pe ecranul principal</b>.</span></li>
        <li><span>Deschide Linden de pe ecran, de acum încolo.</span></li>
      </ol>${why}`;
  } else if (canPrompt) {
    install.innerHTML = `${head}${why}<button class="btn" id="installBtn" type="button">Instalează Linden</button>`;
    $('#installBtn').addEventListener('click', promptInstall);
  } else {
    install.innerHTML = `${head}${why}<p class="body">În Chrome sau Edge, apasă iconița de instalare din dreapta barei de adrese.</p>`;
  }
}
onInstallable(renderInstall);

/* ---------- toast */
let toastTimer = 0;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}

initPWA({ onOfflineReady: () => toast('Gata: Linden merge acum și fără internet.') });
if (justUpdated()) toast('Linden s-a actualizat.');
