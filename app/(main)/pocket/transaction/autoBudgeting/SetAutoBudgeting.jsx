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
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import AppBar from "@/components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import {
  CalendarClock,
  ChevronRight,
  Check,
  X,
  CircleHelp,
} from "lucide-react-native";
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
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState("date");
  const [displayDate, setDisplayDate] = useState(new Date());
  const [tempSelectedDay, setTempSelectedDay] = useState(null);
  const [errors, setErrors] = useState({});

  // State untuk modal info
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);

  const frequencyOptions = ["Satu kali", "Harian", "Mingguan", "Bulanan"];

  const handleSelectFrequency = (value) => {
    setSelectedFrequency(value);
    if (errors.frekuensi) {
      setErrors((prevErrors) => ({ ...prevErrors, frekuensi: null }));
    }
    setIsFrequencyActionsheetOpen(false);
  };

  const handleConfirmDate = () => {
    if (tempSelectedDay) {
      const newSelectedDate = new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        tempSelectedDay,
      );
      setSelectedDate(newSelectedDate);
      if (errors.tanggal) {
        setErrors((prevErrors) => ({ ...prevErrors, tanggal: null }));
      }
    }
    handleCloseDatePicker();
  };

  const handleOpenDatePicker = () => {
    const initialDate = selectedDate || new Date();
    setDisplayDate(initialDate);
    setTempSelectedDay(selectedDate ? selectedDate.getDate() : null);
    setPickerMode("date");
    setDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => setDatePickerOpen(false);
  const handleDaySelect = (day) => setTempSelectedDay(day);
  const handleResetDate = () => setTempSelectedDay(null);

  const formatDateForDisplay = (date) => {
    if (!date) return "Pilih tanggal mulai";
    if (selectedFrequency === "Mingguan") {
      return `Setiap hari ${date.toLocaleDateString("id-ID", { weekday: "long" })}`;
    }
    if (selectedFrequency === "Bulanan" || selectedFrequency === "Satu kali") {
      return `Setiap tanggal ${date.getDate()}`;
    }
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validate = () => {
    const newErrors = {};
    if (!selectedFrequency) {
      newErrors.frekuensi = "Frekuensi harus dipilih.";
    }
    if (!selectedDate) {
      newErrors.tanggal = "Tanggal mulai harus dipilih.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToConfirmation = () => {
    if (validate()) {
      const dataToPass = {
        nominal: amount,
        frequency: selectedFrequency,
        selectedDate: selectedDate ? selectedDate.getDate().toString() : null,
        startDate: selectedDate ? selectedDate.toISOString() : null,
        endDate: selectedEndDate ? selectedEndDate.toISOString() : null,
        pocketDetail: pocketDetail,
        sourceFund: sourceFund,
      };
      router.push({
        pathname: "pocket/transaction/autoBudgeting/autoBudgetingConfirmation",
        params: dataToPass,
      });
    }
  };

  const InfoTransferItem = ({ text }) => (
    <View className="flex-row mb-3">
      <Text className="text-2xl mr-2" style={{ color: "#00A39D" }}>
        •
      </Text>
      <Text className="text-base text-gray-700 flex-1">{text}</Text>
    </View>
  );

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
          <Box className="flex-row items-center mt-5 mb-6 gap-4">
            <PocketCard
              mode="icon"
              pocketType={pocketDetail.pocketType}
              color={pocketDetail.color}
              icon={pocketDetail.icon}
              iconSize="10"
              whiteSpace="mb-5"
              className="w-12 h-12 rounded-full"
              iconColor="$text-white"
              iconBackgroundColor="$orange-wondr"
              iconBackgroundSize="w-12 h-12"
            />
            <Box flex={1}>
              <View className="flex-row items-center justify-between">
                <Heading size="md" color="$text-black-600">
                  {pocketDetail.name}
                </Heading>
                <Pressable onPress={() => setInfoModalVisible(true)}>
                  <CircleHelp size={22} color="orange" />
                </Pressable>
              </View>
              <Text size="sm" color="$text-black-600">
                {pocketDetail.accountNumber}
              </Text>
            </Box>
          </Box>

          <Box className="mb-4">
            <NominalInput
              amount={amount}
              setAmount={(val) => {
                setAmount(val);
                if (errors.nominal) {
                  setErrors((prev) => ({ ...prev, nominal: null }));
                }
              }}
              setAmountTouched={setAmountTouched}
              isAmountInvalid={!!errors.nominal}
            />
            {errors.nominal && (
              <Text className="text-red-500 mt-1 ml-1">{errors.nominal}</Text>
            )}
          </Box>

          <Text className="text-black font-light mb-1">Frekuensi</Text>
          <Pressable
            onPress={() => setIsFrequencyActionsheetOpen(true)}
            className={`w-full h-14 p-3 my-1 justify-between rounded-xl border ${errors.frekuensi ? "border-red-500" : "border-gray-300"} flex-row items-center`}
          >
            <Text
              className={selectedFrequency ? "text-black" : "text-gray-400"}
            >
              {selectedFrequency ?? "Pilih frekuensi"}
            </Text>
            <ChevronRight size={16} color="#848688" />
          </Pressable>
          {errors.frekuensi && (
            <Text className="text-red-500 mt-1 ml-1">{errors.frekuensi}</Text>
          )}

          <Text className="text-black font-light mt-4 mb-1">Starting date</Text>
          <Pressable
            onPress={handleOpenDatePicker}
            className={`w-full h-14 p-3 my-1 justify-start rounded-xl border ${errors.tanggal ? "border-red-500" : "border-gray-300"} flex-row items-center gap-3`}
            disabled={!selectedFrequency}
            style={{ opacity: !selectedFrequency ? 0.5 : 1 }}
          >
            <CalendarClock size={16} color="#848688" />
            <Text className={selectedDate ? "text-black" : "text-gray-400"}>
              {formatDateForDisplay(selectedDate)}
            </Text>
          </Pressable>
          {errors.tanggal && (
            <Text className="text-red-500 mt-1 ml-1">{errors.tanggal}</Text>
          )}

          <Box className="mb-4 mt-4">
            <TransactionCard
              title={sourceFund.title}
              heading={sourceFund.heading}
              subheading={sourceFund.subheading}
              balance={sourceFund.balance}
              showBalance={true}
            />
          </Box>

          <Box style={{ flex: 1 }} />

          <PrimaryButton
            buttonAction={handleNextToConfirmation}
            buttonTitle="Set auto-budgeting"
            className="mb-8"
            textClassName="text-black font-bold text-base"
            disabled={!amount || !selectedFrequency || !selectedDate}
            isLoading={false}
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Modal Info Transfer Terjadwal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isInfoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!isInfoModalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className="w-11/12 bg-white rounded-2xl p-5"
            style={{ elevation: 5 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black">
                Info transfer terjadwal
              </Text>
              <TouchableOpacity onPress={() => setInfoModalVisible(false)}>
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E5E7EB",
                paddingTop: 16,
              }}
            >
              <InfoTransferItem text="Transfer akan diproses jam 00.00 WIB pada jadwal kamu. Pastiin saldo kamu cukup sebelumnya." />
              <InfoTransferItem text="Kamu tidak akan dikenakan biaya apa pun kalau transfer terjadwal gagal karena saldo tidak cukup." />
              <InfoTransferItem text="Kalau kamu jadwalin transfer bulanan di tanggal 31 dan bulan berikutnya memiliki kurang dari 31 hari, transfer akan dikirim di hari terakhir bulan tersebut." />
              <InfoTransferItem text="Transfer terjadwal kamu bisa dibatalin oleh sistem karena rekening tujuan kamu tidak aktif atau nominal transfer yang terjadwal melebihi limit harian." />
            </View>
          </View>
        </View>
      </Modal>

      <CustomDatePicker
        isOpen={isDatePickerOpen}
        onClose={handleCloseDatePicker}
        onConfirm={handleConfirmDate}
        onReset={handleResetDate}
        displayDate={displayDate}
        selectedDay={tempSelectedDay}
        pickerMode={pickerMode}
        onDaySelect={handleDaySelect}
        onDisplayDateChange={setDisplayDate}
        onPickerModeChange={setPickerMode}
        minDate={today}
      />

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
