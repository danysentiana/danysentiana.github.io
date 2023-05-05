/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["index.html", "thanks.html"],
  theme: {
    extend: {
      colors: {
        primary: "#f3f4f6",
        secondary: "#1f2937",
        dark: "#0F172A",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
        wiggle2: {
          "0%, 100%": { transform: "rotate(5deg)" },
          "50%": { transform: "rotate(-5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        wiggleSlow: "wiggle2 2s ease-in-out infinite",
      },
    },
    fontFamily: {
      mon: ['"Montserrat"', "sans-serif"],
      osan: ['"Open Sans"', "sans-serif"],
      pop: ['"Poppins"', "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
