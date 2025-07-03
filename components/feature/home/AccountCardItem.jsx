import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

export default function AccountCardItem({
  tipeTabungan,
  noRekening,
  saldo,
  primary = false,
}) {
  const [showSaldo, setShowSaldo] = useState(false);

  return (
    <Pressable
      onPress={() => {}}
      className="relative flex flex-col justify-between w-72 h-40 bg-[#ff8500] rounded-2xl overflow-hidden p-5"
    >
      {/* Orange Decorator */}
      <Image
        source={require("../../../assets/images/decorators/account-decorator.png")}
        className="absolute right-0 top-0 w-40 h-40 object-cover opacity-60"
        alt="account-decorator"
      />

      {/* UTAMA Badge */}
      {primary && (
        <Badge className="absolute right-5 top-5 z-10 rounded-2xl px-2 py-1">
          <BadgeText className="font-semibold text-black text-xs">
            UTAMA
          </BadgeText>
        </Badge>
      )}

      {/* Card Content */}
      <Box className="flex flex-col gap-0 z-10">
        <Text className="text-sm font-normal text-black">{tipeTabungan}</Text>
        <Heading size="lg" bold="true" className="font-extrabold">
          {noRekening}
        </Heading>
      </Box>

      {/* Saldo Efektif */}
      <Box className="flex flex-col gap-0 mt-4 z-10">
        <Text className="text-xs font-normal text-black">Saldo efektif</Text>
        <Box className="flex flex-row w-[90%] items-center gap-2">
          <Heading
            size="xl"
            bold="true"
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-extrabold"
          >
            {showSaldo ? saldo : "Rp**********"}
          </Heading>
          <Pressable onPress={() => setShowSaldo((prev) => !prev)}>
            {showSaldo ? (
              <Eye size={16} color="#111" />
            ) : (
              <EyeOff size={16} color="#111" />
            )}
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
}
