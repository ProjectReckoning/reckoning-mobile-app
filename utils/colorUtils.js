// This file will contain your named color palette
export const WondrColors = {
  "pink-wondr": "#FDA9FF",
  "pink-wondr-dark": "#E190E0",

  "purple-wondr": "#A471E1",
  "purple-wondr-dark": "#8B5BB5",

  "tosca-wondr": "#3FD8D4",
  "tosca-wondr-dark": "#2EACAA",

  "lime-wondr": "#DEEF5A",
  "lime-wondr-dark": "#B5D040",

  "orange-wondr": "#FF8500",
  "orange-wondr-dark": "#E17500",

  "yellow-wondr": "#FFC533",
  "yellow-wondr-dark": "#D4A82A",

  "red-wondr": "#D65C5B",
  "red-wondr-dark": "#B24F4F",

  "green-wondr": "#02C694",
  "green-wondr-dark": "#01A37B",

  // --- NEW: Add light-gray-wondr ---
  "light-gray-wondr": "#F0F0F0",
};

// This array is derived from WondrColors for sequential assignment (e.g., to progress bars)
// light-gray-wondr is NOT included here as it's a fixed background color, not part of the cycle.
export const COLOR_PALETTE = [
  WondrColors["pink-wondr"],
  WondrColors["purple-wondr"],
  WondrColors["tosca-wondr"],
  WondrColors["lime-wondr"],
  WondrColors["orange-wondr"],
  WondrColors["yellow-wondr"],
  WondrColors["red-wondr"],
  WondrColors["green-wondr"],
];
