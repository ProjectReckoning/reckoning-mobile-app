import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import AppText from "@/components/common/typography/AppText";
import { usePocketStore } from "@/stores/pocketStore";
import { formatDateWithMonthAbbreviation } from "@/utils/helperFunction";

export default function PaymentDateInfo() {
  const deadline = usePocketStore((state) => state.currentPocket?.deadline);

  const formattedDeadline = deadline
    ? formatDateWithMonthAbbreviation(deadline)
    : "-";

  // TODO: This value should be made dynamic and fetched from the store/API.
  const lastPaymentDate = "18 Nov 2025";

  return (
    <Box className="rounded-xl p-3 mb-4 bg-purple-wondr">
      <HStack className="justify-between items-center">
        <VStack>
          <AppText variant="small" className="text-white font-light">
            Terakhir Bayar
          </AppText>
          <AppText variant="caption" className="text-white font-semibold">
            {lastPaymentDate}
          </AppText>
        </VStack>
        <VStack className="items-end">
          <AppText variant="small" className="text-white font-light">
            Target Selesai
          </AppText>
          <AppText variant="caption" className="text-white font-semibold">
            {formattedDeadline}
          </AppText>
        </VStack>
      </HStack>
    </Box>
  );
}
