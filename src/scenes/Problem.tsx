import React from "react";
import { CheckItem } from "../components/CheckItem";
import { Chip } from "../components/Chip";
import { Float } from "../components/Float";
import { Sfx } from "../components/Sfx";
import { SpeedGauge } from "../components/SpeedGauge";
import { Slot, Zone } from "../components/Zone";
import { PulseDot } from "../components/icons";
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
          <Float from={withOffset(probleme)}>
            <Chip
              shine
              enterFrame={withOffset(probleme)}
              exitFrame={withOffset(equipes)}
              icon={<PulseDot size={44} />}
            >
              Le problème
            </Chip>
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(equipes)} phase={1.5}>
            <CheckItem
              shine
              enterFrame={withOffset(equipes)}
              exitFrame={withOffset(vitesse)}
              label="Vos équipes"
            />
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(vitesse)} phase={3}>
            <SpeedGauge
              enterFrame={withOffset(vitesse)}
              exitFrame={withOffset(exit)}
              exitDuration={SCENE_FADE_OUT}
            />
          </Float>
        </Slot>
      </Zone>

      <Sfx name="blip" frame={probleme} />
      <Sfx name="check" frame={equipes + CHECK_DELAY_FRAMES} />
      <Sfx name="shimmer" frame={vitesse} volume={0.2} />
    </>
  );
};
