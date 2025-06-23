import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { router } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";
import { friendsList } from "@/utils/mockData/friendsListData";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function NewUserConfirmation() {
  const { newFriend, selectedFriends, setSelectedFriends } = usePocketStore();
  const { type, setDestination } = useTransactionStore();

  if (!newFriend) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Text>Data tidak ditemukan.</Text>
      </Box>
    );
  }

  const GoToNext = () => {
    if (type && type.id === "transfer") {
      setDestination({
        id: newFriend.id,
        name: newFriend.name,
        category: {
          bank: {
            name: newFriend.bank,
            type: "TAPLUS PEGAWAI BNI",
          },
        },
      });
      router.push("/pocket/transaction/Detail");
    } else {
      friendsList.push(newFriend);

      if (!selectedFriends.includes(newFriend.name)) {
        setSelectedFriends([...selectedFriends, newFriend.name]);
      }

      router.push("/pocket/create/SelectFriend");
    }
  };

  return (
    <Box className="flex-1 bg-white justify-between px-6 py-5">
      <VStack space="xl">
        <HStack space="sm" className="justify-center items-center mb-3">
          <Avatar
            size={"md"}
            className="bg-[#F2F2F2] items-center justify-center mr-3"
          >
            <AvatarFallbackText className="text-[#58ABA1]">
              {newFriend.name || ""}
            </AvatarFallbackText>
          </Avatar>
          <Box className="flex-1 flex flex-col">
            <Text size="lg" className="font-bold text-black">
              Sdr {newFriend.name || ""}
            </Text>
            <Text size="sm" className="text-[#848688]">
              {newFriend.bank || ""} - {newFriend.id || ""}
            </Text>
          </Box>
        </HStack>

        <VStack
          space="xs"
          className="border rounded-xl px-5 py-3 border-gray-wondr-border"
        >
          <Text size={"sm"}>Nama bank</Text>
          <Heading size={"md"} className="font-normal">
            BANK NEGARA INDONESIA
          </Heading>
        </VStack>

        <VStack
          space="xs"
          className="border rounded-xl px-5 py-3 border-gray-wondr-border"
        >
          <Text size={"sm"}>Nama nasabah</Text>
          <Heading size={"md"} className="font-normal">
            {newFriend.name || ""}
          </Heading>
        </VStack>

        <VStack
          space="xs"
          className="border rounded-xl px-5 py-3 border-gray-wondr-border"
        >
          <Text size={"sm"}>Nomor rekening</Text>
          <Heading size={"md"} className="font-normal">
            {newFriend.id || ""}
          </Heading>
        </VStack>
      </VStack>

      <PrimaryButton
        buttonAction={GoToNext}
        buttonTitle="Lanjut"
        className={"my-5"}
      />
    </Box>
  );
}
