import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS, FONT_FAMILY, SHADOW } from "../theme";
import { usePopInOut } from "./Card";

const RAYS = 14;

type BurstBadgeProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  children: React.ReactNode;
};

/** A big orange word with a ring of rays that shoots outward once as it lands. */
export const BurstBadge: React.FC<BurstBadgeProps> = ({ enterFrame, exitFrame, exitDuration, children }) => {
  const frame = useCurrentFrame();
  const { visible, opacity, scale, y } = usePopInOut(enterFrame, exitFrame, exitDuration);

  if (!visible) {
    return null;
  }

  const burst = ramp(frame, enterFrame + 4, 16);
  const rayOpacity = interpolate(burst, [0, 0.15, 1], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", opacity, transform: `translateY(${y}px) scale(${scale})` }}>
      <svg
        width={760}
        height={300}
        viewBox="-380 -150 760 300"
        style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -380, marginTop: -150, overflow: "visible" }}
      >
        {Array.from({ length: RAYS }).map((_, i) => {
          const a = (i / RAYS) * 2 * Math.PI;
          const cx = Math.cos(a);
          const sy = Math.sin(a) * 0.55;
          const r1 = 175 + burst * 55;
          const r2 = r1 + 16 + 22 * (1 - burst);
          return (
            <line
              key={i}
              x1={cx * r1}
              y1={sy * r1}
              x2={cx * r2}
              y2={sy * r2}
              stroke={COLORS.orange}
              strokeWidth={6}
              strokeLinecap="round"
              strokeOpacity={rayOpacity}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "relative",
          backgroundColor: COLORS.orange,
          color: COLORS.white,
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize: 84,
          lineHeight: 1.1,
          padding: "16px 68px",
          borderRadius: 999,
          boxShadow: SHADOW,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </div>
  );
};
