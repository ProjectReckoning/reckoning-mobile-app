import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import { usePocketStore } from "../../../../stores/pocketStore";
import { allPocket } from "../../../../utils/mockData/mockPocketDb";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

import AppBar from "../../../../components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import PocketNameInput from "@/components/feature/pocketCustomization/PocketNameInput";
import PocketErrorAlert from "@/components/feature/pocketCustomization/PocketErrorAlert";
import PocketIconSelector from "@/components/feature/pocketCustomization/PocketIconSelector";
import PocketColorSelector from "@/components/feature/pocketCustomization/PocketColorSelector";
import {
  resetPocketData,
  pocketValidation,
} from "../../../../utils/pocketCustomization/pocketValidation";

import {
  iconKeys,
  iconMap,
  iconWhiteMap,
} from "../../../../utils/pocketCustomization/personalPocketIconUtils";

const colors = [
  "bg-orange-wondr",
  "bg-yellow-wondr",
  "bg-lime-wondr",
  "bg-tosca-wondr",
  "bg-purple-wondr",
  "bg-pink-wondr",
];

const colorMap = {
  "bg-orange-wondr": {
    solid: "bg-orange-wondr",
    translucent: "bg-orange-wondr-light-translucent",
  },
  "bg-yellow-wondr": {
    solid: "bg-yellow-wondr",
    translucent: "bg-yellow-wondr-light-translucent",
  },
  "bg-lime-wondr": {
    solid: "bg-lime-wondr",
    translucent: "bg-lime-wondr-light-translucent",
  },
  "bg-tosca-wondr": {
    solid: "bg-tosca-wondr",
    translucent: "bg-tosca-wondr-light-translucent",
  },
  "bg-purple-wondr": {
    solid: "bg-purple-wondr",
    translucent: "bg-purple-wondr-light-translucent",
  },
  "bg-pink-wondr": {
    solid: "bg-pink-wondr",
    translucent: "bg-pink-wondr-light-translucent",
  },
};

export default function Customization() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);
  const PocketWhite = iconWhiteMap.Pocket;

  const {
    pocketName,
    pocketType,
    pocketColor,
    pocketIcon,
    goalTitle,
    pocketBalanceTarget,
    targetDuration,
    selectedFriends,
    pocketSubject,
    setPocketSubject,
    setPocketName,
    setPocketBalanceTarget,
    setTargetDuration,
    setGoalTitle,
    setPocketType,
    setSelectedFriends,
    setPocketColor,
    setPocketIcon,
  } = usePocketStore();

  const selectedColor =
    selectedColorIndex !== null ? colors[selectedColorIndex] : pocketColor;
  const selectedTranslucent = colorMap[selectedColor]?.translucent;
  const selectedSolid = colorMap[selectedColor]?.solid;
  const SelectedIconWhite = iconWhiteMap[pocketIcon] || PocketWhite;

  const storeSetters = {
    setPocketName,
    setPocketColor,
    setPocketIcon,
    setPocketBalanceTarget,
    setTargetDuration,
    setPocketType,
    setGoalTitle,
    setSelectedFriends,
    setPocketSubject,
    setAlertMessages,
    setShowAlertDialog,
    setNameIsInvalid,
    setSelectedColorIndex,
    setSelectedIconIndex,
  };

  const resetData = () => resetPocketData(storeSetters);

  const handlePocketValidation = () =>
    pocketValidation({
      pocketName,
      pocketType,
      pocketColor,
      pocketIcon,
      goalTitle,
      pocketBalanceTarget,
      targetDuration,
      setNameIsInvalid,
      setAlertMessages,
      setShowAlertDialog,
      pocketSubject,
      selectedFriends,
      allPocket,
      resetData,
      GoToNext,
    });

  const GoToNext = () => {
    router.push("/(main)/pocket/all");
  };

  useEffect(() => {
    if (pocketName.length > 20 || pocketName.length === null) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }
  }, [pocketName]);

  return (
    <Box className="flex-1 bg-white justify-between">
      <Box className="flex flex-col w-full h-fit px-6 py-5 items-center bg-[#F9F9F9]">
        <AppBar title="Pocket kamu" className="mb-6" />

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
              {pocketType === "Spending" && (
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
                iconKeys={iconKeys}
                iconMap={iconMap}
                selectedIconIndex={selectedIconIndex}
                setSelectedIconIndex={setSelectedIconIndex}
                setPocketIcon={setPocketIcon}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
        <PrimaryButton
          buttonAction={handlePocketValidation}
          buttonTitle="Buat Pocket"
          className="mt-3 mb-12"
          disabled={isNameInvalid || pocketName.length === 0}
        />

        <PocketErrorAlert
          isOpen={showAlertDialog}
          onClose={() => setShowAlertDialog(false)}
          Add
          commentMore
          actions
          messages={alertMessages}
        />
      </Box>
    </Box>
  );
}
