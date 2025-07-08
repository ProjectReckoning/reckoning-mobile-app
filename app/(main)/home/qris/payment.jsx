import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

import QRmock from "@/assets/images/qr.png";

export default function Payment() {
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(150);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setTimeout(() => handleCancel(), 150000);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "home/index" }],
      }),
    );
  };

  return (
    <Box className="flex-1 p-6 justify-between">
      <VStack className="gap-10 items-center justify-center">
        <VStack space="md">
          <Heading size="2xl">QR code</Heading>
          <Text size="md">
            Tunjukan kode QRIS ke kasir untuk melakukan pembayaran dan tunggu
            hingga transaksi selesai.
          </Text>
        </VStack>

        <Box className="w-3/4 h-fit px-6 pb-6 mt-3 rounded-2xl border border-gray-wondr-border items-center justify-center">
          <Image
            source={QRmock}
            alt="QR Code"
            className="w-full h-64 my-3"
            resizeMode="contain"
          />
          <HStack space="sm">
            <Text size="md">Kode akan kadaluarsa dalam</Text>
            <Text size="md" className="font-bold text-orange-wondr">
              {formatTime(timeLeft)}
            </Text>
          </HStack>
        </Box>
      </VStack>

      <PrimaryButton
        buttonAction={handleCancel}
        buttonTitle="Batal"
        className="bg-white border-2 border-red-wondr mb-4 active:bg-red-wondr"
        textClassName="text-red-wondr"
        textPressed="text-white"
      />
    </Box>
  );
}
