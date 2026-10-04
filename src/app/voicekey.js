// The key of a recorded line: who says it and the exact script text (with {name} still in it). The recordings in
// public/voices/ are named by it, so a line whose words change simply has no recording until it is recorded again.

export function voiceKey(who, text) {
  let h = 0x811c9dc5;
  const s = `${who || 'narrator'}|${text}`;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(16).padStart(8, '0');
}
