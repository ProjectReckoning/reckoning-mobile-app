import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { WondrColors } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import { Crown } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";

export default function TransactionHistoryTableCell({ data }) {
  const isIncoming = data.transaction_type === 1;
  const displayAmount = formatCurrency(Math.abs(data.amount));
  const amountColor = isIncoming
    ? WondrColors["tosca-wondr"]
    : WondrColors["red-wondr"];
  const amountSign = isIncoming ? "+" : "-";

  return (
    <Box className="flex-row p-2 items-center justify-between">
      <Box className="flex-row gap-2 items-center flex-1 pr-2">
        <Box className="rounded-full bg-light-gray-wondr p-2">
          <Crown size={32} color={WondrColors["dark-gray-wondr"]} />
        </Box>
        <Box className="flex-shrink">
          <VStack>
            <AppText variant="bodyBold">{data.type}</AppText>
            <AppText variant="body" numberOfLines={1} ellipsizeMode="tail">
              {data.description}
            </AppText>
          </VStack>
        </Box>
      </Box>
      <Box style={{ flexShrink: 0 }}>
        <AppText variant="bodyBold" style={{ color: amountColor }}>
          {`${amountSign}${displayAmount}`}
        </AppText>
      </Box>
    </Box>
  );
}
