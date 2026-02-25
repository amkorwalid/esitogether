/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0F2854", // Darkest / main brand
          800: "#122E63", // Elevated background
          700: "#1C4D8D", // Primary button
          500: "#4988C4", // Hover / accents
          200: "#BDE8F5", // Light accent
        },

        text: {
          primary: "#0F2854",
          secondary: "#4988C4",
          muted: "#7FAFD4",
          onDark: "#FFFFFF",
        },

        ui: {
          success: "#2E8B57",
          warning: "#F4B400",
          error: "#D64545",
          info: "#4988C4",
        },

        border: {
          DEFAULT: "#1C4D8D",
          light: "#4988C4",
        },
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #0F2854 0%, #1C4D8D 50%, #4988C4 100%)",
        "brand-soft":
          "linear-gradient(135deg, #1C4D8D 0%, #BDE8F5 100%)",
      },
    },
  },
  plugins: [],
};