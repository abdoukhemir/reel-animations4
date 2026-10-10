import React from "react";
import { COLORS } from "../theme";
import { Chip } from "../components/Chip";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

const ITEMS = [
  { id: "topics-baux", label: "Baux", color: COLORS.orange },
  { id: "topics-mails", label: "E-mails", color: COLORS.green },
  { id: "topics-sinistres", label: "Sinistres", color: COLORS.darkBlue },
  { id: "topics-devis", label: "Devis", color: COLORS.orange },
  { id: "topics-assemblees", label: "Assemblées générales", color: COLORS.green },
  { id: "topics-recrutements", label: "Recrutements", color: COLORS.darkBlue },
  { id: "topics-coproprietaires", label: "Relances copropriétaires", color: COLORS.orange },
];

export const Topics: React.FC = () => {
  const cues = ITEMS.map((item) => cueFrame(item.id));
  const exitBase = sceneExit("topics");

  return (
    <>
      <Zone>
        {ITEMS.map((item, i) => {
          const isLast = i === ITEMS.length - 1;
          const exit = withOffset(isLast ? exitBase : cues[i + 1]);

          return (
            <Slot key={item.id}>
              <Chip enterFrame={withOffset(cues[i])} exitFrame={exit} dotColor={item.color}>
                {item.label}
              </Chip>
            </Slot>
          );
        })}
      </Zone>

      {cues.map((cue, i) => (
        <Sfx key={ITEMS[i].id} name="blip" frame={cue} />
      ))}
      <Sfx name="whoosh" frame={exitBase} />
    </>
  );
};