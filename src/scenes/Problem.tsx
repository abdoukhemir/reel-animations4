import React from "react";
import { CheckItem } from "../components/CheckItem";
import { Chip } from "../components/Chip";
import { Sfx } from "../components/Sfx";
import { SpeedGauge } from "../components/SpeedGauge";
import { Slot, Zone } from "../components/Zone";
import { SCENE_FADE_OUT, CHECK_DELAY_FRAMES } from "../timings";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

/** 0:16 to 0:21 — "Le problème, c'est pas vos équipes, c'est la vitesse à laquelle évolue l'IA." */
export const Problem: React.FC = () => {
  const probleme = cueFrame("problem-probleme");
  const equipes = cueFrame("problem-equipes");
  const vitesse = cueFrame("problem-vitesse");
  // The gauge stays until "intelligence artificielle" is finished, before the next scene.
  const exit = secToFrame(triggerSec("problem-vitesse") + 2.65);

  return (
    <>
      <Zone>
        <Slot>
          <Chip enterFrame={withOffset(probleme)} exitFrame={withOffset(equipes)}>
            Le problème
          </Chip>
        </Slot>
        <Slot>
          <CheckItem
            enterFrame={withOffset(equipes)}
            exitFrame={withOffset(vitesse)}
            label="Vos équipes"
          />
        </Slot>
        <Slot>
          <SpeedGauge
            enterFrame={withOffset(vitesse)}
            exitFrame={withOffset(exit)}
            exitDuration={SCENE_FADE_OUT}
          />
        </Slot>
      </Zone>

      <Sfx name="blip" frame={probleme} />
      <Sfx name="check" frame={equipes + CHECK_DELAY_FRAMES} />
      <Sfx name="shimmer" frame={vitesse} volume={0.2} />
    </>
  );
};
