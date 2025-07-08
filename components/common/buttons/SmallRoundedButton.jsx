import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function SmallRoundedButton({
  handleOnPress = () => {},
  bgColor = "bg-light-gray-wondr", // Default background color for non-active state
  activeBgColor = "bg-lime-wondr", // Color for the active state
  title,
  isActive = false, // New prop: defaults to false
  className = "py-2 px-4",
}) {
  // Determine the background class based on the isActive prop
  const backgroundClass = isActive ? activeBgColor : bgColor;

  return (
    <>
      <Pressable onPress={handleOnPress}>
        <Box
          // Apply the determined backgroundClass.
          // The `active:${activeBgColor}` part is for press feedback and will still work.
          className={`rounded-full ${backgroundClass} active:${activeBgColor} ${className}`}
        >
          <Text>{title}</Text>
        </Box>
      </Pressable>
    </>
  );
}
