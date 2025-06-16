import React from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import * as Progress from "react-native-progress";
import { WondrColors, COLOR_PALETTE } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";

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
  const progress = targetAmount > 0 ? currentAmount / targetAmount : 0;
  const percentage = (progress * 100).toFixed(0);

  const displayInitials = getConsistentInitials(name);
  const selectedColor = COLOR_PALETTE[index % COLOR_PALETTE.length];

  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box className="flex-row items-center p-4 bg-white rounded-lg">
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <Text
          style={{
            color: avatarTextColor,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {displayInitials}
        </Text>
      </Avatar>

      <View className="flex-1">
        <Box className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold text-gray-800 flex-shrink pr-2">
            {name}
          </Text>
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
            <Text className="text-sm font-bold text-white">{percentage}%</Text>
          </Box>
        </Box>

        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          color={selectedColor}
          unfilledColor={WondrColors["light-gray-wondr"]}
          borderWidth={0}
          borderRadius={4}
          style={{ marginBottom: 4 }}
        />

        <Text className="text-sm text-gray-500">
          {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
        </Text>
      </View>
    </Box>
  );
}
