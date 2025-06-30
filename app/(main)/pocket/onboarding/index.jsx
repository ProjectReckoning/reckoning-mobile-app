import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import OnboardingIllustration from "@/assets/images/decorators/onboarding.svg";

export default function PocketOnboarding() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const hasNavigated = useRef(false);

  useEffect(() => {
    const duration = 5000;
    const interval = 20;
    const step = 100 / (duration / interval);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !hasNavigated.current) {
      hasNavigated.current = true;
      router.push("/(main)/pocket/onboarding/CreatePocketOnboarding");
    }
  }, [progress]);

  const handleNext = () => {
    hasNavigated.current = true;
    router.push("/(main)/pocket/onboarding/CreatePocketOnboarding");
  };

  return (
    <Box className="flex-1 bg-white px-6 justify-between pt-5">
      <Box className="flex flex-col">
        <Center className="w-full h-16 mt-2">
          <Progress
            value={progress}
            size="xs"
            orientation="horizontal"
            className="w-full h-2"
          >
            <ProgressFilledTrack className="bg-[#3FD8D4] h-2" />
          </Progress>
        </Center>

        <Center className="w-full h-fit pt-8 pb-12">
          <OnboardingIllustration width="100%" height={200} />
        </Center>

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
