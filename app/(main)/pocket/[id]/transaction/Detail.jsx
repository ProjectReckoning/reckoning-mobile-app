import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

import { useState, useEffect, useCallback } from "react";
import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import { CalendarClock, ChevronRight } from "lucide-react-native";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import {
  Popover,
  PopoverBackdrop,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/popover";

import useAuthStore from "@/stores/authStore";
import { modalData } from "@/utils/mockData/modalData";
import ErrorModal from "@/components/common/ErrorModal";

import NominalInput from "@/components/common/forms/NominalInput";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import TransactionCard from "@/components/common/cards/TransactionCard";
import CategoryActionSheet from "@/components/feature/transaction/CategoryActionsheet";

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();
  const {
    source,
    destination,
    amount,
    category,
    description,
    setAmount,
    setCategory,
    setDescription,
    setType,
  } = useTransactionStore();
  const { currentPocket, pocketType } = usePocketStore();
  const { user } = useAuthStore();

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [modalContent, setModalContent] = useState(null); // To hold modal data
  const [isAmountInvalid, setIsAmountInvalid] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const isBusiness = pocketType?.toLowerCase().includes("business");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isOwnerAdmin =
    currentPocket?.user_role === "owner" ||
    currentPocket?.user_role === "admin";

  useEffect(() => {
    setIsAmountInvalid(amountTouched && amount === 0);
  }, [amount, amountTouched]);

  useFocusEffect(
    useCallback(() => {
      setType({ id: "transfer", name: "Transfer" });
    }, []),
  );

  const handleNext = () => {
    if (!currentPocket || !user) {
      console.error("Pocket data or user data is not available.");
      return;
    }

    // Check if the current user is the sole admin in a business pocket
    const isSingleAdmin =
      isBusiness &&
      currentPocket.owner.id === user.id &&
      !currentPocket.members.some((m) => m.PocketMember.role === "admin");

    // If it's a business pocket and there are other admins, always require approval
    if (isBusiness && !isSingleAdmin) {
      const content = modalData.find(
        (m) => m.id === "BUSINESS_APPROVAL_REQUIRED",
      );
      setModalContent(content);
      setShowApprovalModal(true);
      return;
    }

    // For personal pockets OR single-admin business pockets, check contribution
    let userContribution = 0;
    if (currentPocket.owner.id === user.id) {
      userContribution = parseFloat(
        currentPocket.owner.PocketMember.contribution_amount,
      );
    } else {
      const memberData = currentPocket.members.find((m) => m.id === user.id);
      if (memberData) {
        userContribution = parseFloat(
          memberData.PocketMember.contribution_amount,
        );
      }
    }

    // Show approval modal if transfer amount exceeds contribution
    if (amount > userContribution) {
      const content = modalData.find((m) => m.id === "APPROVAL_REQUIRED");
      setModalContent(content);
      setShowApprovalModal(true);
      return;
    }

    // If all checks pass, proceed to confirmation
    if (id) {
      router.push(`/(main)/pocket/${id}/transaction/Confirmation`);
    }
  };

  const handleScheduleTransfer = () => {
    if (id && isBusiness) {
      router.push(`/(main)/pocket/${id}/transferSchedule/SetScheduleTransfer`);
    }
  };

  const handleCalendarPress = () => {
    if (amount === null || amount === 0) {
      setIsPopoverOpen(true);
    } else {
      handleScheduleTransfer();
    }
  };

  const handleRequestApproval = () => {
    setShowApprovalModal(false);
    // Navigate to Confirmation screen with a flag for the approval flow
    if (id) {
      router.push({
        pathname: `/(main)/pocket/${id}/transaction/Confirmation`,
        params: { approvalRequired: "true" },
      });
    }
  };

  // Dynamically assign button actions based on which modal is shown
  const getButtonActions = () => {
    if (!modalContent) {
      return {};
    }
    // For business pockets, the "Kirim" button is the first one
    if (modalContent.id === "BUSINESS_APPROVAL_REQUIRED") {
      return {
        specialButton1Action: handleRequestApproval,
        specialButton2Action: () => setShowApprovalModal(false),
      };
    }
    // For personal pockets, the "Kirim" button is the second one
    return {
      specialButton1Action: () => setShowApprovalModal(false),
      specialButton2Action: handleRequestApproval,
    };
  };

  return (
    <Box className="flex-1 bg-white px-6 pb-5">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack space={isBusiness ? "xl" : "2xl"} className="flex-1 mt-5">
            <HStack space="sm" className="justify-center items-center">
              <Avatar
                size={"md"}
                className="bg-[#F2F2F2] items-center justify-center mr-3"
              >
                <AvatarFallbackText className="text-[#58ABA1]">
                  {destination?.name || ""}
                </AvatarFallbackText>
              </Avatar>
              <Box className="flex-1 flex flex-col">
                <Text size="lg" className="font-bold text-black">
                  Sdr {destination?.name || ""}
                </Text>
                <Text size="sm" className="text-[#848688]">
                  {destination?.category?.bank?.name ||
                    destination?.category?.pocket?.type ||
                    ""}{" "}
                  - {destination?.id || ""}
                </Text>
              </Box>
            </HStack>

            <NominalInput
              amount={amount}
              setAmount={setAmount}
              isAmountInvalid={isAmountInvalid}
              setAmountTouched={setAmountTouched}
            />

            {isBusiness && (
              <VStack space="sm">
                <Text className="text-sm my-2">Kategori</Text>
                <Pressable
                  onPress={() => setShowCategory(true)}
                  className="w-full h-14 rounded-xl border border-gray-wondr-border active:border-green-select"
                >
                  <HStack className="p-4 justify-between items-center">
                    <Text
                      className={`font-light ${category ? "text-black font-normal" : "text-dark-gray-wondr-deactive"}`}
                    >
                      {category || "Pilih Kategori"}
                    </Text>
                    <ChevronRight
                      size={21}
                      color={WondrColors["dark-gray-wondr-deactive"]}
                    />
                  </HStack>
                </Pressable>
              </VStack>
            )}

            <VStack space="sm">
              <Text className="text-sm my-2">Deskripsi (Opsional)</Text>
              <Input className="w-full h-14 rounded-xl border border-gray-wondr-border data-[focus=true]:border-green-select">
                <InputField
                  placeholder="Contoh: Kopi Sobat tadi sore pas di Kopi Nako"
                  value={description}
                  onChangeText={setDescription}
                />
              </Input>
            </VStack>

            <TransactionCard
              title="Sumber dana"
              heading={
                source?.category?.bank?.type || source?.category?.pocket?.type
              }
              subheading={source.id}
              showBalance={true}
              balance={source.balance}
            />
          </VStack>

          <HStack space="sm" className="w-full justify-between items-center">
            {isBusiness && isOwnerAdmin && (
              <Popover
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                placement="top"
                size="md"
                offset={-40}
                trigger={(triggerProps) => (
                  <Pressable
                    {...triggerProps}
                    onPress={handleCalendarPress}
                    className="w-16 h-16 rounded-3xl bg-white border border-gray-wondr-border justify-center items-center active:bg-slate-100"
                  >
                    <CalendarClock size={21} color="#000" />
                  </Pressable>
                )}
              >
                <PopoverBackdrop />
                <PopoverContent className="ml-5 -mt-5 pr-2">
                  <PopoverArrow />
                  <PopoverBody>
                    <Text className="text-typography-900">
                      Isi nominal dulu ya baru bisa set transfer berjadwal
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
            <PrimaryButton
              buttonAction={handleNext}
              buttonTitle="Lanjut"
              className={"w-fit flex-1 my-5"}
              disabled={amount === null || amount === 0}
            />
          </HStack>

          <CategoryActionSheet
            isOpen={showCategory}
            onClose={() => setShowCategory(false)}
            handleClose={(item) => {
              setShowCategory(false);
              setCategory(item);
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {modalContent && (
        <ErrorModal
          isOpen={showApprovalModal}
          onClose={() => setShowApprovalModal(false)}
          imageSource={modalContent.image}
          title={modalContent.title}
          subtitle={modalContent.subTitle}
          showSpecialActions={true}
          specialButton1Title={modalContent.buttons[0].text}
          specialButton2Title={modalContent.buttons[1].text}
          {...getButtonActions()}
        />
      )}
    </Box>
  );
}
