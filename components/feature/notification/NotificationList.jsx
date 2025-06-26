import { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { FlatList, Text, View } from "react-native";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { useNotificationStore } from "@/stores/notificationStore";
import {
  notificationData,
  getUnreadCount,
} from "@/utils/notification/notification";
import ReusableCellContent from "@/components/common/tableCells/ReusableCellContent";
import { personalIconMap } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIconMap } from "@/utils/pocketCustomization/businessPocketIconUtils";

export default function NotificationList() {
  const { allPockets } = usePocketStore();
  const { readIds, markAsRead, resetReadIds } = useNotificationStore();
  const unreadCount = getUnreadCount(readIds, notificationData);

  // for testing purposes only
  // useEffect(() => {
  //   resetReadIds();
  // }, []);

  const handleNotificationPress = (id) => {
    console.log("Notification pressed");
    markAsRead(id);
  };

  const renderNotificationItem = ({ item }) => {
    const matchingPocket = allPockets.find((pocket) =>
      item.title.includes(pocket.name),
    );

    const iconKey = matchingPocket?.icon_name || "pocket";
    const colorClass = matchingPocket?.color || "bg-orange-wondr";

    const iconMap =
      matchingPocket?.type === "Business" ? businessIconMap : personalIconMap;
    const IconComponent =
      iconMap[iconKey.toLowerCase()] || personalIconMap.pocket;

    const colorName = colorClass.replace(/^bg-/, "");
    const notificationIcon = (
      <IconComponent width="40%" height="40%" color={WondrColors[colorName]} />
    );

    const isRead = readIds.includes(item.id);

    return (
      <ReusableCellContent
        icon={notificationIcon}
        iconContainerBgColor={`${colorClass}-light-translucent`}
        title={item.title}
        description={item.description}
        date={item.date}
        isRead={isRead}
        onPress={() => handleNotificationPress(item.id)}
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

  useEffect(() => {
    useNotificationStore.getState().loadReadIds();
  }, []);

  return (
    <FlatList
      data={notificationData}
      renderItem={renderNotificationItem}
      keyExtractor={(item) => item.id}
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
