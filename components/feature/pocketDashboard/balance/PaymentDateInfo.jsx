import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function PaymentDateInfo() {
  const [lastPaymentDate, setLastPaymentDate] = useState("18 Nov 2025");
  const [targetDate, setTargetDate] = useState("25 Juni 2026");

  return (
    <>
      <Box className="rounded-xl p-2 mb-4 bg-purple-wondr">
        <HStack className="justify-between">
          <Box>
            <VStack>
              <Text className="text-white font-light">Terakhir Bayar</Text>
              <Text className="text-white font-semibold">
                {lastPaymentDate}
              </Text>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Text className="text-white font-light">Target Selesai</Text>
              <Text className="text-white font-semibold">{targetDate}</Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
