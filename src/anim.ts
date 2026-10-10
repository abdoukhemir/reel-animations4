import { Easing, interpolate } from "remotion";

/** 0 to 1 progress starting at `start`, lasting `durationFrames`. */
export const ramp = (
  frame: number,
  start: number,
  durationFrames: number,
  easing: (t: number) => number = Easing.out(Easing.cubic)
): number =>
  interpolate(frame, [start, start + durationFrames], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
