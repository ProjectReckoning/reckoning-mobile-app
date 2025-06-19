import React, { useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors

import NotificationDetailContent from "@/components/feature/notification/NotificationDetailContent";

export default function NotificationDetail() {
  return (
    <Box className="flex-1 bg-white">
      <NotificationDetailContent />
    </Box>
  );
}
