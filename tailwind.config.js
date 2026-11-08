/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101D36',
          dark: '#0A1222',
          surface: '#152442',
          light: '#1E3258',
        },
        hotpink: {
          DEFAULT: '#F72585',
          hover: '#E01672',
          light: '#FF4D9E',
          subtle: 'rgba(247, 37, 133, 0.08)',
          glow: 'rgba(247, 37, 133, 0.25)',
        },
        brandLogo: {
          red: '#E63422',
          blue: '#0100F3',
          green: '#2B6116',
        },
        soft: '#F8F9FC',
        slate: {
          grey: '#64748B',
          light: '#94A3B8',
          dark: '#334155',
        },
        border: '#E2E8F0',
        gold: {
          DEFAULT: '#C5A880',
          dark: '#9E8056',
          subtle: 'rgba(197, 168, 128, 0.12)',
        },
      },
      fontFamily: {
        display: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'corporate': '0 4px 20px -2px rgba(16, 29, 54, 0.05), 0 2px 6px -1px rgba(16, 29, 54, 0.03)',
        'corporate-hover': '0 14px 34px -4px rgba(16, 29, 54, 0.1), 0 4px 12px -2px rgba(16, 29, 54, 0.05)',
        'hotpink-pill': '0 4px 18px -2px rgba(247, 37, 133, 0.38)',
      },
    },
  },
  plugins: [],
}
