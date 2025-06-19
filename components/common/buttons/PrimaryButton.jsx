import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function PrimaryButton({
  buttonAction = () => {},
  buttonTitle,
  disabled = false,
  className,
  textClassName = "",
  textPressable = "",
}) {
  return (
    <>
      <Pressable
        className={`px-5 py-4 w-full rounded-full justify-items-center items-center bg-tosca-wondr active:bg-tosca-wondr-dark ${className || ""}`}
        onPress={buttonAction}
        disabled={disabled}
      >
        {({ pressed }) => (
          <Text
            size={"lg"}
            className={`text-black text-center font-bold ${textClassName} ${pressed ? textPressable : ""}`}
          >
            {buttonTitle}
          </Text>
        )}
      </Pressable>
    </>
  );
}
