import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import AccountNumber from "@/components/feature/pocketDashboard/common/balance/AccountNumber";
import PaymentDateInfo from "@/components/feature/pocketDashboard/common/balance/PaymentDateInfo";
import PressableCircle from "@/components/feature/pocketDashboard/common/balance/PressableCircle";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/common/balance/TransactionButtonGroup";
import SharedPocketButtonGroup from "@/components/feature/pocketDashboard/common/SharedPocketButtonGroup";
import BalanceMemberList from "@/components/feature/pocketDashboard/common/balance/BalanceMemberList";
import AppText from "@/components/common/typography/AppText";

/**
 * Renders the 'Balance' tab for a Spending pocket, passing the correct
 * data to the pressable circle.
 */
export default function SpendingBalanceScreen() {
  const currentPocket = usePocketStore((state) => state.currentPocket);

  if (!currentPocket) {
    return null;
  }

  const { width: screenWidth } = Dimensions.get("window");
  const circleSizePercentageOfScreenWidth = 520 / 906;
  const calculatedCircleDimension =
    screenWidth * circleSizePercentageOfScreenWidth;
  const overlapAmount = calculatedCircleDimension / 4.25;

  return (
    <Box className="flex-1 bg-white">
      {/* --- Static Header Content --- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <AccountNumber />
        <PaymentDateInfo />
        <Box
          className="items-center"
          style={{ marginTop: -overlapAmount, zIndex: 1 }}
        >
          <PressableCircle
            calculatedCircleDimension={calculatedCircleDimension}
            pocketType={currentPocket.type}
            currentBalance={currentPocket.current_balance}
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
      </ScrollView>
    </Box>
  );
}
