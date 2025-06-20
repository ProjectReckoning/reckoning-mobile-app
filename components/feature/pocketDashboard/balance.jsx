import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import AccountNumber from "@/components/feature/pocketDashboard/balance/AccountNumber";
import PaymentDateInfo from "@/components/feature/pocketDashboard/balance/PaymentDateInfo";
import CircularProgressBar from "@/components/feature/pocketDashboard/balance/CircularProgressBar";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/balance/TransactionButtonGroup";
import BalanceMemberList from "@/components/feature/pocketDashboard/balance/BalanceMemberList";
import AppText from "@/components/common/typography/AppText";

/**
 * Renders the 'Balance' tab, showing account details, progress,
 * transaction buttons, and a list of member targets.
 */
export default function BalanceScreen() {
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
      <PaymentDateInfo />
      <Box
        className="items-center"
        style={{ marginTop: -overlapAmount, zIndex: 1 }}
      >
        <CircularProgressBar
          calculatedCircleDimension={calculatedCircleDimension}
        />
      </Box>
      <TransactionButtonGroup />

      {/* --- Scrollable List Section --- */}
      <Box className="flex-1 mt-4">
        <AppText variant="pageTitle" className="mb-4">
          Target Detail
        </AppText>
        <BalanceMemberList />
      </Box>
    </Box>
  );
}
