import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
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
import { usePocketStore } from "@/stores/pocketStore";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";

const CATEGORY_DETAILS = {
  penjualan: {
    name: "Penjualan",
    Icon: HandCoins,
    color: WondrColors["purple-wondr"],
    bgColor: "bg-purple-wondr-light-translucent",
  },
  topup: {
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

const MAIN_INCOME_CATEGORIES = ["penjualan", "topup"];
const MAIN_EXPENSE_CATEGORIES = ["gaji", "withdraw", "transfer", "pembelian"];

const processTransactionsForDisplay = (transactions, activeType) => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  // 1. Agregasi semua transaksi berdasarkan kategori
  const aggregatedData = transactions.reduce((acc, transaction) => {
    const categoryKey = transaction.category
      .toLowerCase()
      .replace(/[\s-_]/g, "");

    if (!acc[categoryKey]) {
      acc[categoryKey] = {
        id: categoryKey,
        type: transaction.type,
        category: transaction.category,
        amount: 0,
      };
    }
    acc[categoryKey].amount += Number(transaction.amount);
    return acc;
  }, {});

  // 2. Pisahkan kategori utama dan gabungkan sisanya ke "Lainnya"
  const mainCategoriesForType =
    activeType === "Income" ? MAIN_INCOME_CATEGORIES : MAIN_EXPENSE_CATEGORIES;

  const displayItems = [];
  let otherItemsToAggregate = [];

  Object.values(aggregatedData).forEach((item) => {
    const categoryKey = item.category.toLowerCase().replace(/[\s-_]/g, "");
    if (mainCategoriesForType.includes(categoryKey)) {
      displayItems.push(item);
    } else {
      otherItemsToAggregate.push(item);
    }
  });

  // 3. Jika ada kategori "Lainnya", jumlahkan dan tambahkan sebagai satu item
  if (otherItemsToAggregate.length > 0) {
    const totalOtherAmount = otherItemsToAggregate.reduce(
      (sum, current) => sum + current.amount,
      0,
    );
    displayItems.push({
      id: "lainnya_aggregated",
      type: otherItemsToAggregate[0].type,
      category: "Lainnya",
      amount: totalOtherAmount,
    });
  }

  return displayItems;
};

// --- KOMPONEN UTAMA ---
export default function BalanceCategory() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Income");
  const { transactionHistoryRecap, fetchTransactionHistoryRecap } =
    usePocketStore();

  useEffect(() => {
    if (!id) return;
    const pocketId = Array.isArray(id) ? id[0] : id;
    fetchTransactionHistoryRecap(pocketId);
  }, [id, fetchTransactionHistoryRecap]);

  const filteredTransactions = transactionHistoryRecap.filter(
    (t) => t.type === activeTab,
  );

  // Memanggil fungsi yang sudah diperbarui
  const displayData = processTransactionsForDisplay(
    filteredTransactions,
    activeTab,
  );

  const balanceTabs = [
    { name: "Income", label: "Pemasukan" },
    { name: "Expense", label: "Pengeluaran" },
  ];

  const handleTabChange = (newTabName) => {
    setActiveTab(newTabName);
  };

  const renderTransactionItem = ({ item }) => {
    const categoryKey = item.category.toLowerCase().replace(/[\s-_]/g, "");
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
                className={`p-3 rounded-full justify-center items-center ${
                  isActive ? "bg-lime-wondr" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-sm ${
                    isActive ? "font-bold text-black" : "font-normal text-black"
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
    <Box className="flex-1 w-full bg-white p-5 rounded-3xl border border-gray-wondr-border gap-5">
      <ListHeader />
      <Box>
        {displayData && displayData.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 5 }}
          />
        ) : (
          <Text textAlign="center" py="$4">
            Tidak ada data untuk kategori ini.
          </Text>
        )}
      </Box>
    </Box>
  );
}
