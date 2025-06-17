import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
} from "@/components/ui/avatar";

import { router } from "expo-router";
import { savingGoals } from "../../../../utils/goalData";
import { useState, useEffect, useCallback } from "react";
import { usePocketStore } from "../../../../stores/pocketStore";
import { ArrowLeft, UserPlus, ChevronRight } from "lucide-react-native";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";
import FormPocketDetail from "../../../../components/features/FormPocketDetail";

export default function Details() {
  const {
    pocketName,
    setPocketName,
    pocketBalanceTarget,
    setPocketBalanceTarget,
    targetDuration,
    setTargetDuration,
    goalTitle,
    selectedFriends,
  } = usePocketStore();

  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [isBalanceInvalid, setBalanceIsInvalid] = useState(false);
  const [isDateInvalid, setDateIsInvalid] = useState(false);
  const [open, setOpen] = useState(false);

  const [balanceTouched, setBalanceTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);

  const selectedGoal =
    savingGoals.find((goal) => goal.title === goalTitle) || savingGoals[0];

  const extraAvatars = selectedFriends.slice(5);
  const remainingCount = extraAvatars.length;

  const handleOpenDatePicker = () => {
    setOpen(true);
    setDateTouched(true);
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setTargetDuration({ startDate, endDate });
    },
    [setTargetDuration],
  );

  const validateForm = () => {
    // Name: required, max 20 chars, not only whitespace
    const nameTrimmed = pocketName.trim();
    const nameInvalid =
      !nameTrimmed || nameTrimmed.length === 0 || nameTrimmed.length > 20;

    // Balance: required, integer, min 10000
    const balanceInvalid =
      typeof pocketBalanceTarget !== "number" ||
      isNaN(pocketBalanceTarget) ||
      pocketBalanceTarget < 10000 ||
      !Number.isInteger(pocketBalanceTarget);

    // Duration: required, both start and end date
    const dateInvalid = !targetDuration.startDate || !targetDuration.endDate;

    setNameIsInvalid(nameInvalid);
    setBalanceIsInvalid(balanceInvalid);
    setDateIsInvalid(dateInvalid);

    return !nameInvalid && !balanceInvalid && !dateInvalid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      GoToCustomization();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const GoToFriendsList = () => {
    router.push("pocket/createPocket/SelectFriend");
  };

  const GoToCustomization = () => {
    router.push("pocket/createPocket/Customization");
  };

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
      setDateIsInvalid(!targetDuration.startDate || !targetDuration.endDate);
    }
  }, [targetDuration, dateTouched]);

  return (
    <Box className="flex-1 bg-white">
      <Box className={`w-full h-56 ${selectedGoal.color}`}>
        <Box
          className={`w-44 absolute right-[0.1rem] -bottom-[0.1rem] ${selectedGoal.decoratorClassName}`}
        >
          <Image
            source={selectedGoal.decorator}
            alt="pocket-type-decorator"
            className="w-full h-48"
            resizeMode="contain"
          />
        </Box>
        <Box className="flex-1 flex-col px-6 pt-5 justify-between">
          <VStack space="4xl" reversed={false}>
            <Box className="flex flex-row justify-between items-center">
              <Pressable onPress={handleBack}>
                <ArrowLeft size={24} />
              </Pressable>
              <Heading size="lg" className="text-bold">
                {selectedGoal.title}
              </Heading>
              <Box className="w-5 h-5" />
            </Box>
            <VStack space="xs" reversed={false}>
              <Heading size="xl" className="text-bold w-56">
                {selectedGoal.title2}
              </Heading>
              <Text className="w-56 text-lg">{selectedGoal.subtitle2}</Text>
            </VStack>
          </VStack>
        </Box>
      </Box>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
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
                pocketBalanceTarget={pocketBalanceTarget}
                setPocketBalanceTarget={(value) => {
                  setBalanceTouched(true); // Mark as touched on first change
                  setPocketBalanceTarget(value);
                }}
                isBalanceInvalid={isBalanceInvalid}
                targetDuration={targetDuration}
                setTargetDuration={setTargetDuration}
                isDateInvalid={isDateInvalid}
                open={open}
                setOpen={setOpen}
                handleOpenDatePicker={handleOpenDatePicker}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
              />

              <Pressable
                onPress={GoToFriendsList}
                className="w-full border-b border-gray-300 p-3 active:bg-gray-100 rounded-lg"
              >
                <Box className="flex flex-row justify-between">
                  <HStack space="md">
                    <UserPlus size={24} color={"#848688"} />
                    <Text className="text-gray-500 text-lg">Undang teman</Text>
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
                                {friend}
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
                isNameInvalid ||
                isBalanceInvalid ||
                isDateInvalid ||
                pocketBalanceTarget === null ||
                targetDuration.startDate === null ||
                targetDuration.endDate === null
              }
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
