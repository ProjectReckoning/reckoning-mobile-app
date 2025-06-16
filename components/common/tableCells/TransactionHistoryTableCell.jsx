// components/common/tableCells/TransactionHistoryTableCell.jsx
import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { WondrColors } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import { Crown } from "lucide-react-native";

export default function TransactionHistoryTableCell({ data }) {
  const isIncoming = data.transaction_type === 1;

  const displayAmount = formatCurrency(Math.abs(data.amount));
  const amountColor = isIncoming
    ? WondrColors["tosca-wondr"]
    : WondrColors["red-wondr"];
  const amountSign = isIncoming ? "+" : "-";

  return (
    <Box className="flex-row p-2 items-center justify-between">
      {/* This Box now groups the icon and description, and is given flex-1 */}
      {/* 'pr-2' adds padding to the right, creating a gap before the amount */}
      <Box className="flex-row gap-2 items-center flex-1 pr-2">
        <Box className="rounded-full bg-light-gray-wondr p-2">
          <Crown size={32} color={WondrColors["dark-gray-wondr"]} />
        </Box>

        {/* This inner Box no longer needs flex-1. It will naturally take remaining space */}
        {/* within its flex-1 parent, and flex-shrink ensures its content truncates */}
        <Box className="flex-shrink">
          {/* flex-shrink allows this box to shrink if necessary */}
          <VStack>
            <Text className="font-bold text-lg">{data.type}</Text>
            <Text
              className="font-base text-base"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.description}
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* This Box contains the amount and is explicitly prevented from shrinking */}
      <Box style={{ flexShrink: 0 }}>
        <Text
          style={[{ fontSize: 16, fontWeight: "bold" }, { color: amountColor }]}
        >
          {amountSign}
          {displayAmount}
        </Text>
      </Box>
    </Box>
  );
}
