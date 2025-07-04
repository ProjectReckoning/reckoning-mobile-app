// app/(main)/pocket/[id]/transaction/autoBudgeting/autoBudgetingConfirmation.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Modal, ScrollView, Alert } from "react-native";
import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { WondrColors } from "@/utils/colorUtils";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { CommonActions } from "@react-navigation/native";
import { useTransactionStore } from "@/stores/transactionStore";
import useAuthStore from "@/stores/authStore";

export default function AutoBudgetingConfirmation() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { deleteAutoBudget, isProcessing } = useTransactionStore();
  const { user, fetchUser } = useAuthStore();

  // --- NEW: Map for displaying schedule type ---
  const scheduleTypeDisplayMap = {
    weekly: "Mingguan",
    monthly: "Bulanan",
  };

  useEffect(() => {
    // Fetch the main user account details to show as "sumber dana"
    fetchUser();
  }, []);

  const pocketId = params.pocketId || params.pocket_id;
  const nominal = params.recurring_amount
    ? parseFloat(params.recurring_amount)
    : 0;
  const scheduleType = params.schedule_type || "weekly";
  const scheduleValue = params.schedule_value
    ? parseInt(params.schedule_value, 10)
    : null;
  const nextRunDate = params.next_run_date
    ? new Date(params.next_run_date)
    : null;

  let detailTanggalText = "Tanggal tidak diatur";
  if (scheduleValue !== null) {
    if (scheduleType === "weekly") {
      const weekdays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      detailTanggalText = `Setiap hari ${weekdays[scheduleValue]}`;
    } else if (scheduleType === "monthly") {
      detailTanggalText = `Setiap tanggal ${scheduleValue}`;
    }
    // --- REMOVED: 'daily' frequency logic ---
  }

  const nextRunDateText = nextRunDate
    ? nextRunDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum ditentukan";

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDone = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          { name: "home/index" },
          { name: "pocket/all/index" },
          { name: "pocket/[id]/index", params: { id: pocketId } },
        ],
      }),
    );
  };

  const handleConfirmDelete = async () => {
    if (!pocketId || isProcessing) return;
    try {
      await deleteAutoBudget(pocketId);
      Alert.alert("Sukses", "Jadwal auto-budgeting telah dihapus.");
      handleDone();
    } catch (error) {
      Alert.alert("Gagal", "Tidak dapat menghapus jadwal auto-budgeting.");
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <Box className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        className="px-6 py-5"
      >
        <Box className="items-center mt-5 mb-6">
          <PocketCard
            mode="icon"
            color={params.pocketColor || "bg-orange-wondr"}
            icon={params.pocketIcon || "pocket"}
            iconSize="10"
            whiteSpace="mb-5"
            className="w-12 h-12 rounded-full"
          />
          <Heading
            size="md"
            color="$text-black-600"
            className="text-center mt-2"
          >
            {params.pocketName || "Pocket"}
          </Heading>
          <Text size="sm" color="$text-black-600" className="text-center">
            {params.pocketAccountNumber || "N/A"}
          </Text>

          <Box className="mb-6 mt-4 items-center">
            <Heading size="2xl" color="$text-black-600" className="mt-1">
              Rp{nominal.toLocaleString("id-ID")}
            </Heading>
            <Box
              className="rounded-full py-1 px-3 self-center mt-2"
              style={{
                backgroundColor: WondrColors["green-select"] || "#4CAF50",
              }}
            >
              <Text
                size="xs"
                style={{ color: WondrColors["text-white"] || "#FFFFFF" }}
                className="font-semibold"
              >
                TERJADWAL
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="mb-6">
          <Text className="text-black font-light mb-2">Detail jadwal</Text>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Frekuensi
            </Text>
            {/* --- CHANGE: Use the display map for translation --- */}
            <Text size="md" color="$text-black-600" className="capitalize">
              {scheduleTypeDisplayMap[scheduleType] || scheduleType}
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Tanggal Eksekusi
            </Text>
            <Text size="md" color="$text-black-600">
              {detailTanggalText}
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Jadwal Berikutnya
            </Text>
            <Text size="md" color="$text-black-600">
              {nextRunDateText}
            </Text>
          </Box>
        </Box>

        <Box className="mb-4 mt-4">
          <TransactionCard
            title={"Sumber dana"}
            heading={"TAPLUS PEGAWAI BNI"}
            subheading={"1916826757"}
            balance={user?.balance}
            showBalance={true}
          />
        </Box>
      </ScrollView>

      <Box className="px-6 mb-8 mt-4 space-y-3">
        <PrimaryButton
          buttonAction={() => setIsDeleteModalVisible(true)}
          buttonTitle="Hapus Jadwal"
          buttonColor="bg-white"
          buttonActiveColor="active:bg-red-wondr-light"
          className="border border-red-wondr"
          textClassName="text-red-wondr font-bold"
        />
      </Box>

      {/* Delete Confirmation Modal */}
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
              Hapus Auto Budgeting?
            </Heading>
            <Text size="sm" color="$text-gray-500" className="text-center mb-6">
              Pengaturan auto budgeting akan dihapus permanen.
            </Text>
            <PrimaryButton
              buttonAction={handleConfirmDelete}
              buttonTitle="Hapus sekarang"
              className="mb-3"
              buttonColor="bg-red-wondr"
              textClassName="text-white font-bold text-base"
              buttonActiveColor="active:bg-red-wondr-dark"
              isLoading={isProcessing}
            />
            <PrimaryButton
              buttonAction={handleCancelDelete}
              buttonTitle="Batal"
              textClassName="text-black font-bold"
              buttonColor="bg-white"
              className="border border-black"
              buttonActiveColor="active:bg-gray-200"
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
