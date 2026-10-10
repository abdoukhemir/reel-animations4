import React from "react";
import { COLORS } from "../theme";
import { Badge } from "../components/Badge";
import { CheckItem } from "../components/CheckItem";
import { Chip } from "../components/Chip";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { ClockIcon, CycleIcon } from "../components/icons";
import { CHECK_DELAY_FRAMES } from "../timings";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:08 to 0:16 — new tools and uses, "en une minute", stay up to date, don't fall behind. */
export const Pace: React.FC = () => {
  const outils = cueFrame("pace-outils");
  const usages = cueFrame("pace-usages");
  const minute = cueFrame("pace-minute");
  const jour = cueFrame("pace-jour");
  const decrocher = cueFrame("pace-decrocher");
  // Gone before "Le problème" starts.
  const exit = cueFrame("problem-probleme") - secToFrame(0.45);

  return (
    <>
      <Zone>
        <Slot>
          <Chip enterFrame={withOffset(outils)} exitFrame={withOffset(usages)}>
            Nouveaux outils
          </Chip>
        </Slot>
        <Slot>
          <Chip
            enterFrame={withOffset(usages)}
            exitFrame={withOffset(minute)}
            dotColor={COLORS.green}
          >
            Nouveaux usages
          </Chip>
        </Slot>
        <Slot>
          <Badge
            enterFrame={withOffset(minute)}
            exitFrame={withOffset(jour)}
            icon={<ClockIcon size={64} enterFrame={withOffset(minute)} />}
          >
            En 1 minute
          </Badge>
        </Slot>
        <Slot>
          <Chip
            enterFrame={withOffset(jour)}
            exitFrame={withOffset(decrocher)}
            icon={<CycleIcon size={56} enterFrame={withOffset(jour)} />}
          >
            Rester à jour
          </Chip>
        </Slot>
        <Slot>
          <CheckItem
            enterFrame={withOffset(decrocher)}
            exitFrame={withOffset(exit)}
            label="Ne pas décrocher"
          />
        </Slot>
      </Zone>

      <Sfx name="blip" frame={outils} />
      <Sfx name="blip" frame={usages} />
      <Sfx name="clock-rise" frame={minute} volume={0.2} />
      <Sfx name="blip" frame={jour} />
      <Sfx name="check" frame={decrocher + CHECK_DELAY_FRAMES} />
    </>
  );
};
