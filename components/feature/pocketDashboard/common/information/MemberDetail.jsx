import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import AppText from "@/components/common/typography/AppText";
// --- FIX: Import the necessary hook from expo-router ---
import { router, useLocalSearchParams } from "expo-router";

export default function MemberDetail() {
  // --- FIX: Get the current pocket's ID from the URL ---
  const { id: pocketId } = useLocalSearchParams();

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
    <Box className="mb-4">
      <AppText variant="pageTitle" className="mb-2">
        Member Detail
      </AppText>
      <Pressable
        onPress={handleInvitePress}
        className="flex flex-row gap-5 items-center mb-6 active:bg-gray-100 rounded-xl"
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
    </Box>
  );
}
