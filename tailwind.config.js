/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#14203E",
        lightGold: "#FFFCF8",
        mediumGold: "#F6F0E8",
        darkGold: "#F4E8D8",
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        serif: ["PT Serif", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
