import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

export default function ReusableCellContent({
  icon,
  title,
  description,
  date,
  iconContainerBgColor,
  titleClassName,
  descriptionClassName,
  dateClassName,
  isRead = false,
  onPress = () => {},
}) {
  const finalTitleClass = `text-lg text-black font-bold ${isRead && "font-normal"} ${titleClassName || ""}`;
  const finalDescriptionClass = `  ${descriptionClassName || "text-black font-normal text-base"}`;
  const finalDateClass = `font-base text-sm text-black ${dateClassName || ""}`;

  const bgColor = iconContainerBgColor || "bg-light-gray-wondr";

  return (
    <Pressable
      onPress={onPress}
      className="flex-row gap-5 items-center flex-1 pr-2 active:bg-gray-50"
    >
      <VStack>
        {!isRead && (
          <Badge
            className="z-10 self-end h-4 w-4 bg-orange-wondr rounded-full -mb-3 -mr-0.5"
            variant="solid"
          />
        )}
        <Box
          className={`justify-center items-center rounded-full w-14 h-14 ${bgColor}`}
        >
          {icon}
        </Box>
      </VStack>

      <Box className="flex-1">
        <VStack space="xxs">
          <Text className={finalTitleClass}>{title}</Text>
          <Text
            className={finalDescriptionClass}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          {date && (
            <Text
              className={finalDateClass}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {date}
            </Text>
          )}
        </VStack>
      </Box>
    </Pressable>
  );
}
