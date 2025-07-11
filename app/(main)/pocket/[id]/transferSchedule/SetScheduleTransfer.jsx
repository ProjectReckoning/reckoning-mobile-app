import { Box } from "@/components/ui/box";
import ScheduleTransferContent from "@/components/feature/transferSchedule/SetScheduleTransferContent";

import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";

export default function SetScheduleTransfer() {
  const { setType } = useTransactionStore();

  useFocusEffect(
    useCallback(() => {
      setType({ id: "transfer_bulanan", name: "transfer bulanan" });
    }, []),
  );

  return (
    <Box className="flex-1 bg-white">
      <ScheduleTransferContent />
    </Box>
  );
}
