import React from "react";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import AppText from "@/components/common/typography/AppText";
import PocketDetail from "./information/PocketDetail";
import OwnerDetail from "./information/OwnerDetail";
import MemberDetail from "./information/MemberDetail";
import MemberDetailList from "./information/MemberDetailList";

/**
 * Renders the 'Info' tab, displaying details about the pocket,
 * its owner, and a scrollable list of members.
 */
export default function InfoScreen() {
  const currentPocket = usePocketStore((state) => state.currentPocket);

  if (!currentPocket) {
    return null;
  }

  return (
    <Box className="flex-1 bg-white">
      {/* --- Static Header Content --- */}
      <PocketDetail />
      <OwnerDetail />
      <MemberDetail />

      {/* --- Scrollable List Section --- */}
      <Box className="flex-1 mt-4">
        <AppText variant="pageTitle" className="mb-4">
          Member List
        </AppText>
        <MemberDetailList />
      </Box>
    </Box>
  );
}
