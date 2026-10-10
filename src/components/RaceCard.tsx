import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

type RowProps = {
  label: string;
  color: string;
  progress: number;
  /** A glowing dot rides at the end of the bar. */
  tip?: boolean;
  /** 0 to 1 while the bar is sprinting: white speed lines trail behind the tip. */
  streak?: number;
};

export const Row: React.FC<RowProps> = ({ label, color, progress, tip, streak = 0 }) => {
  const frame = useCurrentFrame();
  const glow = 10 + 8 * Math.sin(frame * 0.25);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <span style={{ width: 350, fontSize: 36, flexShrink: 0 }}>{label}</span>
      <div
        style={{
          flex: 1,
          height: 22,
          borderRadius: 11,
          backgroundColor: "rgba(30, 58, 95, 0.12)",
          position: "relative",
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
        {streak > 0 && streak < 1
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 4 + i * 6,
                  height: 3,
                  borderRadius: 2,
                  width: 50 + i * 18,
                  left: `calc(${progress * 100}% - ${70 + i * 18}px)`,
                  backgroundColor: "rgba(255, 255, 255, 0.85)",
                  opacity: 1 - streak,
                }}
              />
            ))
          : null}
        {tip && progress > 0.02 ? (
          <div
            style={{
              position: "absolute",
              top: -4,
              left: `calc(${progress * 100}% - 15px)`,
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 ${glow}px ${glow / 2}px ${color}`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

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
      shine
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
      <Row
        label="L'IA"
        color={COLORS.orange}
        progress={ai}
        tip
        streak={ramp(frame, accelerateFrame, 27, Easing.linear)}
      />
      <Row label="Votre entreprise" color={COLORS.darkBlue} progress={company} />
    </Card>
  );
};
