import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "lucide-react-native"; // or your icon import
import { Input, InputField, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";

export default function PocketNameInput({
  pocketName,
  setPocketName,
  isNameInvalid,
}) {
  return (
    <VStack space="md">
      <Text size="lg">Masukkan nama pocket kamu</Text>
      <FormControl isInvalid={isNameInvalid} size="md" isRequired>
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
            Nama harus terisi, valid, dan maksimal 20 karakter!
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
    </VStack>
  );
}
