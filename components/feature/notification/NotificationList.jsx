import { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { FlatList, Text, View } from "react-native";

import { router } from "expo-router";
import {
  notificationData,
  getUnreadCount,
} from "@/utils/notification/notification";
import { useNotificationStore } from "@/stores/notificationStore";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";
import { personalIconMap } from "@/utils/pocketCustomization/personalPocketIconUtils";

export default function NotificationList() {
  const {
    setSelectedNotification,
    readIds,
    markAsRead,
    loadReadIds,
    resetReadIds,
  } = useNotificationStore();
  const unreadCount = getUnreadCount(readIds, notificationData);

  // for testing purposes only
  // useEffect(() => {
  //   resetReadIds();
  // }, []);

  const handleNotificationPress = (id, type) => {
    markAsRead(id);
    setSelectedNotification(id);

    if (type !== "information") {
      router.push(`/home/notification/${id}`);
    }
  };

  useEffect(() => {
    loadReadIds();
  }, []);

  const renderNotificationItem = ({ item }) => {
    const IconComponent = personalIconMap.pocket;
    const notificationIcon = (
      <IconComponent width="40%" height="40%" color="#848688" />
    );

    const notificationId = item.data._id;
    const notificationType = item.data.type;
    const isRead = readIds.includes(notificationId);
    const formattedDate = new Date(item.data.date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <ReusableCellContent
        icon={notificationIcon}
        title={item.title}
        description={item.body}
        date={formattedDate}
        isRead={isRead}
        onPress={() =>
          handleNotificationPress(notificationId, notificationType)
        }
      />
    );
  };

  // separator or spacing between items
  const renderSeparator = () => <Box className="h-5" />;

  // Header for the notification list
  const renderListHeader = () => (
    <View className="flex flex-row gap-3 mb-7 pb-3 items-center border-b border-gray-300">
      <Text className="text-lg font-bold text-black">Pesan lainnya</Text>
      <Box className="w-7 h-7 items-center justify-center bg-red-wondr rounded">
        <Text className="text-sm text-white font-bold">{unreadCount}</Text>
      </Box>
    </View>
  );

  return (
    <FlatList
      data={notificationData}
      renderItem={renderNotificationItem}
      keyExtractor={(item) => item.data._id}
      className="flex-1 bg-white text-black"
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderListHeader}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}
      extraData={readIds}
    />
  );
}
