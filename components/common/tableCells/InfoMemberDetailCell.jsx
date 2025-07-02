import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

import { Crown, EllipsisVertical } from "lucide-react-native";

import { WondrColors } from "@/utils/colorUtils";
import BadgeRole from "@/components/common/BadgeRole";
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

export default function InfoMemberDetailCell({
  member,
  onManagePress,
  pocketType,
  isOwnerAdmin = false,
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

  return (
    <Box
      className="flex-row rounded-2xl p-4 border items-center"
      style={{ borderColor: WondrColors["gray-wondr-border"] }}
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
            {/* --- (Step 4) Gunakan komponen BadgeRole yang baru --- */}
            <BadgeRole role={displayRole} pocketType={pocketType} />
            {isOwner ? <Crown size={12} color="black" /> : null}
          </Box>
          <AppText variant="cardTitle" className="uppercase">
            {memberName}
          </AppText>
        </VStack>
      </Box>

      {isOwnerAdmin && (
        <Pressable
          className="justify-center items-center"
          onPress={onManagePress}
        >
          <EllipsisVertical color="gray" />
        </Pressable>
      )}
    </Box>
  );
}
