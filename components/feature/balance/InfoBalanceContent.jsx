import React, { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils"; // Asumsi path dan nama object warna
import { Crown, Info, Circle } from "lucide-react-native";

// --- Asumsi Impor Komponen UI Kustom ---
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button"; // Menggunakan PrimaryButton sebagai gantinya
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@/components/ui/modal";
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

// --- Fungsi untuk mendapatkan inisial dari nama ---
const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

/**
 * Komponen Card Info Member yang bisa dipakai ulang.
 */
const MemberInfoCard = ({ name, role }) => (
  <HStack
    style={{
      padding: 16,
      borderWidth: 1,
      borderColor: WondrColors["gray-wondr-border"],
      borderRadius: 16,
      alignItems: "center",
    }}
  >
    <Avatar
      style={{
        backgroundColor: "#F2F2F2",
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AvatarFallbackText style={{ color: "#58ABA1", fontWeight: "bold" }}>
        {name}
      </AvatarFallbackText>
    </Avatar>
    <VStack style={{ flex: 1 }}>
      <Text style={{ fontWeight: "bold", color: "#000000" }}>{name}</Text>
    </VStack>
    <Badge
      style={{
        borderRadius: 999,
        backgroundColor:
          role === "ADMIN"
            ? WondrColors["tosca-wondr"]
            : WondrColors["lime-wondr"],
      }}
    >
      <BadgeText style={{ fontWeight: "bold", color: "#000000" }}>
        {role}
      </BadgeText>
    </Badge>
  </HStack>
);

export default function InfoBalanceContent() {
  const [showActionModal, setShowActionModal] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // --- PERUBAHAN: Mengubah mock data menjadi state ---
  const [memberData, setMemberData] = useState({
    name: "FARREL BRIAN RAFI",
    role: "ADMIN",
  });

  const handleOpenChangeRole = () => {
    // --- PERUBAHAN: Inisialisasi role yang dipilih dengan role saat ini ---
    setSelectedRole(memberData.role);
    setShowActionModal(false);
    setShowChangeRoleModal(true);
  };

  const handleOpenDelete = () => {
    setShowActionModal(false);
    setShowDeleteModal(true);
  };

  const handleSaveRole = () => {
    // --- PERUBAHAN: Memperbarui state utama dengan role yang baru ---
    setMemberData((prevData) => ({ ...prevData, role: selectedRole }));
    console.log("Role baru disimpan:", selectedRole);
    setShowChangeRoleModal(false);
    setSelectedRole(null);
  };

  const handleDeleteMember = () => {
    console.log("Member dihapus!");
    setShowDeleteModal(false);
  };

  return (
    <Box>
      <PrimaryButton
        buttonAction={() => setShowActionModal(true)}
        buttonTitle={`Kelola Member (${memberData.role})`} // Menampilkan role saat ini di tombol
        buttonColor={"bg-gray-200"}
        textClassName="text-black"
      />

      {/* ------ Actionsheet 1: Pilihan Aksi ------ */}
      <Actionsheet
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack style={{ width: "100%", padding: 16, gap: 12 }}>
            <MemberInfoCard name={memberData.name} role={memberData.role} />
            <PrimaryButton
              buttonAction={handleOpenChangeRole}
              buttonTitle="Ubah role"
              buttonColor={"bg-yellow-wondr"}
              buttonActiveColor={"active:bg-yellow-wondr-dark"}
              textClassName="text-black text-base text-center font-bold"
            ></PrimaryButton>
            <PrimaryButton
              buttonAction={handleOpenDelete}
              buttonTitle="Hapus member"
              buttonColor={"bg-white"}
              buttonActiveColor={"active:bg-red-wondr-light-translucent"}
              textClassName="text-red-wondr text-base text-center font-bold"
              className="border border-red-wondr"
            ></PrimaryButton>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* ------ Actionsheet 2: Ubah Role ------ */}
      <Actionsheet
        isOpen={showChangeRoleModal}
        onClose={() => {
          setShowChangeRoleModal(false);
          setSelectedRole(null);
        }}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack style={{ width: "100%", padding: 16, gap: 12 }}>
            <VStack style={{ width: "100%", gap: 2 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#000000" }}
              >
                Ubah role
              </Text>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                Pilih role yang sesuai untuk member ini
              </Text>
            </VStack>
            <MemberInfoCard
              name={memberData.name}
              role={selectedRole || memberData.role}
            />
            <RadioGroup value={selectedRole} onChange={setSelectedRole}>
              <VStack style={{ gap: 8 }}>
                {/* --- PERUBAHAN: Indikator radio menjadi dinamis --- */}
                <Radio value="ADMIN">
                  <RadioIndicator style={{ marginRight: 6 }}>
                    <Circle
                      size={18}
                      color={"#000000"} // Border tetap hitam
                      fill={
                        selectedRole === "ADMIN"
                          ? WondrColors["yellow-wondr"]
                          : "transparent"
                      } // Fill kuning saat terpilih
                    />
                  </RadioIndicator>
                  <RadioLabel>Admin</RadioLabel>
                </Radio>
                <Radio value="MEMBER">
                  <RadioIndicator style={{ marginRight: 6 }}>
                    <Circle
                      size={18}
                      color={"#000000"} // Border tetap hitam
                      fill={
                        selectedRole === "MEMBER"
                          ? WondrColors["yellow-wondr"]
                          : "transparent"
                      } // Fill kuning saat terpilih
                    />
                  </RadioIndicator>
                  <RadioLabel>Member</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>

            <PrimaryButton
              buttonAction={handleSaveRole}
              disable={!selectedRole}
              buttonTitle="Simpan"
              buttonColor={"bg-yellow-wondr"}
              buttonActiveColor={"active:bg-yellow-wondr-dark"}
              textClassName="text-black text-base text-center font-bold"
            ></PrimaryButton>
            <PrimaryButton
              buttonAction={() => setShowChangeRoleModal(false)}
              buttonTitle="Batal"
              buttonColor={"bg-white"}
              buttonActiveColor={"active:bg-translucent-gray-wondr"}
              textClassName="text-black text-base text-center font-bold"
              className="border border-black"
            ></PrimaryButton>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* ------ Modal 3: Konfirmasi Hapus (Tetap sebagai Modal) ------ */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalBackdrop />
        <ModalContent
          style={{
            paddingBottom: 8,
            width: "90%",
            maxWidth: 400,
            borderRadius: 24,
            gap: 5,
          }}
        >
          <ModalHeader>
            <VStack style={{ alignItems: "center", width: "100%", gap: 10 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}
              >
                Hapus member?
              </Text>
              {/* PERUBAHAN: Menambahkan lineHeight untuk mengurangi jarak spasi */}
              <Text
                style={{ fontSize: 12, textAlign: "center", lineHeight: 16 }}
              >
                Member yang sudah dihapus tidak dapat mengakses pocket ini lagi
              </Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <VStack style={{ gap: 12 }}>
              <MemberInfoCard name={memberData.name} role={memberData.role} />

              <PrimaryButton
                buttonAction={handleDeleteMember}
                buttonTitle="Hapus sekarang"
                buttonColor={"bg-red-wondr"}
                buttonActiveColor={"active:bg-red-wondr-dark"}
                textClassName="text-white text-base text-center font-bold"
              ></PrimaryButton>
              <PrimaryButton
                buttonAction={() => setShowDeleteModal(false)}
                buttonTitle="Batal"
                buttonColor={"bg-white"}
                buttonActiveColor={"active:bg-translucent-gray-wondr"}
                textClassName="text-black text-base text-center font-bold"
                className="border border-black"
              ></PrimaryButton>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
