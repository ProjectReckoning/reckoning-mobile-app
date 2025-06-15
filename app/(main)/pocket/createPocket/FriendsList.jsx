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
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="flex-1 flex-col px-8 pt-5 justify-between">
        <Box className="flex-1 justify-stretch gap-8">
          {/* App Bar */}
          <Box className="flex flex-row justify-between items-center">
            <Pressable onPress={handleBack}>
              <ArrowLeft size={24} />
            </Pressable>

            <Heading size="lg" className="font-bold">
              Pilih Teman
            </Heading>

            <Box className="w-5 h-5" />
          </Box>

          {haveFriend && (
            <Box className="flex flex-col gap-3">
              <Heading size={"md"} className="font-bold">
                Siapa aja isi group kamu?
              </Heading>
            </Box>
          )}

          <Pressable className="flex flex-row gap-5 items-center">
            <Box className="w-14 h-14 rounded-xl border border-gray-300 items-center justify-center">
              <Image
                source={CustomGoalIcon}
                alt={"custom-goal-icon"}
                className="w-full h-12"
                resizeMode="contain"
              />
            </Box>
            <Box className="flex flex-col gap-0">
              <Heading className="font-bold">Teman baru</Heading>
              <Text size="sm" className="text-[#848688]">
                Kamu bisa tambah anggota baru ke dalam pocket.
              </Text>
            </Box>
          </Pressable>

          <Box className="flex-1 justify-stretch pb-3">
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingRight: 20 }}
              style={{ marginRight: -20 }}
            >
              {initials.map((initial) => (
                <Box key={initial} className="flex flex-col gap-2 mb-7">
                  <Heading size={"lg"} className="font-bold">
                    {initial}
                  </Heading>
                  <Divider className="mb-3" />
                  <CheckboxGroup
                    value={values}
                    onChange={(keys) => setValues(keys)}
                  >
                    <VStack space="2xl">
                      {groupedFriends[initial].map((friend) => (
                        <Checkbox
                          key={friend.id}
                          value={friend.name}
                          className="justify-between items-center"
                        >
                          <Box className="flex flex-row gap-5">
                            <Avatar
                              size={"md"}
                              className="bg-[#F2F2F2] items-center justify-center"
                            >
                              <AvatarFallbackText className="text-[#58ABA1]">
                                {friend.name}
                              </AvatarFallbackText>
                            </Avatar>
                            <Box className="flex flex-col">
                              <CheckboxLabel className="text-xl font-bold">
                                {friend.name}
                              </CheckboxLabel>
                              <Text size="sm" className="text-[#848688]">
                                {friend.bank} - {friend.id}
                              </Text>
                            </Box>
                          </Box>
                          <CheckboxIndicator className="w-6 h-6 rounded-full">
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
