// app/(main)/pocket/[id]/index.jsx

import { Box } from "@/components/ui/box";

import { CircleHelp } from "lucide-react-native";
import { ActivityIndicator, Pressable } from "react-native";
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  router,
  useLocalSearchParams,
  useFocusEffect,
  useNavigation,
} from "expo-router";

import TabBar from "@/components/common/TabBar";
import { WondrColors } from "@/utils/colorUtils";
import { useGlobalStore } from "@/stores/globalStore";
import { usePocketStore } from "@/stores/pocketStore";
import AppText from "@/components/common/typography/AppText";
import { useTransactionStore } from "@/stores/transactionStore";

import SavingBalanceScreen from "@/components/feature/pocketDashboard/saving/savingBalance";
import SavingHistoryScreen from "@/components/feature/pocketDashboard/saving/savingHistory";
import SavingInfoScreen from "@/components/feature/pocketDashboard/saving/savingInformation";
import BusinessBalanceScreen from "@/components/feature/pocketDashboard/business/businessBalance";
import BusinessHistoryScreen from "@/components/feature/pocketDashboard/business/businessHistory";
import BusinessInfoScreen from "@/components/feature/pocketDashboard/business/businessInformation";
import SpendingBalanceScreen from "@/components/feature/pocketDashboard/spending/spendingBalance";
import SpendingHistoryScreen from "@/components/feature/pocketDashboard/spending/spendingHistory";
import SpendingInfoScreen from "@/components/feature/pocketDashboard/spending/spendingInformation";

const tabList = [
  { key: "balance", label: "Balance" },
  { key: "info", label: "Info" },
  { key: "history", label: "History" },
];

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
  const resetTransactionState = useTransactionStore(
    (state) => state.resetTransactionState,
  );

  const setSavColor = useCallback(() => {
    useGlobalStore.getState().setSavColor("bg-white");
  }, []);
  useFocusEffect(setSavColor);

  useEffect(() => {
    if (currentPocket) {
      navigation.setOptions({
        title: currentPocket.name || "Pocket Details",
        headerRight: () => (
          <Pressable onPress={handleInfoPress}>
            <CircleHelp size={18} color={WondrColors["orange-wondr"]} />
          </Pressable>
        ),
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

  const handleInfoPress = () => {
    router.push("pocket/[id]/PocketInfo");
  };

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

  if (isLoading && !currentPocket) {
    return (
      <Box className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-white px-6">
      {/* <PocketDashboardTopBar
        initialTab={activeTab}
        onTabChange={setActiveTab}
      /> */}
      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={14}
        marginVertical={18}
      />
      <Box className="flex-1">{renderTabContent()}</Box>
    </Box>
  );
}
