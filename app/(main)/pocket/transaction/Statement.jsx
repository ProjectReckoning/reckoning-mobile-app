import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";
import { ScrollView } from "react-native";
import { useTransactionStore } from "@/stores/transactionStore";
import { transactionFeatures } from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { formatRupiah, maskId } from "../../../../utils/helperFunction";
import TransactionCard from "@/components/common/cards/TransactionCard";
import StatementDecorator from "@/assets/images/decorators/statementlDecorator.png";

export default function Statement() {
  // Static data for mockup
  const pocketName = "Pergi ke Korea 2026";
  const pocketColor = "bg-orange-wondr";
  const pocketIcon = "Airplane";
  const pocketId = "0238928039";
  const now = new Date();
  const dateTime = now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");
  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const createdAt = `${dateTime} . ${time} WIB`;
  const refId = "20250625840802948";
  console.log(dateTime, time, refId);

  const { type, amount, source, destination, setAmount } =
    useTransactionStore();

  return (
    <Box className="w-full flex-1 flex-col bg-white justify-between items-center px-6 py-5">
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

          {/* Content */}
          <VStack space="lg" className="items-center mt-3">
            <Heading size="md" className="text-black font-semibold">
              {type.name} Berhasil
            </Heading>
            <Heading size="4xl" className="font-black text-black">
              {formatRupiah(amount)}
            </Heading>
            <VStack space="xs" className="items-center">
              <Text>{createdAt}</Text>
              <Text>{`RefID: ${refId}`}</Text>
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
              heading={pocketName}
              subheading={`${destination.pocket.type} . ${destination.pocket.id}`}
            />
            <TransactionCard
              title="Sumber dana"
              heading={source.name}
              subheading={`${source.type} ${maskId(source.id, 3)}`}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <PrimaryButton
        buttonTitle="Kembali ke beranda"
        buttonAction={() => {
          setAmount(null);
          router.push("(main)/pocket/transaction/topup");
        }}
        className="my-3"
      />
    </Box>
  );
}
