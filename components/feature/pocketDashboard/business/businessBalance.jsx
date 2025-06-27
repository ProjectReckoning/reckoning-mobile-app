import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import AccountNumber from "@/components/feature/pocketDashboard/common/balance/AccountNumber";
import BusinessDashboardButtonGroup from "@/components/feature/pocketDashboard/business/balance/BusinessDashboardButtonGroup";
import PressableCircle from "@/components/feature/pocketDashboard/common/balance/PressableCircle";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/common/balance/TransactionButtonGroup";
import AppText from "@/components/common/typography/AppText";
import BalanceCategory from "@/components/feature/pocketDashboard/common/BalanceCategory";

/**
 * Renders the 'Balance' tab, showing account details, progress,
 * transaction buttons, and a list of member targets.
 */
export default function BusinessBalanceScreen() {
  const currentPocket = usePocketStore((state) => state.currentPocket);

  if (!currentPocket) {
    return null;
  }

  const { width: screenWidth } = Dimensions.get("window");
  // Maintain a consistent size ratio for the progress circle based on original design.
  const circleSizePercentageOfScreenWidth = 520 / 906;
  const calculatedCircleDimension =
    screenWidth * circleSizePercentageOfScreenWidth;
  // Calculate overlap to create the desired visual effect.
  const overlapAmount = calculatedCircleDimension / 4.25;

  return (
    <Box className="flex-1 bg-white">
      {/* --- Static Header Content --- */}
      <AccountNumber />
      <BusinessDashboardButtonGroup />
      <Box
        className="items-center"
        style={{ marginTop: -overlapAmount, zIndex: 1 }}
      >
        <PressableCircle
          calculatedCircleDimension={calculatedCircleDimension}
        />
      </Box>
      <TransactionButtonGroup />

      {/* --- Scrollable List Section --- */}
      <Box className="flex-1 mt-4">
        <AppText variant="pageTitle" className="mb-4">
          Rekap Keuangan
        </AppText>
        <BalanceCategory />
      </Box>
    </Box>
  );
}
