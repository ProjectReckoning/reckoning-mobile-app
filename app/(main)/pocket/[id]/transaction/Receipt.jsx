import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import WondrLogo from "@/assets/images/wondr-logo.png";
import { ScrollView, ImageBackground } from "react-native";
import { formatRupiah, maskId } from "@/utils/helperFunction";
import { receiptFeatures } from "@/utils/mockData/featureData";
import { useTransactionStore } from "@/stores/transactionStore";
import FeatureButton from "@/components/common/buttons/FeatureButton";
import ReceiptBackground from "@/assets/images/background/receiptBackground.png";

export default function Receipt() {
  const {
    type,
    source,
    destination,
    transactionResult, // The result from the API call
    resetTransactionData,
  } = useTransactionStore();

  const createdAt = new Date(transactionResult.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <ImageBackground
      source={ReceiptBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingRight: 10,
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        style={{ marginRight: -10 }}
      >
        <Box className="w-full flex-1 flex-col justify-center items-center px-6 py-5">
          <VStack className="my-5">
            <Image
              source={WondrLogo}
              alt="wondr-logo"
              className="w-fit h-12 my-3"
              resizeMode="contain"
            />
            <VStack space="lg" className="items-center mt-3">
              <Heading size="md" className="text-black font-semibold">
                {type.name} berhasil
              </Heading>
              {/* Use amount from the transaction result */}
              <Heading size="2xl" className="font-extrabold text-black">
                {formatRupiah(transactionResult.amount)}
              </Heading>
              <VStack space="xs" className="items-center">
                {/* Use date from the transaction result */}
                <Text>{createdAt}</Text>
                {/* Use ID from the transaction result */}
                <Text>{`RefID: ${transactionResult.id}`}</Text>
              </VStack>
            </VStack>
          </VStack>

          <VStack space="lg">
            <VStack space="sm">
              <Text className="text-sm text-black font-bold">Penerima</Text>
              <Divider />
              <Heading size={"sm"} className="font-normal">
                {destination.name}
              </Heading>
              <Text className="text-md">{`${destination.category?.bank?.type || destination.category?.pocket?.type} ${maskId(destination.id, 3)}`}</Text>
            </VStack>

            <VStack space="sm">
              <Text className="text-sm text-black font-bold">Sumber dana</Text>
              <Divider />
              <Heading size={"sm"} className="font-normal">
                {source.name}
              </Heading>
              <Text className="text-md">{`${source.category?.bank?.type || source.category?.pocket?.type} ${maskId(source.id, 3)}`}</Text>
            </VStack>

            <VStack space="sm">
              <Text className="text-sm text-black font-semibold">
                Detail {type.name}
              </Text>
              <Divider />

              <HStack className="justify-between">
                <Text className="text-sm text-black font-light">Nominal</Text>
                <Text className="text-sm text-black font-light">
                  {formatRupiah(transactionResult.amount)}
                </Text>
              </HStack>

              <HStack className="justify-between">
                <Text className="text-sm text-black font-light">
                  Biaya transaksi
                </Text>
                <Text className="text-sm text-black font-light">
                  {formatRupiah(0)}
                </Text>
              </HStack>
            </VStack>

            <HStack className="w-full justify-between items-center my-2">
              <Text className="text-md text-black font-normal">Total</Text>
              <Heading size="lg" className="font-bold text-black">
                {formatRupiah(transactionResult.amount)}
              </Heading>
            </HStack>

            <HStack space="2xl" className="justify-center mt-8">
              {receiptFeatures.map((feature, i) => (
                <Box key={i} className="w-1/4 mb-6 items-center">
                  <FeatureButton {...feature} />
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </ImageBackground>
  );
}
