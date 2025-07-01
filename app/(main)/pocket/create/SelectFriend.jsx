import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, ActivityIndicator } from "react-native";
import { useState, useMemo, useEffect } from "react";

import FriendList from "@/components/common/FriendList";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { usePocketStore } from "@/stores/pocketStore";
import { useFriendshipStore } from "@/stores/friendshipStore";
import CustomGoalIcon from "@/assets/images/icon/customGoal.png";
import { WondrColors } from "@/utils/colorUtils";

export default function SelectFriendScreen() {
  const { id: pocketId } = useLocalSearchParams();
  const isInviteMode = !!pocketId;

  // --- Store Hooks ---
  const { invitePocketMembers, isMemberActionLoading } = usePocketStore();
  const { friends: allFriends } = useFriendshipStore();
  const {
    selectedFriends: globalSelectedFriends,
    setSelectedFriends: setGlobalSelectedFriends,
  } = usePocketStore();

  // --- State Management for the two flows ---
  const [localSelectedFriends, setLocalSelectedFriends] = useState([]);

  const currentSelection = isInviteMode
    ? localSelectedFriends
    : globalSelectedFriends;
  const setSelection = isInviteMode
    ? setLocalSelectedFriends
    : setGlobalSelectedFriends;

  const handleSelectionChange = (selectedNames) => {
    const newSelectedFriendObjects = allFriends.filter((friend) =>
      selectedNames.includes(friend.name),
    );
    setSelection(newSelectedFriendObjects);
  };

  const selectedFriendNames = useMemo(
    () => currentSelection.map((f) => f.name),
    [currentSelection],
  );

  const handleLanjut = async () => {
    console.log("--- handleLanjut called. isInviteMode:", isInviteMode);

    if (isInviteMode) {
      // --- Flow 2: Invite to Existing Pocket ---
      if (!pocketId || currentSelection.length === 0) {
        console.log("Invite mode: No pocketId or no selection. Aborting.");
        return;
      }

      console.log(
        "Invite mode: Attempting to invite friends to pocketId:",
        pocketId,
        currentSelection,
      );
      try {
        const result = await invitePocketMembers(pocketId, currentSelection);
        console.log("Invite API call result:", result);

        if (result) {
          console.log("Invite successful, navigating back.");
          router.back(); // Navigate back on success
        } else {
          console.warn("Invite result was falsy, not navigating back.");
        }
      } catch (e) {
        console.error("Failed to invite members on screen:", e);
      }
    } else {
      // --- Flow 1: Create Pocket ---
      console.log("Create mode: Navigating back.");
      router.back();
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="w-full flex-1 flex-col px-6 pt-5">
        {currentSelection.length > 0 && (
          <VStack space="md" className="mb-6">
            <Heading size={"md"} className="font-bold">
              {isInviteMode
                ? "Undang teman ke pocket"
                : "Siapa aja isi group kamu?"}
            </Heading>
            <HStack>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                {currentSelection.map((friend) => (
                  <Pressable
                    key={friend.id}
                    onPress={() => {
                      // setSelection((prev) =>
                      //   prev.filter((f) => f.id !== friend.id),
                      // );
                      console.log("belum bisa di press", friend);
                    }}
                  >
                    <Center className="w-5 h-5 z-10 self-end bg-red-wondr rounded-full absolute right-3 top-0">
                      <Text className="text-white font-bold text-center -mt-1">
                        -
                      </Text>
                    </Center>
                    <Avatar
                      size="lg"
                      className="bg-[#F2F2F2] items-center justify-center mr-4"
                    >
                      <AvatarFallbackText className="text-[#58ABA1] text-center item-center justify-center">
                        {friend.name}
                      </AvatarFallbackText>
                    </Avatar>
                  </Pressable>
                ))}
              </ScrollView>
            </HStack>
          </VStack>
        )}

        <Pressable
          onPress={() => {
            router.push("/pocket/create/NewUser");
          }}
          className="flex flex-row gap-5 items-center mb-6 active:bg-gray-100 rounded-xl"
        >
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
          mode="checkbox"
          selectedFriends={selectedFriendNames}
          setSelectedFriends={handleSelectionChange}
        />

        <PrimaryButton
          // --- FIX: The `onPress` prop has been corrected to `buttonAction` ---
          // This ensures the handleLanjut function is correctly passed to the button component.
          buttonAction={handleLanjut}
          buttonTitle={
            isInviteMode && isMemberActionLoading ? (
              <ActivityIndicator color={WondrColors.white} />
            ) : (
              "Lanjut"
            )
          }
          disabled={
            isInviteMode &&
            (isMemberActionLoading || currentSelection.length === 0)
          }
          className="mt-3 mb-8"
        />
      </Box>
    </Box>
  );
}
