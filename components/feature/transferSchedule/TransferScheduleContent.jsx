import React, { useState } from "react";
// LANGKAH 1: Impor FlatList, Image, dan Text dari react-native
import { FlatList, Image, Text } from "react-native";
import { Box } from "@/components/ui/box";
import ScheduleTopBar from "./ScheduleTopBar.jsx";
import TabBar from "@/components/common/TabBar";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent.jsx";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

// --- FUNGSI HELPER (Tidak berubah) ---

const dataTerjadwal = [
  {
    id: "1",
    title: "IVANKA LARASATI KUSUMADEWI",
    date: "Selanjutnya 1 Agustus 2025",
    amount: "Rp2.000.000",
  },
  {
    id: "2",
    title: "BUDI PRASETYO",
    date: "Selanjutnya 5 Agustus 2025",
    amount: "Rp500.000",
  },
];

const dataSelesai = [
  {
    id: "1",
    title: "IVANKA LARASATI KUSUMADEWI",
    date: "Selesai pada 1 Juni 2025",
    amount: "Rp2.000.000",
  },
  {
    id: "2",
    title: "CITRA LESTARI",
    date: "Selesai pada 28 Mei 2025",
    amount: "Rp1.500.000",
  },
];

const tabList = [
  { key: "terjadwal", label: "Terjadwal" },
  { key: "selesai", label: "Selesai" },
];

const EmptyState = ({ imageSource, title, subtitle }) => (
  <Box className="flex-1 items-center justify-start">
    {/* Ganti path gambar sesuai dengan lokasi aset Anda */}
    <Image
      source={imageSource}
      style={{ width: 300, height: 200, marginBottom: 0 }}
      resizeMode="contain"
    />
    <Text className="text-xl font-bold text-center text-gray-800 mb-2">
      {title}
    </Text>
    <Text className="text-sm text-center text-gray-500 px-4">{subtitle}</Text>
  </Box>
);

export default function TransferScheduleContent() {
  const [activeTab, setActiveTab] = useState("terjadwal");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // --- FUNGSI renderItem untuk FlatList (Tidak berubah) ---
  const renderItem = ({ item }) => {
    const avatarIcon = (
      <Avatar size="md" className="bg-[#F2F2F2]">
        <AvatarFallbackText className="text-[#58ABA1]">
          {item.title}
        </AvatarFallbackText>
      </Avatar>
    );

    return (
      <ReusableCellContent
        icon={avatarIcon}
        title={item.title}
        description={item.date}
        date={item.amount}
        titleClassName="text-base"
        descriptionClassName="text-sm text-gray-500"
        dateClassName="text-base font-semibold"
        isRead={true}
      />
    );
  };

  // --- FUNGSI renderSeparator untuk spasi antar item (Tidak berubah) ---
  const renderSeparator = () => <Box style={{ height: 16 }} />;

  // --- LANGKAH 4: Buat fungsi untuk merender komponen EmptyState secara dinamis ---
  // Fungsi ini akan dipanggil oleh FlatList ketika datanya kosong.
  const renderEmptyState = () => {
    if (activeTab === "terjadwal") {
      return (
        <EmptyState
          // Pastikan path ke gambar ini benar
          imageSource={require("../../../assets/images/schedule_empty.png")}
          title="Kamu tidak punya transfer terjadwal"
          subtitle="Semua transfer yang Anda jadwalkan untuk masa depan akan muncul di sini."
        />
      );
    } else {
      return (
        <EmptyState
          // Pastikan path ke gambar ini benar
          imageSource={require("../../../assets/images/schedule_done_empty.png")}
          title="Kamu belum punya jadwal transfer yang sudah selesai"
          subtitle="Kalau jadwal trasnfer kamu sudah selesa, kamu
bisa lihat detailnya di sini."
        />
      );
    }
  };

  return (
    <Box className=" bg-white px-8 pt-3 pb-6">
      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
        marginVertical={16}
      />

      {/* --- PENGGUNAAN FLATLIST DENGAN KONDISI KOSONG --- */}
      <FlatList
        data={activeTab === "terjadwal" ? dataTerjadwal : dataSelesai}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        // --- LANGKAH 5: Tambahkan prop `ListEmptyComponent` ---
        // Prop ini akan me-render komponen `renderEmptyState` jika data kosong.
        ListEmptyComponent={renderEmptyState}
        // Styling untuk FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={{
          // flexGrow: 1 dibutuhkan agar `justify-center` pada EmptyState berfungsi
          flexGrow: 1,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
