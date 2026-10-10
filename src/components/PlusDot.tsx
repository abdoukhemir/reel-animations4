import React from "react";
import { COLORS } from "../theme";
import { usePopInOut } from "./Card";

type PlusDotProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

export const PlusDot: React.FC<PlusDotProps> = ({ enterFrame, exitFrame, exitDuration }) => {
  const { visible, opacity, scale, y } = usePopInOut(enterFrame, exitFrame, exitDuration);

  if (!visible) {
    return null;
  }

  return (
    <svg
      width={68}
      height={68}
      viewBox="0 0 64 64"
      style={{
        display: "block",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        filter: "drop-shadow(0 6px 12px rgba(30, 58, 95, 0.25))",
      }}
    >
      <circle cx="32" cy="32" r="32" fill={COLORS.orange} />
      <path d="M32 16 V48 M16 32 H48" stroke={COLORS.white} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};
