import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { useLocalSearchParams, router } from "expo-router";

import { Info } from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { ScrollView, Platform, StyleSheet, Alert } from "react-native";

import { WondrColors } from "@/utils/colorUtils";
import { formatRupiah } from "@/utils/helperFunction";
import { useNotificationStore } from "@/stores/notificationStore";
import { usePocketStore } from "@/stores/pocketStore";
import { useTransactionStore } from "@/stores/transactionStore";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import notificationApproval from "@/assets/images/notification-approval.png";
import notificationWithdraw from "@/assets/images/notification-withdraw.png";
import notificationInformation from "@/assets/images/approval.png";
import ReusableInformationCell from "@/components/common/tableCells/ReusableInformationCell";
import useAuthStore from "@/stores/authStore";

export default function NotificationDetailContent() {
  const { id } = useLocalSearchParams();
  const user = useAuthStore((state) => state.user);

  const {
    selectedNotification: notification,
    isDetailLoading,
    fetchNotificationById,
  } = useNotificationStore();

  const { respondToPocketInvite, isMemberActionLoading } = usePocketStore();
  const { respondToTransfer, isProcessing: isTransactionProcessing } =
    useTransactionStore();

  const isLoading = isMemberActionLoading || isTransactionProcessing;

  useEffect(() => {
    if (id) {
      fetchNotificationById(id);
    }
  }, [id, fetchNotificationById]);

  const formattedDate = notification?.data?.date
    ? new Date(notification.data.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const notificationImage = useMemo(() => {
    if (!notification) return null;
    const type = notification.data?.type;
    switch (type) {
      case "member_approval_needed":
      case "transaction_approval_needed":
        return notificationApproval;
      case "transaction_success":
        return notificationWithdraw;
      case "information":
        return notificationInformation;
      default:
        return null;
    }
  }, [notification]);

  const handleResponse = async (action) => {
    if (isLoading || !notification) return;
    const notifType = notification.data?.type;

    try {
      if (notifType === "member_approval_needed") {
        const inviteId = notification.data.inviteData?._id;
        if (!inviteId)
          throw new Error("Invite ID not found in notification data.");
        await respondToPocketInvite(inviteId, action);
      } else if (notifType === "transaction_approval_needed") {
        const transactionId = notification.data.transaction_id;
        if (!transactionId)
          throw new Error("Transaction ID not found in notification data.");
        await respondToTransfer(transactionId, action);
      }

      await fetchNotificationById(id);
      Alert.alert("Sukses", "Respon Anda telah direkam.");
    } catch (error) {
      Alert.alert("Gagal", error.message || "Gagal merespon notifikasi.");
    }
  };

  const renderButtonBasedOnType = () => {
    if (!notification) return null;

    const notifType = notification.data?.type;
    let status;

    if (notifType === "member_approval_needed") {
      status = notification.data.inviteData?.status;
    } else if (notifType === "transaction_approval_needed") {
      status = notification.data.status;
    } else {
      return null;
    }

    if (status === "pending") {
      return (
        <Box className="px-8 py-4 gap-4 bg-white" style={styles.shadowAbove}>
          <PrimaryButton
            buttonTitle="Terima"
            textClassName="text-black text-base text-center font-bold"
            // --- FIX: Changed prop name from onPress to buttonAction ---
            buttonAction={() => handleResponse("accepted")}
            disabled={isLoading}
            isLoading={isLoading}
          />
          <PrimaryButton
            buttonTitle="Tolak"
            buttonColor={"bg-red-wondr"}
            buttonActiveColor={"active:bg-red-wondr-dark"}
            textClassName="text-white text-base text-center font-bold"
            // --- FIX: Changed prop name from onPress to buttonAction ---
            buttonAction={() => handleResponse("rejected")}
            disabled={isLoading}
          />
        </Box>
      );
    }

    if (status === "accepted") {
      return (
        <Box className="px-8 py-4 bg-white" style={styles.shadowAbove}>
          <PrimaryButton
            buttonTitle="Diterima"
            buttonColor="bg-green-select"
            disabled={true}
          />
        </Box>
      );
    }

    if (status === "rejected") {
      return (
        <Box className="px-8 py-4 bg-white" style={styles.shadowAbove}>
          <PrimaryButton
            buttonTitle="Ditolak"
            buttonColor="bg-red-wondr"
            disabled={true}
          />
        </Box>
      );
    }

    return null;
  };

  const renderMessageBasedOnType = () => {
    if (!notification) return null;
    const { type, message } = notification.data;
    switch (type) {
      case "transaction_approval_needed":
        return (
          <HStack className="items-center gap-2 p-3 -my-2 rounded-lg">
            <Info size={24} color={WondrColors["red-wondr"]} />
            <Text
              className="text-sm font-semibold text-black"
              style={{ flex: 1 }}
            >
              Transaksi ini melebihi jumlah kontribusi anggota ke Shared Pocket.
            </Text>
          </HStack>
        );
      case "information":
        return (
          <Text className="text-lg text-black" style={{ flex: 1 }}>
            {notification.body}
          </Text>
        );
      case "member_approval_needed":
        return (
          <>
            <Text
              className="text-xl font-medium text-black"
              style={{ flex: 1 }}
            >
              Hai, {(user?.name || "").toUpperCase()}
            </Text>
            <Text className="text-m text-black" style={{ flex: 1 }}>
              {message}
            </Text>
          </>
        );
      default:
        return <Text>{notification.body}</Text>;
    }
  };

  const renderDetailData = () => {
    if (!notification) return [];
    let detailData = [];
    const { type, requestedBy, amount, pocket } = notification.data;

    switch (type) {
      case "transaction_approval_needed":
        detailData = [
          {
            title: "Diminta oleh",
            content: [`Sdr ${requestedBy?.name}`],
          },
          {
            title: "Nominal",
            content: [formatRupiah(amount)],
            textClassName: "font-semibold",
          },
          {
            title: "Sumber Dana",
            content: [
              pocket?.name,
              `SHARED POCKET BNI. ${pocket?.account_number}`,
            ],
          },
        ];
        break;
      case "member_approval_needed":
        detailData = [
          {
            title: "Detail pengundang",
            content: [`Sdr ${requestedBy?.name}`],
          },
          {
            title: "Detail pocket",
            content: [
              pocket?.name,
              `SHARED POCKET BNI. ${pocket?.account_number}`,
            ],
          },
        ];
        break;
      default:
        detailData = [];
    }
    return detailData;
  };

  if (isDetailLoading && !notification) {
    return (
      <Box className="flex-1 justify-center items-center bg-white">
        <Spinner size="large" color={WondrColors["tosca-wondr"]} />
      </Box>
    );
  }

  if (!notification) {
    return (
      <Box className="flex-1 justify-center items-center bg-white p-6">
        <Text className="text-center">Tidak ada notifikasi.</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 flex-col bg-white">
      <ScrollView className="flex-1 px-8 py-6">
        <Box className="mb-5">
          <Text className="text-xl font-bold text-black">
            {notification.title}
          </Text>
          <Text
            className="text-sm"
            style={{ color: WondrColors["dark-gray-wondr-deactive"] }}
          >
            {formattedDate}
          </Text>
        </Box>

        {notificationImage && (
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
        )}

        <Box className="gap-3 my-5">{renderMessageBasedOnType()}</Box>

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
        shadowOffset: { width: 0, height: -5 },
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
