const defaultTheme = require("./node_modules/@tailwindcss/forms");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var"],
      },
    },
  },
  plugins: [
  require("daisyui"), 
  require("@tailwindcss/forms")],
};
