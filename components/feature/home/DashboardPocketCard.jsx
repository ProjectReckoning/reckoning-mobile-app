import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { ScrollView } from "react-native";
import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import PocketCard from "@/components/common/cards/PocketCard";

export default function DashboardPocketCard() {
  // Get all pockets and filter to personal
  const { allPockets, fetchAllPockets } = usePocketStore();

  useFocusEffect(
    useCallback(() => {
      fetchAllPockets();
    }, [fetchAllPockets]),
  );

  // Adjust filter for "personal" type (if your type is "Saving"/"Spending", adjust accordingly)
  const personalPockets = allPockets.filter(
    (pocket) =>
      pocket.type?.toLowerCase() === "personal" ||
      pocket.type === "Saving" ||
      pocket.type === "Spending",
  );

  // Handler for "Lihat semua"
  const goToAllPockets = () => {
    router.push("/pocket/all");
  };

  // Handler for "Buat Pocket"
  const goToCreatePocket = () => {
    router.push("/pocket/create");
  };

  return (
    <Box className="flex flex-col gap-1 mb-5">
      <Box className="flex flex-row mb-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Pocket kamu</Text>
        <Pressable onPress={goToAllPockets}>
          <Text className="text-sm text-orange-wondr font-bold">
            Lihat semua
          </Text>
        </Pressable>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 16,
          paddingBottom: 4,
        }}
        style={{ overflow: "hidden" }}
      >
        {personalPockets.slice(0, 5).map((pocket) => (
          <Pressable
            key={pocket.pocket_id || pocket.id}
            onPress={() =>
              router.push(`/pocket/${pocket.pocket_id || pocket.id}`)
            }
            className="w-[180px] h-fit min-h-60"
          >
            {({ pressed }) => (
              <Box
                className={`bg-white rounded-2xl items-center justify-end px-4 py-6 border-2 ${pressed ? "bg-gray-50 border-gray-300" : "border-transparent"}`}
              >
                <PocketCard
                  pocketName={pocket.name}
                  pocketType={pocket.type}
                  pocketBalance={Number(pocket.current_balance)}
                  color={pocket.color}
                  icon={pocket.icon_name}
                  cardWidth={`${pressed ? "w-full bg-gray-50" : "w-full"}`}
                />
              </Box>
            )}
          </Pressable>
        ))}
        {/* Buat Pocket Card */}
        <Pressable onPress={goToCreatePocket} style={{ width: 180 }}>
          {({ pressed }) => (
            <Box
              className={`h-fit min-h-60 bg-white border-2 border-dashed border-gray-300 rounded-2xl items-center justify-end px-4 py-6 ${pressed ? "bg-gray-50" : ""}`}
              style={{ width: 180 }}
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
      </ScrollView>
    </Box>
  );
}
