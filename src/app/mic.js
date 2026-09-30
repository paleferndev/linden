import { muted } from '../speech.js';

// "Say it aloud" with the browser's speech recognition. Chrome on Android and Safari on iPhone have it (it usually
// needs the internet); where it's missing, blocked or fails, the exercise falls back to saying it and checking
// yourself against the model answer.

const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
// On iPhone, recognition exists in Safari but does nothing in an app added to the home screen (WebKit bug 225298).
const iosHomeScreen = typeof navigator !== 'undefined' && /iP(hone|ad|od)/.test(navigator.userAgent) && (navigator.standalone === true || matchMedia('(display-mode: standalone)').matches);
export const canRecognize = !!SR && !muted && !iosHomeScreen;

let current = null;

/** Listens once. Resolves with what was heard (a few guesses), rejects with a reason: 'denied', 'silence', 'failed'. */
export function recognize(lang) {
  stopRecognizing();
  return new Promise((resolve, reject) => {
    let r;
    try { r = new SR(); } catch { reject(new Error('failed')); return; }
    current = r;
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 4;
    r.continuous = false;
    let settled = false;
    const end = (fn, v) => { if (!settled) { settled = true; clearTimeout(timer); current = null; fn(v); } };
    const timer = setTimeout(() => { try { r.abort(); } catch {} end(reject, new Error('silence')); }, 9000);
    r.onresult = e => end(resolve, [...e.results[0]].map(a => a.transcript));
    r.onerror = e => end(reject, new Error(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'denied' : e.error === 'no-speech' ? 'silence' : 'failed'));
    r.onend = () => end(reject, new Error('silence'));
    try { r.start(); } catch { end(reject, new Error('failed')); }
  });
}

export function stopRecognizing() {
  if (current) { try { current.abort(); } catch {} current = null; }
}
