import { loadFont } from "@remotion/google-fonts/Poppins";

export const COLORS = {
  beige: "#F5EBDD",
  orange: "#F28C38",
  green: "#22C55E",
  darkBlue: "#1E3A5F",
  white: "#FFFFFF",
};

export const SHADOW = "0 8px 24px rgba(30, 58, 95, 0.15)";
export const RADIUS = 28;

// loadFont registers its own delayRender; Reel.tsx also waits on waitUntilDone().
export const { fontFamily: FONT_FAMILY, waitUntilDone } = loadFont("normal", {
  weights: ["600", "700"],
  subsets: ["latin", "latin-ext"],
});