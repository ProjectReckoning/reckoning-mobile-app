import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import PocketDetail from "@/components/feature/pocketDashboard/common/information/PocketDetail";
import OwnerDetail from "@/components/feature/pocketDashboard/common/information/OwnerDetail";
import MemberDetail from "@/components/feature/pocketDashboard/common/information/MemberDetail";
import MemberDetailList from "@/components/feature/pocketDashboard/common/information/MemberDetailList";
import { ScrollView } from "react-native";

/**
 * Renders the 'Info' tab, displaying details about the pocket,
 * its owner, and a scrollable list of members.
 */
export default function BusinessInfoScreen() {
  const currentPocket = usePocketStore((state) => state.currentPocket);

  if (!currentPocket) {
    return null;
  }

  return (
    <Box className="flex-1 bg-white">
      {/* --- Static Header Content --- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <PocketDetail />
        <OwnerDetail />
        <MemberDetail />

        {/* --- Scrollable List Section --- */}
        <Box className="flex-1">
          <MemberDetailList />
        </Box>
      </ScrollView>
    </Box>
  );
}
