// components/feature/pocketCustomization/PocketIconSelector.jsx
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";

export default function PocketIconSelector({
  iconKeys,
  iconMap,
  selectedIndex,
  setSelectedIconIndex,
}) {
  return (
    <VStack space="xl">
      <Text size="lg">Pilih ikon pocket kamu</Text>
      <HStack space="md" className="flex-wrap justify-between">
        {iconKeys.map((iconKey, index) => (
          <Pressable
            onPress={() => {
              setSelectedIconIndex(index);
            }}
            key={iconKey}
            className={`w-12 h-12 rounded-full bg-[#F2F2F2] items-center justify-center ${selectedIndex === index ? "border-2 border-[#007BE5]" : ""}`}
          >
            <Icon as={iconMap[iconKey]} size="sm" />
          </Pressable>
        ))}
      </HStack>
    </VStack>
  );
}
