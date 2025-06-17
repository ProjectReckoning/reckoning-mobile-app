// app/(auth)/login.jsx
import { ImageBackground, View } from "react-native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import LoginBackground from "@/assets/images/background/LoginBackground.png";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function LoginScreen() {
  const goToLoginForm = () => {
    router.push("/(auth)/loginForm");
  };

  return (
    <ImageBackground
      source={LoginBackground}
      style={{
        flex: 1,
      }}
      resizeMode="cover"
    >
      <StatusBar style="light" translucent={true} />

      <View className="flex-1 relative px-8">
        <PrimaryButton
          buttonAction={goToLoginForm}
          buttonTitle="Login"
          className="absolute bottom-40 self-center"
        />
      </View>
    </ImageBackground>
  );
}
