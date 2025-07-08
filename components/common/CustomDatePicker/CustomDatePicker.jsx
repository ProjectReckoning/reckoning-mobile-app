// components/common/CustomDatePicker.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { X, ChevronDown } from "lucide-react-native";

const months = [
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

const currentYear = new Date().getFullYear();
// Anda bisa membuat ini lebih dinamis jika diperlukan
const years = Array.from({ length: 12 }, (_, i) => currentYear + i);

// Helper functions (bisa diletakkan di luar komponen jika tidak bergantung pada props)
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const CustomDatePicker = ({
  isOpen,
  onClose,
  onConfirm,
  onReset,
  displayDate,
  selectedDay,
  pickerMode,
  onDaySelect,
  onDisplayDateChange,
  onPickerModeChange,
  minDate,
}) => {
  // Ganti seluruh fungsi renderDateGrid Anda dengan ini

  const renderDateGrid = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const blanks = Array.from({ length: startDay }, () => null);
    const days = Array.from({ length: numDays }, (_, i) => i + 1);
    const allCells = [...blanks, ...days];
    const rows = [];
    let cells = [];

    allCells.forEach((day, index) => {
      cells.push(day);
      if ((index + 1) % 7 === 0) {
        // Hanya push jika baris sudah penuh 7 sel
        rows.push([...cells]);
        cells = [];
      }
    });

    // --- START: Perubahan Logika ---
    // Jika masih ada sisa sel setelah loop (untuk baris terakhir yang tidak penuh)
    if (cells.length > 0) {
      // Tambahkan sel kosong (padding) sampai baris tersebut memiliki 7 sel
      while (cells.length < 7) {
        cells.push(null); // Kita bisa gunakan 'null' yang sama seperti 'blanks'
      }
      rows.push([...cells]); // Push baris terakhir yang sekarang sudah penuh
    }
    // --- END: Perubahan Logika ---

    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;
    const effectiveMinDate = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null;

    return (
      <Box className="w-full">
        <Box className="flex-row justify-around py-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((dayName, index) => (
            <Text
              key={index}
              className="font-semibold text-gray-500 w-8 text-center"
            >
              {dayName}
            </Text>
          ))}
        </Box>
        {rows.map((row, rowIndex) => (
          <Box key={`row-${rowIndex}`} className="flex-row justify-around">
            {row.map((day, colIndex) => {
              // Logika render sel tidak perlu diubah, karena sudah menangani 'null'
              if (day === null)
                return (
                  <Box
                    key={`blank-${rowIndex}-${colIndex}`}
                    style={{ width: 36, height: 36 }}
                    className="m-1"
                  />
                );

              const cellDate = new Date(year, month, day);
              const isPastDate =
                effectiveMinDate && cellDate < effectiveMinDate;
              const isCurrentDay = isCurrentMonth && day === today.getDate();
              const isSelected = selectedDay === day;

              return (
                <Pressable
                  key={`day-${rowIndex}-${colIndex}`}
                  onPress={() => !isPastDate && onDaySelect(day)}
                  style={{ width: 36, height: 36 }}
                  className="items-center justify-center m-1"
                  disabled={isPastDate}
                >
                  <Box
                    className={`rounded-full items-center justify-center w-8 h-8 
                    ${isSelected ? "bg-green-select" : ""} 
                    ${isCurrentDay && !isSelected ? "border-2 border-green-select" : ""}`}
                    style={isPastDate ? { opacity: 0.3 } : {}}
                  >
                    <Text
                      className={`text-base ${isSelected ? "text-white" : "text-black"}`}
                    >
                      {day}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  const renderMonthPicker = () => (
    <Box
      className="w-full flex-row flex-wrap justify-center px-2 py-2"
      style={{ minHeight: 250 }}
    >
      {months.map((month, index) => {
        const isPastMonth =
          minDate &&
          new Date(displayDate.getFullYear(), index + 1, 0) < minDate;
        const isSelected = displayDate.getMonth() === index;
        return (
          <Pressable
            key={month}
            onPress={() => {
              if (isPastMonth) return;
              onDisplayDateChange(
                new Date(displayDate.getFullYear(), index, 1),
              );
              onPickerModeChange("date");
            }}
            style={{ width: "33.33%" }}
            className="p-2"
            disabled={isPastMonth}
          >
            <Box
              className={`py-3 rounded-full items-center justify-center ${isSelected ? "bg-green-select" : "transparent"}`}
            >
              <Text
                className={`font-semibold ${isSelected ? "text-white" : isPastMonth ? "text-gray-400" : "text-gray-500"}`}
              >
                {month}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );

  const renderYearPicker = () => (
    <Box
      className="w-full flex-row flex-wrap px-2 py-2"
      style={{ minHeight: 250 }}
    >
      {years.map((year) => {
        const isPastYear = minDate && new Date(year, 11, 31) < minDate;
        const isSelected = displayDate.getFullYear() === year;
        return (
          <Pressable
            key={year}
            onPress={() => {
              if (isPastYear) return;
              onDisplayDateChange(new Date(year, displayDate.getMonth(), 1));
              onPickerModeChange("date");
            }}
            style={{ width: "33.33%" }}
            className="p-2"
            disabled={isPastYear}
          >
            <Box
              className={`py-3 rounded-full items-center justify-center ${isSelected ? "bg-green-select" : "transparent"}`}
            >
              <Text
                className={`font-semibold text-base ${isSelected ? "text-white" : isPastYear ? "text-gray-400" : "text-gray-500"}`}
              >
                {year}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999} h="auto">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box className="w-full flex-row justify-between items-center px-4 pt-2 pb-4 mt-4">
          <Text className="font-bold text-lg text-black">Pilih tanggal</Text>
          <Pressable onPress={onClose}>
            <X size={24} color="#000" />
          </Pressable>
        </Box>

        <Box className="w-full flex-row justify-between items-center px-4 mb-4">
          <Pressable
            onPress={() => onPickerModeChange("month-picker")}
            className="flex-row items-center gap-1"
          >
            <Text className="font-semibold text-lg text-black">
              {months[displayDate.getMonth()]}
            </Text>
            <ChevronDown size={20} color="black" />
          </Pressable>
          <Pressable
            onPress={() => onPickerModeChange("year-picker")}
            className="flex-row items-center gap-1"
          >
            <Text className="font-semibold text-lg text-black">
              {displayDate.getFullYear()}
            </Text>
            <ChevronDown size={20} color="black" />
          </Pressable>
        </Box>

        {pickerMode === "date" && renderDateGrid()}
        {pickerMode === "month-picker" && renderMonthPicker()}
        {pickerMode === "year-picker" && renderYearPicker()}

        <Box className="w-full flex-row justify-between px-4 pt-4 pb-6">
          <Pressable onPress={onReset}>
            <Text className="text-gray-500 font-semibold text-base">Reset</Text>
          </Pressable>
          <Pressable onPress={onConfirm}>
            <Text className="text-black font-bold text-base">Simpan</Text>
          </Pressable>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default CustomDatePicker;
