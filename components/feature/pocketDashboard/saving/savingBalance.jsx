import React from "react";
import { Dimensions, Share } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import AccountNumber from "@/components/feature/pocketDashboard/common/balance/AccountNumber";
import PaymentDateInfo from "@/components/feature/pocketDashboard/common/balance/PaymentDateInfo";
import CircularProgressBar from "@/components/feature/pocketDashboard/common/balance/CircularProgressBar";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/common/balance/TransactionButtonGroup";
import BalanceMemberList from "@/components/feature/pocketDashboard/common/balance/BalanceMemberList";
import SharedPocketButtonGroup from "@/components/feature/pocketDashboard/common/SharedPocketButtonGroup";
import AppText from "@/components/common/typography/AppText";

/**
 * Renders the 'Balance' tab, showing account details, progress,
 * transaction buttons, and a list of member targets.
 */
export default function SavingBalanceScreen() {
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

      <SharedPocketButtonGroup />

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
