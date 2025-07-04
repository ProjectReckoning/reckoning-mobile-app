// app/(main)/pocket/[id]/transaction/Statement.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

import { useNavigation, CommonActions } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Platform } from "react-native";
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
  let { id, isSchedule } = useLocalSearchParams();
  const navigation = useNavigation(); // Get navigation object
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
    resetPocketData();
    resetTransactionState();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "home/index" }],
      }),
    );
  };

  const handleSchedulePress = () => {
    // --- FIX: Reset transaction state before navigating ---
    resetTransactionState();

    navigation.dispatch(
      CommonActions.reset({
        index: 3,
        routes: [
          { name: "home/index" },
          { name: "pocket/all/index" },
          { name: "pocket/[id]/index", params: { id: id } },
          {
            name: "pocket/[id]/transferSchedule/index",
            params: { id: id },
          },
        ],
      }),
    );
  };

  const featuresWithScheduleReset = scheduleTrxFeatures.map((feature) => {
    if (feature.label === "Schedule") {
      return { ...feature, onPress: handleSchedulePress };
    }
    return feature;
  });

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
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const feature = isSchedule ? featuresWithScheduleReset : transactionFeatures;

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

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Box className="w-full flex-1 flex-col bg-white justify-between items-center">
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingRight: 10,
          justifyContent: "space-between",
        }}
        style={{ marginRight: -10, paddingHorizontal: 24, paddingTop: 20 }}
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
              {toSentenceCase(type.name)} berhasil{" "}
              {isSchedule ? "dijadwalin" : ""}
            </Heading>
            <Heading size="4xl" className="font-black text-black">
              {formatRupiah(
                isSchedule
                  ? transactionResult.recurring_amount
                  : transactionResult.amount,
              )}
            </Heading>
            <VStack space="xs" className="items-center">
              <Text>{createdAt}</Text>
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
              heading={destination.name.toUpperCase()}
              subheading={`${destination.category?.bank?.type || destination.category?.pocket?.type} . ${destination.id}`}
            />
            <TransactionCard
              title="Sumber dana"
              heading={source.name.toUpperCase()}
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
      <Box className="w-full px-6 py-4 bg-white" style={styles.shadowAbove}>
        <PrimaryButton
          buttonTitle="Kembali ke beranda"
          buttonAction={handleFinish}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  shadowAbove: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)",
        elevation: 3,
      },
    }),
  },
});
