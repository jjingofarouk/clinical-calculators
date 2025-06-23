/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f766e', // teal-700
          light: '#14b8a6',   // teal-500
          dark: '#0d4f4a',
        },
        background: {
          DEFAULT: '#ffffff', // white background for reading
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};