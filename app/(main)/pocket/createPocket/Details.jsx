import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import GoalDecorator from "../../../../assets/images/decorators/goal-decorator.png";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

export default function Details() {
  const handleBack = () => {
    router.back();
  };

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="w-full h-56 bg-[#C2F0ED]">
        <Box className="w-52 absolute right-0 top-2">
          <Image
            source={GoalDecorator}
            alt="pocket-type-decorator"
            className="w-full h-64"
            resizeMode="contain"
          />
        </Box>

        <Box className="flex-1 flex-col px-6 pt-5 justify-between">
          <VStack space="4xl" reversed={false}>
            <Box className="flex flex-row justify-between items-center">
              <Pressable onPress={handleBack}>
                <ArrowLeft size={24} />
              </Pressable>

              <Heading size="lg" className="text-bold">
                Wisata bersama
              </Heading>

              <Box className="w-5 h-5" />
            </Box>

            <VStack space="xs" reversed={false}>
              <Heading size="xl" className="text-bold">
                Liburan impian kita!
              </Heading>

              <Text className="w-72 text-lg">
                Rencanakan petualangan seru bareng teman-teman!
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>

      <Box className="flex-1 justify-between px-6">
        <Box className="flex flex-col">
          <Heading size="xl" className="font-bold my-8">
            Detail Pocket
          </Heading>
        </Box>
        <PrimaryButton buttonTitle="Lanjut" className="mt-3 mb-8" />
      </Box>
    </Box>
  );
}
