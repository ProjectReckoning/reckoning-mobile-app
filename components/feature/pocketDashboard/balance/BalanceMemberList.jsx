import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { usePocketStore } from "@/stores/pocketStore";
import BalanceMemberListCell from "@/components/common/tableCells/BalanceMemberListCell";

/**
 * Renders the scrollable list of members for the balance screen.
 */
export default function BalanceMemberList() {
  const members = usePocketStore((state) => state.currentPocket?.members);
  const targetNominal = usePocketStore(
    (state) => state.currentPocket?.target_nominal,
  );

  const memberData = useMemo(() => {
    if (!Array.isArray(members)) return [];
    return [...members];
  }, [members]);

  if (!members) {
    return null;
  }

  const renderItem = ({ item, index }) => (
    <BalanceMemberListCell
      name={item.name}
      currentAmount={item.PocketMember.contribution_amount}
      targetAmount={targetNominal}
      index={index}
    />
  );

  const ItemSeparator = () => <View style={{ height: 12 }} />;

  return (
    <FlatList
      data={memberData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
