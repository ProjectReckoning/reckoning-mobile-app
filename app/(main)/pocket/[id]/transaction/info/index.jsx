import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors

import InfoBalanceContent from "@/components/feature/pocketDashboard/common/InfoBalanceContent";

export default function InfoScreen() {
  return (
    <Box className="flex-1 bg-white">
      <InfoBalanceContent />
    </Box>
  );
}
