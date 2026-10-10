import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, cancelRender, continueRender, delayRender, staticFile } from "remotion";
import { waitUntilDone } from "./theme";
import { Captions } from "./components/Captions";
import { ZoomVideo } from "./components/ZoomVideo";
import { Hook } from "./scenes/Hook";
import { Intro } from "./scenes/Intro";
import { Pace } from "./scenes/Pace";
import { Problem } from "./scenes/Problem";

export const Reel: React.FC = () => {
  // Block rendering until Poppins 600/700 is loaded.
  const [handle] = useState(() => delayRender("Loading Poppins"));

  useEffect(() => {
    waitUntilDone()
      .then(() => continueRender(handle))
      .catch((err: unknown) => cancelRender(err));
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Video's own audio is muted; the voice comes from voice-boosted.wav */}
      <ZoomVideo />
      <Audio src={staticFile("voice-boosted.wav")} />

      {/* Scenes in chronological order; only one group is visible at a time */}
      <Hook />
      <Intro />
      <Pace />
      <Problem />
      {/* Next scenes go here (director, connect, monthly, clients, goal, support, closing) */}

      {/* Captions are always on top of the overlays */}
      <Captions />
    </AbsoluteFill>
  );
};
