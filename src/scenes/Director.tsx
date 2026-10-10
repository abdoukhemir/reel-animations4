import React from "react";
import { Chip } from "../components/Chip";
import { CompareCard } from "../components/CompareCard";
import { Sfx } from "../components/Sfx";
import { TitleCard } from "../components/TitleCard";
import { Slot, Zone } from "../components/Zone";
import { CodeIcon, GearIcon, RingIcon } from "../components/icons";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:22 to 0:32 — the "directeur IA externalisé", engineer + in-house developer, expertise, cost. */
export const Director: React.FC = () => {
  const directeur = cueFrame("director-directeur");
  const ingenieur = cueFrame("director-ingenieur");
  const developpeur = cueFrame("director-developpeur");
  const expertise = cueFrame("director-expertise");
  const cout = cueFrame("director-cout");
  const inferieur = cueFrame("director-inferieur");
  // Fades out just before the AI node of the next scene appears.
  const exit = cueFrame("connect-connectons") - secToFrame(0.2);

  return (
    <>
      <Zone>
        <Slot>
          <TitleCard enterFrame={withOffset(directeur)} exitFrame={withOffset(ingenieur)} />
        </Slot>

        <Slot top={20} height={140}>
          <Chip
            enterFrame={withOffset(ingenieur)}
            exitFrame={withOffset(expertise)}
            icon={<GearIcon size={56} />}
          >
            Ingénieur IA
          </Chip>
        </Slot>
        <Slot top={170} height={140}>
          <Chip
            enterFrame={withOffset(developpeur)}
            exitFrame={withOffset(expertise)}
            icon={<CodeIcon size={56} />}
          >
            Développeur maison
          </Chip>
        </Slot>

        <Slot>
          <Chip
            enterFrame={withOffset(expertise)}
            exitFrame={withOffset(cout)}
            icon={<RingIcon size={56} enterFrame={withOffset(expertise)} />}
          >
            Niveau d'expertise
          </Chip>
        </Slot>

        <Slot>
          <CompareCard
            enterFrame={withOffset(cout)}
            ourFrame={withOffset(cout)}
            hireFrame={withOffset(inferieur)}
            exitFrame={withOffset(exit)}
            exitDuration={0.2}
          />
        </Slot>
      </Zone>

      <Sfx name="chime" frame={directeur} />
      <Sfx name="blip" frame={ingenieur} />
      <Sfx name="blip" frame={developpeur} />
      <Sfx name="shimmer" frame={expertise} volume={0.2} />
      <Sfx name="pop" frame={cout} />
      <Sfx name="tap" frame={inferieur} />
    </>
  );
};
