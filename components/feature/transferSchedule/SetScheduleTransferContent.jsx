import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import { Alert } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronRight, Calendar, Info } from "lucide-react-native";

import { WondrColors } from "@/utils/colorUtils";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import CustomMonthPicker from "@/components/common/CustomMonthPicker";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";

// --- Isolated Date Picker Component ---
// By moving the Actionsheet and Picker into their own component, we isolate its state.
// Now, only this small component will re-render when scrolling, not the entire screen.
const DatePickerActionsheet = ({
  isVisible,
  onClose,
  onConfirm,
  initialDate,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const dateOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  // This effect syncs the picker's internal state with the global state
  // only when the actionsheet is opened.
  useEffect(() => {
    if (isVisible) {
      setCurrentDate(initialDate);
    }
  }, [isVisible, initialDate]);

  const handleConfirmPress = () => {
    onConfirm(currentDate);
    onClose(); // Close the sheet after confirming.
  };

  return (
    <Actionsheet isOpen={isVisible} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Box className="w-full flex-row justify-between items-center px-4 pb-2">
          <Text className="font-bold text-lg text-black">Pilih tanggal</Text>
        </Box>
        <Picker
          selectedValue={currentDate}
          onValueChange={(itemValue) => setCurrentDate(itemValue)}
          style={{ width: "100%", height: 215 }}
          itemStyle={{ height: 215 }}
        >
          {dateOptions.map((day) => (
            <Picker.Item key={day} label={String(day)} value={day} />
          ))}
        </Picker>
        <Box className="w-full px-4 pt-2 pb-6">
          <PrimaryButton
            buttonAction={handleConfirmPress}
            buttonTitle="Simpan"
            textClassName="text-black text-base text-center font-bold"
          />
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default function ScheduleTransferContent() {
  const { id } = useLocalSearchParams();

  // State from Zustand store
  const {
    selectedDate,
    selectedStartDate,
    selectedEndDate,
    setSelectedDate,
    setSelectedStartDate,
    setSelectedEndDate,
  } = useTransactionStore();

  // State for month picker visibility and type ('start' or 'end')
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null);

  // State for date picker visibility
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    let error = "";

    // Helper: get month/year as number for comparison
    const getMonthYear = (date) =>
      date ? date.getFullYear() * 100 + date.getMonth() : null;

    // Range: now to 1 year after now
    const now = new Date();
    const minMonth = getMonthYear(now);
    const maxMonth = getMonthYear(
      new Date(now.getFullYear() + 1, now.getMonth()),
    );

    // Validate Bulan Mulai
    if (selectedStartDate) {
      const startMonth = getMonthYear(selectedStartDate);
      if (startMonth < minMonth || startMonth > maxMonth) {
        error =
          "Bulan Mulai hanya bisa dipilih dari bulan ini sampai 1 tahun ke depan.";
      }
    }

    // Validate Bulan Selesai
    if (!error && selectedEndDate) {
      const endMonth = getMonthYear(selectedEndDate);
      if (endMonth < minMonth || endMonth > maxMonth) {
        error =
          "Bulan Selesai hanya bisa dipilih dari bulan ini sampai 1 tahun ke depan.";
      }
    }

    // Validate Bulan Selesai >= Bulan Mulai
    if (
      !error &&
      selectedStartDate &&
      selectedEndDate &&
      getMonthYear(selectedEndDate) < getMonthYear(selectedStartDate)
    ) {
      error = "Bulan Selesai tidak boleh lebih awal dari Bulan Mulai.";
    }

    setValidationError(error);

    // Optional: show alert (or use your own error UI)
    if (error) {
      Alert.alert("Validasi Jadwal", error);
    }
  }, [selectedStartDate, selectedEndDate]);

  // --- Date Formatting ---
  const formatMonthYear = (date) => {
    if (!date) return null;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // --- Date Picker Logic (Simplified) ---
  const handleOpenDatePicker = () => setPickerVisible(true);
  const handleCloseDatePicker = () => setPickerVisible(false);

  const handleConfirmDate = (newDate) => {
    setSelectedDate(newDate);
    // Closing is handled by the DatePickerActionsheet component itself
  };

  // --- Month Picker Logic ---
  const handleOpenMonthPicker = (type) => {
    setActivePicker(type);
    setMonthPickerVisible(true);
  };

  const handleCloseMonthPicker = () => {
    setMonthPickerVisible(false);
    setActivePicker(null);
  };

  const handleConfirmMonth = (newDate) => {
    if (activePicker === "start") {
      setSelectedStartDate(newDate);
    } else if (activePicker === "end") {
      setSelectedEndDate(newDate);
    }
    handleCloseMonthPicker();
  };

  const getInitialDateForPicker = () => {
    if (activePicker === "start" && selectedStartDate) return selectedStartDate;
    if (activePicker === "end" && selectedEndDate) return selectedEndDate;
    return new Date();
  };

  // --- Navigation ---
  const handleNext = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Confirmation`);
    }
  };

  return (
    <>
      <Box className="flex-1 justify-between py-6 px-8 bg-white" gap={25}>
        <Box className="flex-1 gap-4">
          {/* Date Picker Component */}
          <Pressable onPress={handleOpenDatePicker}>
            <Box className="flex-row justify-between items-center border p-4 rounded-xl border-gray-wondr-border">
              <Text className="text-black text-base">
                {selectedDate ? `Setiap tanggal ${selectedDate}` : "Tanggal"}
              </Text>
              <ChevronRight size={20} color={"#000"} />
            </Box>
          </Pressable>

          {/* Start and End Month Pickers */}
          <Box className="flex-row justify-between">
            <Pressable
              onPress={() => handleOpenMonthPicker("start")}
              style={{ width: "48%" }}
            >
              <Box
                className={`flex-row justify-between items-center p-4 rounded-xl ${
                  selectedStartDate
                    ? "border border-gray-wondr-border"
                    : "bg-translucent-gray-wondr"
                }`}
              >
                {selectedStartDate ? (
                  <Box>
                    <Text className="text-xs text-gray-500 leading-tight">
                      Bulan Mulai
                    </Text>
                    <Text className="text-sm text-black leading-tight">
                      {formatMonthYear(selectedStartDate)}
                    </Text>
                  </Box>
                ) : (
                  <Text className="text-base text-dark-gray-wondr-deactive">
                    Bulan Mulai
                  </Text>
                )}
                <Calendar
                  size={20}
                  color={
                    selectedStartDate
                      ? "#000"
                      : WondrColors["dark-gray-wondr-deactive"]
                  }
                />
              </Box>
            </Pressable>

            <Pressable
              onPress={() => handleOpenMonthPicker("end")}
              style={{ width: "48%" }}
            >
              <Box
                className={`flex-row justify-between items-center p-4 rounded-xl ${
                  selectedEndDate
                    ? "border border-gray-wondr-border"
                    : "bg-translucent-gray-wondr"
                }`}
              >
                {selectedEndDate ? (
                  <Box>
                    <Text className="text-xs text-gray-500 leading-tight">
                      Bulan Selesai
                    </Text>
                    <Text className="text-sm text-black leading-tight">
                      {formatMonthYear(selectedEndDate)}
                    </Text>
                  </Box>
                ) : (
                  <Text className="text-base text-dark-gray-wondr-deactive">
                    Bulan Selesai
                  </Text>
                )}
                <Calendar
                  size={20}
                  color={
                    selectedEndDate
                      ? "#000"
                      : WondrColors["dark-gray-wondr-deactive"]
                  }
                />
              </Box>
            </Pressable>
          </Box>

          {validationError ? (
            <Box className="px-2 py-2">
              <Text className="text-red-500 text-sm">{validationError}</Text>
            </Box>
          ) : null}
        </Box>

        {/* Info Box */}
        <Box className="justify-between border p-4 rounded-xl border-gray-wondr-border">
          <Box className="flex-row items-center" gap={8}>
            <Info size={20} color={WondrColors["green-select"]} />
            <Text className="text-green-select font-semibold">
              Info transfer terjadwal
            </Text>
          </Box>
          <Box className="px-8 mt-2" gap={8}>
            <Box className="flex-row" gap={8}>
              <Text className="text-sm mt-1">•</Text>
              <Text className="text-sm flex-1">
                Transfer akan diproses jam 00.00 WIB pada jadwal kamu. Pastiin
                saldo kamu cukup sebelumnya.
              </Text>
            </Box>
            <Box className="flex-row" gap={8}>
              <Text className="text-sm mt-1">•</Text>
              <Text className="text-sm flex-1">
                Kamu tidak akan dikenakan biaya apa pun kalau transfer terjadwal
                gagal karena saldo tidak cukup.
              </Text>
            </Box>
            <Box className="flex-row" gap={8}>
              <Text className="text-sm mt-1">•</Text>
              <Text className="text-sm flex-1">
                Kalau kamu jadwalin transfer bulanan di tanggal 31 dan bulan
                berikutnya memiliki kurang dari 31 hari, transfer akan dikirim
                di hari terakhir bulan tersebut.
              </Text>
            </Box>
            <Box className="flex-row" gap={8}>
              <Text className="text-sm mt-1">•</Text>
              <Text className="text-sm flex-1">
                Transfer terjadwal kamu bisa dibatalin oleh sistem karena
                rekening tujuan kamu tidak aktif atau nominal transfer yang
                terjadwal melebihi limit harian.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Continue Button Area */}
      <Box className="px-8 py-4 gap-4 bg-white">
        <PrimaryButton
          buttonAction={handleNext}
          buttonTitle="Lanjut"
          textClassName="text-black text-base text-center font-bold"
          disabled={
            !selectedDate ||
            !selectedStartDate ||
            !selectedEndDate ||
            validationError !== ""
          }
        />
      </Box>

      {/* Actionsheet for DATE picker is now the new component */}
      <DatePickerActionsheet
        isVisible={isPickerVisible}
        onClose={handleCloseDatePicker}
        onConfirm={handleConfirmDate}
        initialDate={selectedDate || 1}
      />

      {/* Actionsheet for MONTH & YEAR picker */}
      <CustomMonthPicker
        isVisible={isMonthPickerVisible}
        onClose={handleCloseMonthPicker}
        onConfirm={handleConfirmMonth}
        initialDate={getInitialDateForPicker()}
        title={
          activePicker === "start" ? "Pilih Bulan Mulai" : "Pilih Bulan Selesai"
        }
      />
    </>
  );
}
