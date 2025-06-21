import { Box } from "@/components/ui/box";
import { Searchbar } from "react-native-paper";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { useState } from "react";
import TabBar from "@/components/common/TabBar";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import FriendList from "@/components/common/FriendList";
import AppBar from "../../../../../components/common/AppBar";
import { transferFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";

const tabList = [
  { key: "tersimpan", label: "Tersimpan" },
  { key: "terakhir", label: "Terakhir" },
];

export default function Transfer() {
  const [searchQuery, setSearchQuery] = useState("");
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

      <Searchbar
        mode="bar"
        placeholder="Mau transfer ke siapa hari ini?"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: WondrColors["dark-gray-wondr-deactive"],
          padding: 2,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 0,
        }}
        inputStyle={{
          color: WondrColors["gray-wondr-border"],
          fontSize: 16,
          fontFamily: "Poppins",
          textAlignVertical: "center",
          textAlign: "left",
          paddingVertical: 0,
        }}
        placeholderTextColor={WondrColors["gray-wondr-border"]}
        iconColor={WondrColors["dark-gray-wondr-deactive"]}
      />

      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
      />

      <Heading className="mb-3">6/200 Penerima</Heading>
      <FriendList
        selectedFriends={selectedFriends}
        setSelectedFriends={setSelectedFriends}
      />
    </Box>
  );
}
