// app/(main)/_layout.jsx
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "@/stores/authStore";
import { ArrowLeft } from "lucide-react-native";

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
      // --- FINAL HEADER CONFIGURATION ---
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
        // Let Expo Router handle the back button logic, we just change the icon
        headerBackVisible: true, // Make sure the back button is fundamentally visible
        headerBackTitleVisible: false, // Hide the text like "Back"
        headerLeftContainerStyle: { paddingLeft: 24 }, // Add padding to match your design
        headerBackImageSource: () => (
          // This is a robust way to set a custom back icon
          <ArrowLeft size={24} color="black" />
        ),
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

      <Stack.Screen name="pocket/all/index" options={{ title: "My Pockets" }} />
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
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
