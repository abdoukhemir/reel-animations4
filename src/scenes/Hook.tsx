import React from "react";
import { Chip } from "../components/Chip";
import { RaceCard } from "../components/RaceCard";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { AnimatedCheck } from "../components/icons";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

/** 0:00 to 0:05 — "Une formation, c'est essentiel, mais l'IA évolue plus vite que votre entreprise." */
export const Hook: React.FC = () => {
  const formation = cueFrame("hook-formation");
  const essentiel = cueFrame("hook-essentiel");
  const evolue = cueFrame("hook-evolue");
  const vite = cueFrame("hook-vite");
  // Leaves a clear gap before the name tag.
  const exit = secToFrame(triggerSec("intro-elvira") - 1.2);

  return (
    <>
      <Zone>
        <Slot>
          <Chip
            enterFrame={withOffset(formation)}
            exitFrame={withOffset(evolue)}
            icon={<AnimatedCheck enterFrame={withOffset(essentiel)} size={56} />}
          >
            Formation
          </Chip>
        </Slot>
        <Slot>
          <RaceCard
            enterFrame={withOffset(evolue)}
            accelerateFrame={withOffset(vite)}
            exitFrame={withOffset(exit)}
          />
        </Slot>
      </Zone>

      <Sfx name="tap" frame={formation} />
      <Sfx name="check" frame={essentiel} />
      <Sfx name="blip" frame={evolue} />
    </>
  );
};
