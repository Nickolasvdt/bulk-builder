import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        ink: "#050707",
        mute: "#4A4A4A",
        rule: "#05070714",
        dark: "#050707",
        accent: "var(--accent)",
        sun: "var(--sun)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        tight2: "-0.02em",
        wider2: "0.16em",
      },
    },
  },
  plugins: [],
};

export default config;
