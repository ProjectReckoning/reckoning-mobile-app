// components/feature/pocketDashboard/common/SharedPocketButtonGroup.jsx
import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Target, ChevronRight, TimerReset } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";
import { router, useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import ErrorModal from "@/components/common/ErrorModal";
import { modalData } from "@/utils/mockData/modalData";

export default function SharedPocketButtonGroup() {
  const { id } = useLocalSearchParams();
  const { currentPocket, changePocketType, isUpdating } = usePocketStore();
  const { getAutoBudget, isFetchingAutoBudget } = useTransactionStore();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeToSavingModalData = modalData.find(
    (item) => item.id === "CHANGE_TO_SAVING_POCKET",
  );

  const handleChangeTarget = () => {
    router.push(`/(main)/pocket/${id}/transaction/setTarget`);
  };

  const handleSetTarget = () => {
    setIsModalVisible(true);
  };

  const handleConfirmChangeType = async () => {
    if (!id || isUpdating) return;
    try {
      await changePocketType(id, "saving");
      setIsModalVisible(false);
      router.push(`/(main)/pocket/${id}/transaction/setTarget`);
    } catch (error) {
      setIsModalVisible(false);
      Alert.alert("Error", "Gagal mengubah tipe pocket.");
    }
  };

  const handleAutoBudgeting = async () => {
    if (!id || isFetchingAutoBudget || !currentPocket) return;
    try {
      const autoBudgetConfig = await getAutoBudget(id);
      if (autoBudgetConfig) {
        // If config exists, navigate to confirmation with all necessary data
        router.push({
          pathname: `/(main)/pocket/${id}/transaction/autoBudgeting/autoBudgetingConfirmation`,
          params: {
            ...autoBudgetConfig,
            pocketId: id,
            pocketName: currentPocket.name,
            pocketAccountNumber: currentPocket.account_number,
            pocketColor: currentPocket.color,
            pocketIcon: currentPocket.icon_name,
          },
        });
      } else {
        // If no config, navigate to the setup screen
        router.push(`/(main)/pocket/${id}/transaction/autoBudgeting`);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal memeriksa status Auto-Budget.");
    }
  };

  const isSavingPocket = currentPocket?.type === "Saving";
  const isOwnerAdmin =
    currentPocket?.user_role === "admin" ||
    currentPocket?.user_role === "owner";

  return (
    <>
      <Box className="m-2">
        <VStack className="gap-4">
          <Pressable
            className="flex-row items-center justify-between"
            onPress={isSavingPocket ? handleChangeTarget : handleSetTarget}
            disabled={!currentPocket || !isOwnerAdmin}
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
            disabled={!currentPocket || isFetchingAutoBudget}
          >
            <Box className="flex-row items-center gap-2">
              <TimerReset size={24} color={WondrColors["purple-wondr"]} />
              <AppText variant="cardTitle">Auto Budgeting</AppText>
            </Box>
            {isFetchingAutoBudget ? (
              <ActivityIndicator />
            ) : (
              <ChevronRight size={24} color="black" />
            )}
          </Pressable>
        </VStack>
      </Box>

      {changeToSavingModalData && (
        <ErrorModal
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={changeToSavingModalData.title}
          subtitle={changeToSavingModalData.subTitle}
          imageSource={changeToSavingModalData.image}
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
