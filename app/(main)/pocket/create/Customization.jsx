// app/(main)/pocket/create/Customization.jsx
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { useState, useEffect, useCallback } from "react";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useFocusEffect,
} from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

import PocketCard from "@/components/common/cards/PocketCard";
import PocketNameInput from "@/components/feature/pocketCustomization/PocketNameInput";
import PocketErrorAlert from "@/components/feature/pocketCustomization/PocketErrorAlert";
import PocketIconSelector from "@/components/feature/pocketCustomization/PocketIconSelector";
import PocketColorSelector from "@/components/feature/pocketCustomization/PocketColorSelector";
import { CommonActions } from "@react-navigation/native";
import {
  iconKeys,
  iconMap,
  iconWhiteMap,
} from "@/utils/pocketCustomization/personalPocketIconUtils";

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

  // --- Local State for UI ---
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  // --- Zustand Store State and Actions ---
  const {
    pocketName,
    pocketType,
    pocketColor,
    pocketIcon,
    setPocketName,
    setPocketColor,
    setPocketIcon,
    createPocket,
    isCreating,
    updatePocket,
    isUpdating,
    setPocketForEditing,
    allPockets,
    resetPocketData,
  } = usePocketStore();

  // --- Effects ---

  // On screen focus, set up for edit mode or reset
  useFocusEffect(
    useCallback(() => {
      if (isEditMode) {
        const pocketToEdit = allPockets.find((p) => p.pocket_id == pocketId);
        if (pocketToEdit) {
          setPocketForEditing(pocketToEdit);
        }
      }
      return () => {
        resetPocketData();
      };
    }, [pocketId, isEditMode, allPockets]),
  );

  // When store data changes (in edit mode), update local index state
  useEffect(() => {
    const colorIndex = colors.indexOf(pocketColor);
    setSelectedColorIndex(colorIndex >= 0 ? colorIndex : 0);

    const iconIndex = iconKeys.indexOf(pocketIcon);
    setSelectedIconIndex(iconIndex >= 0 ? iconIndex : 0);
  }, [pocketColor, pocketIcon]);

  // When local index changes, update the Zustand store
  useEffect(() => {
    setPocketColor(colors[selectedColorIndex]);
  }, [selectedColorIndex]);

  useEffect(() => {
    setPocketIcon(iconKeys[selectedIconIndex]);
  }, [selectedIconIndex]);

  // Validate pocket name
  useEffect(() => {
    setNameIsInvalid(pocketName.length > 20 || pocketName.trim().length === 0);
  }, [pocketName]);

  // --- Handlers ---

  const handleCreatePocket = async () => {
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
        navigation.dispatch(
          CommonActions.reset({
            index: 2,
            routes: [
              { name: "home/index" },
              { name: "pocket/all/index" },
              { name: "pocket/[id]/index", params: { id: newPocketId } },
            ],
          }),
        );
      } else {
        resetPocketData();
        router.replace("/(main)/pocket/all");
      }
    } catch (error) {
      const latestError = usePocketStore.getState().createError;
      setAlertMessages([latestError || "An unknown error occurred."]);
      setShowAlertDialog(true);
    }
  };

  const handleSaveChanges = async () => {
    if (isNameInvalid) {
      setAlertMessages(["Pocket name is invalid."]);
      setShowAlertDialog(true);
      return;
    }
    try {
      await updatePocket(pocketId);
      resetPocketData();
      router.back();
    } catch (error) {
      const latestError = usePocketStore.getState().updateError;
      setAlertMessages([latestError || "Failed to save changes."]);
      setShowAlertDialog(true);
    }
  };

  const PocketWhite = iconWhiteMap.Pocket;
  const selectedSolid = colorMap[pocketColor]?.solid;
  const SelectedIconWhite = iconWhiteMap[pocketIcon] || PocketWhite;

  return (
    <Box className="flex-1 bg-white justify-between">
      <Box className="flex flex-col w-full h-fit px-6 py-5 items-center bg-[#F9F9F9]">
        <PocketCard
          mode="type"
          pocketName={pocketName}
          pocketType={pocketType}
          color={selectedSolid}
          icon={SelectedIconWhite}
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
              <PocketNameInput
                pocketName={pocketName}
                setPocketName={setPocketName}
                isNameInvalid={isNameInvalid}
              />
              <PocketColorSelector
                colors={colors}
                selectedIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
              />
              <PocketIconSelector
                iconKeys={iconKeys}
                iconMap={iconMap}
                selectedIndex={selectedIconIndex}
                setSelectedIconIndex={setSelectedIconIndex}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>

        {isEditMode ? (
          <>
            <PrimaryButton
              buttonAction={handleSaveChanges}
              buttonTitle={isUpdating ? "Menyimpan..." : "Simpan"}
              className="bg-yellow-wondr mb-3 active:bg-yellow-wondr-dark"
              disabled={isNameInvalid || isUpdating}
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
