import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePocketStore } from "@/stores/pocketStore";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import { maskId } from "@/utils/helperFunction";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import SelectNominal from "@/components/common/buttons/SelectNominal";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function Topup() {
  const { id } = useLocalSearchParams();
  const {
    amount,
    source,
    destination,
    setSource,
    setAmount,
    setDestination,
    // --- NEW: Get the reset action ---
    resetTransactionState,
    setType,
  } = useTransactionStore();
  const { currentPocket, fetchPocketById } = usePocketStore();

  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  // --- NEW: Reset the transaction state every time this screen is focused ---
  useFocusEffect(
    useCallback(() => {
      // 1. Reset the entire transaction state to its default values
      resetTransactionState();
      // 2. Set the type for this specific flow
      setType({ id: "topup", name: "Top-Up" });
      // 3. Fetch the required pocket data
      if (id) {
        fetchPocketById(id);
      }
    }, [id]), // This effect re-runs if the pocket ID changes
  );

  useEffect(() => {
    // This effect runs after the pocket data has been fetched
    if (currentPocket) {
      setDestination({
        id: currentPocket.account_number,
        name: currentPocket.name,
        category: {
          pocket: {
            name: currentPocket.name,
            type: "SHARED POCKET BNI",
          },
        },
      });
      // Set a default source for the Top Up flow
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
    }
  }, [currentPocket]);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  if (!currentPocket || !source.id) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  const handleNext = () => {
    // Navigate to the nested confirmation screen for the current pocket
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Confirmation`);
    }
  };

  return (
    <Box className="flex-1 bg-white justify-between px-6 pb-5">
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
            <HStack
              space="xl"
              className="w-full justify-start items-center mt-3 mb-5"
            >
              <PocketCard
                mode="icon"
                pocketName={destination.name}
                color={currentPocket.color}
                icon={currentPocket.icon_name}
                iconSize="8"
                whiteSpace="mb-5"
              />
              <VStack space="xs" className="gap-0">
                <Heading size={"lg"}>{destination.name}</Heading>
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
              heading={source?.category?.bank?.type || "TAPLUS PEGAWAI BNI"}
              subheading={source.id}
              showBalance={true}
              balance={source.balance}
            />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>

      <PrimaryButton
        buttonAction={handleNext}
        buttonTitle="Lanjut"
        className={"my-3"}
        disabled={amount === null || amount === 0}
      />
    </Box>
  );
}
