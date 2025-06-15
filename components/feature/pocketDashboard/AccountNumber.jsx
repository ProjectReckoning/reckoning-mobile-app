import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function AccountNumber() {
  const [accountNumber, setAccountNumber] = useState("1234567890");
  return (
    <>
      <Box className="flex flex-row rounded-xl justify-between p-2 mb-2 bg-orange-wondr">
        <Text className="text-white font-semibold">Account Number</Text>
        <Pressable>
          <Text className="text-white font-semibold">{accountNumber}</Text>
        </Pressable>
      </Box>
    </>
  );
}
