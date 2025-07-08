import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Platform, ScrollView } from "react-native";

import TabBar from "@/components/common/TabBar";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

import AboutImg from "@/assets/images/info/About.png";
import AboutBisnisImg from "@/assets/images/info/AboutBisnis.png";
import AdminImg from "@/assets/images/info/Admin.png";
import AdminBisnisImg from "@/assets/images/info/AdminBisnis.png";
import AdminOwnerImg from "@/assets/images/info/AdminOwner.png";
import AdminOwnerBisnisImg from "@/assets/images/info/AdminOwnerBisnis.png";
import ApprovalImg from "@/assets/images/info/Approval.png";
import ApprovalBisnisImg from "@/assets/images/info/ApprovalBisnis.png";
import MemberBisnisImg from "@/assets/images/info/MemberBisnis.png";
import SpenderImg from "@/assets/images/info/Spender.png";
import ViewerImg from "@/assets/images/info/Viewer.png";

const tabList = [
  { key: "personal", label: "Personal" },
  { key: "business", label: "Business" },
];

export default function PocketInfo() {
  const [activeTab, setActiveTab] = useState("personal");
  const personalPocket = [
    { name: "AdminOwnerImg", img: AdminOwnerImg, class: "h-52" },
    { name: "AdminImg", img: AdminImg, class: "h-52" },
    { name: "SpenderImg", img: SpenderImg, class: "h-48" },
    { name: "ViewerImg", img: ViewerImg, class: "h-48" },
  ];

  const businessPocket = [
    { name: "AdminOwnerBisnisImg", img: AdminOwnerBisnisImg, class: "h-52" },
    { name: "AdminBisnisImg", img: AdminBisnisImg, class: "h-52" },
    { name: "MemberBisnisImg", img: MemberBisnisImg, class: "h-48" },
  ];
  const pocket = activeTab === "personal" ? personalPocket : businessPocket;

  const handleBack = () => {
    router.back();
  };

  return (
    <Box className="flex-1 w-full bg-white">
      <Box className="flex-1 px-6">
        <TabBar
          tabList={tabList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          size={14}
          marginVertical={12}
        />
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{ marginRight: -10 }}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingRight: 10,
            flexGrow: 1,
          }}
        >
          <VStack space="md" className="my-3">
            <VStack space="md" className="mt-5 mb-3">
              <Heading className="font-semibold">
                Tentang{" "}
                <Heading className="text-purple-wondr">
                  Pocket {tabList.find((tab) => tab.key === activeTab)?.label}
                </Heading>
              </Heading>
              <Divider className="bg-purple-wondr h-[0.2rem]" />
            </VStack>
            <Image
              source={activeTab === "personal" ? AboutImg : AboutBisnisImg}
              alt="about"
              className={`w-full ${activeTab === "personal" ? "h-32 -mt-2 mb-3" : "h-44 mb-3"}`}
              resizeMode="contain"
            />
            <Heading className="font-semibold">
              Role dalam <Heading className="text-purple-wondr">Pocket</Heading>
            </Heading>
            <Divider className="bg-purple-wondr h-[0.2rem]" />
          </VStack>
          {pocket.map((pocket, index) => (
            <Image
              key={index}
              source={pocket.img}
              alt={pocket.name}
              className={`w-full my-3 ${pocket.class}`}
              resizeMode="contain"
            />
          ))}
          <VStack space="md" className="mt-5 mb-3">
            <Heading className="font-semibold">
              Persetujuan dalam{" "}
              <Heading className="text-purple-wondr">Pocket</Heading>
            </Heading>
            <Divider className="bg-purple-wondr h-[0.2rem]" />
          </VStack>
          <Image
            source={activeTab === "personal" ? ApprovalImg : ApprovalBisnisImg}
            alt="approval"
            className="w-full h-56 my-3"
            resizeMode="contain"
          />
        </ScrollView>
      </Box>
      <Box style={styles.shadowAbove} className="bg-white w-full py-5 px-6">
        <PrimaryButton
          buttonAction={handleBack}
          buttonTitle={"Oke saya mengerti"}
        />
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  shadowAbove: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)",
        elevation: 20,
      },
    }),
  },
});
