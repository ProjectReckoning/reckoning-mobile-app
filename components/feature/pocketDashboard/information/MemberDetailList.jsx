import React, { useState, useMemo } from "react"; // Added useMemo
import { FlatList, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { WondrColors } from "@/utils/colorUtils";
import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";

export default function MemberDetailList({ data }) {
  const [sortBy, setSortBy] = useState("none");

  // Use useMemo to memoize filtering and sorting, re-calculating only when 'data' or 'sortBy' changes
  const processedMembers = useMemo(() => {
    // Ensure data is an array before attempting to filter
    if (!Array.isArray(data)) {
      console.warn("MemberDetailList received non-array data:", data);
      return [];
    }

    // Filter out members whose PocketMember.role is 'owner'
    let filtered = data.filter(
      (item) => item.PocketMember?.role?.toLowerCase() !== "owner",
    );

    // Apply sorting based on sortBy state
    if (sortBy === "name") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    // Add sorting for 'progress' if you have a progress field
    // else if (sortBy === 'progress') {
    //   filtered.sort((a, b) => (a.progress || 0) - (b.progress || 0));
    // }

    return filtered;
  }, [data, sortBy]); // Recalculate if 'data' or 'sortBy' changes

  const renderItem = ({ item, index }) => (
    // Pass the entire 'item' (which is a member object) as the 'member' prop
    // to InfoMemberDetailCell, as it now expects the full object.
    <InfoMemberDetailCell member={item} index={index} />
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
                overflow: "hidden", // Ensures Picker doesn't overflow rounded corners
              }}
            >
              <Picker
                selectedValue={sortBy}
                style={{ height: 40, width: 120 }} // Adjusted height/width for better visibility on Android
                onValueChange={(itemValue) => setSortBy(itemValue)}
                itemStyle={{ height: 40 }} // For iOS picker items
              >
                <Picker.Item label="None" value="none" />
                <Picker.Item label="Name (A-Z)" value="name" />
                {/* Add a "Progress" item if your data will contain progress */}
                {/* <Picker.Item label="Progress" value="progress" /> */}
              </Picker>
            </View>
          </Box>
        </Box>

        <Box
          className="flex-1"
          style={{ borderColor: WondrColors["light-gray-wondr"] }}
        >
          {processedMembers.length > 0 ? (
            <FlatList
              data={processedMembers}
              renderItem={renderItem}
              // Use item.id for keyExtractor if it's unique, otherwise fallback to index but be cautious
              keyExtractor={(item) =>
                item.id
                  ? item.id.toString()
                  : `member-${item.name}-${item.PocketMember?.role}-${item.phone_number}`
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 0,
                paddingTop: 12,
                paddingBottom: 20,
              }}
              ItemSeparatorComponent={ItemSeparator}
            />
          ) : (
            <Box className="flex-1 justify-center items-center py-4">
              <Text className="text-gray-500">
                No other members to display.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
