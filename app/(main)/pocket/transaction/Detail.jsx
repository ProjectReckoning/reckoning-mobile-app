import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import AppBar from "../../../../components/common/AppBar";
import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function TransactionDetail() {
  const { type, source, destination, amount, setAmount } =
    useTransactionStore();
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

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
            buttonAction={() => {
              router.push("/pocket/transaction/Confirmation");
            }}
            buttonTitle="Lanjut"
            className={"my-5"}
            disabled={amount === null}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}
