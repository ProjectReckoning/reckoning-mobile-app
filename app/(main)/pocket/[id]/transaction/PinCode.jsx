// app/(main)/pocket/[id]/transaction/PinCode.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useToast } from "@/components/ui/toast";
import CustomToast from "@/components/common/customToast/CustomToast";
import { useState } from "react";
import { Delete } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { useTransactionStore } from "@/stores/transactionStore";

const PIN_LENGTH = 6;

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["Lupa PIN", 0, "backspace"],
];

export default function PinCode() {
  const navigation = useNavigation(); // Get navigation object for advanced actions
  const params = useLocalSearchParams();
  const { id, isSchedule, qris } = params;
  const [pin, setPin] = useState("");
  const isQRIS = qris === "true";
  const toast = useToast();

  const {
    type,
    isProcessing,
    transactionError,
    executeTopUp,
    executeWithdraw,
    executeTransfer,
    executeScheduleTransfer,
  } = useTransactionStore();

  const handlePress = async (val) => {
    if (isProcessing) return;

    let newPin = pin;
    if (typeof val === "number" && pin.length < PIN_LENGTH) {
      newPin = pin + val;
      setPin(newPin);
    } else if (val === "backspace" && pin.length > 0) {
      newPin = pin.slice(0, -1);
      setPin(newPin);
    } else if (val === "Lupa PIN") {
      console.log("Lupa PIN pressed");
      return;
    }

    if (newPin.length === PIN_LENGTH) {
      if (!isQRIS) {
        try {
          let result;
          if (type.id === "topup") {
            result = await executeTopUp(id);
          } else if (type.id === "withdraw") {
            result = await executeWithdraw(id);
          } else if (type.id === "transfer") {
            result = await executeTransfer(id);
          } else if (type.id === "transfer_bulanan") {
            result = await executeScheduleTransfer(id);
          }

          if (result) {
            if (
              result.status === "pending" &&
              params.successAction === "showApprovalToast"
            ) {
              toast.show({
                placement: "top",
                duration: 2500,
                render: ({ id }) => {
                  return <CustomToast id={id} title={params.toastMessage} />;
                },
              });

              navigation.dispatch(
                CommonActions.reset({
                  index: 2,
                  routes: [
                    { name: "home/index" },
                    { name: "pocket/all/index" },
                    { name: "pocket/[id]/index", params: { id } },
                  ],
                }),
              );

              setTimeout(() => {}, 2000);
            } else {
              router.push({
                pathname: "/(main)/pocket/[id]/transaction/Statement",
                params: { id, isSchedule },
              });
            }
          } else {
            alert(
              `Transaction Failed: Could not retrieve transaction details.`,
            );
            setPin("");
          }
        } catch (error) {
          console.error(`PIN Screen: ${type.name} failed.`, error);
          alert(
            `Transaction Failed: ${
              transactionError || "An unknown error occurred."
            }`,
          );
          setPin("");
        }
      } else {
        router.replace("home/qris/payment");
      }
    }
  };

  return (
    <Box className="flex-1 flex-col bg-white justify-between px-6 py-5">
      <VStack space="2xl">
        <VStack space="2xl" className="mt-3">
          <VStack space="xs" className="items-center justify-center">
            <Heading size="xl" className="font-bold">
              Masukan PIN wondr
            </Heading>
            <Text size="md" className="font-light">
              Pin wondr 6 digit kamu
            </Text>
          </VStack>
        </VStack>
      </VStack>

      <VStack space="2xl">
        <HStack className="gap-3 justify-center my-10">
          {isProcessing ? (
            <ActivityIndicator size="large" color="#58ABA1" />
          ) : (
            [...Array(PIN_LENGTH)].map((_, i) => (
              <Box
                key={i}
                className={`w-5 h-5 rounded-full ${
                  pin[i] ? "bg-tosca-wondr" : "border-2 border-black"
                } items-center justify-center mx-1`}
              />
            ))
          )}
        </HStack>

        <VStack className="flex justify-between items-center gap-8 mb-16">
          {keypad.map((row, rowIndex) => (
            <HStack key={rowIndex} className="gap-8">
              {row.map((item, colIndex) => {
                if (item === "Lupa PIN") {
                  return (
                    <Pressable
                      key={colIndex}
                      onPress={() => handlePress(item)}
                      className="w-[5.5rem] h-[5.5rem] items-center justify-center"
                      disabled={isProcessing}
                    >
                      <Text className="text-orange-wondr font-bold">
                        Lupa PIN
                      </Text>
                    </Pressable>
                  );
                }
                if (item === "backspace") {
                  return (
                    <Pressable
                      key={colIndex}
                      onPress={() => handlePress(item)}
                      className="w-[5.5rem] h-[5.5rem] rounded-full bg-light-gray-wondr items-center justify-center"
                      disabled={isProcessing}
                    >
                      <Delete size={28} color="black" />
                    </Pressable>
                  );
                }
                return (
                  <Pressable
                    key={colIndex}
                    onPress={() => handlePress(item)}
                    className="w-[5.5rem] h-[5.5rem] rounded-full bg-light-gray-wondr items-center justify-center"
                    disabled={isProcessing}
                  >
                    <Text className="text-2xl font-extrabold text-black">
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
