import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0e1a",
        surface: "#0f1525",
        elevated: "#161e33",
        border: "#1f2a44",
        muted: "#7a8aa8",
        text: "#e5ecf7",
        accent: "#4ade80",
        "accent-glow": "#4ade8033",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1f2a4422 1px, transparent 1px), linear-gradient(to bottom, #1f2a4422 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px #4ade8055",
      },
      keyframes: {
        pulse_dot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        fade_in: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulse_dot: "pulse_dot 1.4s ease-in-out infinite",
        fade_in: "fade_in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
