import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from "@/components/ui/checkbox";

import { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { ArrowLeft, Check } from "lucide-react-native";

import { friendsList } from "../../../../utils/friendsListData";
import CustomGoalIcon from "../../../../assets/images/icon/customGoal.png";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

// Helper to group friends by first initial
const groupFriendsByInitial = (list) => {
  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name, "id"));
  return sorted.reduce((acc, friend) => {
    const initial = friend.name[0].toUpperCase();
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push(friend);
    return acc;
  }, {});
};

export default function FriendsList() {
  const [values, setValues] = useState([]);
  const [haveFriend, setHaveFriend] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleMember = () => {
    router.back();
  };

  // Group and sort friends
  const groupedFriends = groupFriendsByInitial(friendsList);
  const initials = Object.keys(groupedFriends).sort();

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

        <Box className="flex-1 pb-2">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          >
            {initials.map((initial) => (
              <Box key={initial} className="mb-5">
                <Heading size={"md"} className="font-bold mb-1">
                  {initial}
                </Heading>
                <Divider className="mb-2" />
                <CheckboxGroup
                  value={values}
                  onChange={(keys) => setValues(keys)}
                >
                  <VStack space="md">
                    {groupedFriends[initial].map((friend) => (
                      <Checkbox
                        key={friend.id}
                        value={friend.name}
                        className="flex-row items-center px-0 py-3 rounded-lg bg-white"
                      >
                        <Avatar
                          size={"md"}
                          className="bg-[#F2F2F2] items-center justify-center mr-3"
                        >
                          <AvatarFallbackText className="text-[#58ABA1]">
                            {friend.name}
                          </AvatarFallbackText>
                        </Avatar>
                        <Box className="flex-1 flex flex-col">
                          <CheckboxLabel className="text-lg font-bold">
                            {friend.name}
                          </CheckboxLabel>
                          <Text size="sm" className="text-[#848688]">
                            {friend.bank} - {friend.id}
                          </Text>
                        </Box>
                        <CheckboxIndicator className="w-6 h-6 rounded-full ml-2">
                          <CheckboxIcon as={Check} />
                        </CheckboxIndicator>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>
            ))}
          </ScrollView>
        </Box>

        <PrimaryButton
          buttonAction={handleMember}
          buttonTitle="Lanjut"
          className="mt-3 mb-8"
        />
      </Box>
    </Box>
  );
}
