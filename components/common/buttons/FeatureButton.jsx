import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function FeatureButton({ icon, label, bg, onPress, border }) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <Box
        className={`w-16 h-16 rounded-2xl mb-2 items-center justify-center${border ? " border-2 border-[#C7C7C7]" : ""}`}
        style={{ backgroundColor: bg }}
      >
        {icon}
      </Box>
      <Text className="text-sm text-black font-bold text-center">{label}</Text>
    </Pressable>
  );
}
