import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import * as Progress from "react-native-progress";
import {
  WondrColors,
  COLOR_PALETTE_LIGHT_TRANSLUCENT,
} from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import { Crown, EllipsisVertical } from "lucide-react-native";

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

export default function InfoMemberDetailCell({
  name = "Amira Ferial",
  role = "owner",
  index = 1,
}) {
  // Initialize state based on props, handling the "owner is admin" logic
  const [userData, setUserData] = useState(() => {
    const isOwnerCreator = role.toLowerCase() === "owner";
    return {
      name: name,
      // If the role prop is 'owner', display 'ADMIN'. Otherwise, display role in uppercase.
      role: isOwnerCreator ? "ADMIN" : role.toUpperCase(),
      owner: isOwnerCreator, // True if the original role prop was 'owner'
    };
  });

  // Use useEffect to update userData if the 'name' or 'role' props change
  useEffect(() => {
    const isOwnerCreator = role.toLowerCase() === "owner";
    setUserData({
      name: name,
      role: isOwnerCreator ? "ADMIN" : role.toUpperCase(),
      owner: isOwnerCreator,
    });
  }, [name, role]); // Depend on name and role props

  const displayInitials = getConsistentInitials(name);
  const selectedColor =
    COLOR_PALETTE_LIGHT_TRANSLUCENT[
      index % COLOR_PALETTE_LIGHT_TRANSLUCENT.length
    ];

  const avatarBgColor = WondrColors["light-gray-wondr"];
  const avatarTextColor = WondrColors["tosca-wondr"];

  return (
    <Box
      className="flex-row rounded-2xl p-2 border border-2 items-center"
      style={{ borderColor: WondrColors["light-gray-wondr"] }}
    >
      <Avatar
        size="md"
        style={{ backgroundColor: avatarBgColor, marginRight: 12 }}
        className="items-center justify-center"
      >
        <Text
          style={{
            color: avatarTextColor,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {displayInitials}
        </Text>
      </Avatar>

      <Box className="flex-1">
        <VStack>
          <Box className="flex-row justify-start items-center gap-1">
            {/* CORRECTED: Apply dynamic background color using the style prop */}
            <Box
              className="p-1 rounded-full" // Keep static Tailwind classes here
              style={{ backgroundColor: selectedColor }} // Apply dynamic color via style prop
            >
              <Text className="text-xs">{userData.role}</Text>
            </Box>
            {/* Display crown if userData.owner is true */}
            {userData.owner ? <Crown size={12} /> : <></>}
          </Box>
          <Text className="text-lg font-extrabold">
            {userData.name.toUpperCase()}
          </Text>
        </VStack>
      </Box>

      {/* Conditionally render EllipsisVertical based on userData.owner */}
      {userData.owner ? (
        <></>
      ) : (
        <Box className="justify-center items-center p-4">
          <EllipsisVertical />
        </Box>
      )}
    </Box>
  );
}
