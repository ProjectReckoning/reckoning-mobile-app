import React from "react";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Badge, BadgeText } from "@/components/ui/badge"; // Import Badge components
import { Crown, EllipsisVertical } from "lucide-react-native";
import AppText from "@/components/common/typography/AppText";
import { WondrColors } from "@/utils/colorUtils";

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

// Helper function to get badge color based on role and pocket type
const getBadgeColorForRole = (role, pocketType) => {
  const upperCaseRole = role.toUpperCase();

  if (upperCaseRole === "ADMIN") return "bg-tosca-wondr";

  if (pocketType === "business") {
    if (upperCaseRole === "MEMBER") return "bg-lime-wondr";
  } else {
    // for 'saving' and 'spending'
    if (upperCaseRole === "SPENDER") return "bg-purple-wondr";
    if (upperCaseRole === "VIEWER") return "bg-pink-wondr";
  }

  // Fallback default
  return "bg-lime-wondr";
};

export default function InfoMemberDetailCell({
  member,
  onManagePress,
  pocketType, // Add pocketType to props
}) {
  if (!member || !member.PocketMember) {
    return null;
  }

  const memberName = member.name || "Unknown Member";
  const memberRoleRaw = member.PocketMember.role || "viewer";
  const isOwner = memberRoleRaw.toLowerCase() === "owner";
  const displayRole = isOwner ? "ADMIN" : memberRoleRaw.toUpperCase();
  const displayInitials = getConsistentInitials(memberName);
  const avatarBgColor = WondrColors["translucent-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  // Get badge color class using the helper function
  const badgeColorClass = getBadgeColorForRole(displayRole, pocketType);

  return (
    <Box
      className="flex-row rounded-2xl p-4 border items-center"
      style={{ borderColor: WondrColors["gray-wondr-border"] }} // Example color
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
            {/* --- FIX: Use Badge component for role display --- */}
            <Badge
              size="sm"
              variant="solid"
              className={`${badgeColorClass} rounded-full`}
            >
              <BadgeText className="font-bold text-black">
                {displayRole}
              </BadgeText>
            </Badge>
            {isOwner ? <Crown size={12} color="black" /> : null}
          </Box>
          <AppText variant="cardTitle" className="uppercase">
            {memberName}
          </AppText>
        </VStack>
      </Box>

      {!isOwner ? (
        <Pressable
          className="justify-center items-center active:bg-gray-100 rounded-full"
          onPress={onManagePress}
        >
          <EllipsisVertical />
        </Pressable>
      ) : null}
    </Box>
  );
}
