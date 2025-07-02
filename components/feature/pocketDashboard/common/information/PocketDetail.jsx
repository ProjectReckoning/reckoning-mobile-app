import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

import { Dimensions } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import AppText from "@/components/common/typography/AppText";
import PocketCard from "@/components/common/cards/PocketCard";
import { formatToLocalizedDate } from "@/utils/helperFunction";

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

  const isOwnerAdmin =
    currentPocket?.user_role === "admin" ||
    currentPocket?.user_role === "owner";

  return (
    <Box>
      <AppText variant="title">Pocket Detail</AppText>
      <Pressable
        disabled={!isOwnerAdmin}
        className="w-full active:bg-slate-50 data-[disabled=true]:opacity-100 data-[disabled=true]:bg-transparent"
      >
        <HStack
          className="rounded-2xl justify-center items-center"
          style={{
            borderColor: WondrColors["gray-wondr-border"],
            overflow: "hidden",
          }}
        >
          <PocketCard
            mode="icon"
            color={currentPocket.color}
            icon={currentPocket.icon_name}
            iconSize="10"
            whiteSpace="mb-5"
            cardWidth="w-fit"
          />
          <VStack
            className="ml-4 flex-1"
            style={{
              paddingRight: 8,
              paddingVertical: 20,
            }}
          >
            <AppText variant="title">{currentPocket.name}</AppText>
            <AppText variant="bodyMuted" className="capitalize">
              {currentPocket.type} Pocket
            </AppText>
            <AppText variant="caption" truncate={true}>
              Pocket ini dibuat tanggal {formattedDate}
            </AppText>
          </VStack>
          {isOwnerAdmin && (
            <Box className="p-4">
              <ChevronRight color={WondrColors["dark-gray-wondr-deactive"]} />
            </Box>
          )}
        </HStack>
      </Pressable>
    </Box>
  );
}
