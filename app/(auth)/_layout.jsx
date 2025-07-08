// app/(auth)/_layout.jsx
import { Stack, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";

export default function AuthLayout() {
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
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
        ),
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { paddingLeft: 24 },
        contentStyle: { backgroundColor: "white" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="login"
        options={{ headerShown: false, headerTransparent: true }}
      />
      <Stack.Screen name="loginForm" options={{ title: "Login" }} />
    </Stack>
  );
}
