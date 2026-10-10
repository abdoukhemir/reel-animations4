import React from "react";

// Overlay zone: y 1250 to 1600, 60 px side margins.
export const ZONE_TOP = 1250;
export const ZONE_HEIGHT = 350;
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