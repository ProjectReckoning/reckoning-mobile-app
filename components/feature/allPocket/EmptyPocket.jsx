import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";

import EmptyPocketDecorator from "@/assets/images/emptyPocket.png";
import PrimaryButton from "../../common/buttons/PrimaryButton";

export default function EmptyPocket() {
  const GoToCreatePocket = () => {
    router.push("/(main)/pocket/create");
  };
  return (
    <Box className="flex-1 bg-white justify-between">
      <Box className="flex flex-col justify-center items-center my-5">
        <Image
          source={EmptyPocketDecorator}
          alt="pocket-type-decorator"
          className="w-fit h-72"
          resizeMode="contain"
        />
        <VStack size="md" className="items-center justify-center gap-1">
          <Heading size="xl" className="font-extrabold">
            Kamu belum punya pocket!
          </Heading>
          <Text size="md" className="text-black text-center">
            Impian jadi nyata! patungan di pocket, rencana jelas, dana
            transparan.
          </Text>
        </VStack>
      </Box>
      <PrimaryButton
        buttonAction={GoToCreatePocket}
        buttonTitle="Buat Pocket"
        className="mb-5"
      />
    </Box>
  );
}
