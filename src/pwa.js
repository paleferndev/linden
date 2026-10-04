import { registerSW } from 'virtual:pwa-register';

// Keeping the installed app current. Every time the app opens or comes back to the foreground, the service worker asks
// the server for a newer build. A new build is applied straight away with a quick reload, unless the learner is busy
// (mid-lesson): then it waits for `setBusy(false)`.

let busy = false;
let pending = null;
let installPrompt = null;
const installListeners = new Set();

export const isStandalone = () => matchMedia('(display-mode: standalone), (display-mode: fullscreen)').matches || navigator.standalone === true;

export function setBusy(value) {
  busy = value;
  applyPending();
}

function applyPending() {
  if (!pending || busy) return;
  const update = pending;
  pending = null;
  try { sessionStorage.setItem('linden.updated', '1'); } catch {}
  update(true);
}

/** True once, right after the app reloaded itself into a new build. */
export function justUpdated() {
  try {
    const was = sessionStorage.getItem('linden.updated') === '1';
    sessionStorage.removeItem('linden.updated');
    return was;
  } catch { return false; }
}

export function initPWA({ onOfflineReady } = {}) {
  addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    installPrompt = e;
    installListeners.forEach(fn => fn(true));
  });
  addEventListener('appinstalled', () => {
    installPrompt = null;
    installListeners.forEach(fn => fn(false));
  });

  navigator.storage?.persist?.().catch(() => {});
  if (!('serviceWorker' in navigator)) return;

  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      pending = updateSW;
      applyPending();
    },
    onOfflineReady() { onOfflineReady?.(); },
    onRegisteredSW(_url, reg) {
      if (!reg) return;
      const check = () => { if (navigator.onLine) reg.update().catch(() => {}); };
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
      setInterval(check, 60 * 60 * 1000);
    },
  });
}

/** Calls `fn(canInstall)` now and whenever the browser's own install prompt becomes available or goes away. */
export function onInstallable(fn) {
  installListeners.add(fn);
  fn(!!installPrompt);
}

export async function promptInstall() {
  if (!installPrompt) return false;
  const e = installPrompt;
  installPrompt = null;
  e.prompt();
  const { outcome } = await e.userChoice;
  installListeners.forEach(fn => fn(false));
  return outcome === 'accepted';
}
