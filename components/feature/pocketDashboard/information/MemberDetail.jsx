import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";

export default function MemberDetail() {
  return (
    <>
      <Box>
        <Text className="font-extrabold text-xl mb-2">Member Detail</Text>
        <Pressable>
          <Box className="flex-row gap-2">
            <Box className="rounded-xl border border-2 border-light-gray-wondr w-16 h-16 justify-center items-center">
              <CirclePlus color={WondrColors["tosca-wondr"]} size={32} />
            </Box>
            <Box className="items-start justify-center">
              <Text className="font-extrabold text-lg">Teman baru</Text>
              <Text>Kamu bisa tambah teman baru ke dalam pocket.</Text>
            </Box>
          </Box>
        </Pressable>
      </Box>
    </>
  );
}
