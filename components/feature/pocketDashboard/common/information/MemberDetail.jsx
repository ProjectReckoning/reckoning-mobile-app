import { Box } from "@/components/ui/box";

import { CirclePlus } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { Pressable } from "@/components/ui/pressable";
import AppText from "@/components/common/typography/AppText";

export default function MemberDetail() {
  // --- FIX: Get the current pocket's ID from the URL ---
  const { id: pocketId } = useLocalSearchParams();
  const currentPocket = usePocketStore((state) => state.currentPocket);
  const isOwnerAdmin =
    currentPocket?.user_role === "owner" ||
    currentPocket?.user_role === "admin";

  const handleInvitePress = () => {
    // --- FIX: Pass the pocketId as a parameter when navigating ---
    // This tells the next screen that it is in "invite" mode.
    if (pocketId) {
      router.push({
        pathname: "/pocket/create/SelectFriend",
        params: { id: pocketId },
      });
    } else {
      console.error(
        "MemberDetail: pocketId is missing, cannot navigate to invite screen.",
      );
    }
  };

  return (
    <Box>
      <AppText variant="title" className="mb-4">
        Member Detail
      </AppText>
      {isOwnerAdmin && (
        <Pressable
          onPress={handleInvitePress}
          className="flex flex-row gap-5 items-center active:bg-gray-100 rounded-xl mb-5"
        >
          <Box className="flex-row gap-2 items-center">
            <Box className="rounded-xl border-2 border-light-gray-wondr w-16 h-16 justify-center items-center">
              <CirclePlus color={WondrColors["tosca-wondr"]} size={32} />
            </Box>
            <Box className="items-start justify-center flex-1">
              <AppText variant="cardTitle">Teman baru</AppText>
              <AppText variant="body">
                Kamu bisa tambah teman baru ke dalam pocket.
              </AppText>
            </Box>
          </Box>
        </Pressable>
      )}
    </Box>
  );
}
