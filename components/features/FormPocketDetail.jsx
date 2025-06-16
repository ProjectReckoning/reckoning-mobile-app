import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AlertCircleIcon } from "@/components/ui/icon";
import { DatePickerModal } from "react-native-paper-dates";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { CalendarClock } from "lucide-react-native";

export default function FormPocketDetail({
  pocketName,
  setPocketName,
  isNameInvalid,
  pocketBalanceTarget,
  setPocketBalanceTarget,
  isBalanceInvalid,
  targetDuration,
  isDateInvalid,
  open,
  handleOpenDatePicker,
  onDismiss,
  onConfirm,
}) {
  const formatCurrency = (value) => {
    if (!value) return "";
    const numeric = value.replace(/\D/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <VStack space="md" className="w-full my-8">
      <FormControl isInvalid={isNameInvalid} size="md" isRequired>
        <FormControlLabel>
          <FormControlLabelText className="font-light">
            Nama pocket
          </FormControlLabelText>
        </FormControlLabel>
        <Input
          className="h-14 my-1 rounded-xl border-gray-300 data-[focus=true]:border-[#007BE5]"
          size="lg"
        >
          <InputField
            type="text"
            placeholder="Tulis nama pocket"
            value={pocketName}
            onChangeText={setPocketName}
            className="p-3"
          />
          <InputSlot className="mr-3">
            <Text
              className={`text-gray-500 text-xs ${isNameInvalid && "text-red-500"}`}
            >
              {pocketName.length}/20
            </Text>
          </InputSlot>
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Nama pocket mu harus terisi & maksimal 20 karakter!
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={isBalanceInvalid} size="md" isRequired>
        <FormControlLabel>
          <FormControlLabelText className="font-light">
            Tentuin target saldo kalian
          </FormControlLabelText>
        </FormControlLabel>
        <Input
          className="h-14 my-1 rounded-xl border-gray-300 data-[focus=true]:border-[#007BE5]"
          size="lg"
        >
          <InputSlot className="ml-4">
            <Text className="text-black">Rp</Text>
          </InputSlot>
          <InputField
            type="text"
            placeholder="5.000.000"
            value={
              pocketBalanceTarget && pocketBalanceTarget !== 0
                ? formatCurrency(pocketBalanceTarget.toString())
                : ""
            }
            onChangeText={setPocketBalanceTarget}
            className="p-3 pl-0"
            keyboardType="numeric"
          />
        </Input>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Minimal target saldo adalah Rp10.000!
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={isDateInvalid} size="md" isRequired>
        <FormControlLabel>
          <FormControlLabelText className="font-light">
            Durasi target
          </FormControlLabelText>
        </FormControlLabel>
        <Pressable
          onPress={handleOpenDatePicker}
          className="w-full h-14 p-3 my-1 justify-center rounded-xl border border-gray-300 active:border-[#007BE5] focus:border-[#007BE5]"
        >
          <Box className="flex flex-row gap-3 items-center">
            <CalendarClock size={16} color={"#848688"} />
            {targetDuration.startDate && targetDuration.endDate ? (
              <Text className="text-black text-lg">
                {targetDuration.startDate.toLocaleDateString("id-ID")} -{" "}
                {targetDuration.endDate.toLocaleDateString("id-ID")}
              </Text>
            ) : (
              <Text className="text-gray-400 text-lg">Pilih tanggal</Text>
            )}
          </Box>
        </Pressable>
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            Target harus memiliki tanggal mulai dan selesai!
          </FormControlErrorText>
        </FormControlError>
        {/* Move DatePickerModal here, outside Pressable */}
        <DatePickerModal
          locale="id"
          mode="range"
          visible={open}
          startDate={targetDuration.startDate}
          endDate={targetDuration.endDate}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          presentationStyle="pageSheet"
        />
      </FormControl>
    </VStack>
  );
}
