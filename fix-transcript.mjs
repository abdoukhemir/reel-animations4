import fs from 'fs';

const words = JSON.parse(fs.readFileSync('transcript.words.json', 'utf8'));
const strip = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

words.forEach((w, i) => {
  let t = w.word;
  if (/isaya\.fr/i.test(t)) t = t.replace(/isaya\.fr/i, 'izaia.fr');
  else if (/isaya/i.test(t)) t = t.replace(/isaya/i, 'IZAIA');
  if (/^pressions/i.test(t)) t = t.replace(/^pressions/i, 'relances');
  if (/^promptes/i.test(t)) t = t.replace(/^promptes/i, 'prompts');
  if (strip(t).startsWith('rgpd') && i > 0) {
    const prev = strip(words[i - 1].word).replace(/[^a-z]/g, '');
    if (prev === 'des') words[i - 1].word = words[i - 1].word.replace(/des/i, 'du');
  }
  w.word = t;
});

fs.writeFileSync('transcript.words.json', JSON.stringify(words, null, 2));

const lines = [];
let cur = [];
for (const w of words) {
  cur.push(w);
  if (/[.?!]$/.test(w.word)) { lines.push(cur); cur = []; }
}
if (cur.length) lines.push(cur);
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
fs.writeFileSync(
  'transcript.txt',
  lines.map((l) => `[${fmt(l[0].start)}] ${l.map((x) => x.word).join(' ')}`).join('\n')
);
console.log(fs.readFileSync('transcript.txt', 'utf8'));