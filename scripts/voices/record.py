# Records every line the app speaks, in each character's voice, and checks every take before keeping it.
#
#   1. node scripts/voices/export-lines.mjs <models>/lines.json
#   2. <models>/chatter/Scripts/python scripts/voices/record.py            (LINDEN_VOICE_MODELS=<models>)
#
# <models> is a folder outside the repo with the Chatterbox environment (chatter/), the Hugging Face cache (hf/) and
# one ten-second sample per Supertonic voice style (refs/F1.wav … M5.wav). Each character speaks in a Supertonic voice
# cloned by Chatterbox, from a short sample of that voice in the mood of the line. Whisper writes down what each take
# says; a take is kept only if it has exactly the script's words, no long pause in the middle and a sane speed.
# Kept takes go to public/voices/<key>.mp3; src/content/voices.js lists them. Lines already recorded are skipped, so
# after a script change only the new or changed lines are recorded. Lines that never pass are left to the phone's
# voice and listed in <models>/voices-review.json, with their best take in <models>/review/.
import os, re, sys, json, time, argparse, difflib, unicodedata
import numpy as np

MODELS = os.environ.get('LINDEN_VOICE_MODELS')
if not MODELS:
    sys.exit('Set LINDEN_VOICE_MODELS to the voice models folder.')
os.environ.setdefault('HF_HOME', os.path.join(MODELS, 'hf'))
os.environ.setdefault('TORCH_HOME', os.path.join(MODELS, 'cache', 'torch'))
os.environ.setdefault('XDG_CACHE_HOME', os.path.join(MODELS, 'cache'))
os.environ.setdefault('HF_HUB_DISABLE_SYMLINKS_WARNING', '1')

import torch, librosa, soundfile as sf
from scipy.signal import butter, sosfilt

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(REPO, 'public', 'voices')
MANIFEST = os.path.join(OUT, 'manifest.json')

# who → (Supertonic voice style, liveliness)
CAST = {
    'stranger': ('F2', 0.6), 'tom': ('M1', 0.8), 'hughes': ('F1', 0.85), 'sam': ('M3', 0.85), 'priya': ('F5', 0.8),
    'okafor': ('F4', 0.7), 'moss': ('M5', 0.55), 'voice': ('M2', 0.5), 'narrator': ('F3', 0.45),
    'oldvoice': ('M5', 0.5),  # Mr Moss on the radio, before the story says so
}
# what each mood sample says (said in that mood, it sets the tone of the lines read from it)
MOODS = {
    'warm': 'It is lovely to see you. Come in, sit down, and tell me all about your day.',
    'ask': 'Really? Is that true? Where did you find it? Can you show me how it works?',
    'excited': 'Oh, look at that! That is wonderful! I can hardly believe it!',
    'gentle': 'Oh, I am so sorry. Do not worry. It is all right now. I am here with you.',
    'wonder': 'Oh… where am I? Everything is so new. The lights are so small and far away. Hello? Is anyone there?',
    'radio': 'This is a message for you. Listen carefully. We are very far away, but we can hear you.',
    'teach': 'Go, went, gone. I went to the shop yesterday. Listen carefully, and say it after me.',
}
GENTLE = re.compile(r"\b(sorry|poor|miss|goodbye|never|alone|sad|weak|forgotten|lost|asleep|quiet)\b", re.I)
INTERJ = {'hm', 'hmm', 'ha', 'hah', 'oh', 'eh', 'ah', 'mm', 'uh', 'um', 'wow', 'mrrp', 'shh', 'ooh'}
NAMES = {'hughes', 'okafor', 'priya', 'aster', 'mimi', 'moss', 'linden', 'kettle', 'sam', 'tom'}
# words that sound the same: Whisper can't tell them apart, so neither does the check ("know. knew." heard as "no. new.")
SAME = {w: k for k, ws in {
    'know': ['no'], 'knew': ['new'], 'knows': ['nose'], 'youre': ['your'], 'two': ['to', 'too'], 'practise': ['practice'],
    'won': ['one'], 'shone': ['shown'], 'hear': ['here'], 'right': ['write'], 'see': ['sea'], 'by': ['buy', 'bye'],
    'their': ['there', 'theyre'], 'whole': ['hole'], 'eight': ['ate'], 'read': ['red'], 'meet': ['meat'], 'flew': ['flu'],
    'threw': ['through'], 'blue': ['blew'], 'road': ['rode'], 'grown': ['groan'], 'sun': ['son'], 'weather': ['whether'],
    'its': ['it s'], 'for': ['four'], 'been': ['bean'], 'wear': ['where'], 'week': ['weak'], 'hour': ['our'],
    # Whisper spells the American way
    'neighbours': ['neighbors'], 'neighbour': ['neighbor'], 'colour': ['color'], 'favourite': ['favorite'], 'centre': ['center'],
    'theatre': ['theater'], 'grey': ['gray'], 'mum': ['mom'], 'kilometres': ['kilometers'], 'metres': ['meters'],
    'travelling': ['traveling'], 'cancelled': ['canceled'], 'jewellery': ['jewelry'], 'cheque': ['check'], 'grandad': ['granddad'],
}.items() for w in [k, *ws]}
NUM = {'1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
       '10': 'ten', '11': 'eleven', '12': 'twelve', '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty', '60': 'sixty',
       '70': 'seventy', '80': 'eighty', '90': 'ninety', '100': 'a hundred', '1966': 'nineteen sixty six', '2010': 'twenty ten'}


def mood_of(line):
    who, say = line['who'], line['say']
    if who in ('voice', 'oldvoice'):
        return 'radio'
    if who == 'narrator':
        return 'teach'
    if '?' in say:
        return 'ask'
    if '!' in say:
        return 'excited'
    if GENTLE.search(say):
        return 'gentle'
    return 'wonder' if who == 'stranger' else 'warm'


def words(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'\bno\.\s*(\d+)', r'number \1', s)
    s = re.sub(r'\ba\.m\.', 'am', s)
    s = re.sub(r'\d+', lambda m: NUM.get(m.group(0), m.group(0)), s)
    s = s.replace("'", '').replace('anymore', 'any more')
    s = re.sub(r'[^a-z0-9 ]', ' ', s)
    s = s.replace('okay', 'ok').replace('mister', 'mr').replace('missus', 'mrs').replace('doctor', 'dr')
    return [SAME.get(w, w) for w in s.split()]


def lev(a, b):
    p = list(range(len(b) + 1))
    for i, x in enumerate(a, 1):
        c = [i]
        for j, y in enumerate(b, 1):
            c.append(min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (x != y)))
        p = c
    return p[-1]


def errors(expected, heard):
    """Words that differ, ignoring interjections and small slips on names (Whisper's, not the voice's)."""
    e, h = [w for w in words(expected) if w not in INTERJ], [w for w in words(heard) if w not in INTERJ]
    n = 0
    for op, a0, a1, b0, b1 in difflib.SequenceMatcher(a=e, b=h, autojunk=False).get_opcodes():
        if op == 'equal':
            continue
        if op == 'replace' and a1 - a0 == b1 - b0 and all(x in NAMES and lev(x, y) <= 3 for x, y in zip(e[a0:a1], h[b0:b1])):
            continue
        n += max(a1 - a0, b1 - b0)
    return n


def longest_gap(y, sr):
    iv = librosa.effects.split(y, top_db=40)
    return max([(iv[k + 1][0] - iv[k][1]) / sr for k in range(len(iv) - 1)] or [0])


def radio(w, sr):
    sos = butter(4, [320, 3200], btype='bandpass', fs=sr, output='sos')
    w = sosfilt(sos, w)
    rng = np.random.default_rng(7)
    hiss = rng.normal(0, 0.006, len(w)) * (1 + 0.5 * np.sin(np.arange(len(w)) / sr * 2 * np.pi * 0.7))
    return (np.tanh(w * 2.2) * 0.6 + hiss).astype(np.float32)


def finish(w, sr, who):
    w, _ = librosa.effects.trim(w, top_db=40)
    pad = np.zeros(int(sr * 0.06), dtype=np.float32)
    w = np.concatenate([pad, w, pad])
    if who in ('voice', 'oldvoice'):
        w = radio(w, sr)
    rms = np.sqrt(np.mean(w ** 2)) or 1
    w = w * (0.08 / rms)
    peak = np.max(np.abs(w)) or 1
    return (w / peak * 0.95 if peak > 0.95 else w).astype(np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=0, help='record at most this many lines')
    ap.add_argument('--only', default='', help='comma-separated keys to record (again)')
    ap.add_argument('--seed', type=int, default=1000, help='first seed of the takes (another seed, other takes)')
    a = ap.parse_args()

    lines = json.load(open(os.path.join(MODELS, 'lines.json'), encoding='utf-8'))
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(os.path.join(MODELS, 'review'), exist_ok=True)
    manifest = json.load(open(MANIFEST, encoding='utf-8')) if os.path.exists(MANIFEST) else {}
    only = set(filter(None, a.only.split(',')))
    todo = [l for l in lines if (l['key'] in only) or (not only and not (l['key'] in manifest and os.path.exists(os.path.join(OUT, l['key'] + '.mp3'))))]
    if a.limit:
        todo = todo[:a.limit]
    print(f'{len(lines)} lines, {len(todo)} to record', flush=True)

    from chatterbox.tts import ChatterboxTTS
    from transformers import pipeline
    tts = ChatterboxTTS.from_pretrained(device='cuda')
    asr = pipeline('automatic-speech-recognition', model='openai/whisper-small.en', device=0, torch_dtype=torch.float16)
    sr = tts.sr

    def gen(text, ref, ex, cfg, temp):
        w = tts.generate(text, audio_prompt_path=ref, exaggeration=ex, cfg_weight=cfg, temperature=temp)
        return w.squeeze().detach().cpu().numpy().astype(np.float32)

    def hear(w):
        return asr(librosa.resample(w, orig_sr=sr, target_sr=16000))['text']

    def mood_ref(voice, mood):
        path = os.path.join(MODELS, 'refs', f'{voice}-{mood}.wav')
        if not os.path.exists(path):
            torch.manual_seed(5)
            w = gen(MOODS[mood], os.path.join(MODELS, 'refs', voice + '.wav'), 0.7, 0.5, 0.7)
            sf.write(path, w / (np.max(np.abs(w)) or 1) * 0.9, sr)
        return path

    review = {}
    t0 = time.time()
    for i, line in enumerate(todo):
        voice, live = CAST.get(line['who'], CAST['narrator'])
        mood = mood_of(line)
        ref = mood_ref(voice, mood)
        nwords = max(1, len(words(line['say'])))
        tries = [(live, 0.4, 0.7)] * 4 + [(max(0.3, live - 0.15), 0.5, 0.6)] * 3
        best = None
        for k, (ex, cfg, temp) in enumerate(tries):
            torch.manual_seed(a.seed + k)
            w = gen(line['say'], ref, ex, cfg, temp)
            heard = hear(w)
            err = errors(line['say'], heard)
            gap = longest_gap(w, sr)
            wps = nwords / max(0.3, len(w) / sr)
            ok = err == 0 and gap <= (1.3 if '…' in line['say'] else 0.85) and 0.8 <= wps <= 5.0
            score = (err, gap)
            if best is None or score < best[0]:
                best = (score, w, heard, k)
            if ok:
                break
        (err, gap), w, heard, k = best
        if err == 0 and ok:
            sf.write(os.path.join(OUT, line['key'] + '.mp3'), finish(w, sr, line['who']), sr, format='MP3')
            manifest[line['key']] = {'who': line['who'], 'say': line['say'], 'mood': mood, 'take': k + 1}
            status = f'ok (take {k + 1})'
        else:
            sf.write(os.path.join(MODELS, 'review', line['key'] + '.wav'), w, sr)
            review[line['key']] = {'who': line['who'], 'say': line['say'], 'heard': heard, 'errors': err, 'gap': round(gap, 2)}
            manifest.pop(line['key'], None)
            status = f'NOT KEPT: heard "{heard.strip()}"'
        done = i + 1
        eta = (time.time() - t0) / done * (len(todo) - done) / 60
        print(f'[{done}/{len(todo)}] {line["who"]:8s} {status} · {eta:.0f} min left', flush=True)
        save(manifest, lines)
    save(manifest, lines)
    json.dump(review, open(os.path.join(MODELS, 'voices-review.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
    print(f'kept {len(manifest)} of {len(lines)}; {len(review)} left to the phone voice this run', flush=True)


def save(manifest, lines):
    keys = {l['key'] for l in lines}
    kept = sorted(k for k in manifest if k in keys and os.path.exists(os.path.join(OUT, k + '.mp3')))
    json.dump({k: manifest[k] for k in kept}, open(MANIFEST, 'w', encoding='utf-8', newline='\n'), indent=1, ensure_ascii=False)
    js = ('// Generated by scripts/voices/record.py: the lines with a recording in public/voices/ (see voicekey.js).\n'
          'export const VOICED = new Set(' + json.dumps(kept) + ');\n')
    open(os.path.join(REPO, 'src', 'content', 'voices.js'), 'w', encoding='utf-8', newline='\n').write(js)


if __name__ == '__main__':
    main()
