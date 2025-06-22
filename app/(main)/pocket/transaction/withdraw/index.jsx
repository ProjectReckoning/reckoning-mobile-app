import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { router } from "expo-router";
import { useState, useEffect } from "react";
import AppBar from "../../../../../components/common/AppBar";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

import TabunganIcon from "@/assets/images/icon/tabunganIcon.svg";

const savingAccounts = [
  {
    id: 1916837397,
    name: "AMIRA FERIAL",
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
    name: "AMIRA FERIAL",
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
    name: "AMIRA FERIAL",
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
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketId = "0238928039";

  const [selectedIndex, setSelectedIndex] = useState(null);
  const { type, setType, setSource, setDestination } = useTransactionStore();

  useEffect(() => {
    setSource({
      id: pocketId,
      name: pocketName,
      balance: 19546250,
      category: {
        pocket: {
          name: pocketName,
          type: "SHARED POCKET BNI",
        },
      },
    });
  }, []);

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
        {savingAccounts.map((account, i) => (
          <Pressable
            key={account.id}
            onPress={() => {
              setSelectedIndex(selectedIndex === i ? null : i);
              setDestination({
                id: account.id,
                name: account.name,
                category: {
                  bank: {
                    name: account.category.bank.name,
                    type: account.category.bank.type,
                  },
                },
              });
            }}
          >
            <VStack
              space="xs"
              className={`border rounded-xl p-4 ${selectedIndex === i ? "border-green-select" : "border-gray-wondr-border"}`}
            >
              <Text size={"sm"}>{account.category.bank.type}</Text>
              <Heading size={"md"} className="font-normal">
                {account.id}
              </Heading>
            </VStack>
          </Pressable>
        ))}
      </VStack>

      <PrimaryButton
        buttonAction={() => {
          router.push("/pocket/transaction/Detail");
        }}
        buttonTitle="Lanjut"
        className={"my-3"}
        disabled={selectedIndex === null}
      />
    </Box>
  );
}
