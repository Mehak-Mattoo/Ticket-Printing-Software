/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: "#c0f2fd",
        bgBlue: "#cef1f9",
        lightGreen: "#9333EA", 
        borderBlue: "#d2ebf2", 
    
      },
    },
  },
  plugins: [],
};
