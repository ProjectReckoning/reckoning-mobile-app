import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import FriendList from "../../../../components/common/FriendList";

import { usePocketStore } from "../../../../stores/pocketStore";
import CustomGoalIcon from "../../../../assets/images/icon/customGoal.png";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

export default function FriendsList() {
  const [haveFriend, setHaveFriend] = useState(false);
  const selectedFriends = usePocketStore((state) => state.selectedFriends);
  const setSelectedFriends = usePocketStore(
    (state) => state.setSelectedFriends,
  );

  const handleBack = () => {
    router.back();
  };

  const handleMember = () => {
    router.back();
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="w-full flex-1 flex-col px-6 pt-5">
        {/* App Bar */}
        <Box className="flex flex-row justify-between items-center mb-6">
          <Pressable onPress={handleBack}>
            <ArrowLeft size={24} />
          </Pressable>
          <Heading size="lg" className="font-bold">
            Pilih Teman
          </Heading>
          <Box className="w-5 h-5" />
        </Box>

        {haveFriend && (
          <Box className="flex flex-col gap-3 mb-4">
            <Heading size={"md"} className="font-bold">
              Siapa aja isi group kamu?
            </Heading>
          </Box>
        )}

        <Pressable className="flex flex-row gap-5 items-center mb-6 active:bg-gray-100 rounded-xl">
          <Box className="w-14 h-14 rounded-xl border border-gray-300 items-center justify-center">
            <Image
              source={CustomGoalIcon}
              alt={"custom-goal-icon"}
              className="w-full h-12"
              resizeMode="contain"
            />
          </Box>
          <Box className="flex flex-col">
            <Heading size="md" className="font-bold">
              Teman baru
            </Heading>
            <Text size="sm" className="text-[#848688]">
              Kamu bisa tambah anggota baru ke dalam pocket.
            </Text>
          </Box>
        </Pressable>

        <FriendList
          selectedFriends={selectedFriends}
          setSelectedFriends={setSelectedFriends}
        />

        <PrimaryButton
          buttonAction={handleMember}
          buttonTitle="Lanjut"
          className="mt-3 mb-8"
        />
      </Box>
    </Box>
  );
}
