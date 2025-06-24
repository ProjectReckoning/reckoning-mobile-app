import React from "react";
import { Dimensions } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ChevronRight } from "lucide-react-native";
import { usePocketStore } from "@/stores/pocketStore";
import AppText from "@/components/common/typography/AppText";
import TravelIconWithBar from "@/components/common/icons/TravelIconWithBar";
import { WondrColors } from "@/utils/colorUtils";
import { formatToLocalizedDate } from "@/utils/helperFunction";
import PocketCard from "@/components/common/cards/PocketCard";

export default function PocketDetail() {
  // Get data directly from the Zustand store
  const currentPocket = usePocketStore((state) => state.currentPocket);

  // Fallback while data is loading
  if (!currentPocket) {
    return null;
  }

  const { width: screenWidth } = Dimensions.get("window");
  const figmaBaseScreenWidth = 906;
  const figmaTotalComponentHeight = 159;
  const scaleFactor = screenWidth / figmaBaseScreenWidth;
  const maxHStackHeight = figmaTotalComponentHeight * scaleFactor;

  // Use a placeholder icon if the one from the API isn't mapped yet

  const creationDate = currentPocket.members.find(
    (m) => m.id === currentPocket.owner_user_id,
  )?.PocketMember.createdAt;
  const formattedDate = creationDate
    ? formatToLocalizedDate(creationDate)
    : "N/A";

  return (
    <Box className="mb-4">
      <AppText variant="pageTitle" className="mb-2">
        Pocket Detail
      </AppText>
      <HStack
        className="rounded-2xl justify-center items-center"
        style={{
          borderWidth: 0.5,
          borderColor: WondrColors["gray-wondr-border"],
          overflow: "hidden",
          maxHeight: maxHStackHeight,
        }}
      >
        <PocketCard
          mode="icon"
          color="bg-orange-wondr"
          icon="Airplane"
          iconSize="10"
          whiteSpace="mb-5"
          cardWidth="w-fit"
        />
        <VStack
          className="ml-4 justify-center flex-1"
          style={{
            paddingVertical: 8,
            paddingRight: 8,
          }}
        >
          <AppText variant="pageTitle">{currentPocket.name}</AppText>
          <AppText variant="bodyMuted" className="capitalize">
            {currentPocket.type} Pocket
          </AppText>
          <AppText variant="caption" truncate={true}>
            Pocket ini dibuat tanggal {formattedDate}
          </AppText>
        </VStack>
        <Box className="p-4">
          <ChevronRight color={WondrColors["dark-gray-wondr-deactive"]} />
        </Box>
      </HStack>
    </Box>
  );
}
