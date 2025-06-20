import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";

import { formatRupiah } from "../../../utils/helperFunction";
import { useTransactionStore } from "@/stores/transactionStore";

export default function DetailConfirmation() {
  const { type, amount } = useTransactionStore();
  return (
    <VStack space="sm" className="my-5">
      <Text className="text-sm text-black font-semibold">
        Detail {type.name}
      </Text>
      <Divider />

      <HStack className="justify-between">
        <Text className="text-sm text-black font-light">Nominal</Text>
        <Text className="text-sm text-black font-light">
          {formatRupiah(amount)}
        </Text>
      </HStack>

      <HStack className="justify-between">
        <Text className="text-sm text-black font-light">Biaya transaksi</Text>
        <Text className="text-sm text-black font-light">{formatRupiah(0)}</Text>
      </HStack>
    </VStack>
  );
}
