import React from "react";
import { COLORS, FONT_FAMILY, SHADOW } from "../theme";
import { usePopInOut } from "./Card";

type ChipProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  dotColor?: string;
  /** Replaces the dot when given. */
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const Chip: React.FC<ChipProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  dotColor = COLORS.orange,
  icon,
  children,
}) => {
  const { visible, opacity, scale } = usePopInOut(enterFrame, exitFrame, exitDuration);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        backgroundColor: COLORS.beige,
        color: COLORS.darkBlue,
        fontFamily: FONT_FAMILY,
        fontWeight: 700,
        fontSize: 56,
        lineHeight: 1.15,
        padding: "18px 44px",
        borderRadius: 999,
        boxShadow: SHADOW,
        whiteSpace: "nowrap",
        maxWidth: 960,
        boxSizing: "border-box",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {icon ? (
        <div style={{ display: "flex", flexShrink: 0 }}>{icon}</div>
      ) : (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: dotColor,
            flexShrink: 0,
          }}
        />
      )}
      <span>{children}</span>
    </div>
  );
};