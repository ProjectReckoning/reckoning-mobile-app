import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import SavingDecorator from "@/assets/images/decorators/savingDecorator.svg";

export default function PocketTypeCard({
  type,
  subject,
  content,
  source,
  className,
  selected = false,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <Card
        size="md"
        variant="filled"
        className={`bg-white border-[1.5px] ${selected ? "border-green-select" : "border-gray-wondr-border"} ${className} overflow-hidden rounded-xl`}
      >
        <Box className="bg-tosca-wondr w-40 h-9 justify-center pl-5 rounded-br-2xl rounded-tl-xl absolute -left-1 -top-1">
          <Text className="font-semibold text-lg text-black">{subject}</Text>
        </Box>
        <Box className="w-24 absolute -right-7">
          {source ? source : <SavingDecorator width={60} height={60} />}
        </Box>
        <Heading size="md" className="mt-7 mb-1">
          {type}
        </Heading>
        <Text size="sm">{content}</Text>
      </Card>
    </Pressable>
  );
}
