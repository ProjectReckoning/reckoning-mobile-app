import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import InfoMemberDetailCell from "@/components/common/tableCells/InfoMemberDetailCell";

export default function OwnerDetail({ data }) {
  return (
    <Box className="mb-4">
      <Text className="font-extrabold text-xl mb-2">Owner</Text>
      <InfoMemberDetailCell member={data} />
    </Box>
  );
}
