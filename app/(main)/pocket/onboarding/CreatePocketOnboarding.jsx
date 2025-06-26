import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { useEffect } from "react";
import RoleIcon from "@/assets/images/icon/pocketcreation2.png";
import ScheduleIcon from "@/assets/images/icon/pocketcreation1.png";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransparentIcon from "@/assets/images/icon/pocketcreation3.png";
import OnboardingDecorator from "@/assets/images/decorators/onboarding2.png";

export default function CreatePocketOnboarding() {
  useEffect(() => {
    console.log("CreatePocketOnboarding: Component mounted");
  }, []);

  const GoToCreatePocket = () => {
    router.push("pocket/create");
  };

  return (
    <Box className="flex-1 bg-white -z-20">
      <Box className="flex flex-col pt-5">
        <Box className="w-full h-64 -z-10">
          <Image
            source={OnboardingDecorator}
            alt="onboarding-decorator"
            className="w-full h-80 relative -top-16"
            resizeMode="fit"
          />
        </Box>
      </Box>

      <Box className="flex-1 px-6 mt-10 justify-between">
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
        <PrimaryButton
          buttonAction={GoToCreatePocket}
          buttonTitle="Lanjut"
          className="mb-8"
        />
      </Box>
    </Box>
  );
}
