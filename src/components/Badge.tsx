import React from "react";
import { COLORS, FONT_FAMILY, SHADOW } from "../theme";
import { ShineSweep } from "./ShineSweep";
import { usePopInOut } from "./Card";

type BadgeProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  icon?: React.ReactNode;
  /** One light sweep across the pill right after it lands. */
  shine?: boolean;
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  icon,
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
        transform: `translateY(${y}px) scale(${scale})`,
        ...(shine ? ({ position: "relative", overflow: "hidden" } as const) : {}),
      }}
    >
      {icon ? <div style={{ display: "flex", flexShrink: 0 }}>{icon}</div> : null}
      <span>{children}</span>
      {shine ? <ShineSweep start={enterFrame + 8} /> : null}
    </div>
  );
};