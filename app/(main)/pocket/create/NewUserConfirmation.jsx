import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useFriendshipStore } from "@/stores/friendshipStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function NewUserConfirmation() {
  // --- CHANGE: Get data from route params and friendship store ---
  const { addedPhoneNumber } = useLocalSearchParams();
  const friends = useFriendshipStore((state) => state.friends);

  // Find the full friend object from the store using the phone number
  const newFriend = useMemo(() => {
    if (!addedPhoneNumber || !friends) return null;
    return friends.find((friend) => friend.phone_number === addedPhoneNumber);
  }, [addedPhoneNumber, friends]);

  if (!newFriend) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Text>Data teman tidak ditemukan.</Text>
      </Box>
    );
  }

  // --- CHANGE: This function now just goes back to the friend selection screen ---
  const handleGoBack = () => {
    router.back();
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
            {/* Display account number from the friend object */}
            <Text size="sm" className="text-[#848688]">
              Wondr Account - {newFriend.account_number || ""}
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
            {newFriend.account_number || ""}
          </Heading>
        </VStack>
      </VStack>

      <PrimaryButton
        buttonAction={handleGoBack}
        buttonTitle="Lanjut"
        className={"my-5"}
      />
    </Box>
  );
}
