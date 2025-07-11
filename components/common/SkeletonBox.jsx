import { Box } from "@/components/ui/box";

export function SkeletonBox({ className = "", style = {}, ...props }) {
  return (
    <Box
      className={`bg-gray-200 rounded ${className} animate-pulse`}
      style={style}
      {...props}
    />
  );
}
