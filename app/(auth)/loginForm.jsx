import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import PrimaryButton from "../../components/common/buttons/PrimaryButton";

export default function LoginFormScreen() {
  const insets = useSafeAreaInsets();
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = React.useState("12345");
  const [passwordValue, setPasswordValue] = React.useState("12345");

  const handleSubmit = () => {
    if (passwordValue.length < 8) {
      setIsInvalid(true);
      console.log("Password must be at least 8 characters.");
    } else {
      setIsInvalid(false);
      console.log("Login attempt with:", {
        phoneNumber: phoneNumberValue,
        password: passwordValue,
      });
      router.replace("/(main)/home");
    }
  };

  return (
    <>
      <Box
        className="w-full h-full items-center bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <VStack className="w-full flex-1 justify-between">
          <VStack className="rounded-md mx-8">
            <FormControl
              isInvalid={isInvalid}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
            >
              {/* phonenumber form */}
              <FormControlLabel>
                <FormControlLabelText>
                  Masukkan nomor telepon kamu
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="+62 87xxxx-xxxx-xxxx"
                  value={phoneNumberValue}
                  onChangeText={(text) => setPhoneNumberValue(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be atleast 9 characters.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Atleast 9 characters are required.
                </FormControlErrorText>
              </FormControlError>

              {/* password form */}
              <FormControlLabel>
                <FormControlLabelText>Masukkan password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="password"
                  placeholder="password"
                  value={passwordValue}
                  onChangeText={(text) => setPasswordValue(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be atleast 6 characters.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Atleast 8 characters are required.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
          <VStack className="mx-8 mb-6 items-center">
            <PrimaryButton buttonAction={handleSubmit} buttonTitle="Login" />
            <Pressable>
              <Text className="text-orange-wondr font-bold underline underline-offset-1 py-4">
                Lupa password
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </Box>
    </>
  );
}
