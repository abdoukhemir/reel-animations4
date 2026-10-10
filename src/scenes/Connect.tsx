import React from "react";
import { Badge } from "../components/Badge";
import { ConnectDiagram } from "../components/ConnectDiagram";
import { Float } from "../components/Float";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { CalendarIcon } from "../components/icons";
import { cueFrame, secToFrame, withOffset } from "../triggers";

/** 0:32 to 0:39 — AI connected to the business software and the ERP, for a fixed monthly fee. */
export const Connect: React.FC = () => {
  const connectons = cueFrame("connect-connectons");
  const logiciels = cueFrame("connect-logiciels");
  const erp = cueFrame("connect-erp");
  const mensualite = cueFrame("connect-mensualite");
  // Both elements leave together, a little before "Et chaque mois".
  const exit = cueFrame("monthly-mois") - secToFrame(0.6);
  const FADE = 0.3;

  return (
    <>
      <Zone>
        {/* Top: the connection diagram */}
        <Slot top={0} height={200}>
          <ConnectDiagram
            iaFrame={withOffset(connectons)}
            softwareFrame={withOffset(logiciels)}
            erpFrame={withOffset(erp)}
            exitFrame={withOffset(exit)}
            exitDuration={FADE}
          />
        </Slot>
        {/* Bottom: the fixed monthly fee */}
        <Slot top={215} height={115}>
          <Float from={withOffset(mensualite)} amplitude={4} phase={1}>
            <Badge
              shine
              enterFrame={withOffset(mensualite)}
              exitFrame={withOffset(exit)}
              exitDuration={FADE}
              icon={<CalendarIcon size={52} />}
            >
              Mensualité fixe
            </Badge>
          </Float>
        </Slot>
      </Zone>

      <Sfx name="pop" frame={connectons} />
      <Sfx name="tap" frame={logiciels} />
      <Sfx name="tap" frame={erp} />
      <Sfx name="success" frame={mensualite} volume={0.2} />
    </>
  );
};
