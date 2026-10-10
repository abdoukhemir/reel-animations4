import React from "react";
import { Composition } from "remotion";
import { Reel } from "./Reel";
import { DURATION_FRAMES, FPS } from "./timings";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};