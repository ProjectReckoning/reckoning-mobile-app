import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import CustomGoalIcon from "../../../assets/images/icon/customGoal.png";

export default function GoalCard({
  title,
  subtitle,
  icon,
  className,
  imageClassName,
  selected = false,
  onPress,
  isCustom = false,
}) {
  return (
    <Pressable onPress={onPress} disabled={isCustom}>
      <Card
        size="md"
        variant="filled"
        className={`w-full h-fit min-h-48 justify-end bg-white border-[1.5px] ${selected ? "border-[#007BE5]" : "border-gray-300"} overflow-hidden rounded-xl ${isCustom ? "border-dashed" : ""} ${className}`}
      >
        {isCustom ? (
          <>
            <Box className="flex-1 items-stretch justify-center">
              <Image
                source={CustomGoalIcon}
                alt={"custom-goal-icon"}
                className="w-full h-16"
                resizeMode="contain"
              />
            </Box>
            <Heading size="md" className="">
              Custom Goal
            </Heading>
            <Text size="xs">
              Buat tujuan unikmu sendiri dan wujudkan bersama!
            </Text>
          </>
        ) : (
          <>
            <Image
              source={icon}
              alt={`${title}-icon`}
              className={`w-32 h-32 absolute -top-1 -right-1 ${imageClassName}`}
              resizeMode="contain"
            />
            <Heading size="md" className="leading-tight">
              {title}
            </Heading>
            <Text size="xs">{subtitle}</Text>
          </>
        )}
      </Card>
    </Pressable>
  );
}
