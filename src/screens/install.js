import { ICONS } from '../art/icons.js';
import { openSheet, closeSheet, $ } from '../app/ui.js';
import { isStandalone, onInstallable, promptInstall } from '../pwa.js';

// How to put Linden on the home screen: Safari's share menu on iPhone, the browser's own prompt on Android and PC.

export const isIOS = () => /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

let canPrompt = false;
onInstallable(v => { canPrompt = v; });

export function installHTML() {
  if (isStandalone()) return `<p class="hint">Linden e instalată pe acest dispozitiv.</p>`;
  if (isIOS()) return `<ol class="steps">
      <li><span>În Safari, apasă <b>Partajează</b> ${ICONS.share}</span></li>
      <li><span>Alege <b>Adaugă pe ecranul principal</b>.</span></li>
      <li><span>Deschide Linden de pe ecran.</span></li></ol>`;
  if (canPrompt) return `<button type="button" class="btn" data-do-install>Instalează Linden</button>`;
  return `<p class="hint">În Chrome sau Edge: meniul browserului, apoi <b>Instalează aplicația</b> sau <b>Adaugă pe ecranul principal</b>.</p>`;
}

export function bindInstall(root) {
  $('[data-do-install]', root)?.addEventListener('click', async () => { await promptInstall(); closeSheet(); });
}

export function openInstall() {
  const sheet = openSheet(`<div class="sh-head plain"><div><h3>Instalează aplicația</h3><p>Se deschide ca o aplicație, merge fără internet și se actualizează singură.</p></div>
    <button type="button" class="icon-btn" data-close aria-label="Închide">${ICONS.close}</button></div>${installHTML()}`);
  bindInstall(sheet);
}
