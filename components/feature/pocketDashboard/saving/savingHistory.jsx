import React from "react";
import { Box } from "@/components/ui/box";
import HistoryContent from "@/components/feature/pocketDashboard/common/history/HistoryContent";

/**
 * Renders the 'History' tab, which contains the transaction history.
 */
export default function SavingHistoryScreen() {
  return (
    <Box className="flex-1 bg-white">
      <HistoryContent />
    </Box>
  );
}
