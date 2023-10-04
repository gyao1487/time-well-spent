const defaultTheme = require("./node_modules/@tailwindcss/forms");

module.exports = {
  content: [
    
    "./client/src/pages/*.{html,js,jsx,ts,tsx}",
    "./client/src/components/*.{html,js,jsx,ts,tsx}",
    "./client/public/*.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/daisyui/**/*.js",
    "./node_modules/@tailwindcss/forms/**/*.js"
  ], 
  purge: [
    "./client/src/pages/*.{html,js,jsx,ts,tsx}",
    "./client/src/components/*.{html,js,jsx,ts,tsx}",
    "./client/public/*.html",
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


