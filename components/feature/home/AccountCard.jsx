// components/feature/home/AccountCard.jsx
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Link, LinkText } from "@/components/ui/link";

import PortfolioDecorator from "../../../assets/images/decorators/portfolio-decorator.png";
import PortfolioIcon from "../../../assets/images/icon/portfolio-icon.png";
import { useRef, useState } from "react";
import { Animated, View } from "react-native";

import AccountCardItem from "./AccountCardItem";

// Helper function to format the balance
const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "Rp...";
  }
  // Using Intl.NumberFormat for robust, locale-aware currency formatting
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, ""); // remove any space like in 'Rp 1.000'
};

export default function AccountCard({ user }) {
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

  // Format the balance from the user object
  const userBalance = formatCurrency(user?.balance);

  return (
    <Box className="flex flex-column">
      {/* Title Rekening Transaksi */}
      <Box className="flex flex-row my-5 justify-between items-end">
        <Text className="font-extrabold text-xl">Rekening transaksi kamu</Text>
        <Link href="">
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
          contentContainerStyle={{ gap: 8, paddingRight: 50 }}
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

          {/* Main account card - now with dynamic balance */}
          <AccountCardItem
            tipeTabungan="TAPLUS PEGAWAI BNI"
            noRekening="1916837397"
            saldo={userBalance}
            primary={true}
          />

          {/* Mocked secondary account card */}
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
