/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#FFFFFF",
          card: "#F9FAFB",
          border: "#E5E7EB",
          text: "#111827",
        },
        dark: {
          bg: "#09090B",
          card: "#18181B",
          border: "#27272A",
          text: "#F9FAFB",
        },
        accent: {
          light: "#1E3A8A",
          dark: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
