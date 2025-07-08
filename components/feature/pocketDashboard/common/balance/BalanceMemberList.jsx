// components/feature/pocketDashboard/common/balance/BalanceMemberList.jsx
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Avatar } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";

import { useState, useMemo } from "react";
import { Crown } from "lucide-react-native";
import { FlatList, View, TouchableOpacity } from "react-native";

import useAuthStore from "@/stores/authStore";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";
import BalanceMemberListCell from "@/components/common/tableCells/BalanceMemberListCell";

// ... (getConsistentInitials dan MemberInfoCard tetap sama)
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

const MemberInfoCard = ({ name, role, contributionAmount, pocketType }) => {
  const isOwner = role.toLowerCase() === "owner";
  // Jika rolenya 'owner', kita akan gunakan style untuk 'admin'
  const displayRoleKey = isOwner ? "admin" : role.toLowerCase();

  const roleStyles = {
    admin: { text: "ADMIN", className: "bg-tosca-wondr" },
    member: { text: "MEMBER", className: "bg-lime-wondr" },
    spender: { text: "SPENDER", className: "bg-purple-wondr" },
    viewer: { text: "VIEWER", className: "bg-pink-wondr" },
  };

  // Penyesuaian role untuk tipe pocket Business
  let currentRole;
  if (pocketType === "business") {
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

export default function BalanceMemberList() {
  const members = usePocketStore((state) => state.currentPocket?.members);
  const pocketType = usePocketStore((state) => state.currentPocket?.type);
  const currentUserId = useAuthStore((state) => state.user?.user_id);
  const [showAll, setShowAll] = useState(false);

  const sortedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];
    // Find current user
    const userMember = members.find((m) => m.id === currentUserId);
    // Exclude current user from the rest
    const otherMembers = members.filter((m) => m.id !== currentUserId);
    // Sort the rest by contribution
    const sortedOthers = otherMembers.sort(
      (a, b) =>
        b.PocketMember.contribution_amount - a.PocketMember.contribution_amount,
    );
    // Combine: user first, then sorted others
    const combined = userMember ? [userMember, ...sortedOthers] : sortedOthers;
    if (showAll || combined.length <= 5) {
      return combined;
    }
    return combined.slice(0, 5);
  }, [members, showAll, currentUserId]);

  if (!members || members.length === 0) {
    return null;
  }

  const renderItem = ({ item }) => {
    // index dihapus karena tidak lagi dipakai untuk warna
    // Jika role adalah 'owner', kita anggap sebagai 'admin' untuk styling
    const memberRole =
      item.PocketMember.role.toLowerCase() === "owner"
        ? "admin"
        : item.PocketMember.role.toLowerCase();

    if (pocketType === "Saving") {
      return (
        <BalanceMemberListCell
          name={item.name}
          currentAmount={item.PocketMember.contribution_amount}
          targetAmount={item.PocketMember.target_amount}
          // --- PERUBAHAN DI SINI ---
          // Mengoper role anggota ke komponen cell
          role={memberRole}
        />
      );
    } else {
      return (
        <MemberInfoCard
          name={item.name}
          role={item.PocketMember.role} // MemberInfoCard sudah handle 'owner'
          contributionAmount={item.PocketMember.contribution_amount}
          pocketType={pocketType?.toLowerCase()}
        />
      );
    }
  };

  const ItemSeparator = () => <View style={{ height: 16 }} />;

  return (
    <Box className="bg-white p-5 rounded-3xl border border-gray-wondr-border flex-1">
      <FlatList
        data={sortedMembers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
      {members.length > 5 && (
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          className="items-center mt-4"
        >
          <AppText variant="button" className="text-tosca-wondr font-bold">
            {showAll ? "Lihat lebih sedikit" : "Lihat semua"}
          </AppText>
        </TouchableOpacity>
      )}
    </Box>
  );
}
