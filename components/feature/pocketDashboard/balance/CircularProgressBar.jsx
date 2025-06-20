import React, { useState, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Box } from "@/components/ui/box";
import * as Progress from "react-native-progress";
import { usePocketStore } from "@/stores/pocketStore";
import { WondrColors } from "@/utils/colorUtils";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

export default function CircularProgressBar({ calculatedCircleDimension }) {
  const currentAmount = usePocketStore(
    (state) => state.currentPocket?.current_balance,
  );
  const targetAmount = usePocketStore(
    (state) => state.currentPocket?.target_nominal,
  );

  const [displayProgress, setDisplayProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Using two separate animated values as per your original logic
  const animatedProgressBarValue = useRef(new Animated.Value(0)).current;
  const animatedSmallCircleValue = useRef(new Animated.Value(0)).current;

  const smallCircleRef = useRef();

  const safeCalculatedCircleDimension =
    typeof calculatedCircleDimension === "number" &&
    !isNaN(calculatedCircleDimension) &&
    calculatedCircleDimension > 0
      ? calculatedCircleDimension
      : 100;

  const safeCurrentAmount = Number(currentAmount) || 0;
  const safeTargetAmount = Number(targetAmount) || 1;

  const targetProgress =
    safeTargetAmount > 0 ? safeCurrentAmount / safeTargetAmount : 0;

  // Restoring all layout and animation calculations from your original code
  const smallCircleSize = 50;
  const progressLineThickness = 25;
  const circleSizeForProgressComponent = Math.max(
    0,
    safeCalculatedCircleDimension - 20,
  );
  const mainCircleCenterlineRadius = circleSizeForProgressComponent / 2;
  const smallCircleRadialOffset =
    progressLineThickness / 2 - smallCircleSize / 2;
  const pathRadiusForSmallCircle =
    mainCircleCenterlineRadius + smallCircleRadialOffset;
  const centerX = safeCalculatedCircleDimension / 2;
  const centerY = safeCalculatedCircleDimension / 2;

  useEffect(() => {
    animatedProgressBarValue.setValue(0);
    animatedSmallCircleValue.setValue(0);
    setDisplayProgress(0);
    setPercentage(0);

    const progressListener = animatedProgressBarValue.addListener(
      (animation) => {
        setDisplayProgress(animation.value);
      },
    );

    const circleListener = animatedSmallCircleValue.addListener((animation) => {
      if (smallCircleRef.current) {
        const angle = animation.value * 2 * Math.PI;
        const x = centerX + pathRadiusForSmallCircle * Math.sin(angle);
        const y = centerY - pathRadiusForSmallCircle * Math.cos(angle);

        smallCircleRef.current.setNativeProps({
          style: {
            left: x - smallCircleSize / 2,
            top: y - smallCircleSize / 2,
          },
        });
      }

      setPercentage(Math.floor(animation.value * 100));
    });

    const progressBarAnimationDuration = 800;
    // Restoring your 1.2x duration multiplier to create the intended visual effect
    const smallCircleAnimationDuration = 1.2 * progressBarAnimationDuration;

    Animated.parallel([
      Animated.timing(animatedProgressBarValue, {
        toValue: targetProgress,
        duration: progressBarAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animatedSmallCircleValue, {
        toValue: targetProgress,
        duration: smallCircleAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      animatedProgressBarValue.removeListener(progressListener);
      animatedSmallCircleValue.removeListener(circleListener);
    };
  }, [targetProgress, safeCalculatedCircleDimension]);

  return (
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
        color={WondrColors["tosca-wondr"]}
        unfilledColor={WondrColors["light-gray-wondr"]}
        thickness={progressLineThickness}
        borderWidth={0}
        strokeCap="round"
      />

      <Box className="absolute justify-center items-center">
        <AppText variant="caption" className="mb-1">
          Saldo Terkumpul
        </AppText>
        <AppText variant="pageTitle" className="mb-1 text-black">
          {formatCurrency(safeCurrentAmount)}
        </AppText>
        <AppText variant="caption">/{formatCurrency(safeTargetAmount)}</AppText>
      </Box>

      <Animated.View
        ref={smallCircleRef}
        className="absolute bg-white rounded-full items-center justify-center"
        style={{
          width: smallCircleSize,
          height: smallCircleSize,
          left: centerX - smallCircleSize / 2,
          top: centerY - pathRadiusForSmallCircle - smallCircleSize / 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Box
          style={{
            width: smallCircleSize - 6,
            height: smallCircleSize - 6,
            borderRadius: (smallCircleSize - 6) / 2,
            backgroundColor: WondrColors["tosca-wondr"],
          }}
          className="items-center justify-center"
        >
          <AppText variant="small" className="font-bold text-white">
            {`${percentage}%`}
          </AppText>
        </Box>
      </Animated.View>
    </Box>
  );
}
