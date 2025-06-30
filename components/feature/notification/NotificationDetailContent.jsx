import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";

import { Info } from "lucide-react-native";
import useAuthStore from "@/stores/authStore";
import { useEffect, useState, useMemo } from "react";
import { ScrollView, Platform, StyleSheet } from "react-native";

import {
  notificationData,
  mockNotifications,
} from "@/utils/notification/notification";
import { WondrColors } from "@/utils/colorUtils";
import { formatRupiah } from "@/utils/helperFunction";
import { useNotificationStore } from "@/stores/notificationStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import notificationApproval from "@/assets/images/notification-approval.png";
import notificationWithdraw from "@/assets/images/notification-withdraw.png";
import ReusableInformationCell from "@/components/common/tableCells/ReusableInformationCell";

export default function NotificationDetailContent() {
  const user = useAuthStore((state) => state.user);
  const selectedNotification = useNotificationStore(
    (state) => state.selectedNotification,
  );

  // get mock notification data
  const notification = notificationData.find(
    (notification) => notification.data._id === selectedNotification,
  );
  // const notification = notificationData[5];
  const formattedDate = new Date(notification.data.date).toLocaleDateString(
    "id-ID",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const notificationImage = useMemo(() => {
    if (!notification) return null;

    switch (notification?.data.type) {
      case "member_approval_needed":
      case "transaction_approval_needed":
        return notificationApproval;
      case "transaction_success":
        return notificationWithdraw;
      default:
        return null;
    }
  }, [notification]);

  const renderButtonBasedOnType = () => {
    if (!notification) return null;
    switch (notification?.data.type) {
      case "transaction_approval_needed":
      case "member_approval_needed":
        return (
          <Box className="px-8 py-4 gap-4 bg-white" style={styles.shadowAbove}>
            <PrimaryButton
              buttonTitle="Terima"
              textClassName="text-black text-base text-center font-bold"
            />
            <PrimaryButton
              buttonTitle="Tolak"
              buttonColor={"bg-red-wondr"}
              buttonActiveColor={"active:bg-red-wondr-dark"}
              textClassName="text-white text-base text-center font-bold"
            />
          </Box>
        );
      default:
        return <></>;
    }
  };

  const renderMessageBasedOnType = () => {
    if (!notification) return null;

    switch (notification?.data.type) {
      case "transaction_approval_needed":
        return (
          <HStack className="items-center gap-2">
            <Info size={24} color={WondrColors["red-wondr"]} />
            <Text
              className="text-sm font-semibold text-black"
              style={{ flex: 1 }}
            >
              {notification?.data.message}
            </Text>
          </HStack>
        );
      case "transaction_success":
        return (
          <Text
            className="text-sm font-semibold text-black"
            style={{ flex: 1 }}
          >
            {notification?.data.message}
          </Text>
        );
      case "member_approval_needed":
        return (
          <>
            <Text
              className="text-xl font-medium text-black"
              style={{ flex: 1 }}
            >
              Hai, {user?.name.toUpperCase()}
            </Text>
            <Text className="text-m text-black" style={{ flex: 1 }}>
              {notification?.data.message}
            </Text>
          </>
        );
      default:
        return <></>;
    }
  };

  const renderDetailData = () => {
    if (!notification) return [];
    let detailData = [];

    switch (notification?.data.type) {
      case "transaction_approval_needed":
      case "transaction_success":
        detailData = [
          {
            title: "Diminta oleh",
            content: [
              `Sdr ${notification?.data.requestedBy.name}`,
              `${notification?.data.requestedBy.category.bank.name}. ${notification?.data.requestedBy.id}`,
            ],
          },
          {
            title: "Nominal",
            content: [formatRupiah(notification?.data.amount)],
            textClassName: "font-semibold",
          },
          {
            title: "Sumber Dana",
            content: [
              notification?.title,
              `SHARED POCKET BNI. ${notification?.data.pocket.id}`,
            ],
          },
        ];
        break;
      case "member_approval_needed":
        detailData = [
          {
            title: "Detail pengundang",
            content: [
              `Sdr ${notification?.data.requestedBy.name}`,
              `${notification?.data.requestedBy.category.bank.name}. ${notification?.data.requestedBy.id}`,
            ],
          },
          {
            title: "Detail pocket",
            content: [
              notification?.title,
              `SHARED POCKET BNI. ${notification?.data.pocket.id}`,
            ],
          },
        ];
        break;
      default:
        detailData = [];
    }
    return detailData;
  };

  if (!notification) {
    return (
      <Box className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 flex-col bg-white">
      <ScrollView className="flex-1 px-8 py-6">
        <Box className="mb-5">
          <Text className="text-xl font-bold text-black">
            {notification?.body}
          </Text>
          <Text
            className="text-sm"
            style={{ color: WondrColors["dark-gray-wondr-deactive"] }}
          >
            {formattedDate}
          </Text>
        </Box>

        <Box className="w-full h-56 px-5" style={{ overflow: "hidden" }}>
          <Image
            source={notificationImage}
            className="w-full h-full"
            resizeMode="cover"
            size="none"
            style={{ height: undefined, width: undefined }}
            alt="Notification Image"
          />
        </Box>

        <Box className="gap-3 my-5">{renderMessageBasedOnType()}</Box>

        {/* <-- 3. Render sel informasi secara dinamis menggunakan .map() */}
        <Box className="mb-5" gap={10}>
          {renderDetailData().map((item, index) => (
            <ReusableInformationCell
              key={index}
              cellTitle={item.title}
              cellValue={item.content}
              textClassName={item.textClassName}
            />
          ))}
        </Box>
      </ScrollView>

      {renderButtonBasedOnType()}
    </Box>
  );
}

const styles = StyleSheet.create({
  shadowAbove: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)",
        elevation: 3,
      },
    }),
  },
});
