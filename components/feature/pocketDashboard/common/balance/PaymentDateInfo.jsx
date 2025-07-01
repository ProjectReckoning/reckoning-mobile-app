import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import AppText from "@/components/common/typography/AppText";
import { usePocketStore } from "@/stores/pocketStore";
import { formatDateWithMonthAbbreviation } from "@/utils/helperFunction";

export default function PaymentDateInfo() {
  const deadline = usePocketStore((state) => state.currentPocket?.deadline);
  // --- CHANGE: Get the last_topup date from the store ---
  const lastTopupDate = usePocketStore(
    (state) => state.currentPocket?.last_topup?.updatedAt,
  );

  const formattedDeadline = deadline
    ? formatDateWithMonthAbbreviation(deadline)
    : "-";

  // --- CHANGE: Format the lastTopupDate, showing "-" if it's null ---
  const formattedLastTopup = lastTopupDate
    ? formatDateWithMonthAbbreviation(lastTopupDate)
    : "-";

  return (
    <Box className="rounded-xl p-3 mb-4 bg-purple-wondr ">
      <HStack className="justify-between items-center">
        <VStack>
          {/* --- CHANGE: Updated text label --- */}
          <AppText variant="small" className="text-white font-light">
            Terakhir Topup
          </AppText>
          <AppText variant="caption" className="text-white font-semibold">
            {/* --- CHANGE: Use the formatted last topup date --- */}
            {formattedLastTopup}
          </AppText>
        </VStack>
        <VStack className="items-end">
          {/* Mengubah variant dari "caption" ke "body2" agar sedikit lebih besar */}
          <AppText variant="medium" className="text-white font-light">
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
