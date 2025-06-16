import React from "react";
import { Box } from "@/components/ui/box";

import PocketDashboardTopBar from "@/components/feature/pocketDashboard/PocketDashboardTopBar";
import BalanceScreen from "./balance";
import HistoryScreen from "./history";
import InfoScreen from "./info";

export default function PocketDashboard() {
  return (
    <>
      <Box className="flex-1 bg-white px-8">
        <PocketDashboardTopBar />
        <HistoryScreen />
      </Box>
    </>
  );
}
