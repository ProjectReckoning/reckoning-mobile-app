import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { ActivityIndicator } from "react-native";

import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTransactionStore } from "@/stores/transactionStore";
import { Delete } from "lucide-react-native";

const PIN_LENGTH = 6;

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["Lupa PIN", 0, "backspace"],
];

export default function PinCode() {
  const { id, isSchedule } = useLocalSearchParams();
  const [pin, setPin] = useState("");

  useEffect(() => {
    console.log("is schedule? ", id, isSchedule, typeof isSchedule);
  }, []);

  const {
    type,
    isProcessing,
    transactionError,
    executeTopUp,
    executeWithdraw,
    // --- NEW: Get the transfer action from the store ---
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
      try {
        // --- KEY CHANGE: Check the transaction type and call the correct action ---
        if (type.id === "topup") {
          await executeTopUp(id);
        } else if (type.id === "withdraw") {
          await executeWithdraw(id);
        } else if (type.id === "transfer") {
          await executeTransfer(id);
        } else if (type.id === "transfer_bulanan") {
          console.log("Scheduled");
          await executeScheduleTransfer(id);
        } else {
          console.warn(`Transaction type "${type.name}" not yet implemented.`);
        }

        // On success, navigate to the statement screen
        router.replace(`/(main)/pocket/${id}/transaction/Statement`);
      } catch (error) {
        console.error(`PIN Screen: ${type.name} failed.`, error);
        alert(
          `Transaction Failed: ${transactionError || "An unknown error occurred."}`,
        );
        setPin("");
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
                      <Delete size={28} />
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
