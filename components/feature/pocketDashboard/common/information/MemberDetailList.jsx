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

  // --- FIX: State to control the actionsheet and selected member ---
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const processedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];
    return members.filter(
      (item) => item.PocketMember?.role?.toLowerCase() !== "owner",
    );
  }, [members]);

  // --- FIX: Handler to open the actionsheet with the correct member data ---
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
      onManagePress={() => handleManagePress(item)} // Pass the handler to each cell
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

      {/* --- FIX: Render the actionsheet and pass it the required data --- */}
      {selectedMember && (
        <InfoBalanceContent
          isOpen={showActionsheet}
          onClose={() => setShowActionsheet(false)}
          memberData={selectedMember}
          pocketId={pocketId}
        />
      )}
    </>
  );
}
