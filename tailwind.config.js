/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edfaef',
          100: '#d6f5db',
          200: '#b3eac0',
          300: '#81dd9d',
          400: '#4fc97a',
          500: '#28c76f', // Warna dasar #28c76f
          600: '#219d5c',
          700: '#1c7a4b',
          800: '#175b3b',
          900: '#113f2b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
