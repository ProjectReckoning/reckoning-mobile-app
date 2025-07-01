import React, { useState, useEffect } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { WondrColors } from "@/utils/colorUtils";
import { Circle } from "lucide-react-native";
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
import { usePocketStore } from "@/stores/pocketStore";

// Helper functions (getBadgeColorForRole, MemberInfoCard) remain the same...

const getBadgeColorForRole = (role, pocketType) => {
  const upperCaseRole = role.toUpperCase();

  if (upperCaseRole === "ADMIN") return "bg-tosca-wondr";

  if (pocketType === "business") {
    if (upperCaseRole === "MEMBER") return "bg-lime-wondr";
  } else {
    // untuk 'saving' dan 'spending'
    if (upperCaseRole === "SPENDER") return "bg-purple-wondr";
    if (upperCaseRole === "VIEWER") return "bg-pink-wondr";
  }

  // Fallback default
  return "bg-lime-wondr";
};

const MemberInfoCard = ({ name, role, badgeClassName }) => (
  <HStack className="p-4 border border-gray-wondr-border rounded-2xl items-center">
    <Avatar className="bg-translucent-gray-wondr w-12 h-12 rounded-full mr-3 items-center justify-center">
      <AvatarFallbackText className="text-tosca-wondr font-bold">
        {name}
      </AvatarFallbackText>
    </Avatar>
    <VStack className="flex-1">
      <Text className="font-bold text-black">{name.toUpperCase()}</Text>
    </VStack>
    <Badge
      size="sm"
      variant="solid"
      className={`${badgeClassName} rounded-full`}
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
  pocketType,
}) {
  const { updateMemberRole, removePocketMembers, isMemberActionLoading } =
    usePocketStore();

  const [showChangeRoleSheet, setShowChangeRoleSheet] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("viewer");

  const availableRoles =
    pocketType === "business"
      ? [
          { value: "admin", label: "Admin" },
          { value: "member", label: "Member" },
        ]
      : [
          { value: "admin", label: "Admin" },
          { value: "spender", label: "Spender" },
          { value: "viewer", label: "Viewer" },
        ];

  const availableRoleValues = availableRoles.map((r) => r.value);

  useEffect(() => {
    if (memberData) {
      const currentRole = memberData.PocketMember?.role || "viewer";
      if (availableRoleValues.includes(currentRole)) {
        setSelectedRole(currentRole);
      } else {
        setSelectedRole(availableRoleValues[availableRoleValues.length - 1]);
      }
    }
  }, [memberData, pocketType]);

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
  const badgeColorClass = getBadgeColorForRole(displayRole, pocketType);

  return (
    <>
      {/* --- Main Actionsheet: Action Options --- */}
      <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} className="pb-8">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full py-4 px-4 gap-3">
            <MemberInfoCard
              name={memberData.name}
              role={displayRole}
              badgeClassName={badgeColorClass}
            />
            <PrimaryButton
              buttonAction={handleOpenChangeRole}
              buttonTitle="Ubah role"
            />
            <PrimaryButton
              buttonAction={handleOpenDelete}
              buttonTitle="Hapus member"
              className="bg-white border border-red-wondr"
              textClassName="text-red-wondr"
              buttonActiveColor="active:bg-red-wondr"
              textPressed="text-white"
            />
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* --- Actionsheet 2: Change Role --- */}
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
              badgeClassName={getBadgeColorForRole(selectedRole, pocketType)}
            />
            <RadioGroup value={selectedRole} onChange={setSelectedRole}>
              <VStack space="md">
                {availableRoles.map((role) => (
                  <Radio key={role.value} value={role.value} size="md">
                    <RadioIndicator className="mr-2">
                      <Circle
                        size={18}
                        color={"#000000"}
                        fill={
                          selectedRole === role.value
                            ? WondrColors["tosca-wondr"]
                            : "transparent"
                        }
                      />
                    </RadioIndicator>
                    <RadioLabel>{role.label}</RadioLabel>
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
            <VStack className="w-full py-4 gap-3">
              <PrimaryButton
                buttonAction={handleSaveRole}
                disabled={isMemberActionLoading}
                buttonTitle={
                  isMemberActionLoading ? <ActivityIndicator /> : "Simpan"
                }
              />
              <PrimaryButton
                buttonAction={() => setShowChangeRoleSheet(false)}
                buttonTitle="Batal"
                className="bg-white border border-black"
                textClassName="text-black"
                buttonActiveColor="active:bg-light-gray-wondr"
              />
            </VStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* --- Modal 3: Delete Confirmation --- */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalBackdrop />
        {/* --- FIX: Added scrollEnabled={false} to disable scrolling --- */}
        <ModalContent
          style={{
            paddingBottom: 20,
            width: "90%",
            maxWidth: 400,
            borderRadius: 24,
          }}
        >
          <VStack
            space="md"
            style={{ alignItems: "center", width: "100%" }}
            className="mb-4"
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}
            >
              Hapus member?
            </Text>
            <Text style={{ fontSize: 12, textAlign: "center", lineHeight: 16 }}>
              Member yang sudah dihapus tidak dapat mengakses pocket ini lagi
            </Text>
          </VStack>

          <VStack style={{ gap: 12 }}>
            <Box>
              <MemberInfoCard
                name={memberData.name}
                role={displayRole}
                badgeClassName={badgeColorClass}
              />
            </Box>
            <PrimaryButton
              buttonAction={handleDeleteMember}
              buttonTitle="Hapus sekarang"
              className="bg-red-wondr"
              buttonActiveColor={"active:bg-red-wondr-dark"}
              textClassName="text-white text-base text-center font-bold"
            />
            <PrimaryButton
              buttonAction={() => setShowDeleteModal(false)}
              buttonTitle="Batal"
              className="bg-white border border-black"
              buttonActiveColor={"active:bg-light-gray-wondr"}
              textClassName="text-black text-base text-center font-bold"
            />
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
}
