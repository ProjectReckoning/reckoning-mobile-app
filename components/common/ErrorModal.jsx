import React from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";

import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function ErrorModal({
  isOpen,
  onClose,
  imageSource,
  title,
  subtitle,
  // This prop now controls whether ANY buttons are shown
  showSpecialActions = false,
  // Props for the action buttons (only used if showSpecialActions is true)
  specialButton1Title,
  specialButton1Action,
  specialButton2Title,
  specialButton2Action,
}) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <VStack
          w="$full"
          style={{ paddingBottom: 30, paddingHorizontal: 20, gap: 12 }}
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
            className="text-black font-bold"
          >
            {title}
          </Text>

          <Text size="sm" textAlign="center">
            {subtitle}
          </Text>

          {/* The entire button section is now conditional */}
          {showSpecialActions && (
            <Box w="$full" mt={10}>
              <PrimaryButton
                buttonAction={specialButton1Action}
                buttonTitle={specialButton1Title}
                className="mb-2"
                textClassName="text-black font-bold text-base"
              />
              <PrimaryButton
                buttonAction={specialButton2Action}
                buttonTitle={specialButton2Title}
                buttonColor="bg-white"
                className="border border-gray-300"
                textClassName="text-black font-bold"
              />
            </Box>
          )}
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}
