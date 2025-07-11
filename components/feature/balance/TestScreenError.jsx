// file: src/screens/HomeScreen.js (atau layar lain)

import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import ErrorModal from "@/components/common/ErrorModal"; // 1. Impor komponen ErrorModal

export default function TestScreenError() {
  // 2. Buat state untuk mengontrol visibilitas modal
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Fungsi untuk simulasi memunculkan error
  const simulateError = () => {
    setShowErrorModal(true);
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Button onPress={simulateError}>
        <ButtonText>Simulasikan Error Internet</ButtonText>
      </Button>

      {/* 3. Panggil Komponen ErrorModal dan isi props-nya */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        imageSource={require("@/assets/images/ErrorImage.png")} // Panggil gambar yang sudah disimpan
        title="Koneksi internet kamu terputus"
        subtitle="Coba cek jaringan wifi, atau kuota internet kamu, terus coba lagi"
        buttonText="Coba Lagi"
        onButtonPress={() => {
          console.log("Mencoba koneksi kembali...");
          setShowErrorModal(false); // Tutup modal setelah ditekan
        }}
      />
    </Box>
  );
}
