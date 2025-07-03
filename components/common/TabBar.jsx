import { useEffect } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function TabBar({
  tabList,
  activeTab,
  setActiveTab,
  size = 18,
  marginVertical = 28,
  backgroundColor = "#F9F9F9",
  TAB_BAR_HEIGHT = 56,
  TAB_BAR_PADDING = 6,
  TAB_WIDTH,
}) {
  const tabWidth =
    (Dimensions.get("window").width - 2 * 24 - 2 * TAB_BAR_PADDING) /
    tabList.length;
  const indicatorX = useSharedValue(0);

  useEffect(() => {
    const idx = tabList.findIndex((tab) => tab.key === activeTab);
    let width = TAB_WIDTH;
    if (typeof TAB_WIDTH === "string" && TAB_WIDTH.endsWith("%")) {
      const percent = parseFloat(TAB_WIDTH) / 100;
      width =
        (Dimensions.get("window").width - 2 * 24 - 2 * TAB_BAR_PADDING) *
        percent;
    } else if (!TAB_WIDTH) {
      width = tabWidth;
    }
    indicatorX.value = withTiming(idx * width, {
      duration: 250,
    });
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
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: TAB_BAR_PADDING,
            left: TAB_BAR_PADDING,
            width: TAB_WIDTH ? TAB_WIDTH : tabWidth,
            height: TAB_BAR_HEIGHT - 2 * TAB_BAR_PADDING,
            backgroundColor: "#D9F634",
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
              fontWeight: activeTab === tab.key ? "bold" : "light",
              fontSize: size,
              color: activeTab === tab.key ? "#000" : "#22223A",
            }}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
