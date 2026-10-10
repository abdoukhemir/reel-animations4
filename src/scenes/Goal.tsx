import React from "react";
import { Chip } from "../components/Chip";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { TargetCard } from "../components/TargetCard";
import { TopCard } from "../components/TopCard";
import { ClockIcon } from "../components/icons";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:53 to 0:57 — "Toujours avec le même objectif: faire gagner du temps à vos équipes et rester au top de l'IA." */
export const Goal: React.FC = () => {
  const objectif = cueFrame("goal-objectif");
  const gagner = cueFrame("goal-gagner");
  const rester = cueFrame("goal-rester");
  // Leaves a short gap before the timeline of the next scene.
  const exit = cueFrame("support-accompagner") - secToFrame(0.3);

  return (
    <>
      <Zone>
        <Slot>
          <TargetCard enterFrame={withOffset(objectif)} exitFrame={withOffset(gagner)} />
        </Slot>
        <Slot>
          <Chip
            enterFrame={withOffset(gagner)}
            exitFrame={withOffset(rester - secToFrame(0.3))}
            icon={<ClockIcon size={72} enterFrame={withOffset(gagner)} />}
          >
            Gagner du temps
          </Chip>
        </Slot>
        <Slot>
          <TopCard enterFrame={withOffset(rester)} exitFrame={withOffset(exit)} />
        </Slot>
      </Zone>

      <Sfx name="pop" frame={objectif} />
      <Sfx name="tap" frame={objectif + 24} />
      <Sfx name="clock-rise" frame={gagner} volume={0.2} />
      <Sfx name="shimmer" frame={rester} volume={0.2} />
    </>
  );
};
