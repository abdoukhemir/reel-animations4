import React from "react";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { ShieldIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

export const Security: React.FC = () => {
  const shieldCue = cueFrame("security-securite");
  const rgpdCue = cueFrame("security-rgpd");
  const exitBase = sceneExit("security");

  return (
    <>
      <Zone>
        <Slot>
          <Card
            enterFrame={withOffset(shieldCue)}
            exitFrame={withOffset(rgpdCue)}
            style={{ flexDirection: "row", gap: 28, textAlign: "left" }}
          >
            <ShieldIcon size={80} />
            <span>IA en toute sécurité</span>
          </Card>
        </Slot>
        <Slot>
          <Chip
            enterFrame={withOffset(rgpdCue)}
            exitFrame={withOffset(exitBase)}
            icon={<ShieldIcon size={48} />}
          >
            RGPD
          </Chip>
        </Slot>
      </Zone>

      <Sfx name="shimmer" frame={shieldCue} />
      <Sfx name="blip" frame={rgpdCue} />
    </>
  );
};