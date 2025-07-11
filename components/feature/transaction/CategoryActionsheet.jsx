import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetSectionList,
  ActionsheetSectionHeaderText,
} from "@/components/ui/actionsheet";
import { Pressable } from "react-native";

export default function CategoryActionSheet({ isOpen, onClose, handleClose }) {
  const DATA = [
    {
      title: "Kategori",
      data: ["Pembelian", "Gaji", "Pemindahan Dana"],
    },
  ];

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} snapPoints={[35]}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="flex bg-white w-full justify-center items-center px-8 pt-3 pb-10">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {/* PERUBAHAN DI SINI: Tambahkan `self-start` */}
        <Heading className="my-7 self-start">Pilih Kategori</Heading>

        <ActionsheetSectionList
          showsVerticalScrollIndicator={false}
          h="$56"
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleClose(item)}
              className="w-full p-3 mb-4 rounded-xl border border-gray-wondr-border active:border-green-select active:bg-green-select-light-translucent"
            >
              <Text className="text-black">{item}</Text>
            </Pressable>
          )}
        />
      </ActionsheetContent>
    </Actionsheet>
  );
}
