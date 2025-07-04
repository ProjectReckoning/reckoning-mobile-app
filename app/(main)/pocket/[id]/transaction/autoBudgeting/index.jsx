import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import AppBar from "@/components/common/AppBar";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import AutoBudgetingIllustration from "@/assets/images/decorators/auto-budgeting-image.png";

export default function AutoBudgeting() {
  const { id } = useLocalSearchParams();

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
      router.push(
        `/(main)/pocket/${id}/transaction/autoBudgeting/SetAutoBudgeting`,
      );
    }
  }, [progress]);

  const handleNext = () => {
    hasNavigated.current = true;
    router.push(
      `/(main)/pocket/${id}/transaction/autoBudgeting/SetAutoBudgeting`,
    );
  };

  return (
    <Box className="flex-1 bg-white px-6 py-5 justify-between">
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

        <Image
          source={AutoBudgetingIllustration}
          className="w-full h-64 mb-6"
          resizeMode="contain"
          alt="Auto Budgeting Illustration"
        />

        <Heading size="xl" bold="true" className="font-extrabold">
          Jadwalkan Tabunganmu, Raih Tujuanmu!
        </Heading>

        <Text className="text-lg mt-2">
          Atur jadwal dan jumlah tabungan rutinmu secara otomatis tiap bulan
          atau minggu!
        </Text>
      </Box>

      <PrimaryButton
        buttonAction={handleNext}
        buttonTitle="Set auto-budgeting"
        className="mb-8"
        textClassName="text-black font-bold text-base"
      />
    </Box>
  );
}
