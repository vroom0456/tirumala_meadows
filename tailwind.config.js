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
          subtle: '#EEF2F6',
        },
        brandLogo: {
          red: '#E63422',
          blue: '#0100F3',
          green: '#2B6116',
        },
        forest: {
          DEFAULT: '#101D36',
          dark: '#0A1222',
          surface: '#152442',
          light: '#1E3258',
          subtle: '#EEF2F6',
        },
        ivory: {
          DEFAULT: '#F8F9FC',
          warm: '#F1F5F9',
          soft: '#F8F9FC',
          card: '#FFFFFF',
        },
        soft: '#F8F9FC',
        slate: {
          grey: '#64748B',
          light: '#94A3B8',
          dark: '#1E293B',
        },
        border: '#E2E8F0',
        gold: {
          DEFAULT: '#E63422',
          muted: '#D32F2F',
          dark: '#C62828',
          light: '#EF5350',
          subtle: 'rgba(230, 52, 34, 0.08)',
        },
      },
      fontFamily: {
        display: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'sans-serif'],
        sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'sans-serif'],
      },
      boxShadow: {
        'corporate': '0 4px 20px -2px rgba(16, 29, 54, 0.05), 0 2px 6px -1px rgba(16, 29, 54, 0.03)',
        'corporate-hover': '0 14px 34px -4px rgba(16, 29, 54, 0.1), 0 4px 12px -2px rgba(16, 29, 54, 0.05)',
      },
    },
  },
  plugins: [],
}
