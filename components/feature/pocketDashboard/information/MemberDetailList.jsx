import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { Box } from "@/components/ui/box";
import { usePocketStore } from "@/stores/pocketStore";
import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";
import AppText from "@/components/common/typography/AppText";

/**
 * This component's only responsibility is to render the scrollable list of members.
 * It fetches its own data from the store and has no other layout concerns.
 */
export default function MemberDetailList() {
  const members = usePocketStore((state) => state.currentPocket?.members);

  const processedMembers = useMemo(() => {
    if (!Array.isArray(members)) return [];
    // Filter out the owner to only show other members in the list
    return members.filter(
      (item) => item.PocketMember?.role?.toLowerCase() !== "owner",
    );
  }, [members]);

  if (!members) {
    return null;
  }

  const renderItem = ({ item, index }) => (
    <InfoMemberDetailCell member={item} index={index} />
  );

  const ItemSeparator = () => <View style={{ height: 12 }} />;

  const ListEmptyComponent = () => (
    <Box className="flex-1 justify-center items-center py-10">
      <AppText variant="bodyMuted">No other members to display.</AppText>
    </Box>
  );

  return (
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
  );
}
