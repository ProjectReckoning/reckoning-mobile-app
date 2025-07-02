import React from "react";
import { Badge, BadgeText } from "@/components/ui/badge";

// Helper function untuk mendapatkan warna badge berdasarkan peran dan tipe kantong
const getBadgeColorForRole = (role, pocketType) => {
  // const upperCaseRole = role.toUpperCase();

  if (role === "ADMIN") return "bg-tosca-wondr-translucent";

  if (pocketType === "Business") {
    if (role === "MEMBER") return "bg-lime-wondr-translucent";
  } else {
    // untuk 'saving' dan 'spending'
    if (role === "SPENDER") return "bg-purple-wondr-translucent";
    if (role === "VIEWER") return "bg-pink-wondr-translucent";
  }

  // Fallback default
  return "bg-lime-wondr-translucent";
};

export default function BadgeRole({ role, pocketType }) {
  if (!role) {
    return null;
  }

  const badgeColorClass = getBadgeColorForRole(role, pocketType);
  const displayRole = role.toUpperCase();

  return (
    <Badge size="sm" className={`${badgeColorClass} rounded-full`}>
      <BadgeText className="font-bold text-black">{displayRole}</BadgeText>
    </Badge>
  );
}
