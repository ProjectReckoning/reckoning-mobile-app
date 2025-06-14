import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { goals } from "../../../utils/goalData";
import GoalDecorator from "../../../assets/images/decorators/goal-decorator.png";
import GoalCard from "../../../components/common/cards/GoalCard";
import PrimaryButton from "../../../components/common/buttons/PrimaryButton";

export default function SelectGoal() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleBack = () => {
    router.back();
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
          <Pressable onPress={handleBack}>
            <ArrowLeft size={24} />
          </Pressable>

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
              {goals.map((goalProps, i) => (
                <Box key={i} className="w-[48%] mb-5">
                  <GoalCard
                    {...goalProps}
                    selected={selectedIndex === i}
                    onPress={() => setSelectedIndex(i)}
                  />
                </Box>
              ))}
            </Box>
          </ScrollView>
          <PrimaryButton buttonTitle="Lanjut" className="mt-3 mb-8" />
        </Box>
      </Box>
    </Box>
  );
}
