import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        navy: '#000000',
        'navy-dark': '#020c1b',
        'navy-light': '#172a45',
        'navy-lighter': '#eca72c',
        mint: '#eca72c',
        slate: '#c7c9ce',
        'slate-light': '#eca72c',
        'slate-lighter': '#ffffff',
      },
      fontFamily: {
        sans: ['Calibre', 'San Francisco', 'SF Pro Text', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        nav: '0 10px 30px -10px rgb(2 12 27 / 0.7)',
      },
    },
  },
  plugins: [],
} satisfies Config;
