import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
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

import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, CalendarClock } from "lucide-react-native";

import GoalDecorator from "../../../../assets/images/decorators/goal-decorator.png";
import PrimaryButton from "../../../../components/common/buttons/PrimaryButton";

export default function Details() {
  const [inputName, setInputName] = useState("");
  const [isNameInvalid, setNameIsInvalid] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [isAmountInvalid, setAmountIsInvalid] = useState(false);
  const [isDateInvalid, setDateIsInvalid] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);

  const handleOpenDatePicker = () => {
    setOpen(true);
    setDateTouched(true);
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback(({ startDate, endDate }) => {
    setOpen(false);
    setRange({ startDate, endDate });
  }, []);

  const handleSubmit = () => {
    if (!isNameInvalid && !isAmountInvalid && !isDateInvalid) {
      console.log("OK");
      // router.push("pocket/createPocket/SelectGoal");
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (inputName.length > 20 || inputName.length === null) {
      setNameIsInvalid(true);
    } else {
      setNameIsInvalid(false);
    }
  }, [inputName]);

  useEffect(() => {
    const amountValue = parseInt(inputAmount.replace(/\D/g, ""), 10);
    if (amountValue < 10000) {
      setAmountIsInvalid(true);
    } else {
      setAmountIsInvalid(false);
    }
  }, [inputAmount]);

  useEffect(() => {
    if (dateTouched) {
      if (!range.startDate || !range.endDate) {
        setDateIsInvalid(true);
      } else {
        setDateIsInvalid(false);
      }
    }
  }, [range, dateTouched]);

  const formatCurrency = (value) => {
    if (!value) return "";
    const numeric = value.replace(/\D/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Box className="flex-1 bg-white justify-stretch">
      <Box className="w-full h-56 bg-[#C2F0ED]">
        <Box className="w-52 absolute right-0 top-2">
          <Image
            source={GoalDecorator}
            alt="pocket-type-decorator"
            className="w-full h-64"
            resizeMode="contain"
          />
        </Box>

        <Box className="flex-1 flex-col px-6 pt-5 justify-between">
          <VStack space="4xl" reversed={false}>
            <Box className="flex flex-row justify-between items-center">
              <Pressable onPress={handleBack}>
                <ArrowLeft size={24} />
              </Pressable>

              <Heading size="lg" className="text-bold">
                Wisata bersama
              </Heading>

              <Box className="w-5 h-5" />
            </Box>

            <VStack space="xs" reversed={false}>
              <Heading size="xl" className="text-bold">
                Liburan impian kita!
              </Heading>

              <Text className="w-72 text-lg">
                Rencanakan petualangan seru bareng teman-teman!
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>

      <Box className="flex-1 justify-between px-6">
        <Box className="flex flex-col">
          <Heading size="xl" className="font-bold mt-8 mb-5">
            Detail Pocket
          </Heading>

          <VStack space="md" className="w-full">
            <FormControl
              isInvalid={isNameInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
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
                  value={inputName}
                  onChangeText={(text) => setInputName(text)}
                  className="p-3"
                />
                <InputSlot className="mr-3">
                  <Text
                    className={`text-gray-500 text-xs ${isNameInvalid && "text-red-500"}`}
                  >
                    {inputName.length}/20
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

            <FormControl
              isInvalid={isAmountInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
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
                  value={formatCurrency(inputAmount)}
                  onChangeText={(text) => setInputAmount(text)}
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

            <FormControl
              isInvalid={isDateInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
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
                  <CalendarClock size={16} className="text-gray-300" />
                  {range.startDate && range.endDate ? (
                    <Text className="text-black text-lg">
                      {range.startDate.toLocaleDateString("id-ID")} -{" "}
                      {range.endDate.toLocaleDateString("id-ID")}
                    </Text>
                  ) : (
                    <Text className="text-gray-400 text-lg">Pilih tanggal</Text>
                  )}

                  <DatePickerModal
                    locale="id"
                    mode="range"
                    visible={open}
                    onDismiss={onDismiss}
                    startDate={range.startDate}
                    endDate={range.endDate}
                    onConfirm={onConfirm}
                    presentationStyle="pageSheet"
                  />
                </Box>
              </Pressable>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Target harus memiliki tanggal mulai dan selesai!
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        </Box>
        <PrimaryButton
          buttonAction={handleSubmit}
          buttonTitle="Lanjut"
          className="mt-3 mb-8"
        />
      </Box>
    </Box>
  );
}
