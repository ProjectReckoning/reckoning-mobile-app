import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import AppBar from "../../../../../components/common/AppBar";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

import TabunganIcon from "@/assets/images/icon/tabunganIcon.svg";

const savingAccounts = [
  {
    id: 1916837397,
    name: "AMIRRA FERIAL",
    balance: 19546250,
    category: {
      bank: {
        name: "BNI",
        type: "TAPLUS PEGAWAI BNI",
      },
    },
  },
  {
    id: 1826096195,
    name: "AMIRRA FERIAL",
    balance: 8546250,
    category: {
      bank: {
        name: "BNI",
        type: "TAPLUS MUDA",
      },
    },
  },
  {
    id: 1922276179,
    name: "AMIRRA FERIAL",
    balance: 26546250,
    category: {
      bank: {
        name: "BNI",
        type: "BNI RDN",
      },
    },
  },
];

export default function Withdraw() {
  const { type, setType } = useTransactionStore();

  useEffect(() => {
    setType({ id: "withdraw", name: "Withdraw" });
  }, [setType]);

  return (
    <Box className="flex-1 bg-white justify-between px-8 py-5">
      <VStack space="xl">
        <AppBar transaction={type.id} />

        <HStack space="lg" className="my-2">
          <TabunganIcon width={24} height={24} />
          <Heading size="md">Tabungan</Heading>
        </HStack>

        <TransactionCard
          heading={"TAPLUS PEGAWAI BNI"}
          subheading={1916837397}
        />
        <TransactionCard heading={"TAPLUS MUDA"} subheading={1826096195} />
        <TransactionCard heading={"BNI RDN"} subheading={1922276179} />
      </VStack>

      <PrimaryButton
        buttonAction={() => {
          router.push("/pocket/transaction/Detail");
        }}
        buttonTitle="Lanjut"
        className={"my-3"}
      />
    </Box>
  );
}
