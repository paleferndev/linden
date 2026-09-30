import { ITEMS } from '../content/items.js';
import { TRAPS } from '../content/traps.js';
import { COURSE } from '../content/lessons.js';
import { ICONS } from '../art/icons.js';
import { LEAF } from '../art/leaf.js';
import { laneSVG } from '../art/lane.js';
import { Store, dueItems, isLearned, lessonDone, wordsSeen, addDays, today, BOX_DAYS } from '../app/store.js';
import { $, $$, esc, sub, toast } from '../app/ui.js';
import { say, setAccent } from '../app/sound.js';
import { installHTML, bindInstall } from './install.js';

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/* ======================================================================== Recapitulare */

export function renderReviewTab(view) {
  const due = dueItems();
  const items = Object.keys(Store.d.items).filter(id => ITEMS[id] && Store.d.items[id].box > 0);
  const upcoming = items.map(id => Store.d.items[id].due).filter(d => d > today()).sort()[0];
  const nextCount = upcoming ? items.filter(id => Store.d.items[id].due === upcoming).length : 0;
  const when = upcoming === addDays(today(), 1) ? 'mâine' : upcoming ? new Date(upcoming + 'T12:00').toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
  view.innerHTML = `<div class="wrap page">
    <h1 class="page-h">Recapitulare</h1>
    ${due.length ? `<div class="rv-card">
        <span class="ti">${ICONS.tea}</span>
        <div><b>${plural(due.length, 'cuvânt de repetat', 'cuvinte de repetat')}</b><span>Exerciții scurte, cel mult trei minute.</span></div>
        <button type="button" class="btn" data-review>Începe</button>
      </div>
      <div class="chips left">${due.slice(0, 14).map(id => `<button type="button" class="chip en" data-say="${id}">${esc(sub(ITEMS[id].en))}</button>`).join('')}</div>`
    : `<div class="rv-empty">${ICONS.tea}<b>Nimic de repetat azi.</b>
        <span>${upcoming ? `Următoarea recapitulare: ${when}, ${plural(nextCount, 'cuvânt', 'cuvinte')}.` : 'Cuvintele din lecții revin aici la momentul potrivit.'}</span></div>`}
    <p class="note">Un cuvânt revine după 1, 3, 7, 14 și 30 de zile. Dacă greșești, revine a doua zi.</p>
  </div>`;
}

/* ======================================================================== Fraze */

const GROUPS = [
  { id: 'help', name: 'Când nu înțelegi', pin: true, ids: ['p.dont-understand', 'p.repeat', 'p.slowly', 'p.what-does-mean', 'p.how-say', 'p.im-learning', 'p.speak-romanian', 'p.no-english', 'p.how-spell-that', 'p.write-it-down'] },
  { id: 'hello', name: 'Salut', ids: ['p.good-morning', 'p.good-afternoon', 'p.good-evening', 'p.good-night', 'p.how-are-you', 'p.im-fine-thanks', 'p.and-you', 'p.not-bad', 'p.see-you-later', 'p.see-you-tomorrow'] },
  { id: 'polite', name: 'Politețe', ids: ['p.thank-you', 'p.youre-welcome', 'p.excuse-me'] },
  { id: 'cafe', name: 'La cafenea', ids: ['p.can-i-have', 'p.just-milk', 'p.with-milk', 'p.how-much', 'p.by-card', 'p.the-bill', 'p.here-you-go'] },
  { id: 'shop', name: 'La magazin', ids: ['p.how-much-is', 'p.how-much-are', 'p.which-one', 'p.this-one', 'p.that-one', 'p.do-you-have', 'p.anything-else', 'p.thats-all', 'p.need-a-bag', 'p.keep-the-change', 'p.have-a-nice-day'] },
  { id: 'you', name: 'Despre tine', ids: ['p.whats-your-name', 'p.my-name-is', 'p.nice-to-meet-you', 'p.nice-to-meet-you-too', 'p.how-spell-name'] },
];
let filter = 'all';

export function renderPhrases(view) {
  const groups = GROUPS.map(g => ({ ...g, rows: g.ids.filter(id => g.pin || isLearned(id)) })).filter(g => g.rows.length);
  const traps = Store.d.traps.filter(id => TRAPS[id]);
  const learnedCount = groups.reduce((n, g) => n + g.rows.filter(isLearned).length, 0);
  if (filter !== 'all' && filter !== 'traps' && !groups.some(g => g.id === filter)) filter = 'all';
  if (filter === 'traps' && !traps.length) filter = 'all';
  const chips = [['all', 'Toate'], ...groups.map(g => [g.id, g.name]), ...(traps.length ? [['traps', 'Capcane']] : [])];
  const row = id => { const it = ITEMS[id]; return `<button type="button" class="ph-row" data-say="${id}"><span><b class="en">${esc(sub(it.en))}</b><span>${esc(sub(it.ro[0]))}</span></span><span class="spk">${ICONS.speaker}</span></button>`; };
  const shown = filter === 'all' ? groups : groups.filter(g => g.id === filter);
  view.innerHTML = `<div class="wrap page">
    <h1 class="page-h">Fraze</h1>
    <p class="page-sub">Pe situații. Atinge o frază ca s-o auzi.</p>
    <div class="seg-chips" role="tablist">${chips.map(([id, name]) => `<button type="button" role="tab" class="${filter === id ? 'on' : ''}" aria-selected="${filter === id}" data-f="${id}">${esc(name)}</button>`).join('')}</div>
    ${filter === 'traps' ? '' : shown.map(g => `<section class="ph-group"><p class="ph-sec">${g.pin ? ICONS.pin : ''}${esc(g.name)}</p>${g.rows.map(row).join('')}</section>`).join('')}
    ${(filter === 'all' || filter === 'traps') && traps.length ? `<section class="ph-group"><p class="ph-sec">${ICONS.trap}Capcane pentru români</p><div class="trap-list">${traps.map(id => { const x = TRAPS[id]; return `<div class="trap"><p class="x ${x.badSay ? 'say-x' : 'en'}">${esc(x.bad)}</p><p class="v en">${esc(x.good)}</p><p class="why">${esc(x.why)}</p></div>`; }).join('')}</div></section>` : ''}
    ${!learnedCount && filter === 'all' ? `<p class="note">Frazele din lecții apar aici pe măsură ce le înveți.</p>` : ''}
  </div>`;
  $$('[data-f]', view).forEach(b => b.addEventListener('click', () => { filter = b.dataset.f; renderPhrases(view); }));
}

/* ======================================================================== Profil */

function applyTheme() {
  const th = Store.d.profile.theme;
  if (th === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = th;
}
export { applyTheme };

export function renderProfile(view, { onReset } = {}) {
  const p = Store.d.profile;
  const done = COURSE.filter(lessonDone).length;
  const days = Object.keys(Store.d.days).length;
  const since = new Date(p.started + 'T12:00').toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
  const seg = (attr, value, opts) => `<div class="seg" data-${attr}>${opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${value === v}">${l}</button>`).join('')}</div>`;
  view.innerHTML = `<div class="wrap page">
    <header class="p-head"><span class="p-ava">${p.name ? esc(p.name[0].toUpperCase()) : ICONS.me}</span>
      <div><h1 class="page-h">${p.name ? esc(p.name) : 'Profil'}</h1><p class="page-sub">Pe Linden Lane din ${since}</p></div></header>
    <div class="stats3">
      <div><b>${done}</b><span>${done === 1 ? 'lecție' : 'lecții'} din ${COURSE.length}</span></div>
      <div><b>${wordsSeen()}</b><span>cuvinte</span></div>
      <div><b>${days}</b><span>${days === 1 ? 'zi' : 'zile'}</span></div>
    </div>

    <section class="group">
      <h2>Numele tău</h2>
      <form class="field" data-name-form><input id="nameIn" name="name" value="${esc(p.name)}" placeholder="Numele tău" maxlength="24" autocomplete="given-name" enterkeyhint="done"><button type="submit" class="pill-btn">Salvează</button></form>
      <p class="hint">Apare în dialoguri.</p>
    </section>

    <section class="group">
      <h2>Vocea</h2>
      ${seg('voice', p.voice, [['en-GB', 'Britanică'], ['en-US', 'Americană']])}
    </section>

    <section class="group">
      <div class="row-switch"><span><b>Pronunția scrisă</b><small>«hou-TEL» sub cuvinte</small></span>
        <button type="button" class="switch" role="switch" aria-checked="${p.respell}" data-respell aria-label="Pronunția scrisă"><i></i></button></div>
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
    setTimeout(() => say('Hello! Welcome to Linden Lane.'), 150);
  }));
  $('[data-respell]', view).addEventListener('click', e => {
    p.respell = !p.respell; Store.save();
    e.currentTarget.setAttribute('aria-checked', String(p.respell));
  });
  $$('[data-theme] button', view).forEach(b => b.addEventListener('click', () => {
    p.theme = b.dataset.v; Store.save(); applyTheme();
    $$('[data-theme] button', view).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }));
  $('[data-copy]', view).addEventListener('click', async () => {
    const code = Store.exportCode();
    try { await navigator.clipboard.writeText(code); toast('Codul e copiat.'); }
    catch {
      const box = $('[data-paste-box]', view);
      box.hidden = false;
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
  root.innerHTML = `<div class="onb" data-onb>
    <div class="onb-sky">
      <div class="wrap"><h1 class="wordmark">${LEAF}<span class="en">Linden</span></h1><p class="tagline">Engleză, câte cinci minute pe zi.</p></div>
      <div class="onb-lane">${laneSVG({}, { vb: '0 30 1440 370', par: 'xMinYMax slice' })}</div>
    </div>
    <div class="onb-body wrap"><button type="button" class="btn" data-start>Începe</button></div>
  </div>`;
  $('[data-start]', root).addEventListener('click', () => {
    say('Hello!');
    root.innerHTML = `<div class="onb name">
      <form class="wrap onb-form" data-form>
        <p class="kick">Linden</p>
        <h1 class="page-h">Cum te cheamă?</h1>
        <input id="onbName" name="name" placeholder="Numele tău" maxlength="24" autocomplete="given-name" enterkeyhint="go">
        <p class="hint">Apare în dialoguri. Îl poți schimba oricând.</p>
        <div class="onb-actions"><button type="submit" class="btn">Continuă</button><button type="button" class="btn ghost" data-skip>Sari peste</button></div>
      </form>
    </div>`;
    const finish = name => { Store.d.profile.name = name; Store.d.profile.onboarded = true; Store.save(); onDone(); };
    $('[data-form]', root).addEventListener('submit', e => { e.preventDefault(); finish($('#onbName', root).value.trim().slice(0, 24)); });
    $('[data-skip]', root).addEventListener('click', () => finish(''));
    setTimeout(() => $('#onbName', root)?.focus(), 300);
  });
}
