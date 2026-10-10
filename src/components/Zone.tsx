import React from "react";

// Overlay zone: y 1170 to 1500, 60 px side margins (bottom third).
// Captions sit just below it, from y 1520 (see Captions.tsx).
export const ZONE_TOP = 1170;
export const ZONE_HEIGHT = 330;
export const ZONE_SIDE = 60;

export const Zone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      top: ZONE_TOP,
      left: ZONE_SIDE,
      right: ZONE_SIDE,
      height: ZONE_HEIGHT,
    }}
  >
    {children}
  </div>
);

type SlotProps = {
  top?: number;
  height?: number;
  children: React.ReactNode;
};

/** A box inside the zone; its content is centered. All items of one group share a slot. */
export const Slot: React.FC<SlotProps> = ({ top = 0, height = ZONE_HEIGHT, children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);