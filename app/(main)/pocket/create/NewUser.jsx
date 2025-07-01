// app/(main)/pocket/create/NewUser.jsx
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
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Info } from "lucide-react-native";
import TabBar from "@/components/common/TabBar";
import { useFriendshipStore } from "@/stores/friendshipStore";
import { WondrColors } from "../../../../utils/colorUtils";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

const tabList = [
  { key: "rekening", label: "Rekening" },
  { key: "handphone", label: "No. HP" },
];

export default function NewUser() {
  const [activeTab, setActiveTab] = useState("rekening");
  const [rekening, setRekening] = useState("");
  const [isRekeningInvalid, setIsRekeningInvalid] = useState(false);
  const [hpEmail, setHpEmail] = useState("");
  const [isHpEmailInvalid, setIsHpEmailInvalid] = useState(false);

  const { sendFriendRequest, isSendingRequest, sendRequestError } =
    useFriendshipStore();

  const handleAddFriend = async () => {
    if (activeTab === "rekening") {
      console.log(
        "Adding by account number is not yet implemented with the new API.",
      );
      setIsRekeningInvalid(true);
    } else if (activeTab === "handphone") {
      if (!hpEmail || isSendingRequest) return;
      try {
        const response = await sendFriendRequest([hpEmail]);
        // --- CHANGE: Navigate to confirmation screen on success ---
        if (response && response.ok && response.data?.added?.length > 0) {
          const addedPhoneNumber = response.data.added[0];
          router.replace({
            pathname: "/pocket/create/NewUserConfirmation",
            params: { addedPhoneNumber },
          });
        } else {
          // This handles cases where the API returns ok:false or skipped the number
          setIsHpEmailInvalid(true);
          Alert.alert(
            "Gagal",
            "Nomor HP tidak ditemukan atau sudah menjadi teman.",
          );
        }
      } catch (error) {
        setIsHpEmailInvalid(true);
        Alert.alert(
          "Gagal",
          sendRequestError || "Terjadi kesalahan. Silakan coba lagi.",
        );
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
        keyboardVerticalOffset={90}
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
                    placeholder="Nomor HP"
                    type="text"
                    className="text-lg"
                    keyboardType="phone-pad"
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
                    No. HP tidak ditemukan atau sudah menjadi teman.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          </Box>

          <PrimaryButton
            buttonAction={handleAddFriend}
            buttonTitle="Lanjut"
            className={"my-5"}
            disabled={
              (activeTab === "rekening" &&
                (rekening === "" || isRekeningInvalid)) ||
              (activeTab === "handphone" &&
                (isHpEmailInvalid || hpEmail === ""))
            }
            isLoading={isSendingRequest}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
