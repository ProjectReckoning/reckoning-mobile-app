import React from "react";
// Import Box if you still need it for the main layout, plus the toast components
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import AppText from "@/components/common/typography/AppText";
import { usePocketStore } from "@/stores/pocketStore";
import { Copy, Check } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";

// NEW APPROACH: Make <Toast> the root element that receives the ref.
// NEW APPROACH: Make <Toast> the root element that receives the ref.
const CustomToast = React.forwardRef(function CustomToast(props, ref) {
  const { id, ...rest } = props;
  const toastId = "toast-" + id;

  return (
    <Toast
      ref={ref}
      nativeID={toastId}
      // 1. Removed action/variant props to apply custom styles.
      //    Added classes for a white background, padding, rounded corners, and a shadow.
      className="bg-white p-4 rounded-xl shadow-lg"
      {...rest}
    >
      {/* 2. Use a flex-row Box to align the icon and text. Added items-center. */}
      <Box className="flex-row items-center gap-3">
        {/* 3. This is your green circle with the checkmark, slightly resized for aesthetics. */}
        <Box className="rounded-full h-6 w-6 items-center justify-center bg-green-500">
          <Check size={12} color="white" />
        </Box>
        {/* 4. Styled the ToastTitle to have black, medium-weight text. */}
        <ToastTitle className="text-black font-medium">
          Nomor rekening pocket berhasil disalin
        </ToastTitle>
      </Box>
    </Toast>
  );
});

/**
 * Displays the pocket's account number and allows the user to copy it
 * to the clipboard by pressing on it.
 */
export default function AccountNumber() {
  const accountNumber = usePocketStore(
    (state) => state.currentPocket?.account_number,
  );
  const toast = useToast();

  const handleCopyToClipboard = async () => {
    if (!accountNumber) {
      return;
    }
    await Clipboard.setStringAsync(String(accountNumber));

    toast.show({
      placement: "top",
      render: ({ id }) => {
        return <CustomToast id={id} />;
      },
    });
  };

  return (
    <Box className="flex-row rounded-xl justify-between items-center p-3 mb-2 bg-orange-wondr">
      <AppText
        variant="bodyBold"
        className="text-white"
        style={{ flexShrink: 1, marginRight: 8 }}
      >
        Account Number
      </AppText>

      <Pressable
        className="flex-row items-center gap-1"
        onPress={handleCopyToClipboard}
      >
        <Copy size={15} color="white" />
        <AppText variant="bodyBold" className="text-white">
          {accountNumber || "..."}
        </AppText>
      </Pressable>
    </Box>
  );
}
