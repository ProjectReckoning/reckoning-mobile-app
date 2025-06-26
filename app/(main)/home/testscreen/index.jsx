import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors

import BalanceCategory from "@/components/feature/balance/BalanceCategory";

export default function TestScreen() {
  return (
    <Box className="flex-1 bg-white p-8">
      <BalanceCategory />
    </Box>
  );
}
