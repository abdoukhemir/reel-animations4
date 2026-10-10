import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

const HEIGHTS = [34, 62, 90, 120];
/** Frames between two bars. */
export const BAR_STEP = 10;

type GrowthCardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

/** Four bars rising one after the other: the tools get better step by step. */
export const GrowthCard: React.FC<GrowthCardProps> = ({ enterFrame, exitFrame, exitDuration }) => {
  const frame = useCurrentFrame();

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      exitDuration={exitDuration}
      style={{ flexDirection: "row", gap: 44, padding: "24px 60px", textAlign: "left" }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 120 }}>
        {HEIGHTS.map((h, i) => {
          const grow = ramp(frame, enterFrame + 4 + i * BAR_STEP, 16);
          const last = i === HEIGHTS.length - 1;
          return (
            <div
              key={i}
              style={{
                width: 38,
                height: h * grow,
                borderRadius: 10,
                backgroundColor: last ? COLORS.orange : COLORS.darkBlue,
                opacity: last ? 1 : 0.45 + i * 0.15,
              }}
            />
          );
        })}
      </div>
      <span style={{ fontSize: 50, lineHeight: 1.15 }}>
        Vos outils
        <br />
        évoluent
      </span>
    </Card>
  );
};
