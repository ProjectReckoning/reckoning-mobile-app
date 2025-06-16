import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { Plane, ChevronRight } from "lucide-react-native";
import { Dimensions } from "react-native"; // Import Dimensions

import TravelIconWithBar from "@/components/common/icons/TravelIconWithBar";
import { WondrColors } from "@/utils/colorUtils";

export default function PocketDetail() {
  // Get screen dimensions for responsive scaling
  const { width: screenWidth } = Dimensions.get("window");

  // Figma base dimensions for scaling the component's max height
  // (These values are consistent with what's used in TravelIconWithBar)
  const figmaBaseScreenWidth = 906;
  const figmaTotalComponentHeight = 159; // The desired height of the entire card in Figma

  // Calculate the scaling factor based on screen width
  const scaleFactor = screenWidth / figmaBaseScreenWidth;

  // Calculate the maximum height for the HStack based on Figma proportions
  const maxHStackHeight = figmaTotalComponentHeight * scaleFactor;

  const [pocketData, setPocketData] = useState({
    title: "Pergi ke Korea 2026",
    type: "Saving Pocket",
    createdDate: "Pocket ini dibuat tanggal 16 Juni 2025",
  });

  return (
    <Box className="mb-4">
      <Text className="font-extrabold text-xl mb-2">Pocket Detail</Text>

      <HStack
        className="rounded-2xl justify-center items-center" // Removed 'items-center' in previous step to allow stretching
        style={{
          borderWidth: 0.5, // The HStack draws the border for the entire row
          borderColor: WondrColors["dark-gray-wondr"],
          overflow: "hidden", // Crucial for clipping children content to the rounded corners
          maxHeight: maxHStackHeight, // <--- ADDED: Constrains the maximum height of the entire card
        }}
      >
        <TravelIconWithBar
          IconComponent={Plane}
          iconSize={64} // Keeping your current iconSize of 64
          iconColor="white"
          mainBgColorKey="orange-wondr"
          outerBgColorKey="orange-wondr-light-translucent"
          outerContainerStyle={{
            marginLeft: -1, // Pulls icon's left border 1px left to overlap HStack's border
            marginTop: -1, // Pulls icon's top border 1px up to overlap HStack's border
            marginBottom: -1, // Pulls icon's bottom border 1px down to overlap HStack's border
          }}
        />
        {/* This VStack contains the text and now gets the necessary padding */}
        <VStack
          className="ml-4 justify-center"
          style={{
            paddingVertical: 8, // Add vertical padding for the text content
            paddingRight: 8, // Add right padding for the text content
          }}
        >
          <Text className="font-extrabold text-xl">{pocketData.title}</Text>
          <Text className="text-dark-gray-wondr text-lg">
            {pocketData.type}
          </Text>
          <Text className="text-dark-gray-wondr">{pocketData.createdDate}</Text>
        </VStack>
        <Box className="p-4">
          <ChevronRight />
        </Box>
      </HStack>
    </Box>
  );
}
