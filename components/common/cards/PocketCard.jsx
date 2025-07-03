import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Crown, EllipsisVertical } from "lucide-react-native";
import { personalIconMap } from "@/utils/pocketCustomization/personalPocketIconUtils";
import { businessIconMap } from "@/utils/pocketCustomization/businessPocketIconUtils";

export default function PocketCard({
  mode = "balance", // mode can be "icon", "type", or "balance"
  pocketName,
  pocketType,
  pocketBalance = 0,
  color,
  icon = "pocket",
  iconSize = "16",
  space = "my-7",
  whiteSpace = "mb-10",
  cardWidth = "w-fit",
  editButton = false,
  onEdit = () => {},
  userRole = "viewer",
}) {
  const isBusiness = pocketType?.toLowerCase().includes("business");
  const isOwner = userRole === "owner";

  const IconComponent =
    typeof icon === "string"
      ? isBusiness
        ? businessIconMap[icon.toLowerCase()] || businessIconMap.pocket
        : personalIconMap[icon.toLowerCase()] || personalIconMap.pocket
      : personalIconMap.pocket;

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const baseColor =
    color || (isBusiness ? "bg-purple-wondr" : "bg-orange-wondr");

  const lightColor = `${baseColor}-light-translucent`;

  return (
    <Box
      className={`h-fit bg-white border border-gray-300 rounded-2xl p-0 ${cardWidth}`}
    >
      <Box
        className={`w-fit h-fit rounded-t-2xl p-4 ${whiteSpace} ${lightColor} ${mode === "icon" && "p-3"}`}
      >
        <HStack className="justify-between items-start">
          <Box
            className={`w-${iconSize} h-${iconSize} ${baseColor} rounded-full items-center justify-center ${mode === "icon" && "mb-0 mr-4"}`}
          >
            <IconComponent width="50%" height="50%" color="#fff" />
          </Box>
          {editButton && (
            <Pressable onPress={onEdit} className="mt-2 -mr-2">
              {({ pressed }) => (
                <EllipsisVertical
                  color={pressed ? "#000" : "#C6C6C6"}
                  size={24}
                  strokeWidth={2}
                />
              )}
            </Pressable>
          )}
        </HStack>
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
                <HStack space="xs" className="items-center">
                  <Text size={"sm"} className="text-black font-light">
                    {pocketType} pocket
                  </Text>
                  {isOwner && <Crown size={12} color="black" />}
                </HStack>
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
