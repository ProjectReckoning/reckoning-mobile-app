import React, { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { MEMBER_MOCK_DATA } from "@/utils/pocketMemberMockData";

import PocketDetail from "@/components/feature/pocketDashboard/information/PocketDetail";
import OwnerDetail from "@/components/feature/pocketDashboard/information/OwnerDetail";
import MemberDetail from "@/components/feature/pocketDashboard/information/MemberDetail";
import MemberDetailList from "./information/MemberDetailList";

export default function InfoScreen({ data }) {
  const [ownerData, setOwnerData] = useState(null);
  const [memberData, setMemberData] = useState(null);

  const getOwner = (memberData) => {
    // Make sure memberData and memberData.members exist before proceeding
    if (!memberData || !memberData.members) {
      console.error("Invalid memberData provided to getOwner.");
      return;
    }

    const ownerUserId = memberData.owner_user_id;

    const ownerMember = memberData.members.find(
      (member) => member.id === ownerUserId,
    );

    if (!ownerMember) {
      console.error(
        "Owner not found in members list for owner_user_id:",
        ownerUserId,
      );
      setOwnerData(null); // Explicitly set to null if not found
    } else {
      setOwnerData(ownerMember);
      // Log ownerMember here, not ownerData
      console.log("Owner data found and set:", ownerMember);
    }
  };

  useEffect(() => {
    // Ensure 'data' is not null or undefined before attempting to process it
    if (data) {
      getOwner(data);
      setMemberData(data.members);
    }
  }, [data]); // Depend on 'data' so it re-runs when 'data' changes

  // Optional: Use another useEffect to log ownerData *after* it has truly updated
  useEffect(() => {
    if (ownerData) {
      console.log("ownerData state updated:", ownerData);
    }
  }, [ownerData]); // This useEffect will run whenever ownerData changes

  return (
    <>
      <Box className="flex-1">
        <PocketDetail />
        {/* Pass ownerData to OwnerDetail component */}
        <OwnerDetail data={ownerData} />
        <MemberDetail />
        <MemberDetailList data={memberData} />
      </Box>
    </>
  );
}
