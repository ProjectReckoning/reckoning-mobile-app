import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { MEMBER_MOCK_DATA } from "@/utils/pocketMemberMockData";

import PocketDetail from "@/components/feature/pocketDashboard/information/PocketDetail";
import OwnerDetail from "@/components/feature/pocketDashboard/information/OwnerDetail";
import MemberDetail from "@/components/feature/pocketDashboard/information/MemberDetail";
import MemberDetailList from "./information/MemberDetailList";

export default function InfoScreen({ pocketId }) {
  return (
    <>
      <Box className="flex-1">
        <PocketDetail />
        <OwnerDetail />
        <MemberDetail />
        <MemberDetailList data={MEMBER_MOCK_DATA} />
      </Box>
    </>
  );
}
