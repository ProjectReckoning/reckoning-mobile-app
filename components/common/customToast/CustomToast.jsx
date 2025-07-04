import React from "react";
import { Box } from "@/components/ui/box";
import { Toast, ToastTitle } from "@/components/ui/toast";
import { Check } from "lucide-react-native";

const CustomToast = React.forwardRef(function CustomToast(props, ref) {
  const { id, title, ...rest } = props; // Ambil 'title' dari props
  const toastId = "toast-" + id;

  return (
    <Toast
      ref={ref}
      nativeID={toastId}
      className="bg-white p-4 rounded-xl shadow-lg"
      {...rest}
    >
      <Box className="flex-row items-center gap-3">
        <Box className="rounded-full h-6 w-6 items-center justify-center bg-green-500">
          <Check size={12} color="white" />
        </Box>
        <ToastTitle className="text-black font-medium">
          {title || "Aksi berhasil"}
        </ToastTitle>
      </Box>
    </Toast>
  );
});

export default CustomToast;
