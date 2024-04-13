/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

export default {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    listStyleType: {
      none: 'none',
      square: 'square',
      roman: 'upper-roman',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontWeight: {
      thin: "100",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      "extra-bold": "800",
      black: "900",
    },
    fontSize: {
      "2xs": ["10px", "12px"],
      xs: ["12px", "16px"],
      sm: ["14px", "18px"],
      base: ["16px", "20px"],
      lg: ["18px", "22px"],
      xl: ["24px", "28px"],
      "2xl": ["30px", "34px"],
      "3xl": ["38px", "42px"],
    },
    fontFamily: {
      montserrat: ["Montserrat", "Arial"],
    },
    colors: {
      ...colors,
      font: {
        default: "#565f6e",
        primary: "#1a73e3",
      },
      primary: "#1a73e3",
      global: {
        secondary: "#E7F3FF",
      },
    },
  },
  plugins: [],
};
