import { VERBS } from '../content/verbs.js';
import { ICONS } from '../art/icons.js';
import { LEAF } from '../art/leaf.js';
import { streetSVG } from './home.js';
import { Store, epsDone } from '../app/store.js';
import { $, $$, esc, toast, plural } from '../app/ui.js';
import { say, setAccent, unlockSpeech } from '../app/sound.js';
import { installHTML, bindInstall } from './install.js';

/* ======================================================================== Profil */

export function applyTheme() {
  const th = Store.d.profile.theme;
  if (th === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = th;
}

export function renderProfile(view, { onReset } = {}) {
  const p = Store.d.profile;
  const done = epsDone(), verbs = Object.keys(Store.d.verbs).length, days = Object.keys(Store.d.days).length;
  const since = new Date(p.started + 'T12:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
  const seg = (attr, value, opts) => `<div class="seg" data-${attr}>${opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${value === v}">${l}</button>`).join('')}</div>`;
  view.innerHTML = `<div class="wrap page">
    <header class="p-head"><span class="p-ava">${p.name ? esc(p.name[0].toUpperCase()) : ICONS.me}</span>
      <div><h1 class="page-h">${p.name ? esc(p.name) : 'Profil'}</h1><p class="page-sub">Pe Linden Lane din ${since}</p></div></header>
    <div class="stats3">
      <div><b>${done}</b><span>${done === 1 ? 'episod' : 'episoade'} din 12</span></div>
      <div><b>${verbs}</b><span>verbe din ${VERBS.length}</span></div>
      <div><b>${days}</b><span>${days === 1 ? 'seară' : 'seri'}</span></div>
    </div>

    <section class="group">
      <h2>Numele tău</h2>
      <form class="field" data-name-form><input id="nameIn" name="name" value="${esc(p.name)}" placeholder="Numele tău" maxlength="24" autocomplete="given-name" enterkeyhint="done"><button type="submit" class="pill-btn">Salvează</button></form>
      <p class="hint">Personajele ți se adresează pe nume.</p>
    </section>

    <section class="group">
      <h2>Vocea</h2>
      ${seg('voice', p.voice, [['en-GB', 'Britanică'], ['en-US', 'Americană']])}
      <div class="row-switch"><span><b>Mesajele se aud singure</b><small>Oprit: le asculți doar când le atingi.</small></span>
        <button type="button" class="switch" role="switch" aria-checked="${p.autoVoice}" data-auto aria-label="Mesajele se aud singure"><i></i></button></div>
    </section>

    <section class="group">
      <h2>Aspect</h2>
      ${seg('theme', p.theme, [['auto', 'Automat'], ['light', 'Zi'], ['dark', 'Seară']])}
    </section>

    <section class="group">
      <h2>Exerciții</h2>
      <a class="row-link" href="#/exercitii" data-nav="#/exercitii"><span><b>Toate tipurile de exerciții</b><small>Încearcă oricare, fără să schimbi progresul.</small></span>${ICONS.chev}</a>
    </section>

    <section class="group" data-install-box>
      <h2>Instalare</h2>
      ${installHTML()}
    </section>

    <section class="group">
      <h2>Mută progresul</h2>
      <p class="hint">Pe alt telefon sau pe PC: copiezi codul de aici și îl adaugi acolo.</p>
      <div class="btn-row"><button type="button" class="btn ghost" data-copy>${ICONS.copy}Copiază codul</button><button type="button" class="btn ghost" data-paste>${ICONS.download}Adaugă un cod</button></div>
      <div class="paste" data-paste-box hidden><textarea rows="3" placeholder="Lipește codul aici" data-code></textarea><button type="button" class="btn" data-import>Încarcă progresul</button></div>
    </section>

    <section class="group">
      <button type="button" class="danger" data-reset>Șterge progresul de pe acest dispozitiv</button>
    </section>
    <p class="ver"><span class="leaf">${LEAF}</span>Linden · ${__VERSION__}</p>
  </div>`;

  bindInstall(view);
  $('[data-name-form]', view).addEventListener('submit', e => {
    e.preventDefault();
    p.name = $('#nameIn', view).value.trim().slice(0, 24);
    Store.save();
    toast('Numele e salvat.');
    renderProfile(view, { onReset });
  });
  $$('[data-voice] button', view).forEach(b => b.addEventListener('click', () => {
    p.voice = b.dataset.v; Store.save(); setAccent(p.voice);
    $$('[data-voice] button', view).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    setTimeout(() => say('Hello! Welcome to Linden Lane.', { who: 'tom' }), 150);
  }));
  $('[data-auto]', view).addEventListener('click', e => {
    p.autoVoice = !p.autoVoice; Store.save();
    e.currentTarget.setAttribute('aria-checked', String(p.autoVoice));
  });
  $$('[data-theme] button', view).forEach(b => b.addEventListener('click', () => {
    p.theme = b.dataset.v; Store.save(); applyTheme();
    $$('[data-theme] button', view).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  $('[data-copy]', view).addEventListener('click', async () => {
    const code = Store.exportCode();
    try { await navigator.clipboard.writeText(code); toast('Codul e copiat.'); }
    catch {
      $('[data-paste-box]', view).hidden = false;
      const ta = $('[data-code]', view);
      ta.value = code; ta.select();
      toast('Copiază codul din căsuță.');
    }
  });
  $('[data-paste]', view).addEventListener('click', () => { const b = $('[data-paste-box]', view); b.hidden = !b.hidden; if (!b.hidden) $('[data-code]', view).focus(); });
  $('[data-import]', view).addEventListener('click', () => {
    const code = $('[data-code]', view).value.trim();
    if (!code) return;
    if (!confirm('Progresul de pe acest dispozitiv va fi înlocuit. Continui?')) return;
    try { Store.importCode(code); applyTheme(); setAccent(Store.d.profile.voice); toast('Progresul e încărcat.'); renderProfile(view, { onReset }); }
    catch { toast('Codul nu e valid.'); }
  });
  $('[data-reset]', view).addEventListener('click', () => {
    if (!confirm('Ștergi tot progresul de pe acest dispozitiv?')) return;
    Store.reset(); applyTheme(); onReset?.();
  });
}

/* ======================================================================== first open */

export function renderOnboarding(root, { onDone }) {
  root.innerHTML = `<div class="onb night" data-onb>
    <div class="onb-sky">
      <div class="wrap"><h1 class="wordmark">${LEAF}<span class="en">Linden</span></h1><p class="tagline">Engleză, câte un episod pe seară.</p></div>
      <div class="onb-lane">${streetSVG('0 30 1440 370')}</div>
    </div>
    <div class="onb-body wrap"><button type="button" class="btn" data-start>Începe</button></div>
  </div>`;
  $('[data-start]', root).addEventListener('click', () => {
    unlockSpeech();
    root.innerHTML = `<div class="onb name">
      <form class="wrap onb-form" data-form>
        <p class="kick">Linden</p>
        <h1 class="page-h">Cum te cheamă?</h1>
        <input id="onbName" name="name" placeholder="Numele tău" maxlength="24" autocomplete="given-name" enterkeyhint="go">
        <p class="hint">Personajele ți se adresează pe nume. Îl poți schimba oricând.</p>
        <div class="onb-actions"><button type="submit" class="btn">Continuă</button><button type="button" class="btn ghost" data-skip>Sari peste</button></div>
      </form>
    </div>`;
    const finish = name => { Store.d.profile.name = name; Store.d.profile.onboarded = true; Store.save(); onDone(); };
    $('[data-form]', root).addEventListener('submit', e => { e.preventDefault(); finish($('#onbName', root).value.trim().slice(0, 24)); });
    $('[data-skip]', root).addEventListener('click', () => finish(''));
    setTimeout(() => $('#onbName', root)?.focus(), 300);
  });
}

export { plural };
