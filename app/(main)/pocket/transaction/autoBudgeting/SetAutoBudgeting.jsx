import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import AppBar from "../../../../../components/common/AppBar";

import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import PrimaryButton from "../../../../../components/common/buttons/PrimaryButton";

export default function SetAutoBudgeting() {
  const handleBack = () => {
    router.back();
  };
  return (
    <Box className="flex-1 bg-white px-6 py-5 justify-between">
      <AppBar title="Set Auto Budgeting" onBackPress={handleBack} />
      <Text className="text-lg mb-4">
        Setel jadwal dan jumlah tabungan rutinmu secara otomatis tiap bulan atau
        minggu!
      </Text>
    </Box>
  );
}
