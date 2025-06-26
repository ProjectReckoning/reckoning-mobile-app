import { Box } from "@/components/ui/box";
import NotificationList from "@/components/feature/notification/NotificationList";

export default function NotificationListScreen() {
  return (
    <Box className="flex-1 bg-white pt-2">
      <NotificationList />
    </Box>
  );
}
