// app/(main)/_layout.jsx
import { useEffect } from "react";
import { Pressable } from "react-native";
import { Stack, router } from "expo-router";
import useAuthStore from "@/stores/authStore";
import { ArrowLeft } from "lucide-react-native";
import { useTransactionStore } from "@/stores/transactionStore";

export default function MainLayout() {
  const token = useAuthStore((state) => state.token);
  const type = useTransactionStore((state) => state.type);

  useEffect(() => {
    if (!token) {
      router.replace("/(auth)/login");
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
        // 1. Hide the default back button globally
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { paddingLeft: 24 },
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_right",
        // 2. Provide a custom back button that performs a normal "back" action
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="home/index"
        // The home screen should not have a back button
        options={{ headerShown: false }}
      />
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
      <Stack.Screen name="pocket/create/index" options={{ title: "" }} />
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
      <Stack.Screen
        name="pocket/transaction/topup/index"
        options={{ title: "Top Up" }}
      />
      <Stack.Screen
        name="pocket/transaction/transfer/index"
        options={{
          title: "Transfer",
          headerStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name="pocket/transaction/withdraw/index"
        options={{ title: "Withdraw" }}
      />
      <Stack.Screen
        name="pocket/transaction/Detail"
        options={{ title: `Detail ${type.name}` }}
      />
      <Stack.Screen
        name="pocket/transaction/Confirmation"
        options={{ title: `Konfirmasi ${type.name}` }}
      />
      <Stack.Screen name="pocket/transaction/PinCode" options={{ title: "" }} />
      <Stack.Screen
        name="pocket/transaction/Statement"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
