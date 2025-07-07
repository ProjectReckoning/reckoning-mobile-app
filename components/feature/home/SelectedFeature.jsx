// components/feature/home/SelectedFeature.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Link, LinkText } from "@/components/ui/link";

import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { usePocketStore } from "@/stores/pocketStore";

import FeatureButton from "../../common/buttons/FeatureButton";
import { features } from "../../../utils/mockData/featureData";

export default function SelectedFeature() {
  const { allPockets, fetchAllPockets } = usePocketStore();
  const [isPocketButtonDisabled, setPocketButtonDisabled] = useState(false);
  const [isTransferButtonDisabled, setTransferButtonDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setPocketButtonDisabled(false);
      setTransferButtonDisabled(false);
      console.log(
        "[SelectedFeature.jsx] Focus effect: Fetching pockets for check.",
      );
      fetchAllPockets();
    }, []),
  );

  const handlePocketPress = () => {
    if (isPocketButtonDisabled) return;
    setPocketButtonDisabled(true);
    const hasPocket = allPockets && allPockets.length > 0;

    // --- THIS IS THE LOG FOR THE HOME SCREEN ---
    const destination = hasPocket
      ? "/(main)/pocket/all"
      : "/(main)/pocket/onboarding";
    console.log(`--- HOME SCREEN ACTION ---`);
    console.log(
      `Button pressed. Checking for pockets. Pockets found: ${hasPocket}`,
    );
    console.log(`Navigating to: ${destination}`);
    console.log(`--------------------------`);

    router.push(destination);
  };

  const handleTransferPress = () => {
    if (isTransferButtonDisabled) return;
    setTransferButtonDisabled(true);
    router.push({
      pathname: "/pocket/[id]/transaction/transfer",
      params: { id: 0 },
    });
  };

  return (
    <Box className="flex flex-col gap-1 my-5">
      <Box className="flex flex-row my-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Fitur pilihan kamu</Text>
        <Link href="">
          <LinkText className="text-sm text-orange-wondr font-bold">
            Atur
          </LinkText>
        </Link>
      </Box>
      <HStack className="flex flex-wrap justify-between">
        {features.map((featureProps, i) => {
          const isPocketButton = featureProps.label === "Pocket";
          const isTransferButton = featureProps.label === "Transfer";
          return (
            <Box key={i} className="w-1/4 mb-6 items-center">
              <FeatureButton
                {...featureProps}
                onPress={
                  isPocketButton
                    ? handlePocketPress
                    : isTransferButton
                      ? handleTransferPress
                      : featureProps.onPress
                }
                disabled={
                  isPocketButton
                    ? isPocketButtonDisabled
                    : isTransferButton
                      ? isTransferButtonDisabled
                      : featureProps.disabled
                }
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
