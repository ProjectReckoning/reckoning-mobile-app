import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function PrimaryButton({
  buttonAction = () => {},
  buttonTitle,
  className,
}) {
  return (
    <>
      <Pressable
        className={`p-5 w-full rounded-full justify-items-center items-center bg-tosca-wondr active:bg-tosca-wondr-dark ${className || ""}`}
        onPress={buttonAction}
      >
        <Text className="text-typography-0 text-center">{buttonTitle}</Text>
      </Pressable>
    </>
  );
}
