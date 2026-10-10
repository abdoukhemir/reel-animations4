import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Freeze,
  OffthreadVideo,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { waitUntilDone } from "./theme";
import { Topics } from "./scenes/Topics";
import { Intro } from "./scenes/Intro";
import { FormationOneDay } from "./scenes/FormationOneDay";
import { Security } from "./scenes/Security";
import { TwoDays } from "./scenes/TwoDays";
import { Library } from "./scenes/Library";
import { Evolving } from "./scenes/Evolving";
import { Manager } from "./scenes/Manager";
import { Closing } from "./scenes/Closing";

// recording.mp4 has 2180 frames (index 0 to 2179). The composition has 2181,
// so the last composition frame holds the video's last real frame.
const VIDEO_LAST_FRAME = 2179;

const VideoLayer: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Freeze frame={Math.min(frame, VIDEO_LAST_FRAME)}>
      <OffthreadVideo
        src={staticFile("recording.mp4")}
        muted
        style={{ width: "100%", height: "100%" }}
      />
    </Freeze>
  );
};

export const Reel: React.FC = () => {
  // Block rendering until Poppins 600/700 is loaded.
  const [handle] = useState(() => delayRender("Loading Poppins"));

  useEffect(() => {
    waitUntilDone()
      .then(() => continueRender(handle))
      .catch((err) => cancelRender(err));
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Video's own audio is muted; the voice comes from voice-boosted.wav */}
      <VideoLayer />
      <Audio src={staticFile("voice-boosted.wav")} />

      {/* Scenes in chronological order; only one group is visible at a time */}
      <Topics />
      <Intro />
      <FormationOneDay />
      <Security />
      <TwoDays />
      <Library />
      <Evolving />
      <Manager />
      <Closing />
    </AbsoluteFill>
  );
};