import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";

export default function PocketCard({
  mode = "balance", // mode can be "icon", "type", or "balance"
  pocketName,
  pocketType = "Saving",
  pocketBalance = "0",
  solidColor = "bg-orange-wondr",
  translucentColor = "bg-orange-wondr-light-translucent",
  iconWhite = "PocketWhite",
  iconSize = "16",
  space = "my-7",
  cardWidth = "w-fit",
}) {
  return (
    <Box
      className={`h-fit bg-white border border-gray-300 rounded-2xl p-0 ${cardWidth} ${mode !== "icon" && "min-w-48"}`}
    >
      <Box
        className={`w-fit h-fit rounded-t-2xl p-4 mb-10 ${translucentColor}`}
      >
        <Box
          className={`w-${iconSize} h-${iconSize} ${solidColor} rounded-full items-center justify-center ${mode === "icon" && "mb-2 mr-6"}`}
        >
          <Icon as={iconWhite} className="w-1/2 h-1/2" />
        </Box>
        {mode === "icon" ? (
          <></>
        ) : (
          <VStack className={space}>
            <Heading size={"md"} className="pr-5">
              {pocketName ? pocketName : "Nama Pocket"}
            </Heading>
            {mode === "type" && <Text size={"md"}>{pocketType} pocket</Text>}
            {mode === "balance" && (
              <VStack space={"2xs"} className="mt-1">
                <Text size={"sm"} className="text-gray-500 font-semibold">
                  Saldo terkumpul
                </Text>
                <Text size={"md"} className="text-black font-bold">
                  Rp{pocketBalance}
                </Text>
              </VStack>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}
