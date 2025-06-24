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

// --- NEW: Import useLocalSearchParams to get the pocket ID from the URL ---
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Check } from "lucide-react-native";

import { friendsList } from "@/utils/mockData/friendsListData";

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

export default function FriendList({
  mode = "checkbox",
  selectedFriends,
  setSelectedFriends,
  setDestination,
}) {
  // --- NEW: Get the dynamic 'id' from the current route ---
  const { id } = useLocalSearchParams();
  const [values, setValues] = useState(selectedFriends || []);

  // Group and sort friends
  const groupedFriends = groupFriendsByInitial(friendsList);
  const initials = Object.keys(groupedFriends).sort();

  useEffect(() => {
    // This check prevents an unnecessary update on initial render
    if (setSelectedFriends) {
      setSelectedFriends(values);
    }
  }, [values, setSelectedFriends]);

  useEffect(() => {
    setValues(selectedFriends || []);
  }, [selectedFriends]);

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
                      defaultIsChecked={false}
                      isChecked={values.includes(friend.name) ? true : false}
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
                              name: friend.bank,
                              type: "TAPLUS PEGAWAI BNI",
                            },
                          },
                        });
                      }
                      // --- KEY CHANGE: Use the dynamic ID for navigation ---
                      if (id) {
                        router.push(`/(main)/pocket/${id}/transaction/Detail`);
                      } else {
                        console.error(
                          "FriendList: Pocket ID is missing, cannot navigate.",
                        );
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
                        {friend.bank} - {friend.id}
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
