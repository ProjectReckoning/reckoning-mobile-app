import React, { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Modal, ScrollView, Pressable, View } from "react-native";
import PocketCard from "@/components/common/cards/PocketCard"; // Komponen ini dipertahankan sesuai permintaan
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { WondrColors } from "@/utils/colorUtils";
import TransactionCard from "@/components/common/cards/TransactionCard";
import { CommonActions } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

export default function TransferBulananDetail() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const pocketId = params.pocket_id;

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Transfer bulanan",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 24 }}
        >
          <ArrowLeft size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation, pocketId]);

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    console.log("Jadwal transfer akan dihapus!");
    setIsDeleteModalVisible(false);
    navigation.goBack();
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

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
            color="bg-pink-wondr"
            iconSize="10"
            whiteSpace="mb-4"
            icon="Pocket"
            className="w-16 h-16 rounded-full"
          />
          <Heading size="md" className=" mt-2 text-center">
            Styles.io
          </Heading>
          <Text size="sm" color="$text-black-600" className="text-center">
            BNI SHARED POCKET. 0238928039
          </Text>

          <Box className="mb-6 mt-4 items-center">
            <Heading size="2xl" color="$text-black-600" className="mt-1">
              Rp2.500.000
            </Heading>
            <Box
              className="rounded-full py-1 px-3 self-center mt-2"
              style={{
                backgroundColor: WondrColors["green-select"] || "#D4EDDA",
              }}
            >
              <Text size="sm" className="bg-green-select font-bold text-white">
                Terjadwal
              </Text>
            </Box>
          </Box>
        </Box>

        {/* --- Detail Jadwal --- */}
        <Box className="my-4  ">
          <Text className="mb-3 font-bold text-black">Detail jadwal</Text>
          <View className="h-px bg-gray-200" />
          <Box className="flex-row justify-between mb-2 mt-2">
            <Text size="sm" className="text-black">
              Tanggal
            </Text>
            <Text size="sm" className="font-semibold text-black ">
              Setiap tanggal 1
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="sm" className="text-black">
              Bulan mulai
            </Text>
            <Text size="sm" className="font-semibold text-black">
              Agustus 2025
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="sm" className="text-black">
              Bulan selesai
            </Text>
            <Text size="sm" className="font-semibold text-black">
              September 2025
            </Text>
          </Box>
        </Box>

        {/* --- Detail Transfer --- */}
        <Box className="mb-4">
          <Text className="text-black mb-3 font-bold">Detail transfer</Text>
          <View className="h-px bg-gray-200" />
          <Box className="flex-row justify-between mb-2">
            <Text size="sm" className="mt-2 text-black">
              Nominal
            </Text>
            <Text size="sm" className="mt-2 font-semibold text-black">
              Rp2.000.000
            </Text>
          </Box>
          <Box className="flex-row justify-between mb-2">
            <Text size="sm" className="text-black">
              Biaya transaksi
            </Text>
            <Text size="sm" className="font-semibold text-black">
              Rp0
            </Text>
          </Box>
        </Box>

        {/* --- Penerima (Komponen Card) --- */}
        <Box className="mb-4 mt-2">
          <Text className="font-bold mb-3 text-black">Penerima</Text>

          <TransactionCard
            heading="FARREL BRIAN RAFI"
            subheading="TAPLUS PEGAWAI BNI. 1916167464"
            showBalance={false}
          />
        </Box>

        {/* --- Sumber Dana (Komponen Card) --- */}
        <Box className="mb-4 mt-2">
          <Text className="font-bold mb-3 text-black">Sumber dana</Text>
          <TransactionCard
            heading="Pergi ke Korea 2026"
            subheading="SHARED POCKET BNI. 0238928039"
            showBalance={false}
          />
        </Box>
      </ScrollView>

      {/* --- Tombol Aksi Hapus --- */}
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
              buttonTitle="Hapus Sekarang"
              className="mb-3"
              buttonColor="bg-red-wondr"
              textClassName="text-white font-bold text-base"
              buttonActiveColor="active:bg-red-700"
            />
            <PrimaryButton
              buttonAction={handleCancelDelete}
              buttonTitle="Batal"
              textClassName="text-black font-bold"
              buttonColor="bg-white"
              className="border border-gray-300"
              buttonActiveColor="active:bg-gray-200"
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
