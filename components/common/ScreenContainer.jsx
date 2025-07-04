// components/common/ScreenContainer.jsx
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

/**
 * A reusable component that acts as a screen wrapper.
 * This version uses a standard View and the style prop for robust padding.
 */
export default function ScreenContainer({ children, style, ...props }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          // Apply the insets as padding
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style, // Allow passing additional styles
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
