import React, { useState, useEffect } from "react";
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
import { WondrColors } from "@/utils/colorUtils";

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
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const CustomDatePicker = ({
  isVisible,
  onClose,
  onConfirm,
  initialDate,
  minDate,
}) => {
  const [displayDate, setDisplayDate] = useState(initialDate || new Date());
  const [selectedDay, setSelectedDay] = useState(
    initialDate ? initialDate.getDate() : null,
  );
  const [pickerMode, setPickerMode] = useState("date");

  useEffect(() => {
    if (isVisible) {
      const today = new Date();
      // Pastikan initialDate tidak lebih kecil dari minDate jika minDate ada
      const effectiveInitialDate =
        minDate && initialDate && initialDate < minDate
          ? minDate
          : initialDate || today;

      setDisplayDate(effectiveInitialDate);
      setSelectedDay(effectiveInitialDate.getDate());
      setPickerMode("date");
    }
  }, [isVisible, initialDate, minDate]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const getFullSelectedDate = () => {
    if (selectedDay) {
      return new Date(
        displayDate.getFullYear(),
        displayDate.getMonth(),
        selectedDay,
      );
    }
    return null;
  };

  const handleDaySelect = (day) => {
    const candidateDate = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth(),
      day,
    );
    const effectiveMinDate = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null;

    if (effectiveMinDate && candidateDate < effectiveMinDate) {
      return; // Tanggal lampau, jangan update selectedDay
    }
    setSelectedDay(day);
  };

  const renderDateGrid = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const blanks = Array.from({ length: startDay }, (_, i) => null);
    const days = Array.from({ length: numDays }, (_, i) => i + 1);

    const allCells = [...blanks, ...days];
    const rows = [];
    let cells = [];

    allCells.forEach((day, index) => {
      cells.push(day);
      if ((index + 1) % 7 === 0 || index === allCells.length - 1) {
        while (cells.length < 7) {
          cells.push(null);
        }
        rows.push(cells);
        cells = [];
      }
    });

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
              key={dayName + index}
              className="font-semibold text-gray-500 w-8 text-center"
            >
              {dayName}
            </Text>
          ))}
        </Box>
        {rows.map((row, rowIndex) => (
          <Box key={`row-${rowIndex}`} className="flex-row justify-around">
            {row.map((day, colIndex) => {
              const isCellEmpty = day === null;
              const cellDate = day ? new Date(year, month, day) : null;
              const isPastDate =
                effectiveMinDate && cellDate && cellDate < effectiveMinDate;
              const isCurrentDay = isCurrentMonth && day === today.getDate();
              const isSelected =
                selectedDay === day &&
                displayDate.getMonth() === month &&
                displayDate.getFullYear() === year;

              return (
                <Pressable
                  key={`day-${rowIndex}-${colIndex}`}
                  onPress={() =>
                    !isCellEmpty && !isPastDate && handleDaySelect(day)
                  }
                  style={{ width: 36, height: 36 }}
                  className="items-center justify-center m-1"
                >
                  <Box
                    className={`rounded-full items-center justify-center w-8 h-8 ${
                      isSelected ? "bg-green-select" : ""
                    } ${isCurrentDay && !isSelected && !isPastDate ? "border-2 border-green-select" : ""}`}
                    style={
                      isCellEmpty || isPastDate
                        ? { opacity: isPastDate ? 0.3 : 0 }
                        : {}
                    }
                  >
                    <Text
                      className={`text-base ${
                        isSelected
                          ? "text-white"
                          : isPastDate
                            ? "text-gray-400"
                            : "text-black"
                      }`}
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
              setDisplayDate(new Date(displayDate.getFullYear(), index, 1));
              setPickerMode("date");
            }}
            style={{ width: "33.33%" }}
            className="p-2"
          >
            <Box
              className={`py-3 rounded-full items-center justify-center ${
                isSelected ? "bg-green-select" : "transparent"
              }`}
            >
              <Text
                className={`font-semibold ${
                  isSelected
                    ? "text-white"
                    : isPastMonth
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}
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
              setDisplayDate(new Date(year, displayDate.getMonth(), 1));
              setPickerMode("date");
            }}
            style={{ width: "33.33%" }}
            className="p-2"
          >
            <Box
              className={`py-3 rounded-full items-center justify-center ${
                isSelected ? "bg-green-select" : "transparent"
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  isSelected
                    ? "text-white"
                    : isPastYear
                      ? "text-gray-400"
                      : "text-gray-500"
                }`}
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
    <Actionsheet isOpen={isVisible} onClose={onClose} zIndex={999}>
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
            onPress={() => setPickerMode("month-picker")}
            className="flex-row items-center gap-1"
          >
            <Text className="font-semibold text-lg text-black">
              {months[displayDate.getMonth()]}
            </Text>
            <ChevronDown size={20} color="black" />
          </Pressable>

          <Pressable
            onPress={() => setPickerMode("year-picker")}
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
          <Pressable
            onPress={() => {
              const today = new Date();
              const resetDate = minDate && today < minDate ? minDate : today;
              setDisplayDate(resetDate);
              setSelectedDay(resetDate.getDate());
              setPickerMode("date");
            }}
          >
            <Text className="text-gray-500 font-semibold text-base">Reset</Text>
          </Pressable>
          <Pressable onPress={() => onConfirm(getFullSelectedDate())}>
            <Text className="text-black font-bold text-base">Simpan</Text>
          </Pressable>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default CustomDatePicker;
