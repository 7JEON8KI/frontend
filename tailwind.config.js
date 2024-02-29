/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#fd6f21",
        bgColor: "#ffffff",
        pointSubColor: "#237c60",
        pointSubColor2: "#1c5641",
        black: "#282828",
        darkGrey: "#5f5f5f",
        mediumGrey: "#c3c6c9",
        lightGrey: "#d0d0d0",
        white: "#ffffff",
        indigo600: "#4f46e5",
        indigo300: "#a5b4fc",
        red: "#dc2626",
      },
    },
  },
  plugins: [],
};
