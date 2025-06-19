import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

import AppBar from "../../../../../components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import SelectNominal from "@/components/common/buttons/SelectNominal";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function Topup() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketColor = "bg-orange-wondr";
  const pocketIcon = "Airplane";
  const pocketId = "0238928039";

  const { type, amount, source, setType, setAmount } = useTransactionStore();
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  return (
    <Box className="flex-1 bg-white justify-between px-6 py-5">
      <VStack space="xs">
        <AppBar title="Pocket kamu" />

        {/* Pocket preview */}
        <HStack space="xl" className="w-full justify-start items-center my-8">
          <PocketCard
            mode="icon"
            pocketName={pocketName}
            color={pocketColor}
            icon={pocketIcon}
            iconSize="8"
            whiteSpace="mb-5"
          />
          <VStack space="xs" className="gap-0">
            <Heading size={"lg"}>
              {pocketName ? pocketName : "Nama Pocket"}
            </Heading>
            <Text size={"md"}>{pocketId}</Text>
          </VStack>
        </HStack>

        <NominalInput
          amount={amount}
          setAmount={setAmount}
          isAmountInvalid={isAmountInvalid}
          setAmountTouched={setAmountTouched}
        />

        <SelectNominal />
      </VStack>

      <PrimaryButton
        buttonAction={() => {}}
        buttonTitle="Lanjut"
        className={"mb-3"}
        disabled={isAmountInvalid || !amountTouched}
      />
    </Box>
  );
}
