import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { router, useLocalSearchParams } from "expo-router";
import { Modal, ScrollView } from "react-native";
import AppBar from "@/components/common/AppBar";
import PocketCard from "@/components/common/cards/PocketCard";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { Info } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import TransactionCard from "@/components/common/cards/TransactionCard";

export default function AutoBudgetingConfirmation() {
  const params = useLocalSearchParams();

  const nominal = params.nominal ? parseFloat(params.nominal) : 0;
  const frequency = params.frequency || "Mingguan";
  const selectedDateRaw = params.selectedDate;
  const selectedDate = selectedDateRaw
    ? `Setiap tanggal ${selectedDateRaw}`
    : "Tanggal belum dipilih";

  const startDate = params.startDate
    ? new Date(params.startDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Belum ditentukan";
  const endDate = params.endDate
    ? new Date(params.endDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const pocketDetail = {
    name: params.pocketDetail?.name || "Pergi ke Korea 2026",
    accountNumber:
      params.pocketDetail?.accountNumber || "BNI SHARED POCKET. 0238928039",
    color: params.pocketDetail?.color || "bg-orange-wondr",
    icon: params.pocketDetail?.icon || "Airplane",
    pocketType: "Saving",
  };

  const sourceFund = {
    title: params.sourceFund?.title || "Sumber dana",
    heading: params.sourceFund?.heading || "TAPLUS PEGAWAI BNI",
    subheading: params.sourceFund?.subheading || "1916826757",
    balance: params.sourceFund?.balance || "10495750",
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log("Auto budgeting benar-benar dihapus!");
    setIsDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <Box className="flex-1 bg-white">
      <AppBar title="Auto budgeting" onBack={handleBack} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        className="px-6 py-5"
      >
        <Box className="items-center mt-5 mb-6">
          <PocketCard
            mode="icon"
            pocketType={pocketDetail.pocketType}
            color={pocketDetail.color}
            icon={pocketDetail.icon}
            iconSize="10"
            whiteSpace="mb-5"
            className="w-12 h-12 rounded-full"
          />
          <Heading
            size="md"
            color="$text-black-600"
            className="text-center mt-2"
          >
            {pocketDetail.name}
          </Heading>
          <Text size="sm" color="$text-black-600" className="text-center">
            {pocketDetail.accountNumber}
          </Text>

          <Box className="mb-6 mt-4 items-center">
            <Heading size="2xl" color="$text-black-600" className="mt-1">
              Rp{nominal.toLocaleString("id-ID")}
            </Heading>
            {nominal > 0 && (
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
            )}
          </Box>
        </Box>

        <Box className="mb-6">
          <Text className="text-black font-light mb-2">Detail jadwal</Text>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Frekuensi
            </Text>
            <Text size="md" color="$text-black-600">
              {frequency}
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Tanggal
            </Text>
            <Text size="md" color="$text-black-600">
              {selectedDate}
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="md" color="$text-black-600">
              Tanggal mulai
            </Text>
            <Text size="md" color="$text-black-600">
              {startDate}
            </Text>
          </Box>
          {endDate && (
            <Box className="flex-row justify-between">
              <Text size="md" color="$text-black-600">
                Tanggal selesai
              </Text>
              <Text size="md" color="$text-black-600">
                {endDate}
              </Text>
            </Box>
          )}
        </Box>

        <Box className="mb-4 mt-4">
          <TransactionCard
            title={sourceFund.title}
            heading={sourceFund.heading}
            subheading={sourceFund.subheading}
            balance={sourceFund.balance}
            showBalance={true}
          />
        </Box>
      </ScrollView>

      {!isDeleteModalVisible && (
        <Box className="mx-4 mb-8 mt-4">
          <PrimaryButton
            buttonAction={handleDelete}
            buttonTitle="Hapus"
            buttonColor="bg-white"
            buttonActiveColor="active:bg-red-wondr-light"
            disabled={false}
            className="border border-red-wondr"
            textClassName="text-red-wondr font-bold"
          />
        </Box>
      )}

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
