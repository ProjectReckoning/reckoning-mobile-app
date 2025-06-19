import React from "react";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function AccountNumber({ accNumber }) {
  return (
    <>
      <Box className="flex flex-row rounded-xl justify-between p-2 mb-2 bg-orange-wondr">
        <Text className="text-white font-semibold">Account Number</Text>
        <Pressable>
          <Text className="text-white font-semibold">{accNumber}</Text>
        </Pressable>
      </Box>
    </>
  );
}
