import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { ScrollView } from "react-native";

import WondrLogo from "@/assets/images/wondr-logo.png";
import LogoutIcon from "@/assets/images/icon/logout.png";

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

          <Box className="flex flex-row items-center">
            <Button size="xs" className="rounded-full bg-[#F9F9F9]">
              <Box className="flex flex-column items-center justify-center gap-1.5">
                <Image
                  size="2xs"
                  source={LogoutIcon}
                  className="aspect-square w-4"
                  alt="logout"
                />
                <ButtonText className="text-black">Notifikasi</ButtonText>
              </Box>
            </Button>
            <Button size="xs" className="rounded-full bg-[#F9F9F9]">
              <Box className="flex flex-column items-center justify-center gap-1.5">
                <Image
                  size="2xs"
                  source={LogoutIcon}
                  className="aspect-square w-4"
                  alt="logout"
                />
                <ButtonText className="text-black">Bukti Transaksi</ButtonText>
              </Box>
            </Button>
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
        <Box className="flex flex-row my-5">
          <Text className="font-extrabold text-xl">
            Rekening transaksi kamu
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
}
