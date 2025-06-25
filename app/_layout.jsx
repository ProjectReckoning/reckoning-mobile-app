// app/_layout.jsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/components/useColorScheme";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "@/global.css";

// --- Imports for Global Error Modal ---
import ErrorModal from "@/components/common/ErrorModal";
import useErrorStore from "@/stores/errorStore";
import ErrorImage from "@/assets/images/ErrorImage.png";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { visible, status, message, hideError } = useErrorStore();

  console.log(`[RootLayout] Rendering. Error modal visibility is: ${visible}`);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode={colorScheme === "dark" ? "light" : "light"}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
        </ThemeProvider>

        {/* --- FIX: The ErrorModal is now MOVED INSIDE the GluestackUIProvider --- */}
        <ErrorModal
          isOpen={visible}
          onClose={hideError}
          title={status || "Something Went Wrong"}
          subtitle={message || "An unexpected error has occurred."}
          imageSource={ErrorImage}
        />
      </GluestackUIProvider>
      <StatusBar style="dark" />

      {/* --- The ErrorModal was previously here, which was incorrect --- */}
    </SafeAreaProvider>
  );
}
