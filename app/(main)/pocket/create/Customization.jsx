// app/(main)/pocket/create/Customization.jsx
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { useState, useEffect, useCallback } from "react";
import { usePocketStore } from "../../../../stores/pocketStore";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useFocusEffect,
} from "expo-router";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

import { CommonActions } from "@react-navigation/native";
import PocketCard from "@/components/common/cards/PocketCard";
import { personalIcons } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIcons } from "@/utils/pocketCustomization/businessPocketIconUtils";
import PocketNameInput from "@/components/feature/pocketCustomization/PocketNameInput";
import PocketErrorAlert from "@/components/feature/pocketCustomization/PocketErrorAlert";
import PocketIconSelector from "@/components/feature/pocketCustomization/PocketIconSelector";
import PocketColorSelector from "@/components/feature/pocketCustomization/PocketColorSelector";
import { useToast } from "@/components/ui/toast";
import CustomToast from "@/components/common/customToast/CustomToast";

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

  const toast = useToast();

  // --- Effects ---

  // On screen focus, set up for edit mode or reset
  useFocusEffect(
    useCallback(() => {
      if (isEditMode) {
        const pocketToEdit = allPockets.find((p) => p.pocket_id == pocketId);
        if (pocketToEdit) {
          setPocketForEditing(pocketToEdit);
        }
        console.log(pocketType, "pocket type to edit");
      }
      return () => {
        if (isEditMode) {
          resetPocketData();
        }
      };
    }, [pocketId, isEditMode, allPockets]),
  );

  // When store data changes (in edit mode), update local index state
  useEffect(() => {
    const colorIndex = colors.indexOf(pocketColor);
    const iconArray = isBusiness ? businessIcons : personalIcons;
    const iconIndex = iconArray.indexOf(pocketIcon);

    if (
      (colorIndex !== selectedColorIndex && colorIndex >= 0) ||
      (iconIndex !== selectedIconIndex && iconIndex >= 0)
    ) {
      setTimeout(() => {
        if (colorIndex !== selectedColorIndex && colorIndex >= 0) {
          setSelectedColorIndex(colorIndex);
        }
        if (iconIndex !== selectedIconIndex && iconIndex >= 0) {
          setSelectedIconIndex(iconIndex);
        }
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pocketColor, pocketIcon, pocketType]);

  // When local index changes, update the Zustand store
  useEffect(() => {
    setPocketColor(colors[selectedColorIndex]);
  }, [selectedColorIndex]);

  useEffect(() => {
    if (isBusiness) {
      setPocketIcon(businessIcons[selectedIconIndex] || businessIcons[0]);
    } else {
      setPocketIcon(personalIcons[selectedIconIndex] || personalIcons[0]);
    }
  }, [selectedIconIndex]);

  // Validate pocket name
  useEffect(() => {
    setNameIsInvalid(pocketName.length > 20 || pocketName.trim().length === 0);
  }, [pocketName]);

  // --- Handlers ---
  const isBusiness = pocketType?.toLowerCase().includes("business");
  const selectedColor =
    selectedColorIndex !== null ? colors[selectedColorIndex] : pocketColor;
  const selectedSolid = colorMap[selectedColor]?.solid;

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
      const result = await updatePocket(pocketId);

      if (result) {
        toast.show({
          placement: "top",
          duration: 2000,
          render: ({ id }) => {
            return <CustomToast id={id} title="Pocket telah diperbarui" />;
          },
        });
        router.back();

        setTimeout(() => {
          resetPocketData();
        }, 1500);
      }
    } catch (error) {
      const latestError = usePocketStore.getState().updateError;
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return (
            <CustomToast
              id={id}
              title={latestError || "Gagal menyimpan perubahan"}
            />
          );
        },
      });
    }
  };

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
          keyboardVerticalOffset={90}
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
                selectedIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
              />
              <PocketIconSelector
                icons={isBusiness ? businessIcons : personalIcons}
                selectedIndex={selectedIconIndex}
                setSelectedIconIndex={setSelectedIconIndex}
                isBusiness={isBusiness}
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
