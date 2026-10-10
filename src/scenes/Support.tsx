import React from "react";
import { BurstBadge } from "../components/BurstBadge";
import { Chip } from "../components/Chip";
import { Sfx } from "../components/Sfx";
import { TimelineCard } from "../components/TimelineCard";
import { Slot, Zone } from "../components/Zone";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:57 to 1:01 — "Mais les accompagner dans la durée, ça, c'est décisif. Et chez IZAIA, nous, on fait les deux." */
export const Support: React.FC = () => {
  const accompagner = cueFrame("support-accompagner");
  const decisif = cueFrame("support-decisif");
  const izaia = cueFrame("support-izaia");
  const fait = cueFrame("closing-fait");

  return (
    <>
      <Zone>
        <Slot>
          <TimelineCard
            enterFrame={withOffset(accompagner)}
            exitFrame={withOffset(decisif - secToFrame(0.25))}
            exitDuration={0.2}
          />
        </Slot>
        <Slot>
          <BurstBadge enterFrame={withOffset(decisif)} exitFrame={withOffset(izaia - secToFrame(0.15))}>
            Décisif
          </BurstBadge>
        </Slot>
        <Slot>
          <Chip
            enterFrame={withOffset(izaia)}
            exitFrame={withOffset(fait - secToFrame(0.25))}
            exitDuration={0.2}
          >
            IZAIA
          </Chip>
        </Slot>
      </Zone>

      <Sfx name="step-1" frame={accompagner} />
      <Sfx name="chime" frame={decisif} volume={0.25} />
      <Sfx name="pop" frame={izaia} />
    </>
  );
};
