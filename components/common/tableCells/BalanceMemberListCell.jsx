// components/common/tableCells/BalanceMemberListCell.jsx
import React from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Avatar } from "@/components/ui/avatar";
import * as Progress from "react-native-progress";
import { WondrColors } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

// Definisikan roleStyles di sini agar komponen mandiri
// Pastikan nama warna (e.g., "tosca-wondr") ada di WondrColors Anda
const roleStyles = {
  admin: { color: WondrColors["tosca-wondr"] },
  member: { color: WondrColors["lime-wondr"] },
  spender: { color: WondrColors["purple-wondr"] },
  viewer: { color: WondrColors["pink-wondr"] },
  // Fallback jika role tidak terdefinisi
  default: { color: WondrColors["light-gray-wondr"] },
};

const getConsistentInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ").filter(Boolean);
  if (words.length > 1) {
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  } else if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return "";
};

export default function BalanceMemberListCell({
  name,
  currentAmount,
  targetAmount,
  role, // Prop 'role' diterima di sini
}) {
  const rawProgress =
    targetAmount > 0 ? Number(currentAmount) / Number(targetAmount) : 0;
  const visualProgress = Math.min(1, rawProgress);
  const percentage = (visualProgress * 100).toFixed(0);

  const displayInitials = getConsistentInitials(name);

  // --- LOGIKA WARNA BERDASARKAN ROLE ---
  // Gunakan role yang diterima untuk memilih style, dengan fallback ke 'default'
  const selectedStyle = roleStyles[role] || roleStyles.default;
  const selectedColor = selectedStyle.color;

  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box className="flex-row items-center bg-white rounded-lg">
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <AppText variant="cardTitle" style={{ color: avatarTextColor }}>
          {displayInitials}
        </AppText>
      </Avatar>

      <View className="flex-1">
        <Box className="flex-row justify-between items-center mb-1">
          <AppText variant="cardTitle" className="flex-shrink pr-2">
            {name}
          </AppText>
          <Box
            style={{
              backgroundColor: selectedColor, // Warna dari role
              borderRadius: 15,
              paddingVertical: 4,
              paddingHorizontal: 8,
              minWidth: 50,
              alignItems: "center",
            }}
          >
            <AppText variant="caption" className="font-bold text-white">
              {percentage}%
            </AppText>
          </Box>
        </Box>

        <Progress.Bar
          progress={visualProgress}
          width={null}
          height={8}
          color={selectedColor} // Warna dari role
          unfilledColor={WondrColors["light-gray-wondr"]}
          borderWidth={0}
          borderRadius={4}
          style={{ marginBottom: 4 }}
        />

        <AppText variant="caption">
          {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
        </AppText>
      </View>
    </Box>
  );
}
