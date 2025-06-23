import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { useState } from "react";
import { router } from "expo-router";
import { Delete } from "lucide-react-native";
import AppBar from "../../../../components/common/AppBar";

const PIN_LENGTH = 6;

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["Lupa PIN", 0, "backspace"],
];

export default function PinCode() {
  const [pin, setPin] = useState("");

  const handlePress = (val) => {
    if (typeof val === "number" && pin.length < PIN_LENGTH) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === PIN_LENGTH) {
        setTimeout(() => {
          setPin("");
          router.push("/(main)/pocket/transaction/Statement");
        }, 150);
      }
    } else if (val === "backspace" && pin.length > 0) {
      setPin(pin.slice(0, -1));
    } else if (val === "Lupa PIN") {
      console.log("Lupa PIN pressed");
    }
  };

  return (
    <Box className="flex-1 flex-col bg-white justify-between px-6 py-5">
      <VStack space="2xl">
        <VStack space="2xl" className="mt-3">
          {/* Heading */}
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
        {/* PIN Circles */}
        <HStack className="gap-3 justify-center my-10">
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <Box
              key={i}
              className={`w-5 h-5 rounded-full ${
                pin[i] ? "bg-tosca-wondr" : "border-2 border-black"
              } items-center justify-center mx-1`}
            />
          ))}
        </HStack>

        {/* Keypad */}
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
