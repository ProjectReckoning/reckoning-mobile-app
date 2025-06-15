import React, { useState, useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native"; // Added View import
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import * as Progress from "react-native-progress";
import { WondrColors } from "@/utils/colorUtils"; // Import WondrColors
import { formatCurrency } from "@/utils/helperFunction"; // Import formatCurrency from helper

export default function CircularProgressBar({
  calculatedCircleDimension,
  currentAmount = 75000,
  targetAmount = 100000,
}) {
  const safeCalculatedCircleDimension =
    typeof calculatedCircleDimension === "number" &&
    !isNaN(calculatedCircleDimension) &&
    calculatedCircleDimension > 0
      ? calculatedCircleDimension
      : 100;

  const safeCurrentAmount =
    typeof currentAmount === "number" && !isNaN(currentAmount)
      ? currentAmount
      : 0;

  const safeTargetAmount =
    typeof targetAmount === "number" && !isNaN(targetAmount) && targetAmount > 0
      ? targetAmount
      : 1;

  const animatedProgressBarValue = useRef(new Animated.Value(0)).current;
  const [displayProgress, setDisplayProgress] = useState(0);
  const animatedSmallCircleValue = useRef(new Animated.Value(0)).current;

  const targetProgress =
    safeTargetAmount > 0 ? safeCurrentAmount / safeTargetAmount : 0;

  const progressBarAnimationDuration = 800;
  const smallCircleAnimationDuration = 1.2 * progressBarAnimationDuration;

  const smallCircleSize = 50;
  const progressLineThickness = 25;
  const whiteBorderThickness = 3;
  const innerToscaCircleSize = smallCircleSize - 2 * whiteBorderThickness;

  const smallCircleRadialOffset =
    progressLineThickness / 2 - smallCircleSize / 2;

  const circleSizeForProgressComponent = Math.max(
    0,
    safeCalculatedCircleDimension - 20,
  );
  const mainCircleCenterlineRadius = circleSizeForProgressComponent / 2;

  const pathRadiusForSmallCircle =
    mainCircleCenterlineRadius + smallCircleRadialOffset;

  const centerX = safeCalculatedCircleDimension / 2;
  const centerY = safeCalculatedCircleDimension / 2;

  const [smallCirclePosition, setSmallCirclePosition] = useState({
    top: centerY - smallCircleSize / 2,
    left: centerX - smallCircleSize / 2,
  });

  useEffect(() => {
    const finalTargetProgress =
      typeof targetProgress === "number" && !isNaN(targetProgress)
        ? targetProgress
        : 0;

    animatedProgressBarValue.setValue(0);
    animatedSmallCircleValue.setValue(0);
    setDisplayProgress(0);

    const progressBarListenerId = animatedProgressBarValue.addListener(
      ({ value }) => {
        if (typeof value !== "number" || isNaN(value)) {
          return;
        }
        setDisplayProgress(value);
      },
    );

    const smallCircleListenerId = animatedSmallCircleValue.addListener(
      ({ value }) => {
        if (typeof value !== "number" || isNaN(value)) {
          return;
        }

        const angle = value * 2 * Math.PI;
        const currentPathRadius =
          typeof pathRadiusForSmallCircle === "number" &&
          isFinite(pathRadiusForSmallCircle)
            ? pathRadiusForSmallCircle
            : 0;

        const calculatedSmallCircleX =
          centerX + currentPathRadius * Math.sin(angle);
        const calculatedSmallCircleY =
          centerY - currentPathRadius * Math.cos(angle);

        const finalSmallCircleLeft =
          calculatedSmallCircleX - smallCircleSize / 2;
        const finalSmallCircleTop =
          calculatedSmallCircleY - smallCircleSize / 2;

        setSmallCirclePosition({
          top: finalSmallCircleTop,
          left: finalSmallCircleLeft,
        });
      },
    );

    Animated.parallel([
      Animated.timing(animatedProgressBarValue, {
        toValue: finalTargetProgress,
        duration: progressBarAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animatedSmallCircleValue, {
        toValue: finalTargetProgress,
        duration: smallCircleAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      animatedProgressBarValue.removeListener(progressBarListenerId);
      animatedSmallCircleValue.removeListener(smallCircleListenerId);
      animatedProgressBarValue.setValue(0);
      animatedSmallCircleValue.setValue(0);
      setDisplayProgress(0);
    };
  }, [
    targetProgress,
    safeCalculatedCircleDimension,
    smallCircleRadialOffset,
    centerX,
    centerY,
    pathRadiusForSmallCircle,
    smallCircleSize,
    progressBarAnimationDuration,
    smallCircleAnimationDuration,
  ]);

  return (
    <>
      <Box
        style={{
          width: safeCalculatedCircleDimension,
          height: safeCalculatedCircleDimension,
          borderRadius: safeCalculatedCircleDimension / 2,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bg-white mb-2"
      >
        <Progress.Circle
          size={circleSizeForProgressComponent}
          progress={displayProgress}
          showsText={false}
          color={WondrColors["tosca-wondr"]} // Use WondrColors
          unfilledColor={WondrColors["light-gray-wondr"]} // Use WondrColors
          thickness={progressLineThickness}
          borderWidth={0}
          strokeCap="round"
        />

        <Box
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text className="text-gray-700 text-base mb-1">Saldo Terkumpul</Text>
          <Text className="text-black text-2xl font-bold mb-1">
            {formatCurrency(safeCurrentAmount)}
          </Text>
          <Text className="text-gray-500 text-sm">
            /{formatCurrency(safeTargetAmount)}
          </Text>
        </Box>

        <Animated.View
          className="absolute bg-white rounded-full items-center justify-center"
          style={[
            {
              width: smallCircleSize,
              height: smallCircleSize,
              top: smallCirclePosition.top,
              left: smallCirclePosition.left,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <Box
            style={{
              width: innerToscaCircleSize,
              height: innerToscaCircleSize,
              borderRadius: innerToscaCircleSize / 2,
              backgroundColor: WondrColors["tosca-wondr"], // Use WondrColors
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              className="text-sm font-bold text-white"
              style={{
                lineHeight: 14,
              }}
            >
              {((safeCurrentAmount / safeTargetAmount) * 100).toFixed(0)}%
            </Text>
          </Box>
        </Animated.View>
      </Box>
    </>
  );
}
