import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import OnboardingIllustration from "@/assets/images/onboarding.png";

export default function PocketOnboarding() {
  const handleBack = () => {
    router.back();
  };

  return (
    <Box className="flex-1 bg-white px-6">
      <Box className="flex justify-start my-5">
        <Pressable onPress={handleBack}>
          <ArrowLeft size={24} />
        </Pressable>
      </Box>

      <Center className="w-full h-16 mt-2">
        <Progress
          value={40}
          size="xs"
          orientation="horizontal"
          className="w-full h-2"
        >
          <ProgressFilledTrack className="bg-[#3FD8D4] h-2" />
        </Progress>
      </Center>

      <Image
        size="2xl"
        source={OnboardingIllustration}
        className="w-full justify-center items-center mt-12 mb-10"
        alt="onboarding-illustration"
      />

      <Heading size="2xl" bold="true" className="font-extrabold">
        Wujudkan Tujuan Bersama dengan Mudah!
      </Heading>

      <Text className="text-normal mt-5">
        Kumpulkan dana dengan keluarga atau teman untuk impian bersama, lebih
        terencana dan juga transparan.
      </Text>
    </Box>
  );
}
