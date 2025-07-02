import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import { useLocalSearchParams } from "expo-router";
import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";
import InfoBalanceContent from "@/components/feature/pocketDashboard/common/InfoBalanceContent";
import AppText from "@/components/common/typography/AppText";

/**
 * Renders the scrollable list of members and manages the member action sheet.
 */
export default function MemberDetailList() {
  const { id: pocketId } = useLocalSearchParams();

  const members = usePocketStore((state) => state.currentPocket?.members);
  const pocketType = usePocketStore((state) => state.currentPocket?.type);

  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const processedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];

    // --- PENYESUAIAN DIMULAI DI SINI ---

    return members
      .filter((item) => item.PocketMember?.role?.toLowerCase() !== "owner")
      .map((member) => {
        // Jika pocketType adalah "Business" dan role adalah "Spender", ubah menjadi "Member"
        if (
          pocketType === "Business" &&
          member.PocketMember?.role?.toLowerCase() === "spender"
        ) {
          // Buat salinan member untuk menjaga immutability (tidak mengubah state asli)
          return {
            ...member,
            PocketMember: {
              ...member.PocketMember,
              role: "member", // Ganti role menjadi "Member"
            },
          };
        }
        // Jika tidak, kembalikan data member seperti aslinya
        return member;
      });

    // --- PENYESUAIAN SELESAI ---
  }, [members, pocketType]); // <-- Tambahkan pocketType sebagai dependency

  const handleManagePress = (member) => {
    setSelectedMember(member);
    setShowActionsheet(true);
  };

  if (!members) {
    return null;
  }

  const renderItem = ({ item, index }) => (
    <InfoMemberDetailCell
      member={item}
      index={index}
      onManagePress={() => handleManagePress(item)}
    />
  );

  const ItemSeparator = () => <View style={{ height: 12 }} />;

  const ListEmptyComponent = () => (
    <Box className="flex-1 justify-center items-center py-10">
      <AppText variant="bodyMuted">No other members to display.</AppText>
    </Box>
  );

  return (
    <>
      <FlatList
        data={processedMembers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />

      {selectedMember && (
        <InfoBalanceContent
          isOpen={showActionsheet}
          onClose={() => setShowActionsheet(false)}
          memberData={selectedMember}
          pocketId={pocketId}
          pocketType={pocketType}
        />
      )}
    </>
  );
}
