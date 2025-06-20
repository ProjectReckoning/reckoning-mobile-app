import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

import AppBar from "../../../../../components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import NominalInput from "@/components/common/forms/NominalInput";
import { maskPocketId } from "../../../../../utils/helperFunction";
import SelectNominal from "@/components/common/buttons/SelectNominal";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function Topup() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketColor = "bg-orange-wondr";
  const pocketIcon = "Airplane";
  const pocketId = "0238928039";

  const { type, amount, source, setAmount } = useTransactionStore();
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  return (
    <Box className="flex-1 bg-white justify-between px-8 py-5">
      <VStack space="xs">
        <AppBar transaction={type.id} />

        {/* Pocket preview */}
        <HStack
          space="xl"
          className="w-full justify-start items-center mt-8 mb-5"
        >
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
            <Text size={"md"}>{maskPocketId(pocketId, 3)}</Text>
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
          heading={source.type}
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
        className={"mb-3"}
        disabled={amount === null}
      />
    </Box>
  );
}
