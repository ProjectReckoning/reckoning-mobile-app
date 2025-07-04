// utils/mockData/featureData.js
import { router } from "expo-router";
import { WondrColors } from "../colorUtils";
import { Image } from "@/components/ui/image";
import VAIcon from "../../assets/images/icon/VA_icon.svg";
import PocketIcon from "../../assets/images/icon/pocket.png";
import TapCashIcon from "../../assets/images/icon/tapcash-logo.png";
import {
  Send,
  HandCoins,
  WalletMinimal,
  CreditCard,
  Earth,
  LayoutGrid,
  UserRoundPlus,
  FileText,
  Share2,
  UsersRound,
  Download,
  CalendarCog,
} from "lucide-react-native";

export const features = [
  {
    icon: <Send />,
    label: "Transfer",
    bg: "bg-tosca-wondr-translucent",
    bgPressed: "bg-tosca-wondr-dark",
  },
  {
    icon: (
      <Image
        size="sm"
        source={TapCashIcon}
        className="aspect-square w-4"
        alt="TapCash Icon"
      />
    ),
    label: "TapCash",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
  },
  {
    icon: <HandCoins />,
    label: "Bayar & Beli",
    bg: "bg-[#A3B8FF]",
    bgPressed: "bg-[#A4A9FD]",
  },
  {
    icon: <WalletMinimal />,
    label: "E-Wallet",
    bg: "bg-tosca-wondr-translucent",
    bgPressed: "bg-tosca-wondr-dark",
  },
  {
    icon: <CreditCard />,
    label: "Virtual Account",
    bg: "bg-tosca-wondr-translucent",
    bgPressed: "bg-tosca-wondr-dark",
  },
  {
    icon: <Earth />,
    label: "Transfer Luar Negeri",
    bg: "bg-tosca-wondr-translucent",
    bgPressed: "bg-tosca-wondr-dark",
  },
  {
    icon: (
      <Image
        size="2xs"
        source={PocketIcon}
        className="aspect-square w-4"
        alt="Pocket Icon"
      />
    ),
    label: "Pocket",
    bg: "bg-purple-wondr-translucent",
    bgPressed: "bg-purple-wondr-dark",
    // The onPress property has been correctly removed.
  },
  {
    icon: <LayoutGrid />,
    label: "Lihat Semua",
    bg: "#fff",
    bgPressed: "bg-slate-300",
    border: true,
  },
];

export const transactionFeatures = [
  {
    icon: <UserRoundPlus />,
    label: "Simpan Penerima",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
  },
  {
    icon: <FileText />,
    label: "Bukti Transaksi",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
    onPress: () => router.push("pocket/[id]/transaction/Receipt"),
  },
  {
    icon: <Share2 />,
    label: "Bagikan",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
  },
];

export const scheduleTrxFeatures = [
  {
    icon: <CalendarCog />,
    label: "Schedule",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
    onPress: () => router.push("pocket/[id]/transferSchedule"),
  },
];

export const receiptFeatures = [
  {
    icon: <Download />,
    label: "Download",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
  },
  {
    icon: <Share2 />,
    label: "Bagikan",
    bg: "bg-orange-wondr",
    bgPressed: "bg-orange-wondr-dark",
  },
];

export const transferFeatures = [
  {
    icon: <UserRoundPlus size={28} color={WondrColors["green-wondr-dark"]} />,
    label: "Penerima Baru",
    bg: "#fff",
    bgPressed: "bg-slate-300",
    border: true,
    className: "border-light-gray-wondr",
    textClassName: "text-xs",
    onPress: () => router.push("/pocket/create/NewUser"),
  },
  {
    icon: <VAIcon width={28} height={28} fill={"#fff"} />,
    label: "Virtual Account",
    bg: "#fff",
    border: true,
    className: "border-light-gray-wondr",
    textClassName: "text-xs",
  },
  {
    icon: (
      <UsersRound size={28} color={WondrColors["dark-gray-wondr-deactive"]} />
    ),
    label: "Member Pocket",
    bg: "#fff",
    border: true,
    className: "border-light-gray-wondr",
    textClassName: "text-xs",
  },
];
