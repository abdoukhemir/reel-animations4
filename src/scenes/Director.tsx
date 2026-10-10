import React from "react";
import { Chip } from "../components/Chip";
import { CompareCard } from "../components/CompareCard";
import { Float } from "../components/Float";
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
          <Float from={withOffset(directeur)} amplitude={7}>
            <TitleCard enterFrame={withOffset(directeur)} exitFrame={withOffset(ingenieur)} />
          </Float>
        </Slot>

        <Slot top={20} height={140}>
          <Float from={withOffset(ingenieur)} amplitude={5}>
            <Chip
              shine
              enterFrame={withOffset(ingenieur)}
              exitFrame={withOffset(expertise)}
              icon={<GearIcon size={56} enterFrame={withOffset(ingenieur)} />}
            >
              Ingénieur IA
            </Chip>
          </Float>
        </Slot>
        <Slot top={170} height={140}>
          <Float from={withOffset(developpeur)} amplitude={5} phase={2}>
            <Chip
              shine
              enterFrame={withOffset(developpeur)}
              exitFrame={withOffset(expertise)}
              icon={<CodeIcon size={56} />}
            >
              Développeur maison
            </Chip>
          </Float>
        </Slot>

        <Slot>
          <Float from={withOffset(expertise)} phase={1}>
            <Chip
              shine
              enterFrame={withOffset(expertise)}
              exitFrame={withOffset(cout)}
              icon={<RingIcon size={56} enterFrame={withOffset(expertise)} />}
            >
              Niveau d'expertise
            </Chip>
          </Float>
        </Slot>

        <Slot>
          <Float from={withOffset(cout)} phase={2.5}>
            <CompareCard
              enterFrame={withOffset(cout)}
              ourFrame={withOffset(cout)}
              hireFrame={withOffset(inferieur)}
              exitFrame={withOffset(exit)}
              exitDuration={0.2}
            />
          </Float>
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
