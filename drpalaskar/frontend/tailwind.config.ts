import type { Config } from "tailwindcss";

/**
 * The visual system lives in src/app/globals.css (design tokens + components).
 * Tailwind is enabled for utility classes; the theme mirrors the CSS variables
 * so utilities and the design system stay in sync.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        teal: "var(--teal)",
        "teal-bright": "var(--teal-bright)",
        "teal-deep": "var(--teal-deep)",
        coral: "var(--coral)",
        "coral-deep": "var(--coral-deep)",
        bone: "var(--bone)",
        mist: "var(--mist)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
