import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { ArrowLeft } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

const handleBack = () => {
  router.back();
};

export default function AppBar({
  title,
  onBack = handleBack,
  className = "",
  transaction = null,
}) {
  return (
    <Box
      className={`w-full flex flex-row justify-between items-center ${className}`}
    >
      <Pressable onPress={onBack}>
        <ArrowLeft size={24} />
      </Pressable>
      <Heading size="lg" className="font-bold">
        {transaction
          ? `${transaction === "topup" ? "Top-Up" : transaction === "transfer" ? "Transfer" : "Withdraw"}`
          : title || "AppBar"}
      </Heading>
      <Box className="w-5 h-5" />
    </Box>
  );
}
