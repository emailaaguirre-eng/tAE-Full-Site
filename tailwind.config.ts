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
          'lightest': '#ebf4f6',
          'light': '#bdeaeb',
          'medium': '#76b4bd',
          'dark': '#58668b',
          'darkest': '#5e5656',
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

