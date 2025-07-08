import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { useFocusEffect } from "expo-router";
import { Animated, Easing } from "react-native";
import { useState, useMemo, useRef, useCallback } from "react";
import { usePocketStore } from "@/stores/pocketStore";
import { formatRupiah } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

const DEFAULT_CIRCLE_SIZE = 100;

export default function PressableCircle({
  calculatedCircleDimension,
  pocketType,
  currentBalance = 0,
  income = 0,
  expense = 0,
}) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const pocketColor = usePocketStore((state) => state.currentPocket?.color);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseRef = useRef(null);

  // Pulse scale down animation ONCE for 3 seconds on focus
  useFocusEffect(
    useCallback(() => {
      if (pocketType === "Business") {
        pulseAnim.setValue(1);
        pulseRef.current = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 0.95, // gentle scale down
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          { iterations: 2 }, // 2 pulses (2*1.2s = 2.4s)
        );
        pulseRef.current.start();

        const timeout = setTimeout(() => {
          pulseRef.current?.stop();
          pulseAnim.setValue(1);
        }, 2400);

        return () => {
          pulseRef.current?.stop();
          clearTimeout(timeout);
          pulseAnim.setValue(1);
        };
      }
    }, [pocketType, pulseAnim]),
  );

  const displayData = useMemo(() => {
    if (pocketType === "Business") {
      return [
        { title: "Saldo", amount: currentBalance, color: "bg-tosca-wondr" },
        { title: "Pemasukan", amount: income, color: "bg-green-wondr" },
        { title: "Pengeluaran", amount: expense, color: "bg-red-wondr" },
      ];
    }
    return [
      {
        title: "Saldo",
        amount: currentBalance,
        color: pocketColor || "bg-tosca-wondr",
      },
    ];
  }, [pocketColor, pocketType, currentBalance, income, expense]);

  const handlePress = () => {
    if (pocketType === "Business") {
      setDisplayIndex((prevIndex) => (prevIndex + 1) % displayData.length);
    }
  };

  const circleSize =
    typeof calculatedCircleDimension === "number" &&
    !isNaN(calculatedCircleDimension) &&
    calculatedCircleDimension > 0
      ? calculatedCircleDimension
      : DEFAULT_CIRCLE_SIZE;

  const currentDisplay = displayData[displayIndex];

  return (
    <Pressable
      onPress={handlePress}
      className="justify-center items-center rounded-full bg-white mb-2"
      style={{ width: circleSize, height: circleSize }}
    >
      <Animated.View
        style={{
          transform: [{ scale: pocketType === "Business" ? pulseAnim : 1 }],
          justifyContent: "center",
          alignItems: "center",
          borderRadius: (circleSize - 20) / 2,
          width: circleSize - 20,
          height: circleSize - 20,
          backfaceVisibility: "hidden",
        }}
        className={currentDisplay.color}
      >
        <Box
          className="justify-center items-center rounded-full elevation-5 bg-white p-2"
          style={{
            width: circleSize - 70,
            height: circleSize - 70,
          }}
        >
          <AppText variant="body" className="font-light text-black">
            {currentDisplay.title}
          </AppText>
          <AppText
            variant="pageTitle"
            className="font-bold text-black"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatRupiah(currentDisplay.amount)}
          </AppText>
        </Box>
      </Animated.View>
    </Pressable>
  );
}
