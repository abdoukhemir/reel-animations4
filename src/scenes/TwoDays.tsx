import React from "react";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { CheckItem } from "../components/CheckItem";
import { CalendarIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { SCENE_FADE_OUT, SfxName, TWODAYS_EXIT_AFTER } from "../timings";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

const ITEMS: { id: string; label: string; sfx: SfxName }[] = [
  { id: "twodays-proces", label: "Procès-verbaux d'AG", sfx: "step-1" },
  { id: "twodays-comparer", label: "Comparer les devis", sfx: "step-2" },
  { id: "twodays-modele", label: "Modèles d'e-mails et documents", sfx: "step-3" },
];

export const TwoDays: React.FC = () => {
  const badgeCue = cueFrame("twodays-deux");
  const captionCue = cueFrame("twodays-consecutifs");
  const itemCues = ITEMS.map((item) => cueFrame(item.id));

  const lastTriggerSec = triggerSec(ITEMS[ITEMS.length - 1].id);
  const naturalExit = secToFrame(lastTriggerSec + TWODAYS_EXIT_AFTER);
  const exitBase = sceneExit("twodays", SCENE_FADE_OUT, naturalExit);
  const exitVisual = withOffset(exitBase);

  return (
    <>
      <Zone>
        {/* Badge stays at the top of the zone for the whole scene */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Badge
            enterFrame={withOffset(badgeCue)}
            exitFrame={exitVisual}
            exitDuration={SCENE_FADE_OUT}
            icon={<CalendarIcon size={48} />}
          >
            Formation 2 jours
          </Badge>
        </div>

        {/* Small caption, gone when the first item enters */}
        <Slot top={120} height={220}>
          <Card
            enterFrame={withOffset(captionCue)}
            exitFrame={withOffset(itemCues[0])}
            style={{
              fontSize: 48,
              fontWeight: 600,
              padding: "14px 36px",
              borderRadius: 999,
            }}
          >
            consécutifs ou espacés
          </Card>
        </Slot>

        {/* One CheckItem at a time, each replacing the previous */}
        {ITEMS.map((item, i) => {
          const isLast = i === ITEMS.length - 1;
          const exit = isLast ? exitVisual : withOffset(itemCues[i + 1]);

          return (
            <Slot key={item.id} top={120} height={220}>
              <CheckItem
                enterFrame={withOffset(itemCues[i])}
                exitFrame={exit}
                exitDuration={isLast ? SCENE_FADE_OUT : undefined}
                label={item.label}
              />
            </Slot>
          );
        })}
      </Zone>

      <Sfx name="pop" frame={badgeCue} />
      {ITEMS.map((item, i) => (
        <Sfx key={item.id} name={item.sfx} frame={itemCues[i]} />
      ))}
    </>
  );
};