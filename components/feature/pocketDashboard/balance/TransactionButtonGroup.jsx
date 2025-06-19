import React from "react";
import { Box } from "@/components/ui/box";
import { Send } from "lucide-react-native";
import SquaredButton from "@/components/common/buttons/SquaredButton";

export default function TransactionButtonGroup() {
  return (
    <>
      <Box className="flex flex-row justify-evenly">
        <SquaredButton
          icon={<Send color="white" />}
          label="Top up"
          bg="bg-orange-wondr"
          activeBg="bg-orange-wondr-dark"
          size={20}
        />
        <SquaredButton
          icon={<Send color="white" />}
          label="Transfer"
          bg="bg-pink-wondr"
          activeBg="bg-pink-wondr-dark"
          size={20}
        />
        <SquaredButton
          icon={<Send color="white" />}
          label="Withdraw"
          bg="bg-purple-wondr"
          activeBg="bg-purple-wondr-dark"
          size={20}
        />
      </Box>
    </>
  );
}
