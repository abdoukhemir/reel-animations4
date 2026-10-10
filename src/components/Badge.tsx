import React from "react";
import { COLORS, FONT_FAMILY, SHADOW } from "../theme";
import { usePopInOut } from "./Card";

type BadgeProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
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
        gap: 16,
        backgroundColor: COLORS.orange,
        color: COLORS.white,
        fontFamily: FONT_FAMILY,
        fontWeight: 700,
        fontSize: 48,
        lineHeight: 1.1,
        padding: "16px 40px",
        borderRadius: 999,
        boxShadow: SHADOW,
        whiteSpace: "nowrap",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {icon ? <div style={{ display: "flex", flexShrink: 0 }}>{icon}</div> : null}
      <span>{children}</span>
    </div>
  );
};