/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: "#030712",
          900: "#0B1120",
          800: "#111D2D",
        },
        accent: {
          cyan: "#22D3EE",
          violet: "#A78BFA",
          emerald: "#34D399",
          amber: "#FBBF24",
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(34, 211, 238, 0.35)",
      },
      backgroundImage: {
        "pitch-grid":
          "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
