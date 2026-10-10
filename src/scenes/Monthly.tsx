import React from "react";
import { Badge } from "../components/Badge";
import { BAR_STEP, GrowthCard } from "../components/GrowthCard";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { CalendarIcon } from "../components/icons";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

/** 0:39 to 0:43 — "Et chaque mois, nous faisons évoluer vos outils au rythme de votre entreprise." */
export const Monthly: React.FC = () => {
  const mois = cueFrame("monthly-mois");
  const evoluer = cueFrame("monthly-evoluer");
  // Stays until the sentence is finished.
  const exit = secToFrame(triggerSec("monthly-evoluer") + 2.4);
  const FADE = 0.3;

  return (
    <>
      <Zone>
        {/* Top: the rising bars (second) */}
        <Slot top={0} height={200}>
          <GrowthCard
            enterFrame={withOffset(evoluer)}
            exitFrame={withOffset(exit)}
            exitDuration={FADE}
          />
        </Slot>
        {/* Bottom: "Chaque mois" (first) */}
        <Slot top={215} height={115}>
          <Badge
            enterFrame={withOffset(mois)}
            exitFrame={withOffset(exit)}
            exitDuration={FADE}
            icon={<CalendarIcon size={52} />}
          >
            Chaque mois
          </Badge>
        </Slot>
      </Zone>

      <Sfx name="blip" frame={mois} />
      <Sfx name="step-1" frame={evoluer + 4} />
      <Sfx name="step-2" frame={evoluer + 4 + BAR_STEP} />
      <Sfx name="step-3" frame={evoluer + 4 + 2 * BAR_STEP} />
      <Sfx name="success" frame={evoluer + 4 + 3 * BAR_STEP} volume={0.2} />
    </>
  );
};
