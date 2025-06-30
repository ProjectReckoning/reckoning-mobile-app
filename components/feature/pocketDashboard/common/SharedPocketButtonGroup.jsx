import React, { useState } from "react";
import { Alert } from "react-native";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Target, ChevronRight, TimerReset } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";
import { router, useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import ErrorModal from "@/components/common/ErrorModal";
import { modalData } from "@/utils/mockData/modalData";

// Using require for the image asset
const savingDecoratorImage = require("@/assets/images/decorators/savingDecorator.svg");

export default function SharedPocketButtonGroup() {
  const { id } = useLocalSearchParams();
  const { currentPocket, changePocketType, isUpdating } = usePocketStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Find the specific modal content from your data file
  const changeToSavingModalData = modalData.find(
    (item) => item.id === "CHANGE_TO_SAVING_POCKET",
  );

  // Action for existing 'Saving' pockets
  const handleChangeTarget = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/setTarget`);
    } else {
      console.error("Pocket ID is missing, cannot change target.");
    }
  };

  // Action for other pocket types to show the modal
  const handleSetTarget = () => {
    setIsModalVisible(true);
  };

  // Action for the modal's primary button ("Ganti ke Saving")
  const handleConfirmChangeType = async () => {
    if (!id || isUpdating) return;

    try {
      await changePocketType(id, "saving");
      setIsModalVisible(false);
      // Navigate to the set target screen after the type has been successfully changed
      router.push(`/(main)/pocket/${id}/transaction/setTarget`);
    } catch (error) {
      setIsModalVisible(false);
      Alert.alert("Error", "Gagal mengubah tipe pocket. Silakan coba lagi.");
      console.error("Error changing pocket type:", error);
    }
  };

  const handleAutoBudgeting = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/autoBudgeting`);
    } else {
      console.error("Pocket ID is missing, cannot navigate to auto budgeting.");
    }
  };

  const isSavingPocket = currentPocket?.type === "Saving";

  return (
    <>
      <Box className="m-2">
        <VStack className="gap-4">
          <Pressable
            className="flex-row items-center justify-between"
            onPress={isSavingPocket ? handleChangeTarget : handleSetTarget}
            disabled={!currentPocket} // Disable if pocket data isn't loaded
          >
            <Box className="flex-row items-center gap-2">
              <Target size={24} color={WondrColors["orange-wondr"]} />
              <AppText variant="cardTitle">
                {isSavingPocket ? "Change Target" : "Set Target"}
              </AppText>
            </Box>
            <ChevronRight size={24} color="black" />
          </Pressable>
          <Divider />
          <Pressable
            className="flex-row items-center justify-between"
            onPress={handleAutoBudgeting}
            disabled={!currentPocket}
          >
            <Box className="flex-row items-center gap-2">
              <TimerReset size={24} color={WondrColors["purple-wondr"]} />
              <AppText variant="cardTitle">Auto Budgeting</AppText>
            </Box>
            <ChevronRight size={24} color="black" />
          </Pressable>
        </VStack>
      </Box>

      {/* Confirmation Modal */}
      {changeToSavingModalData && (
        <ErrorModal
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={changeToSavingModalData.title}
          subtitle={changeToSavingModalData.subTitle}
          imageSource={savingDecoratorImage}
          showSpecialActions={true}
          specialButton1Title={changeToSavingModalData.buttons[0].text}
          specialButton1Action={handleConfirmChangeType}
          specialButton2Title={changeToSavingModalData.buttons[1].text}
          specialButton2Action={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
}
