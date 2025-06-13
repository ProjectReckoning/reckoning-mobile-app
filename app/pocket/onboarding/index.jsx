import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import PrimaryButton from "../../../components/common/buttons/PrimaryButton";

import OnboardingIllustration from "@/assets/images/onboarding.png";

export default function PocketOnboarding() {
  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push("pocket/onboarding/CreatePocketOnboarding");
  };

  return (
    <Box className="flex-1 bg-white px-6 justify-between">
      <Box className="flex flex-col">
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
          className="w-full justify-center items-center mt-10 mb-10"
          alt="onboarding-illustration"
        />

        <Heading size="xl" bold="true" className="font-extrabold">
          Wujudkan Tujuan Bersama dengan Mudah!
        </Heading>

        <Text className="text-lg mt-2">
          Kumpulkan dana dengan keluarga atau teman untuk impian bersama, lebih
          terencana dan juga transparan.
        </Text>
      </Box>

      <PrimaryButton
        buttonAction={handleNext}
        buttonTitle="Mulai Sekarang"
        className="mb-8"
      />
    </Box>
  );
}
