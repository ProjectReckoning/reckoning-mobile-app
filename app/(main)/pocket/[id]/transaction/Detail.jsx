import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Input, InputField } from "@/components/ui/input";

import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const {
    source,
    destination,
    amount,
    setAmount,
    // --- NEW: Get description state from store ---
    description,
    setDescription,
  } = useTransactionStore();

  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  const handleNext = () => {
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Confirmation`);
    }
  };

  return (
    <Box className="flex-1 bg-white px-6 pb-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack space="2xl" className="flex-1 mt-5">
            <HStack space="sm" className="justify-center items-center">
              <Avatar
                size={"md"}
                className="bg-[#F2F2F2] items-center justify-center mr-3"
              >
                <AvatarFallbackText className="text-[#58ABA1]">
                  {destination?.name || ""}
                </AvatarFallbackText>
              </Avatar>
              <Box className="flex-1 flex flex-col">
                <Text size="lg" className="font-bold text-black">
                  Sdr {destination?.name || ""}
                </Text>
                <Text size="sm" className="text-[#848688]">
                  {destination?.category?.bank?.name ||
                    destination?.category?.pocket?.type ||
                    ""}{" "}
                  - {destination?.id || ""}
                </Text>
              </Box>
            </HStack>

            <NominalInput
              amount={amount}
              setAmount={setAmount}
              isAmountInvalid={isAmountInvalid}
              setAmountTouched={setAmountTouched}
            />

            {/* --- NEW: Description Input Field --- */}
            <VStack space="sm">
              <Text className="text-sm">Deskripsi (Opsional)</Text>
              <Input className="w-full h-14 rounded-xl border border-gray-wondr-border data-[focus=true]:border-green-select">
                <InputField
                  placeholder="Contoh: Pembayaran ke vendor"
                  value={description}
                  onChangeText={setDescription}
                />
              </Input>
            </VStack>

            <TransactionCard
              title="Sumber dana"
              heading={
                source?.category?.bank?.type || source?.category?.pocket?.type
              }
              subheading={source.id}
              showBalance={true}
              balance={source.balance}
            />
          </VStack>

          <PrimaryButton
            buttonAction={handleNext}
            buttonTitle="Lanjut"
            className={"my-5"}
            disabled={amount === null || amount === 0}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
