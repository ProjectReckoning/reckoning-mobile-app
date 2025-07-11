// app/(auth)/login.jsx
import { ImageBackground, View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import LoginBackground from "@/assets/images/background/LoginBackground.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  const goToLoginForm = () => {
    router.push("/(auth)/loginForm");
  };

  return (
    <ImageBackground
      source={LoginBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" translucent={true} />

      {/* This View is now a Flexbox container.
        - flex: 1: Takes up all available space.
        - justifyContent: 'flex-end': Pushes its children (the button) to the bottom.
        - paddingBottom: Pushes the button up from the bottom edge by the safe area amount + your desired margin.
      */}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: insets.bottom + 75, // 75px margin from the safe area
          paddingHorizontal: 32, // px-8 from your original design
        }}
      >
        {/* The button no longer needs any special positioning styles itself. */}
        <PrimaryButton buttonAction={goToLoginForm} buttonTitle="Login" />
      </View>
    </ImageBackground>
  );
}
