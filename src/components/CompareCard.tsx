import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS } from "../theme";
import { Card } from "./Card";
import { Row } from "./RaceCard";

/** Illustrative only (no real figures): our cost is clearly shorter than a hire. */
const OUR_COST_SHARE = 0.38;

type CompareCardProps = {
  enterFrame: number;
  /** Frame where our bar grows. */
  ourFrame: number;
  /** Frame where the recruitment bar grows. */
  hireFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

export const CompareCard: React.FC<CompareCardProps> = ({
  enterFrame,
  ourFrame,
  hireFrame,
  exitFrame,
  exitDuration,
}) => {
  const frame = useCurrentFrame();
  const ours = OUR_COST_SHARE * ramp(frame, ourFrame, 24);
  const hire = ramp(frame, hireFrame, 27);

  return (
    <Card
      enterFrame={enterFrame}
      exitFrame={exitFrame}
      exitDuration={exitDuration}
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
      <Row label="IZAIA" color={COLORS.orange} progress={ours} tip />
      <Row label="Recrutement" color={COLORS.darkBlue} progress={hire} />
    </Card>
  );
};
