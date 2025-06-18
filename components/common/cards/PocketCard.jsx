import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { iconWhiteMap } from "@/utils/pocketCustomization/personalPocketIconUtils";

const PocketWhite = iconWhiteMap.Pocket;

export default function PocketCard({
  mode = "balance", // mode can be "icon", "type", or "balance"
  pocketName,
  pocketType = "Saving",
  pocketBalance = "0",
  solidColor = "bg-orange-wondr",
  translucentColor = "bg-orange-wondr-light-translucent",
  icon = PocketWhite,
  iconSize = "16",
  space = "my-7",
  cardWidth = "w-fit",
}) {
  const IconComponent = iconWhiteMap[icon] || PocketWhite;

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <Box
      className={`h-fit bg-white border border-gray-300 rounded-2xl p-0 ${cardWidth}`}
    >
      <Box
        className={`w-fit h-fit rounded-t-2xl p-4 mb-10 ${translucentColor}`}
      >
        <Box
          className={`w-${iconSize} h-${iconSize} ${solidColor} rounded-full items-center justify-center ${mode === "icon" && "mb-2 mr-6"}`}
        >
          <Icon as={IconComponent} className="w-1/2 h-1/2" />
        </Box>
        {mode !== "icon" && (
          <VStack className={space}>
            <Heading
              size={"md"}
              className="pr-5"
              numberOfLines={mode === "balance" ? 1 : undefined}
              ellipsizeMode={mode === "balance" ? "tail" : undefined}
            >
              {pocketName ? pocketName : "Nama Pocket"}
            </Heading>
            {mode === "type" && <Text size={"md"}>{pocketType} pocket</Text>}
            {mode === "balance" && (
              <VStack space={"2xs"} className="mt-1">
                <Text size={"sm"} className="text-black font-light">
                  Saldo terkumpul:
                </Text>
                <Text
                  size={"md"}
                  className="text-black font-bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {formatRupiah(pocketBalance)}
                </Text>
              </VStack>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
}
