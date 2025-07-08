// components/feature/pocketCustomization/PocketIconSelector.jsx
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { personalIconMap } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIconMap } from "@/utils/pocketCustomization/businessPocketIconUtils";

export default function PocketIconSelector({
  icons,
  selectedIndex,
  setSelectedIconIndex,
  isBusiness = false,
}) {
  return (
    <VStack space="xl">
      <Text size="lg">Pilih ikon pocket kamu</Text>
      <HStack space="md" className="flex-wrap justify-between">
        {icons.map((iconKey, index) => {
          const IconComponent = isBusiness
            ? businessIconMap[iconKey.toLowerCase()]
            : personalIconMap[iconKey.toLowerCase()];
          return (
            <Pressable
              onPress={() => {
                setSelectedIconIndex(index);
              }}
              key={iconKey}
              className={`w-12 h-12 rounded-full bg-[#F2F2F2] items-center justify-center ${selectedIndex === index ? "border-2 border-green-select" : ""}`}
            >
              {IconComponent && (
                <IconComponent width="40%" height="40%" color="#848688" />
              )}
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
}
