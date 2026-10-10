import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../theme";
import { WORDS } from "../triggers";

/** Captions sit just under the overlay zone (Zone.tsx ends at y 1500). */
const CAPTION_TOP = 1520;
const CAPTION_HEIGHT = 190;
const SIDE = 60;

const MAX_WORDS = 4;
const MAX_CHARS = 28;
/** A comma needs this many words before it may end a caption. */
const MIN_BEFORE_BREAK = 2;
/** A pause longer than this (seconds) always starts a new caption. */
const PAUSE = 0.45;
/** A caption stays on screen this long after its last word (seconds). */
const HOLD_AFTER = 0.35;

type CapWord = { text: string; start: number; end: number };
type Chunk = { words: CapWord[]; start: number; end: number };

const buildChunks = (): Chunk[] => {
  // Glue lone punctuation tokens ("?", "!") onto the previous word.
  const merged: CapWord[] = [];
  for (const w of WORDS) {
    const text = w.word.trim();
    if (!text) {
      continue;
    }
    if (/^[?!.,;:…]+$/.test(text) && merged.length > 0) {
      const last = merged[merged.length - 1];
      last.text += text;
      last.end = Math.max(last.end, w.end);
      continue;
    }
    merged.push({ text, start: w.start, end: w.end });
  }

  const chunks: Chunk[] = [];
  let current: CapWord[] = [];
  const flush = () => {
    if (current.length > 0) {
      chunks.push({
        words: current,
        start: current[0].start,
        end: current[current.length - 1].end,
      });
      current = [];
    }
  };

  for (const w of merged) {
    if (current.length > 0) {
      const prev = current[current.length - 1];
      const chars = current.reduce((n, x) => n + x.text.length + 1, 0) + w.text.length;
      const sentenceEnd = /[.?!]$/.test(prev.text);
      const softBreak = /[,;:]$/.test(prev.text) && current.length >= MIN_BEFORE_BREAK;
      if (
        sentenceEnd ||
        softBreak ||
        current.length >= MAX_WORDS ||
        chars > MAX_CHARS ||
        w.start - prev.end > PAUSE
      ) {
        flush();
      }
    }
    current.push(w);
  }
  flush();

  return chunks;
};

// Built once per bundle.
const CHUNKS = buildChunks();

export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const index = CHUNKS.findIndex((chunk, i) => {
    const next = CHUNKS[i + 1];
    const until = Math.min(next ? next.start : Number.POSITIVE_INFINITY, chunk.end + HOLD_AFTER);
    return t >= chunk.start && t < until;
  });

  if (index < 0) {
    return null;
  }

  const chunk = CHUNKS[index];

  return (
    <div
      style={{
        position: "absolute",
        top: CAPTION_TOP,
        left: SIDE,
        right: SIDE,
        height: CAPTION_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        key={index}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 20,
          rowGap: 4,
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize: 68,
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        {chunk.words.map((word, i) => {
          const local = frame - Math.round(word.start * fps);
          const nextStart = chunk.words[i + 1]?.start ?? Number.POSITIVE_INFINITY;
          const active = t >= word.start && t < nextStart;

          const pop = spring({
            frame: local,
            fps,
            durationInFrames: 10,
            config: { damping: 14, stiffness: 260, mass: 0.5 },
          });
          const scale = interpolate(pop, [0, 1], [0.6, 1]) * (active ? 1.07 : 1);
          const lift = interpolate(pop, [0, 1], [16, 0]);

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                color: active ? COLORS.orange : COLORS.white,
                // Words are in the layout from the start (no jumping) but invisible until spoken.
                opacity: local >= 0 ? 1 : 0,
                transform: `translateY(${lift}px) scale(${scale})`,
                WebkitTextStroke: `12px ${COLORS.darkBlue}`,
                paintOrder: "stroke fill",
                textShadow: "0 8px 20px rgba(30, 58, 95, 0.45)",
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
