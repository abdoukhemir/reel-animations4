import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

type RowProps = { label: string; color: string; progress: number };

const Row: React.FC<RowProps> = ({ label, color, progress }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
    <span style={{ width: 350, fontSize: 36, flexShrink: 0 }}>{label}</span>
    <div
      style={{
        flex: 1,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(30, 58, 95, 0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          borderRadius: 11,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
);

type RaceCardProps = {
  enterFrame: number;
  /** Frame where the AI bar takes off. */
  accelerateFrame: number;
  exitFrame?: number;
};

/** Two bars: the AI sprints ahead while the company moves at a steady pace. */
export const RaceCard: React.FC<RaceCardProps> = ({ enterFrame, accelerateFrame, exitFrame }) => {
  const frame = useCurrentFrame();

  const warmup = ramp(frame, enterFrame, 18);
  const ai = 0.16 * warmup + 0.84 * ramp(frame, accelerateFrame, 27, Easing.out(Easing.exp));
  const company = 0.14 * warmup + 0.1 * ramp(frame, accelerateFrame, 48, Easing.linear);

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      style={{
        flexDirection: "column",
        alignItems: "stretch",
        gap: 26,
        padding: "32px 44px",
        width: 900,
        textAlign: "left",
        fontSize: 36,
      }}
    >
      <Row label="L'IA" color={COLORS.orange} progress={ai} />
      <Row label="Votre entreprise" color={COLORS.darkBlue} progress={company} />
    </Card>
  );
};
