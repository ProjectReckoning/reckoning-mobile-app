import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import { usePocketStore } from "@/stores/pocketStore";
import { StyleSheet, Platform } from "react-native";

import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { maskId, formatRupiah } from "@/utils/helperFunction";
import DetailConfirmation from "@/components/feature/transaction/DetailConfirmation";

export default function Confirmation() {
  // Get all params, including those for the toast
  const { id, approvalRequired, successAction, toastMessage } =
    useLocalSearchParams();
  const { type, source, amount, destination } = useTransactionStore();
  const { currentPocket } = usePocketStore();
  const isSchedule = type.id === "transfer_bulanan";

  const handleNext = () => {
    if (id) {
      router.push({
        pathname: "/(main)/pocket/[id]/transaction/PinCode",
        // Forward all necessary params to the PinCode screen
        params: {
          id,
          isSchedule,
          successAction,
          toastMessage,
        },
      });
    }
  };

  const buttonTitle =
    approvalRequired === "true"
      ? "Kirim Permintaan Persetujuan"
      : isSchedule
        ? "Jadwalin Transfer"
        : `${type.name} sekarang`;

  return (
    <Box className="flex-1 bg-white justify-between">
      <VStack space="xs" className="justify-start px-6 pt-5">
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

      <Box style={styles.shadowAbove} className="bg-white px-6 py-4">
        <VStack className="gap-4 mt-3">
          <HStack className="justify-between">
            <Text className="text-lg text-black font-semibold">Total</Text>
            <Text className="text-xl text-black font-extrabold">
              {formatRupiah(amount)}
            </Text>
          </HStack>

          <PrimaryButton buttonAction={handleNext} buttonTitle={buttonTitle} />
        </VStack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  shadowAbove: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)",
        elevation: 20,
      },
    }),
  },
});
