// app/(main)/pocket/all/index.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { ActivityIndicator, ScrollView } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import React, { useState, useCallback, useMemo, useEffect } from "react";

import { usePocketStore } from "@/stores/pocketStore";
import { WondrColors } from "@/utils/colorUtils";
import TabBar from "@/components/common/TabBar";
import PocketCard from "@/components/common/cards/PocketCard";
import EmptyPocket from "@/components/feature/allPocket/EmptyPocket";
import PocketActionSheet from "@/components/feature/allPocket/PocketActionSheet";
import DeletePocketAlert from "@/components/feature/allPocket/DeletePocketAlert";

const tabList = [
  { key: "personal", label: "Personal" },
  { key: "business", label: "Business" },
];

export default function AllPocket() {
  const { newPocketId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("personal");
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const {
    allPockets,
    isAllPocketsLoading,
    fetchAllPockets,
    removePocketFromList,
  } = usePocketStore();

  // This useEffect handles the navigation after a pocket is created
  useEffect(() => {
    if (newPocketId) {
      // It means a pocket was just created. We then push the new dashboard
      // onto the stack. The history is now clean (`Home` -> `All Pockets` -> `Dashboard`).
      router.push(`/(main)/pocket/${newPocketId}`);
    }
  }, [newPocketId]); // This effect runs only when newPocketId changes

  useFocusEffect(
    useCallback(() => {
      fetchAllPockets();
    }, []),
  );

  const filteredPockets = useMemo(() => {
    // This logic might need adjustment based on your pocket data structure
    return allPockets.filter((pocket) => activeTab === "personal");
  }, [allPockets, activeTab]);

  const handleEditButton = (pocket) => {
    setSelectedPocket(pocket);
    setShowActionsheet(true);
  };
  const handleEdit = () => {
    router.push({
      pathname: "/(main)/pocket/create/Customization",
      params: { pocketId: selectedPocket.pocket_id },
    });
  };
  const handleDelete = () => {
    removePocketFromList(selectedPocket.pocket_id);
    setShowDeleteAlert(false);
    setSelectedPocket(null);
  };
  const handleCardPress = (pocketId) => {
    router.push(`/(main)/pocket/${pocketId}`);
  };
  const GoToCreatePocket = () => router.push("/(main)/pocket/create");

  const renderContent = () => {
    if (isAllPocketsLoading) {
      return (
        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
        </Box>
      );
    }

    if (filteredPockets.length === 0) {
      // Reverted to match working version
      return <EmptyPocket createAction={GoToCreatePocket} />;
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingRight: 10, flexGrow: 1 }}
        style={{ marginRight: -10 }}
      >
        <Box className="flex-row flex-wrap justify-between px-2">
          {filteredPockets.map((pocket) => (
            <Pressable
              // FIX: The key should consistently be pocket_id as per the working version
              key={pocket.pocket_id}
              className="w-[47%] mb-8"
              // FIX: Use the consistent pocket_id for navigation
              onPress={() => handleCardPress(pocket.pocket_id)}
            >
              {({ pressed }) => (
                <PocketCard
                  pocketName={pocket.name}
                  pocketType={pocket.type}
                  pocketBalance={Number(pocket.current_balance)}
                  // FIX: Reverted to a working Tailwind class. The PocketCard component
                  // likely expects a class name, not a hex code.
                  color={"bg-orange-wondr"}
                  icon={pocket.icon_name}
                  space="mt-5 mb-1"
                  cardWidth={`${pressed ? "bg-gray-50" : ""}`}
                  editButton={true}
                  onEdit={() => handleEditButton(pocket)}
                />
              )}
            </Pressable>
          ))}
          <Pressable onPress={GoToCreatePocket} className="w-[47%] mb-8">
            {({ pressed }) => (
              <Box
                className={`h-fit min-h-60 bg-white border-2 border-dashed border-gray-300 rounded-2xl items-center justify-end px-4 py-6 ${pressed ? "bg-gray-50" : ""}`}
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
        </Box>
      </ScrollView>
    );
  };

  return (
    <Box className="w-full flex-1 flex-col px-6 pt-5 bg-white">
      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
      />
      {renderContent()}
      <PocketActionSheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
        onEdit={handleEdit}
        onDelete={() => {
          setShowActionsheet(false);
          setShowDeleteAlert(true);
        }}
        pocketName={selectedPocket?.name}
        pocketType={selectedPocket?.type}
        color={selectedPocket?.color_hex}
        icon={selectedPocket?.icon_name}
      />
      <DeletePocketAlert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={handleDelete}
        pocketName={selectedPocket?.name}
        pocketType={selectedPocket?.type}
        color={selectedPocket?.color_hex}
        icon={selectedPocket?.icon_name}
      />
    </Box>
  );
}
