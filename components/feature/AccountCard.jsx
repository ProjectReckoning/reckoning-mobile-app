import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Link, LinkText } from "@/components/ui/link";
import { Eye, EyeOff } from "lucide-react-native";

import PortfolioDecorator from "../../assets/images/decorators/portfolio-decorator.png";
import PortfolioIcon from "../../assets/images/icon/portfolio-icon.png";
import { useRef, useState } from "react";
import { Animated, View } from "react-native";

export function AccountCardItem({
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
        source={require("../../assets/images/decorators/account-decorator.png")}
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
        <Box className="flex flex-row items-center gap-2">
          <Heading size="xl" bold="true" className="font-extrabold">
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

export default function AccountCard() {
  const CARD_COUNT = 3; // Portfolio + 2 AccountCardItem

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const index = Math.round(
          event.nativeEvent.contentOffset.x /
            (event.nativeEvent.layoutMeasurement.width * 0.72), // 0.72 is w-72/100vw
        );
        setActiveIndex(index);
      },
    },
  );

  return (
    <Box className="flex flex-column">
      {/* Title Rekening Transaksi */}
      <Box className="flex flex-row my-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Rekening transaksi kamu</Text>
        <Link href="https://gluestack.io/">
          <LinkText className="text-sm text-[#FF7F00] font-bold">
            Lihat Semua
          </LinkText>
        </Link>
      </Box>

      {/* Horizontal Scrollable Cards */}
      <Box className="w-screen">
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
          pagingEnabled
          snapToInterval={288 + 8} // w-72 (288px) + gap (8px)
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Portfolio Card */}
          <Pressable
            onPress={() => {}}
            className="relative w-20 h-40 bg-[#C3F0ED] rounded-2xl overflow-hidden px-3 pb-7 flex flex-col justify-end"
          >
            <Image
              size="none"
              source={PortfolioDecorator}
              className="absolute left-6 bottom-2 w-[56px] h-[157px] object-cover"
              alt="portfolio-decorator"
            />
            <Image
              size="2xs"
              source={PortfolioIcon}
              className="absolute left-3 top-5 w-10 h-10 object-cover"
              alt="portfolio-icon"
            />
            <Text className="text-xs font-bold relative z-10 mt-7">
              Lihat Portfolio
            </Text>
          </Pressable>

          <AccountCardItem
            tipeTabungan="TAPLUS PEGAWAI BNI"
            noRekening="1916837397"
            saldo="Rp19.546.250"
            primary={true}
          />

          <AccountCardItem
            tipeTabungan="TAPLUS MUDA"
            noRekening="1916512345"
            saldo="Rp5.460.190"
          />
        </Animated.ScrollView>

        {/* Paginator */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
            gap: 8,
          }}
        >
          {[...Array(CARD_COUNT)].map((_, i) => {
            const inputRange = [
              (i - 1) * (288 + 8),
              i * (288 + 8),
              (i + 1) * (288 + 8),
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={{
                  width: dotWidth,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#FF7F00",
                  opacity: dotOpacity,
                }}
              />
            );
          })}
        </View>
      </Box>
    </Box>
  );
}
