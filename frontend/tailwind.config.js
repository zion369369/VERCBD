/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "rgb(var(--brand-primary-rgb, 0 75 141) / <alpha-value>)",
          secondary: "rgb(var(--brand-secondary-rgb, 0 174 239) / <alpha-value>)",
          accent: "#FBB03B",
          dark: "#1A1A1A",
          light: "#F8F9FA",
        },
      },
      fontFamily: {
        sans: ["'Valley Sans'", 'Inter', '-apple-system', 'sans-serif'],
        valley: ["'Valley Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
