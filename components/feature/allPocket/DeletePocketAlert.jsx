import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import PocketCard from "../../common/cards/PocketCard";

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
      <AlertDialogContent className="bg-white px-6 pt-8 pb-6 rounded-2xl">
        <AlertDialogHeader>
          <Heading size="2xl" className="text-center font-bold mb-2">
            Hapus pocket?
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-6">
          <Text size="md" className="text-center text-gray-500 mb-6">
            Pocket dan riwayat transaksi akan dihapus secara permanen.
          </Text>
          <HStack
            space="xl"
            className="w-full justify-center items-center mb-4"
          >
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
            <Box className="flex-1 ml-4">
              <Text className="font-bold text-xl text-typography-950">
                {pocketName}
              </Text>
              <Text className="text-gray-400 text-base">
                {pocketType} pocket
              </Text>
            </Box>
          </HStack>
        </AlertDialogBody>
        <AlertDialogFooter className="flex-col gap-3">
          <Button
            onPress={onDelete}
            className="bg-red-wondr rounded-full w-full mb-2"
            size="lg"
          >
            <ButtonText className="font-bold text-lg">
              Hapus sekarang
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            onPress={onClose}
            className="rounded-full w-full border-2 border-gray-300"
            size="lg"
          >
            <ButtonText className="font-bold text-lg text-black">
              Batal
            </ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
