import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

type NameTagProps = {
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  name: string;
  brand: string;
};

/** Lower-third style name tag: an accent bar grows next to the name and the brand. */
export const NameTag: React.FC<NameTagProps> = ({
  enterFrame,
  exitFrame,
  exitDuration,
  name,
  brand,
}) => {
  const frame = useCurrentFrame();
  const bar = ramp(frame, enterFrame + 3, 16);
  const sub = ramp(frame, enterFrame + 8, 14);

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      exitDuration={exitDuration}
      style={{ flexDirection: "row", gap: 30, padding: "28px 64px 28px 44px", textAlign: "left" }}
    >
      <div
        style={{
          width: 10,
          height: 104 * bar,
          borderRadius: 5,
          backgroundColor: COLORS.orange,
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 72, lineHeight: 1.05 }}>{name}</span>
        <span
          style={{
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 6,
            color: COLORS.orange,
            opacity: sub,
            transform: `translateX(${(1 - sub) * -16}px)`,
          }}
        >
          {brand}
        </span>
      </div>
    </Card>
  );
};
