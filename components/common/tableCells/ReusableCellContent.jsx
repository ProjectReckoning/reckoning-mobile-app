import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
// Tidak perlu mengimpor Icon atau WondrColors di sini

export default function ReusableCellContent({
  icon,
  title,
  description,
  date,
  // Prop untuk menerima warna latar belakang ikon
  iconContainerBgColor,
  // Props untuk kustomisasi className
  titleClassName,
  descriptionClassName,
  dateClassName,
}) {
  const finalTitleClass = `text-lg text-black ${titleClassName || "font-bold text-lg"}`;
  const finalDescriptionClass = `  ${descriptionClassName || "text-black font-semibold text-base"}`;
  const finalDateClass = `font-base text-sm text-black ${dateClassName || ""}`;

  // Tentukan warna latar belakang. Jika tidak ada yang diberikan, gunakan warna abu-abu sebagai default.
  const bgColor = iconContainerBgColor || "bg-light-gray-wondr";

  return (
    <Box className="flex-row gap-5 items-center flex-1 pr-2">
      <Box
        className={`justify-center items-center rounded-full w-16 h-16 ${bgColor}`}
      >
        <Box>{icon}</Box>
      </Box>

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
    </Box>
  );
}
