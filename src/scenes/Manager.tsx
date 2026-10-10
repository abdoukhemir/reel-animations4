import React from "react";
import { COLORS } from "../theme";
import { Card } from "../components/Card";
import { CycleIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

export const Manager: React.FC = () => {
  const firstCue = cueFrame("manager-responsable");
  const secondCue = cueFrame("manager-accompagnons");
  const thirdCue = cueFrame("manager-evoluer");
  const exitBase = sceneExit("manager");

  return (
    <>
      <Zone>
        <Slot>
          <Card
            enterFrame={withOffset(firstCue)}
            exitFrame={withOffset(secondCue)}
            style={{ flexDirection: "column", gap: 16 }}
          >
            <span
              style={{
                backgroundColor: COLORS.orange,
                color: COLORS.white,
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.1,
                padding: "6px 26px",
                borderRadius: 999,
              }}
            >
              IZAIA
            </span>
            <span>Responsable IA externalisé</span>
          </Card>
        </Slot>
        <Slot>
          <Card enterFrame={withOffset(secondCue)} exitFrame={withOffset(thirdCue)}>
            Accompagnement durable
          </Card>
        </Slot>
        <Slot>
          <Card
            enterFrame={withOffset(thirdCue)}
            exitFrame={withOffset(exitBase)}
            style={{ flexDirection: "row", gap: 24, textAlign: "left" }}
          >
            <CycleIcon size={64} enterFrame={withOffset(thirdCue)} />
            <span>Outils et équipes qui évoluent</span>
          </Card>
        </Slot>
      </Zone>

      <Sfx name="pop" frame={firstCue} />
      <Sfx name="tap" frame={secondCue} />
      <Sfx name="tap" frame={thirdCue} />
    </>
  );
};