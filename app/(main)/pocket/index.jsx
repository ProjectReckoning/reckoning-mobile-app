import { Redirect } from "expo-router";
import { allPocket } from "../../../utils/mockData/mockPocketDb";
import { id, registerTranslation } from "react-native-paper-dates";

registerTranslation("id", id);

export default function PocketIndex() {
  const hasPocket = allPocket && allPocket.length > 0;

  if (hasPocket) {
    return <Redirect href="/(main)/pocket/all" />;
  }
  return <Redirect href="/(main)/pocket/onboarding" />;
}
