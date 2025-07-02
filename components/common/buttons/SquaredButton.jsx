import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function SquaredButton({
  icon,
  label,
  bg = "",
  activeBg = "",
  onPress = () => {},
  size = 16,
  disabled = false,
}) {
  const [isPressed, setIsPressed] = useState(false);

  const classList = [
    `w-${size}`,
    `h-${size}`,
    `rounded-2xl`,
    `mb-2`,
    `items-center`,
    `justify-center`,
  ];

  if (isPressed && activeBg) {
    classList.push(activeBg);
  } else if (bg) {
    classList.push(bg);
  }

  const finalClasses = classList.join(" ");

  return (
    <Box className="items-center">
      <Pressable
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className={finalClasses} // Pass the properly joined string
        disabled={disabled}
      >
        {icon}
      </Pressable>
      <Text className="text-sm text-black text-center">{label}</Text>
    </Box>
  );
}
