import React from "react";
import {
  AbsoluteFill,
  Easing,
  Freeze,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { DURATION_FRAMES } from "../timings";
import { cueFrame } from "../triggers";
import { Sfx } from "./Sfx";

/**
 * The composition has DURATION_FRAMES frames; the video is frozen on its last real frame
 * so a video that is one frame short never errors. Lower this if Studio complains about
 * "frame out of range".
 */
const VIDEO_LAST_FRAME = DURATION_FRAMES - 2;

/** Zoom point: where the face sits in the frame, so the punch-in grows around it. */
const ORIGIN = "50% 34%";

/** Slow push-in over the whole reel (1 = none). */
const DRIFT_END = 1.04;

/** Punch-in timing (frames). */
const UP = 7;
const HOLD = 26;
const DOWN = 16;

type Punch = { id: string; to: number };

/** Quick zoom on a trigger word: scale jumps to `to`, holds, then eases back. */
export const PUNCHES: Punch[] = [
  { id: "hook-vite", to: 1.14 },
  { id: "problem-vitesse", to: 1.12 },
  { id: "director-directeur", to: 1.14 },
  { id: "director-cout", to: 1.1 },
  { id: "connect-mensualite", to: 1.12 },
  { id: "goal-gagner", to: 1.1 },
  { id: "support-decisif", to: 1.12 },
  { id: "closing-izaia", to: 1.14 },
];

const envelope = (frame: number, start: number): number => {
  const up = interpolate(frame, [start, start + UP], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const down = interpolate(frame, [start + UP + HOLD, start + UP + HOLD + DOWN], [1, 0], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(up, down);
};

export const ZoomVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const drift = interpolate(frame, [0, DURATION_FRAMES], [1, DRIFT_END], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let punch = 0;
  for (const p of PUNCHES) {
    punch = Math.max(punch, (p.to - 1) * envelope(frame, cueFrame(p.id)));
  }

  return (
    <>
      <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "black" }}>
        <AbsoluteFill
          style={{ transform: `scale(${drift * (1 + punch)})`, transformOrigin: ORIGIN }}
        >
          <Freeze frame={Math.min(frame, VIDEO_LAST_FRAME)}>
            <OffthreadVideo
              src={staticFile("recording.mp4")}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Freeze>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* A very soft whoosh under each punch-in */}
      {PUNCHES.map((p) => (
        <Sfx key={p.id} name="whoosh" frame={cueFrame(p.id)} volume={0.07} />
      ))}
    </>
  );
};
