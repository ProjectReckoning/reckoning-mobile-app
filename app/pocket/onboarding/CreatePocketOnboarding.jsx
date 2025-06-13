import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import PrimaryButton from "../../../components/common/buttons/PrimaryButton";
import ScheduleIcon from "../../../assets/images/icon/pocketcreation1.png";
import RoleIcon from "../../../assets/images/icon/pocketcreation2.png";
import TransparentIcon from "../../../assets/images/icon/pocketcreation3.png";
import OnboardingDecorator from "../../../assets/images/decorators/onboarding.png";

export default function CreatePocketOnboarding() {
  const handleBack = () => {
    router.back();
  };

  return (
    <Box className="flex-1 bg-white justify-stretch -z-20">
      <Box className="flex flex-col">
        <Box className="flex flex-row px-6 pt-5 justify-between items-center bg-[#C2F0ED]">
          <Pressable onPress={handleBack}>
            <ArrowLeft size={24} />
          </Pressable>

          <Heading size="lg" className="text-bold">
            Buat Pocket
          </Heading>

          <Box className="w-5 h-5" />
        </Box>
        <Box className="w-full h-64 -z-10">
          <Image
            source={OnboardingDecorator}
            alt="onboarding-decorator"
            className="w-full h-80 relative -top-16"
            resizeMode="fit"
          />
        </Box>
      </Box>

      <Box className="flex-1 px-6 mt-5 justify-between">
        <Box className="flex">
          <Heading size="xl" bold="true" className="font-extrabold mb-5">
            Kelola Impian Finansial Bersama Lebih Mudah!
          </Heading>

          <VStack space="lg" reversed={false}>
            <HStack space="lg" className="items-center overflow-hidden">
              <Image
                size="sm"
                source={ScheduleIcon}
                alt="onboarding-illustration"
              />
              <VStack space="xs" reversed={false} className="flex-1">
                <Heading size="md" bold="true" className="font-bold">
                  Dana Patungan Otomatis & Terjadwal
                </Heading>

                <Text className="text-sm">
                  Kumpulkan dana dengan keluarga atau teman untuk impian
                  bersama, lebih terencana dan juga transparan.
                </Text>
              </VStack>
            </HStack>

            <HStack space="lg" className="items-center overflow-hidden">
              <Image
                size="sm"
                source={RoleIcon}
                alt="onboarding-illustration"
              />
              <VStack space="xs" reversed={false} className="flex-1">
                <Heading size="md" bold="true" className="font-bold">
                  Tentukan Peran Tiap Anggota
                </Heading>

                <Text className="text-sm">
                  Nikmati kontrol penuh dengan peran (Admin, Spender, Viewer)
                  yang bisa disesuaikan untuk setiap anggota.
                </Text>
              </VStack>
            </HStack>

            <HStack space="lg" className="items-center overflow-hidden">
              <Image
                size="sm"
                source={TransparentIcon}
                alt="onboarding-illustration"
              />
              <VStack space="xs" reversed={false} className="flex-1">
                <Heading size="md" bold="true" className="font-bold">
                  Transparansi Penuh, Tanpa Drama
                </Heading>

                <Text className="text-sm">
                  Lacak setiap transaksi dan progres tujuan secara real-time,
                  bangun akuntabilitas antar anggota.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
        <PrimaryButton buttonTitle="Lanjut" className="mb-8" />
      </Box>
    </Box>
  );
}
