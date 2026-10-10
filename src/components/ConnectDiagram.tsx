import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../anim";
import { COLORS, FONT_FAMILY, RADIUS, SHADOW } from "../theme";
import { FPS } from "../timings";
import { usePopInOut } from "./Card";

export const DIAGRAM_WIDTH = 900;
export const DIAGRAM_HEIGHT = 200;

const IA = { x: 115, y: 100, r: 55 };
const NODE_W = 420;
const NODE_H = 76;
const NODE_X = 440;
const TARGETS = [
  { y: 48 }, // software
  { y: 152 }, // ERP
];

type PopBoxProps = {
  /** Phase of a slow sway (radians); leave out for a node that stays still. */
  bob?: number;
  enterFrame: number;
  exitFrame?: number;
  exitDuration?: number;
  style: React.CSSProperties;
  children: React.ReactNode;
};

const PopBox: React.FC<PopBoxProps> = ({ bob, enterFrame, exitFrame, exitDuration, style, children }) => {
  const frame = useCurrentFrame();
  const { visible, opacity, scale, y } = usePopInOut(enterFrame, exitFrame, exitDuration);
  const sway = bob === undefined ? 0 : Math.sin(frame * 0.07 + bob) * 4;
  if (!visible) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        fontWeight: 700,
        opacity,
        transform: `translateY(${y + sway}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type Props = {
  /** The "IA" node appears. */
  iaFrame: number;
  /** "Logiciels métiers" connects. */
  softwareFrame: number;
  /** "ERP" connects. */
  erpFrame: number;
  exitFrame?: number;
  exitDuration?: number;
};

/** The AI connects to the client's software, then to its ERP; data pulses along the links. */
export const ConnectDiagram: React.FC<Props> = ({
  iaFrame,
  softwareFrame,
  erpFrame,
  exitFrame,
  exitDuration = 0.3,
}) => {
  const frame = useCurrentFrame();
  const exitFrames = Math.max(1, Math.round(exitDuration * FPS));
  const out = exitFrame === undefined ? 0 : ramp(frame, exitFrame, exitFrames, (t) => t);
  const lineOpacity = 1 - out;

  const links = [
    { start: softwareFrame, target: TARGETS[0] },
    { start: erpFrame, target: TARGETS[1] },
  ];

  const x1 = IA.x + IA.r;
  const y1 = IA.y;
  const x2 = NODE_X;

  // Soft pulse ring around the IA node.
  const pulse = frame >= iaFrame ? ((frame - iaFrame) % 50) / 50 : 0;

  return (
    <div style={{ position: "relative", width: DIAGRAM_WIDTH, height: DIAGRAM_HEIGHT }}>
      <svg
        width={DIAGRAM_WIDTH}
        height={DIAGRAM_HEIGHT}
        style={{ position: "absolute", left: 0, top: 0, opacity: lineOpacity }}
      >
        {frame >= iaFrame && (
          <circle
            cx={IA.x}
            cy={IA.y}
            r={IA.r + pulse * 22}
            fill="none"
            stroke={COLORS.orange}
            strokeWidth={4}
            strokeOpacity={(1 - pulse) * 0.45 * (1 - out)}
          />
        )}
        {links.map((link, i) => {
          if (frame < link.start) {
            return null;
          }
          const draw = ramp(frame, link.start, 14);
          const lx = x1 + (x2 - x1) * draw;
          const ly = y1 + (link.target.y - y1) * draw;
          const travel = Math.max(0, frame - link.start - 14);
          const t = (travel % 40) / 40;
          const showDot = frame - link.start > 14;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={lx}
                y2={ly}
                stroke={COLORS.darkBlue}
                strokeOpacity={0.4}
                strokeWidth={5}
                strokeLinecap="round"
              />
              {showDot &&
                [0, 0.5].map((offset) => {
                  const u = (t + offset) % 1;
                  return (
                    <circle
                      key={offset}
                      cx={x1 + (x2 - x1) * u}
                      cy={y1 + (link.target.y - y1) * u}
                      r={8}
                      fill={COLORS.orange}
                    />
                  );
                })}
            </g>
          );
        })}
      </svg>

      <PopBox
        bob={0}
        enterFrame={iaFrame}
        exitFrame={exitFrame}
        exitDuration={exitDuration}
        style={{
          left: IA.x - IA.r,
          top: IA.y - IA.r,
          width: IA.r * 2,
          height: IA.r * 2,
          borderRadius: "50%",
          backgroundColor: COLORS.orange,
          color: COLORS.white,
          fontSize: 54,
          boxShadow: SHADOW,
        }}
      >
        IA
      </PopBox>

      {["Logiciels métiers", "ERP"].map((label, i) => (
        <PopBox
          key={label}
          bob={1.7 + i * 1.7}
          enterFrame={links[i].start + 8}
          exitFrame={exitFrame}
          exitDuration={exitDuration}
          style={{
            left: NODE_X,
            top: TARGETS[i].y - NODE_H / 2,
            width: NODE_W,
            height: NODE_H,
            borderRadius: RADIUS,
            backgroundColor: COLORS.beige,
            color: COLORS.darkBlue,
            fontSize: 40,
            boxShadow: SHADOW,
          }}
        >
          {label}
        </PopBox>
      ))}
    </div>
  );
};
