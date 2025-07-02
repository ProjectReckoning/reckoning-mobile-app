// components/feature/pocketDashboard/common/balance/BalanceMemberList.jsx
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { usePocketStore } from "@/stores/pocketStore";
import BalanceMemberListCell from "@/components/common/tableCells/BalanceMemberListCell";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/helperFunction";
import { Crown } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import AppText from "@/components/common/typography/AppText";

// Using the same consistent initials logic
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

// --- Helper Component for Spending & Business Pockets ---
const MemberInfoCard = ({ name, role, contributionAmount, pocketType }) => {
  const isOwner = role.toLowerCase() === "owner";
  const displayRoleKey = isOwner ? "admin" : role;

  const roleStyles = {
    admin: { text: "ADMIN", className: "bg-tosca-wondr" },
    member: { text: "MEMBER", className: "bg-lime-wondr" },
    spender: { text: "SPENDER", className: "bg-purple-wondr" },
    viewer: { text: "VIEWER", className: "bg-pink-wondr" },
  };

  let currentRole;
  if (pocketType === "Business") {
    currentRole = roleStyles.member;
  } else {
    currentRole = roleStyles[displayRoleKey];
  }

  if (!currentRole) {
    currentRole = { text: role.toUpperCase(), className: "bg-gray-200" }; // Fallback
  }

  const displayInitials = getConsistentInitials(name);
  const avatarBgColor = WondrColors["translucent-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    // --- CHANGE: Removed border and padding from the cell itself ---
    <HStack className="items-center">
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <AppText variant="cardTitle" style={{ color: avatarTextColor }}>
          {displayInitials}
        </AppText>
      </Avatar>
      <VStack className="flex-1">
        <AppText variant="cardTitle" className="uppercase">
          {name}
        </AppText>
        <AppText variant="body" className="text-sm text-gray-500">
          Kontribusi: {formatCurrency(contributionAmount)}
        </AppText>
      </VStack>
      <HStack className="items-center gap-1">
        <Badge
          size="sm"
          variant="solid"
          className={`${currentRole.className} rounded-full`}
        >
          <BadgeText className="font-bold text-black">
            {currentRole.text}
          </BadgeText>
        </Badge>
        {isOwner && <Crown size={12} color="black" />}
      </HStack>
    </HStack>
  );
};

/**
 * Renders the scrollable list of members, now encapsulated in a bordered container.
 */
export default function BalanceMemberList() {
  const members = usePocketStore((state) => state.currentPocket?.members);
  const pocketType = usePocketStore((state) => state.currentPocket?.type);

  const memberData = useMemo(() => {
    if (!Array.isArray(members)) return [];
    return [...members];
  }, [members]);

  if (!members) {
    return null;
  }

  const renderItem = ({ item, index }) => {
    if (pocketType === "Saving") {
      return (
        <BalanceMemberListCell
          name={item.name}
          currentAmount={item.PocketMember.contribution_amount}
          targetAmount={item.PocketMember.target_amount}
          index={index}
        />
      );
    } else {
      // For 'Spending' or 'Business' pockets
      return (
        <MemberInfoCard
          name={item.name}
          role={item.PocketMember.role}
          contributionAmount={item.PocketMember.contribution_amount}
          pocketType={pocketType?.toLowerCase()}
        />
      );
    }
  };

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  return (
    // --- CHANGE: Wrapped the FlatList in a bordered Box, following your example ---
    <Box className="bg-white p-5 rounded-3xl border border-gray-wondr-border flex-1">
      <FlatList
        data={memberData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Box>
  );
}
