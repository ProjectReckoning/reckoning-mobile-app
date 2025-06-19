import React, { useEffect, useState, useMemo } from "react"; // <-- Import useMemo
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils";
import useAuthStore from "@/stores/authStore";
import { Crown, Info } from "lucide-react-native";

import ReusableInformationCell from "../../common/tableCells/ReusableInformationCell";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { ScrollView, Platform, StyleSheet } from "react-native";

import notificationApproval from "../../../assets/images/notification-approval.png";
import notificationWithdraw from "../../../assets/images/notification-withdraw.png";

export const mockNotifications = [
  // [0] Notifikasi 1: Butuh persetujuan transaksi
  {
    title: "Persetujuan Penarikan Dana",
    date: "19 Jun 2025",
    type: "transaction_approval_needed",
    message:
      "Penarikan ini melebihi jumlah kontribusi anggota ke Shared Pocket.",

    data: [
      {
        title: "Diminta oleh",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Nominal",
        content: ["Rp200.000"],
        textClassName: "font-semibold",
      },
      {
        title: "Sumber Dana",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },

  // [1] Notifikasi 2: Butuh persetujuan anggota
  {
    title: "Undangan Shared Pocket Baru!",
    date: "18 Jun 2025",
    type: "member_approval_needed",
    message:
      "Ivanka mengajakmu berkolaborasi di Shared Pocket 'Pergi ke Korea 2026'. Bersama, kita bisa ciptakan hal-hal menakjubkan!",
    data: [
      {
        title: "Detail pengundang",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Detail pocket",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },

  // [2] Notifikasi 3: Transaksi berhasil
  {
    title: "Penarikan Dana Berhasil",
    date: "17 Jun 2025",
    type: "transaction_success",
    message:
      "Penarikan ini sesuai dengan jumlah kontribusi anggota ke Shared Pocket.",
    data: [
      {
        title: "Diminta oleh",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Nominal",
        content: ["Rp200.000"],
        textClassName: "font-semibold",
      },
      {
        title: "Sumber Dana",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },
];
// Mock data yang baru dan lebih lengkap
// const mockNotification = {
//   title: "Persetujuan Penarikan Dana",
//   date: "19 Jun 2025",
//   type: "transaction_approval_needed",
//   message: "Penarikan ini melebihi jumlah kontribusi anggota ke Shared Pocket.",
//   data: [
//     {
//       title: "Diminta oleh",
//       content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
//     },
//     {
//       title: "Nominal",
//       content: ["Rp200.000"],
//       textClassName: "font-semibold",
//     },
//     {
//       title: "Sumber Dana",
//       content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
//     },
//   ],
// };

export default function NotificationDetailContent() {
  // <-- 1. State disederhanakan menjadi satu objek notifikasi
  const [notification, setNotification] = useState(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // Di aplikasi nyata, Anda mungkin akan fetch data ini dari API
    setNotification(mockNotifications[0]);
  }, []); // Cukup dijalankan sekali

  // <-- 2. Gunakan useMemo untuk menghitung gambar agar lebih efisien
  const notificationImage = useMemo(() => {
    if (!notification) return null;

    switch (notification.type) {
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
    // ... (logika renderButtonBasedOnType tidak perlu diubah)
    switch (notification.type) {
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

    switch (notification.type) {
      case "transaction_approval_needed":
        return (
          <HStack className="items-center gap-2">
            <Info size={24} color={WondrColors["red-wondr"]} />
            <Text
              className="text-sm font-semibold text-black"
              style={{ flex: 1 }}
            >
              {notification.message}
            </Text>
          </HStack>
        );
      case "transaction_success":
        return (
          <Text
            className="text-sm font-semibold text-black"
            style={{ flex: 1 }}
          >
            {notification.message}
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
              {notification.message}
            </Text>
          </>
        );
      default:
        return <></>;
    }
  };

  // <-- Gunakan optional chaining (?.) untuk mencegah error jika notifikasi masih null
  if (!notification) {
    return (
      <Box className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </Box>
    ); // Atau loading indicator
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
            {notification.date}
          </Text>
        </Box>

        <Box className="w-full h-56 px-5" style={{ overflow: "hidden" }}>
          <Image
            source={notificationImage}
            className="w-full h-full"
            resizeMode="cover"
            size="none"
            style={{ height: undefined, width: undefined }}
          />
        </Box>

        <Box className="gap-3 my-5">{renderMessageBasedOnType()}</Box>

        {/* <-- 3. Render sel informasi secara dinamis menggunakan .map() */}
        <Box className="mb-5" gap={10}>
          {notification.data.map((item, index) => (
            <ReusableInformationCell
              key={index} // <-- Key sangat penting untuk performa list
              cellTitle={item.title}
              cellValue={item.content}
              textClassName={item.textClassName} // Akan undefined jika tidak ada, tidak masalah
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
