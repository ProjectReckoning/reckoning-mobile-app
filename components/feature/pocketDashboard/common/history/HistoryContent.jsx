import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { Divider } from "@/components/ui/divider";
import { SectionList } from "@/components/ui/section-list";

import { Image, Text } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import { WondrColors } from "@/utils/colorUtils";
import MonthSelectionBar from "./MonthSelectionBar";
import { usePocketStore } from "@/stores/pocketStore";
import AppText from "@/components/common/typography/AppText";
import { formatDateForHeader } from "@/utils/helperFunction";
import { MOCK_MONTH_DATA } from "@/utils/mockData/monthMockData";
import TransactionHistoryTableCell from "@/components/common/tableCells/TransactionHistoryTableCell";

// Komponen EmptyState didefinisikan di sini atau diimpor dari file lain
const EmptyState = ({ imageSource, title, subtitle }) => (
  <Box className="flex-1 items-center  ">
    {/* Ganti path gambar sesuai dengan lokasi aset Anda */}
    <Image
      source={imageSource}
      style={{ width: 200, height: 200, marginBottom: -15 }}
      resizeMode="contain"
    />
    <Text className="text-xl font-bold text-center text-gray-800 mb-2">
      {title}
    </Text>
    <Text className="text-sm text-center text-gray-500 px-4">{subtitle}</Text>
  </Box>
);

export default function HistoryContent() {
  const { id: pocketId } = useLocalSearchParams();

  const transactionHistory = usePocketStore(
    (state) => state.transactionHistory,
  );
  const isHistoryLoading = usePocketStore((state) => state.isHistoryLoading);
  const historyError = usePocketStore((state) => state.historyError);
  const fetchTransactionHistory = usePocketStore(
    (state) => state.fetchTransactionHistory,
  );

  // --- CHANGE: Use the actual current date instead of a mocked one ---
  const ACTUAL_CURRENT_DATE = new Date();

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return {
      month: ACTUAL_CURRENT_DATE.getMonth() + 1,
      year: ACTUAL_CURRENT_DATE.getFullYear(),
      fullValue: `${ACTUAL_CURRENT_DATE.getFullYear()}-${String(
        ACTUAL_CURRENT_DATE.getMonth() + 1,
      ).padStart(2, "0")}`,
    };
  });
  const [rollingMonthsData, setRollingMonthsData] = useState([]);

  useEffect(() => {
    const generateRollingMonths = () => {
      const allMonths = [...MOCK_MONTH_DATA].sort((a, b) => a.id - b.id);
      const months = [];
      // Use the actual current date to generate the month list
      let date = new Date(ACTUAL_CURRENT_DATE);
      for (let i = 0; i < 12; i++) {
        const year = date.getFullYear();
        const monthValue = date.getMonth() + 1;
        const monthData = allMonths[monthValue - 1];
        if (monthData) {
          // Add a check to ensure monthData exists
          months.push({
            id: `${monthData.id}_${year}`,
            month: monthData.month,
            value: monthData.value,
            year: year,
            fullValue: `${year}-${String(monthValue).padStart(2, "0")}`,
          });
        }
        date.setMonth(date.getMonth() - 1);
      }
      return months.reverse();
    };
    setRollingMonthsData(generateRollingMonths());
  }, []);

  useEffect(() => {
    if (pocketId && selectedMonth.fullValue) {
      fetchTransactionHistory(pocketId, selectedMonth.fullValue);
    }
  }, [selectedMonth, fetchTransactionHistory, pocketId]);

  const handleMonthSelect = (monthItem) => {
    setSelectedMonth({
      month: monthItem.value,
      year: monthItem.year,
      fullValue: monthItem.fullValue,
    });
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Box className="bg-white px-4 z-10">
      <AppText
        variant="bodyBold"
        className="py-2"
        style={{ color: WondrColors["dark-gray-wondr"] }}
      >
        {formatDateForHeader(title)}
      </AppText>
      <Divider
        style={{ backgroundColor: WondrColors["light-gray-wondr"], height: 1 }}
      />
    </Box>
  );

  const renderItem = ({ item }) => <TransactionHistoryTableCell data={item} />;

  const renderContent = () => {
    if (isHistoryLoading) {
      return (
        <Box className="flex-1 justify-center items-center">
          <Spinner size="large" />
        </Box>
      );
    }

    if (historyError) {
      return (
        <Box className="flex-1 justify-center items-center p-5">
          <AppText variant="bodyMuted" className="text-center text-red-500">
            Error: {historyError}
          </AppText>
        </Box>
      );
    }

    if (transactionHistory.length === 0) {
      // --- PERUBAHAN DI SINI ---
      // Mengganti pesan teks dengan komponen EmptyState
      return (
        <EmptyState
          // Pastikan path ke gambar ini benar dan sesuai dengan struktur folder Anda
          imageSource={require("@/assets/images/schedule_done_empty.png")}
          title="Kamu belum pernah transaksi di bulan ini"
          subtitle="Setelah transaksi, nanti riwayat transaksi bulanan kamu akan muncul di halaman ini."
        />
      );
    }

    return (
      <SectionList
        sections={transactionHistory.map((item) => ({
          title: item.date,
          data: item.transactions,
        }))}
        keyExtractor={(item, index) => item.id.toString() + index} // Ensure key is unique
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />
    );
  };

  return (
    <Box className="flex-1 bg-white pt-2">
      <MonthSelectionBar
        data={rollingMonthsData}
        selectedMonthValue={selectedMonth.fullValue}
        onMonthSelect={handleMonthSelect}
      />
      {renderContent()}
    </Box>
  );
}
