import React from "react";
import { COLORS } from "../theme";
import { Badge } from "../components/Badge";
import { CheckItem } from "../components/CheckItem";
import { Chip } from "../components/Chip";
import { Float } from "../components/Float";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { ClockIcon, CycleIcon, SparkleIcon } from "../components/icons";
import { CHECK_DELAY_FRAMES } from "../timings";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:08 to 0:16 — new tools and uses, "en une minute", stay up to date, don't fall behind. */
export const Pace: React.FC = () => {
  const outils = cueFrame("pace-outils");
  const usages = cueFrame("pace-usages");
  const minute = cueFrame("pace-minute");
  const jour = cueFrame("pace-jour");
  // "Ne pas décrocher" appears while "comment ne pas" is spoken (before the keyword),
  // and stays until just before "Le problème" (short fade so the two never overlap).
  const decrocher = cueFrame("pace-decrocher") - secToFrame(0.2);
  const exit = cueFrame("problem-probleme") - secToFrame(0.17);
  const EXIT_FADE = 0.15;

  return (
    <>
      <Zone>
        <Slot>
          <Float from={withOffset(outils)}>
            <Chip
              shine
              enterFrame={withOffset(outils)}
              exitFrame={withOffset(usages)}
              icon={<SparkleIcon size={52} />}
            >
              Nouveaux outils
            </Chip>
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(usages)} phase={1.2}>
            <Chip
              shine
              enterFrame={withOffset(usages)}
              exitFrame={withOffset(minute)}
              icon={<SparkleIcon size={52} color={COLORS.green} delay={12} />}
            >
              Nouveaux usages
            </Chip>
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(minute)} phase={2.4}>
            <Badge
              shine
              enterFrame={withOffset(minute)}
              exitFrame={withOffset(jour)}
              icon={<ClockIcon size={64} enterFrame={withOffset(minute)} />}
            >
              En 1 minute
            </Badge>
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(jour)} phase={3.6}>
            <Chip
              shine
              enterFrame={withOffset(jour)}
              exitFrame={withOffset(decrocher)}
              icon={<CycleIcon size={56} enterFrame={withOffset(jour)} />}
            >
              Rester à jour
            </Chip>
          </Float>
        </Slot>
        <Slot>
          <Float from={withOffset(decrocher)} phase={4.8}>
            <CheckItem
              shine
              enterFrame={withOffset(decrocher)}
              exitFrame={withOffset(exit)}
              exitDuration={EXIT_FADE}
              label="Ne pas décrocher"
            />
          </Float>
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
