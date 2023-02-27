/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#14203E",
        lightBlue: "#526084",
        lightGold: "#FFFCF8",
        mediumGold: "#F6F0E8",
        darkGold: "#F4E8D8",
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        serif: ["PT Serif", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8))",
      },
    },
  },
  plugins: [],
};
