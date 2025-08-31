/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        air: {
          primary: '#90D5FF', // Airシリーズの水色
          light: '#B3E1FF',
          dark: '#6DC5FF',
        },
        gray: {
          light: '#F5F5F5',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 