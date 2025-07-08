import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
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

import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { ScrollView, ActivityIndicator } from "react-native";
import { useCallback } from "react";
import { Check } from "lucide-react-native";

import { useFriendshipStore } from "@/stores/friendshipStore";
import { WondrColors } from "@/utils/colorUtils";

// Helper to group friends by first initial
const groupFriendsByInitial = (list) => {
  if (!list || list.length === 0) return {};
  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name, "id"));
  return sorted.reduce((acc, friend) => {
    const initial = friend.name[0].toUpperCase();
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push(friend);
    return acc;
  }, {});
};

export default function FriendList({
  mode = "checkbox",
  selectedFriends,
  setSelectedFriends,
  lockedMemberIds,
  setDestination,
}) {
  const { id } = useLocalSearchParams();

  // Fetching data from the friendship store
  const { friends, isLoadingFriends, friendsError, fetchAllFriends } =
    useFriendshipStore();

  useFocusEffect(
    useCallback(() => {
      fetchAllFriends();
    }, [fetchAllFriends]),
  );

  const groupedFriends = groupFriendsByInitial(friends);
  const initials = Object.keys(groupedFriends).sort();

  // Render States
  if (isLoadingFriends) {
    return (
      <Box className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
      </Box>
    );
  }

  if (friendsError) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {friendsError}</Text>
      </Box>
    );
  }

  if (friends.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>No friends found.</Text>
        <Text className="text-gray-500 text-center mt-2">
          Add some friends to see them here!
        </Text>
      </Box>
    );
  }

  return (
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
            {mode === "checkbox" && (
              // FIX: The component is now fully controlled by its parent.
              <CheckboxGroup
                value={selectedFriends} // Directly use the prop for value
                onChange={(keys) => {
                  if (setSelectedFriends) {
                    setSelectedFriends(keys); // Directly call the parent's state setter
                  }
                }}
              >
                <VStack space="md">
                  {groupedFriends[initial].map((friend) => (
                    <Checkbox
                      key={friend.id}
                      value={friend.name}
                      isDisabled={
                        lockedMemberIds && lockedMemberIds.includes(friend.id)
                      }
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
                          Account: {friend.account_number}
                        </Text>
                      </Box>
                      <CheckboxIndicator className="w-6 h-6 rounded-full ml-2">
                        <CheckboxIcon as={Check} />
                      </CheckboxIndicator>
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            )}
            {mode === "button" && (
              <VStack space="md">
                {groupedFriends[initial].map((friend) => (
                  <Pressable
                    key={friend.id}
                    onPress={() => {
                      if (setSelectedFriends) {
                        setSelectedFriends([friend.name]);
                      }
                      if (setDestination) {
                        setDestination({
                          id: friend.id,
                          name: friend.name,
                          category: {
                            bank: {
                              name: "Wondr Bank",
                              type: "Friend Account",
                            },
                          },
                        });
                      }
                      if (id) {
                        router.push(`/(main)/pocket/${id}/transaction/Detail`);
                      }
                    }}
                    className="flex-row items-center px-0 py-3 bg-white active:active:bg-gray-50"
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
                      <Text size="lg" className="font-bold text-black">
                        {friend.name}
                      </Text>
                      <Text size="sm" className="text-[#848688]">
                        Account: {friend.account_number}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </VStack>
            )}
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
}
