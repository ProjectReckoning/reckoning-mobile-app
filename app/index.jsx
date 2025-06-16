import { Redirect } from "expo-router";

export default function AppEntry() {
  return <Redirect href="/(auth)/login" />;
}
