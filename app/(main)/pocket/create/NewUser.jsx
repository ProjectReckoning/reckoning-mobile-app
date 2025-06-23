import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

import { useState } from "react";
import { router } from "expo-router";
import { Info } from "lucide-react-native";
import TabBar from "@/components/common/TabBar";
import { usePocketStore } from "@/stores/pocketStore";
import { WondrColors } from "../../../../utils/colorUtils";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

const tabList = [
  { key: "rekening", label: "Rekening" },
  { key: "hp_email", label: "No. HP/Email" },
];

const newFriends = [
  {
    id: 1936537497,
    name: "MANALU FERNANDO PERMADI",
    bank: "BNI",
    hp: "081234567890",
  },
  {
    id: 1925412859,
    name: "JUICY BRIAN AL-MUAFI",
    bank: "BNI",
    hp: "082345678901",
  },
];

export default function NewUser() {
  const [activeTab, setActiveTab] = useState("rekening");
  const [rekening, setRekening] = useState(null);
  const [isRekeningInvalid, setIsRekeningInvalid] = useState(false);
  const [hpEmail, setHpEmail] = useState("");
  const [isHpEmailInvalid, setIsHpEmailInvalid] = useState(false);

  const { setNewFriend } = usePocketStore();

  const handleSearchFriend = () => {
    if (activeTab === "rekening") {
      const found = newFriends.find((f) => String(f.id) === String(rekening));
      if (found) {
        setNewFriend(found);
        setIsRekeningInvalid(false);
        router.push("/pocket/create/NewUserConfirmation");
      } else {
        setIsRekeningInvalid(true);
      }
    } else if (activeTab === "hp_email") {
      const found = newFriends.find((f) => String(f.hp) === String(hpEmail));
      if (found) {
        setNewFriend(found);
        setIsHpEmailInvalid(false);
        router.push("/pocket/create/NewUserConfirmation");
      } else {
        setIsHpEmailInvalid(true);
      }
    }
  };

  return (
    <Box className="flex-1 bg-white justify-between px-6 py-5">
      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
        marginVertical={0}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Box className="flex-1">
            {activeTab === "rekening" ? (
              <VStack space="xl" className="my-5">
                <VStack
                  space="xs"
                  className="border rounded-xl px-5 py-3 border-gray-wondr-border"
                >
                  <Text size={"sm"}>Nama bank</Text>
                  <Heading size={"md"} className="font-normal">
                    BANK NEGARA INDONESIA
                  </Heading>
                </VStack>

                <FormControl isInvalid={isRekeningInvalid} size="md" isRequired>
                  <Input
                    size="md"
                    className="h-16 border rounded-xl px-3 py-3 border-gray-wondr-border data-[focus=true]:border-green-select"
                  >
                    <InputField
                      placeholder="Nomor rekening"
                      type="number"
                      className="text-lg"
                      keyboardType="numeric"
                      value={rekening}
                      onChangeText={(text) => {
                        setRekening(text);
                        setIsRekeningInvalid(false);
                      }}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      No. rekening yang kamu masukkan tidak valid!
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {!rekening && (
                  <HStack
                    space="md"
                    className="w-full border rounded-xl pl-3 pr-10 py-3 border-green-select items-center"
                  >
                    <Info size={21} color={WondrColors["green-select"]} />
                    <Text size={"sm"} className="mr-3">
                      Kamu bisa kirim ke rekening rupiah BNI, atau valas BNI
                      (dari sumber dana rupiah)
                    </Text>
                  </HStack>
                )}
              </VStack>
            ) : (
              <FormControl isInvalid={isHpEmailInvalid} size="md" isRequired>
                <Input
                  size="md"
                  className="h-16 border rounded-xl mt-5 mb-2 px-3 py-3 border-gray-wondr-border data-[focus=true]:border-green-select"
                >
                  <InputField
                    placeholder="Nomor HP/Email"
                    type="text"
                    className="text-lg"
                    value={hpEmail}
                    onChangeText={(text) => {
                      setHpEmail(text);
                      setIsHpEmailInvalid(false);
                    }}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    No. HP harus terisi dengan valid dan benar!
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          </Box>

          <PrimaryButton
            buttonAction={handleSearchFriend}
            buttonTitle="Lanjut"
            className={"my-5"}
            disabled={
              (activeTab === "rekening" &&
                (rekening === null || isRekeningInvalid)) ||
              (activeTab === "hp_email" && (isHpEmailInvalid || hpEmail === ""))
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
