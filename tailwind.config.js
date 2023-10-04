const defaultTheme = require("./node_modules/@tailwindcss/forms");


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js"
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
