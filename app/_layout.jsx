// app/_layout.js
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Removed SafeAreaView import
import { Stack } from "expo-router";

// Global UI providers
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "@/global.css"; // Global styles

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Removed SafeAreaView component. Content now directly within SafeAreaProvider. */}
        {/* Global UI Providers */}
        <GluestackUIProvider mode={colorScheme === "dark" ? "light" : "light"}>
          <ThemeProvider
            value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
          >
            {/* This Stack renders the current route group (like index, or (auth), or (main)) */}
            <Stack
              screenOptions={{
                headerShown: false,
                StatusBarBackgroundColor: "#ffffff",
                StatusBarStyle: "dark",
                ContentStyle: { backgroundColor: "#f2f2f2" },
                animation: "slide_from_right",
              }}
            />
            <StatusBar style="dark" />
          </ThemeProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </View>
  );
}
