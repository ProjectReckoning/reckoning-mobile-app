import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import AccountNumber from "@/components/feature/pocketDashboard/balance/AccountNumber";
import PaymentDateInfo from "@/components/feature/pocketDashboard/balance/PaymentDateInfo";
import CircularProgressBar from "@/components/feature/pocketDashboard/balance/CircularProgressBar";
import TransactionButtonGroup from "@/components/feature/pocketDashboard/balance/TransactionButtonGroup";
import BalanceMemberList from "@/components/feature/pocketDashboard/balance/BalanceMemberList";
import { formatDateWithMonthAbbreviation } from "@/utils/helperFunction";

export default function BalanceScreen({ data }) {
  const { width: screenWidth } = Dimensions.get("window");
  const circleSizePercentageOfScreenWidth = 520 / 906;
  const calculatedCircleDimension =
    screenWidth * circleSizePercentageOfScreenWidth;
  const overlapAmount = calculatedCircleDimension / 4.25;

  const accountNumber = data.account_number;
  const targetDeadline = formatDateWithMonthAbbreviation(data.deadline);
  const currAmount = data.current_balance;
  const goalAmount = data.target_nominal;

  console.log("BalanceScreen received and processed data:", data);

  return (
    <>
      <Box className="flex-1 bg-white">
        <AccountNumber accNumber={accountNumber} />
        <PaymentDateInfo deadline={targetDeadline} />
        <Box
          className="items-center"
          style={{ marginTop: -overlapAmount, zIndex: 1 }}
        >
          <CircularProgressBar
            calculatedCircleDimension={calculatedCircleDimension}
            currentAmount={Number(currAmount)}
            targetAmount={Number(goalAmount)}
          />
        </Box>
        <Box>
          <TransactionButtonGroup />
        </Box>
        <Box className="flex-1">
          <BalanceMemberList
            members={data.members}
            targetNominal={data.target_nominal}
          />
        </Box>
      </Box>
    </>
  );
}
