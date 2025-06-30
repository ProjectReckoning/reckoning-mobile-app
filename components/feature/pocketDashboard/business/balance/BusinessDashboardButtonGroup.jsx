import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import AppText from "@/components/common/typography/AppText";
import { Pressable } from "@/components/ui/pressable";
import { CalendarClock, ChartLine } from "lucide-react-native";
import { Linking, Alert, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function BusinessDashboardButtonGroup() {
  const { id: pocketId } = useLocalSearchParams();
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  const handleOpenUrl = async () => {
    setIsLoadingAnalytics(true);
    const url = "https://reckoning-web-app-production.vercel.app";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", `Sorry, we couldn't open this URL: ${url}`);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred while trying to open the link.",
      );
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  const handleNavigateToSchedule = () => {
    if (!pocketId) {
      console.error("Pocket ID is missing, cannot navigate to schedule.");
      return;
    }

    setIsLoadingSchedule(true);
    try {
      // The navigation itself is synchronous, but we simulate the delay perception
      router.push(`/(main)/pocket/${pocketId}/transferSchedule`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      // A small timeout can help ensure the UI transitions smoothly
      // before the loading state is removed. In most cases this isn't needed
      // but can help with perceived performance.
      setTimeout(() => setIsLoadingSchedule(false), 250);
    }
  };

  return (
    <Box
      className="rounded-xl p-3 mb-4 bg-purple-wondr"
      // By setting a high zIndex on the container, we ensure it and its children
      // (the buttons) stack on top of other elements.
    >
      <HStack className="justify-between items-center">
        {/* --- Schedule Button --- */}
        <VStack>
          <Pressable
            className="items-center justify-center h-12 w-20"
            onPress={handleNavigateToSchedule}
            disabled={isLoadingSchedule}
            style={{ zIndex: 99 }}
          >
            {isLoadingSchedule ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <CalendarClock size={24} color={"white"} />
                <AppText variant="caption" className="text-white font-semibold">
                  Schedule
                </AppText>
              </>
            )}
          </Pressable>
        </VStack>

        {/* --- Analytics Button --- */}
        <VStack>
          <Pressable
            className="items-center justify-center h-12 w-20"
            onPress={handleOpenUrl}
            disabled={isLoadingAnalytics}
            style={{ zIndex: 99 }}
          >
            {isLoadingAnalytics ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <ChartLine size={24} color={"white"} />
                <AppText variant="caption" className="text-white font-semibold">
                  Analytics
                </AppText>
              </>
            )}
          </Pressable>
        </VStack>
      </HStack>
    </Box>
  );
}
