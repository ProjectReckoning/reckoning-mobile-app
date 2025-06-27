// app/(main)/pocket/[id]/index.jsx

import React, { useState, useCallback, useMemo } from "react";
import { Box } from "@/components/ui/box";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import PocketDashboardTopBar from "@/components/feature/pocketDashboard/PocketDashboardTopBar";
import AppText from "@/components/common/typography/AppText";
import { WondrColors } from "@/utils/colorUtils";

// --- Import ALL screen components ---
// Saving Screens
import SavingBalanceScreen from "@/components/feature/pocketDashboard/saving/savingBalance";
import SavingHistoryScreen from "@/components/feature/pocketDashboard/saving/savingHistory";
import SavingInfoScreen from "@/components/feature/pocketDashboard/saving/savingInformation";

// Business Screens
import BusinessBalanceScreen from "@/components/feature/pocketDashboard/business/businessBalance";
import BusinessHistoryScreen from "@/components/feature/pocketDashboard/business/businessHistory";
import BusinessInfoScreen from "@/components/feature/pocketDashboard/business/businessInformation";

// Spending Screens
import SpendingBalanceScreen from "@/components/feature/pocketDashboard/spending/spendingBalance";
import SpendingHistoryScreen from "@/components/feature/pocketDashboard/spending/spendingHistory";
import SpendingInfoScreen from "@/components/feature/pocketDashboard/spending/spendingInformation";

export default function PocketDashboardScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("balance");

  // Selectors for Zustand state to prevent unnecessary re-renders
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

  // This hook selects the correct set of screen components based on the pocket type.
  // It now handles all three types: Business, Spending, and Saving.
  const screenMapping = useMemo(() => {
    if (!currentPocket) {
      return null;
    }

    // Based on your store logic, the 'type' will be 'Saving', 'Spending', or 'Business'.
    if (currentPocket.type === "Business") {
      return {
        balance: BusinessBalanceScreen,
        info: BusinessInfoScreen,
        history: BusinessHistoryScreen,
      };
    } else if (currentPocket.type === "Spending") {
      // --- NEW: Added specific case for 'Spending' type ---
      return {
        balance: SpendingBalanceScreen,
        info: SpendingInfoScreen,
        history: SpendingHistoryScreen,
      };
    } else {
      // Default to the screens for 'Saving' pockets
      return {
        balance: SavingBalanceScreen,
        info: SavingInfoScreen,
        history: SavingHistoryScreen,
      };
    }
  }, [currentPocket]); // The dependency array ensures this runs only when the pocket data changes.

  const renderTabContent = () => {
    // 1. Handle loading state
    if (isLoading && !currentPocket) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
        </Box>
      );
    }

    // 2. Handle error state
    if (error) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted" className="text-red-500">
            Error: {error}
          </AppText>
        </Box>
      );
    }

    // 3. Handle no data or invalid screen map
    if (!currentPocket || !screenMapping) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <AppText variant="bodyMuted">No pocket data available.</AppText>
        </Box>
      );
    }

    // Dynamically render the component from the map.
    const ComponentToRender = screenMapping[activeTab];

    if (ComponentToRender) {
      return <ComponentToRender />;
    }

    // Fallback for any unexpected state
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
