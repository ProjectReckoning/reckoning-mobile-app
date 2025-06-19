import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

import PocketCard from "../../common/cards/PocketCard";
import PrimaryButton from "../../common/buttons/PrimaryButton";

export default function DeletePocketAlert({
  isOpen,
  onClose,
  onDelete,
  pocketName,
  pocketType,
  icon,
  color,
}) {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="bg-white px-6 py-8 rounded-2xl items-center justify-center">
        <AlertDialogHeader>
          <Heading size="xl" className="text-center font-bold">
            Hapus pocket?
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-6">
          <Text size="sm" className="text-center text-dark-gray-wondr my-2">
            Pocket dan riwayat transaksi akan dihapus secara permanen.
          </Text>
          {/* Pocket preview */}
          <HStack
            space="lg"
            className="w-full justify-center items-center my-3"
          >
            <PocketCard
              mode="icon"
              pocketName={pocketName}
              pocketType={pocketType}
              color={color}
              icon={icon}
              iconSize="6"
              whiteSpace="mb-4"
            />
            <Divider orientation="vertical" className="h-2/3" />
            <VStack space="xs" className="gap-0">
              <Heading size={"md"}>
                {pocketName ? pocketName : "Nama Pocket"}
              </Heading>
              <Text size={"sm"}>{pocketType} pocket</Text>
            </VStack>
          </HStack>
        </AlertDialogBody>
        <AlertDialogFooter className="w-full flex-col gap-3">
          {/* Delete */}
          <PrimaryButton
            buttonAction={() => {
              onDelete();
              onClose();
            }}
            buttonTitle="Hapus pocket"
            className="w-full bg-red-wondr mb-1 text-white active:bg-red-wondr-dark"
            textClassName="text-white"
          />
          {/* Edit */}
          <PrimaryButton
            buttonAction={() => {
              onClose();
            }}
            buttonTitle="Batal"
            className="bg-white border border-gray-wondr active:bg-light-gray-wondr"
            textClassName="font-semibold"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
