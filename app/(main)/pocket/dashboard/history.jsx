// app/pocket/dashboard/history.jsx
import React from "react";
import { Box } from "@/components/ui/box"; // Gluestack Box
import HistoryContent from "@/components/feature/pocketDashboard/history/HistoryContent"; // Import the new content component

export default function HistoryScreen() {
  return (
    // Simple container for the screen, using NativeWind for styling
    <Box className="flex-1 bg-white">
      <HistoryContent />
    </Box>
  );
}
