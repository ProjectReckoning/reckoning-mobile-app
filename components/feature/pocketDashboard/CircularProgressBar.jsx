import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function CircularProgressBar({ calculatedCircleDimension }) {
  return (
    <>
      <Box
        style={{
          width: calculatedCircleDimension,
          height: calculatedCircleDimension,
          borderRadius: calculatedCircleDimension / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bg-white mb-2"
      >
        <Box
          style={{
            width: calculatedCircleDimension - 20,
            height: calculatedCircleDimension - 20,
            borderRadius: (calculatedCircleDimension - 20) / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="bg-tosca-wondr"
        >
          <Text className="text-xl font-bold">Chart Container</Text>
          <Text className="text-sm">
            Dynamic Size: {calculatedCircleDimension.toFixed(2)}px
          </Text>
        </Box>
      </Box>
    </>
  );
}
