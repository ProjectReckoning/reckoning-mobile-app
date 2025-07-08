// components/feature/pocketCustomization/PocketColorSelector.jsx
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";

export default function PocketColorSelector({
  colors,
  selectedIndex,
  setSelectedColorIndex,
}) {
  return (
    <VStack space="xl">
      <Text size="lg">Pilih warna pocket kamu</Text>
      <HStack space="md" className="flex-wrap justify-between">
        {colors.map((color, index) => (
          <Pressable
            onPress={() => {
              setSelectedColorIndex(index);
            }}
            key={index}
            className={`w-8 h-8 rounded-full ${color} ${selectedIndex === index ? "border-2 border-green-select" : ""}`}
          ></Pressable>
        ))}
      </HStack>
    </VStack>
  );
}
