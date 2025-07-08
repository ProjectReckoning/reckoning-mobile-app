import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";

import { Animated, Easing } from "react-native";
import * as Progress from "react-native-progress";
import { useState, useEffect, useRef } from "react";

import { WondrColors } from "@/utils/colorUtils";
import { usePocketStore } from "@/stores/pocketStore";
import { formatCurrency } from "@/utils/helperFunction";
import AppText from "@/components/common/typography/AppText";

export default function CircularProgressBar({ calculatedCircleDimension }) {
  const currentAmount = usePocketStore(
    (state) => state.currentPocket?.current_balance,
  );
  const targetAmount = usePocketStore(
    (state) => state.currentPocket?.target_nominal,
  );
  const pocketColor = usePocketStore((state) => state.currentPocket?.color);
  const formattedPocketColor =
    pocketColor?.replace(/^bg-/, "") || "tosca-wondr";

  const [displayProgress, setDisplayProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

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

  // Calculate digit count (excluding non-digit characters)
  const amountDigits = String(Math.floor(Math.abs(safeCurrentAmount))).replace(
    /\D/g,
    "",
  ).length;

  // Determine heading size based on digit count
  let headingSize = "lg";
  if (amountDigits > 14) {
    headingSize = "xs";
  } else if (amountDigits > 12) {
    headingSize = "sm";
  } else if (amountDigits > 10) {
    headingSize = "md";
  } else {
    headingSize = "lg";
  }

  // Calculate the raw progress, which can exceed 1 (100%)
  const rawProgress =
    safeTargetAmount > 0 ? safeCurrentAmount / safeTargetAmount : 0;

  // --- KEY CHANGE: Clamp the visual progress to a maximum of 1 (100%) ---
  // This ensures the progress bar and animated circle do not go beyond a full circle.
  const visualProgress = Math.min(1, rawProgress);

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

      // --- KEY CHANGE: Because the animation is capped at 1, this percentage will now be capped at 100 ---
      setPercentage(Math.floor(animation.value * 100));
    });

    const progressBarAnimationDuration = 800;
    const smallCircleAnimationDuration = 1.2 * progressBarAnimationDuration;

    Animated.parallel([
      Animated.timing(animatedProgressBarValue, {
        // Animate to the clamped visual progress value
        toValue: visualProgress,
        duration: progressBarAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(animatedSmallCircleValue, {
        // Animate to the clamped visual progress value
        toValue: visualProgress,
        duration: smallCircleAnimationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    return () => {
      animatedProgressBarValue.removeListener(progressListener);
      animatedSmallCircleValue.removeListener(circleListener);
    };
  }, [visualProgress, safeCalculatedCircleDimension]); // Depend on visualProgress

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
        progress={displayProgress} // This will be capped due to the animation
        showsText={false}
        color={WondrColors[formattedPocketColor]}
        unfilledColor={WondrColors["light-gray-wondr"]}
        thickness={progressLineThickness}
        borderWidth={0}
        strokeCap="round"
      />

      <Box className="absolute justify-center items-center">
        <AppText variant="medium" className="mb-1 text-black">
          Saldo Terkumpul
        </AppText>
        {/* <AppText variant="pageTitle" className="mb-1 text-black">
          {formatCurrency(safeCurrentAmount)}
        </AppText> */}
        <Heading size={headingSize} className="mb-1 font-extrabold text-black">
          {/* This text remains uncapped and shows the true current amount */}
          {formatCurrency(safeCurrentAmount)}
        </Heading>
        <AppText variant="caption" className="text-black">
          /{formatCurrency(safeTargetAmount)}
        </AppText>
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
            backgroundColor: WondrColors["formattedPocketColor"],
          }}
          className="items-center justify-center"
        >
          <AppText
            variant="caption"
            className={`font-bold ${formattedPocketColor === "lime-wondr" ? "text-black" : "text-white"}`}
          >
            {/* This percentage text is now capped at 100% */}
            {`${percentage}%`}
          </AppText>
        </Box>
      </Animated.View>
    </Box>
  );
}
