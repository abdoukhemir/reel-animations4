import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, RADIUS, SHADOW } from "../theme";
import { POP_IN, POP_OUT } from "../timings";

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
    config: { damping: 12, stiffness: 200, mass: 0.6 },
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
    interpolate(inProgress, [0, 1], [0.7, 1]) *
    interpolate(outProgress, [0, 1], [1, 0.85]);

  return { visible, opacity, scale };
};

type CardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  style,
  children,
}) => {
  const { visible, opacity, scale } = usePopInOut(enterFrame, exitFrame, exitDuration);

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
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};