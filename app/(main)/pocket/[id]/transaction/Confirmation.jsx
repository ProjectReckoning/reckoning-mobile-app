import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePocketStore } from "@/stores/pocketStore";

import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { maskId, formatRupiah } from "@/utils/helperFunction";
import DetailConfirmation from "@/components/feature/transaction/DetailConfirmation";

export default function Confirmation() {
  const { id } = useLocalSearchParams();
  const { type, source, amount, destination } = useTransactionStore();
  const { currentPocket } = usePocketStore();
  const isSchedule = type.id === "transfer_bulanan";

  const handleNext = () => {
    // Navigate to the nested PinCode screen for the current pocket
    if (id) {
      router.push({
        pathname: "/(main)/pocket/[id]/transaction/PinCode",
        params: {
          id,
          isSchedule: isSchedule,
        },
      });
    }
  };

  return (
    <Box className="flex-1 bg-white justify-between px-6 py-5">
      <VStack space="xs" className="justify-start">
        {destination.category.pocket && destination.category.pocket.type ? (
          <HStack space="xl" className="w-full justify-start items-center mb-5">
            <PocketCard
              mode="icon"
              pocketName={destination.name}
              color={currentPocket?.color}
              icon={currentPocket?.icon_name}
              iconSize="8"
              whiteSpace="mb-5"
            />
            <VStack space="xs" className="gap-0">
              <Heading size={"lg"}>{destination.name}</Heading>
              <Text size={"md"}>{maskId(destination.id, 3)}</Text>
            </VStack>
          </HStack>
        ) : (
          <Box className="mb-3">
            <TransactionCard
              title="Penerima"
              heading={destination.name}
              subheading={`${destination?.category?.bank?.type || destination?.category?.pocket?.type} - ${destination.id}`}
            />
          </Box>
        )}

        <TransactionCard
          title="Sumber dana"
          heading={source.name}
          subheading={`${source.category?.bank?.type || source.category?.pocket?.type} - ${source.id}`}
        />

        <DetailConfirmation isSchedule={isSchedule} />
      </VStack>

      <VStack className="gap-8">
        <Divider className="w-screen h-0.5 border-light-gray-wondr shadow-md my-2 relative -left-8" />

        <HStack className="justify-between">
          <Text className="text-sm text-black font-light">Total</Text>
          <Text className="text-lg text-black font-extrabold">
            {formatRupiah(amount)}
          </Text>
        </HStack>

        <PrimaryButton
          buttonAction={handleNext}
          buttonTitle={`${isSchedule ? "Jadwalin Transfer" : `${type.name} sekarang`}`}
          className={"mb-3"}
        />
      </VStack>
    </Box>
  );
}
