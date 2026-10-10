import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { CHECK_DELAY_FRAMES } from "../timings";
import { Card } from "./Card";

type CheckItemProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  label: string;
  shine?: boolean;
};

export const CheckItem: React.FC<CheckItemProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  label,
  shine,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkScale = spring({
    frame: frame - (enterFrame + CHECK_DELAY_FRAMES),
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.6 },
  });

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      exitDuration={exitDuration}
      shine={shine}
      style={{ flexDirection: "row", gap: 28, textAlign: "left" }}
    >
      <svg
        width={68}
        height={68}
        viewBox="0 0 64 64"
        style={{ flexShrink: 0, transform: `scale(${checkScale})` }}
      >
        <circle cx="32" cy="32" r="32" fill={COLORS.green} />
        <path
          d="M18 33 L28 43 L46 23"
          fill="none"
          stroke={COLORS.white}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontSize: 54 }}>{label}</span>
    </Card>
  );
};