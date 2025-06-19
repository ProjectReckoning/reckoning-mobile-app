import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "../../../utils/colorUtils";

export default function GoalCard({
  title,
  subtitle,
  icon,
  className,
  iconClassName,
  selected = false,
  onPress,
  isCustom = false,
}) {
  return (
    <Pressable onPress={onPress}>
      <Card
        size="md"
        variant="filled"
        className={`w-full h-fit min-h-48 justify-end bg-white border-[1.5px] ${selected ? "border-[#007BE5]" : "border-gray-300"} overflow-hidden rounded-xl ${isCustom ? "border-dashed" : ""} ${className}`}
      >
        {isCustom ? (
          <Box className="flex-1 items-center justify-center">
            <CirclePlus
              color={WondrColors["tosca-wondr"]}
              size={40}
              strokeWidth={2}
            />
          </Box>
        ) : (
          <Image
            source={icon}
            alt={`${title}-icon`}
            className={`w-32 h-32 absolute -top-1 -right-1 ${iconClassName}`}
            resizeMode="contain"
          />
        )}
        <Heading size="md" className="leading-tight">
          {title}
        </Heading>
        <Text size="xs">{subtitle}</Text>
      </Card>
    </Pressable>
  );
}
