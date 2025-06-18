import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Link, LinkText } from "@/components/ui/link";

import FeatureButton from "../common/buttons/FeatureButton";
import { features } from "../../utils/featureData";

export default function SelectedFeature() {
  return (
    <Box className="flex flex-col gap-1 my-5">
      {/* Title */}
      <Box className="flex flex-row my-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Fitur pilihan kamu</Text>
        <Link href="">
          <LinkText className="text-sm text-[#FF7F00] font-bold">Atur</LinkText>
        </Link>
      </Box>

      {/* Feature Grid */}
      <Box className="flex flex-row flex-wrap justify-between">
        {features.map((featureProps, i) => (
          <Box key={i} className="w-1/4 mb-6 items-center">
            <FeatureButton {...featureProps} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
