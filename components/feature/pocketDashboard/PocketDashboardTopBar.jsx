import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

export default function PocketDashboardTopBar({
  initialTab = "balance",
  onTabChange,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };

  return (
    <>
      <Box className="flex-row items-center justify-between bg-[#F9F9F9] rounded-full mb-4">
        <Pressable onPress={() => handleTabPress("balance")} className="flex-1">
          <Box
            className={`py-3 px-8 rounded-full ${
              activeTab === "balance" ? "bg-lime-wondr" : "bg-[#F9F9F9]"
            }`}
          >
            <Text
              className={`text-center ${activeTab === "balance" ? "font-extrabold" : "font-normal"}`}
            >
              Balance
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => handleTabPress("info")} className="flex-1">
          <Box
            className={`py-3 px-8 rounded-full ${
              activeTab === "info" ? "bg-lime-wondr" : "bg-[#F9F9F9]"
            }`}
          >
            <Text
              className={`text-center ${activeTab === "info" ? "font-extrabold" : "font-normal"}`}
            >
              Info
            </Text>
          </Box>
        </Pressable>

        <Pressable onPress={() => handleTabPress("history")} className="flex-1">
          <Box
            className={`py-3 px-8 rounded-full ${
              activeTab === "history" ? "bg-lime-wondr" : "bg-[#F9F9F9]"
            }`}
          >
            <Text
              className={`text-center ${activeTab === "history" ? "font-extrabold" : "font-normal"}`}
            >
              History
            </Text>
          </Box>
        </Pressable>
      </Box>
    </>
  );
}
