import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function QRISIndex() {
  const { source } = useTransactionStore();

  const handlePress = () => {
    router.push("/home/SelectSource");
  };

  const handleNext = () => {
    router.push({
      pathname: "pocket/[id]/transaction/PinCode",
      params: { id: 0, isSchedule: false, qris: true },
    });
  };

  return (
    <Box className="flex-1 p-6 justify-between">
      <VStack className="gap-10">
        <VStack space="md">
          <Heading size="2xl">QR code</Heading>
          <Text size="md">Pilih sumber dana untuk melakukan transaksi</Text>
        </VStack>

        <TransactionCard
          title="Sumber dana"
          heading={
            source?.category?.bank?.type.toUpperCase() ||
            source?.category?.pocket?.name.toUpperCase() ||
            "TAPLUS PEGAWAI BNI"
          }
          subheading={source.id}
          showBalance={true}
          balance={source.balance}
          pressable={true}
          onPress={handlePress}
        />
      </VStack>

      <PrimaryButton
        buttonAction={handleNext}
        buttonTitle="Tampilkan QR Code"
        className={"my-3"}
      />
    </Box>
  );
}
