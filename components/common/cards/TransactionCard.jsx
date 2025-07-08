import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { Eye, EyeOff, ChevronRight } from "lucide-react-native";
import { formatRupiah, maskBalance } from "../../../utils/helperFunction";

export default function TransactionCard({
  title,
  heading,
  subheading,
  showBalance = false,
  balance = 0,
  pressable = false,
  onPress,
}) {
  const [isShowBalance, setIsShowBalance] = useState(true);
  const Wrapper = pressable
    ? Pressable
    : ({ children, ...props }) => <>{children}</>;

  return (
    <VStack space="lg">
      {title && (
        <HStack className="justify-between items-center">
          <Text className="text-sm text-black font-light">{title}</Text>
          {showBalance && (
            <Pressable
              onPress={() => setIsShowBalance(!isShowBalance)}
              className="mr-2"
            >
              {isShowBalance ? (
                <EyeOff size={16} color={"black"} />
              ) : (
                <Eye size={16} color={"black"} />
              )}
            </Pressable>
          )}
        </HStack>
      )}
      <Wrapper
        {...(pressable ? { onPress } : {})}
        {...(pressable ? { className: "active:bg-gray-50" } : {})}
      >
        <HStack
          space="xs"
          className="border border-[#C3C3C3] rounded-xl p-4 justify-between items-center"
        >
          <VStack className="justify-center items-start">
            <Heading size={"sm"} className="font-normal">
              {heading}
            </Heading>
            <Text className="text-md">{subheading}</Text>
            {showBalance && (
              <Text className="text-md font-bold">
                {isShowBalance ? formatRupiah(balance) : maskBalance(balance)}
              </Text>
            )}
          </VStack>
          {pressable && <ChevronRight size={28} color={"black"} />}
        </HStack>
      </Wrapper>
    </VStack>
  );
}
