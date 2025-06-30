import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { Search } from "lucide-react-native";
import { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams, useFocusEffect } from "expo-router";

import TabBar from "@/components/common/TabBar";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import FriendList from "@/components/common/FriendList";
import { useTransactionStore } from "@/stores/transactionStore";
import { transferFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";

const tabList = [
  { key: "tersimpan", label: "Tersimpan" },
  { key: "terakhir", label: "Terakhir" },
];

export default function Transfer() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("tersimpan");

  const {
    selectedFriends,
    setSelectedFriends,
    setPocketType,
    currentPocket,
    fetchPocketById,
  } = usePocketStore();
  const { setType, setSource, setDestination, resetTransactionState } =
    useTransactionStore();

  // --- NEW: Reset the transaction state every time this screen is focused ---
  useFocusEffect(
    useCallback(() => {
      // 1. Reset the state to prevent data pollution
      resetTransactionState();
      // 2. Set the type for this specific flow
      setType({ id: "transfer", name: "Transfer" });
      // 3. Fetch the required pocket data
      if (id) {
        fetchPocketById(id);
      }
    }, [id]),
  );

  useFocusEffect(
    useCallback(() => {
      setType({ id: "transfer", name: "Transfer" });
    }, []),
  );

  useEffect(() => {
    if (currentPocket) {
      setSource({
        id: currentPocket.account_number,
        name: currentPocket.name,
        balance: currentPocket.current_balance,
        category: {
          pocket: {
            name: currentPocket.name,
            type: "SHARED POCKET BNI",
          },
        },
      });
      setPocketType(currentPocket.type);
    }
  }, [currentPocket]);

  if (!currentPocket) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-white">
      <Box className="w-full h-56 bg-light-gray-wondr absolute top-0 left-0"></Box>
      <Box className="flex-1 px-6">
        <Box className="items-center z-10">
          <HStack
            space="lg"
            className="items-start justify-center mt-4 mb-7 px-2 py-5 bg-white border border-gray-wondr-border rounded-2xl"
          >
            {transferFeatures.map((feature, i) => (
              <Box key={i} className="w-1/4 items-center">
                <FeatureButton {...feature} />
              </Box>
            ))}
          </HStack>
          <Box className="w-3/4 h-32 bg-gray-wondr-border rounded-2xl absolute bottom-5 -z-10"></Box>
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
