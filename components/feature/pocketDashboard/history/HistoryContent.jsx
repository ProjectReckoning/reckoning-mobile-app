// app/pocket/dashboard/history/HistoryContent.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SectionList } from "@/components/ui/section-list";
import { Divider } from "@/components/ui/divider";

import MonthSelectionBar from "@/components/feature/pocketDashboard/history/MonthSelectionBar";
import TransactionHistoryTableCell from "@/components/common/tableCells/TransactionHistoryTableCell";

import { MOCK_MONTH_DATA } from "@/utils/mockData/monthMockData"; // This is just Jan-Dec
import {
  TRANSACTIONS_GROUPED_FOR_JUNE_2025,
  TRANSACTIONS_GROUPED_FOR_MAY_2025,
  // Make sure to import mock data for other months/years as needed
} from "@/utils/pocketTransactionMockData";
import { formatDateForHeader } from "@/utils/helperFunction";
import { WondrColors } from "@/utils/colorUtils";

export default function HistoryContent() {
  // Determine the current month and year for initialization
  const currentFullDate = new Date("2025-06-16"); // Example: Use actual current date in production
  const currentMonthValue = currentFullDate.getMonth() + 1; // 1-indexed (e.g., 6 for June)
  const currentYear = currentFullDate.getFullYear(); // e.g., 2025

  const [selectedMonthFullValue, setSelectedMonthFullValue] = useState({
    month: currentMonthValue,
    year: currentYear,
    fullValue: `${currentMonthValue}-${currentYear}`, // Unique identifier like "6-2025"
  });
  const [displayedSections, setDisplayedSections] = useState([]);
  const [rollingMonthsData, setRollingMonthsData] = useState([]);

  // Effect to generate the 12-month rolling data
  useEffect(() => {
    const generateRollingMonths = () => {
      const allMonths = [...MOCK_MONTH_DATA].sort((a, b) => a.id - b.id); // Ensure Jan-Dec is sorted
      const months = [];
      let displayMonth = currentMonthValue; // Start from current month, 1-indexed
      let displayYear = currentYear;

      // Populate months going backward from the current month for 12 iterations
      for (let i = 0; i < 12; i++) {
        const monthData = allMonths[displayMonth - 1]; // Get 0-indexed month data (e.g., June is index 5)
        months.push({
          id: `${monthData.id}_${displayYear}`, // Unique ID combining month ID and year
          month: monthData.month, // Short month name (e.g., "Jun")
          value: monthData.value, // 1-indexed month number (e.g., 6)
          year: displayYear, // Year (e.g., 2025)
          fullValue: `${monthData.value}-${displayYear}`, // Combined value for selection (e.g., "6-2025")
        });

        // Move to the previous month
        displayMonth--;
        if (displayMonth === 0) {
          // If month wraps around from January (1) to December (12)
          displayMonth = 12; // Set to December
          displayYear--; // Decrement year
        }
      }
      return months.reverse(); // Reverse to get chronological order (e.g., Jul 2024 -> Jun 2025)
    };

    const generatedMonths = generateRollingMonths();
    setRollingMonthsData(generatedMonths);

    // Initial data fetch for the current month when component mounts
    fetchTransactionsForMonth(
      selectedMonthFullValue.month,
      selectedMonthFullValue.year,
    );
  }, []); // Run only once on component mount to generate the fixed 12-month range

  // Effect to re-fetch transactions when the selected month changes
  useEffect(() => {
    fetchTransactionsForMonth(
      selectedMonthFullValue.month,
      selectedMonthFullValue.year,
    );
  }, [selectedMonthFullValue]); // Dependency on selectedMonthFullValue

  // Function to simulate fetching transactions based on month and year
  const fetchTransactionsForMonth = (monthValue, yearValue) => {
    let dataFromBackend = [];
    // This part needs to be expanded significantly if you have more mock data
    // for various months and years (e.g., May 2024, Dec 2024, etc.)
    if (monthValue === 6 && yearValue === 2025) {
      dataFromBackend = TRANSACTIONS_GROUPED_FOR_JUNE_2025;
    } else if (monthValue === 5 && yearValue === 2025) {
      dataFromBackend = TRANSACTIONS_GROUPED_FOR_MAY_2025;
    }
    // Add more `else if` conditions here for other specific month-year combinations
    // Example:
    // else if (monthValue === 12 && yearValue === 2024) {
    //   dataFromBackend = TRANSACTIONS_GROUPED_FOR_DEC_2024;
    // }
    else {
      dataFromBackend = []; // No data for unhandled months/years
    }

    const formattedSectionsForSectionList = dataFromBackend.map((group) => ({
      title: group.date, // 'date' from BE mock becomes 'title' for section header
      data: group.transactions, // 'transactions' from BE mock becomes 'data' for items
    }));
    setDisplayedSections(formattedSectionsForSectionList);
  };

  // Callback function for MonthSelectionBar to update the selected month
  const handleMonthSelect = (monthItem) => {
    // monthItem will be the full object: { id, month, value, year, fullValue }
    setSelectedMonthFullValue({
      month: monthItem.value,
      year: monthItem.year,
      fullValue: monthItem.fullValue,
    });
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Box className="bg-white px-4 z-10">
      <Text
        className="text-base font-bold py-2"
        style={{ color: WondrColors["dark-gray-wondr"] }}
      >
        {formatDateForHeader(title)}
      </Text>
      <Divider
        style={{ backgroundColor: WondrColors["light-gray-wondr"], height: 1 }}
      />
    </Box>
  );

  const renderItem = ({ item }) => <TransactionHistoryTableCell data={item} />;

  return (
    <Box className="flex-1 bg-white pt-2">
      <MonthSelectionBar
        data={rollingMonthsData} // Pass the newly generated rolling 12 months data
        selectedMonthValue={selectedMonthFullValue.fullValue} // Pass the combined value for selection
        onMonthSelect={handleMonthSelect} // Pass the updated handler
      />

      {displayedSections.length > 0 ? (
        <SectionList
          sections={displayedSections}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={{
            paddingHorizontal: 0,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
        />
      ) : (
        <Box className="flex-1 justify-center items-center p-5">
          <Text
            className="text-base text-center"
            style={{ color: WondrColors["dark-gray-wondr"] }}
          >
            No transactions for this month.
          </Text>
        </Box>
      )}
    </Box>
  );
}
