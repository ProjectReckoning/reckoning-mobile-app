// components/feature/pocketDashboard/history/MonthSelectionBar.jsx
import React, { useRef, useEffect } from "react";
import { Box } from "@/components/ui/box"; // Using Gluestack Box
import { FlatList, View } from "react-native";
import SmallRoundedButton from "../../../common/buttons/SmallRoundedButton";

// Define consistent dimensions for list items to enable getItemLayout optimization
const MONTH_BUTTON_WIDTH = 70; // Approximate width for each month button
const SEPARATOR_WIDTH = 12; // Width of the ItemSeparatorComponent between buttons

export default function MonthSelectionBar({
  data, // This 'data' will now contain rolling 12 months with year, e.g., [{ id, month, value, year, fullValue }]
  selectedMonthValue, // This will be a string like "6-2025"
  onMonthSelect, // This will receive the full month item object: { value, year, fullValue, ... }
}) {
  const flatListRef = useRef(null);

  // Effect to scroll to the selected month when the component mounts or the selected month changes
  useEffect(() => {
    if (
      flatListRef.current &&
      data &&
      data.length > 0 &&
      selectedMonthValue !== undefined
    ) {
      // Find index using the new 'fullValue' field (e.g., "6-2025")
      const index = data.findIndex(
        (monthItem) => monthItem.fullValue === selectedMonthValue,
      );
      if (index !== -1) {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: false, // Set to false for immediate scroll on initial load
          viewPosition: 1, // Position the item at the end (right) of the visible area
        });
      }
    }
  }, [data, selectedMonthValue]); // Depend on data (as it's now dynamic) and selectedMonthValue

  // `getItemLayout` is crucial for `scrollToIndex` performance and to avoid the warning.
  // It tells FlatList the dimensions and position of each item without rendering them all.
  const getItemLayout = (data, index) => ({
    length: MONTH_BUTTON_WIDTH + SEPARATOR_WIDTH, // Total width of an item including its separator
    offset: (MONTH_BUTTON_WIDTH + SEPARATOR_WIDTH) * index, // Cumulative offset for the item
    index,
  });

  const renderItem = ({ item }) => {
    // `item` is now { id, month, value, year, fullValue }
    const isActive = item.fullValue === selectedMonthValue; // Compare using the fullValue
    return (
      <SmallRoundedButton
        title={item.month} // Display only the month name (e.g., "Jun")
        isActive={isActive}
        // FIX: Change 'onPress' to 'handleOnPress' to match the SmallRoundedButton prop
        handleOnPress={() => onMonthSelect(item)} // Pass the full month item object
        style={{ width: MONTH_BUTTON_WIDTH }} // Enforce the width here
      />
    );
  };

  const ItemSeparator = () => (
    <View style={{ width: SEPARATOR_WIDTH }} /> // Separator for spacing between buttons
  );

  return (
    <Box className="mb-4">
      <FlatList
        ref={flatListRef} // Attach a ref to the FlatList for scrolling
        data={data} // This is the new rolling 12-month data with year info
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Key using combined id_year (e.g., "6_2025")
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the scrollbar
        contentContainerStyle={{
          paddingHorizontal: 0, // Adjust as needed
        }}
        ItemSeparatorComponent={ItemSeparator} // Add separator component
        getItemLayout={getItemLayout} // Provide item layout information
      />
    </Box>
  );
}
