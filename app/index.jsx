// app/index.js
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import "@/global.css"; // Assuming global.css is relative to 'app' directory

import useAuthStore from "@/stores/authStore"; // Use alias for consistency

export default function AppEntry() {
  const token = useAuthStore((state) => state.token);
  const loadToken = useAuthStore((state) => state.loadToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AppEntry: Initializing authentication...");
      try {
        await loadToken(); // Load token from SecureStore and update Zustand
      } catch (e) {
        console.error("AppEntry: Error loading token:", e);
        // If an error occurs during token loading (e.g., SecureStore issue),
        // we'll assume not authenticated and proceed to login.
      } finally {
        setLoading(false);
        console.log("AppEntry: Authentication initialization complete.");
      }
    };

    initializeAuth();
  }, []); // Only run once on component mount

  if (loading) {
    console.log("AppEntry: Still loading, showing spinner...");
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F2F2F2",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Checking authentication...</Text>
      </View>
    );
  }

  // Redirect based on token status
  console.log("AppEntry: Redirecting. Token present:", !!token);
  return (
    <Redirect
      href={token ? "/(main)/pocket/transaction/transfer" : "/(auth)/login"}
    />
  );
}
