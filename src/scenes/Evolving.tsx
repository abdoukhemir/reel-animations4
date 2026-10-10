import React from "react";
import { Card } from "../components/Card";
import { CycleIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

export const Evolving: React.FC = () => {
  const cue = cueFrame("evolving-evolue");
  const exitBase = sceneExit("evolving");

  return (
    <>
      <Zone>
        <Slot>
          <Card
            enterFrame={withOffset(cue)}
            exitFrame={withOffset(exitBase)}
            style={{ flexDirection: "row", gap: 28, textAlign: "left" }}
          >
            <CycleIcon size={76} enterFrame={withOffset(cue)} />
            <span>L'IA évolue en permanence</span>
          </Card>
        </Slot>
      </Zone>

      <Sfx name="shimmer" frame={cue} />
    </>
  );
};