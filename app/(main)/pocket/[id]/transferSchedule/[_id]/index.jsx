import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";

import { useState, useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Modal, ScrollView, ActivityIndicator, Alert } from "react-native";

import { WondrColors } from "@/utils/colorUtils";
import { formatRupiah } from "@/utils/helperFunction";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";

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

export default function TransferBulananDetail() {
  const params = useLocalSearchParams();
  const pocketId = params.pocketId;
  const scheduleId = params.scheduleId;
  const navigation = useNavigation();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {
    fetchPocketById,
    currentPocket,
    isLoading: isPocketLoading,
  } = usePocketStore();
  const {
    getScheduleDetail,
    currentSchedule,
    isFetchingScheduleDetail,
    deleteScheduleTransfer,
    isProcessing,
  } = useTransactionStore();

  useEffect(() => {
    if (pocketId) fetchPocketById(pocketId);
    if (pocketId && scheduleId) getScheduleDetail(pocketId, scheduleId);
  }, [pocketId, scheduleId]);

  if (isPocketLoading || isFetchingScheduleDetail) {
    return (
      <Box className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
      </Box>
    );
  }

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (isProcessing) return; // Prevent multiple clicks

    try {
      await deleteScheduleTransfer(pocketId, scheduleId);
      setIsDeleteModalVisible(false);
      // After successful deletion, go back to the previous screen.
      // The store will have already refetched the updated list.
      navigation.goBack();
    } catch (error) {
      setIsDeleteModalVisible(false);
      Alert.alert("Gagal", "Tidak dapat menghapus jadwal transfer saat ini.");
      console.error("Failed to delete scheduled transfer:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const isActive = currentSchedule?.status === "active";

  return (
    <Box className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="px-6 py-5"
      >
        <Box className="items-center mt-5 mb-6">
          <PocketCard
            mode="icon"
            color={currentPocket?.color || "bg-pink-wondr"}
            iconSize="10"
            whiteSpace="mb-4"
            icon={currentPocket?.icon_name || "pocket"}
            className="w-16 h-16 rounded-full"
          />
          <Heading size="md" className=" mt-2 text-center">
            {currentPocket?.name || "Nama Pocketmu"}
          </Heading>
          <Text size="sm" color="$text-black-600" className="text-center">
            BNI SHARED POCKET. {currentPocket?.account_number || ""}
          </Text>

          <Box className="mb-6 mt-4 items-center">
            <Heading size="2xl" color="$text-black-600" className="mt-1">
              {formatRupiah(currentSchedule?.recurring_amount || 0)}
            </Heading>
            <Box
              className={`rounded-full py-1 px-3 self-center mt-2 ${isActive ? "bg-green-select" : "bg-light-gray-wondr"}`}
            >
              <Text
                size="sm"
                className={`font-bold ${isActive ? "text-white" : "text-black"}`}
              >
                {isActive ? "Terjadwal" : "Selesai"}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* --- Detail Jadwal --- */}
        <VStack space="sm" className="mt-5">
          <Text className="text-sm text-black font-semibold">
            Detail jadwal
          </Text>
          <Divider />
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Tanggal</Text>
            <Text className="text-sm text-black font-light">
              Setiap tanggal{" "}
              {currentSchedule?.next_run_date
                ? new Date(currentSchedule.next_run_date).getDate()
                : "-"}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Bulan mulai</Text>
            <Text className="text-sm text-black font-light">
              {currentSchedule?.detail?.start_date
                ? formatMonthYear(new Date(currentSchedule.detail.start_date))
                : "-"}
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Bulan selesai</Text>
            <Text className="text-sm text-black font-light">
              {currentSchedule?.detail?.end_date
                ? formatMonthYear(new Date(currentSchedule.detail.end_date))
                : "-"}
            </Text>
          </HStack>
        </VStack>

        {/* --- Detail Transfer --- */}
        <VStack space="sm" className="my-5">
          <Text className="text-sm text-black font-semibold">
            Detail transfer
          </Text>
          <Divider />
          <HStack className="justify-between">
            <Text className="text-sm text-black font-light">Nominal</Text>
            <Text className="text-sm text-black font-light">
              {formatRupiah(currentSchedule?.recurring_amount || 0)}
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

        <VStack space="lg" className="w-full">
          <TransactionCard
            title="Penerima"
            heading={currentSchedule?.detail?.destination?.toUpperCase() || "-"}
            subheading={currentSchedule?.detail?.user_id || ""}
          />
          <TransactionCard
            title="Sumber dana"
            heading={currentPocket?.name || "-"}
            subheading={`BNI SHARED POCKET. ${currentPocket?.account_number || ""}`}
          />
        </VStack>
      </ScrollView>

      {/* --- Tombol Aksi Hapus --- */}
      {isActive && (
        <Box className="px-6 mb-8 mt-auto py-4 bg-white border-t border-t-gray-100">
          <PrimaryButton
            buttonAction={handleDelete}
            buttonTitle="Hapus"
            buttonColor="bg-white"
            buttonActiveColor="active:bg-red-100"
            className="border border-red-500"
            textClassName="text-red-500 font-bold"
          />
        </Box>
      )}

      {/* --- Modal Konfirmasi Hapus --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={handleCancelDelete}
      >
        <Box className="absolute inset-0 bg-black/40 items-center justify-center px-6">
          <Box className="bg-white rounded-xl p-6 w-full max-w-sm">
            <Heading
              size="md"
              color="$text-black-600"
              className="text-center mb-2"
            >
              Hapus Jadwal Transfer?
            </Heading>
            <Text size="sm" color="$text-gray-500" className="text-center mb-6">
              Jadwal transfer bulanan ini akan dihapus secara permanen.
            </Text>

            <PrimaryButton
              buttonAction={handleConfirmDelete}
              buttonTitle={isProcessing ? "Menghapus..." : "Hapus Sekarang"}
              className="mb-3"
              buttonColor="bg-red-wondr"
              textClassName="text-white font-bold text-base"
              buttonActiveColor="active:bg-red-700"
              disabled={isProcessing}
            />
            <PrimaryButton
              buttonAction={handleCancelDelete}
              buttonTitle="Batal"
              textClassName="text-black font-bold"
              buttonColor="bg-white"
              className="border border-gray-300"
              buttonActiveColor="active:bg-gray-200"
              disabled={isProcessing}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
