import { Box } from "@/components/ui/box";

import { Send, Plus } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import { usePocketStore } from "@/stores/pocketStore";
import WithdrawIcon from "@/assets/images/icon/withdraw.svg";
import SquaredButton from "@/components/common/buttons/SquaredButton";

export default function TransactionButtonGroup() {
  // --- NEW: Get the pocket ID from the URL ---
  // Since this component is a child of the `pocket/[id]` route, it has access to the `id`.
  const { id } = useLocalSearchParams();
  const { currentPocket } = usePocketStore();
  const isViewer = currentPocket?.user_role === "viewer";
  const isMember = currentPocket?.user_role === "spender";
  const isBusiness = currentPocket?.type.toLowerCase().includes("business");

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
    <Box className="flex-row justify-evenly mb-3">
      <SquaredButton
        icon={<Plus color="white" size={30} />}
        label="Top up"
        bg="bg-orange-wondr"
        activeBg="bg-orange-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleTopUp}
        disabled={isBusiness && isMember}
      />
      <SquaredButton
        icon={<Send color="white" size={25} />}
        label="Transfer"
        bg="bg-pink-wondr"
        activeBg="bg-pink-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleTransfer}
        disabled={isViewer}
      />
      <SquaredButton
        icon={<WithdrawIcon color="white" weight={20} height={20} />}
        label="Withdraw"
        bg="bg-purple-wondr"
        activeBg="bg-purple-wondr-dark"
        // --- NEW: Add onPress handler ---
        onPress={handleWithdraw}
      />
    </Box>
  );
}
