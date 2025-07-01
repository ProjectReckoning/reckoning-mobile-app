/**
 * utils/typography.js
 * * This file centralizes the text styling for the entire application.
 * Each variant includes a font size and a default set of Tailwind CSS classes.
 */

export const TEXT_VARIANTS = {
  // Page and section titles
  pageTitle: {
    size: 16,
    className: "font-extrabold text-black",
  },
  title: {
    size: 16,
    className: "font-bold text-black",
  },
  cardTitle: {
    size: 14,
    className: "font-bold text-black",
  },

  // Body text for general content
  body: {
    size: 14,
    className: "font-normal text-black",
  },
  bodyBold: {
    size: 14,
    className: "font-bold text-black",
  },
  bodyMuted: {
    size: 14,
    className: "font-normal text-black",
  },
  medium: {
    size: 12,
    className: "font-normal text-dark-gray-wondr-deactive",
  },

  // Smaller text for captions, metadata, etc.
  caption: {
    size: 10,
    className: "font-normal text-dark-gray-wondr-deactive",
  },
  small: {
    size: 8,
    className: "font-normal text-dark-gray-wondr-deactive",
  },
};

// Define a default variant to fall back on if an invalid one is provided.
export const DEFAULT_VARIANT = TEXT_VARIANTS.body;
