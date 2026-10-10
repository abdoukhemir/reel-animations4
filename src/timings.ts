export const FPS = 30;

/** Shifts every overlay AND every sound together (seconds, can be negative). */
export const OVERLAY_OFFSET = 0;

/** An element appears this long before its trigger word starts (seconds). */
export const LEAD = 0.15;

/** Motion durations (seconds). */
export const POP_IN = 0.4;
export const POP_OUT = 0.25;
export const SCENE_FADE_OUT = 0.4;
/** Minimum empty time between a scene's exit and the next scene's first element (seconds). */
export const SCENE_GAP = 0.25;
/** The check icon pops this many frames after its card. */
export const CHECK_DELAY_FRAMES = 3;

/** Scenes that end on their own: exit this long after the last item's trigger (seconds). */
export const FORMATION_EXIT_AFTER = 1.2;
export const TWODAYS_EXIT_AFTER = 1.2;

export type SfxName =
  | "blip"
  | "check"
  | "chime"
  | "clock-rise"
  | "outro"
  | "pop"
  | "shimmer"
  | "step-1"
  | "step-2"
  | "step-3"
  | "success"
  | "tap"
  | "whoosh";

export const SFX_VOLUMES: Record<SfxName, number> = {
  pop: 0.25,
  check: 0.25,
  blip: 0.25,
  tap: 0.25,
  "step-1": 0.25,
  "step-2": 0.25,
  "step-3": 0.25,
  whoosh: 0.15,
  chime: 0.3,
  success: 0.3,
  shimmer: 0.3,
  outro: 0.3,
  "clock-rise": 0.3,
};

export type Trigger = {
  id: string;
  /** Plain keyword, matched with "contains" after normalization. */
  word: string;
  /** Fallback time in seconds if the keyword isn't found (rough guess, only used on failure). */
  after: number;
};

/** ONE list, in spoken order: each search starts after the previous match. */
export const TRIGGERS: Trigger[] = [
  // Topics
  { id: "topics-baux", word: "baux", after: 1.5 },
  { id: "topics-mails", word: "mails", after: 2.5 },
  { id: "topics-sinistres", word: "sinistres", after: 3.5 },
  { id: "topics-devis", word: "devis", after: 4.5 },
  { id: "topics-assemblees", word: "assemblees", after: 5.5 },
  { id: "topics-recrutements", word: "recrutements", after: 7 },
  { id: "topics-coproprietaires", word: "coproprietaires", after: 8.5 },
  // Intro
  { id: "intro-elvira", word: "elvira", after: 10 },
  { id: "intro-minute", word: "minute", after: 13 },
  // Formation 1 jour
  { id: "formation-badge", word: "resultats", after: 15 },
  { id: "formation-mails", word: "mails", after: 17 },
  { id: "formation-bail", word: "bail", after: 21 },
  { id: "formation-convocation", word: "convocation", after: 22 },
  { id: "formation-relancer", word: "relancer", after: 24 },
  { id: "formation-suivre", word: "suivre", after: 25.5 },
  // Security
  { id: "security-securite", word: "securite", after: 28 },
  { id: "security-rgpd", word: "rgpd", after: 31 },
  // Formation 2 jours
  { id: "twodays-deux", word: "deux", after: 34 },
  { id: "twodays-consecutifs", word: "consecutifs", after: 36 },
  { id: "twodays-proces", word: "proces", after: 39 },
  { id: "twodays-comparer", word: "comparer", after: 41 },
  { id: "twodays-modele", word: "modele", after: 43 },
  // Library
  { id: "library-bibliotheque", word: "bibliotheque", after: 47 },
  { id: "library-outils", word: "outils", after: 50 },
  // Always evolving
  { id: "evolving-evolue", word: "evolue", after: 54 },
  // Outsourced AI manager
  { id: "manager-responsable", word: "responsable", after: 58 },
  { id: "manager-accompagnons", word: "accompagnons", after: 61 },
  { id: "manager-evoluer", word: "evoluer", after: 64 },
  // Closing
  { id: "closing-longueur", word: "longueur", after: 68 },
  { id: "closing-contactez", word: "contactez", after: 70.5 },
];