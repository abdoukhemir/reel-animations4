import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";

type ShineSweepProps = {
  /** Frame where the sweep starts. */
  start: number;
  /** Frames the sweep takes to cross the card. */
  duration?: number;
};

/** A soft diagonal light that crosses its (position: relative, overflow: hidden) parent once. */
export const ShineSweep: React.FC<ShineSweepProps> = ({ start, duration = 26 }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, start, duration, Easing.inOut(Easing.cubic));

  if (frame < start || p >= 1) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "24%",
        left: `${-30 + p * 140}%`,
        background:
          "linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0))",
        transform: "skewX(-18deg)",
        pointerEvents: "none",
      }}
    />
  );
};
