import React from "react";
import { Box } from "@/components/ui/box";
import { Send, ArrowUp, ArrowDown } from "lucide-react-native";
import SquaredButton from "@/components/common/buttons/SquaredButton";
// --- NEW: Import router and hooks from expo-router ---
import { router, useLocalSearchParams } from "expo-router";

export default function TransactionButtonGroup() {
  // --- NEW: Get the pocket ID from the URL ---
  // Since this component is a child of the `pocket/[id]` route, it has access to the `id`.
  const { id } = useLocalSearchParams();

  // --- NEW: Navigation handlers for each button ---
  const handleTopUp = () => {
    // Navigate to the nested top-up screen for the current pocket
    if (id) router.push(`/(main)/pocket/${id}/transaction/topup`);
  };

  const handleTransfer = () => {
    // Navigate to the nested transfer screen
    if (id) router.push(`/(main)/pocket/${id}/transaction/transfer`);
  };

  const handleWithdraw = () => {
    // Navigate to the nested withdraw screen
    if (id) router.push(`/(main)/pocket/${id}/transaction/withdraw`);
  };

  return (
    <Box className="flex-row justify-evenly">
      <SquaredButton
        icon={<ArrowUp color="white" size={20} />}
        label="Top up"
        bg="bg-orange-wondr"
        activeBg="bg-orange-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleTopUp}
      />
      <SquaredButton
        icon={<Send color="white" size={20} />}
        label="Transfer"
        bg="bg-pink-wondr"
        activeBg="bg-pink-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleTransfer}
      />
      <SquaredButton
        icon={<ArrowDown color="white" size={20} />}
        label="Withdraw"
        bg="bg-purple-wondr"
        activeBg="bg-purple-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleWithdraw}
      />
    </Box>
  );
}
