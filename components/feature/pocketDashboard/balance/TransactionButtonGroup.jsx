import React from "react";
import { Box } from "@/components/ui/box";
import { Send, ArrowUp, ArrowDown } from "lucide-react-native";
import SquaredButton from "@/components/common/buttons/SquaredButton";

export default function TransactionButtonGroup() {
  return (
    <Box className="flex-row justify-evenly">
      <SquaredButton
        icon={<ArrowUp color="white" size={20} />}
        label="Top up"
        bg="bg-orange-wondr"
        activeBg="bg-orange-wondr-dark"
      />
      <SquaredButton
        icon={<Send color="white" size={20} />}
        label="Transfer"
        bg="bg-pink-wondr"
        activeBg="bg-pink-wondr-dark"
      />
      <SquaredButton
        icon={<ArrowDown color="white" size={20} />}
        label="Withdraw"
        bg="bg-purple-wondr"
        activeBg="bg-purple-wondr-dark"
      />
    </Box>
  );
}
