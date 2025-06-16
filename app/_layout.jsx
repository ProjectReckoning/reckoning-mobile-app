// app/_layout.jsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Stack, Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

export { ErrorBoundary } from "expo-router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Original: await new Promise((resolve) => setTimeout(resolve, 1500));
      // Original: const userToken = "temp_token";
      // To ensure immediate rendering for debugging, we skip the async wait and token check.
      // You can uncomment the original lines once the blank screen issue is resolved.
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      const userToken = "temp_token"; //
      if (userToken) {
        setIsAuthenticated(true);
      }
      setIsLoading(false); //
    };
    // Original: checkAuthStatus();
    // For debugging, we don't need to call it if isLoading is already false
    // checkAuthStatus();
  }, []);

  return { isAuthenticated, isLoading };
};

export default function RootLayout() {
  const fontsLoaded = true;
  const fontError = undefined;

  const { isAuthenticated, isLoading } = useAuth();
  const colorScheme = useColorScheme();

  // Original: useEffect(() => {
  // Original:   if (fontError) throw fontError;
  // Original: }, [fontError]);
  // Commenting out this useEffect as useFonts is bypassed for debugging.
  // useEffect(() => {
  //   if (fontError) throw fontError;
  // }, [fontError]);

  // useEffect for SplashScreen.hideAsync() was removed as per previous request

  // Original: if (!fontsLoaded || isLoading) {
  // Original:   return null;
  // Original: }
  // Commenting out this conditional return for debugging.
  // This ensures the RootLayout always attempts to render its children.
  // if (!fontsLoaded || isLoading) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" backgroundColor="#F2F2F2" />
      <GluestackUIProvider mode={colorScheme === "dark" ? "light" : "light"}>
        <ThemeProvider
          value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
        >
          {isAuthenticated ? <Redirect href="/(main)/home" /> : <Slot />}
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
