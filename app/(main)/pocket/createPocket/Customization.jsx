import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Icon, AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react-native";
import { usePocketStore } from "../../../../stores/pocketStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

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

const colorMap = {
  "bg-orange-wondr": {
    solid: "bg-orange-wondr",
    translucent: "bg-orange-wondr-light-translucent",
  },
  "bg-yellow-wondr": {
    solid: "bg-yellow-wondr",
    translucent: "bg-yellow-wondr-light-translucent",
  },
  "bg-lime-wondr": {
    solid: "bg-lime-wondr",
    translucent: "bg-lime-wondr-light-translucent",
  },
  "bg-tosca-wondr": {
    solid: "bg-tosca-wondr",
    translucent: "bg-tosca-wondr-light-translucent",
  },
  "bg-purple-wondr": {
    solid: "bg-purple-wondr",
    translucent: "bg-purple-wondr-light-translucent",
  },
  "bg-pink-wondr": {
    solid: "bg-pink-wondr",
    translucent: "bg-pink-wondr-light-translucent",
  },
};

const iconKeys = [
  "Pocket",
  "Laptop",
  "Diamond",
  "Airplane",
  "Moonstar",
  "Group",
];
const iconMap = {
  Pocket,
  Laptop,
  Diamond,
  Airplane,
  Moonstar,
  Group,
};
const iconWhiteMap = {
  Pocket: PocketWhite,
  Laptop: LaptopWhite,
  Diamond: DiamondWhite,
  Airplane: AirplaneWhite,
  Moonstar: MoonstarWhite,
  Group: GroupWhite,
};

export default function Customization() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [isNameInvalid, setNameIsInvalid] = useState(false);

  const {
    pocketName,
    pocketType,
    pocketColor,
    pocketIcon,
    setPocketName,
    setPocketColor,
    setPocketIcon,
  } = usePocketStore();

  const selectedColor =
    selectedColorIndex !== null ? colors[selectedColorIndex] : pocketColor;

  const selectedTranslucent = colorMap[selectedColor]?.translucent;
  const selectedSolid = colorMap[selectedColor]?.solid;

  const SelectedIconWhite = iconWhiteMap[pocketIcon] || PocketWhite;

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (pocketName.length > 20 || pocketName.length === null) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }
  }, [pocketName]);

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

        <Box className="w-fit min-w-48 h-fit bg-white border border-gray-300 rounded-2xl p-0">
          <Box
            className={`w-fit h-fit rounded-t-2xl p-4 mb-10 ${selectedTranslucent}`}
          >
            <Box
              className={`w-16 h-16 rounded-full ${selectedSolid} items-center justify-center`}
            >
              <Icon as={SelectedIconWhite} size="xl" className="w-8 h-8" />
            </Box>
            <VStack space="2xs" className="my-7">
              <Heading size={"md"} className="pr-5">
                {pocketName ? pocketName : "Nama Pocket"}
              </Heading>
              <Text size={"md"}>{pocketType} pocket</Text>
            </VStack>
          </Box>
        </Box>
      </Box>

      <Box className="flex-1 flex-col mt-5 px-6 justify-between">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <VStack space="2xl" className="w-full px-3">
              {pocketType === "Spending" && (
                <VStack space="md">
                  <Text size="lg">Masukkan nama pocket kamu</Text>

                  <FormControl isInvalid={isNameInvalid} size="md" isRequired>
                    <Input
                      className="h-14 my-1 rounded-xl border-gray-300 data-[focus=true]:border-[#007BE5]"
                      size="lg"
                    >
                      <InputField
                        type="text"
                        placeholder="Tulis nama pocket"
                        value={pocketName}
                        onChangeText={setPocketName}
                        className="p-3"
                      />
                      <InputSlot className="mr-3">
                        <Text
                          className={`text-gray-500 text-xs ${isNameInvalid && "text-red-500"}`}
                        >
                          {pocketName.length}/20
                        </Text>
                      </InputSlot>
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        Nama harus terisi, valid, dan maksimal 20 karakter!
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </VStack>
              )}
              <VStack space="xl">
                <Text size="lg">Pilih warna pocket kamu</Text>
                <HStack space="md" className="flex-wrap justify-between">
                  {colors.map((color, index) => (
                    <Pressable
                      onPress={() => {
                        setPocketColor(color);
                        setSelectedColorIndex(
                          selectedColorIndex === index ? null : index,
                        );
                      }}
                      key={index}
                      className={`w-8 h-8 rounded-full ${color} ${selectedColorIndex === index ? "border-2 border-[#007BE5]" : ""}`}
                    ></Pressable>
                  ))}
                </HStack>
              </VStack>
              <VStack space="xl">
                <Text size="lg">Pilih ikon pocket kamu</Text>
                <HStack space="md" className="flex-wrap justify-between">
                  {iconKeys.map((iconKey, index) => (
                    <Pressable
                      onPress={() => {
                        setPocketIcon(iconKey);
                        setSelectedIconIndex(
                          selectedIconIndex === index ? null : index,
                        );
                      }}
                      key={iconKey}
                      className={`w-12 h-12 rounded-full bg-[#F2F2F2] items-center justify-center ${selectedIconIndex === index ? "border-2 border-[#007BE5]" : ""}`}
                    >
                      <Icon as={iconMap[iconKey]} size="sm" />
                    </Pressable>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
        <PrimaryButton
          buttonTitle="Buat Pocket"
          className="mt-3 mb-12"
          disabled={isNameInvalid || pocketName.length === 0}
        />
      </Box>
    </Box>
  );
}
