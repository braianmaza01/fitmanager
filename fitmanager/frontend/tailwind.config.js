/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0f0f0f",
        surface: {
          1: "#161616",
          2: "#1e1e1e",
          3: "#252525",
        },
        accent: "#C8FF00",
        text: {
          primary: "#f0f0f0",
          secondary: "#a0a0a0",
        },
        status: {
          ok: "#22c55e",
          warning: "#f59e0b",
          danger: "#ef4444",
        },
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "3px",
        lg: "4px",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "modal-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "overlay-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-8px)" },
        },
        "page-enter": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out",
        "modal-in": "modal-in 200ms ease-out",
        "overlay-in": "overlay-in 200ms ease-out",
        "slide-down-in": "slide-down-in 280ms ease-out",
        "slide-down-out": "slide-down-out 250ms ease-in",
        "page-enter": "page-enter 220ms ease-out",
      },
    },
  },
  plugins: [],
};
