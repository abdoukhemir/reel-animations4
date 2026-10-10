import React from "react";
import { Badge } from "../components/Badge";
import { RollingList, RollingItem } from "../components/RollingList";
import { Sfx } from "../components/Sfx";
import { Slot, Zone } from "../components/Zone";
import { CycleIcon } from "../components/icons";
import {
  BotIcon,
  ChatIcon,
  DashboardIcon,
  DatabaseIcon,
  HeadsetIcon,
  MailIcon,
} from "../components/toolIcons";
import { cueFrame, secToFrame, triggerSec, withOffset } from "../triggers";

const ITEMS: Array<{ id: string; label: string; icon: React.ReactNode }> = [
  { id: "clients-agents", label: "Agents", icon: <BotIcon /> },
  { id: "clients-loops", label: "Loops", icon: <CycleIcon size={52} /> },
  { id: "clients-automatisation", label: "E-mails automatisés", icon: <MailIcon /> },
  { id: "clients-assistants", label: "Assistants métiers", icon: <ChatIcon /> },
  { id: "clients-standards", label: "Standards intelligents", icon: <HeadsetIcon /> },
  { id: "clients-bases", label: "Bases de connaissances", icon: <DatabaseIcon /> },
  { id: "clients-tableaux", label: "Tableaux de bord", icon: <DashboardIcon /> },
];

/** 0:43 to 0:53 — "C'est déjà ce que nous mettons en place chez nos clients: agents, loops, ..." */
export const Clients: React.FC = () => {
  const mettons = cueFrame("clients-mettons");
  const firstItem = cueFrame(ITEMS[0].id);
  const last = ITEMS[ITEMS.length - 1].id;
  // The list stays until "tableaux de bord" is finished, then leaves before the next scene.
  const exit = secToFrame(triggerSec(last) + 1.3);

  const rolling: RollingItem[] = ITEMS.map((item) => ({
    ...item,
    enterFrame: withOffset(cueFrame(item.id)),
  }));

  return (
    <>
      <Zone>
        <Slot>
          <Badge enterFrame={withOffset(mettons)} exitFrame={withOffset(firstItem - secToFrame(0.1))}>
            Déjà chez nos clients
          </Badge>
        </Slot>
        <Slot>
          <RollingList items={rolling} exitFrame={withOffset(exit)} />
        </Slot>
      </Zone>

      <Sfx name="pop" frame={mettons} />
      {ITEMS.map((item, i) => (
        <Sfx
          key={item.id}
          name={i === ITEMS.length - 1 ? "success" : "blip"}
          frame={cueFrame(item.id)}
          volume={i === ITEMS.length - 1 ? 0.2 : undefined}
        />
      ))}
    </>
  );
};
