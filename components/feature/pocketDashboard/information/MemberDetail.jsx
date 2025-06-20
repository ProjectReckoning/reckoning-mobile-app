import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { CirclePlus } from "lucide-react-native";
import { WondrColors } from "@/utils/colorUtils";
import AppText from "@/components/common/typography/AppText";

export default function MemberDetail() {
  return (
    <Box className="mb-4">
      <AppText variant="pageTitle" className="mb-2">
        Member Detail
      </AppText>
      <Pressable>
        <Box className="flex-row gap-2 items-center">
          <Box className="rounded-xl border border-2 border-light-gray-wondr w-16 h-16 justify-center items-center">
            <CirclePlus color={WondrColors["tosca-wondr"]} size={32} />
          </Box>
          {/* By adding flex-1 here, this container will fill the remaining space, allowing text to wrap. */}
          <Box className="items-start justify-center flex-1">
            <AppText variant="cardTitle">Teman baru</AppText>
            <AppText variant="body">
              Kamu bisa tambah teman baru ke dalam pocket.
            </AppText>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
}
