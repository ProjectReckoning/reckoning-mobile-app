// app/(main)/pocket/[id]/transaction/Statement.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import {
  transactionFeatures,
  scheduleTrxFeatures,
} from "@/utils/mockData/featureData";
import FeatureButton from "@/components/common/buttons/FeatureButton";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { formatRupiah, maskId } from "@/utils/helperFunction";
import TransactionCard from "@/components/common/cards/TransactionCard";
import StatementDecorator from "@/assets/images/decorators/statementlDecorator.png";
import ScheduleTrxDecorator from "@/assets/images/decorators/scheduleTrxDecorator.png";

export default function Statement() {
  let { isSchedule } = useLocalSearchParams();
  const {
    type,
    source,
    destination,
    transactionResult,
    resetTransactionState,
    selectedDate,
    selectedStartDate,
    selectedEndDate,
  } = useTransactionStore();
  const { resetPocketData } = usePocketStore();
  isSchedule = isSchedule === "true";

  const handleFinish = () => {
    // Reset the amount and go back to the home screen.
    resetPocketData();
    resetTransactionState();
    router.replace("(main)/home");
  };

  // --- NEW: Display a loading or error state if the transaction is not complete ---
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

  // Format the date from the API response
  const createdAt = new Date(transactionResult.createdAt).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const feature = isSchedule ? scheduleTrxFeatures : transactionFeatures;

  const formatIndoDateWithDay = (day, dateString) => {
    if (!day || !dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    date.setDate(Number(day));
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const startDate = formatIndoDateWithDay(selectedDate, selectedStartDate);
  const endDate = formatIndoDateWithDay(selectedDate, selectedEndDate);

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
            source={isSchedule ? ScheduleTrxDecorator : StatementDecorator}
            alt="pocket-type-decorator"
            className="w-fit h-40"
            resizeMode="contain"
          />
          <VStack space="lg" className="items-center mt-5">
            <Heading size="md" className="text-black font-semibold">
              {type.name} Berhasil {isSchedule ? "Dijadwalin" : ""}
            </Heading>
            {/* Use amount from the transaction result */}
            <Heading size="4xl" className="font-black text-black">
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

        <VStack className="w-full">
          <HStack space="lg" className="w-full items-start justify-center">
            {feature.map((feature, i) => (
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
            {isSchedule && (
              <TransactionCard
                title="Detail jadwal"
                heading={`Setiap tanggal ${selectedDate || 1}`}
                subheading={`${startDate || ""} - ${endDate || ""}`}
              />
            )}
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
