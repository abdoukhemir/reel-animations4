import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

const X0 = 20;
const X1 = 760;
const DOTS = 5;

const Line: React.FC<{ enterFrame: number }> = ({ enterFrame }) => {
  const frame = useCurrentFrame();
  const p = ramp(frame, enterFrame + 6, 42, Easing.inOut(Easing.cubic));
  const x = X0 + (X1 - X0) * p;
  const arrow = ramp(frame, enterFrame + 44, 8);

  return (
    <svg width={780} height={90} viewBox="0 0 780 90" style={{ display: "block" }}>
      <line x1={X0} y1={45} x2={X1} y2={45} stroke={COLORS.darkBlue} strokeOpacity={0.15} strokeWidth={8} strokeLinecap="round" />
      <line x1={X0} y1={45} x2={x} y2={45} stroke={COLORS.orange} strokeWidth={8} strokeLinecap="round" />
      {Array.from({ length: DOTS }).map((_, i) => {
        const at = i / (DOTS - 1);
        const s = interpolate(p, [at - 0.03, at + 0.05], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return <circle key={i} cx={X0 + (X1 - X0) * at} cy={45} r={13 * s} fill={COLORS.darkBlue} />;
      })}
      <polyline
        points="744,29 762,45 744,61"
        fill="none"
        stroke={COLORS.orange}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={arrow}
      />
      <circle cx={x} cy={45} r={17} fill={COLORS.white} stroke={COLORS.orange} strokeWidth={7} opacity={p > 0 && p < 1 ? 1 : 0} />
    </svg>
  );
};

type TimelineCardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

/** A line that draws itself across the card, dropping a milestone dot every step. */
export const TimelineCard: React.FC<TimelineCardProps> = ({ enterFrame, exitFrame, exitDuration }) => (
  <Card
    enterFrame={enterFrame}
    exitFrame={exitFrame}
    exitDuration={exitDuration}
    style={{ flexDirection: "column", gap: 14, padding: "26px 60px 30px", width: 900 }}
  >
    <span style={{ fontSize: 48 }}>Dans la durée</span>
    <Line enterFrame={enterFrame} />
  </Card>
);
