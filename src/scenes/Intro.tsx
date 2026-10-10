import React from "react";
import { COLORS } from "../theme";
import { Card } from "../components/Card";
import { ClockIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

export const Intro: React.FC = () => {
  const nameCue = cueFrame("intro-elvira");
  const clockCue = cueFrame("intro-minute");
  const exitBase = sceneExit("intro");

  return (
    <>
      <Zone>
        <Slot>
          <Card
            enterFrame={withOffset(nameCue)}
            exitFrame={withOffset(clockCue)}
            style={{ flexDirection: "row", gap: 24 }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: COLORS.orange,
                flexShrink: 0,
              }}
            />
            <span>Elvira · IZAIA</span>
          </Card>
        </Slot>
        <Slot>
          <Card
            enterFrame={withOffset(clockCue)}
            exitFrame={withOffset(exitBase)}
            style={{ flexDirection: "row", gap: 28 }}
          >
            <ClockIcon enterFrame={withOffset(clockCue)} />
            <span>En 1 minute</span>
          </Card>
        </Slot>
      </Zone>

      <Sfx name="pop" frame={nameCue} />
      <Sfx name="clock-rise" frame={clockCue} />
    </>
  );
};