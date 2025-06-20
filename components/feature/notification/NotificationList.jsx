import React from "react";
// Pastikan Anda mengimpor Text dari react-native atau library UI Anda
import { FlatList, Text, View } from "react-native";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";

import {
  Pocket,
  Laptop,
  Diamond,
  Airplane,
  Moonstar,
  Group,
} from "@/assets/Icons/PocketIcon.js";

const iconMap = {
  Pocket,
  Laptop,
  Diamond,
  Airplane,
  Moonstar,
  Group,
  Default: Pocket,
};

const notificationData = [
  {
    id: "1",
    title: "Pocket Pergi ke Korea 2026",
    description: "Permintaan Persetujuan Penarikan Dana",
    date: "25 Jun 2026",
    type: "transaction_approval_needed",
  },
  {
    id: "2",
    title: "Pocket Liburan ke Jepang 2025",
    description: "Penarikan Dana",
    date: "15 Agu 2025",
    type: "transaction_success",
  },
  {
    id: "3",
    title: "Dana Darurat",
    description: "Transfer Dana",
    date: "03 Mar 2026",
    type: "transaction_success",
  },
  {
    id: "4",
    title: "Beli Laptop Baru",
    description: "Shidqi dihapus dari Pocket.",
    date: "20 Nov 2028",
  },
  {
    id: "5",
    title: "Pocket Dana Pendidikan Anak",
    description: "Laras keluar dari Pocket.",
    date: "10 Jan 2030",
  },
  {
    id: "6",
    title: "Pocket Dana Pendidikan Hantu",
    description: "Permintaan persetujuan undang anggota.",
    type: "member_approval_needed",
    date: "10 Jan 2030",
  },
];

export default function NotificationList() {
  const renderNotificationItem = ({ item }) => {
    const IconComponent = iconMap.Default;
    const notificationIcon = <Icon as={IconComponent} size="xl" />;

    return (
      <ReusableCellContent
        icon={notificationIcon}
        title={item.title}
        description={item.description}
        date={item.date}
      />
    );
  };

  const renderSeparator = () => <Box style={{ height: 16 }} />;

  // PERUBAHAN DI SINI
  const renderListHeader = () => (
    <View
      style={{
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB", // Warna garis
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Pesan lainnya
      </Text>
    </View>
  );

  return (
    <FlatList
      data={notificationData}
      renderItem={renderNotificationItem}
      keyExtractor={(item) => item.id}
      style={{ flex: 1, backgroundColor: "white", color: "#000000" }}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderListHeader}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}
    />
  );
}
