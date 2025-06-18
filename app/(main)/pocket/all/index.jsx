import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { ScrollView } from "react-native";

import TabBar from "@/components/common/TabBar";
import AppBar from "../../../../components/common/AppBar";
import { allPocket } from "@/utils/mockData/mockPocketDb";
import PocketCard from "@/components/common/cards/PocketCard";

const tabList = [
  { key: "personal", label: "Personal" },
  { key: "business", label: "Business" },
];

export default function AllPocket() {
  const [activeTab, setActiveTab] = useState("personal");

  const filteredPockets = allPocket.filter(
    (pocket) =>
      (activeTab === "personal" && pocket.subject === "Personal") ||
      (activeTab === "business" && pocket.subject === "Business"),
  );

  return (
    <Box className="w-full flex-1 flex-col px-6 pt-5 bg-white">
      <AppBar title="Pocket" />

      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
      />

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingRight: 10 }}
        style={{ marginRight: -10 }}
      >
        <Box className="flex flex-row flex-wrap justify-between">
          {filteredPockets.length === 0 ? (
            <Box className="w-full items-center mt-10">
              <Text className="text-gray-400">Belum ada pocket.</Text>
            </Box>
          ) : (
            filteredPockets.map((pocket) => (
              <Pressable key={pocket.id} className="w-[48%] mb-8">
                {({ pressed }) => (
                  <PocketCard
                    pocketName={pocket.name}
                    pocketType={pocket.type}
                    pocketBalance={10000}
                    solidColor={pocket.color}
                    translucentColor={`${pocket.color}-light-translucent`}
                    icon={pocket.icon}
                    space="mt-5 mb-1"
                    cardWidth={`${pressed ? "bg-gray-50" : ""}`}
                  />
                )}
              </Pressable>
            ))
            // Create Pocket card
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
