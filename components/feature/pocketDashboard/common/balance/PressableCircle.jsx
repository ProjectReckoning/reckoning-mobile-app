import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import AppText from "@/components/common/typography/AppText";

const DEFAULT_CIRCLE_SIZE = 100;

export default function PressableCircle({ calculatedCircleDimension }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed((prevState) => !prevState);
  };

  const circleSize =
    typeof calculatedCircleDimension === "number" &&
    !isNaN(calculatedCircleDimension) &&
    calculatedCircleDimension > 0
      ? calculatedCircleDimension
      : DEFAULT_CIRCLE_SIZE;

  const displayTitle = isPressed ? "Pengeluaran" : "Saldo";
  const displayAmount = 1000000;

  return (
    <Pressable
      onPress={handlePress}
      className={`
          justify-center 
          items-center 
          rounded-full 
          bg-white
        `}
      style={{
        width: circleSize,
        height: circleSize,
      }}
    >
      <Box
        className={`
          justify-center 
          items-center 
          rounded-full 
          ${isPressed ? "bg-tosca-wondr" : "bg-green-wondr"}
        `}
        style={{
          width: circleSize - 20,
          height: circleSize - 20,
        }}
      >
        <Box
          className={`
          justify-center 
          items-center 
          rounded-full 
          elevation-5
          bg-white
        `}
          style={{
            width: circleSize - 65,
            height: circleSize - 65,
          }}
        >
          <AppText variant="caption" className={`font-bold text-black`}>
            {displayTitle}
          </AppText>
          <AppText variant="pageTitle" className={`font-bold text-black`}>
            {displayAmount.toString()}
          </AppText>
        </Box>
      </Box>
    </Pressable>
  );
}
