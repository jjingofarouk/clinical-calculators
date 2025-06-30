/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(186, 61%, 35%)', // teal-600
          light: 'hsl(174, 78%, 41%)',   // teal-500
          dark: 'hsl(186, 61%, 25%)',    // darker teal
        },
        background: {
          DEFAULT: 'hsl(0, 0%, 98%)',    // gray-50
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};