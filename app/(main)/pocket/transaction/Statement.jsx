import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { router } from "expo-router";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function Statement() {
  return (
    <Box className="flex-1 flex-col bg-white justify-center items-center px-6 py-5">
      <Text>Transfer Berhasil</Text>
      <PrimaryButton
        buttonTitle="Kembali ke beranda"
        buttonAction={() => {
          router.back();
        }}
        className="mt-5"
      />
    </Box>
  );
}
