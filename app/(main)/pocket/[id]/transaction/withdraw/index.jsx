import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePocketStore } from "@/stores/pocketStore";
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
  const { id } = useLocalSearchParams();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { setType, setSource, setDestination, resetTransactionState } =
    useTransactionStore();
  const { currentPocket, fetchPocketById } = usePocketStore();

  // --- NEW: Reset the transaction state every time this screen is focused ---
  useFocusEffect(
    useCallback(() => {
      // 1. Reset the state to prevent data pollution
      resetTransactionState();
      // 2. Set the type for this specific flow
      setType({ id: "withdraw", name: "Withdraw" });
      // 3. Fetch the required pocket data
      if (id) {
        fetchPocketById(id);
      }
    }, [id]),
  );

  useEffect(() => {
    if (currentPocket) {
      setSource({
        id: currentPocket.account_number,
        name: currentPocket.name,
        balance: currentPocket.current_balance,
        category: {
          pocket: {
            name: currentPocket.name,
            type: "SHARED POCKET BNI",
          },
        },
      });
    }
  }, [currentPocket]);

  const handleNext = () => {
    // Navigate to the nested detail screen for the current pocket
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Detail`);
    }
  };

  return (
    <Box className="flex-1 bg-white justify-between px-6 pt-3 pb-5">
      <VStack space="xl">
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
        buttonAction={handleNext}
        buttonTitle="Lanjut"
        className={"my-3"}
        disabled={selectedIndex === null}
      />
    </Box>
  );
}
