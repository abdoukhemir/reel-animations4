export const FPS = 30;

/** Voice track is 64.29 s -> 1929 frames at 30 fps. */
export const DURATION_FRAMES = 1929;

/** Word-by-word captions on/off. The component is kept; set to true to bring them back. */
export const SHOW_CAPTIONS = false;

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
  // Hook: "Une formation, c'est essentiel, mais l'IA évolue plus vite que votre entreprise"
  { id: "hook-formation", word: "formation", after: 0.2 },
  { id: "hook-essentiel", word: "essentiel", after: 1.1 },
  { id: "hook-evolue", word: "evolue", after: 3.4 },
  { id: "hook-vite", word: "vite", after: 3.9 },
  // Intro: "Bonjour, moi c'est Elvira de chez IZAIA"
  { id: "intro-elvira", word: "elvira", after: 6.6 },
  { id: "intro-izaia", word: "izaia", after: 7.5 },
  // Pace: new tools, new uses, "en une minute"
  { id: "pace-outils", word: "outils", after: 8.5 },
  { id: "pace-usages", word: "usages", after: 9.6 },
  { id: "pace-minute", word: "minute", after: 12 },
  { id: "pace-jour", word: "jour", after: 14.6 },
  { id: "pace-decrocher", word: "decrocher", after: 15.5 },
  // Problem: "c'est la vitesse à laquelle évolue l'IA"
  { id: "problem-probleme", word: "probleme", after: 16.3 },
  { id: "problem-equipes", word: "equipes", after: 17.3 },
  { id: "problem-vitesse", word: "vitesse", after: 18.2 },
  // Director: "le directeur IA externalisé"
  { id: "director-directeur", word: "directeur", after: 22.5 },
  { id: "director-ingenieur", word: "ingenieur", after: 25.9 },
  { id: "director-developpeur", word: "developpeur", after: 26.8 },
  { id: "director-expertise", word: "expertise", after: 28.7 },
  { id: "director-cout", word: "cout", after: 30.8 },
  { id: "director-inferieur", word: "inferieur", after: 31.2 },
  { id: "director-recrutement", word: "recrutement", after: 31.9 },
  // Connect: software, ERP, fixed monthly fee
  { id: "connect-connectons", word: "connectons", after: 32.8 },
  { id: "connect-logiciels", word: "logiciels", after: 35.3 },
  { id: "connect-erp", word: "erp", after: 36.8 },
  { id: "connect-mensualite", word: "mensualite", after: 37.3 },
  // Monthly evolution
  { id: "monthly-mois", word: "mois", after: 39.4 },
  { id: "monthly-evoluer", word: "evoluer", after: 40.3 },
  // Clients: what is already in place
  { id: "clients-mettons", word: "mettons", after: 43.6 },
  { id: "clients-clients", word: "clients", after: 44.4 },
  { id: "clients-agents", word: "agents", after: 44.8 },
  { id: "clients-loops", word: "loops", after: 45.5 },
  { id: "clients-automatisation", word: "automatisation", after: 45.8 },
  { id: "clients-assistants", word: "assistants", after: 47.4 },
  { id: "clients-standards", word: "standards", after: 48.3 },
  { id: "clients-bases", word: "bases", after: 49.5 },
  { id: "clients-tableaux", word: "tableaux", after: 50.8 },
  // Goal: save time, stay on top of AI
  { id: "goal-objectif", word: "objectif", after: 53.1 },
  { id: "goal-gagner", word: "gagner", after: 54.2 },
  { id: "goal-rester", word: "rester", after: 55.8 },
  { id: "goal-top", word: "top", after: 56.3 },
  { id: "support-accompagner", word: "accompagner", after: 57.2 },
  // Support over time
  { id: "support-duree", word: "duree", after: 58 },
  { id: "support-decisif", word: "decisif", after: 59.1 },
  { id: "support-izaia", word: "izaia", after: 60.3 },
  { id: "closing-fait", word: "fait", after: 61.5 },
  // Closing: "on fait les deux", "À très bientôt chez IZAIA !"
  { id: "closing-deux", word: "deux", after: 61.9 },
  { id: "closing-bientot", word: "bientot", after: 62.8 },
  { id: "closing-chez", word: "chez", after: 63.3 },
  { id: "closing-izaia", word: "izaia", after: 63.5 },
];
