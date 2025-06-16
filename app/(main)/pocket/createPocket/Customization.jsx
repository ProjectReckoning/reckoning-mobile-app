import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import {
  Pocket,
  PocketWhite,
  Laptop,
  LaptopWhite,
  Diamond,
  DiamondWhite,
  Airplane,
  AirplaneWhite,
  Moonstar,
  MoonstarWhite,
  Group,
  GroupWhite,
} from "../../../../assets/Icons/PocketIcon";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

const colors = [
  "bg-orange-wondr",
  "bg-yellow-wondr",
  "bg-lime-wondr",
  "bg-tosca-wondr",
  "bg-purple-wondr",
  "bg-pink-wondr",
];

const icons = [Pocket, Laptop, Diamond, Airplane, Moonstar, Group];

export default function Customization() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);

  const handleBack = () => {
    router.back();
  };

  return (
    <Box className="flex-1 bg-white justify-between">
      <Box className="flex flex-col w-full h-fit px-6 py-5 items-center bg-[#F9F9F9]">
        {/* App Bar */}
        <Box className="w-full flex flex-row justify-between items-center mb-6">
          <Pressable onPress={handleBack}>
            <ArrowLeft size={24} />
          </Pressable>
          <Heading size="lg" className="font-bold">
            Pocket kamu
          </Heading>
          <Box className="w-5 h-5" />
        </Box>

        <Box className="w-fit h-fit bg-white border border-gray-300 rounded-2xl p-0">
          <Box className="w-full h-fit rounded-t-2xl p-4 mb-10 bg-[#FFE7CC]">
            <Box className="w-16 h-16 rounded-full bg-orange-wondr items-center justify-center">
              <Icon as={AirplaneWhite} size="xl" className="w-8 h-8" />
            </Box>
            <VStack space="2xs" className="my-7">
              <Heading size={"md"} className="pr-5">
                Pergi ke Korea 2026
              </Heading>
              <Text size={"md"}>Saving pocket</Text>
            </VStack>
          </Box>
        </Box>
      </Box>

      <Box className="flex-1 flex-col mt-5 px-6 justify-between">
        <VStack space="2xl" className="w-full px-3">
          <VStack space="xl">
            <Text size="lg">Pilih warna pocket kamu</Text>
            <HStack space="md" className="flex-wrap justify-between">
              {colors.map((color, index) => (
                <Pressable
                  onPress={() =>
                    setSelectedColorIndex(
                      selectedColorIndex === index ? null : index,
                    )
                  }
                  key={index}
                  className={`w-8 h-8 rounded-full ${color} ${selectedColorIndex === index ? "border-2 border-[#007BE5]" : ""}`}
                ></Pressable>
              ))}
            </HStack>
          </VStack>
          <VStack space="xl">
            <Text size="lg">Pilih ikon pocket kamu</Text>
            <HStack space="md" className="flex-wrap justify-between">
              {icons.map((icon, index) => (
                <Pressable
                  onPress={() =>
                    setSelectedIconIndex(
                      selectedIconIndex === index ? null : index,
                    )
                  }
                  key={index}
                  className={`w-12 h-12 rounded-full bg-[#F2F2F2] items-center justify-center ${selectedIconIndex === index ? "border-2 border-[#007BE5]" : ""}`}
                >
                  <Icon as={icon} size="sm" />
                </Pressable>
              ))}
            </HStack>
          </VStack>
        </VStack>
        <PrimaryButton buttonTitle="Buat Pocket" className="mt-3 mb-12" />
      </Box>
    </Box>
  );
}
