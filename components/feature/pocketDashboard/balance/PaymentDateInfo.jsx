import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function PaymentDateInfo({ deadline }) {
  // lastPaymentDate can be a fixed value or fetched elsewhere if dynamic.
  // For now, it's hardcoded as it wasn't part of the 'data' prop from PocketDashboardScreen.
  const lastPaymentDate = "18 Nov 2025";

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
              <Text className="text-white font-semibold">{deadline}</Text>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </>
  );
}
