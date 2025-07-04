import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { ChevronDown, ChevronUp } from "lucide-react-native";
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
const years = [currentYear, currentYear + 1];

const CustomMonthPicker = ({
  isVisible,
  onClose,
  onConfirm,
  initialDate,
  title,
  activePicker,
  selectedStartDate,
}) => {
  const [currentView, setCurrentView] = useState("month");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const today = new Date();
  const currentMonthIndex = today.getMonth();

  useEffect(() => {
    if (isVisible) {
      setCurrentView("month");
      const dateToSet = initialDate || new Date();
      setSelectedYear(dateToSet.getFullYear());
      setSelectedMonth(dateToSet.getMonth());
    }
  }, [initialDate, isVisible]);

  const toggleView = () => {
    setCurrentView((prev) => (prev === "month" ? "year" : "month"));
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentView("month");
  };

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onConfirm(newDate);
  };

  return (
    <Actionsheet isOpen={isVisible} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999} h="auto">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <Box className="w-full flex-row justify-between items-center px-4 pt-2 pb-4">
          <Text className="font-bold text-lg text-black">{title}</Text>
          <Box className="flex-row items-center gap-4">
            <Pressable
              onPress={toggleView}
              className="flex-row items-center gap-1"
            >
              <Text className="font-semibold text-base text-black">
                {selectedYear}
              </Text>
              {currentView === "month" ? (
                <ChevronDown size={20} color="black" />
              ) : (
                <ChevronUp size={20} color="black" />
              )}
            </Pressable>
          </Box>
        </Box>

        {currentView === "year" ? (
          <Box
            className="w-full flex-row flex-wrap px-2 py-2"
            style={{ minHeight: 250 }}
          >
            {years.map((year) => {
              let isYearDisabled = false;
              if (
                activePicker === "end" &&
                selectedStartDate &&
                year < selectedStartDate.getFullYear()
              ) {
                isYearDisabled = true;
              }

              const isSelected = selectedYear === year;
              return (
                <Pressable
                  key={year}
                  onPress={() => handleYearSelect(year)}
                  style={{ width: "33.33%" }}
                  className="p-2"
                  disabled={isYearDisabled}
                >
                  <Box
                    className={`py-3 rounded-full items-center justify-center`}
                    style={{
                      backgroundColor: isSelected
                        ? WondrColors["green-select"]
                        : "transparent",
                    }}
                  >
                    <Text
                      className={`font-semibold text-base ${
                        isSelected
                          ? "text-white"
                          : isYearDisabled
                            ? "text-gray-300"
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
        ) : (
          <Box
            className="w-full flex-row flex-wrap justify-center px-2 py-2"
            style={{ minHeight: 250 }}
          >
            {months.map((month, index) => {
              let isDisabled = false;

              if (activePicker === "start") {
                if (selectedYear === currentYear && index < currentMonthIndex) {
                  isDisabled = true;
                }
              }

              if (activePicker === "end" && selectedStartDate) {
                const startYear = selectedStartDate.getFullYear();
                const startMonth = selectedStartDate.getMonth();

                if (
                  selectedYear < startYear ||
                  (selectedYear === startYear && index < startMonth)
                ) {
                  isDisabled = true;
                }

                const maxEndDate = new Date(startYear + 1, startMonth);
                if (
                  selectedYear > maxEndDate.getFullYear() ||
                  (selectedYear === maxEndDate.getFullYear() &&
                    index > maxEndDate.getMonth())
                ) {
                  isDisabled = true;
                }
              }

              const isSelected = selectedMonth === index && !isDisabled;

              return (
                <Pressable
                  key={month}
                  onPress={() => setSelectedMonth(index)}
                  style={{ width: "33.33%" }}
                  className="p-2"
                  disabled={isDisabled}
                >
                  <Box
                    className={`py-3 rounded-full items-center justify-center`}
                    style={{
                      backgroundColor: isSelected
                        ? WondrColors["green-select"]
                        : "transparent",
                    }}
                  >
                    <Text
                      className={`font-semibold ${
                        isSelected
                          ? "text-white"
                          : isDisabled
                            ? "text-gray-300"
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
        )}

        <Box className="w-full px-4 pt-2 pb-6">
          <PrimaryButton
            buttonAction={handleConfirm}
            buttonTitle="Simpan"
            textClassName="text-black text-base text-center font-bold"
          />
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default CustomMonthPicker;
