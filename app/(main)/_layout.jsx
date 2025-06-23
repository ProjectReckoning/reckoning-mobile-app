// app/(main)/_layout.jsx
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";

export default function MainLayout() {
  const token = useAuthStore((state) => state.token);

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
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { paddingLeft: 24 },
        headerBackImageSource: () => <ArrowLeft size={24} color="black" />,
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home/notification/index"
        options={{ title: "Notifications" }}
      />
      <Stack.Screen
        name="home/notification/[id]/index"
        options={{ title: "Notification Detail" }}
      />

      {/* --- KEY CHANGE: Simplified this screen definition --- */}
      {/* It no longer needs a custom back button because the stack is now correct. */}
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

      {/* Hide the default header for the create flow wrapper */}
      <Stack.Screen
        name="pocket/create/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
