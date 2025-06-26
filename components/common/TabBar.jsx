import { useEffect } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TAB_BAR_HEIGHT = 56;
const TAB_BAR_PADDING = 6;

export default function TabBar({
  tabList,
  activeTab,
  setActiveTab,
  size = 18,
  marginVertical = 28,
  backgroundColor = "#F9F9F9",
}) {
  const tabWidth =
    (Dimensions.get("window").width - 2 * 24 - 2 * TAB_BAR_PADDING) /
    tabList.length;
  const indicatorX = useSharedValue(0);

  useEffect(() => {
    const idx = tabList.findIndex((tab) => tab.key === activeTab);
    indicatorX.value = withTiming(idx * tabWidth, { duration: 250 });
  }, [activeTab, tabList, tabWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: backgroundColor,
        borderRadius: 999,
        marginVertical: marginVertical,
        padding: TAB_BAR_PADDING,
        height: TAB_BAR_HEIGHT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: TAB_BAR_PADDING,
            left: TAB_BAR_PADDING,
            width: tabWidth,
            height: TAB_BAR_HEIGHT - 2 * TAB_BAR_PADDING,
            backgroundColor: "#D9F634", // lime-wondr
            borderRadius: 999,
            zIndex: 0,
          },
          indicatorStyle,
        ]}
      />
      {tabList.map((tab, idx) => (
        <Pressable
          key={tab.key}
          onPress={() => setActiveTab(tab.key)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: size,
              color: activeTab === tab.key ? "#000" : "#22223A",
              textDecorationLine: "underline",
            }}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
