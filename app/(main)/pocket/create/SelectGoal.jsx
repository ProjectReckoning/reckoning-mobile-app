import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { useGlobalStore } from "@/stores/globalStore";
import { savingGoals, businessGoals } from "@/utils/createPocket/goalData";
import GoalCard from "@/components/feature/createPocket/GoalCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import GoalDecorator from "@/assets/images/decorators/goalDecorator.svg";

export default function SelectGoal() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { pocketType, setGoalTitle } = usePocketStore();

  const setSavColor = useCallback(() => {
    useGlobalStore.getState().setSavColor("bg-[#C3F0EC]");
  }, []);
  useFocusEffect(setSavColor);

  const GoToDetails = () => {
    router.push("pocket/create/Details");
  };

  const goals = pocketType === "Business Fund" ? businessGoals : savingGoals;

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box
        className={`w-full h-44 bg-[${WondrColors["tosca-wondr-light-translucent"]}] justify-end items-end absolute top-0`}
      >
        <GoalDecorator width={200} height="100%" />
      </Box>

      <Box className="flex-1 flex-col px-6 py-8 justify-between z-10">
        <VStack space="4xl" reversed={false}>
          <VStack space="xs" reversed={false}>
            <Heading size="xl" className="text-bold">
              Choose your goal!
            </Heading>

            <Text className="w-72 text-lg">
              Apapun aktivitasmu, mulai segala pengalamanmu di wondr!
            </Text>
          </VStack>
        </VStack>

        <Box className="flex-1 justify-between mt-8">
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingRight: 10, paddingBottom: 30 }}
            style={{ marginRight: -10 }}
          >
            <Box className="flex flex-row flex-wrap justify-between">
              {goals.map((goalProps, i) => {
                if (goalProps.isCustom) {
                  // Render Custom Goal as a button
                  return (
                    <Box key={i} className="w-[48%] mb-5">
                      <GoalCard
                        {...goalProps}
                        selected={selectedIndex === i}
                        onPress={() => {
                          setSelectedIndex(i);
                          setGoalTitle(goalProps.title);
                          GoToDetails();
                        }}
                        isCustom
                      />
                    </Box>
                  );
                }
                // Regular goal card
                return (
                  <Box key={i} className="w-[48%] mb-5">
                    <GoalCard
                      {...goalProps}
                      selected={selectedIndex === i}
                      onPress={() => {
                        setSelectedIndex(selectedIndex === i ? null : i);
                        setGoalTitle(
                          selectedIndex === i ? null : goalProps.title,
                        );
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </ScrollView>
          <PrimaryButton
            buttonAction={GoToDetails}
            buttonTitle="Lanjut"
            disabled={selectedIndex === null}
            className="mt-3"
          />
        </Box>
      </Box>
    </Box>
  );
}
