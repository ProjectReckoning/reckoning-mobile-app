// app/(main)/pocket/[id]/transaction/Statement.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { ScrollView } from "react-native";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { transactionFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { formatRupiah, maskId } from "@/utils/helperFunction";
import TransactionCard from "@/components/common/cards/TransactionCard";
import StatementDecorator from "@/assets/images/decorators/statementlDecorator.png";

export default function Statement() {
  const {
    type,
    source,
    destination,
    transactionResult,
    resetTransactionState,
  } = useTransactionStore();
  const { resetPocketData } = usePocketStore();

  const handleFinish = () => {
    // Reset the amount and go back to the home screen.
    resetPocketData();
    resetTransactionState();
    router.replace("(main)/home");
  };

  if (!transactionResult) {
    return (
      <Box className="flex-1 justify-center items-center p-8">
        <Heading>Error</Heading>
        <Text className="text-center mt-2">
          Transaction details not found. Please try again.
        </Text>
        <PrimaryButton
          buttonTitle="Kembali ke beranda"
          buttonAction={handleFinish}
          className="my-5 w-full"
        />
      </Box>
    );
  }

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
    <Box className="w-full flex-1 flex-col bg-white justify-between items-center px-6 py-5 mb-3">
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingRight: 10,
          justifyContent: "space-between",
        }}
        style={{ marginRight: -10 }}
      >
        <VStack className="my-5">
          <Image
            source={StatementDecorator}
            alt="pocket-type-decorator"
            className="w-fit h-40"
            resizeMode="contain"
          />
          <VStack space="lg" className="items-center mt-3">
            <Heading size="md" className="text-black font-semibold">
              {type.name} Berhasil
            </Heading>
            <Heading size="4xl" className="font-black text-black">
              {formatRupiah(transactionResult.amount)}
            </Heading>
            <VStack space="xs" className="items-center">
              <Text>{createdAt}</Text>
              <Text>{`RefID: ${transactionResult.id}`}</Text>
            </VStack>
          </VStack>
        </VStack>

        <VStack className="w-full">
          <HStack space="lg" className="w-full items-start justify-center">
            {transactionFeatures.map((feature, i) => (
              <Box key={i} className="w-1/4 mb-6 items-center">
                <FeatureButton {...feature} />
              </Box>
            ))}
          </HStack>

          <VStack space="lg" className="w-full">
            <TransactionCard
              title="Penerima"
              heading={destination.name}
              subheading={`${destination.category?.bank?.type || destination.category?.pocket?.type} . ${destination.id}`}
            />
            <TransactionCard
              title="Sumber dana"
              heading={source.name}
              subheading={`${source.category?.bank?.type || source.category?.pocket?.type} ${maskId(source.id, 3)}`}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <PrimaryButton
        buttonTitle="Kembali ke beranda"
        buttonAction={handleFinish}
        className="my-3"
      />
    </Box>
  );
}
