import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
} from "@/components/ui/avatar";

import { router, useFocusEffect } from "expo-router";
import { useGlobalStore } from "@/stores/globalStore";
import { usePocketStore } from "@/stores/pocketStore";
import { useState, useEffect, useCallback } from "react";
import { UserPlus, ChevronRight } from "lucide-react-native";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import {
  savingGoals,
  spendingDetails,
  businessGoals,
} from "@/utils/createPocket/goalData";

import { WondrColors } from "@/utils/colorUtils";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import FormPocketDetail from "@/components/feature/createPocket/FormPocketDetail";

export default function Details() {
  const {
    pocketName,
    setPocketName,
    pocketType,
    pocketBalanceTarget,
    setPocketBalanceTarget,
    targetDuration,
    deadline,
    setDeadline,
    goalTitle,
    selectedFriends,
  } = usePocketStore();

  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [isBalanceInvalid, setBalanceIsInvalid] = useState(false);
  const [isDateInvalid, setDateIsInvalid] = useState(false);

  const [open, setOpen] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [balanceTouched, setBalanceTouched] = useState(false);

  const [errors, setErrors] = useState({});
  const [pickerMode, setPickerMode] = useState("date");
  const [displayDate, setDisplayDate] = useState(new Date());
  const [tempSelectedDay, setTempSelectedDay] = useState(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const goals =
    pocketType === "Business Fund"
      ? businessGoals
      : pocketType === "Saving"
        ? savingGoals
        : spendingDetails;
  const selectedGoal =
    goals.find((goal) => goal.title === goalTitle) || goals[0];

  const extraAvatars = selectedFriends.slice(5);
  const remainingCount = extraAvatars.length;

  const handleOpenDatePicker = () => {
    const initialDate = deadline || new Date();
    setDisplayDate(initialDate);
    setTempSelectedDay(deadline ? deadline.getDate() : null);
    setPickerMode("date");
    setOpen(true);
    setDateTouched(true);
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = () => {
    if (tempSelectedDay) {
      const newSelectedDate = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        tempSelectedDay,
      );
      setDeadline(newSelectedDate);
      if (errors.tanggal) {
        setErrors((prevErrors) => ({ ...prevErrors, tanggal: null }));
      }
    }
    onDismiss();
  };

  const handleDaySelect = (day) => setTempSelectedDay(day);
  const onReset = () => setTempSelectedDay(null);

  const validateForm = () => {
    // Name: required, max 20 chars, not only whitespace
    const nameTrimmed = pocketName.trim();
    const nameInvalid =
      !nameTrimmed || nameTrimmed.length === 0 || nameTrimmed.length > 20;

    setNameIsInvalid(nameInvalid);

    if (pocketType === "Saving") {
      // Balance: required, integer, min 10000
      const balanceInvalid =
        typeof pocketBalanceTarget !== "number" ||
        isNaN(pocketBalanceTarget) ||
        pocketBalanceTarget < 10000 ||
        !Number.isInteger(pocketBalanceTarget);

      // The deadline is required for Saving type
      const dateInvalid = !deadline;

      setBalanceIsInvalid(balanceInvalid);
      setDateIsInvalid(dateInvalid);

      return !nameInvalid && !balanceInvalid && !dateInvalid;
    }

    return !nameInvalid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      GoToCustomization();
    }
  };

  const GoToFriendsList = () => {
    router.push("pocket/create/SelectFriend");
  };

  const GoToCustomization = () => {
    router.push("pocket/create/Customization");
  };

  const setSavColor = useCallback(() => {
    useGlobalStore.getState().setSavColor("bg-[#C3F0EC]");
    return () => {
      useGlobalStore.getState().setSavColor("bg-white");
    };
  }, []);
  useFocusEffect(setSavColor);

  useEffect(() => {
    if (pocketName.length > 20 || pocketName.length === null) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }
  }, [pocketName]);

  useEffect(() => {
    setBalanceIsInvalid(balanceTouched && pocketBalanceTarget < 10000);
  }, [pocketBalanceTarget, balanceTouched]);

  useEffect(() => {
    if (dateTouched) {
      setDateIsInvalid(!deadline);
    }
  }, [deadline, dateTouched]);

  return (
    <Box className="flex-1 bg-white">
      <Box
        className={`w-full h-44 bg-[${WondrColors["tosca-wondr-light-translucent"]}]`}
      >
        {selectedGoal.decorator}
        <Box className="flex-1 flex-col px-6 pt-8 justify-between">
          <VStack space="xs" reversed={false}>
            <Heading size="xl" className="text-bold w-56">
              {selectedGoal.title2}
            </Heading>
            <Text className="w-56 text-lg">{selectedGoal.subtitle2}</Text>
          </VStack>
        </Box>
      </Box>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Box className="flex-1 justify-between px-6">
            <Box className="flex flex-col">
              <Heading size="xl" className="font-bold mt-8">
                Detail Pocket
              </Heading>

              <FormPocketDetail
                pocketName={pocketName}
                setPocketName={setPocketName}
                isNameInvalid={isNameInvalid}
                pocketType={pocketType}
                pocketBalanceTarget={pocketBalanceTarget}
                setPocketBalanceTarget={(value) => {
                  setBalanceTouched(true);
                  setPocketBalanceTarget(value);
                }}
                isBalanceInvalid={isBalanceInvalid}
                deadline={deadline}
                isDateInvalid={isDateInvalid}
                open={open}
                handleOpenDatePicker={handleOpenDatePicker}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                onReset={onReset}
                displayDate={displayDate}
                setDisplayDate={setDisplayDate}
                tempSelectedDay={tempSelectedDay}
                handleDaySelect={handleDaySelect}
                pickerMode={pickerMode}
                setPickerMode={setPickerMode}
                today={today}
              />

              <Pressable
                onPress={GoToFriendsList}
                className="w-full border-b border-gray-300 p-3 active:bg-gray-100 rounded-lg"
              >
                <Box className="flex flex-row justify-between">
                  <HStack space="md">
                    <UserPlus size={24} color={"#848688"} />
                    <HStack space="xs" className="items-center">
                      <Text className="text-gray-500 text-lg">
                        Undang teman
                      </Text>
                      {!selectedFriends.length > 0 && (
                        <Text className="text-gray-400 text-sm">
                          (opsional)
                        </Text>
                      )}
                    </HStack>
                  </HStack>
                  <HStack space="xs" className="items-center justify-center">
                    {selectedFriends.length > 0 && (
                      <AvatarGroup className="items-center justify-center gap-1">
                        {selectedFriends.slice(0, 5).map((friend, index) => {
                          return (
                            <Avatar
                              key={index}
                              size="sm"
                              className={
                                "border-2 border-outline-0 bg-[#F2F2F2]"
                              }
                            >
                              <AvatarFallbackText className="text-[#58ABA1]">
                                {friend.name}
                              </AvatarFallbackText>
                            </Avatar>
                          );
                        })}
                        {extraAvatars.length > 0 && (
                          <Avatar
                            size="sm"
                            className={"border-2 border-outline-0 bg-[#F2F2F2]"}
                          >
                            <AvatarFallbackText className="text-[#58ABA1]">
                              {"+ " + remainingCount + ""}
                            </AvatarFallbackText>
                          </Avatar>
                        )}
                      </AvatarGroup>
                    )}
                    <ChevronRight size={24} color={"#848688"} />
                  </HStack>
                </Box>
              </Pressable>
            </Box>
            <PrimaryButton
              buttonAction={handleSubmit}
              buttonTitle="Lanjut"
              className="mt-5 mb-8"
              disabled={
                pocketType === "Saving"
                  ? isNameInvalid ||
                    isBalanceInvalid ||
                    isDateInvalid ||
                    pocketName.length === 0 ||
                    pocketName.length > 20 ||
                    pocketBalanceTarget === null ||
                    targetDuration.startDate === null ||
                    targetDuration.endDate === null ||
                    deadline === null
                  : pocketName.length === 0 || pocketName.length > 20
              }
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
