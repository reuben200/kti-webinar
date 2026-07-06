/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1120',
        'ink-soft': '#152038',
        parchment: '#F5F0E6',
        gold: '#C9A24B',
        'gold-soft': '#E3C77E',
        blue: '#1E3A5F',
        'text-light': '#E8E2D4',
        'text-muted': '#A9B0C2',
        line: 'rgba(232,226,212,0.14)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
