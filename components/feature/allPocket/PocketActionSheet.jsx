import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import PocketCard from "../../common/cards/PocketCard";
import PrimaryButton from "../../common/buttons/PrimaryButton";

export default function PocketActionSheet({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  pocketName,
  pocketType,
  icon,
  color,
}) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="flex bg-white w-full px-8 pt-3 pb-10">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {/* Pocket preview */}
        <HStack space="xl" className="w-full justify-start items-center my-8">
          <PocketCard
            mode="icon"
            pocketName={pocketName}
            pocketType={pocketType}
            color={color}
            icon={icon}
            iconSize="8"
            whiteSpace="mb-5"
          />
          <Divider orientation="vertical" className="h-2/3" />
          <VStack space="xs" className="gap-0">
            <Heading size={"xl"}>
              {pocketName ? pocketName : "Nama Pocket"}
            </Heading>
            <Text size={"md"}>{pocketType} pocket</Text>
          </VStack>
        </HStack>

        {/* Edit */}
        <PrimaryButton
          buttonAction={() => {
            onEdit();
            onClose();
          }}
          buttonTitle="Ubah pocket"
          className="bg-yellow-wondr mb-3 active:bg-yellow-wondr-dark"
        />

        {/* Delete */}
        <PrimaryButton
          buttonAction={() => {
            onDelete();
            onClose();
          }}
          buttonTitle="Hapus pocket"
          className="bg-white border-2 border-red-wondr mb-4 active:bg-red-wondr"
          textPressable="text-white"
        />
      </ActionsheetContent>
    </Actionsheet>
  );
}
