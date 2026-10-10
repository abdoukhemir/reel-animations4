import React from "react";
import { BrandLockup } from "../components/BrandLockup";
import { Chip } from "../components/Chip";
import { PlusDot } from "../components/PlusDot";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { BookIcon, CycleIcon } from "../components/icons";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 1:01 to the end — "on fait les deux" (formation + accompagnement), then "À très bientôt chez IZAIA !" */
export const Closing: React.FC = () => {
  const fait = cueFrame("closing-fait");
  const deux = cueFrame("closing-deux");
  const chez = cueFrame("closing-chez");
  // The pair leaves before the end card lands.
  const pairExit = chez - secToFrame(0.4);
  const PAIR_FADE = 0.3;

  return (
    <>
      <Zone>
        <Slot top={0} height={130}>
          <Chip
            enterFrame={withOffset(fait)}
            exitFrame={withOffset(pairExit)}
            exitDuration={PAIR_FADE}
            icon={<BookIcon size={56} />}
          >
            Formation
          </Chip>
        </Slot>
        <Slot top={130} height={70}>
          <PlusDot
            enterFrame={withOffset(deux)}
            exitFrame={withOffset(pairExit)}
            exitDuration={PAIR_FADE}
          />
        </Slot>
        <Slot top={200} height={130}>
          <Chip
            enterFrame={withOffset(deux + 3)}
            exitFrame={withOffset(pairExit)}
            exitDuration={PAIR_FADE}
            icon={<CycleIcon size={56} enterFrame={withOffset(deux + 3)} />}
          >
            Accompagnement
          </Chip>
        </Slot>

        {/* End card: no exitFrame, stays until the last frame */}
        <Slot>
          <BrandLockup enterFrame={withOffset(chez)} />
        </Slot>
      </Zone>

      <Sfx name="blip" frame={fait} />
      <Sfx name="pop" frame={deux} />
      <Sfx name="outro" frame={chez} volume={0.3} />
    </>
  );
};
