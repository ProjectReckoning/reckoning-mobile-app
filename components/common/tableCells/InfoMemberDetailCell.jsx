import React from "react"; // No need for useEffect, useState if data is directly from props
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import {
  WondrColors,
  COLOR_PALETTE_LIGHT_TRANSLUCENT,
} from "@/utils/colorUtils";
import { Crown, EllipsisVertical } from "lucide-react-native";

const getConsistentInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ").filter(Boolean);

  if (words.length > 1) {
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return "";
};

export default function InfoMemberDetailCell({
  member, // Renamed 'data' prop to 'member' for clarity
  index = 0, // Changed default index to 0 for better array access
}) {
  // Defensive checks for member and PocketMember
  if (!member || !member.PocketMember) {
    console.warn("InfoMemberDetailCell received invalid member data:", member);
    return null; // Render nothing or a placeholder if data is invalid
  }

  const memberName = member.name || "Unknown Member";
  const memberRoleRaw = member.PocketMember.role || "viewer"; // Default to 'viewer' if role is missing

  // Determine if this member is the owner and what role to display
  const isOwnerCreator = memberRoleRaw.toLowerCase() === "owner";
  const displayRole = isOwnerCreator ? "ADMIN" : memberRoleRaw.toUpperCase();

  const displayInitials = getConsistentInitials(memberName);
  const selectedColor =
    COLOR_PALETTE_LIGHT_TRANSLUCENT[
      index % COLOR_PALETTE_LIGHT_TRANSLUCENT.length
    ];

  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box
      className="flex-row rounded-2xl p-2 border border-2 items-center"
      style={{ borderColor: WondrColors["light-gray-wondr"] }}
    >
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <Text
          style={{
            color: avatarTextColor,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {displayInitials}
        </Text>
      </Avatar>

      <Box className="flex-1">
        <VStack>
          <Box className="flex-row justify-start items-center gap-1">
            <Box
              className="p-1 rounded-full"
              style={{ backgroundColor: selectedColor }}
            >
              <Text className="text-xs">{displayRole}</Text>
            </Box>
            {/* Display crown if this member is the owner/creator */}
            {isOwnerCreator ? <Crown size={12} /> : null}
          </Box>
          <Text className="text-lg font-extrabold">
            {memberName.toUpperCase()}
          </Text>
        </VStack>
      </Box>

      {/* Conditionally render EllipsisVertical */}
      {/* Show ellipsis for non-owner members */}
      {!isOwnerCreator ? (
        <Box className="justify-center items-center p-4">
          <EllipsisVertical />
        </Box>
      ) : null}
    </Box>
  );
}
