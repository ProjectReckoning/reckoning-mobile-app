import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { usePocketStore } from "../../../../stores/pocketStore";
import { pocketTypes } from "../../../../utils/pocketTypeData";
import PocketTypeCard from "../../../../components/common/cards/PocketTypeCard";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

export default function CreatePocket() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { pocketType, setPocketSubject, setPocketType } = usePocketStore();

  const handleBack = () => {
    router.back();
  };

  const GoToNext = () => {
    if (pocketType === "Spending") {
      router.push("pocket/createPocket/Customization");
    } else if (pocketType === "Saving" || pocketType === "Enterprise Fund") {
      router.push("pocket/createPocket/SelectGoal");
    }
  };

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="w-full h-56 bg-[#C2F0ED] absolute top-0"></Box>

      <Box className="flex-1 flex-col px-6 pt-5 justify-between">
        <VStack space="4xl" reversed={false}>
          <Pressable onPress={handleBack}>
            <ArrowLeft size={24} />
          </Pressable>

          <Heading size="xl" className="text-bold">
            Pilih tipe pocket kamu!
          </Heading>
        </VStack>

        <Box className="flex-1 justify-between">
          <VStack space="xl" reversed={false} className="mt-10">
            {pocketTypes.map((pocketTypeProps, i) => (
              <PocketTypeCard
                key={i}
                {...pocketTypeProps}
                selected={selectedIndex === i}
                onPress={() => {
                  setSelectedIndex(selectedIndex === i ? null : i);
                  setPocketType(
                    selectedIndex === i ? null : pocketTypeProps.type,
                  );
                  setPocketSubject(
                    selectedIndex === i ? null : pocketTypeProps.subject,
                  );
                }}
              />
            ))}
          </VStack>

          <PrimaryButton
            buttonAction={GoToNext}
            buttonTitle="Lanjut"
            disabled={selectedIndex === null}
            className="mb-8"
          />
        </Box>
      </Box>
    </Box>
  );
}
