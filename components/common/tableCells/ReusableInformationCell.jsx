import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import * as Progress from "react-native-progress";
import {
  WondrColors,
  COLOR_PALETTE_LIGHT_TRANSLUCENT,
} from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import { Crown, EllipsisVertical } from "lucide-react-native";

export default function ReusableInformationCell({
  cellTitle,
  cellValue,
  className,
  textClassName = "text-black text-sm",
}) {
  const value = cellValue || ["baris 1", "baris 2"];

  return (
    <Box gap={10}>
      <Text className="font-semibold text-black">{cellTitle}</Text>
      <Box
        className={`border px-4 py-3 rounded-xl border-gray-wondr-border ${className}`}
      >
        {value.map((item, index) => (
          <Text className={`${textClassName}`} numberOfLines={1} key={index}>
            {item}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
