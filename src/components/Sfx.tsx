import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { OVERLAY_OFFSET, SFX_VOLUMES, SfxName } from "../timings";
import { secToFrame } from "../triggers";

type SfxProps = {
  name: SfxName;
  /** Base frame, without OVERLAY_OFFSET (it is added here). */
  frame: number;
  /** Overrides SFX_VOLUMES[name] if given (0 to 1). */
  volume?: number;
};

export const Sfx: React.FC<SfxProps> = ({ name, frame, volume }) => {
  const start = Math.round(frame + secToFrame(OVERLAY_OFFSET));
  const v = volume ?? SFX_VOLUMES[name];

  return (
    <Sequence from={start} layout="none" name={`sfx: ${name}`}>
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={v} />
    </Sequence>
  );
};