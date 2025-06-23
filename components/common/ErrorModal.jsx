import React from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box"; // <-- Tambahkan import Box
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";

export default function ErrorModal({
  isOpen,
  onClose,
  imageSource,
  title,
  subtitle,
}) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <VStack
          w="$full"
          style={{ paddingBottom: 30, paddingSide: 20, gap: 7 }}
        >
          <Box w="$full" alignItems="center">
            <Image
              className="w-[250px] h-[167px]"
              source={imageSource}
              resizeMode="contain"
              alt={title || "Error Illustration"}
            />
          </Box>

          <Text
            size="xl"
            fontWeight="$extrabold"
            textAlign="center"
            className="text-black font-bold  "
          >
            {title}
          </Text>

          {/* Subjudul/Deskripsi Error */}
          <Text size="sm" textAlign="center">
            {subtitle}
          </Text>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
