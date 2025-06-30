import React, { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";
import { LinearGradient } from "expo-linear-gradient";
import {
  HandCoins,
  BanknoteArrowUp,
  BanknoteArrowDown,
  WalletCards,
  Wallet,
  Send,
  Package,
} from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";

// --- KONFIGURASI KATEGORI ---
const CATEGORY_DETAILS = {
  penjualan: {
    name: "Penjualan",
    Icon: HandCoins,
    color: WondrColors["purple-wondr"],
    bgColor: "bg-purple-wondr-light-translucent",
  },
  "top up": {
    name: "Top up",
    Icon: BanknoteArrowUp,
    color: WondrColors["tosca-wondr"],
    bgColor: "bg-tosca-wondr-light-translucent",
  },
  gaji: {
    name: "Gaji",
    Icon: Wallet,
    color: WondrColors["orange-wondr"],
    bgColor: "bg-orange-wondr-light-translucent",
  },
  withdraw: {
    name: "Withdraw",
    Icon: BanknoteArrowDown,
    color: WondrColors["purple-wondr"],
    bgColor: "bg-purple-wondr-light-translucent",
  },
  transfer: {
    name: "Pemindahan Dana",
    Icon: Send,
    color: WondrColors["pink-wondr"],
    bgColor: "bg-pink-wondr-light-translucent",
  },
  pembelian: {
    name: "Pembelian",
    Icon: Package,
    color: WondrColors["yellow-wondr"],
    bgColor: "bg-yellow-wondr-light-translucent",
  },
  lainnya: {
    name: "Lainnya",
    Icon: WalletCards,
    color: WondrColors["dark-gray-wondr-deactive"],
    bgColor: "bg-light-gray-wondr",
  },
};

const MAIN_INCOME_CATEGORIES = ["penjualan", "top up"];
const MAIN_EXPENSE_CATEGORIES = ["gaji", "withdraw", "transfer", "pembelian"];

// --- DATA TRANSAKSI (CONTOH) ---
const allTransactions = [
  { id: 1, type: "pemasukan", category: "Penjualan", amount: 750000 },
  { id: 2, type: "pemasukan", category: "Top up", amount: 200000 },
  { id: 3, type: "pemasukan", category: "Bonus Proyek", amount: 100000 },
  { id: 4, type: "pemasukan", category: "Cashback", amount: 25000 },
  { id: 5, type: "pengeluaran", category: "Gaji", amount: 2500000 },
  { id: 6, type: "pengeluaran", category: "Withdraw", amount: 500000 },
  { id: 7, type: "pengeluaran", category: "Pembelian Stok", amount: 1200000 },
  { id: 8, type: "pengeluaran", category: "Listrik", amount: 450000 },
  { id: 9, type: "pengeluaran", category: "Transfer", amount: 450000 },
  { id: 10, type: "pengeluaran", category: "Pembelian", amount: 450000 },
];

// --- FUNGSI LOGIKA ---
const processTransactionsForDisplay = (transactions, activeType) => {
  const mainCategoriesForType =
    activeType === "pemasukan"
      ? MAIN_INCOME_CATEGORIES
      : MAIN_EXPENSE_CATEGORIES;

  const mainItems = [];
  const otherItemsToAggregate = [];

  transactions.forEach((transaction) => {
    const categoryKey = transaction.category.toLowerCase();
    if (mainCategoriesForType.includes(categoryKey)) {
      mainItems.push(transaction);
    } else {
      otherItemsToAggregate.push(transaction);
    }
  });

  if (otherItemsToAggregate.length > 0) {
    const totalOtherAmount = otherItemsToAggregate.reduce(
      (sum, current) => sum + current.amount,
      0,
    );
    const aggregatedOtherItem = {
      id: "lainnya_aggregated",
      type: otherItemsToAggregate[0].type,
      category: "Lainnya",
      amount: totalOtherAmount,
    };
    mainItems.push(aggregatedOtherItem);
  }

  return mainItems;
};

// --- KOMPONEN UTAMA ---
export default function BalanceCategory() {
  const [activeTab, setActiveTab] = useState("pemasukan");

  // --- Logika untuk Kontrol Gradasi ---
  const [listDimensions, setListDimensions] = useState({
    layoutHeight: 0,
    contentHeight: 0,
  });
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const isScrollable =
    listDimensions.contentHeight > listDimensions.layoutHeight;
  const showGradient = isScrollable && !isScrolledToEnd;
  // ---

  const filteredTransactions = allTransactions.filter(
    (t) => t.type === activeTab,
  );
  const displayData = processTransactionsForDisplay(
    filteredTransactions,
    activeTab,
  );

  const balanceTabs = [
    { name: "pemasukan", label: "Pemasukan" },
    { name: "pengeluaran", label: "Pengeluaran" },
  ];

  const handleTabChange = (newTabName) => {
    setActiveTab(newTabName);
    setListDimensions({ layoutHeight: 0, contentHeight: 0 });
    setIsScrolledToEnd(false);
  };

  const handleScroll = useCallback((event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToEnd = 20;
    const isEnd =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToEnd;
    setIsScrolledToEnd(isEnd);
  }, []);

  const handleLayout = useCallback((event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setListDimensions((prev) => {
      const contentHeight = prev.contentHeight;
      setIsScrolledToEnd(contentHeight <= layoutHeight);
      return { ...prev, layoutHeight };
    });
  }, []);

  const handleContentSizeChange = useCallback((width, height) => {
    const contentHeight = height;
    setListDimensions((prev) => {
      const layoutHeight = prev.layoutHeight;
      setIsScrolledToEnd(contentHeight <= layoutHeight);
      return { ...prev, contentHeight };
    });
  }, []);

  const renderTransactionItem = ({ item }) => {
    const categoryKey = item.category.toLowerCase();
    const details = CATEGORY_DETAILS[categoryKey] || CATEGORY_DETAILS.lainnya;
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(item.amount);
    const IconComponent = details.Icon;
    const transactionIcon = (
      <Icon as={IconComponent} size="3xl" color={details.color} />
    );

    return (
      <ReusableCellContent
        icon={transactionIcon}
        iconContainerBgColor={details.bgColor}
        title={details.name}
        description={formattedAmount}
        titleClassName="text-[1.05rem] font-base"
        descriptionClassName="font-bold text-[1.05rem] text-black"
        isRead={true}
      />
    );
  };

  const renderSeparator = () => <Box style={{ height: 10 }} />;

  const ListHeader = () => (
    <Box mb="$6">
      <Box
        className="flex-row items-center p-1 rounded-full"
        style={{ backgroundColor: WondrColors["light-gray-wondr"] }}
      >
        {balanceTabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <Pressable
              key={tab.name}
              onPress={() => handleTabChange(tab.name)}
              className="flex-1"
            >
              <Box
                className={`py-2 px-3 rounded-full justify-center items-center ${
                  isActive ? "bg-lime-wondr" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive
                      ? "font-extrabold text-black"
                      : "font-normal text-black"
                  }`}
                >
                  {tab.label}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );

  return (
    <Box className="bg-white p-5 rounded-3xl border border-gray-wondr-border gap-5 flex-1">
      <ListHeader />
      <Box className="flex-1">
        {displayData && displayData.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
            onLayout={handleLayout}
            onContentSizeChange={handleContentSizeChange}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 25 }}
          />
        ) : (
          <Text textAlign="center" py="$4">
            Tidak ada data untuk kategori ini.
          </Text>
        )}

        {showGradient && (
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0.0)",
              "rgba(255, 255, 255, 0.7)",
              "rgba(255, 255, 255, 1.0)",
            ]}
            locations={[0, 0.5, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 50,
              pointerEvents: "none",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
