import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";

import { useCallback } from "react";
import { Animated } from "react-native";
import { CirclePlus } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { SkeletonBox } from "@/components/common/SkeletonBox";
import PocketCard from "@/components/common/cards/PocketCard";

export default function DashboardPocketCard() {
  const { allPockets, fetchAllPockets, isAllPocketsLoading } = usePocketStore();

  useFocusEffect(
    useCallback(() => {
      fetchAllPockets();
    }, [fetchAllPockets]),
  );

  const personalPockets = allPockets
    .filter(
      (pocket) =>
        pocket.type?.toLowerCase() === "personal" ||
        pocket.type === "Saving" ||
        pocket.type === "Spending",
    )
    .slice(0, 5);

  const handleCardPress = (pocketId) => {
    router.push(`/(main)/pocket/${pocketId}`);
  };

  const goToAllPockets = () => {
    router.push("/pocket/all");
  };

  const GoToCreatePocket = () => {
    router.push("/pocket/create");
  };

  if (isAllPocketsLoading) {
    return (
      <Box className="flex flex-row gap-2 my-5">
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i} className="w-48 h-56 rounded-2xl" />
        ))}
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-1 mb-5">
      <Box className="flex flex-row mb-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Pocket kamu</Text>
        <Pressable onPress={goToAllPockets}>
          <Text className="text-sm text-orange-wondr font-bold underline">
            Lihat semua
          </Text>
        </Pressable>
      </Box>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 50 }}
        className="w-screen"
        pagingEnabled
        snapToInterval={288 + 8}
        decelerationRate="fast"
        scrollEventThrottle={16}
      >
        <HStack space="lg" className="flex-wrap justify-between">
          {personalPockets.map((pocket) => (
            <Pressable
              key={pocket.pocket_id}
              onPress={() => handleCardPress(pocket.pocket_id)}
            >
              {({ pressed }) => (
                <PocketCard
                  pocketName={pocket.name}
                  pocketType={pocket.type}
                  pocketBalance={Number(pocket.current_balance)}
                  color={pocket.color}
                  icon={pocket.icon_name}
                  whiteSpace="mb-8"
                  space="my-4"
                  iconSize={12}
                  cardWidth={`w-48 h-56 ${pressed ? "bg-gray-50" : ""}`}
                />
              )}
            </Pressable>
          ))}
          <Pressable onPress={GoToCreatePocket} className="w-48 mb-8">
            {({ pressed }) => (
              <Box
                className={`h-56 bg-white border-2 border-dashed border-gray-300 rounded-2xl items-center justify-end px-4 py-2 ${pressed ? "bg-gray-50" : ""}`}
              >
                <CirclePlus
                  color={WondrColors["tosca-wondr"]}
                  size={40}
                  strokeWidth={2}
                />
                <VStack size="xs" className="justify-center items-start my-3">
                  <Text className="font-extrabold text-lg mt-4 text-typography-950 text-center">
                    Buat pocket
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Buat tujuan unikmu sendiri dan wujudkan bersama!
                  </Text>
                </VStack>
              </Box>
            )}
          </Pressable>
        </HStack>
      </Animated.ScrollView>
    </Box>
  );
}
