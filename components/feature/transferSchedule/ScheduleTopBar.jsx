// Nama file: ScheduleTopBar.jsx
// (Pastikan file ini berada di path yang benar sesuai import Anda)

import React from "react";
import ReusableRoundedTabBar from "@/components/common/ReusableRoundedTabBar";

// NAMA KOMPONEN TELAH DIPERBAIKI
export default function ScheduleTopBar({ initialTab, onTabChange }) {
  const pocketTabs = [
    { name: "terjadwal", label: "Terjadwal" },
    { name: "selesai", label: "Selesai" },
  ];

  return (
    <ReusableRoundedTabBar
      tabs={pocketTabs}
      initialTab={initialTab}
      onTabChange={onTabChange}
    />
  );
}
