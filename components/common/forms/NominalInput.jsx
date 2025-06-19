import { Text } from "@/components/ui/text";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";

import { AlertCircleIcon, CircleX } from "lucide-react-native";
import { formatDigitCurrency } from "../../../utils/helperFunction";

export default function NominalInput({
  amount,
  setAmount,
  isAmountInvalid,
  setAmountTouched,
}) {
  return (
    <FormControl isInvalid={isAmountInvalid} size="md" isRequired>
      <Text className="text-sm text-black font-light">Nominal</Text>
      <Input
        variant="underlined"
        className="w-full h-16 border-gray-300 data-[focus=true]:border-[#007BE5]"
        size="xl"
      >
        <InputSlot className="ml-2">
          <Text className="text-black text-xl font-extrabold">Rp</Text>
        </InputSlot>
        <InputField
          type="number"
          placeholder="0"
          value={
            amount && amount !== 0 ? formatDigitCurrency(amount.toString()) : ""
          }
          onChangeText={(value) => {
            setAmountTouched(true);
            setAmount(value);
          }}
          className="p-3 pl-0 text-xl font-extrabold"
          keyboardType="numeric"
        />
        {amount > 0 && (
          <CircleX
            size={24}
            color="#000"
            onPress={() => {
              setAmountTouched(false);
              setAmount(null);
            }}
            className="pr-2"
          />
        )}
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          Nominal harus terisi dan valid!
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
