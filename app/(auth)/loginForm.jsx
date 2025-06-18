// app/(auth)/loginForm.jsx
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper, // Keeping if you have helper texts, otherwise can remove
  FormControlHelperText, // Keeping if you have helper texts, otherwise can remove
} from "@/components/ui/form-control";
// Import InputSlot along with Input and InputField
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import api from "@/lib/api";
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
        setLoginError(
          error.response.data?.message ||
            "Login gagal. Silakan periksa kembali kredensial Anda.",
        );
      } else if (error.request) {
        setLoginError(
          "Tidak ada respons dari server. Periksa koneksi internet Anda.",
        );
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
        className="w-full h-full items-center bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <VStack className="w-full flex-1 justify-between">
          <VStack className="rounded-md mx-8">
            <FormControl
              isInvalid={!!phoneNumberError || !!passwordError || !!loginError}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
            >
              {/* Phone number form */}
              <FormControlLabel>
                <FormControlLabelText>
                  Masukkan nomor telepon kamu
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                {/* InputSlot for the "+62" prefix */}
                <InputSlot pl="$3">
                  <Text className="text-gray-500 font-bold">+62 </Text>
                </InputSlot>
                <InputField
                  type="text"
                  // Placeholder now only for the digits after +62
                  placeholder="87xxxx-xxxx-xxxx"
                  value={phoneNumberValue} // This state only holds the numbers user types
                  onChangeText={(text) => {
                    // Only allow digits for phoneNumberValue state
                    setPhoneNumberValue(text.replace(/\D/g, ""));
                    setPhoneNumberError(""); // Clear error on change
                    setLoginError(""); // Clear general login error on change
                  }}
                  keyboardType="phone-pad"
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
                <FormControlLabelText>Masukkan password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="password"
                  placeholder="password"
                  value={passwordValue}
                  onChangeText={(text) => {
                    setPasswordValue(text);
                    setPasswordError(""); // Clear error on change
                    setLoginError(""); // Clear general login error on change
                  }}
                  secureTextEntry
                />
              </Input>
              {passwordError ? ( // Display password-specific error
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{passwordError}</FormControlErrorText>
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
      </Box>
    </>
  );
}
