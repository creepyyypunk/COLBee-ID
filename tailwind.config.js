/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#FFBF00',
          600: '#CC9900',
          700: '#997300',
          800: '#664D00',
          900: '#332600',
        },
        bee: {
          yellow: '#FFD700',
          orange: '#FFA500',
          brown: '#8B4513',
          black: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px 2px',
        'glow-md': '0 0 20px 5px',
        'glow-lg': '0 0 40px 10px',
      }
    },
  },
  plugins: [],
}
