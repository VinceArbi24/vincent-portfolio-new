import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0D0D0D",
          950: "#0A0A0A",
          900: "#121212",
          700: "#333330",
          500: "#5C5B57",
        },
        fog: {
          DEFAULT: "#8C8A85",
          400: "#A6A49E",
          500: "#8C8A85",
          600: "#6E6C67",
        },
        line: {
          DEFAULT: "#D9D7D0",
          200: "#E7E5DE",
          300: "#D9D7D0",
          400: "#C3C1B9",
        },
        paper: {
          DEFAULT: "#F1F1ED",
          0: "#FFFFFF",
          100: "#F5F5F1",
          200: "#F1F1ED",
          300: "#E9E9E3",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        sfx: ["var(--font-sfx)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        ink: "cubic-bezier(0.65, 0, 0.35, 1)",
        snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      backgroundImage: {
        "dot-screentone":
          "radial-gradient(circle, currentColor 1px, transparent 1.4px)",
        "diag-lines":
          "repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 7px)",
      },
      boxShadow: {
        panel: "3px 3px 0 0 rgba(13,13,13,1)",
        "panel-lg": "6px 6px 0 0 rgba(13,13,13,1)",
      },
      zIndex: {
        cursor: "200",
        toast: "180",
        modal: "150",
        nav: "100",
      },
    },
  },
  plugins: [],
};
export default config;
