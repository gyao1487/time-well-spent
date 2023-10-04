const defaultTheme = require("./node_modules/@tailwindcss/forms");

module.exports = {
  content: [
    "./src/pages/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx}",
    "./public/*.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/daisyui/**/*.js",
    "./node_modules/@tailwindcss/forms/**/*.js"
  ], 
  purge: [
    "./src/pages/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx}",
    "./public/*.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/daisyui/**/*.js",
    "./node_modules/@tailwindcss/forms/**/*.js"
  ],
  darkMode: 'class',
  theme: { 
    extend: {  
      textOpacity: ['dark'],
       fontFamily: {
        sans: ["Inter var"],
      },
    },
  },
  plugins: [
  require('flowbite/plugin'),
  require("daisyui"), 
  require("@tailwindcss/forms")()],
};
