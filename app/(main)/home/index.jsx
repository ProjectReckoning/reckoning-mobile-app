import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonText } from "@/components/ui/button";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { ScrollView } from "react-native";
import { Bell } from "lucide-react-native";

import WondrLogo from "@/assets/images/wondr-logo.png";
import LogoutIcon from "@/assets/images/icon/logout.png";
import BillIcon from "@/assets/images/icon/bill-icon.png";

import AccountCard from "@/components/feature/AccountCard";
import SelectedFeature from "@/components/feature/SelectedFeature";

export default function Home() {
  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
      <Box className="flex flex-column pt-3 pb-3 px-6 bg-[#F9F9F9]">
        {/* Row 1: wondr icon and logout */}
        <Box className="flex flex-row items-center justify-between">
          <Image
            size="md"
            source={WondrLogo}
            className="aspect-[16/5]"
            alt="wondr-logo"
          />

          <Button
            size="xs"
            className="flex flex-row gap-1 bg-white border border-gray-400 rounded-full items-center justify-center"
          >
            <Image
              size="2xs"
              source={LogoutIcon}
              className="aspect-square w-4"
              alt="logout"
            />
            <ButtonText className="text-black">Keluar</ButtonText>
          </Button>
        </Box>

        {/* Greeting */}
        <Box className="flex flex-row items-center justify-between my-9">
          <Box className="flex flex-row gap-2 jus items-center">
            <Avatar
              size={"sm"}
              className="bg-[#00DDD8] items-center justify-center"
            >
              <AvatarFallbackText className="text-[#0F0F19]">
                Amira Ferial
              </AvatarFallbackText>
            </Avatar>
            <Text className="text-xl font-bold text-gray-800">Hi, Mira!</Text>
          </Box>

          <Box className="flex flex-row items-center justify-center gap-4">
            <Pressable
              onPress={() => {}}
              className="items-center justify-center"
            >
              <Box className="flex flex-column items-center justify-center gap-1.5">
                <Bell size={20} />
                <Text className="text-black text-xs">Notifikasi</Text>
              </Box>
            </Pressable>
            <Pressable
              onPress={() => {}}
              className="items-center justify-center"
            >
              <Box className="flex flex-column items-center justify-center gap-1.5">
                <Image
                  size="2xs"
                  source={BillIcon}
                  className="aspect-square w-4"
                  alt="logout"
                />
                <Text className="text-black text-xs">Bukti Transaksi</Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {/* Menu */}
        <Box className="flex flex-row items-center justify-between bg-white p-1 rounded-full">
          <Center className="bg-white py-3 px-8 rounded-full">
            <Text className="font-normal">Insight</Text>
          </Center>
          <Center className="bg-[#D9F634] py-3 px-8 rounded-full">
            <Text className="font-extrabold">Transaksi</Text>
          </Center>
          <Center className="bg-white py-3 px-8 rounded-full">
            <Text className="font-normal">Growth</Text>
          </Center>
        </Box>
      </Box>

      <ScrollView className="flex-1 px-6">
        <AccountCard />
        <SelectedFeature />
      </ScrollView>
    </Box>
  );
}
