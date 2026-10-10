import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

type TitleCardProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

/** The key concept: "Directeur IA externalisé", with an underline that draws itself. */
export const TitleCard: React.FC<TitleCardProps> = ({ enterFrame, exitFrame, exitDuration }) => {
  const frame = useCurrentFrame();
  const underline = ramp(frame, enterFrame + 10, 20);

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      exitDuration={exitDuration}
      style={{ flexDirection: "column", alignItems: "center", gap: 12, padding: "32px 72px" }}
    >
      <span style={{ fontSize: 76, lineHeight: 1.05 }}>Directeur IA</span>
      <div style={{ position: "relative", paddingBottom: 10 }}>
        <span style={{ fontSize: 64, lineHeight: 1.1, color: COLORS.orange }}>externalisé</span>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 6,
            borderRadius: 3,
            width: `${underline * 100}%`,
            backgroundColor: COLORS.orange,
          }}
        />
      </div>
    </Card>
  );
};
