import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Plane } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";

/**
 * A component displaying an icon within a colored box,
 * with a smaller white bar below it, sized proportionally.
 *
 * @param {object} props - The component props.
 * @param {string} props.iconColor - The color of the icon (e.g., "white").
 * @param {number} props.iconSize - The size of the icon.
 * @param {string} props.mainBgColorKey - The key from WondrColors for the main icon background (e.g., "orange-wondr").
 * @param {string} props.outerBgColorKey - The key from WondrColors for the outer translucent background (e.g., "orange-wondr-light-translucent").
 * @param {React.ElementType} props.IconComponent - The Lucide icon component (e.g., Plane, Gift, etc.).
 * @param {object} [props.outerContainerStyle={}] - Optional style object to apply to the outermost VStack.
 */
export default function TravelIconWithBar({
  iconColor = "white",
  iconSize = 32, // Keeping your current iconSize of 32
  mainBgColorKey = "orange-wondr",
  outerBgColorKey = "orange-wondr-light-translucent",
  IconComponent = Plane,
  outerContainerStyle = {},
}) {
  const { width: screenWidth } = Dimensions.get("window");

  // Figma base dimensions for scaling (used for aspect ratio and internal padding)
  const figmaBaseScreenWidth = 906;
  const figmaTotalComponentHeight = 159;
  const figmaTotalComponentWidth = 147;

  // Calculate the original aspect ratio (width / height)
  const originalAspectRatio =
    figmaTotalComponentWidth / figmaTotalComponentHeight; // 147 / 159 ≈ 0.9245

  // Proportions of internal sections based on Figma design
  const whiteBoxProportion = 1 / 4;
  const orangeBoxProportion = 3 / 4;

  // Scaling factor for elements like icon size and internal padding, based on screen width
  const scaleFactor = screenWidth / figmaBaseScreenWidth;

  const responsiveIconSize = iconSize * scaleFactor;

  // Use a consistent borderRadius value (e.g., 16px to match 'rounded-2xl')
  const borderRadiusValue = 16; // Changed from 15 to 16 for rounded-2xl consistency

  return (
    <VStack
      style={{
        height: "100%", // <--- CHANGED: Use height: "100%" to explicitly match parent's height
        aspectRatio: originalAspectRatio, // Maintain its aspect ratio, so width adjusts based on its height
        backgroundColor: WondrColors[outerBgColorKey],
        overflow: "hidden", // Crucial to clip content to its rounded shape
        borderRadius: borderRadiusValue,
        borderWidth: 0.5, // Keep its own border
        borderColor: WondrColors["dark-gray-wondr"], // Keep its own border color
        ...outerContainerStyle, // Apply external styles from parent (e.g., negative margins for border overlap)
      }}
    >
      {/* Top Section: Contains the orange icon. Its height will be 3/4 of the VStack's dynamic height */}
      <Box
        style={{
          flex: orangeBoxProportion, // Occupy 3/4 of the available height
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 8 * scaleFactor, // Internal padding for the icon, still scaled
        }}
      >
        <Box
          className="rounded-full p-2 items-center justify-center"
          style={{ backgroundColor: WondrColors[mainBgColorKey] }}
        >
          {IconComponent && (
            <IconComponent size={responsiveIconSize} color={iconColor} />
          )}
        </Box>
      </Box>

      {/* Bottom Section: The White bar. Its height will be 1/4 of the VStack's dynamic height */}
      <Box
        className="bg-white"
        style={{
          flex: whiteBoxProportion, // Occupy 1/4 of the available height
          width: "100%",
        }}
      />
    </VStack>
  );
}
