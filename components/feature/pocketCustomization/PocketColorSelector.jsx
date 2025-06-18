import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";

export default function PocketColorSelector({
  colors,
  selectedColorIndex,
  setSelectedColorIndex,
  setPocketColor,
}) {
  return (
    <VStack space="xl">
      <Text size="lg">Pilih warna pocket kamu</Text>
      <HStack space="md" className="flex-wrap justify-between">
        {colors.map((color, index) => (
          <Pressable
            onPress={() => {
              setPocketColor(color);
              setSelectedColorIndex(
                selectedColorIndex === index ? null : index,
              );
            }}
            key={index}
            className={`w-8 h-8 rounded-full ${color} ${selectedColorIndex === index ? "border-2 border-[#007BE5]" : ""}`}
          ></Pressable>
        ))}
      </HStack>
    </VStack>
  );
}
