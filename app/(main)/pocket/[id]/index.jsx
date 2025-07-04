// app/(main)/pocket/[id]/index.jsx

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { ActivityIndicator } from "react-native";
import {
  useLocalSearchParams,
  useFocusEffect,
  useNavigation,
} from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
// 1. Import the transaction store
import { useTransactionStore } from "@/stores/transactionStore";
import PocketDashboardTopBar from "@/components/feature/pocketDashboard/PocketDashboardTopBar";
import AppText from "@/components/common/typography/AppText";
import { WondrColors } from "@/utils/colorUtils";

// --- Import ALL screen components ---
import SavingBalanceScreen from "@/components/feature/pocketDashboard/saving/savingBalance";
import SavingHistoryScreen from "@/components/feature/pocketDashboard/saving/savingHistory";
import SavingInfoScreen from "@/components/feature/pocketDashboard/saving/savingInformation";
import BusinessBalanceScreen from "@/components/feature/pocketDashboard/business/businessBalance";
import BusinessHistoryScreen from "@/components/feature/pocketDashboard/business/businessHistory";
import BusinessInfoScreen from "@/components/feature/pocketDashboard/business/businessInformation";
import SpendingBalanceScreen from "@/components/feature/pocketDashboard/spending/spendingBalance";
import SpendingHistoryScreen from "@/components/feature/pocketDashboard/spending/spendingHistory";
import SpendingInfoScreen from "@/components/feature/pocketDashboard/spending/spendingInformation";

export default function PocketDashboardScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("balance");
  const navigation = useNavigation();

  const currentPocket = usePocketStore((state) => state.currentPocket);
  const isLoading = usePocketStore((state) => state.isLoading);
  const error = usePocketStore((state) => state.error);
  const fetchPocketById = usePocketStore((state) => state.fetchPocketById);
  const fetchTransactionHistory = usePocketStore(
    (state) => state.fetchTransactionHistory,
  );

  // 2. Get the reset action from the transaction store
  const resetTransactionState = useTransactionStore(
    (state) => state.resetTransactionState,
  );

  useEffect(() => {
    if (currentPocket) {
      navigation.setOptions({
        title: currentPocket.name || "Pocket Details",
      });
    }
  }, [navigation, currentPocket]);

  useFocusEffect(
    useCallback(() => {
      // 3. Reset the transaction state every time this screen is focused
      console.log("Pocket Dashboard focused, resetting transaction state...");
      resetTransactionState();

      if (id) {
        fetchPocketById(id);
      }
    }, [id, fetchPocketById, resetTransactionState]), // 4. Add action to dependency array
  );

  useEffect(() => {
    if (currentPocket && currentPocket.type === "Business") {
      const today = new Date();
      const monthString = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}`;
      fetchTransactionHistory(currentPocket.id, monthString);
    }
  }, [currentPocket, fetchTransactionHistory]);

  const screenMapping = useMemo(() => {
    if (!currentPocket) {
      return null;
    }
    // ... rest of your code
    if (currentPocket.type === "Business") {
      return {
        balance: BusinessBalanceScreen,
        info: BusinessInfoScreen,
        history: BusinessHistoryScreen,
      };
    } else if (currentPocket.type === "Spending") {
      return {
        balance: SpendingBalanceScreen,
        info: SpendingInfoScreen,
        history: SpendingHistoryScreen,
      };
    } else {
      return {
        balance: SavingBalanceScreen,
        info: SavingInfoScreen,
        history: SavingHistoryScreen,
      };
    }
  }, [currentPocket]);

  const renderTabContent = () => {
    if (isLoading && !currentPocket) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted" className="text-red-500">
            Error: {error}
          </AppText>
        </Box>
      );
    }

    if (!currentPocket || !screenMapping) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted">No pocket data available.</AppText>
        </Box>
      );
    }

    const ComponentToRender = screenMapping[activeTab];

    if (ComponentToRender) {
      return <ComponentToRender />;
    }

    return (
      <Box className="flex-1 justify-center items-center bg-white">
        <AppText variant="bodyMuted">Select a tab</AppText>
      </Box>
    );
  };

  return (
    <Box className="flex-1 bg-white px-8">
      <PocketDashboardTopBar
        initialTab={activeTab}
        onTabChange={setActiveTab}
      />
      <Box className="flex-1">{renderTabContent()}</Box>
    </Box>
  );
}
