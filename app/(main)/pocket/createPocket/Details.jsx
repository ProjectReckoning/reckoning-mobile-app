import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { router } from "expo-router";
import { goals } from "../../../../utils/goalData";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, UserPlus, ChevronRight } from "lucide-react-native";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";
import FormPocketDetail from "../../../../components/features/FormPocketDetail";

export default function Details() {
  const [inputName, setInputName] = useState("");
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [isAmountInvalid, setAmountIsInvalid] = useState(false);
  const [isDateInvalid, setDateIsInvalid] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);

  const handleOpenDatePicker = () => {
    setOpen(true);
    setDateTouched(true);
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback(({ startDate, endDate }) => {
    setOpen(false);
    setRange({ startDate, endDate });
  }, []);

  const handleSubmit = () => {
    if (!isNameInvalid && !isAmountInvalid && !isDateInvalid) {
      // handle submit logic
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
    if (inputName.length > 20 || inputName.length === null) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }
  }, [inputName]);

  useEffect(() => {
    const amountValue = parseInt(inputAmount.replace(/\D/g, ""), 10);
    if (amountValue < 10000) {
      setAmountIsInvalid(true);
    } else {
      setAmountIsInvalid(false);
    }
  }, [inputAmount]);

  useEffect(() => {
    if (dateTouched) {
      setDateIsInvalid(!range.startDate || !range.endDate);
    }
  }, [range, dateTouched]);

  return (
    <Box className="flex-1 bg-white">
      <Box className={`w-full h-56 ${goals[1].color || "bg-[#C2F0ED]"}`}>
        <Box
          className={`w-52 absolute right-0 -bottom-4 ${goals[1].decoratorClassName}`}
        >
          <Image
            source={goals[1].decorator}
            alt="pocket-type-decorator"
            className="w-full h-64"
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
                {goals[1].title}
              </Heading>
              <Box className="w-5 h-5" />
            </Box>
            <VStack space="xs" reversed={false}>
              <Heading size="xl" className="text-bold w-64">
                {goals[1].title2}
              </Heading>
              <Text className="w-64 text-lg">{goals[1].subtitle2}</Text>
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
                inputName={inputName}
                setInputName={setInputName}
                isNameInvalid={isNameInvalid}
                inputAmount={inputAmount}
                setInputAmount={setInputAmount}
                isAmountInvalid={isAmountInvalid}
                range={range}
                setRange={setRange}
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
                  <HStack space="md">
                    <ChevronRight size={24} color={"#848688"} />
                  </HStack>
                </Box>
              </Pressable>
            </Box>
            <PrimaryButton
              buttonAction={handleSubmit}
              buttonTitle="Lanjut"
              className="mt-5 mb-8"
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
