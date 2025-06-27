import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import AppText from "@/components/common/typography/AppText";
import { usePocketStore } from "@/stores/pocketStore";
import { Pressable } from "@/components/ui/pressable";
import { CalendarClock, ChartLine } from "lucide-react-native";

export default function BusinessDashboardButtonGroup() {
  return (
    <Box className="rounded-xl p-3 mb-4 bg-purple-wondr">
      <HStack className="justify-between items-center">
        <VStack>
          <Pressable className="items-center">
            <CalendarClock size={24} color={"white"} />
            <AppText variant="caption" className="text-white font-semibold">
              Schedule
            </AppText>
          </Pressable>
        </VStack>
        <VStack className="items-end">
          <Pressable className="items-center">
            <ChartLine size={24} color={"white"} />
            <AppText variant="caption" className="text-white font-semibold">
              Analytics
            </AppText>
          </Pressable>
        </VStack>
      </HStack>
    </Box>
  );
}
