// components/common/AppBar.jsx
import { router, useNavigation } from "expo-router";
import { Box } from "@/components/ui/box";
import { ArrowLeft } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppBar({
  title = "",
  onBack,
  className = "",
  transaction = null,
  prefix = "",
}) {
  const navigation = useNavigation();
  // This hook provides the device's safe area dimensions.
  const insets = useSafeAreaInsets();

  const canGoBack = navigation.canGoBack();
  const showBackButton = onBack || canGoBack;

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (canGoBack) {
      router.back();
    }
  };

  return (
    // We apply the top inset as padding to the container.
    // This pushes the AppBar content down into the visible area.
    <Box
      className={`w-full flex flex-row justify-between items-center px-6 pb-4 ${className}`}
      style={{ paddingTop: insets.top + 16, backgroundColor: "white" }}
    >
      {showBackButton ? (
        <Pressable onPress={handleBackPress} hitSlop={10}>
          <ArrowLeft size={24} />
        </Pressable>
      ) : (
        <Box className="w-6 h-6" /> // Placeholder to keep title centered
      )}
      <Heading size="lg" className="font-bold text-center">
        {transaction
          ? `${transaction === "topup" ? (prefix ? `${prefix} Top-Up` : "Top-Up") : transaction === "transfer" ? (prefix ? `${prefix} Transfer` : "Transfer") : prefix ? `${prefix} Withdraw` : "Withdraw"}`
          : title}
      </Heading>
      <Box className="w-6 h-6" />
    </Box>
  );
}
