/**
 * components/common/typography/AppText.jsx
 *
 * A reusable text component that applies consistent styling based on a variant.
 * It now supports clamping font sizes by passing minFontSize and maxFontSize.
 */
import React from "react";
import ResponsiveText from "./ResponsiveText";
import { TEXT_VARIANTS, DEFAULT_VARIANT } from "@/utils/typographyUtils";

export default function AppText({
  variant = "body",
  className: customClassName,
  minFontSize, // Pass minFontSize through
  maxFontSize, // Pass maxFontSize through
  children,
  ...props
}) {
  const styleVariant = TEXT_VARIANTS[variant] || DEFAULT_VARIANT;
  const fontSize = styleVariant.size;
  const variantClassName = styleVariant.className;

  const combinedClassName =
    `${variantClassName} ${customClassName || ""}`.trim();

  return (
    <ResponsiveText
      baseFontSize={fontSize}
      className={combinedClassName}
      minFontSize={minFontSize} // Pass to ResponsiveText
      maxFontSize={maxFontSize} // Pass to ResponsiveText
      {...props}
    >
      {children}
    </ResponsiveText>
  );
}
