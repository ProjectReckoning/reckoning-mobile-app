import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { Search } from "lucide-react-native";
import TabBar from "@/components/common/TabBar";
import { usePocketStore } from "@/stores/pocketStore";
import FriendList from "@/components/common/FriendList";
import AppBar from "../../../../../components/common/AppBar";
import { WondrColors } from "../../../../../utils/colorUtils";
import { transferFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";

const tabList = [
  { key: "tersimpan", label: "Tersimpan" },
  { key: "terakhir", label: "Terakhir" },
];

export default function Transfer() {
  const [activeTab, setActiveTab] = useState("tersimpan");
  const { selectedFriends, setSelectedFriends } = usePocketStore();

  return (
    <Box className="flex-1 bg-white px-8 pt-5">
      <AppBar title="Transfer" />

      <Box className="items-center z-10">
        <HStack
          space="lg"
          className="items-start justify-center my-7 px-2 py-5 bg-white border border-gray-wondr-border rounded-2xl"
        >
          {transferFeatures.map((feature, i) => (
            <Box key={i} className="w-1/4 items-center">
              <FeatureButton {...feature} />
            </Box>
          ))}
        </HStack>
        <Box className="w-80 h-32 bg-gray-wondr-border rounded-2xl absolute bottom-5 -z-10"></Box>
      </Box>

      <Pressable>
        <HStack
          space="lg"
          className="w-full h-14 p-3 items-center justify-start border border-dark-gray-wondr-deactive rounded-lg active:bg-gray-50"
        >
          <Search size={21} color={WondrColors["dark-gray-wondr-deactive"]} />
          <Text size="lg" className="font-light">
            Mau transfer ke siapa hari ini?
          </Text>
        </HStack>
      </Pressable>

      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
        marginVertical={21}
      />

      <Heading size="md" className="mb-5">
        6/200 Penerima
      </Heading>
      <FriendList
        mode="button"
        selectedFriends={selectedFriends}
        setSelectedFriends={setSelectedFriends}
      />
    </Box>
  );
}
