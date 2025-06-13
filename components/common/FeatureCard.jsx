import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function FeatureCard({ icon, label, bg, onPress }) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <Box
        className={`w-16 h-16 rounded-2xl mb-2 items-center justify-center`}
        style={{ backgroundColor: bg }}
      >
        {icon}
      </Box>
      <Text className="text-sm text-black font-bold text-center">{label}</Text>
    </Pressable>
  );
}
