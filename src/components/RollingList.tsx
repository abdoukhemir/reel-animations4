import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp } from "../anim";
import { Chip } from "./Chip";
import { ZONE_HEIGHT, ZONE_SIDE } from "./Zone";

export type RollingItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  /** Frame (with OVERLAY_OFFSET) where the item arrives. */
  enterFrame: number;
};

type RollingListProps = {
  items: RollingItem[];
  exitFrame?: number;
  exitDuration?: number;
};

/** Where the newest item sits (top of the pill) and how far older items move up. */
const NEWEST_TOP = 214;
const STEP = 100;

/**
 * A stack that builds itself: each new item rises into the bottom row while the older ones
 * slide up, shrink and fade, so the viewer sees the list grow without it ever filling the screen.
 */
export const RollingList: React.FC<RollingListProps> = ({ items, exitFrame, exitDuration = 0.35 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exitFrames = Math.max(1, Math.round(exitDuration * fps));
  const out = exitFrame === undefined ? 0 : ramp(frame, exitFrame, exitFrames, (t) => t);

  const progress = items.map((item) =>
    spring({
      frame: frame - item.enterFrame,
      fps,
      config: { damping: 20, stiffness: 140, mass: 0.8 },
    })
  );

  return (
    <div style={{ position: "relative", width: 1080 - 2 * ZONE_SIDE, height: ZONE_HEIGHT }}>
      {items.map((item, i) => {
        if (frame < item.enterFrame) {
          return null;
        }

        // How many newer items have arrived (smooth, fractional).
        let age = 0;
        for (let j = i + 1; j < items.length; j++) {
          age += progress[j];
        }

        const p = progress[i];
        const opacity =
          interpolate(age, [0, 1, 2, 2.7], [1, 0.55, 0.25, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) *
          interpolate(p, [0, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
          (1 - out);
        const scale = 1 - 0.06 * Math.min(age, 3);
        const top = NEWEST_TOP - STEP * age + (1 - p) * 70;

        return (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top,
              display: "flex",
              justifyContent: "center",
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: "50% 50%",
            }}
          >
            {/* enterFrame far in the past: the chip is already settled, motion is handled here */}
            <Chip enterFrame={-10000} icon={item.icon}>
              {item.label}
            </Chip>
          </div>
        );
      })}
    </div>
  );
};
