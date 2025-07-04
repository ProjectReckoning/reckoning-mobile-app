// app/(main)/pocket/[id]/transaction/setTarget/index.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  useLocalSearchParams,
  useNavigation,
  useFocusEffect,
} from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { CalendarClock } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import CustomDatePicker from "@/components/common/CustomDatePicker/CustomDatePicker";
import { useToast } from "@/components/ui/toast";
import CustomToast from "@/components/common/customToast/CustomToast";
import { usePocketStore } from "@/stores/pocketStore";

export default function SetTargetScreen() {
  const toast = useToast();
  const { id: pocketId } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    currentPocket,
    fetchPocketById,
    updatePocketTarget,
    isUpdating,
    updateError,
    resetPocketData,
  } = usePocketStore();

  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [pickerMode, setPickerMode] = useState("date");
  const [isAmountTouched, setAmountTouched] = useState(false);
  const [isDateTouched, setDateTouched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (pocketId) {
        fetchPocketById(pocketId);
      }
      return () => resetPocketData();
    }, [pocketId, fetchPocketById]),
  );

  useEffect(() => {
    if (currentPocket) {
      setTargetAmount(currentPocket.target_nominal);
      if (currentPocket.deadline) {
        const existingDeadline = new Date(currentPocket.deadline);
        setDeadline(existingDeadline);
        setDisplayDate(existingDeadline);
        setSelectedDay(existingDeadline.getDate());
      }
    }
  }, [currentPocket]);

  const validateForm = () => {
    setAmountTouched(true);
    setDateTouched(true);
    const isAmountValid =
      targetAmount && parseFloat(String(targetAmount).replace(/\D/g, "")) > 0;
    return isAmountValid && deadline;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const amountValue = parseFloat(String(targetAmount).replace(/\D/g, ""));
      await updatePocketTarget(pocketId, {
        targetAmount: amountValue,
        deadline: deadline.toISOString(),
      });
      toast.show({
        placement: "top",
        duration: 1500,
        render: ({ id }) => (
          <CustomToast id={id} title="Target berhasil diperbarui" />
        ),
      });
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 2,
            routes: [
              { name: "home/index" },
              { name: "pocket/all/index" },
              { name: "pocket/[id]/index", params: { id: pocketId } },
            ],
          }),
        );
      }, 1600);
    } catch (e) {
      console.error("Failed to update target:", e);
      Alert.alert(
        "Update Failed",
        updateError || "Could not update the pocket target.",
      );
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleOpenDatePicker = () => {
    setDateTouched(true);
    const initialDate = deadline || today;
    setDisplayDate(initialDate);
    setSelectedDay(initialDate.getDate());
    setPickerMode("date");
    setDatePickerOpen(true);
  };

  const handleConfirmDate = () => {
    if (selectedDay) {
      const newDate = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        selectedDay,
      );
      setDeadline(newDate);
    }
    setDatePickerOpen(false);
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

  const isAmountInvalid =
    isAmountTouched &&
    (!targetAmount ||
      parseFloat(String(targetAmount).replace(/\D/g, "")) < 10000);
  const isDateInvalid = isDateTouched && !deadline;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white px-6 py-5"
        >
          {currentPocket && (
            <Box className="flex-row items-center mb-6 gap-4">
              <PocketCard
                mode="icon"
                pocketType={currentPocket.type}
                color={currentPocket.color}
                icon={currentPocket.icon_name}
                iconSize="10"
                className="w-12 h-12 rounded-full"
                whiteSpace="mb-5"
              />
              <Box flex={1}>
                <Heading size="md" color="$text-black-600">
                  {currentPocket.name}
                </Heading>
                <Text size="sm" color="$text-black-600">
                  {currentPocket.account_number}
                </Text>
              </Box>
            </Box>
          )}

          <Box className="mb-1">
            <NominalInput
              amount={targetAmount}
              setAmount={setTargetAmount}
              setAmountTouched={setAmountTouched}
              isAmountInvalid={isAmountInvalid}
              isMinimumAmountRequired={true}
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
            <Text className={deadline ? "text-black" : "text-gray-400"}>
              {formatDate(deadline)}
            </Text>
          </Pressable>
          {isDateInvalid && (
            <Text className="text-red-500 text-xs mt-1">
              Tanggal belum diisi
            </Text>
          )}

          <Box style={{ flex: 1 }} />

          <PrimaryButton
            buttonAction={handleUpdate}
            buttonTitle="Ubah target"
            className="mb-8"
            textClassName="text-black font-bold text-base"
            disabled={
              !deadline || !targetAmount || isUpdating || isAmountInvalid
            }
            isLoading={isUpdating}
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      <CustomDatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setDatePickerOpen(false)}
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
    </KeyboardAvoidingView>
  );
}
