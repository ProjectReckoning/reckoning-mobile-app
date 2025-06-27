import React, { useState, useEffect } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils";
import { Crown, AlertCircleIcon, Circle } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator } from "react-native";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
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
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { usePocketStore } from "@/stores/pocketStore";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "";
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const MemberInfoCard = ({ name, role }) => (
  <HStack className="p-4 border border-gray-200 rounded-2xl items-center">
    <Avatar className="bg-gray-100 w-12 h-12 rounded-full mr-3 items-center justify-center">
      <AvatarFallbackText className="text-tosca-wondr font-bold">
        {getInitials(name)}
      </AvatarFallbackText>
    </Avatar>
    <VStack className="flex-1">
      <Text className="font-bold text-black">{name}</Text>
    </VStack>
    <Badge
      size="sm"
      variant="solid"
      className={`${role === "ADMIN" ? "bg-tosca-wondr" : "bg-lime-wondr"} rounded-full`}
    >
      <BadgeText className="font-bold text-black">{role}</BadgeText>
    </Badge>
  </HStack>
);

export default function InfoBalanceContent({
  isOpen,
  onClose,
  memberData,
  pocketId,
}) {
  const {
    updateMemberRole,
    removePocketMembers,
    isMemberActionLoading,
    memberActionError,
  } = usePocketStore();

  const [showChangeRoleSheet, setShowChangeRoleSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("viewer");

  useEffect(() => {
    if (memberData) {
      setSelectedRole(memberData.PocketMember?.role || "viewer");
    }
  }, [memberData]);

  if (!memberData) return null;

  const handleOpenChangeRole = () => {
    onClose();
    setTimeout(() => setShowChangeRoleSheet(true), 300);
  };

  const handleOpenDelete = () => {
    onClose();
    setTimeout(() => setShowDeleteModal(true), 300);
  };

  const handleSaveRole = async () => {
    if (!selectedRole) return;
    try {
      await updateMemberRole(pocketId, memberData.id, selectedRole);
      setShowChangeRoleSheet(false);
    } catch (e) {
      console.error("Failed to update role:", e);
    }
  };

  const handleDeleteMember = async () => {
    try {
      await removePocketMembers(pocketId, [memberData.id]);
      setShowDeleteModal(false);
    } catch (e) {
      console.error("Failed to delete member:", e);
    }
  };

  const displayRole = (memberData.PocketMember?.role || "viewer").toUpperCase();

  return (
    <>
      {/* --- Main Actionsheet: Pilihan Aksi --- */}
      <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} className="pb-8">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full px-4 gap-3">
            <MemberInfoCard name={memberData.name} role={displayRole} />
            <ActionsheetItem onPress={handleOpenChangeRole}>
              <ActionsheetItemText>Ubah role</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleOpenDelete}>
              <ActionsheetItemText className="text-red-wondr">
                Hapus member
              </ActionsheetItemText>
            </ActionsheetItem>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* --- Actionsheet 2: Ubah Role --- */}
      <Actionsheet
        isOpen={showChangeRoleSheet}
        onClose={() => setShowChangeRoleSheet(false)}
        zIndex={1000}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={1000} className="pb-8">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full px-4 gap-4">
            <VStack className="w-full">
              <Text className="text-lg font-bold text-black">Ubah role</Text>
              <Text className="text-sm text-gray-500">
                Pilih role yang sesuai untuk member ini
              </Text>
            </VStack>
            <MemberInfoCard
              name={memberData.name}
              role={selectedRole.toUpperCase()}
            />
            <RadioGroup value={selectedRole} onChange={setSelectedRole}>
              <VStack space="md">
                <Radio value="admin" size="md">
                  <RadioIndicator className="mr-2" />
                  <RadioLabel>Admin</RadioLabel>
                </Radio>
                <Radio value="spender" size="md">
                  <RadioIndicator className="mr-2" />
                  <RadioLabel>Spender</RadioLabel>
                </Radio>
                <Radio value="viewer" size="md">
                  <RadioIndicator className="mr-2" />
                  <RadioLabel>Viewer</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>

            <PrimaryButton
              buttonAction={handleSaveRole}
              disabled={isMemberActionLoading}
              buttonTitle={
                isMemberActionLoading ? <ActivityIndicator /> : "Simpan"
              }
              className="bg-yellow-wondr"
              buttonActiveColor="active:bg-yellow-wondr-dark"
            />
            <PrimaryButton
              buttonAction={() => setShowChangeRoleSheet(false)}
              buttonTitle="Batal"
              className="bg-white border border-black"
              textClassName="text-black"
            />
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* --- Modal 3: Konfirmasi Hapus --- */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        finalFocusRef={null}
      >
        <ModalBackdrop />
        <ModalContent className="w-11/12 max-w-sm">
          <ModalHeader>
            <Heading size="lg">Hapus member?</Heading>
            <ModalCloseButton>
              <AlertCircleIcon />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm">
              Member yang sudah dihapus tidak dapat mengakses pocket ini lagi.
            </Text>
            <Box className="my-4">
              <MemberInfoCard name={memberData.name} role={displayRole} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <VStack className="w-full gap-3">
              <PrimaryButton
                buttonAction={handleDeleteMember}
                buttonTitle={
                  isMemberActionLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    "Hapus sekarang"
                  )
                }
                disabled={isMemberActionLoading}
                className="bg-red-wondr"
                textClassName="text-white"
              />
              <PrimaryButton
                buttonAction={() => setShowDeleteModal(false)}
                buttonTitle="Batal"
                className="bg-white border border-black"
                textClassName="text-black"
              />
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
