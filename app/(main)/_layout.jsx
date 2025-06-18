// app/(main)/_layout.jsx
import { Stack, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";

export default function MainLayout() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log(
      "MainLayout: Checking token. Current token:",
      token ? "present" : "null",
    );
    if (!token) {
      console.log("MainLayout: No token found, redirecting to login.");
      router.replace("/(auth)/login");
    }
  }, [token]);

  // If no token, return null or a minimal loading indicator until redirection happens
  if (!token) {
    console.log("MainLayout: Token is null, returning null for rendering.");
    return null;
  }

  console.log("MainLayout: Token is present, rendering main Stack.");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
        {/* Add other main screens here as needed */}
      </Stack>
    </SafeAreaView>
  );
}
