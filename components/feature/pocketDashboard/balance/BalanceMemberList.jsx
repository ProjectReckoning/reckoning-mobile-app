import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import BalanceMemberListCell from "@/components/common/tableCells/BalanceMemberListCell";
import { WondrColors } from "@/utils/colorUtils";

export default function BalanceMemberList({ members, targetNominal }) {
  const [sortBy, setSortBy] = useState("none");

  const renderItem = ({ item, index }) => (
    <BalanceMemberListCell
      name={item.name}
      currentAmount={item.PocketMember.contribution_amount}
      targetAmount={targetNominal}
      index={index}
    />
  );

  return (
    <Box className="flex-1">
      <Box className="flex-row justify-between items-center mb-4 px-4 pt-4">
        <Text className="text-xl font-bold text-gray-800">Target Detail</Text>
        <Box className="flex-row items-center">
          <Text className="text-base text-gray-700 mr-2">Sort by</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: WondrColors["light-gray-wondr"],
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={sortBy}
              style={{ height: 40, width: 120 }}
              onValueChange={(itemValue) => setSortBy(itemValue)}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Progress" value="progress" />
              <Picker.Item label="Name" value="name" />
            </Picker>
          </View>
        </Box>
      </Box>

      <Box
        className="flex-1 rounded-3xl border border-2"
        style={{ borderColor: WondrColors["light-gray-wondr"] }}
      >
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 20,
          }}
        />
      </Box>
    </Box>
  );
}
