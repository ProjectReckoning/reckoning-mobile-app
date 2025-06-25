import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

export default function PrimaryButton({
  buttonAction = () => {},
  buttonTitle,
  buttonColor = "bg-tosca-wondr",
  buttonActiveColor = "active:bg-tosca-wondr-dark",
  disabled = false,
  className,
  textClassName = "",
  textPressed = "",
}) {
  return (
    <>
      <Pressable
        className={`p-4 w-full rounded-full justify-items-center items-center ${buttonColor} ${buttonActiveColor} ${className || ""}`}
        onPress={buttonAction}
        disabled={disabled}
      >
        {({ pressed }) => (
          <Text
            className={`text-black text-lg text-center font-bold ${textClassName} ${pressed ? textPressed : ""}`}
          >
            {buttonTitle}
          </Text>
        )}
      </Pressable>
    </>
  );
}
