import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { useTransactionStore } from "@/stores/transactionStore";

const nominalList = [200000, 300000, 400000, 500000, 600000, 700000];

export default function SelectNominal() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const setAmount = useTransactionStore((state) => state.setAmount);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <Box className="flex flex-col w-full gap-1 my-6">
      <Text className="text-sm text-black font-light mb-5">Pilih Nominal</Text>

      <Box className="flex flex-row flex-wrap justify-between">
        {nominalList.map((nominal, i) => (
          <Pressable
            key={i}
            onPress={() => {
              if (selectedIndex === i) {
                setSelectedIndex(null);
                setAmount(null);
              } else {
                setSelectedIndex(i);
                setAmount(nominal);
              }
            }}
            className={`w-[48%] mb-4 py-3 border rounded-xl ${
              selectedIndex === i
                ? "border-[#007BE5]"
                : "border-light-gray-wondr"
            }`}
          >
            <Text className="text-sm text-black text-center">
              {formatRupiah(nominal)}
            </Text>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}
