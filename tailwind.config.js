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
          50: '#FAF8F2',
          100: '#F5F0E5',
          200: '#EDE5CC',
          300: '#E4C06A',
          400: '#E0B857',
          500: '#DCB044',
          600: '#D8A831',
          700: '#C49628',
          800: '#A17D21',
          900: '#7E611A',
        },
        bee: {
          yellow: '#FFD700',
          orange: '#FFA500',
          brown: '#8B4513',
          black: '#0A0A0A',
        },
        accent: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        display: ['EB Garamond', 'serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px 2px',
        'glow-md': '0 0 20px 5px',
        'glow-lg': '0 0 40px 10px',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
