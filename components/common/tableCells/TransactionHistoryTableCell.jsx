import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { WondrColors } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

// Impor ikon yang akan digunakan
import {
  HandCoins,
  BanknoteArrowUp,
  BanknoteArrowDown,
  WalletCards,
  Wallet,
  Send,
  Package,
  CalendarClock,
} from "lucide-react-native";

// --- KONFIGURASI KATEGORI (Hanya untuk menentukan Ikon) ---
const CATEGORY_DETAILS = {
  penjualan: { Icon: HandCoins },
  topup: { Icon: BanknoteArrowUp }, // Sesuai dengan pembaruan Anda
  gaji: { Icon: Wallet },
  withdraw: { Icon: BanknoteArrowDown },
  transfer: { Icon: Send },
  pembelian: { Icon: Package },
  autobudget: { Icon: CalendarClock },
  lainnya: { Icon: WalletCards },
};

export default function TransactionHistoryTableCell({ data }) {
  const isIncoming = data.transaction_type === 1;
  const displayAmount = formatCurrency(Math.abs(data.amount));
  const amountColor = isIncoming
    ? WondrColors["green-wondr"]
    : WondrColors["red-wondr"];
  const amountSign = isIncoming ? "+" : "-";

  // Dapatkan komponen Ikon yang sesuai secara dinamis
  // Menggunakan .replace untuk menghapus spasi agar cocok dengan kunci 'topup'
  const categoryKey =
    data.category?.toLowerCase().replace(/\s/g, "") || "lainnya";
  const details = CATEGORY_DETAILS[categoryKey] || CATEGORY_DETAILS.lainnya;
  const IconComponent = details.Icon;

  // LOGIKA UNTUK FORMAT TAMPILAN NAMA KATEGORI (TITLE CASE)
  const displayCategory = data.category
    ? data.category
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Lainnya";

  return (
    <Box className="flex-row p-2 items-center justify-between">
      <Box className="flex-row gap-2 items-center flex-1 pr-2">
        {/* Latar belakang ikon sekarang menggunakan warna statis */}
        <Box className="rounded-full p-4 bg-translucent-gray-wondr">
          {/* Warna ikon diatur ke "green-wondr" */}
          <IconComponent size={20} color={WondrColors["green-wondr"]} />
        </Box>
        <Box className="flex-shrink">
          <VStack>
            {/* Menggunakan variabel displayCategory yang sudah diformat */}
            <AppText variant="bodyBold">{displayCategory}</AppText>
            <AppText variant="body" numberOfLines={1} ellipsizeMode="tail">
              {data.description}
            </AppText>
          </VStack>
        </Box>
      </Box>
      <Box style={{ flexShrink: 0 }}>
        <AppText variant="bodyBold" style={{ color: amountColor }}>
          {`${amountSign}${displayAmount}`}
        </AppText>
      </Box>
    </Box>
  );
}
