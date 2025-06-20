import React, { useState, useCallback } from "react";
import { Box } from "@/components/ui/box";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import PocketDashboardTopBar from "@/components/feature/pocketDashboard/PocketDashboardTopBar";
import BalanceScreen from "@/components/feature/pocketDashboard/balance";
import HistoryScreen from "@/components/feature/pocketDashboard/history";
import InfoScreen from "@/components/feature/pocketDashboard/info";
import AppText from "@/components/common/typography/AppText";

export default function PocketDashboardScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("balance");

  // --- FIX: Use individual, stable selectors for Zustand state ---
  // This prevents the component from re-rendering infinitely.
  // Each hook will only trigger a re-render if its specific state value changes.
  const currentPocket = usePocketStore((state) => state.currentPocket);
  const isLoading = usePocketStore((state) => state.isLoading);
  const error = usePocketStore((state) => state.error);
  const fetchPocketById = usePocketStore((state) => state.fetchPocketById);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchPocketById(id);
      }
    }, [id, fetchPocketById]),
  );

  const renderTabContent = () => {
    if (isLoading && !currentPocket) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted">Loading pocket details...</AppText>
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

    if (!currentPocket) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted">No pocket data available.</AppText>
        </Box>
      );
    }

    switch (activeTab) {
      case "balance":
        return <BalanceScreen />;
      case "info":
        return <InfoScreen />;
      case "history":
        return <HistoryScreen />;
      default:
        return (
          <Box className="flex-1 justify-center items-center bg-white">
            <AppText variant="bodyMuted">Select a tab</AppText>
          </Box>
        );
    }
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
