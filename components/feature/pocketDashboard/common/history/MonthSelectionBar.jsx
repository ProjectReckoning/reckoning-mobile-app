import React, { useRef, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { FlatList, View } from "react-native";
import SmallRoundedButton from "../../../../common/buttons/SmallRoundedButton";

const MONTH_BUTTON_WIDTH = 70;
const SEPARATOR_WIDTH = 12;

export default function MonthSelectionBar({
  data,
  selectedMonthValue,
  onMonthSelect,
}) {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (
      flatListRef.current &&
      data &&
      data.length > 0 &&
      selectedMonthValue !== undefined
    ) {
      const index = data.findIndex(
        (monthItem) => monthItem.fullValue === selectedMonthValue,
      );
      if (index !== -1) {
        flatListRef.current.scrollToIndex({
          index: index,
          animated: false,
          viewPosition: 1,
        });
      }
    }
  }, [data, selectedMonthValue]);

  const getItemLayout = (data, index) => ({
    length: MONTH_BUTTON_WIDTH + SEPARATOR_WIDTH,
    offset: (MONTH_BUTTON_WIDTH + SEPARATOR_WIDTH) * index,
    index,
  });

  const renderItem = ({ item }) => {
    const isActive = item.fullValue === selectedMonthValue;
    return (
      <SmallRoundedButton
        title={item.month}
        isActive={isActive}
        handleOnPress={() => onMonthSelect(item)}
        style={{ width: MONTH_BUTTON_WIDTH }}
      />
    );
  };

  const ItemSeparator = () => <View style={{ width: SEPARATOR_WIDTH }} />;

  return (
    <Box className="mb-10">
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
        }}
        ItemSeparatorComponent={ItemSeparator}
        getItemLayout={getItemLayout}
      />
    </Box>
  );
}
