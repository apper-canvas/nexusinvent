/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#3B82F6",
        accent: "#EC4899",
        surface: "#1E1B2E",
        background: "#0F0D1A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
      },
    },
  },
  plugins: [],
};