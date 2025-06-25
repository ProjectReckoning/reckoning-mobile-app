// app/(main)/_layout.jsx
import { useEffect } from "react";
import { Pressable } from "react-native";
import { Stack, router } from "expo-router";
import useAuthStore from "@/stores/authStore";
import { ArrowLeft } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function MainLayout() {
  const { registerForPushNotificationsAsync } = usePushNotifications();
  const token = useAuthStore((state) => state.token);
  const type = useTransactionStore((state) => state.type);
  const { pocketType, goalTitle } = usePocketStore();

  useEffect(() => {
    if (!token) {
      router.replace("/(auth)/login");
    } else {
      // Call the registration function once the user is confirmed to be logged in.
      console.log(
        "User is authenticated, attempting to register for push notifications...",
      );
      registerForPushNotificationsAsync();
    }
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { paddingLeft: 24 },
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_right",
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      {/* ===== Non-Transaction Screens ===== */}
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home/notification/index"
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="home/notification/[id]/index"
        options={{ title: "Notification Detail" }}
      />
      <Stack.Screen
        name="pocket/all/index"
        options={{
          title: "My Pockets",
        }}
      />
      <Stack.Screen
        name="pocket/[id]/index"
        options={{ title: "Pocket Details" }}
      />
      <Stack.Screen
        name="pocket/onboarding/index"
        options={{ title: "Get Started" }}
      />
      <Stack.Screen
        name="pocket/onboarding/CreatePocketOnboarding"
        options={{ title: "Create Pocket" }}
      />
      <Stack.Screen
        name="pocket/create/index"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: WondrColors["tosca-wondr-light-translucent"],
          },
        }}
      />
      <Stack.Screen
        name="pocket/create/SelectGoal"
        options={{
          title: pocketType,
          headerStyle: {
            backgroundColor: WondrColors["tosca-wondr-light-translucent"],
          },
        }}
      />
      <Stack.Screen
        name="pocket/create/Details"
        options={{
          title: pocketType === "Spending" ? "Pocket Spending" : goalTitle,
          headerStyle: {
            backgroundColor: WondrColors["tosca-wondr-light-translucent"],
          },
        }}
      />
      <Stack.Screen
        name="pocket/create/SelectFriend"
        options={{ title: "Pilih Teman" }}
      />
      <Stack.Screen
        name="pocket/create/Customization"
        options={{
          title: "Pocket kamu",
          headerStyle: {
            backgroundColor: "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="pocket/create/NewUser"
        options={{
          title:
            type?.id === "transfer"
              ? "Transfer ke penerima baru"
              : "Tambah teman baru",
        }}
      />
      <Stack.Screen
        name="pocket/create/NewUserConfirmation"
        options={{
          title:
            type?.id === "transfer"
              ? "Konfirmasi penerima baru"
              : "Konfirmasi teman baru",
        }}
      />

      {/* ===== Transaction Screens (Updated Paths) ===== */}
      <Stack.Screen
        name="pocket/[id]/transaction/topup/index"
        options={{ title: "Top Up" }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/transfer/index"
        options={{
          title: "Transfer",
          headerStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/withdraw/index"
        options={{ title: "Withdraw" }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/Detail"
        options={{ title: `Detail ${type.name}` }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/Confirmation"
        options={{ title: `Konfirmasi ${type.name}` }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/PinCode"
        options={{ title: "" }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/Statement"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pocket/[id]/transaction/Receipt"
        options={{
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="pocket/[id]/scheduleTransfer/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pocket/transaction/setTarget/index"
        options={{ title: "Change Target" }}
      />
    </Stack>
  );
}
