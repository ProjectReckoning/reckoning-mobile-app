import { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarClock, X } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";

import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import CustomDatePicker from "@/components/common/CustomDatePicker/CustomDatePicker";
import { useTransactionStore } from "@/stores/transactionStore";

export default function SetTarget() {
  const { id } = useLocalSearchParams();
  const { amount, setAmount } = useTransactionStore();
  const [isFrequencyActionsheetOpen, setIsFrequencyActionsheetOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [pickerMode, setPickerMode] = useState("date");

  const [isAmountTouched, setAmountTouched] = useState(false);
  const [isDateTouched, setDateTouched] = useState(false);

  const validateForm = () => {
    setAmountTouched(true);
    setDateTouched(true);

    // Periksa apakah semua field valid
    const isAmountValid = amount && amount > 0;
    const isDateValid = selectedDate !== null;

    return isAmountValid && isDateValid;
  };

  const handleNext = () => {
    if (validateForm() && id) {
      `/(main)/pocket/${id}/transaction/setTarget`;
    }
  };

  const isAmountInvalid = isAmountTouched && (!amount || amount <= 0);
  const isDateInvalid = isDateTouched && !selectedDate;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleOpenDatePicker = () => {
    setDateTouched(true);
    const initialDate = selectedDate || today;
    const effectiveInitialDate = initialDate < today ? today : initialDate;
    setDisplayDate(effectiveInitialDate);
    setSelectedDay(effectiveInitialDate.getDate());
    setPickerMode("date");
    setDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => setDatePickerOpen(false);

  const handleConfirmDate = () => {
    if (selectedDay) {
      const newDate = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        selectedDay,
      );
      setSelectedDate(newDate);
    }
    handleCloseDatePicker();
  };

  const handleResetDate = () => {
    setDisplayDate(today);
    setSelectedDay(today.getDate());
  };

  const formatDate = (date) => {
    if (!date) return "Pilih tanggal";
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white px-6 py-5"
        >
          <Box className="flex-row items-center mb-6 gap-4">
            <PocketCard
              mode="icon"
              pocketType="Saving"
              color="bg-orange-wondr"
              icon="Airplane"
              iconSize="10"
              whiteSpace="mb-5"
              className="w-12 h-12 rounded-full"
              iconColor="$text-white"
            />
            <Box flex={1}>
              <Heading size="md" color="$text-black-600">
                Pergi ke Korea 2026
              </Heading>
              <Text size="sm" color="$text-black-600">
                0238928039
              </Text>
            </Box>
          </Box>

          <Box className="mb-1">
            <NominalInput
              amount={amount}
              setAmount={setAmount}
              setAmountTouched={setAmountTouched}
              isAmountInvalid={isAmountInvalid}
            />
          </Box>

          <Text className="text-black font-light mt-4 mb-1">Target date</Text>
          <Pressable
            onPress={handleOpenDatePicker}
            className={`w-full h-14 p-3 my-1 justify-start rounded-xl border flex-row items-center gap-3 ${
              isDateInvalid ? "border-red-500" : "border-gray-300"
            }`}
          >
            <CalendarClock size={16} color="#848688" />
            <Text className={selectedDate ? "text-black" : "text-gray-400"}>
              {formatDate(selectedDate)}
            </Text>
          </Pressable>
          {isDateInvalid && (
            <Text className="text-red-500 text-xs mt-1">
              Tanggal belum diisi
            </Text>
          )}

          <Box style={{ flex: 1 }} />

          <PrimaryButton
            buttonAction={handleNext}
            buttonTitle="Ubah target"
            className="mb-8"
            textClassName="text-black font-bold text-base"
            disabled={!selectedDate || !amount || amount <= 0}
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      <CustomDatePicker
        isOpen={isDatePickerOpen}
        onClose={handleCloseDatePicker}
        onConfirm={handleConfirmDate}
        onReset={handleResetDate}
        displayDate={displayDate}
        selectedDay={selectedDay}
        pickerMode={pickerMode}
        onDaySelect={setSelectedDay}
        onDisplayDateChange={setDisplayDate}
        onPickerModeChange={setPickerMode}
        minDate={today}
      />

      <Actionsheet
        isOpen={isFrequencyActionsheetOpen}
        onClose={() => setIsFrequencyActionsheetOpen(false)}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box className="w-full flex-row justify-between items-center px-4 pb-2 mt-5">
            <Text className="font-bold text-lg text-black">
              Pilih frekuensi
            </Text>
            <Pressable onPress={() => setIsFrequencyActionsheetOpen(false)}>
              <X size={24} color="#000" />
            </Pressable>
          </Box>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full mt-5 px-4"
          ></ScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}
