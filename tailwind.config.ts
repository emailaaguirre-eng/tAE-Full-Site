import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'lightest': '#f9fafb',
          'light': '#f1f5f9',
          'medium': '#d5d9df',
          'dark': '#6b7280',
          'darkest': '#1f2937',
        },
      },
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;

