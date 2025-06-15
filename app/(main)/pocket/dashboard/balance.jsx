import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import AccountNumber from "@/components/feature/pocketDashboard/AccountNumber";
import PaymentDateInfo from "@/components/feature/pocketDashboard/PaymentDateInfo";
import CircularProgressBar from "@/components/feature/pocketDashboard/CircularProgressBar";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/TransactionButtonGroup";

export default function BalanceScreen() {
  const { width: screenWidth } = Dimensions.get("window");
  const circleSizePercentageOfScreenWidth = 520 / 906;
  const calculatedCircleDimension =
    screenWidth * circleSizePercentageOfScreenWidth;

  const overlapAmount = calculatedCircleDimension / 4.25;

  return (
    <>
      <Box className="flex-1 bg-white">
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
        <Box>
          <TransactionButtonGroup />
        </Box>
      </Box>
    </>
  );
}
