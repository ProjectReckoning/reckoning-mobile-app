// app/(main)/home/index.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonText } from "@/components/ui/button";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { Bell } from "lucide-react-native";
import TabBar from "../../../components/common/TabBar";
import WondrLogo from "@/assets/images/wondr-logo.png";
import LogoutIcon from "@/assets/images/icon/logout.png";
import BillIcon from "@/assets/images/icon/bill-icon.png";
import { useState } from "react";
import useAuthStore from "@/stores/authStore";
import AccountCard from "@/components/feature/home/AccountCard";
import SelectedFeature from "@/components/feature/home/SelectedFeature";

// --- NEW: Import our reusable ScreenContainer ---
import ScreenContainer from "@/components/common/ScreenContainer";

const tabList = [
  { key: "insight", label: "Insight" },
  { key: "transaksi", label: "Transaksi" },
  { key: "growth", label: "Growth" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("transaksi");
  const removeToken = useAuthStore((state) => state.removeToken);

  const handleLogout = async () => {
    console.log("Logout button pressed. Attempting to clear token...");
    await removeToken();
    console.log("Token cleared. Redirecting to login screen.");
    router.replace("/(auth)/login");
  };

  return (
    // --- FIX: Use ScreenContainer as the root element ---
    <ScreenContainer className="bg-white">
      {/* Header */}
      {/* The `pt-3` is removed from here as ScreenContainer handles all top spacing */}
      <Box className="flex flex-column pb-3 px-6 bg-[#F9F9F9]">
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
            onPress={handleLogout}
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
        <TabBar
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          size={16}
          backgroundColor="#FFF"
          marginVertical={0}
        />
      </Box>

      <ScrollView className="flex-1 px-6">
        <AccountCard />
        <SelectedFeature />
      </ScrollView>
    </ScreenContainer>
  );
}
