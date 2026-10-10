import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

const RADIUS = 120;
const ARC_LENGTH = Math.PI * RADIUS;
const ARC_PATH = "M30 150 A120 120 0 0 1 270 150";

const Gauge: React.FC<{ enterFrame: number }> = ({ enterFrame }) => {
  const frame = useCurrentFrame();

  const sweep = ramp(frame, enterFrame + 4, 30, Easing.out(Easing.cubic));
  const value = 0.08 + 0.84 * sweep;
  // A small, calm tremble once the needle has arrived.
  const wobble = Math.sin((frame - enterFrame) * 0.9) * 1.2 * ramp(frame, enterFrame + 34, 10);
  const angle = -90 + 180 * value + wobble;

  return (
    <svg width={300} height={170} viewBox="0 0 300 170" style={{ flexShrink: 0, display: "block" }}>
      <path
        d={ARC_PATH}
        fill="none"
        stroke="rgba(30, 58, 95, 0.12)"
        strokeWidth={18}
        strokeLinecap="round"
      />
      <path
        d={ARC_PATH}
        fill="none"
        stroke={COLORS.orange}
        strokeWidth={18}
        strokeLinecap="round"
        strokeDasharray={ARC_LENGTH}
        strokeDashoffset={ARC_LENGTH * (1 - value)}
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={150}
          y1={36}
          x2={150}
          y2={48}
          stroke={COLORS.darkBlue}
          strokeOpacity={0.35}
          strokeWidth={4}
          strokeLinecap="round"
          transform={`rotate(${-90 + i * 30} 150 150)`}
        />
      ))}
      <g transform={`rotate(${angle} 150 150)`}>
        <line
          x1={150}
          y1={150}
          x2={150}
          y2={58}
          stroke={COLORS.darkBlue}
          strokeWidth={7}
          strokeLinecap="round"
        />
      </g>
      <circle cx={150} cy={150} r={11} fill={COLORS.darkBlue} />
    </svg>
  );
};

type SpeedGaugeProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({ enterFrame, exitFrame, exitDuration }) => (
  <Card
    enterFrame={enterFrame}
    exitFrame={exitFrame}
    exitDuration={exitDuration}
    shine
    style={{ flexDirection: "row", gap: 36, padding: "20px 52px 20px 36px", textAlign: "left" }}
  >
    <Gauge enterFrame={enterFrame} />
    <span style={{ fontSize: 48, lineHeight: 1.2 }}>
      La vitesse
      <br />
      de l'IA
    </span>
  </Card>
);
