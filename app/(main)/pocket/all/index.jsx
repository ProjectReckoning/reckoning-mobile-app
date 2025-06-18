import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import AppBar from "../../../../components/common/AppBar";
import TabBar from "../../../../components/common/TabBar";
import { allPocket } from "../../../../utils/mockData/mockPocketDb";

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
    <Box className="flex-1 bg-white">
      <Box className="w-full flex-1 flex-col px-6 pt-5">
        <AppBar title="Pocket" />

        <TabBar
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>
    </Box>
  );
}
