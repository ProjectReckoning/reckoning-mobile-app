import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";

import { useState, useEffect, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

import { router, useFocusEffect } from "expo-router";
import useAuthStore from "@/stores/authStore";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";

import { WondrColors } from "@/utils/colorUtils";
import { formatRupiah } from "@/utils/helperFunction";
import Pocket from "@/assets/images/icon/pocket/pocket.svg";
import TabunganIcon from "@/assets/images/icon/tabunganIcon.svg";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function SelectSource() {
  const [selectedSavingsIndex, setSelectedSavingsIndex] = useState(null);
  const [selectedPocketIndex, setSelectedPocketIndex] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const user = useAuthStore((state) => state.user);
  const { source, setSource } = useTransactionStore();
  const { allPockets, fetchAllPockets } = usePocketStore();

  const savingAccounts = [
    {
      id: user?.user_id,
      name: (user?.name || "").toUpperCase(),
      balance: user?.balance || 0,
      category: {
        bank: {
          name: "BNI",
          type: "TAPLUS PEGAWAI BNI",
        },
      },
    },
  ];

  useFocusEffect(
    useCallback(() => {
      fetchAllPockets();
    }, []),
  );

  useEffect(() => {
    if (!source) return;
    const savingsIdx = savingAccounts.findIndex((acc) => acc.id === source.id);
    if (savingsIdx !== -1) {
      setSelectedSavingsIndex(savingsIdx);
      setSelectedPocketIndex(null);
      return;
    }

    const pocketIdx = allPockets.findIndex(
      (pocket) => pocket.account_number === source.id,
    );
    if (pocketIdx !== -1) {
      setSelectedPocketIndex(pocketIdx);
      setSelectedSavingsIndex(null);
    }
  }, [source, allPockets]);

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetchAllPockets();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNext = () => {
    router.back();
  };

  return (
    <Box className="flex-1 w-full bg-white p-6 justify-between">
      <Text>
        Pastikan kamu memilih sumber dana dengan saldo yang cukup untuk
        bertransaksi.
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingRight: 10,
          paddingBottom: 30,
        }}
        style={{ marginRight: -10 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[WondrColors["tosca-wondr"]]}
            tintColor={WondrColors["tosca-wondr"]}
          />
        }
      >
        <Accordion
          variant="unfilled"
          type="multiple"
          isCollapsible={true}
          className="w-full p-0 my-7 gap-3"
        >
          <AccordionItem value="savings-current">
            <AccordionHeader className="mb-1">
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    <TabunganIcon width={21} height={21} />
                    <AccordionTitleText className="text-xl ml-3">
                      Savings & Current
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUp} className="mr-3" />
                    ) : (
                      <AccordionIcon as={ChevronDown} className="mr-3" />
                    )}
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              {savingAccounts.map((account, i) => (
                <Pressable
                  key={account.id}
                  onPress={() => {
                    setSelectedSavingsIndex(i);
                    setSelectedPocketIndex(null); // clear pocket selection
                    setSource({
                      id: account.id,
                      name: account.name,
                      balance: account.balance,
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
                    className={`border rounded-xl p-4 ${selectedSavingsIndex === i ? "border-green-select" : "border-gray-wondr-border"}`}
                  >
                    <Heading size={"md"} className="font-normal">
                      {account.category.bank.type}
                    </Heading>
                    <Text size={"md"}>{account.id}</Text>
                    <Text size={"md"}>
                      Saldo efektif: {formatRupiah(account.balance)}
                    </Text>
                  </VStack>
                </Pressable>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="pockets">
            <AccordionHeader className="mb-1">
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    <Pocket
                      width={21}
                      height={21}
                      color={WondrColors["purple-wondr"]}
                    />
                    <AccordionTitleText className="text-xl ml-3">
                      Pockets
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUp} className="mr-3" />
                    ) : (
                      <AccordionIcon as={ChevronDown} className="mr-3" />
                    )}
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent className="gap-5">
              {allPockets.map((pocket, i) => (
                <Pressable
                  key={pocket.pocket_id}
                  onPress={() => {
                    setSelectedPocketIndex(i);
                    setSelectedSavingsIndex(null); // clear savings selection
                    setSource({
                      id: pocket.account_number,
                      name: pocket.name,
                      balance: pocket.current_balance,
                      category: {
                        pocket: {
                          name: pocket.name,
                          type: pocket.type,
                        },
                      },
                    });
                  }}
                >
                  <VStack
                    space="xs"
                    className={`border rounded-xl p-4 ${selectedPocketIndex === i ? "border-green-select" : "border-gray-wondr-border"}`}
                  >
                    <Heading size={"md"} className="font-normal">
                      {pocket.name}
                    </Heading>
                    <Text size={"md"}>{pocket.account_number}</Text>
                    <Text size={"md"}>
                      Saldo efektif: {formatRupiah(pocket.current_balance)}
                    </Text>
                  </VStack>
                </Pressable>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollView>

      <PrimaryButton
        buttonAction={handleNext}
        buttonTitle="Lanjut"
        className={"my-3"}
        disabled={selectedSavingsIndex === null && selectedPocketIndex === null}
      />
    </Box>
  );
}
