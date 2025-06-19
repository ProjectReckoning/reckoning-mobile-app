import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function ReusableCellContent({
  icon,
  title,
  description,
  date,
}) {
  return (
    <Box className="flex-row gap-5 items-center flex-1 pr-2">
      <Box className="justify-center items-center rounded-full bg-light-gray-wondr w-16 h-16">
        <Box>{icon}</Box>
      </Box>

      <Box>
        <VStack space="xxs">
          <Text className="font-bold text-lg text-black">{title}</Text>

          <Text
            className="font-base text-base text-black"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </Text>

          {date && (
            <Text
              className="font-base text-sm text-black"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {date}
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
