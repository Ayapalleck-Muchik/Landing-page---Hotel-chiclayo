import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Marcellus as primary titles and buttons font
        serif: ['var(--font-marcellus)', 'var(--font-serif)', 'Marcellus', 'Georgia', 'serif'],
        // Jost as secondary clean, modern sans font
        sans: ['var(--font-jost)', 'var(--font-sans)', 'Jost', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        superWide: '0.25em',
        monumental: '0.35em',
      },
      colors: {
        hotel: {
          gold: '#C5A059',
          'gold-light': '#DFCA9D',
          'gold-dark': '#9e7d38',
          dark: '#141312',
          bone: '#FAF8F5',
          border: '#E4DCD0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
