import { Image } from "@/components/ui/image";
import TapCashIcon from "../assets/images/icon/tapcash-logo.png";
import PocketIcon from "../assets/images/icon/pocket.png";
import {
  Send,
  HandCoins,
  WalletMinimal,
  CreditCard,
  Earth,
  LayoutGrid,
} from "lucide-react-native";
import { router } from "expo-router";

const GoToPocket = async () => {
  router.push("/pocket");
};

export const features = [
  { icon: <Send />, label: "Transfer", bg: "#6EE0DB" },
  {
    icon: (
      <Image
        size="sm"
        source={TapCashIcon}
        className="aspect-square w-4"
        alt="logout"
      />
    ),
    label: "TapCash",
    bg: "#FF8500",
  },
  { icon: <HandCoins />, label: "Bayar & Beli", bg: "#A3B8FF" },
  { icon: <WalletMinimal />, label: "E-Wallet", bg: "#6EE0DB" },
  { icon: <CreditCard />, label: "Virtual Account", bg: "#6EE0DB" },
  { icon: <Earth />, label: "Transfer Luar Negeri", bg: "#6EE0DB" },
  {
    icon: (
      <Image
        size="2xs"
        source={PocketIcon}
        className="aspect-square w-4"
        alt="logout"
      />
    ),
    label: "Pocket",
    bg: "#C7B6F9",
    onPress: GoToPocket,
  },
  { icon: <LayoutGrid />, label: "Lihat Semua", bg: "#fff", border: true },
];
