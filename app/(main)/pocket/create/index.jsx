// app/(main)/pocket/create/index.jsx
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { useState } from "react";
import { router } from "expo-router";

// --- NEW: Import our reusable ScreenContainer ---
import ScreenContainer from "../../../../components/common/ScreenContainer";

// Note: The custom AppBar is no longer needed if you hide the default header
// and use ScreenContainer, as ScreenContainer provides the top safe area.
// However, to minimize changes, we will keep it for now.
import AppBar from "../../../../components/common/AppBar";
import { usePocketStore } from "../../../../stores/pocketStore";
import { pocketTypes } from "../../../../utils/createPocket/pocketTypeData";
import PocketTypeCard from "../../../../components/feature/createPocket/PocketTypeCard";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

export default function CreatePocket() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { pocketType, setPocketSubject, setPocketType } = usePocketStore();

  const GoToNext = () => {
    if (pocketType === "Spending") {
      router.push("pocket/create/Customization");
    } else if (pocketType === "Saving" || pocketType === "Business Fund") {
      router.push("pocket/create/SelectGoal");
    }
  };

  return (
    // --- FIX: Use ScreenContainer as the root element ---
    <ScreenContainer className="bg-white justify-stretch">
      <Box className="w-full h-56 bg-[#C2F0ED] absolute top-0"></Box>

      <Box className="flex-1 flex-col px-6 justify-between">
        {/* The AppBar is now inside the safe area provided by ScreenContainer */}
        <VStack space="4xl" reversed={false} className="pt-5">
          <AppBar title="" />

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
    </ScreenContainer>
  );
}
