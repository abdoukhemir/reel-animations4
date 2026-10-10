import React from "react";
import { COLORS } from "../theme";

type IconProps = { size?: number };

const svgStyle: React.CSSProperties = { flexShrink: 0, display: "block" };

export const BotIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <line x1="32" y1="20" x2="32" y2="10" stroke={COLORS.darkBlue} strokeWidth={4} strokeLinecap="round" />
    <circle cx="32" cy="8" r="5" fill={COLORS.orange} />
    <rect x="10" y="20" width="44" height="34" rx="11" fill={COLORS.darkBlue} />
    <circle cx="23" cy="36" r="5.5" fill={COLORS.white} />
    <circle cx="41" cy="36" r="5.5" fill={COLORS.white} />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <rect x="4" y="12" width="52" height="38" rx="8" fill={COLORS.darkBlue} />
    <path d="M9 19 L30 35 L51 19" fill="none" stroke={COLORS.white} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="48" cy="46" r="13" fill={COLORS.orange} />
    <polygon points="50,36 42,48 47.5,48 45.5,57 54,45 48.5,45" fill={COLORS.white} />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <rect x="5" y="8" width="54" height="38" rx="13" fill={COLORS.darkBlue} />
    <polygon points="17,44 17,58 32,44" fill={COLORS.darkBlue} />
    <circle cx="21" cy="27" r="4.5" fill={COLORS.white} />
    <circle cx="32" cy="27" r="4.5" fill={COLORS.orange} />
    <circle cx="43" cy="27" r="4.5" fill={COLORS.white} />
  </svg>
);

export const HeadsetIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <path d="M13 38 V30 A19 19 0 0 1 51 30 V38" fill="none" stroke={COLORS.darkBlue} strokeWidth={6} strokeLinecap="round" />
    <rect x="7" y="34" width="13" height="20" rx="6" fill={COLORS.darkBlue} />
    <rect x="44" y="34" width="13" height="20" rx="6" fill={COLORS.darkBlue} />
    <path d="M50 52 Q50 60 36 60" fill="none" stroke={COLORS.orange} strokeWidth={4} strokeLinecap="round" />
    <circle cx="34" cy="60" r="4" fill={COLORS.orange} />
  </svg>
);

export const DatabaseIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <path d="M10 16 V48 C10 56 54 56 54 48 V16 Z" fill={COLORS.darkBlue} />
    <ellipse cx="32" cy="16" rx="22" ry="9" fill={COLORS.orange} />
    <path d="M10 29 C10 37 54 37 54 29" fill="none" stroke={COLORS.white} strokeWidth={3} strokeOpacity={0.8} />
    <path d="M10 40 C10 48 54 48 54 40" fill="none" stroke={COLORS.white} strokeWidth={3} strokeOpacity={0.8} />
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={svgStyle}>
    <rect x="5" y="7" width="54" height="50" rx="10" fill={COLORS.darkBlue} />
    <rect x="15" y="34" width="9" height="14" rx="2" fill={COLORS.white} />
    <rect x="28" y="25" width="9" height="23" rx="2" fill={COLORS.orange} />
    <rect x="41" y="16" width="9" height="32" rx="2" fill={COLORS.white} />
  </svg>
);
