// This file will contain your named color palette
export const WondrColors = {
  "pink-wondr": "#FDA9FF",
  "pink-wondr-dark": "#E190E0",
  "pink-wondr-translucent": "#FDA9FFCC", // 80% opacity
  "pink-wondr-light-translucent": "#F8D6FF", // 30% opacity

  "purple-wondr": "#A471E1",
  "purple-wondr-dark": "#8B5BB5",
  "purple-wondr-translucent": "#A471E1CC", // 80% opacity
  "purple-wondr-light-translucent": "#D2A9F7", // 30% opacity

  "tosca-wondr": "#3FD8D4",
  "tosca-wondr-dark": "#2EACAA",
  "tosca-wondr-translucent": "#3FD8D4CC", // 80% opacity
  "tosca-wondr-light-translucent": "#C2F0ED", // 30% opacity

  "lime-wondr": "#DEEF5A",
  "lime-wondr-dark": "#B5D040",
  "lime-wondr-translucent": "#DEEF5ACC", // 80% opacity
  "lime-wondr-light-translucent": "#F0F88D", // 30% opacity

  "orange-wondr": "#FF8500",
  "orange-wondr-dark": "#E17500",
  "orange-wondr-translucent": "#FF8500CC", // 80% opacity
  "orange-wondr-light-translucent": "#FFE7CC", // 30% opacity

  "yellow-wondr": "#FFC533",
  "yellow-wondr-dark": "#D4A82A",
  "yellow-wondr-translucent": "#FFC533CC", // 80% opacity
  "yellow-wondr-light-translucent": "#FFF1A3", // 30% opacity

  "red-wondr": "#D65C5B",
  "red-wondr-dark": "#B24F4F",
  "red-wondr-translucent": "#D65C5BCC", // 80% opacity
  "red-wondr-light-translucent": "#F1A6A5", // 30% opacity

  "green-wondr": "#02C694",
  "green-wondr-dark": "#01A37B",
  "green-wondr-translucent": "#02C694CC", // 80% opacity
  "green-wondr-light-translucent": "#7DF3D8", // 30% opacity

  "light-gray-wondr": "#F0F0F0",
  "dark-gray-wondr": "#848688",
};

// This array is derived from WondrColors for sequential assignment (e.g., to progress bars)
// light-gray-wondr is NOT included here as it's a fixed background color, not part of the cycle.
// You might want to update this palette to use the 'light-translucent' versions if that's the primary use case.
export const COLOR_PALETTE = [
  WondrColors["tosca-wondr"],
  WondrColors["pink-wondr"],
  WondrColors["purple-wondr"],
  WondrColors["lime-wondr"],
  WondrColors["orange-wondr"],
  WondrColors["yellow-wondr"],
  WondrColors["red-wondr"],
  WondrColors["green-wondr"],
];

// If you want the COLOR_PALETTE itself to be these lighter translucent colors, you would change it like this:
export const COLOR_PALETTE_LIGHT_TRANSLUCENT = [
  WondrColors["tosca-wondr-light-translucent"],
  WondrColors["pink-wondr-light-translucent"],
  WondrColors["purple-wondr-light-translucent"],
  WondrColors["lime-wondr-light-translucent"],
  WondrColors["orange-wondr-light-translucent"],
  WondrColors["yellow-wondr-light-translucent"],
  WondrColors["red-wondr-light-translucent"],
  WondrColors["green-wondr-light-translucent"],
];
