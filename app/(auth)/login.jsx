import { ImageBackground, View } from "react-native";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import LoginBackground from "../../assets/images/background/LoginBackground.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={LoginBackground}
      style={{
        flex: 1,
        marginTop: -insets.top,
        marginBottom: -insets.bottom,
        marginLeft: -insets.left,
        marginRight: -insets.right,
      }}
      resizeMode="cover"
    >
      <View className="flex-1 relative px-8">
        <PrimaryButton
          buttonTitle="Login"
          className="absolute bottom-40 self-center"
        />
      </View>
    </ImageBackground>
  );
}
