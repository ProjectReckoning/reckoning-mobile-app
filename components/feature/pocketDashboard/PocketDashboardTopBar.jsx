import React from "react";
import ReusableRoundedTabBar from "@/components/common/ReusableRoundedTabBar";

export default function PocketDashboardTopBar({ initialTab, onTabChange }) {
  const pocketTabs = [
    { name: "balance", label: "Balance" },
    { name: "info", label: "Info" },
    { name: "history", label: "History" },
  ];

  return (
    <ReusableRoundedTabBar
      tabs={pocketTabs}
      initialTab={initialTab}
      onTabChange={onTabChange}
    />
  );
}
