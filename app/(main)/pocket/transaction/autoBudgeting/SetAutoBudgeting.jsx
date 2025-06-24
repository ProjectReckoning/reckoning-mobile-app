import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { router } from "expo-router";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AppBar from "@/components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { CalendarClock, ChevronRight, Check, X } from "lucide-react-native";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { useTransactionStore } from "@/stores/transactionStore";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { WondrColors } from "@/utils/colorUtils";
import CustomDatePicker from "../../../../../components/common/CustomDatePicker/CustomDatePicker";

export default function SetAutoBudgeting() {
  const handleBack = () => {
    router.back();
  };

  const pocketDetail = {
    name: "Pergi ke Korea 2026",
    accountNumber: "0238928039",
    color: "bg-orange-wondr",
    icon: "Airplane",
    pocketType: "Saving",
  };

  const sourceFund = {
    title: "Sumber dana",
    heading: "TAPLUS PEGAWAI BNI",
    subheading: "1916826757",
    balance: "10495750",
  };

  const { amount, setAmount } = useTransactionStore();

  const [isAmountTouched, setAmountTouched] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [isFrequencyActionsheetOpen, setIsFrequencyActionsheetOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const frequencyOptions = ["Satu kali", "Harian", "Mingguan", "Bulanan"];

  const handleSelectFrequency = (value) => {
    setSelectedFrequency(value);
    setIsFrequencyActionsheetOpen(false);
  };

  const handleOpenDatePicker = () => setDatePickerVisible(true);
  const handleCloseDatePicker = () => setDatePickerVisible(false);

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setSelectedStartDate(date);
    handleCloseDatePicker();
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "Select date";
    return `Setiap tanggal ${date.getDate()}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleNextToConfirmation = () => {
    const dataToPass = {
      nominal: amount,
      frequency: selectedFrequency,
      selectedDate: selectedDate ? selectedDate.getDate() : null,

      startDate: selectedStartDate ? selectedStartDate.toISOString() : null,
      endDate: selectedEndDate ? selectedEndDate.toISOString() : null,
      pocketDetail: pocketDetail,
      sourceFund: sourceFund,
    };
    router.push({
      pathname: "pocket/transaction/autoBudgeting/autoBudgetingConfirmation",
      params: dataToPass,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
      style={{ flex: 1 }}
    >
      {/* TouchableWithoutFeedback untuk tap-to-dismiss keyboard */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* ScrollView untuk konten yang bisa di-scroll */}
        <ScrollView
          keyboardShouldPersistTaps="handled" // Penting: taps di dalam ScrollView tetap berfungsi
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white px-6 py-5"
        >
          {/* App Bar */}
          <AppBar title="Auto budgeting" onBack={handleBack} />

          {/* Bagian Pocket Card dan Detail Tujuan */}
          <Box className="flex-row items-center mt-5 mb-6 gap-4">
            <PocketCard
              mode="icon"
              pocketType={pocketDetail.pocketType}
              color={pocketDetail.color}
              icon={pocketDetail.icon}
              // PROPERTI ICON POCKETCARD INI TIDAK DIUBAH SAMA SEKALI
              iconSize="10"
              whiteSpace="mb-5"
              className="w-12 h-12 rounded-full"
              iconColor="$text-white"
              iconBackgroundColor="$orange-wondr"
              iconBackgroundSize="w-12 h-12"
            />
            <Box flex={1}>
              <Heading size="md" color="$text-black-600">
                {pocketDetail.name}
              </Heading>
              <Text size="sm" color="$text-black-600">
                {pocketDetail.accountNumber}
              </Text>
            </Box>
          </Box>

          {/* Input Nominal */}
          <Box className="mb-4">
            <NominalInput
              amount={amount}
              setAmount={setAmount}
              setAmountTouched={setAmountTouched}
              isAmountInvalid={false}
            />
          </Box>

          {/* Input Frekuensi */}
          <Text className="text-black font-light mb-1">Frekuensi</Text>
          <Pressable
            onPress={() => setIsFrequencyActionsheetOpen(true)}
            className="w-full h-14 p-3 my-1 justify-between rounded-xl border border-gray-300 flex-row items-center"
          >
            <Text
              className={selectedFrequency ? "text-black" : "text-gray-400"}
            >
              {selectedFrequency ?? "Pilih frekuensi"}
            </Text>
            <ChevronRight size={16} color="#848688" />
          </Pressable>

          {/* Input Starting Date (Tanggal Mulai) */}
          <Text className="text-black font-light mt-4 mb-1">Starting date</Text>
          <Pressable
            onPress={handleOpenDatePicker}
            className="w-full h-14 p-3 my-1 justify-start rounded-xl border border-gray-300 flex-row items-center gap-3"
          >
            <CalendarClock size={16} color="#848688" />
            <Text className={selectedDate ? "text-black" : "text-gray-400"}>
              {formatDateForDisplay(selectedDate)}
            </Text>
          </Pressable>

          {/* Card Sumber Dana */}
          <Box className="mb-4 mt-4">
            <TransactionCard
              title={sourceFund.title}
              heading={sourceFund.heading}
              subheading={sourceFund.subheading}
              balance={sourceFund.balance}
              showBalance={true}
            />
          </Box>

          {/* Box Kosong untuk mengisi sisa ruang (flex-1) */}
          <Box style={{ flex: 1 }} />

          {/* Tombol Lanjut */}
          <PrimaryButton
            buttonAction={handleNextToConfirmation}
            buttonTitle="Set auto-budgeting"
            className="mb-8"
            textClassName="text-black font-bold text-base"
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* CustomDatePicker (Modal Pemilih Tanggal) */}
      <CustomDatePicker
        isVisible={isDatePickerVisible}
        onClose={handleCloseDatePicker}
        onConfirm={handleConfirmDate}
        initialDate={selectedDate || new Date()}
        minDate={today} // Meneruskan minDate untuk menonaktifkan tanggal lampau
      />

      {/* Actionsheet untuk Pemilihan Frekuensi */}
      <Actionsheet
        isOpen={isFrequencyActionsheetOpen}
        onClose={() => {
          setIsFrequencyActionsheetOpen(false);
        }}
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
          >
            {frequencyOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => handleSelectFrequency(option)}
                className={`py-3 px-4 rounded-xl mb-3 flex-row justify-between items-center ${
                  selectedFrequency === option
                    ? "border border-green-select bg-green-select/10"
                    : "border border-gray-200"
                }`}
              >
                <Text
                  className={`text-base ${
                    selectedFrequency === option
                      ? "text-green-select"
                      : "text-black"
                  }`}
                >
                  {option}
                </Text>
                {selectedFrequency === option && (
                  <Check size={20} color={WondrColors["green-select"]} />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}
