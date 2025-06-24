import { Box } from "@/components/ui/box";
import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { usePocketStore } from "../../../../stores/pocketStore";
import { allPocket } from "../../../../utils/mockData/mockPocketDb";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

import { CommonActions } from "@react-navigation/native";
import PocketCard from "@/components/common/cards/PocketCard";
import { personalIcons } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIcons } from "@/utils/pocketCustomization/businessPocketIconUtils";
import PocketNameInput from "@/components/feature/pocketCustomization/PocketNameInput";
import PocketErrorAlert from "@/components/feature/pocketCustomization/PocketErrorAlert";
import PocketIconSelector from "@/components/feature/pocketCustomization/PocketIconSelector";
import PocketColorSelector from "@/components/feature/pocketCustomization/PocketColorSelector";

const colors = [
  "bg-orange-wondr",
  "bg-yellow-wondr",
  "bg-lime-wondr",
  "bg-tosca-wondr",
  "bg-purple-wondr",
  "bg-pink-wondr",
];

const colorMap = {
  "bg-orange-wondr": { solid: "bg-orange-wondr" },
  "bg-yellow-wondr": { solid: "bg-yellow-wondr" },
  "bg-lime-wondr": { solid: "bg-lime-wondr" },
  "bg-tosca-wondr": { solid: "bg-tosca-wondr" },
  "bg-purple-wondr": { solid: "bg-purple-wondr" },
  "bg-pink-wondr": { solid: "bg-pink-wondr" },
};

export default function Customization() {
  const { pocketId } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEditMode = !!pocketId;

  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);

  const {
    pocketName,
    pocketType,
    pocketColor,
    pocketIcon,
    setPocketName,
    setPocketColor,
    setPocketIcon,
    setPocketType,
    createPocket,
    isCreating,
    resetPocketData,
  } = usePocketStore();

  const isBusiness = pocketType === "Business Fund";
  const selectedColor =
    selectedColorIndex !== null ? colors[selectedColorIndex] : pocketColor;
  const selectedSolid = colorMap[selectedColor]?.solid;

  const handleCreatePocket = async () => {
    // Validation remains the same
    if (!pocketName || pocketName.trim().length === 0 || isNameInvalid) {
      setAlertMessages([
        "Pocket name is invalid. It must be between 1 and 20 characters.",
      ]);
      setShowAlertDialog(true);
      return;
    }
    if (!pocketColor) {
      setAlertMessages(["Please select a pocket color."]);
      setShowAlertDialog(true);
      return;
    }
    if (!pocketIcon) {
      setAlertMessages(["Please select a pocket icon."]);
      setShowAlertDialog(true);
      return;
    }

    try {
      const pocketData = await createPocket();
      const newPocketId = pocketData?.id;

      if (newPocketId) {
        resetPocketData();
        // --- KEY CHANGE: Reset the entire navigation stack ---
        // This creates a fresh history, making back navigation work correctly.
        navigation.dispatch(
          CommonActions.reset({
            index: 2, // The final active screen is at index 2
            routes: [
              { name: "home/index" },
              { name: "pocket/all/index" },
              { name: "pocket/[id]/index", params: { id: newPocketId } },
            ],
          }),
        );
      } else {
        // Fallback if ID is somehow missing
        resetPocketData();
        router.replace("/(main)/pocket/all");
      }
    } catch (error) {
      const latestError = usePocketStore.getState().createError;
      setAlertMessages([latestError || "An unknown error occurred."]);
      setShowAlertDialog(true);
    }
  };

  const handleSaveChanges = () => {
    router.back();
  };

  useEffect(() => {
    setNameIsInvalid(pocketName.length > 20 || pocketName.trim().length === 0);
  }, [pocketName]);

  useEffect(() => {
    if (pocketId) {
      const pocket = allPocket.find((p) => p.id === Number(pocketId));
      if (pocket) {
        setPocketName(pocket.name);
        setPocketType(pocket.type);
        setPocketColor(pocket.color);
        setPocketIcon(pocket.icon);
      }
    }
    return () => {};
  }, [pocketId, setPocketName, setPocketType, setPocketColor, setPocketIcon]);

  return (
    <Box className="flex-1 bg-white justify-between">
      <Box className="flex flex-col w-full h-fit px-6 py-5 items-center bg-[#F9F9F9]">
        <PocketCard
          mode="type"
          pocketName={pocketName}
          pocketType={pocketType}
          color={selectedSolid}
          icon={pocketIcon}
          iconSize="16"
          space="my-7"
          cardWidth="min-w-48"
        />
      </Box>

      <Box className="flex-1 flex-col mt-5 px-6 justify-between">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <VStack space="2xl" className="w-full px-3">
              {isEditMode && (
                <PocketNameInput
                  pocketName={pocketName}
                  setPocketName={setPocketName}
                  isNameInvalid={isNameInvalid}
                />
              )}
              <PocketColorSelector
                colors={colors}
                selectedColorIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
                setPocketColor={setPocketColor}
              />
              <PocketIconSelector
                icons={isBusiness ? businessIcons : personalIcons}
                selectedIconIndex={selectedIconIndex}
                setSelectedIconIndex={setSelectedIconIndex}
                setPocketIcon={setPocketIcon}
                isBusiness={isBusiness}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>

        {isEditMode ? (
          <>
            <PrimaryButton
              buttonAction={handleSaveChanges}
              buttonTitle="Simpan"
              className="bg-yellow-wondr mb-3 active:bg-yellow-wondr-dark"
              disabled={isNameInvalid || isCreating}
            />
            <PrimaryButton
              buttonAction={() => router.back()}
              buttonTitle="Batal"
              className="bg-white border border-gray-wondr active:bg-light-gray-wondr"
            />
          </>
        ) : (
          <PrimaryButton
            buttonAction={handleCreatePocket}
            buttonTitle={isCreating ? "Membuat Pocket..." : "Buat Pocket"}
            className="mt-3 mb-12"
            disabled={isNameInvalid || isCreating}
          />
        )}

        <PocketErrorAlert
          isOpen={showAlertDialog}
          onClose={() => setShowAlertDialog(false)}
          messages={alertMessages}
        />
      </Box>
    </Box>
  );
}
