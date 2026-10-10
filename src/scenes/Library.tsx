import React from "react";
import { Card } from "../components/Card";
import { CheckItem } from "../components/CheckItem";
import { BookIcon } from "../components/icons";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { sceneExit } from "../sceneWindows";
import { cueFrame, withOffset } from "../triggers";

export const Library: React.FC = () => {
  const bookCue = cueFrame("library-bibliotheque");
  const toolsCue = cueFrame("library-outils");
  const exitBase = sceneExit("library");

  return (
    <>
      <Zone>
        <Slot>
          <Card
            enterFrame={withOffset(bookCue)}
            exitFrame={withOffset(toolsCue)}
            style={{ flexDirection: "row", gap: 28, textAlign: "left" }}
          >
            <BookIcon size={80} />
            <span>Bibliothèque de prompts</span>
          </Card>
        </Slot>
        <Slot>
          <CheckItem
            enterFrame={withOffset(toolsCue)}
            exitFrame={withOffset(exitBase)}
            label="Outils opérationnels"
          />
        </Slot>
      </Zone>

      <Sfx name="tap" frame={bookCue} />
      <Sfx name="success" frame={toolsCue} />
    </>
  );
};