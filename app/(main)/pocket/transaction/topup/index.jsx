import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import { maskId } from "@/utils/helperFunction";
import AppBar from "../../../../../components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import SelectNominal from "@/components/common/buttons/SelectNominal";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function Topup() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketColor = "bg-orange-wondr";
  const pocketIcon = "Airplane";
  const pocketId = "0238928039";

  const {
    type,
    amount,
    source,
    destination,
    setSource,
    setAmount,
    setDestination,
  } = useTransactionStore();
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    setDestination({
      id: pocketId,
      name: pocketName,
      category: {
        pocket: {
          name: pocketName,
          type: "SHARED POCKET BNI",
        },
      },
    });

    setSource({
      id: 1916837397,
      name: "AMIRA FERIAL",
      balance: 19546250,
      category: {
        bank: {
          name: "BNI",
          type: "TAPLUS PEGAWAI BNI",
        },
      },
    });
  }, []);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  return (
    <Box className="flex-1 bg-white justify-between px-8 py-5">
      <AppBar transaction={type.id} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack space="xs">
            {/* Pocket preview */}
            <HStack
              space="xl"
              className="w-full justify-start items-center mt-8 mb-5"
            >
              <PocketCard
                mode="icon"
                pocketName={destination.name}
                color={pocketColor}
                icon={pocketIcon}
                iconSize="8"
                whiteSpace="mb-5"
              />
              <VStack space="xs" className="gap-0">
                <Heading size={"lg"}>
                  {destination.name ? destination.name : "Nama Pocket"}
                </Heading>
                <Text size={"md"}>{maskId(destination.id, 3)}</Text>
              </VStack>
            </HStack>

            <NominalInput
              amount={amount}
              setAmount={setAmount}
              isAmountInvalid={isAmountInvalid}
              setAmountTouched={setAmountTouched}
            />

            <SelectNominal />

            <TransactionCard
              title="Sumber dana"
              heading={source.category.bank.type || source.category.pocket.type}
              subheading={source.id}
              showBalance={true}
              balance={source.balance}
            />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>

      <PrimaryButton
        buttonAction={() => {
          router.push("/pocket/transaction/Confirmation");
        }}
        buttonTitle="Lanjut"
        className={"my-3"}
        disabled={amount === null}
      />
    </Box>
  );
}
