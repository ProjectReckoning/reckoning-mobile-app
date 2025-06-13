import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import GoalDecorator from "../../../assets/images/decorators/goal-decorator.png";
import PocketTypeCard from "../../../components/common/cards/PocketTypeCard";
import PrimaryButton from "../../../components/common/buttons/PrimaryButton";

export default function SelectGoal() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const cards = [
    {
      pocketType: "Personal",
      title: "Saving",
      content: "Capai impian pribadimu dengan menabung bersama.",
    },
    {
      pocketType: "Personal",
      title: "Spending",
      content:
        "Kelola pengeluaran bersama untuk kebutuhan harian atau acara spesial.",
    },
    {
      pocketType: "Business",
      title: "Enterprise Fund",
      content: "Kumpulkan dana untuk proyek bisnis atau operasional tim Anda.",
    },
  ];

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

        <Box className="flex-1 justify-between">
          <VStack space="md" reversed={false} className="mt-5">
            {cards.map((card, idx) => (
              <PocketTypeCard
                key={idx}
                {...card}
                selected={selectedIndex === idx}
                onPress={() => setSelectedIndex(idx)}
              />
            ))}
          </VStack>

          <PrimaryButton buttonTitle="Lanjut" className="mb-8" />
        </Box>
      </Box>
    </Box>
  );
}
