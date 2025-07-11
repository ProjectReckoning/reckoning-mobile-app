import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import ErrorModal from "@/components/common/ErrorModal";

export default function TestScreenError() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isErrorWithActions, setIsErrorWithActions] = useState(false);

  // This function shows the modal WITH the two buttons
  const simulateErrorWithActions = () => {
    setIsErrorWithActions(true);
    setShowErrorModal(true);
  };

  // This function shows the modal WITHOUT any buttons
  const simulateInfoOnlyModal = () => {
    setIsErrorWithActions(false);
    setShowErrorModal(true);
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <VStack space="md">
        <Button onPress={simulateErrorWithActions}>
          <ButtonText>Show Modal with Buttons</ButtonText>
        </Button>
        <Button onPress={simulateInfoOnlyModal}>
          <ButtonText>Show Modal without Buttons</ButtonText>
        </Button>
      </VStack>

      <ErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseModal}
        imageSource={require("@/assets/images/approval.png")}
        // Dynamically set title and subtitle based on the state
        title={
          isErrorWithActions
            ? "Persetujuan Anggota Diperlukan"
            : "Transfer Sedang Diproses"
        }
        subtitle={
          isErrorWithActions
            ? "Untuk penarikan di atas nominal kontribusi, diperlukan persetujuan semua anggota."
            : "Kami akan memberitahu Anda jika transfer telah berhasil."
        }
        // This prop determines if the buttons are rendered
        showSpecialActions={isErrorWithActions}
        // Props for the modal with actions
        specialButton1Title="Ubah Nominal"
        specialButton1Action={() => {
          console.log("Action: Change Amount");
          handleCloseModal();
        }}
        specialButton2Title="Kirim Permintaan Persetujuan"
        specialButton2Action={() => {
          console.log("Action: Send Approval Request");
          handleCloseModal();
        }}
      />
    </Box>
  );
}
