import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
