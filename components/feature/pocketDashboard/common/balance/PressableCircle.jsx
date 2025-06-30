import React, { useState, useMemo } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import AppText from "@/components/common/typography/AppText";
import { formatRupiah } from "@/utils/helperFunction";

const DEFAULT_CIRCLE_SIZE = 100;

/**
 * A pressable circle component that displays different financial values
 * based on the pocket type.
 *
 * For 'Business' pockets, it cycles through Saldo, Pemasukan, and Pengeluaran.
 * For other types, it only shows Saldo.
 */
export default function PressableCircle({
  calculatedCircleDimension,
  pocketType,
  currentBalance = 0,
  income = 0,
  expense = 0,
}) {
  const [displayIndex, setDisplayIndex] = useState(0);

  // Memoize the data array to prevent re-creation on every render
  const displayData = useMemo(() => {
    if (pocketType === "Business") {
      return [
        { title: "Saldo", amount: currentBalance, color: "bg-tosca-wondr" },
        { title: "Pemasukan", amount: income, color: "bg-green-wondr" },
        { title: "Pengeluaran", amount: expense, color: "bg-red-wondr" },
      ];
    }
    // Default for 'Spending' or other types
    return [
      { title: "Saldo", amount: currentBalance, color: "bg-tosca-wondr" },
    ];
  }, [pocketType, currentBalance, income, expense]);

  const handlePress = () => {
    // Only allow cycling for business pockets
    if (pocketType === "Business") {
      setDisplayIndex((prevIndex) => (prevIndex + 1) % displayData.length);
    }
  };

  const circleSize =
    typeof calculatedCircleDimension === "number" &&
    !isNaN(calculatedCircleDimension) &&
    calculatedCircleDimension > 0
      ? calculatedCircleDimension
      : DEFAULT_CIRCLE_SIZE;

  const currentDisplay = displayData[displayIndex];

  return (
    <Pressable
      onPress={handlePress}
      className="justify-center items-center rounded-full bg-white"
      style={{
        width: circleSize,
        height: circleSize,
      }}
    >
      <Box
        className={`justify-center items-center rounded-full ${currentDisplay.color}`}
        style={{
          width: circleSize - 20,
          height: circleSize - 20,
        }}
      >
        <Box
          className="justify-center items-center rounded-full elevation-5 bg-white p-2"
          style={{
            width: circleSize - 65,
            height: circleSize - 65,
          }}
        >
          <AppText variant="body" className="font-light text-black">
            {currentDisplay.title}
          </AppText>
          <AppText
            variant="pageTitle"
            className="font-bold text-black"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatRupiah(currentDisplay.amount)}
          </AppText>
        </Box>
      </Box>
    </Pressable>
  );
}
