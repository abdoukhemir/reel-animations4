import { POP_OUT, SCENE_GAP } from "./timings";
import { cueFrame, secToFrame } from "./triggers";

export type SceneKey =
  | "topics"
  | "intro"
  | "formation"
  | "security"
  | "twodays"
  | "library"
  | "evolving"
  | "manager"
  | "closing";

/** Scenes in chronological order, with the trigger that opens each one. */
export const SCENES: ReadonlyArray<{ key: SceneKey; first: string }> = [
  { key: "topics", first: "topics-baux" },
  { key: "intro", first: "intro-elvira" },
  { key: "formation", first: "formation-badge" },
  { key: "security", first: "security-securite" },
  { key: "twodays", first: "twodays-deux" },
  { key: "library", first: "library-bibliotheque" },
  { key: "evolving", first: "evolving-evolue" },
  { key: "manager", first: "manager-responsable" },
  { key: "closing", first: "closing-longueur" },
];

/**
 * Base frame (no OVERLAY_OFFSET) where a scene's fade-out starts.
 * - The fade is fully finished by the time the next scene's first element enters,
 *   with at least SCENE_GAP between the start of the fade and the next scene.
 * - naturalBase (optional) is the scene's own end; it is clamped to that limit.
 * - The last scene never exits (Closing does not call this).
 */
export const sceneExit = (
  key: SceneKey,
  fadeSec: number = POP_OUT,
  naturalBase?: number
): number => {
  const index = SCENES.findIndex((scene) => scene.key === key);
  const next = SCENES[index + 1];

  if (!next) {
    return naturalBase ?? Number.POSITIVE_INFINITY;
  }

  const latest = cueFrame(next.first) - secToFrame(Math.max(SCENE_GAP, fadeSec));
  return naturalBase === undefined ? latest : Math.min(naturalBase, latest);
};