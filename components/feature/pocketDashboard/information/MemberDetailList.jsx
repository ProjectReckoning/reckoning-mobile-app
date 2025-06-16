import React, { useState } from "react";
import { FlatList, View } from "react-native"; // Make sure View is imported
import { Picker } from "@react-native-picker/picker";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";

export default function MemberDetailList({ data }) {
  const [sortBy, setSortBy] = useState("none");

  const filteredData = data.filter(
    (item) => item.role.toUpperCase() !== "OWNER",
  );

  const renderItem = ({ item, index }) => (
    <InfoMemberDetailCell name={item.name} role={item.role} index={index} />
  );

  // Define a simple ItemSeparatorComponent to create a vertical gap
  const ItemSeparator = () => <View style={{ height: 12 }} />; // 12 units of vertical space

  return (
    <>
      <Box className="flex-1">
        <Box className="flex-row justify-between items-center">
          <Box className="flex-1 flex-row justify-end">
            <Text className="text-xs text-gray-700 mr-2">Sort by</Text>
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
                style={{ height: 15, width: 80 }}
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
          className="flex-1"
          style={{ borderColor: WondrColors["light-gray-wondr"] }}
        >
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 0,
              paddingTop: 12,
              paddingBottom: 20,
            }}
            ItemSeparatorComponent={ItemSeparator} // ADDED: Use the ItemSeparator component here
          />
        </Box>
      </Box>
    </>
  );
}
