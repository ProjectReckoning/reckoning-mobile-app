import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState, useEffect } from "react";
import { Search } from "lucide-react-native";
import TabBar from "@/components/common/TabBar";
import { usePocketStore } from "@/stores/pocketStore";
import FriendList from "@/components/common/FriendList";
import AppBar from "../../../../../components/common/AppBar";
import { WondrColors } from "../../../../../utils/colorUtils";
import { useTransactionStore } from "@/stores/transactionStore";
import { transferFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";

const tabList = [
  { key: "tersimpan", label: "Tersimpan" },
  { key: "terakhir", label: "Terakhir" },
];

export default function Transfer() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketId = "0238928039";

  const [activeTab, setActiveTab] = useState("tersimpan");
  const { selectedFriends, setSelectedFriends } = usePocketStore();
  const { type, setType, setSource, setDestination } = useTransactionStore();

  useEffect(() => {
    setSource({
      id: pocketId,
      name: pocketName,
      balance: 19546250,
      category: {
        pocket: {
          name: pocketName,
          type: "SHARED POCKET BNI",
        },
      },
    });
  }, []);

  useEffect(() => {
    setType({ id: "transfer", name: "Transfer" });
  }, [setType]);

  return (
    <Box className="flex-1 bg-white">
      <Box className="w-full h-72 bg-light-gray-wondr absolute top-0 left-0"></Box>
      <Box className="flex-1 px-6 pt-5">
        <AppBar transaction={type.id} />

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
            className="w-full h-14 bg-white p-3 items-center justify-start border border-dark-gray-wondr-deactive rounded-lg active:bg-gray-50"
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
          setDestination={setDestination}
        />
      </Box>
    </Box>
  );
}
