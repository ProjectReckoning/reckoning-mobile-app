// app/(auth)/_layout.jsx
import { Stack } from "expo-router";
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
        headerLeft: ({ canGoBack, onPress }) =>
          canGoBack ? (
            <Pressable onPress={onPress} hitSlop={20}>
              <ArrowLeft size={24} color="black" />
            </Pressable>
          ) : null,
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="loginForm" options={{ title: "Login" }} />
    </Stack>
  );
}
