import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { router } from "expo-router";
import { ScrollView } from "react-native";
import FriendList from "@/components/common/FriendList";

import { usePocketStore } from "@/stores/pocketStore";
import CustomGoalIcon from "@/assets/images/icon/customGoal.png";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function FriendsList() {
  const { selectedFriends, setSelectedFriends } = usePocketStore();

  const handleBack = () => {
    router.push("pocket/create/Details");
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="w-full flex-1 flex-col px-6 pt-5">
        {selectedFriends.length > 0 && (
          <VStack size="2xl" className="mb-6">
            <Heading size={"md"} className="font-bold mb-3">
              Siapa aja isi group kamu?
            </Heading>
            <HStack size="2xl" className="w-full overflow-hidden">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
              >
                {selectedFriends.map((friend, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      // Remove the friend from selectedFriends
                      setSelectedFriends(
                        selectedFriends.filter((f) => f !== friend),
                      );
                    }}
                  >
                    <Avatar
                      size="lg"
                      className={
                        "border-2 border-outline-0 bg-[#F2F2F2] items-center justify-center mr-3"
                      }
                    >
                      <Badge
                        className="z-10 self-end w-4 h-4 bg-red-wondr rounded-full -mr-1 items-center justify-center"
                        variant="solid"
                      >
                        <BadgeText className="text-white text-xs">-</BadgeText>
                      </Badge>
                      <AvatarFallbackText className="text-[#58ABA1]">
                        {friend}
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
            router.push("pocket/create/NewUser");
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
          selectedFriends={selectedFriends}
          setSelectedFriends={setSelectedFriends}
        />

        <PrimaryButton
          buttonAction={handleBack}
          buttonTitle="Lanjut"
          className="mt-3 mb-8"
        />
      </Box>
    </Box>
  );
}
