import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

export default function FeatureButton({
  icon,
  label,
  bg,
  bgPressed,
  onPress,
  border,
  className = "",
  textClassName = "",
  disabled = false,
}) {
  return (
    <Pressable onPress={onPress} className="w-full px-3" disabled={disabled}>
      {({ pressed }) => (
        <VStack space="sm" className="items-center">
          <Box
            className={`w-16 h-16 rounded-2xl items-center justify-center ${bg} ${border && " border-2 border-[#C7C7C7]"} ${pressed && bgPressed} ${className}`}
          >
            {icon}
          </Box>
          <Text
            className={`text-sm text-black font-bold text-center ${textClassName}`}
          >
            {label}
          </Text>
        </VStack>
      )}
    </Pressable>
  );
}
