import { Box } from "@/components/ui/box";
import TabBar from "@/components/common/TabBar";
import { FlatList, Image, Text } from "react-native";
import { formatRupiah } from "@/utils/helperFunction";
import { useState, useCallback, useMemo } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent.jsx";

const tabList = [
  { key: "terjadwal", label: "Terjadwal" },
  { key: "selesai", label: "Selesai" },
];

const EmptyState = ({ imageSource, title, subtitle }) => (
  <Box className="flex-1 items-center justify-start">
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
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("terjadwal");
  const {
    getScheduleTransfer,
    isFetchingScheduleTransfer,
    scheduleTransferConfig,
  } = useTransactionStore();

  useFocusEffect(
    useCallback(() => {
      if (!id || isFetchingScheduleTransfer) return;
      getScheduleTransfer(id);
    }, []),
  );

  const filteredData = useMemo(() => {
    if (activeTab === "terjadwal") {
      return (
        scheduleTransferConfig?.filter((item) => item.status === "active") || []
      );
    } else {
      return (
        scheduleTransferConfig?.filter((item) => item.status === "inactive") ||
        []
      );
    }
  }, [activeTab, scheduleTransferConfig]);

  const renderItem = ({ item }) => {
    const avatarIcon = (
      <Avatar size="md" className="bg-[#F2F2F2]">
        <AvatarFallbackText className="text-[#58ABA1]">
          {item.detail.destination}
        </AvatarFallbackText>
      </Avatar>
    );

    // Format next_run_date to "Selanjutnya 1 Juli 2025"
    const formatNextRunDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const months = [
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
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `Selanjutnya ${day} ${month} ${year}`;
    };

    return (
      <ReusableCellContent
        icon={avatarIcon}
        title={item.detail.destination.toUpperCase()}
        description={formatNextRunDate(item.next_run_date)}
        date={formatRupiah(item.recurring_amount)}
        titleClassName="text-base"
        descriptionClassName="text-sm text-gray-500"
        dateClassName="text-base font-semibold"
        isRead={true}
      />
    );
  };

  const renderSeparator = () => <Box style={{ height: 16 }} />;

  const renderEmptyState = () => {
    if (activeTab === "terjadwal") {
      return (
        <EmptyState
          imageSource={require("@/assets/images/schedule_empty.png")}
          title="Kamu tidak punya transfer terjadwal"
          subtitle="Semua transfer yang Anda jadwalkan untuk masa depan akan muncul di sini."
        />
      );
    } else {
      return (
        <EmptyState
          imageSource={require("@/assets/images/schedule_done_empty.png")}
          title="Kamu belum punya jadwal transfer yang sudah selesai"
          subtitle="Kalau jadwal trasnfer kamu sudah selesa, kamu bisa lihat detailnya di sini."
        />
      );
    }
  };

  return (
    <Box className="bg-white px-8 pt-3 pb-6">
      <TabBar
        tabList={tabList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        size={16}
        marginVertical={16}
      />

      <FlatList
        // data={activeTab === "terjadwal" ? dataTerjadwal : dataSelesai}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyState}
        style={{ marginTop: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
