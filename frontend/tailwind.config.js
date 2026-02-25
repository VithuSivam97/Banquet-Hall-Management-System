/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#f97316",
        "brand-secondary": "#ea580c",
        "brand-bg": "#fef3c7",
        "text-muted": "#6b7280",
        "input-border": "#e5e7eb",
        success: "#43A047",
        info: "#448AFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
