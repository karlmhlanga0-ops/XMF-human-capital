import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#4B5195',
          orange: '#D76A36',
        },
      },
      boxShadow: {
        glow: '0 35px 120px rgba(215, 106, 54, 0.18)',
      },
      backgroundImage: {
        'brand-gradient': 'radial-gradient(circle at top, rgba(215, 106, 54, 0.18), transparent 30%), linear-gradient(180deg, #4B5195 0%, #2E2B63 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
