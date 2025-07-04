import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { Circle } from "lucide-react-native";

// Asumsi path dan nama object warna dari proyek Anda
import { WondrColors } from "@/utils/colorUtils";

export default function SortSelector() {
  // State untuk mengontrol visibilitas Actionsheet
  const [showSortSheet, setShowSortSheet] = useState(false);

  // State untuk menyimpan pilihan sorting
  const [sortValue, setSortValue] = useState("");

  const handleOpen = () => {
    // Reset pilihan setiap kali actionsheet dibuka untuk memulai dari awal
    setSortValue("");
    setShowSortSheet(true);
  };

  const handleClose = () => {
    setShowSortSheet(false);
  };

  const handleSave = () => {
    if (sortValue) {
      console.log("Sorting by:", sortValue);
      // Tambahkan logika sorting Anda di sini
      handleClose();
    }
  };

  // Variabel untuk mengecek status disabled, agar lebih mudah dibaca
  const isSaveDisabled = !sortValue;

  return (
    <Box>
      {/* Tombol untuk membuka Actionsheet */}
      <PrimaryButton
        buttonAction={handleOpen}
        buttonTitle="Urutkan"
        buttonColor={"bg-gray-200"}
        textClassName="text-black"
      />

      {/* ------ Actionsheet Sorting (Style dari Actionsheet 2) ------ */}
      <Actionsheet isOpen={showSortSheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          {/* Layout utama dengan padding dan gap seperti referensi */}
          <VStack style={{ width: "100%", padding: 16, gap: 16 }}>
            {/* Header di sisi kiri */}
            <VStack style={{ width: "100%", gap: 2 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}
              >
                Sorting by
              </Text>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                Urutkan berdasarkan :
              </Text>
            </VStack>

            {/* Opsi Radio dengan Indikator Kustom */}
            <RadioGroup value={sortValue} onChange={setSortValue}>
              <VStack style={{ gap: 12 }}>
                <Radio value="highest_contribution">
                  <RadioIndicator style={{ marginRight: 8 }}>
                    <Circle
                      size={18}
                      color={"#000000"} // Border tetap hitam
                      fill={
                        sortValue === "highest_contribution"
                          ? WondrColors["yellow-wondr"] // Fill kuning saat terpilih
                          : "transparent"
                      }
                    />
                  </RadioIndicator>
                  {/* --- PERUBAHAN DI SINI --- */}
                  <RadioLabel style={{ fontWeight: "bold" }}>
                    Highest Contribution
                  </RadioLabel>
                </Radio>
                <Radio value="lowest_contribution">
                  <RadioIndicator style={{ marginRight: 8 }}>
                    <Circle
                      size={18}
                      color={"#000000"} // Border tetap hitam
                      fill={
                        sortValue === "lowest_contribution"
                          ? WondrColors["yellow-wondr"] // Fill kuning saat terpilih
                          : "transparent"
                      }
                    />
                  </RadioIndicator>
                  {/* --- PERUBAHAN DI SINI --- */}
                  <RadioLabel style={{ fontWeight: "bold" }}>
                    Lowest Contribution
                  </RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>

            {/* Tombol Aksi */}
            <VStack style={{ gap: 12, paddingTop: 8 }}>
              <PrimaryButton
                buttonAction={handleSave}
                disable={isSaveDisabled}
                buttonTitle="Simpan"
                buttonColor={isSaveDisabled ? "bg-gray-200" : "bg-yellow-wondr"}
                buttonActiveColor={
                  isSaveDisabled ? "" : "active:bg-yellow-wondr-dark"
                }
                textClassName={
                  isSaveDisabled
                    ? "text-gray-500 text-base text-center font-bold"
                    : "text-black text-base text-center font-bold"
                }
                className={isSaveDisabled ? "opacity-50" : ""}
              />
              <PrimaryButton
                buttonAction={handleClose}
                buttonTitle="Batal"
                buttonColor={"bg-white"}
                buttonActiveColor={"active:bg-translucent-gray-wondr"}
                textClassName="text-black text-base text-center font-bold"
                className="border border-black"
              />
            </VStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
