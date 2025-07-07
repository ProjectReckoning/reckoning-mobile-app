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
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import PocketCard from "@/components/common/cards/PocketCard";
import { personalIcons } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIcons } from "@/utils/pocketCustomization/businessPocketIconUtils";
import PocketNameInput from "@/components/feature/pocketCustomization/PocketNameInput";
import PocketErrorAlert from "@/components/feature/pocketCustomization/PocketErrorAlert";
import DeleteLeavePocketAlert from "@/components/feature/allPocket/DeleteLeavePocketAlert";
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
  const { pocketId, innerEdit } = useLocalSearchParams();
  const navigation = useNavigation();
  const isEditMode = !!pocketId;
  const isInnerEditMode = innerEdit === "true";

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [showDeleteLeaveAlert, setShowDeleteLeaveAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    deletePocket,
  } = usePocketStore();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isEditMode) {
        setIsLoading(true);
        const pocketToEdit = allPockets.find((p) => p.pocket_id == pocketId);
        if (pocketToEdit && isActive) {
          setPocketForEditing(pocketToEdit);
          setIsLoading(false);
        } else if (isActive && allPockets.length > 0) {
          // If not found, stop loading anyway
          setIsLoading(false);
        }
      }
      return () => {
        isActive = false;
        if (isEditMode) {
          resetPocketData();
        }
      };
    }, [pocketId, isEditMode, allPockets]),
  );

  useEffect(() => {
    const colorIndex = colors.indexOf(pocketColor);
    const iconArray = isBusiness ? businessIcons : personalIcons;
    const iconIndex = iconArray.indexOf(pocketIcon);

    if (
      (colorIndex !== -1 && colorIndex !== selectedColorIndex) ||
      (iconIndex !== -1 && iconIndex !== selectedIconIndex)
    ) {
      setTimeout(() => {
        if (colorIndex !== -1) setSelectedColorIndex(colorIndex);
        if (iconIndex !== -1) setSelectedIconIndex(iconIndex);
      }, 0);
    }
  }, [pocketColor, pocketIcon, pocketType, isBusiness]);

  useEffect(() => {
    setPocketColor(colors[selectedColorIndex]);
  }, [selectedColorIndex, setPocketColor]);

  useEffect(() => {
    const iconArray = isBusiness ? businessIcons : personalIcons;
    setPocketIcon(iconArray[selectedIconIndex] || iconArray[0]);
  }, [selectedIconIndex, isBusiness, setPocketIcon]);

  useEffect(() => {
    setNameIsInvalid(pocketName.length > 20 || pocketName.trim().length === 0);
  }, [pocketName]);

  const isBusiness = pocketType?.toLowerCase().includes("business");
  const selectedColorValue =
    selectedColorIndex !== null ? colors[selectedColorIndex] : pocketColor;
  const selectedSolid = colorMap[selectedColorValue]?.solid;

  const handleCreatePocket = async () => {
    if (isNameInvalid) {
      setAlertMessages(["Nama Pocket tidak valid."]);
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
      setAlertMessages([latestError || "Gagal membuat pocket."]);
      setShowAlertDialog(true);
    }
  };

  const handleSaveChanges = async () => {
    if (isNameInvalid) {
      setAlertMessages(["Nama Pocket tidak valid."]);
      setShowAlertDialog(true);
      return;
    }
    try {
      const result = await updatePocket(pocketId);
      if (result) {
        toast.show({
          placement: "top",
          duration: 2000,
          render: ({ id }) => (
            <CustomToast id={id} title="Pocket telah diperbarui" />
          ),
        });
        router.back();
        setTimeout(() => {
          resetPocketData();
        }, 1500);
      }
    } catch (error) {
      const latestError = usePocketStore.getState().updateError;
      setAlertMessages([latestError || "Gagal menyimpan perubahan."]);
      setShowAlertDialog(true);
    }
  };

  const onDelete = async () => {
    if (!pocketId) return;
    setIsDeleting(true);
    try {
      await deletePocket(pocketId);
      resetPocketData();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "home/index" }, { name: "pocket/all/index" }],
        }),
      );
      setTimeout(() => {}, 300);
    } catch (error) {
      console.error("Failed to delete pocket:", error);
    } finally {
      setShowDeleteLeaveAlert(false);
      setIsDeleting(false);
    }
  };

  if (isEditMode && isLoading) {
    return (
      <Box className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

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
              className="mb-3"
              disabled={isNameInvalid || isUpdating || isDeleting}
            />
            {isInnerEditMode ? (
              <PrimaryButton
                buttonAction={() => setShowDeleteLeaveAlert(true)}
                buttonTitle={isDeleting ? "Menghapus..." : "Hapus pocket"}
                className="bg-white border-2 border-red-wondr mb-4 active:bg-red-wondr"
                textClassName="text-red-wondr"
                textPressed="text-white"
                disabled={isDeleting}
              />
            ) : (
              <PrimaryButton
                buttonAction={() => router.back()}
                buttonTitle="Batal"
                className="bg-white border border-gray-wondr active:bg-light-gray-wondr"
              />
            )}
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
        <DeleteLeavePocketAlert
          isOpen={showDeleteLeaveAlert}
          onClose={() => setShowDeleteLeaveAlert(false)}
          onDelete={onDelete}
          pocketName={pocketName}
          pocketType={pocketType}
          color={pocketColor}
          icon={pocketIcon}
        />
      </Box>
    </Box>
  );
}
