/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(186, 61%, 35%)',
          light: 'hsl(174, 78%, 41%)',
          dark: 'hsl(186, 61%, 25%)',
        },
        background: {
          DEFAULT: 'hsl(0, 0%, 98%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};