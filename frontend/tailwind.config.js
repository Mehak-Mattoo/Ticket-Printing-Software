/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include your HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in your source folder
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: "#c0f2fd", // Custom primary color
        bgBlue: "#cef1f9",
        lightGreen: "#9333EA", // Custom secondary color
        borderBlue: "#d2ebf2", // Custom accent color
        // neutral: {
        //   light: "#F3F4F6", // Neutral light
        //   DEFAULT: "#D1D5DB", // Neutral default
        //   dark: "#374151", // Neutral dark
        // },
      },
    },
  },
  plugins: [],
};
