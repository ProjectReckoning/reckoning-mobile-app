import React from "react";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import {
  WondrColors,
  COLOR_PALETTE_LIGHT_TRANSLUCENT,
} from "@/utils/colorUtils";
import { Crown, EllipsisVertical } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";

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

// --- FIX: Add onManagePress prop to handle button clicks ---
export default function InfoMemberDetailCell({
  member,
  index = 0,
  onManagePress,
}) {
  if (!member || !member.PocketMember) {
    return null;
  }

  const memberName = member.name || "Unknown Member";
  const memberRoleRaw = member.PocketMember.role || "viewer";
  const isOwner = memberRoleRaw.toLowerCase() === "owner";
  const displayRole = isOwner ? "ADMIN" : memberRoleRaw.toUpperCase();
  const displayInitials = getConsistentInitials(memberName);
  const selectedColor =
    COLOR_PALETTE_LIGHT_TRANSLUCENT[
      index % COLOR_PALETTE_LIGHT_TRANSLUCENT.length
    ];
  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box
      className="flex-row rounded-2xl p-2 border-2 items-center"
      style={{ borderColor: WondrColors["light-gray-wondr"] }}
    >
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <AppText variant="cardTitle" style={{ color: avatarTextColor }}>
          {displayInitials}
        </AppText>
      </Avatar>

      <Box className="flex-1">
        <VStack>
          <Box className="flex-row justify-start items-center gap-1">
            <Box
              className="py-1 px-2 rounded-full"
              style={{ backgroundColor: selectedColor }}
            >
              <AppText variant="small">{displayRole}</AppText>
            </Box>
            {isOwner ? <Crown size={12} /> : null}
          </Box>
          <AppText variant="cardTitle" className="uppercase">
            {memberName}
          </AppText>
        </VStack>
      </Box>

      {/* --- FIX: Only show the button for non-owners and make it pressable --- */}
      {!isOwner ? (
        <Pressable
          className="justify-center items-center p-4 active:bg-gray-100 rounded-full"
          onPress={onManagePress}
        >
          <EllipsisVertical />
        </Pressable>
      ) : null}
    </Box>
  );
}
