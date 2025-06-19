import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

export default function TransactionCard({
  title,
  heading,
  subheading,
  showBalance = false,
  balance = 0,
}) {
  const [isShowBalance, setIsShowBalance] = useState(true);

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const maskBalance = (value) => {
    const digits = value.toString().replace(/\D/g, "").length;
    return "Rp" + "*".repeat(digits);
  };

  return (
    <VStack space="lg">
      <HStack className="justify-between items-center">
        <Text className="text-sm text-black font-light">{title}</Text>
        {showBalance && (
          <Pressable
            onPress={() => setIsShowBalance(!isShowBalance)}
            className="mr-2"
          >
            {isShowBalance ? <EyeOff size={16} /> : <Eye size={16} />}
          </Pressable>
        )}
      </HStack>
      <VStack className="border border-[#C3C3C3] rounded-xl p-4">
        <Heading size={"md"} className="font-normal">
          {heading}
        </Heading>
        <Text className="text-lg">{subheading}</Text>
        {showBalance && (
          <Text className="text-md font-bold">
            {isShowBalance ? formatRupiah(balance) : maskBalance(balance)}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
