import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ramp } from "../anim";

type FloatProps = {
  /** Frame (with OVERLAY_OFFSET) where the element lands; the float fades in right after. */
  from: number;
  /** Pixels up and down. */
  amplitude?: number;
  /** Seconds for one full up-and-down. */
  period?: number;
  /** Offsets the rhythm so neighbouring elements don't move in lockstep. */
  phase?: number;
  children: React.ReactNode;
};

/** Makes whatever it wraps hover very gently, like it is floating above the video. */
export const Float: React.FC<FloatProps> = ({
  from,
  amplitude = 6,
  period = 2.8,
  phase = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame - from) / fps;
  const grow = ramp(frame, from + 10, 20, (x) => x);
  const angle = (t / period) * 2 * Math.PI + phase;
  const y = Math.sin(angle) * amplitude * grow;
  const tilt = Math.sin(angle * 0.5) * 0.3 * grow;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${y}px) rotate(${tilt}deg)`,
      }}
    >
      {children}
    </div>
  );
};
