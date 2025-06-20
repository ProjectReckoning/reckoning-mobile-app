import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function ReusableCellContent({
  icon,
  title,
  description,
  date,
  // --- TAMBAHKAN PROPS BARU UNTUK MENERIMA CUSTOM CLASSNAME ---
  titleClassName,
  descriptionClassName,
  dateClassName,
}) {
  // Gabungkan kelas dasar dengan kelas custom yang diberikan melalui props.
  // Jika tidak ada props custom yang diberikan, maka akan menggunakan kelas dasar saja.
  const finalTitleClass = `font-bold text-lg text-black ${titleClassName || ""}`;
  const finalDescriptionClass = `font-base text-base text-black ${descriptionClassName || ""}`;
  const finalDateClass = `font-base text-sm text-black ${dateClassName || ""}`;

  return (
    <Box className="flex-row gap-5 items-center flex-1 pr-2">
      <Box className="justify-center items-center rounded-full bg-light-gray-wondr w-16 h-16">
        <Box>{icon}</Box>
      </Box>

      <Box className="flex-1">
        {/* Tambahkan flex-1 agar teks tidak terpotong jika terlalu panjang */}
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
