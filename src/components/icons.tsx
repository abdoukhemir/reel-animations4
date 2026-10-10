import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { FPS } from "../timings";

type IconProps = { size?: number };

/** The minute hand makes one full turn right after enterFrame. */
export const ClockIcon: React.FC<IconProps & { enterFrame: number }> = ({
  size = 76,
  enterFrame,
}) => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [enterFrame, enterFrame + Math.round(0.8 * FPS)], [0, 360], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
      <circle cx="32" cy="32" r="30" fill={COLORS.orange} />
      <circle cx="32" cy="32" r="23" fill={COLORS.white} />
      <line x1="32" y1="11" x2="32" y2="15" stroke={COLORS.darkBlue} strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="32" x2="42" y2="32" stroke={COLORS.darkBlue} strokeWidth="4.5" strokeLinecap="round" />
      <g transform={`rotate(${angle} 32 32)`}>
        <line x1="32" y1="32" x2="32" y2="17" stroke={COLORS.darkBlue} strokeWidth="4.5" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="32" r="3.5" fill={COLORS.darkBlue} />
    </svg>
  );
};

export const ShieldIcon: React.FC<IconProps> = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
    <path
      d="M32 4 L55 12 V31 C55 46 45 56 32 61 C19 56 9 46 9 31 V12 Z"
      fill={COLORS.darkBlue}
    />
    <path
      d="M21 32 L29 40 L44 24"
      fill="none"
      stroke={COLORS.green}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Two circular arrows, rotating slowly (1.2 degrees per frame) from enterFrame. */
export const CycleIcon: React.FC<IconProps & { enterFrame?: number; color?: string }> = ({
  size = 76,
  enterFrame = 0,
  color = COLORS.orange,
}) => {
  const frame = useCurrentFrame();
  const angle = Math.max(0, frame - enterFrame) * 1.2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ flexShrink: 0, display: "block", transform: `rotate(${angle}deg)` }}
    >
      <g>
        <path d="M12.3 28.5 A20 20 0 0 1 38.8 13.2" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
        <polygon points="47.3,16.3 41.2,6.6 36.4,19.8" fill={color} />
      </g>
      <g transform="rotate(180 32 32)">
        <path d="M12.3 28.5 A20 20 0 0 1 38.8 13.2" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
        <polygon points="47.3,16.3 41.2,6.6 36.4,19.8" fill={color} />
      </g>
    </svg>
  );
};

/** Designed to sit on the orange badge (white body, dark blue header). */
export const CalendarIcon: React.FC<IconProps> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
    <rect x="6" y="12" width="52" height="46" rx="9" fill={COLORS.white} />
    <path d="M6 21 A9 9 0 0 1 15 12 H49 A9 9 0 0 1 58 21 V28 H6 Z" fill={COLORS.darkBlue} />
    <rect x="18" y="4" width="6" height="14" rx="3" fill={COLORS.darkBlue} />
    <rect x="40" y="4" width="6" height="14" rx="3" fill={COLORS.darkBlue} />
    <rect x="14" y="34" width="9" height="8" rx="2" fill={COLORS.orange} />
    <rect x="27.5" y="34" width="9" height="8" rx="2" fill={COLORS.orange} />
    <rect x="41" y="34" width="9" height="8" rx="2" fill={COLORS.orange} />
    <rect x="14" y="46" width="9" height="8" rx="2" fill={COLORS.orange} />
    <rect x="27.5" y="46" width="9" height="8" rx="2" fill={COLORS.orange} />
  </svg>
);

export const BookIcon: React.FC<IconProps> = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
    <rect x="12" y="6" width="42" height="52" rx="7" fill={COLORS.darkBlue} />
    <rect x="12" y="6" width="9" height="52" rx="4" fill={COLORS.white} opacity="0.18" />
    <rect x="27" y="32" width="20" height="5" rx="2.5" fill={COLORS.orange} />
    <rect x="27" y="42" width="14" height="4" rx="2" fill={COLORS.white} opacity="0.85" />
    <path d="M43 6 V24 L47.5 20 L52 24 V6 Z" fill={COLORS.orange} />
  </svg>
);

/** Empty ring that fills with a green check at enterFrame. Takes its space from the start. */
export const AnimatedCheck: React.FC<IconProps & { enterFrame: number }> = ({
  size = 56,
  enterFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });

  const burst = interpolate(frame, [enterFrame + 2, enterFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ flexShrink: 0, display: "block", overflow: "visible" }}
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke={COLORS.darkBlue}
        strokeOpacity={0.25}
        strokeWidth={5}
      />
      {burst > 0 && burst < 1 && (
        <circle
          cx="32"
          cy="32"
          r={32 + burst * 16}
          fill="none"
          stroke={COLORS.green}
          strokeWidth={4}
          strokeOpacity={1 - burst}
        />
      )}
      <g transform={`translate(32 32) scale(${s}) translate(-32 -32)`}>
        <circle cx="32" cy="32" r="32" fill={COLORS.green} />
        <path
          d="M18 33 L28 43 L46 23"
          fill="none"
          stroke={COLORS.white}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};


/** Gear: eight teeth around a ring; turns slowly once enterFrame is reached. */
export const GearIcon: React.FC<IconProps & { enterFrame?: number }> = ({ size = 56, enterFrame = 0 }) => {
  const frame = useCurrentFrame();
  const angle = Math.max(0, frame - enterFrame) * 1.4;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
      <g transform={`translate(32 32) rotate(${angle})`}>
        {[0, 45, 90, 135].map((a) => (
          <rect key={a} x={-5} y={-29} width={10} height={58} rx={4} fill={COLORS.orange} transform={`rotate(${a})`} />
        ))}
        <circle r={21} fill={COLORS.orange} />
        <circle r={9} fill={COLORS.beige} />
      </g>
    </svg>
  );
};

/** Code window with "</>" and a blinking cursor. */
export const CodeIcon: React.FC<IconProps> = ({ size = 56 }) => {
  const frame = useCurrentFrame();
  const on = Math.floor(frame / 14) % 2 === 0;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
      <rect x="4" y="10" width="56" height="44" rx="10" fill={COLORS.darkBlue} />
      <path d="M24 24 L14 32 L24 40" fill="none" stroke={COLORS.white} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 24 L50 32 L40 40" fill="none" stroke={COLORS.orange} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="25" width="4" height="14" rx="2" fill={COLORS.white} opacity={on ? 1 : 0.1} />
    </svg>
  );
};

/** Ring that fills up to ~92% shortly after enterFrame. */
export const RingIcon: React.FC<IconProps & { enterFrame: number }> = ({ size = 56, enterFrame }) => {
  const frame = useCurrentFrame();
  const p =
    0.92 *
    interpolate(frame, [enterFrame + 4, enterFrame + 34], [0, 1], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const circ = 2 * Math.PI * 26;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
      <circle cx="32" cy="32" r="26" fill="none" stroke={COLORS.darkBlue} strokeOpacity={0.15} strokeWidth={9} />
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke={COLORS.orange}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - p)}
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
};

/** Four-point star that twinkles and turns slowly. */
export const SparkleIcon: React.FC<IconProps & { color?: string; delay?: number }> = ({
  size = 52,
  color = COLORS.orange,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.14 * Math.sin((frame + delay) * 0.18);
  const turn = (frame + delay) * 0.8;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block" }}>
      <g transform={`translate(32 32) rotate(${turn}) scale(${pulse}) translate(-32 -32)`}>
        <path d="M32 4 C34 22 42 30 60 32 C42 34 34 42 32 60 C30 42 22 34 4 32 C22 30 30 22 32 4 Z" fill={color} />
      </g>
    </svg>
  );
};

/** A solid dot with a ring that keeps rippling outward. */
export const PulseDot: React.FC<IconProps & { color?: string }> = ({ size = 40, color = COLORS.orange }) => {
  const frame = useCurrentFrame();
  const pulse = (frame % 36) / 36;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0, display: "block", overflow: "visible" }}>
      <circle cx="32" cy="32" r="16" fill={color} />
      <circle cx="32" cy="32" r={16 + pulse * 20} fill="none" stroke={color} strokeWidth={4} strokeOpacity={(1 - pulse) * 0.6} />
    </svg>
  );
};
