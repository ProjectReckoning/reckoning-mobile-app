// app/(auth)/loginForm.jsx
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

import { Eye, EyeOff } from "lucide-react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import api from "@/lib/api-without-interceptor";
import useAuthStore from "@/stores/authStore";

// Helper function to format phone number for backend
const formatPhoneNumberForBackend = (phoneNumber) => {
  // Remove all non-digit characters
  let cleanedNumber = phoneNumber.replace(/\D/g, "");

  // If it starts with '0', remove it (this is for user convenience if they type 08...)
  if (cleanedNumber.startsWith("0")) {
    cleanedNumber = cleanedNumber.substring(1);
  }

  // Prepend '62' (assuming phoneNumberValue only contains digits after 62/0)
  if (!cleanedNumber.startsWith("62")) {
    cleanedNumber = "62" + cleanedNumber;
  }
  return cleanedNumber;
};

// Helper function to validate phone number length (excluding '62')
const validatePhoneNumberLength = (phoneNumber) => {
  // Assume it's already formatted by formatPhoneNumberForBackend, so starts with '62'
  const numberWithoutPrefix = phoneNumber.startsWith("62")
    ? phoneNumber.substring(2)
    : phoneNumber;
  // Based on the 7-15 range you set, keeping that.
  return numberWithoutPrefix.length >= 7 && numberWithoutPrefix.length <= 15;
};

// Helper function to check for special characters
const containsSpecialCharacters = (str) => {
  // This regex matches any character that is NOT a letter (a-z, A-Z) or digit (0-9)
  const alphanumericRegex = /^[a-zA-Z0-9]*$/;
  return !alphanumericRegex.test(str);
};

export default function LoginFormScreen() {
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async () => {
    setLoading(true);
    setLoginError("");
    setPhoneNumberError("");
    setPasswordError("");

    let isValid = true;

    // --- Frontend Validation ---

    // Phone Number basic presence and formatting
    if (!phoneNumberValue) {
      setPhoneNumberError("Nomor telepon wajib diisi.");
      isValid = false;
    } else {
      // Phone Number Length Check (after formatting)
      const formattedPhoneNumber =
        formatPhoneNumberForBackend(phoneNumberValue); // Use phoneNumberValue which is just the digits
      if (!validatePhoneNumberLength(formattedPhoneNumber)) {
        setPhoneNumberError("Panjang nomor telepon harus 7-15 digit.");
        isValid = false;
      }
    }

    // Password basic presence
    if (!passwordValue) {
      setPasswordError("Password wajib diisi.");
      isValid = false;
    } else {
      // Password Minimum Length Check
      if (passwordValue.length < 8) {
        setPasswordError("Password minimal 8 karakter.");
        isValid = false;
      }
      // Password Special Character Check
      if (containsSpecialCharacters(passwordValue)) {
        setPasswordError("Password tidak boleh mengandung karakter khusus.");
        isValid = false;
      }
    }

    if (!isValid) {
      setLoading(false);
      return; // Stop if frontend validation fails
    }

    // --- End Frontend Validation ---

    try {
      // Use the formatted number for the backend
      const formattedPhoneNumberForApi =
        formatPhoneNumberForBackend(phoneNumberValue);

      // Step 1: Login and get the token
      const loginResponse = await api.post("/user/login", {
        phone_number: formattedPhoneNumberForApi, // Use the formatted number
        password: passwordValue,
      });

      const accessToken = loginResponse.data.data.token;

      // Immediately store ONLY the token initially. User will be null.
      await setToken(accessToken, null);

      // Step 2: Fetch user data using the new token
      const userResponse = await api.get("/user/me");
      const userData = userResponse.data.data;

      // Step 3: Update the store with the fetched user data
      await setToken(accessToken, userData);

      console.log("Login successful! Redirecting to home.");
      router.replace("/(main)/home");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        setLoginError("Login gagal. Silakan periksa kembali kredensial Anda.");
      } else if (error.request) {
        setLoginError("Koneksi buruk. Periksa koneksi internet Anda.");
      } else {
        setLoginError("Terjadi kesalahan tak terduga selama login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        className="w-full h-full bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <VStack className="w-full h-full flex-1 justify-between">
              <VStack className="rounded-md mx-8 my-5">
                <FormControl
                  isInvalid={
                    !!phoneNumberError || !!passwordError || !!loginError
                  }
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  {/* Phone number form */}
                  <FormControlLabel>
                    <FormControlLabelText className="font-light">
                      Masukkan nomor telepon kamu
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input className="h-14 pl-3 my-1 rounded-xl border-gray-300 data-[focus=true]:border-green-select">
                    {/* InputSlot for the "+62" prefix */}
                    <InputSlot pl="$3">
                      <Text className="text-gray-500 font-normal -mr-1">
                        +62
                      </Text>
                    </InputSlot>
                    <InputField
                      type="text"
                      // Placeholder now only for the digits after +62
                      placeholder="87xxxx-xxxx-xxxx"
                      value={phoneNumberValue} // This state only holds the numbers user types
                      onChangeText={(text) => {
                        let cleaned = text.replace(/\D/g, "");
                        if (cleaned.startsWith("0")) {
                          cleaned = cleaned.replace(/^0+/, "");
                        }
                        setPhoneNumberValue(cleaned);
                        setPhoneNumberError(""); // Clear error on change
                        setLoginError(""); // Clear general login error on change
                      }}
                      keyboardType="phone-pad"
                      maxLength={15}
                    />
                  </Input>
                  {phoneNumberError ? (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {phoneNumberError}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}

                  {/* Password form */}
                  <FormControlLabel>
                    <FormControlLabelText className="font-light mt-5">
                      Masukkan password
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input className="h-14 my-1 p-1 pr-3 rounded-xl border-gray-300 data-[focus=true]:border-green-select">
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={passwordValue}
                      onChangeText={(text) => {
                        setPasswordValue(text);
                        setPasswordError(""); // Clear error on change
                        setLoginError(""); // Clear general login error on change
                      }}
                      secureTextEntry={!showPassword}
                    />
                    <InputSlot pr="$3">
                      <Pressable
                        onPress={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="#848688" />
                        ) : (
                          <Eye size={20} color="#848688" />
                        )}
                      </Pressable>
                    </InputSlot>
                  </Input>
                  {passwordError ? ( // Display password-specific error
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {passwordError}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}

                  {/* General login error message */}
                  {loginError ? (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{loginError}</FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              </VStack>
              <VStack className="mx-8 mb-6 items-center">
                <PrimaryButton
                  buttonAction={handleSubmit}
                  buttonTitle={loading ? "Logging In..." : "Login"}
                  disabled={loading}
                />
                <Pressable>
                  <Text className="text-orange-wondr font-bold underline underline-offset-1 py-4">
                    Lupa password
                  </Text>
                </Pressable>
              </VStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
}
