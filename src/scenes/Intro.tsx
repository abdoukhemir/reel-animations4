import React from "react";
import { NameTag } from "../components/NameTag";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

/** 0:06 to 0:08 — "Bonjour, moi c'est Elvira de chez IZAIA." */
export const Intro: React.FC = () => {
  const elvira = cueFrame("intro-elvira");
  // Gone shortly after "IZAIA", before the next scene starts.
  const exit = secToFrame(triggerSec("intro-izaia") + 0.5);

  return (
    <>
      <Zone>
        <Slot>
          <NameTag
            enterFrame={withOffset(elvira)}
            exitFrame={withOffset(exit)}
            name="Elvira"
            brand="IZAIA"
          />
        </Slot>
      </Zone>

      <Sfx name="chime" frame={elvira} volume={0.2} />
    </>
  );
};
