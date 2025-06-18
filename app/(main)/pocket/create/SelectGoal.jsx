import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native";

import AppBar from "../../../../components/common/AppBar";
import { usePocketStore } from "../../../../stores/pocketStore";
import { savingGoals } from "../../../../utils/createPocket/goalData";
import GoalCard from "../../../../components/feature/createPocket/GoalCard";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";
import GoalDecorator from "../../../../assets/images/decorators/goal-decorator.png";

export default function SelectGoal() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { pocketType, setGoalTitle } = usePocketStore();

  const GoToDetails = () => {
    router.push("pocket/create/Details");
  };

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="w-full h-56 bg-[#C2F0ED] absolute top-0"></Box>

      <Box className="w-52 absolute right-0 top-2">
        <Image
          source={GoalDecorator}
          alt="pocket-type-decorator"
          className="w-full h-64"
          resizeMode="contain"
        />
      </Box>

      <Box className="flex-1 flex-col px-6 pt-5 justify-between">
        <VStack space="4xl" reversed={false}>
          <AppBar title={pocketType} className="bg-[#C2F0ED]" />

          <VStack space="xs" reversed={false}>
            <Heading size="xl" className="text-bold">
              Choose your goal!
            </Heading>

            <Text className="w-72 text-lg">
              Apapun aktivitasmu, mulai segala pengalamanmu di wondr!
            </Text>
          </VStack>
        </VStack>

        <Box className="flex-1 justify-between mt-5">
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingRight: 10 }}
            style={{ marginRight: -10 }}
          >
            <Box className="flex flex-row flex-wrap justify-between">
              {savingGoals.map((goalProps, i) => (
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
              ))}
            </Box>
          </ScrollView>
          <PrimaryButton
            buttonAction={GoToDetails}
            buttonTitle="Lanjut"
            disabled={selectedIndex === null}
            className="mt-3 mb-8"
          />
        </Box>
      </Box>
    </Box>
  );
}
