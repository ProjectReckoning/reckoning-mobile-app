import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import { router } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";

import AppBar from "../../../../components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { maskId, formatRupiah } from "../../../../utils/helperFunction";
import DetailConfirmation from "@/components/feature/transaction/DetailConfirmation";

export default function Confirmation() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketColor = "bg-orange-wondr";
  const pocketIcon = "Airplane";
  const pocketId = "0238928039";

  const { type, source, amount, destination } = useTransactionStore();

  return (
    <Box className="flex-1 bg-white justify-between px-8 py-5">
      <VStack space="xs">
        <AppBar transaction={type.id} prefix="Konfirmasi" />

        {destination.type && destination.type.pocket ? (
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
              <Text size={"md"}>{maskId(pocketId, 3)}</Text>
            </VStack>
          </HStack>
        ) : (
          <Box className="mt-8 mb-3">
            <TransactionCard
              title="Penerima"
              heading={destination.name}
              subheading={`${destination.type.bank} - ${destination.id}`}
            />
          </Box>
        )}

        <TransactionCard
          title="Sumber dana"
          heading={source.name}
          subheading={`${source.type} - ${source.id}`}
        />

        <DetailConfirmation />
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
          buttonAction={() => {
            router.push("/pocket/transaction/PinCode");
          }}
          buttonTitle={`${type.name} sekarang`}
          className={"mb-3"}
        />
      </VStack>
    </Box>
  );
}
