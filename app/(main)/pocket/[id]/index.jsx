// app/(main)/pocket/[id]/index.jsx

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
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

  // Selectors for Zustand state
  const currentPocket = usePocketStore((state) => state.currentPocket);
  const isLoading = usePocketStore((state) => state.isLoading);
  const error = usePocketStore((state) => state.error);
  const fetchPocketById = usePocketStore((state) => state.fetchPocketById);
  const fetchTransactionHistory = usePocketStore(
    // Get the history fetch function
    (state) => state.fetchTransactionHistory,
  );

  // Fetch the main pocket data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchPocketById(id);
      }
    }, [id, fetchPocketById]),
  );

  // --- NEW: Fetch business history summary when pocket data is loaded ---
  useEffect(() => {
    if (currentPocket && currentPocket.type === "Business") {
      // Get current month in YYYY-MM format
      const today = new Date();
      const monthString = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}`;

      // Fetch history to populate the summary for the balance circle
      fetchTransactionHistory(currentPocket.id, monthString);
    }
  }, [currentPocket, fetchTransactionHistory]);
  // This effect runs whenever currentPocket changes.

  const screenMapping = useMemo(() => {
    if (!currentPocket) {
      return null;
    }

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
