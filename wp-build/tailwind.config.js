/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./wp-build/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          // WordPress Site Colors
          'primary': '#FFFFFF',      // bg-primary - Main background, cards, content areas
          'alt': '#ECECE9',          // bg-alt - Strips, secondary sections, subtle panels
          'accent-dark': '#353535',  // accent-dark - Header/footer/nav background, strong accents
          'text-light': '#000000',   // text-on-light - Body text on white / light gray
          'text-dark': '#FFFFFF',    // text-on-dark - Text on dark sections / buttons
          // Nav Colors (reference only)
          'nav-primary': '#1AAA94',   // nav-text-primary - Primary nav links, key actions
          'nav-secondary': '#3E96D3', // nav-text-secondary - Secondary nav links, hover/active
          // Legacy support (mapped to new colors)
          'lightest': '#FFFFFF',
          'light': '#ECECE9',
          'medium': '#353535',
          'dark': '#353535',
          'darkest': '#000000',
          'white': '#FFFFFF',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

