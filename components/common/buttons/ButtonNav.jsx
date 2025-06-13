import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

export default function ButtonNav({ onPress, text, className = "" }) {
  return (
    <Pressable
      onPress={onPress}
      className={`w-full h-14 bg-[#3FD8D4] items-center justify-center rounded-3xl ${className}`}
    >
      <Text className="text-xl font-bold">{text}</Text>
    </Pressable>
  );
}
