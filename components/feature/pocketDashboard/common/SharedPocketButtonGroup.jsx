import React from "react";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Target, ChevronRight, TimerReset } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";
import SquaredButton from "@/components/common/buttons/SquaredButton";
import { router, useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { WondrColors } from "@/utils/colorUtils";

export default function SharedPocketButtonGroup() {
  const { id } = useLocalSearchParams();

  const handleSetTarget = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/setTarget`);
    }
  };

  const handleAutoBudgeting = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/autoBudgeting`);
    }
  };

  return (
    <>
      <Box className="m-2">
        <VStack className="gap-4">
          <Pressable
            className="flex-row items-center justify-between"
            onPress={handleSetTarget}
          >
            <Box className="flex-row items-center gap-2">
              <Target size={24} color={WondrColors["orange-wondr"]} />
              <AppText variant="cardTitle">Change Target</AppText>
            </Box>
            <ChevronRight size={24} color="black" />
          </Pressable>
          <Divider />
          <Pressable
            className="flex-row items-center justify-between"
            onPress={handleAutoBudgeting}
          >
            <Box className="flex-row items-center gap-2">
              <TimerReset size={24} color={WondrColors["purple-wondr"]} />
              <AppText variant="cardTitle">Auto Budgeting</AppText>
            </Box>
            <ChevronRight size={24} color="black" />
          </Pressable>
        </VStack>
      </Box>
    </>
  );
}
