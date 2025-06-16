import { Redirect } from "expo-router";
import { id, registerTranslation } from "react-native-paper-dates";

registerTranslation("id", id);

export default function PocketIndex() {
  return <Redirect href="/(main)/pocket/onboarding" />;
}
