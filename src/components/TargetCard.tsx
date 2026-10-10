import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

const RINGS = [
  { r: 66, o: 0.22 },
  { r: 46, o: 0.45 },
  { r: 26, o: 1 },
];

const Target: React.FC<{ enterFrame: number }> = ({ enterFrame }) => {
  const frame = useCurrentFrame();
  // The arrow flies in fast from the top right and hits the center.
  const t = ramp(frame, enterFrame + 16, 8, Easing.in(Easing.cubic));
  const impact = ramp(frame, enterFrame + 24, 14);

  return (
    <svg width={160} height={160} viewBox="0 0 160 160" style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
      <g transform="translate(80 80)">
        {RINGS.map((ring, i) => (
          <circle key={i} r={ring.r * ramp(frame, enterFrame + 2 + i * 4, 10)} fill={COLORS.orange} fillOpacity={ring.o} />
        ))}
        <circle r={8 * ramp(frame, enterFrame + 14, 6)} fill={COLORS.darkBlue} />
        {impact > 0 && impact < 1 && (
          <circle r={10 + impact * 46} fill="none" stroke={COLORS.orange} strokeWidth={5} strokeOpacity={1 - impact} />
        )}
        <g transform={`translate(${(1 - t) * 90} ${-(1 - t) * 90})`} opacity={t > 0 ? 1 : 0}>
          <line x1={0} y1={0} x2={52} y2={-52} stroke={COLORS.darkBlue} strokeWidth={6} strokeLinecap="round" />
          <polyline
            points="36,-52 52,-52 52,-36"
            fill="none"
            stroke={COLORS.orange}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

type TargetCardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

export const TargetCard: React.FC<TargetCardProps> = ({ enterFrame, exitFrame, exitDuration }) => (
  <Card
    enterFrame={enterFrame}
    exitFrame={exitFrame}
    exitDuration={exitDuration}
    style={{ flexDirection: "row", gap: 40, padding: "22px 80px 22px 56px", textAlign: "left" }}
  >
    <Target enterFrame={enterFrame} />
    <span style={{ fontSize: 60, lineHeight: 1.1 }}>
      Notre
      <br />
      objectif
    </span>
  </Card>
);
