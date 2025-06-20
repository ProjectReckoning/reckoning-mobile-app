import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors

import ScheduleTransferContent from "@/components/feature/scheduleTransfer/ScheduleTransferContent";

export default function NotificationDetail() {
  return (
    <Box className="flex-1 bg-white">
      <ScheduleTransferContent />
    </Box>
  );
}
