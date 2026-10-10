import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";

type BrandLockupProps = {
  enterFrame: number;
};

/** End card: IZAIA wordmark with a pulsing dot, drawn underline, tagline, site, and one light sweep. */
export const BrandLockup: React.FC<BrandLockupProps> = ({ enterFrame }) => {
  const frame = useCurrentFrame();
  const underline = ramp(frame, enterFrame + 14, 20);
  const shine = ramp(frame, enterFrame + 12, 26, Easing.inOut(Easing.cubic));
  const pulse = frame >= enterFrame ? ((frame - enterFrame) % 40) / 40 : 0;

  return (
    <Card
      enterFrame={enterFrame}
      style={{
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        padding: "30px 84px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
        <span style={{ fontSize: 108, lineHeight: 1, letterSpacing: 4 }}>IZAIA</span>
        <span style={{ position: "relative", width: 26, height: 26, marginBottom: 12, flexShrink: 0 }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: COLORS.orange,
            }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `4px solid ${COLORS.orange}`,
              opacity: (1 - pulse) * 0.6,
              transform: `scale(${1 + pulse * 1.4})`,
            }}
          />
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          width: `${underline * 100}%`,
          backgroundColor: COLORS.orange,
        }}
      />
      <span style={{ fontSize: 40, fontWeight: 600, color: COLORS.orange, marginTop: 6 }}>
        Directeur IA externalisé
      </span>
      <span style={{ fontSize: 46, fontWeight: 600 }}>izaia.fr</span>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 150,
          left: `${-25 + shine * 135}%`,
          background:
            "linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.75), rgba(255,255,255,0))",
          transform: "skewX(-18deg)",
          pointerEvents: "none",
        }}
      />
    </Card>
  );
};
