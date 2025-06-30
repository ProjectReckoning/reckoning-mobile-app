import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import { ChevronRight, Calendar, Info } from "lucide-react-native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { WondrColors } from "@/utils/colorUtils"; // Pastikan path ini benar
import CustomMonthPicker from "@/components/common/CustomMonthPicker"; // Pastikan path ini benar

export default function ScheduleTransferContent() {
  const { id } = useLocalSearchParams();

  // State untuk pemilih TANGGAL
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null); // 'start' atau 'end'
  const {
    selectedDate,
    selectedStartDate,
    selectedEndDate,
    setSelectedDate,
    setSelectedStartDate,
    setSelectedEndDate,
  } = useTransactionStore();

  // Fungsi untuk memformat tanggal ke "Bln YYYY", contoh: "Ags 2025"
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
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Fungsi untuk membuka pemilih bulan
  const handleOpenMonthPicker = (type) => {
    setActivePicker(type);
    setMonthPickerVisible(true);
  };

  // Fungsi untuk menutup pemilih bulan
  const handleCloseMonthPicker = () => {
    setMonthPickerVisible(false);
    setActivePicker(null);
  };

  // Fungsi untuk mengonfirmasi pilihan bulan.
  const handleConfirmMonth = (newDate) => {
    if (activePicker === "start") {
      setSelectedStartDate(newDate);
    } else if (activePicker === "end") {
      setSelectedEndDate(newDate);
    }
    handleCloseMonthPicker();
  };

  // Fungsi untuk mendapatkan tanggal awal untuk picker
  const getInitialDateForPicker = () => {
    if (activePicker === "start" && selectedStartDate) {
      return selectedStartDate;
    }
    if (activePicker === "end" && selectedEndDate) {
      return selectedEndDate;
    }
    return new Date(); // Default ke tanggal hari ini
  };

  // Logika untuk pemilih TANGGAL
  const handleOpenPicker = () => setPickerVisible(true);
  const handleClosePicker = () => setPickerVisible(false);
  const dateOptions = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleNext = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Confirmation`);
    }
  };

  return (
    <>
      <Box className="flex-1 justify-between py-6 px-8 bg-white" gap={25}>
        <Box className="flex-1 gap-4">
          {/* Komponen pemilih tanggal */}
          <Pressable onPress={handleOpenPicker}>
            <Box className="flex-row justify-between items-center border p-4 rounded-xl border-gray-wondr-border">
              <Text className="text-black text-base">
                {selectedDate ? `Setiap tanggal ${selectedDate}` : "Tanggal"}
              </Text>
              <ChevronRight size={20} color={"#000"} />
            </Box>
          </Pressable>

          {/* Pemilih Bulan Mulai dan Selesai */}
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

      {/* Area Tombol Lanjut */}
      <Box className="px-8 py-4 gap-4 bg-white">
        <PrimaryButton
          buttonAction={handleNext}
          buttonTitle="Lanjut"
          textClassName="text-black text-base text-center font-bold"
          disabled={!selectedDate || !selectedStartDate || !selectedEndDate}
        />
      </Box>

      {/* Actionsheet untuk pemilih TANGGAL */}
      <Actionsheet
        isOpen={isPickerVisible}
        onClose={handleClosePicker}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box className="w-full flex-row justify-between items-center px-4 pb-2">
            <Text className="font-bold text-lg text-black">Pilih tanggal</Text>
          </Box>
          <Picker
            selectedValue={selectedDate || 1}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
            style={{ width: "100%", height: 215 }}
            itemStyle={{ height: 215 }}
          >
            {dateOptions.map((day) => (
              <Picker.Item key={day} label={String(day)} value={day} />
            ))}
          </Picker>
          <Box className="w-full px-4 pt-2 pb-6">
            <PrimaryButton
              buttonAction={handleClosePicker}
              buttonTitle="Simpan"
              textClassName="text-black text-base text-center font-bold"
            />
          </Box>
        </ActionsheetContent>
      </Actionsheet>

      {/* Actionsheet untuk pemilih BULAN & TAHUN */}
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
