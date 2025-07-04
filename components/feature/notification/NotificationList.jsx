import { useEffect, useMemo, useCallback } from "react";
import { Box } from "@/components/ui/box";
import { FlatList, Text, View, ActivityIndicator } from "react-native";

import { router, useFocusEffect } from "expo-router";
import { useNotificationStore } from "@/stores/notificationStore";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";
import { personalIconMap } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { WondrColors } from "@/utils/colorUtils";

// Define constants for item and separator heights for getItemLayout
const ITEM_HEIGHT = 88; // Estimated height of your ReusableCellContent
const SEPARATOR_HEIGHT = 20; // Corresponds to h-5

export default function NotificationList() {
  const {
    notifications,
    isLoading,
    error,
    fetchAllNotifications,
    readIds,
    markAsRead,
    loadReadIds,
  } = useNotificationStore();

  // Fetch notifications every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchAllNotifications();
    }, [fetchAllNotifications]),
  );

  // Load read status from local storage once on initial mount
  useEffect(() => {
    loadReadIds();
  }, [loadReadIds]);

  // Calculate unread count dynamically from the fetched notifications
  const unreadCount = useMemo(() => {
    if (!notifications) return 0;
    return notifications.filter((item) => !readIds.includes(item._id)).length;
  }, [notifications, readIds]);

  const handleNotificationPress = (notifId, notifType) => {
    markAsRead(notifId);
    // The detail screen will fetch its own data using the ID
    // Do not navigate for purely informational notifications
    // if (notifType !== "information") {
    //   router.push(`/home/notification/${notifId}`);
    // }
    router.push(`/home/notification/${notifId}`);
  };

  // getItemLayout function to optimize FlatList rendering
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
    index,
  });

  const renderNotificationItem = ({ item }) => {
    // Add a defensive check in case an item is malformed
    if (!item || !item.data) {
      return null;
    }

    // Default icon, can be made dynamic later if needed
    const IconComponent = personalIconMap.pocket;
    const notificationIcon = (
      <IconComponent width="40%" height="40%" color="#848688" />
    );

    const notificationId = item._id; // Use the top-level _id from the API response
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

  const renderSeparator = () => <Box className="h-5" />;

  const renderListHeader = () => (
    <View className="flex flex-row gap-3 mb-7 pb-3 items-center border-b border-gray-300">
      <Text className="text-lg font-bold text-black">Pesan lainnya</Text>
      <Box className="w-7 h-7 items-center justify-center bg-orange-wondr rounded">
        <Text className="text-sm text-white font-bold">{unreadCount}</Text>
      </Box>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={WondrColors["tosca-wondr"]} />
        </Box>
      );
    }
    if (error) {
      return (
        <Box className="flex-1 justify-center items-center p-4">
          <Text className="text-center text-red-500">
            Error fetching notifications: {error}
          </Text>
        </Box>
      );
    }
    if (notifications.length === 0) {
      return (
        <Box className="flex-1 justify-center items-center p-4">
          <Text className="text-center">Tidak ada notifikasi.</Text>
        </Box>
      );
    }
    return (
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item._id} // Use the correct top-level _id
        className="flex-1 bg-white text-black"
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
        extraData={readIds} // Re-render list when readIds changes
        // --- ADD THIS PROP ---
        getItemLayout={getItemLayout}
        // --- END ---
      />
    );
  };

  return <Box className="flex-1 bg-white">{renderContent()}</Box>;
}
