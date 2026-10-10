import transcript from "../transcript.words.json";
import { FPS, LEAD, OVERLAY_OFFSET, TRIGGERS } from "./timings";

type Word = { word: string; start: number; end: number };
const WORDS = transcript as unknown as Word[];

/** Lowercase, accents removed, punctuation and spaces removed. */
export const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

export const secToFrame = (seconds: number): number => Math.round(seconds * FPS);

const resolveAll = (): Map<string, number> => {
  const result = new Map<string, number>();
  let searchFrom = 0;

  for (const trigger of TRIGGERS) {
    const key = normalize(trigger.word);
    let found = -1;

    for (let i = searchFrom; i < WORDS.length; i++) {
      if (key.length > 0 && normalize(WORDS[i].word).includes(key)) {
        found = i;
        break;
      }
    }

    if (found >= 0) {
      result.set(trigger.id, WORDS[found].start);
      searchFrom = found + 1;
    } else {
      console.warn(
        `[triggers] "${trigger.id}": keyword "${trigger.word}" not found, using fallback ${trigger.after}s`
      );
      result.set(trigger.id, trigger.after);
    }
  }

  return result;
};

// Memoized: resolved once per bundle, not on every frame.
let cache: Map<string, number> | null = null;

export const getTriggerTimes = (): Map<string, number> => {
  if (!cache) {
    cache = resolveAll();
  }
  return cache;
};

/** Trigger word start time in seconds (no LEAD, no offset). */
export const triggerSec = (id: string): number => {
  const t = getTriggerTimes().get(id);
  if (t === undefined) {
    throw new Error(`Unknown trigger id: ${id}`);
  }
  return t;
};

/** Base frame when the element should appear (trigger minus LEAD), WITHOUT offset. Pass this to <Sfx>. */
export const cueFrame = (id: string): number => secToFrame(triggerSec(id) - LEAD);

/** Applies OVERLAY_OFFSET to a base frame. Use it for visuals; <Sfx> applies it itself. */
export const withOffset = (frame: number): number => frame + secToFrame(OVERLAY_OFFSET);