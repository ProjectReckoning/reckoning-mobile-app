import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";

import { formatRupiah } from "@/utils/helperFunction";
import { useTransactionStore } from "@/stores/transactionStore";

export default function DetailConfirmation({ isSchedule = false }) {
  const { type, amount, selectedDate, selectedStartDate, selectedEndDate } =
    useTransactionStore();

  const formatMonthYear = (date) => {
    if (!date) return null;
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <>
      {isSchedule && (
        <VStack space="sm" className="my-5">
          <Text className="text-sm text-black font-semibold">
            Detail jadwal
          </Text>
          <Divider />
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Tanggal</Text>
            <Text className="text-sm text-black font-light">
              Setiap tanggal {selectedDate}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Bulan mulai</Text>
            <Text className="text-sm text-black font-light">
              {formatMonthYear(selectedStartDate)}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Bulan selesai</Text>
            <Text className="text-sm text-black font-light">
              {formatMonthYear(selectedEndDate)}
            </Text>
          </HStack>
        </VStack>
      )}
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
          <Text className="text-sm text-black font-light">
            {formatRupiah(0)}
          </Text>
        </HStack>
      </VStack>
    </>
  );
}
