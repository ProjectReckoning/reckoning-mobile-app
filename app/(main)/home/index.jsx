// app/(main)/home/index.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonText } from "@/components/ui/button";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { Bell } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";

import useAuthStore from "@/stores/authStore";
import TabBar from "@/components/common/TabBar";
import { WondrColors } from "@/utils/colorUtils";
import { useGlobalStore } from "@/stores/globalStore";
import AccountCard from "@/components/feature/home/AccountCard";
import { useTransactionStore } from "@/stores/transactionStore";
import { useNotificationStore } from "@/stores/notificationStore";
import SelectedFeature from "@/components/feature/home/SelectedFeature";
import DashboardPocketCard from "@/components/feature/home/DashboardPocketCard";
import {
  notificationData,
  getUnreadCount,
} from "@/utils/notification/notification";

import QRISicon from "@/assets/images/QRIS.svg";
import WondrLogo from "@/assets/images/wondr-logo.png";
import LogoutIcon from "@/assets/images/icon/logout.png";
import BillIcon from "@/assets/images/icon/bill-icon.png";

const tabList = [
  { key: "insight", label: "Insight" },
  { key: "transaksi", label: "Transaksi" },
  { key: "growth", label: "Growth" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("transaksi");
  const { user, removeToken, fetchUser } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setSource } = useTransactionStore();

  const setSavColor = useCallback(() => {
    useGlobalStore.getState().setSavColor("bg-[#F9F9F9]");
    return () => {
      useGlobalStore.getState().setSavColor("bg-white");
    };
  }, []);
  useFocusEffect(setSavColor);

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetchUser(); // Re-fetch user data
      await useNotificationStore.getState().loadReadIds(); // Optional: refresh notification state
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    useNotificationStore.getState().loadReadIds();
  }, []);

  const readIds = useNotificationStore((state) => state.readIds);
  const unreadCount = getUnreadCount(readIds, notificationData);

  // Fetch user data every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (user) {
        // Set a default source for transaction
        setSource({
          id: user?.user_id,
          name: (user?.name || "").toUpperCase(),
          balance: user?.balance || 0,
          category: {
            bank: {
              name: "BNI",
              type: "TAPLUS PEGAWAI BNI",
            },
          },
        });
      }
    }, [user]),
  );

  const handleLogout = async () => {
    console.log("Logout button pressed. Attempting to clear token...");
    await removeToken();
    console.log("Token cleared. Redirecting to login screen.");
    router.replace("/(auth)/login");
  };

  const GoToNotification = () => {
    router.push("/(main)/home/notification");
  };

  const GoToQRIS = () => {
    router.push("/(main)/home/qris");
  };

  // Helper to get first name and initials
  const firstName = user?.name?.split(" ")[0] || "";

  return (
    <Box className="bg-white flex-1">
      {/* Header */}
      <Box className="flex flex-column pt-5 pb-3 px-6 bg-[#F9F9F9]">
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
            className="flex flex-row gap-1 bg-white border border-gray-400 rounded-full items-center justify-center data-[active=true]:bg-slate-100"
            onPress={handleLogout}
          >
            <Image
              size="2xs"
              source={LogoutIcon}
              className="aspect-square w-4"
              alt="logout"
            />
            <ButtonText className="text-black data-[active=true]:text-black">
              Keluar
            </ButtonText>
          </Button>
        </Box>

        {/* Greeting */}
        <Box className="flex flex-row items-center justify-between my-9">
          <Box className="flex flex-row gap-2 jus items-center">
            <Avatar
              size={"sm"}
              className="bg-[#F2F2F2] items-center justify-center mr-1"
            >
              <AvatarFallbackText className="text-[#58ABA1]">
                {user?.name}
              </AvatarFallbackText>
            </Avatar>
            <Text className="text-xl font-bold text-gray-800">
              Hi, {firstName}!
            </Text>
          </Box>

          <Box className="flex flex-row items-center justify-center gap-4">
            <Pressable
              onPress={GoToNotification}
              className="items-center justify-center"
            >
              {({ pressed }) => (
                <VStack className="flex flex-column items-center justify-center gap-1.5">
                  {unreadCount > 0 && (
                    <Box className="w-2.5 h-2.5 z-10 self-end bg-orange-wondr rounded-full -mb-3 mr-4" />
                  )}
                  <Bell
                    size={20}
                    color={
                      pressed
                        ? WondrColors["orange-wondr-dark"]
                        : "currentColor"
                    }
                  />
                  <Text
                    className={`text-xs ${pressed ? "text-orange-wondr-dark" : "text-black"}`}
                  >
                    Notifikasi
                  </Text>
                </VStack>
              )}
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

      <ScrollView
        className="px-6"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingRight: 10, paddingBottom: 30 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[WondrColors["tosca-wondr"]]}
            tintColor={WondrColors["tosca-wondr"]}
          />
        }
      >
        <AccountCard user={user} />
        <SelectedFeature />
        <DashboardPocketCard />
      </ScrollView>

      <Pressable className="justify-center items-center" onPress={GoToQRIS}>
        <Center className="w-28 h-fit py-3 rounded-full bg-black absolute bottom-14">
          <QRISicon width="100%" height={18} />
        </Center>
      </Pressable>
    </Box>
  );
}
