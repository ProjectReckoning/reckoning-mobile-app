import React, { useMemo } from "react";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";
import AppText from "@/components/common/typography/AppText";

export default function OwnerDetail() {
  // Get the pocket data from the store
  const currentPocket = usePocketStore((state) => state.currentPocket);

  // Use useMemo to find the owner. It will only re-calculate if currentPocket changes.
  const ownerData = useMemo(() => {
    if (!currentPocket || !currentPocket.members) {
      return null;
    }
    return currentPocket.members.find(
      (member) => member.id === currentPocket.owner_user_id,
    );
  }, [currentPocket]);

  // Don't render if there's no owner data yet
  if (!ownerData) {
    return null;
  }

  return (
    <Box className="mb-4">
      <AppText variant="title" className="mb-4">
        Owner
      </AppText>
      <InfoMemberDetailCell member={ownerData} />
    </Box>
  );
}
