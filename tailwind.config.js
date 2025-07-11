/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
};

export default config;
