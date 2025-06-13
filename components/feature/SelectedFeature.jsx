import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Link, LinkText } from "@/components/ui/link";
import FeatureCard from "../common/FeatureCard";
import { features } from "../../utils/featureData";

// import TapCashIcon from "../../assets/images/icon/tapcash-logo.png";
// import PocketIcon from "../../assets/images/icon/pocket.png";

// import { Send } from "lucide-react-native";

export default function SelectedFeature() {
  return (
    <Box className="flex flex-col gap-1 my-5">
      {/* Title */}
      <Box className="flex flex-row my-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Fitur pilihan kamu</Text>
        <Link href="#">
          <LinkText className="text-sm text-[#FF7F00] font-bold">Atur</LinkText>
        </Link>
      </Box>

      {/* <FeatureCard icon={PocketIcon} label="Pocket" bg="#C7B6F9" /> */}

      {/* Feature Grid */}
      <Box className="flex flex-row flex-wrap justify-between">
        {features.map((f, i) => (
          <Box key={i} className="w-1/4 mb-6 items-center">
            <FeatureCard {...f} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
