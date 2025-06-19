import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { CirclePlus } from "lucide-react-native";

import TabBar from "@/components/common/TabBar";
import AppBar from "../../../../components/common/AppBar";
import { allPocket as mockAllPocket } from "@/utils/mockData/mockPocketDb";
import { WondrColors } from "../../../../utils/colorUtils";
import PocketCard from "@/components/common/cards/PocketCard";
import PocketActionSheet from "../../../../components/feature/allPocket/PocketActionSheet";
import DeletePocketAlert from "../../../../components/feature/allPocket/DeletePocketAlert";

const tabList = [
  { key: "personal", label: "Personal" },
  { key: "business", label: "Business" },
];

export default function AllPocket() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [pockets, setPockets] = useState(mockAllPocket);

  const filteredPockets = pockets.filter(
    (pocket) =>
      (activeTab === "personal" && pocket.subject === "Personal") ||
      (activeTab === "business" && pocket.subject === "Business"),
  );

  const handleEditButton = (pocket) => {
    setSelectedPocket(pocket);
    setShowActionsheet(true);
  };

  const handleEdit = () => {
    router.push({
      pathname: "/(main)/pocket/create/Customization",
      params: { pocketId: selectedPocket.id },
    });
  };

  const handleDelete = () => {
    setPockets((prevPockets) =>
      prevPockets.filter((pocket) => pocket.id !== selectedPocket.id),
    );
    setShowDeleteAlert(false);
    setSelectedPocket(null);
  };

  const GoToHome = () => {
    router.replace("/(main)/home");
  };

  const GoToCreatePocket = () => {
    router.push("/(main)/pocket/create");
  };

  return (
    <Box className="w-full flex-1 flex-col px-6 pt-5 bg-white">
      <AppBar title="Pocket" onBack={GoToHome} />

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
        <Box className="flex flex-row flex-wrap justify-between px-2">
          {filteredPockets.length === 0 ? (
            <Box className="w-full items-center mt-10">
              <Text className="text-gray-400">Belum ada pocket.</Text>
            </Box>
          ) : (
            <>
              {filteredPockets.map((pocket) => (
                <Pressable key={pocket.id} className="w-[47%] mb-8">
                  {({ pressed }) => (
                    <PocketCard
                      pocketName={pocket.name}
                      pocketType={pocket.type}
                      pocketBalance={1000000}
                      color={pocket.color}
                      icon={pocket.icon}
                      space="mt-5 mb-1"
                      cardWidth={`${pressed ? "bg-gray-50" : ""}`}
                      editButton={true}
                      onEdit={() => handleEditButton(pocket)}
                    />
                  )}
                </Pressable>
              ))}

              {/* Create Pocket Card */}
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
                    <VStack
                      size="xs"
                      className="justify-center items-start my-3"
                    >
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
            </>
          )}
        </Box>
      </ScrollView>

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
        color={selectedPocket?.color}
        icon={selectedPocket?.icon}
      />
      <DeletePocketAlert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={handleDelete}
        pocketName={selectedPocket?.name}
        pocketType={selectedPocket?.type}
        color={selectedPocket?.color}
        icon={selectedPocket?.icon}
      />
    </Box>
  );
}
