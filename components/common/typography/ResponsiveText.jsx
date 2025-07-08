import React from "react";
import { Dimensions, PixelRatio } from "react-native";
import { Text } from "@/components/ui/text";

const { width: screenWidth } = Dimensions.get("window");

/**
 * A more robust responsive Text component for React Native.
 * It scales font size based on screen width but clamps it between a min and max
 * value to prevent text from becoming too small or too large.
 */
export default function ResponsiveText({
  baseFontSize = 16,
  referenceScreenWidth = 390, // A more standard reference width (e.g., iPhone 12/13/14)
  minFontSize, // Optional: The smallest the font can get
  maxFontSize, // Optional: The largest the font can get
  adjustsFontSizeToFit = false, // Changed default to false, enable it explicitly when needed
  truncate = false,
  style,
  children,
  ...rest
}) {
  // Calculate the raw scale factor
  const scaleFactor = screenWidth / referenceScreenWidth;

  // Calculate the font size based on the scale factor
  let responsiveFontSize = baseFontSize * scaleFactor;

  // Clamp the font size between the min and max values, if they are provided
  if (minFontSize) {
    responsiveFontSize = Math.max(minFontSize, responsiveFontSize);
  }
  if (maxFontSize) {
    responsiveFontSize = Math.min(maxFontSize, responsiveFontSize);
  }

  // Apply the system's font scale for accessibility AFTER clamping
  const finalSize = Math.round(responsiveFontSize * PixelRatio.getFontScale());

  const textProps = truncate ? { numberOfLines: 1, ellipsizeMode: "tail" } : {};

  return (
    <Text
      style={[{ fontSize: finalSize }, style]}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      {...textProps}
      {...rest}
    >
      {children}
    </Text>
  );
}
