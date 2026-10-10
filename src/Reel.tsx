import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, cancelRender, continueRender, delayRender, staticFile } from "remotion";
import { waitUntilDone } from "./theme";
import { Captions } from "./components/Captions";
import { ZoomVideo } from "./components/ZoomVideo";

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

      {/* Scenes go here, in chronological order (added step by step) */}

      {/* Captions are always on top of the overlays */}
      <Captions />
    </AbsoluteFill>
  );
};
