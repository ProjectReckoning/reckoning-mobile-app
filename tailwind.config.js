import gluestackPlugin from "@gluestack-ui/nativewind-utils/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["app/**/*.{tsx,jsx,ts,js}", "components/**/*.{tsx,jsx,ts,js}"],
  presets: [require("nativewind/preset")],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: "rgb(var(--color-primary-0)/<alpha-value>)",
          50: "rgb(var(--color-primary-50)/<alpha-value>)",
          100: "rgb(var(--color-primary-100)/<alpha-value>)",
          200: "rgb(var(--color-primary-200)/<alpha-value>)",
          300: "rgb(var(--color-primary-300)/<alpha-value>)",
          400: "rgb(var(--color-primary-400)/<alpha-value>)",
          500: "rgb(var(--color-primary-500)/<alpha-value>)",
          600: "rgb(var(--color-primary-600)/<alpha-value>)",
          700: "rgb(var(--color-primary-700)/<alpha-value>)",
          800: "rgb(var(--color-primary-800)/<alpha-value>)",
          900: "rgb(var(--color-primary-900)/<alpha-value>)",
          950: "rgb(var(--color-primary-950)/<alpha-value>)",
        },
        secondary: {
          0: "rgb(var(--color-secondary-0)/<alpha-value>)",
          50: "rgb(var(--color-secondary-50)/<alpha-value>)",
          100: "rgb(var(--color-secondary-100)/<alpha-value>)",
          200: "rgb(var(--color-secondary-200)/<alpha-value>)",
          300: "rgb(var(--color-secondary-300)/<alpha-value>)",
          400: "rgb(var(--color-secondary-400)/<alpha-value>)",
          500: "rgb(var(--color-secondary-500)/<alpha-value>)",
          600: "rgb(var(--color-secondary-600)/<alpha-value>)",
          700: "rgb(var(--color-secondary-700)/<alpha-value>)",
          800: "rgb(var(--color-secondary-800)/<alpha-value>)",
          900: "rgb(var(--color-secondary-900)/<alpha-value>)",
          950: "rgb(var(--color-secondary-950)/<alpha-value>)",
        },
        tertiary: {
          50: "rgb(var(--color-tertiary-50)/<alpha-value>)",
          100: "rgb(var(--color-tertiary-100)/<alpha-value>)",
          200: "rgb(var(--color-tertiary-200)/<alpha-value>)",
          300: "rgb(var(--color-tertiary-300)/<alpha-value>)",
          400: "rgb(var(--color-tertiary-400)/<alpha-value>)",
          500: "rgb(var(--color-tertiary-500)/<alpha-value>)",
          600: "rgb(var(--color-tertiary-600)/<alpha-value>)",
          700: "rgb(var(--color-tertiary-700)/<alpha-value>)",
          800: "rgb(var(--color-tertiary-800)/<alpha-value>)",
          900: "rgb(var(--color-tertiary-900)/<alpha-value>)",
          950: "rgb(var(--color-tertiary-950)/<alpha-value>)",
        },
        error: {
          0: "rgb(var(--color-error-0)/<alpha-value>)",
          50: "rgb(var(--color-error-50)/<alpha-value>)",
          100: "rgb(var(--color-error-100)/<alpha-value>)",
          200: "rgb(var(--color-error-200)/<alpha-value>)",
          300: "rgb(var(--color-error-300)/<alpha-value>)",
          400: "rgb(var(--color-error-400)/<alpha-value>)",
          500: "rgb(var(--color-error-500)/<alpha-value>)",
          600: "rgb(var(--color-error-600)/<alpha-value>)",
          700: "rgb(var(--color-error-700)/<alpha-value>)",
          800: "rgb(var(--color-error-800)/<alpha-value>)",
          900: "rgb(var(--color-error-900)/<alpha-value>)",
          950: "rgb(var(--color-error-950)/<alpha-value>)",
        },
        success: {
          0: "rgb(var(--color-success-0)/<alpha-value>)",
          50: "rgb(var(--color-success-50)/<alpha-value>)",
          100: "rgb(var(--color-success-100)/<alpha-value>)",
          200: "rgb(var(--color-success-200)/<alpha-value>)",
          300: "rgb(var(--color-success-300)/<alpha-value>)",
          400: "rgb(var(--color-success-400)/<alpha-value>)",
          500: "rgb(var(--color-success-500)/<alpha-value>)",
          600: "rgb(var(--color-success-600)/<alpha-value>)",
          700: "rgb(var(--color-success-700)/<alpha-value>)",
          800: "rgb(var(--color-success-800)/<alpha-value>)",
          900: "rgb(var(--color-success-900)/<alpha-value>)",
          950: "rgb(var(--color-success-950)/<alpha-value>)",
        },
        warning: {
          0: "rgb(var(--color-warning-0)/<alpha-value>)",
          50: "rgb(var(--color-warning-50)/<alpha-value>)",
          100: "rgb(var(--color-warning-100)/<alpha-value>)",
          200: "rgb(var(--color-warning-200)/<alpha-value>)",
          300: "rgb(var(--color-warning-300)/<alpha-value>)",
          400: "rgb(var(--color-warning-400)/<alpha-value>)",
          500: "rgb(var(--color-warning-500)/<alpha-value>)",
          600: "rgb(var(--color-warning-600)/<alpha-value>)",
          700: "rgb(var(--color-warning-700)/<alpha-value>)",
          800: "rgb(var(--color-warning-800)/<alpha-value>)",
          900: "rgb(var(--color-warning-900)/<alpha-value>)",
          950: "rgb(var(--color-warning-950)/<alpha-value>)",
        },
        info: {
          0: "rgb(var(--color-info-0)/<alpha-value>)",
          50: "rgb(var(--color-info-50)/<alpha-value>)",
          100: "rgb(var(--color-info-100)/<alpha-value>)",
          200: "rgb(var(--color-info-200)/<alpha-value>)",
          300: "rgb(var(--color-info-300)/<alpha-value>)",
          400: "rgb(var(--color-info-400)/<alpha-value>)",
          500: "rgb(var(--color-info-500)/<alpha-value>)",
          600: "rgb(var(--color-info-600)/<alpha-value>)",
          700: "rgb(var(--color-info-700)/<alpha-value>)",
          800: "rgb(var(--color-info-800)/<alpha-value>)",
          900: "rgb(var(--color-info-900)/<alpha-value>)",
          950: "rgb(var(--color-info-950)/<alpha-value>)",
        },
        typography: {
          0: "rgb(var(--color-typography-0)/<alpha-value>)",
          50: "rgb(var(--color-typography-50)/<alpha-value>)",
          100: "rgb(var(--color-typography-100)/<alpha-value>)",
          200: "rgb(var(--color-typography-200)/<alpha-value>)",
          300: "rgb(var(--color-typography-300)/<alpha-value>)",
          400: "rgb(var(--color-typography-400)/<alpha-value>)",
          500: "rgb(var(--color-typography-500)/<alpha-value>)",
          600: "rgb(var(--color-typography-600)/<alpha-value>)",
          700: "rgb(var(--color-typography-700)/<alpha-value>)",
          800: "rgb(var(--color-typography-800)/<alpha-value>)",
          900: "rgb(var(--color-typography-900)/<alpha-value>)",
          950: "rgb(var(--color-typography-950)/<alpha-value>)",
          white: "#FFFFFF",
          gray: "#D4D4D4",
          black: "#181718",
        },
        outline: {
          0: "rgb(var(--color-outline-0)/<alpha-value>)",
          50: "rgb(var(--color-outline-50)/<alpha-value>)",
          100: "rgb(var(--color-outline-100)/<alpha-value>)",
          200: "rgb(var(--color-outline-200)/<alpha-value>)",
          300: "rgb(var(--color-outline-300)/<alpha-value>)",
          400: "rgb(var(--color-outline-400)/<alpha-value>)",
          500: "rgb(var(--color-outline-500)/<alpha-value>)",
          600: "rgb(var(--color-outline-600)/<alpha-value>)",
          700: "rgb(var(--color-outline-700)/<alpha-value>)",
          800: "rgb(var(--color-outline-800)/<alpha-value>)",
          900: "rgb(var(--color-outline-900)/<alpha-value>)",
          950: "rgb(var(--color-outline-950)/<alpha-value>)",
        },
        background: {
          0: "rgb(var(--color-background-0)/<alpha-value>)",
          50: "rgb(var(--color-background-50)/<alpha-value>)",
          100: "rgb(var(--color-background-100)/<alpha-value>)",
          200: "rgb(var(--color-background-200)/<alpha-value>)",
          300: "rgb(var(--color-background-300)/<alpha-value>)",
          400: "rgb(var(--color-background-400)/<alpha-value>)",
          500: "rgb(var(--color-background-500)/<alpha-value>)",
          600: "rgb(var(--color-background-600)/<alpha-value>)",
          700: "rgb(var(--color-background-700)/<alpha-value>)",
          800: "rgb(var(--color-background-800)/<alpha-value>)",
          900: "rgb(var(--color-background-900)/<alpha-value>)",
          950: "rgb(var(--color-background-950)/<alpha-value>)",
          error: "rgb(var(--color-background-error)/<alpha-value>)",
          warning: "rgb(var(--color-background-warning)/<alpha-value>)",
          muted: "rgb(var(--color-background-muted)/<alpha-value>)",
          success: "rgb(var(--color-background-success)/<alpha-value>)",
          info: "rgb(var(--color-background-info)/<alpha-value>)",
          light: "#FBFBFB",
          dark: "#181719",
        },
        indicator: {
          primary: "rgb(var(--color-indicator-primary)/<alpha-value>)",
          info: "rgb(var(--color-indicator-info)/<alpha-value>)",
          error: "rgb(var(--color-indicator-error)/<alpha-value>)",
        },
        "pink-wondr": "#FDA9FF",
        "pink-wondr-dark": "#E190E0",
        "pink-wondr-translucent": "#FDA9FFCC", // 80% opacity
        "pink-wondr-light-translucent": "#FFEEFF", // 30% opacity

        "purple-wondr": "#A471E1",
        "purple-wondr-dark": "#8B5BB5",
        "purple-wondr-translucent": "#A471E1CC", // 80% opacity
        "purple-wondr-light-translucent": "#EDE3F9", // 30% opacity

        "tosca-wondr": "#3FD8D4",
        "tosca-wondr-dark": "#2EACAA",
        "tosca-wondr-translucent": "#3FD8D4CC", // 80% opacity
        "tosca-wondr-light-translucent": "#D9F7F6", // 30% opacity

        "lime-wondr": "#DEEF5A",
        "lime-wondr-dark": "#B5D040",
        "lime-wondr-translucent": "#DEEF5ACC", // 80% opacity
        "lime-wondr-light-translucent": "#F8FCDE", // 30% opacity

        "orange-wondr": "#FF8500",
        "orange-wondr-dark": "#E17500",
        "orange-wondr-translucent": "#FF8500CC", // 80% opacity
        "orange-wondr-light-translucent": "#FFE7CC", // 30% opacity

        "yellow-wondr": "#FFC533",
        "yellow-wondr-dark": "#D4A82A",
        "yellow-wondr-translucent": "#FFC533CC", // 80% opacity
        "yellow-wondr-light-translucent": "#FFF3D6", // 30% opacity

        "red-wondr": "#D65C5B",
        "red-wondr-dark": "#B24F4F",
        "red-wondr-translucent": "#D65C5BCC", // 80% opacity
        "red-wondr-light-translucent": "#F7DEDE", // 30% opacity

        "green-wondr": "#02C694",
        "green-wondr-dark": "#01A37B",
        "green-wondr-translucent": "#02C694CC", // 80% opacity
        "green-wondr-light-translucent": "#CCF4EA", // 30% opacity

        "green-select": "#03796D",
        "green-select-dark": "#025850",
        "green-select-translucent": "#02C694CC", // 80% opacity
        "green-select-light-translucent": "#CDE4E2", // 30% opacity

        "light-gray-wondr": "#F0F0F0",
        "translucent-gray-wondr": "#F2F2F2", // 80% opacity
        "gray-wondr-border": "#C3C3C3", // BUAT BORDER
        "dark-gray-wondr-deactive": "#848688", // BUAT DEACTIVE
      },
      fontFamily: {
        heading: undefined,
        body: undefined,
        mono: undefined,
        roboto: ["Roboto", "sans-serif"],
      },
      fontWeight: {
        extrablack: "950",
      },
      fontSize: {
        "2xs": "10px",
      },
      boxShadow: {
        "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
        "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.1)",
        "soft-2": "0px 0px 20px rgba(38, 38, 38, 0.2)",
        "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.1)",
        "soft-4": "0px 0px 40px rgba(38, 38, 38, 0.1)",
      },
    },
  },
  plugins: [gluestackPlugin],
};
