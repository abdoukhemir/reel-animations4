import React from "react";
import { COLORS } from "../theme";
import { FORMATION_EXIT_AFTER, SCENE_FADE_OUT, CHECK_DELAY_FRAMES } from "../timings";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";
import { sceneExit } from "../sceneWindows";
import { Badge } from "../components/Badge";
import { CheckItem } from "../components/CheckItem";
import { Sfx } from "../components/Sfx";

const ITEMS = [
  { id: "formation-mails", label: "Répondre aux e-mails" },
  { id: "formation-bail", label: "Préparer un bail" },
  { id: "formation-convocation", label: "Convocation d'AG" },
  { id: "formation-relancer", label: "Relancer les prestataires" },
  { id: "formation-suivre", label: "Suivre les travaux" },
];

// Overlay zone: y 1250 to 1600, 60 px side margins.
const ZONE_TOP = 1250;
const ZONE_HEIGHT = 350;
const SIDE_MARGIN = 60;

const BoltIcon: React.FC = () => (
  <svg width={38} height={38} viewBox="0 0 24 24">
    <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" fill={COLORS.white} />
  </svg>
);

export const FormationOneDay: React.FC = () => {
  // Base frames (no offset): used for sounds.
  const badgeCue = cueFrame("formation-badge");
  const itemCues = ITEMS.map((item) => cueFrame(item.id));
  const lastTriggerSec = triggerSec(ITEMS[ITEMS.length - 1].id);
  const naturalExit = secToFrame(lastTriggerSec + FORMATION_EXIT_AFTER);
  // Clamped so the fade is finished before the Security scene starts.
  const exitBase = sceneExit("formation", SCENE_FADE_OUT, naturalExit);

  // Visual frames (with OVERLAY_OFFSET).
  const exitVisual = withOffset(exitBase);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: ZONE_TOP,
          left: SIDE_MARGIN,
          right: SIDE_MARGIN,
          height: ZONE_HEIGHT,
        }}
      >
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
            icon={<BoltIcon />}
          >
            Formation 1 jour
          </Badge>
        </div>

        {/* One CheckItem at a time, all in the same slot */}
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            height: 220,
          }}
        >
          {ITEMS.map((item, i) => {
            const isLast = i === ITEMS.length - 1;
            const enter = withOffset(itemCues[i]);
            const exit = isLast ? exitVisual : withOffset(itemCues[i + 1]);

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckItem
                  enterFrame={enter}
                  exitFrame={exit}
                  exitDuration={isLast ? SCENE_FADE_OUT : undefined}
                  label={item.label}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sounds: base frames, <Sfx> applies OVERLAY_OFFSET */}
      <Sfx name="pop" frame={badgeCue} />
      {itemCues.map((cue, i) => (
        <Sfx key={ITEMS[i].id} name="check" frame={cue + CHECK_DELAY_FRAMES} />
      ))}
      <Sfx name="whoosh" frame={exitBase} />
    </>
  );
};