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
    },
  },
  plugins: [],
};
