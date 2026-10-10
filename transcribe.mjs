import path from 'path';
import fs from 'fs';
import {installWhisperCpp, downloadWhisperModel, transcribe} from '@remotion/install-whisper-cpp';

const to = path.join(process.cwd(), 'whisper.cpp');
await installWhisperCpp({to, version: '1.5.5'});
await downloadWhisperModel({model: 'medium', folder: to});

const {transcription} = await transcribe({
  model: 'medium',
  whisperPath: to,
  whisperCppVersion: '1.5.5',
  inputPath: path.join(process.cwd(), 'audio.wav'),
  tokenLevelTimestamps: true,
  language: 'fr',
});

const words = [];
for (const t of transcription) {
  const text = t.text;
  if (!text || /^\[.*\]$/.test(text.trim())) continue;
  const start = t.offsets.from / 1000;
  const end = t.offsets.to / 1000;
  if (text.startsWith(' ') || words.length === 0) {
    words.push({word: text.trim(), start, end});
  } else {
    const w = words[words.length - 1];
    w.word += text.trim();
    w.end = end;
  }
}
fs.writeFileSync('transcript.words.json', JSON.stringify(words, null, 2));

let lines = [], cur = [];
for (const w of words) {
  cur.push(w);
  if (/[.?!]$/.test(w.word)) { lines.push(cur); cur = []; }
}
if (cur.length) lines.push(cur);
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
fs.writeFileSync('transcript.txt', lines.map(l => `[${fmt(l[0].start)}] ${l.map(x => x.word).join(' ')}`).join('\n'));
console.log('Done:', words.length, 'words');