import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

const BARS = [
  { x: 14, y: 84, h: 26 },
  { x: 44, y: 62, h: 48 },
  { x: 74, y: 44, h: 66 },
  { x: 104, y: 26, h: 84 },
];

const Climb: React.FC<{ enterFrame: number }> = ({ enterFrame }) => {
  const frame = useCurrentFrame();
  const draw = ramp(frame, enterFrame + 6, 24, Easing.inOut(Easing.cubic));
  const tip = ramp(frame, enterFrame + 28, 8);
  const pulse = frame > enterFrame + 32 ? ((frame - enterFrame - 32) % 36) / 36 : 0;

  return (
    <svg width={140} height={130} viewBox="0 0 140 130" style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
      {BARS.map((bar, i) => {
        const g = ramp(frame, enterFrame + 2 + i * 3, 12);
        return (
          <rect
            key={i}
            x={bar.x}
            y={bar.y + bar.h * (1 - g)}
            width={18}
            height={bar.h * g}
            rx={5}
            fill={COLORS.darkBlue}
            fillOpacity={0.18}
          />
        );
      })}
      <path
        d="M14 100 L48 68 L74 82 L116 26"
        pathLength={1}
        fill="none"
        stroke={COLORS.orange}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
      {tip > 0 && (
        <>
          <circle cx={116} cy={26} r={12 * tip} fill={COLORS.darkBlue} />
          {pulse > 0 && (
            <circle cx={116} cy={26} r={12 + pulse * 22} fill="none" stroke={COLORS.orange} strokeWidth={4} strokeOpacity={(1 - pulse) * 0.6} />
          )}
        </>
      )}
    </svg>
  );
};

type TopCardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

export const TopCard: React.FC<TopCardProps> = ({ enterFrame, exitFrame, exitDuration }) => (
  <Card
    enterFrame={enterFrame}
    exitFrame={exitFrame}
    exitDuration={exitDuration}
    style={{ flexDirection: "row", gap: 40, padding: "22px 72px 22px 52px", textAlign: "left" }}
  >
    <Climb enterFrame={enterFrame} />
    <span style={{ fontSize: 56, lineHeight: 1.12 }}>
      Au top
      <br />
      de l'IA
    </span>
  </Card>
);
