import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import pocketTypeDecorator from "../../../assets/images/decorators/pocket-type.png";

export default function PocketTypeCard({
  pocketType,
  title,
  content,
  className,
  selected = false,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <Card
        size="md"
        variant="filled"
        className={`bg-white border-[1.5px] ${selected ? "border-[#007BE5]" : "border-gray-300"} ${className} overflow-hidden rounded-xl`}
      >
        <Box className="bg-tosca-wondr w-40 h-9 justify-center pl-5 rounded-br-2xl rounded-tl-xl absolute -left-1 -top-1">
          <Text className="font-semibold text-lg text-black">{pocketType}</Text>
        </Box>
        <Box className="w-24 absolute -right-4">
          <Image
            source={pocketTypeDecorator}
            alt="pocket-type-decorator"
            className="w-full h-16"
            resizeMode="contain"
          />
        </Box>
        <Heading size="md" className="mt-7 mb-1">
          {title}
        </Heading>
        <Text size="sm">{content}</Text>
      </Card>
    </Pressable>
  );
}
