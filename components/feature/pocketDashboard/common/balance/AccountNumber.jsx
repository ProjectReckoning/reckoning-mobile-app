import React from "react";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import AppText from "@/components/common/typography/AppText";
import { usePocketStore } from "@/stores/pocketStore";

export default function AccountNumber() {
  const accountNumber = usePocketStore(
    (state) => state.currentPocket?.account_number,
  );

  return (
    <Box className="flex-row rounded-xl justify-between items-center p-3 mb-2 bg-orange-wondr">
      <AppText
        variant="bodyBold"
        className="text-white"
        style={{ flexShrink: 1, marginRight: 8 }}
      >
        Account Number
      </AppText>
      {/* TODO: Add an onPress handler to copy the account number */}
      <Pressable>
        <AppText variant="bodyBold" className="text-white">
          {accountNumber || "..."}
        </AppText>
      </Pressable>
    </Box>
  );
}
