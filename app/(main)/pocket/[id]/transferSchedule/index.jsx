import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors

import TransferScheduleContent from "@/components/feature/transferSchedule/TransferScheduleContent";

export default function NotificationDetail() {
  return (
    <Box className="flex-1 bg-white">
      <TransferScheduleContent />
    </Box>
  );
}
