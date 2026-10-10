import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, RADIUS, SHADOW } from "../theme";
import { POP_IN, POP_OUT } from "../timings";
import { ShineSweep } from "./ShineSweep";

/** Shared spring pop-in plus fade-and-scale-out. Frames already include OVERLAY_OFFSET. */
export const usePopInOut = (
  enterFrame: number,
  exitFrame?: number,
  exitDuration: number = POP_OUT
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterFrame;

  const inProgress = spring({
    frame: local,
    fps,
    durationInFrames: Math.round(POP_IN * fps),
    config: { damping: 18, stiffness: 150, mass: 0.7 },
  });

  const outFrames = Math.max(1, Math.round(exitDuration * fps));
  const outProgress =
    exitFrame === undefined
      ? 0
      : interpolate(frame, [exitFrame, exitFrame + outFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const visible = local >= 0 && outProgress < 1;
  const opacity =
    interpolate(inProgress, [0, 0.4], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    (1 - outProgress);
  const scale =
    interpolate(inProgress, [0, 1], [0.94, 1]) *
    interpolate(outProgress, [0, 1], [1, 0.96]);
  // Slides up into place, drifts up a little when leaving.
  const y =
    interpolate(inProgress, [0, 1], [34, 0]) + interpolate(outProgress, [0, 1], [0, -14]);

  return { visible, opacity, scale, y };
};

type CardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  style?: React.CSSProperties;
  /** One light sweep across the card right after it lands. */
  shine?: boolean;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  style,
  shine,
  children,
}) => {
  const { visible, opacity, scale, y } = usePopInOut(enterFrame, exitFrame, exitDuration);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.beige,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
        padding: "28px 44px",
        color: COLORS.darkBlue,
        fontFamily: FONT_FAMILY,
        fontWeight: 700,
        fontSize: 56,
        lineHeight: 1.15,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 960,
        boxSizing: "border-box",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        ...(shine ? ({ position: "relative", overflow: "hidden" } as const) : {}),
        ...style,
      }}
    >
      {children}
      {shine ? <ShineSweep start={enterFrame + 8} /> : null}
    </div>
  );
};