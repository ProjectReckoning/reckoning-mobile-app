// app/(main)/pocket/create/index.jsx
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { useState } from "react";
import { router } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import { pocketTypes } from "@/utils/createPocket/pocketTypeData";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import PocketTypeCard from "@/components/feature/createPocket/PocketTypeCard";

import { id, registerTranslation } from "react-native-paper-dates";
registerTranslation("id", id);

export default function CreatePocket() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { pocketType, setPocketSubject, setPocketType } = usePocketStore();

  const GoToNext = () => {
    if (pocketType === "Spending") {
      router.push("pocket/create/Details");
    } else if (pocketType === "Saving" || pocketType === "Business Fund") {
      router.push("pocket/create/SelectGoal");
    }
  };

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="w-full h-48 bg-[#C3F0EC] absolute top-0"></Box>

      <Box className="flex-1 flex-col px-6 pt-8 justify-between">
        <VStack space="4xl" reversed={false} className="">
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
