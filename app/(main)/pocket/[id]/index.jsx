import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import PocketDashboardTopBar from "@/components/feature/pocketDashboard/PocketDashboardTopBar";
import BalanceScreen from "@/components/feature/pocketDashboard/balance";
import HistoryScreen from "@/components/feature/pocketDashboard/history";
import InfoScreen from "@/components/feature/pocketDashboard/info";
import { useLocalSearchParams } from "expo-router";
import api from "@/lib/api";

export default function PocketDashboardScreen() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("balance");
  const [pocketData, setPocketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChangeFromTopBar = (tabName) => {
    setActiveTab(tabName);
    console.log("Current active tab in parent:", tabName);
  };

  const fetchPocketDetail = async () => {
    try {
      const res = await api.get(`/pocket/${id}`);
      console.log("Fetched pocket data:", res.data.data);
      setPocketData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch pocket detail:", error);
      setPocketData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("Pocket ID:", id);
      setIsLoading(true);
      fetchPocketDetail();
    }
  }, [id]);

  const renderTabContent = () => {
    if (isLoading || !pocketData) {
      return (
        <Box className="flex-1 justify-center items-center bg-white">
          <Text>Loading pocket details...</Text>
        </Box>
      );
    }

    switch (activeTab) {
      case "balance":
        return <BalanceScreen data={pocketData} />;
      case "info":
        return <InfoScreen data={pocketData} />;
      case "history":
        return <HistoryScreen pocketId={id} />;
      default:
        return <Text>Select a tab</Text>;
    }
  };

  return (
    <>
      <Box className="flex-1 bg-white px-8">
        <PocketDashboardTopBar
          initialTab={activeTab}
          onTabChange={handleTabChangeFromTopBar}
        />
        <Box className="flex-1">{renderTabContent()}</Box>
      </Box>
    </>
  );
}
