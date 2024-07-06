/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightgray: "#CCCCCC",
        black: "#000000",
        orange: "#FF6600",
      },
    },
  },
  plugins: [],
};
