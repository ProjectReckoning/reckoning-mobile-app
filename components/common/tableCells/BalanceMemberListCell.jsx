import React from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import * as Progress from "react-native-progress";
import { WondrColors, COLOR_PALETTE } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

const getConsistentInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ").filter(Boolean);

  if (words.length > 1) {
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return "";
};

export default function BalanceMemberListCell({
  name,
  currentAmount,
  targetAmount,
  index,
}) {
  // --- CHANGE: Calculate the raw progress first ---
  const rawProgress =
    targetAmount > 0 ? Number(currentAmount) / Number(targetAmount) : 0;

  // --- CHANGE: Clamp the visual progress to a maximum of 1 (100%) ---
  const visualProgress = Math.min(1, rawProgress);

  // The percentage is now calculated from the capped visual progress
  const percentage = (visualProgress * 100).toFixed(0);

  const displayInitials = getConsistentInitials(name);
  const selectedColor = COLOR_PALETTE[index % COLOR_PALETTE.length];
  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box className="flex-row items-center bg-white rounded-lg">
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <AppText variant="cardTitle" style={{ color: avatarTextColor }}>
          {displayInitials}
        </AppText>
      </Avatar>

      <View className="flex-1">
        <Box className="flex-row justify-between items-center mb-1">
          <AppText variant="cardTitle" className="flex-shrink pr-2">
            {name}
          </AppText>
          <Box
            style={{
              backgroundColor: selectedColor,
              borderRadius: 15,
              paddingVertical: 4,
              paddingHorizontal: 8,
              minWidth: 50,
              alignItems: "center",
            }}
          >
            <AppText variant="caption" className="font-bold text-white">
              {/* This will now be capped at 100% */}
              {percentage}%
            </AppText>
          </Box>
        </Box>

        <Progress.Bar
          // Use the capped visual progress for the progress bar
          progress={visualProgress}
          width={null}
          height={8}
          color={selectedColor}
          unfilledColor={WondrColors["light-gray-wondr"]}
          borderWidth={0}
          borderRadius={4}
          style={{ marginBottom: 4 }}
        />

        <AppText variant="caption">
          {/* The raw amounts are still displayed correctly */}
          {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
        </AppText>
      </View>
    </Box>
  );
}
