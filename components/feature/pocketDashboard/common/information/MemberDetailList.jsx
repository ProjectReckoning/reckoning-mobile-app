import React, { useMemo, useState } from "react";
// Impor TouchableOpacity untuk tombol "Lihat semua"
import { FlatList, View, TouchableOpacity } from "react-native";
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
  // --- PENYESUAIAN 1: Tambahkan state untuk kontrol "Lihat semua" ---
  const [showAll, setShowAll] = useState(false);

  // --- PENYESUAIAN 2: Perbarui logika untuk memproses dan membatasi anggota ---
  const processedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];

    const allMembers = members
      .filter((item) => item.PocketMember?.role?.toLowerCase() !== "owner")
      .map((member) => {
        if (
          pocketType === "Business" &&
          member.PocketMember?.role?.toLowerCase() === "spender"
        ) {
          return {
            ...member,
            PocketMember: {
              ...member.PocketMember,
              role: "member",
            },
          };
        }
        return member;
      });

    // Jika showAll true atau anggota kurang dari/sama dengan 5, tampilkan semua
    if (showAll || allMembers.length <= 3) {
      return allMembers;
    }

    // Jika tidak, hanya tampilkan 5 anggota pertama
    return allMembers.slice(0, 3);
  }, [members, pocketType, showAll]); // Tambahkan showAll sebagai dependency

  // Buat variabel terpisah untuk mengecek jumlah total anggota (sebelum dipotong)
  const totalMemberCount = useMemo(() => {
    if (!Array.isArray(members)) return 0;
    return members.filter(
      (item) => item.PocketMember?.role?.toLowerCase() !== "owner",
    ).length;
  }, [members]);

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

  return (
    <>
      <FlatList
        data={processedMembers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        // Jika Anda ingin list bisa di-scroll terpisah, hapus properti di bawah
        scrollEnabled={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />

      {/* --- PENYESUAIAN 3: Tambahkan tombol "Lihat semua" --- */}
      {totalMemberCount > 3 && (
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          style={{ alignItems: "center", paddingVertical: 10 }}
        >
          <AppText variant="button" className="text-tosca-wondr font-bold">
            {showAll ? "Lihat lebih sedikit" : "Lihat semua member"}
          </AppText>
        </TouchableOpacity>
      )}

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
