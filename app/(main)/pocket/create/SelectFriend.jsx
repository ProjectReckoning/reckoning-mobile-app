import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import React, { useState, useMemo, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, ActivityIndicator } from "react-native";

import FriendList from "@/components/common/FriendList";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { usePocketStore } from "@/stores/pocketStore";
import { useFriendshipStore } from "@/stores/friendshipStore";
import CustomGoalIcon from "@/assets/images/icon/customGoal.png";
import { WondrColors } from "@/utils/colorUtils";
import { Check } from "lucide-react-native";

const CustomToast = React.forwardRef(function CustomToast(props, ref) {
  const { id, ...rest } = props;
  const toastId = "toast-" + id;

  return (
    <Toast
      ref={ref}
      nativeID={toastId}
      className="bg-white p-4 rounded-xl shadow-lg"
      {...rest}
    >
      <Box className="flex-row items-center gap-3">
        <Box className="rounded-full h-6 w-6 items-center justify-center bg-green-500">
          <Check size={12} color="white" />
        </Box>

        <ToastTitle className="text-black font-medium">
          Undangan berhasil terkirim
        </ToastTitle>
      </Box>
    </Toast>
  );
});

export default function SelectFriendScreen() {
  const { id: pocketId } = useLocalSearchParams();
  const isInviteMode = !!pocketId;
  const toast = useToast();

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
      if (!pocketId || currentSelection.length === 0) {
        return;
      }

      try {
        const result = await invitePocketMembers(pocketId, currentSelection);
        console.log("Invite API call result:", result);

        if (result) {
          console.log("Invite successful, showing toast...");
          toast.show({
            placement: "top",
            duration: 2000,
            render: ({ id }) => {
              return <CustomToast id={id} />;
            },
          });
          router.back();

          setTimeout(() => {
            console.log("Navigating back after delay.");
          }, 1500);
        } else {
          console.warn("Invite result was falsy, something went wrong.");
        }
      } catch (e) {
        console.error("Failed to invite members on screen:", e);
      }
    } else {
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
                    disabled={isInviteMode}
                    className="data-[disabled=true]:opacity-100"
                    onPress={() => {
                      if (!isInviteMode) {
                        console.log("belum bisa di press", friend);
                        const newNames = selectedFriendNames.filter(
                          (name) => name !== friend.name,
                        );
                        handleSelectionChange(newNames);
                      }
                    }}
                  >
                    {!isInviteMode && (
                      <Center className="w-5 h-5 z-10 self-end bg-red-wondr rounded-full absolute right-3 top-0">
                        <Text className="text-white font-bold text-center -mt-1">
                          -
                        </Text>
                      </Center>
                    )}
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
