import React from "react";
import { COLORS } from "../theme";
import { Card } from "../components/Card";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { cueFrame, withOffset } from "../triggers";

export const Closing: React.FC = () => {
  const taglineCue = cueFrame("closing-longueur");
  const finalCue = cueFrame("closing-contactez");

  return (
    <>
      <Zone>
        <Slot>
          <Card enterFrame={withOffset(taglineCue)} exitFrame={withOffset(finalCue)}>
            Une longueur d'avance
          </Card>
        </Slot>
        {/* Final card: no exitFrame, stays until the end of the video */}
        <Slot>
          <Card
            enterFrame={withOffset(finalCue)}
            style={{ flexDirection: "column", gap: 6, padding: "28px 64px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <span style={{ fontSize: 72, lineHeight: 1, fontWeight: 700, letterSpacing: 2 }}>
                IZAIA
              </span>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: COLORS.orange,
                  marginBottom: 6,
                }}
              />
            </div>
            <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1.2 }}>izaia.fr</span>
            <span style={{ fontSize: 48, fontWeight: 600, lineHeight: 1.2 }}>contact@izaia.fr</span>
          </Card>
        </Slot>
      </Zone>

      <Sfx name="blip" frame={taglineCue} />
      <Sfx name="chime" frame={finalCue} />
    </>
  );
};