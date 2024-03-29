import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xxs': '320px',
      'xs': '375px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      red: colors.red,
      zinc: colors.zinc,
      pink: colors.pink,
      teal: colors.teal,
      sky: colors.sky,
      gray:  colors.gray,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      white: colors.white,
      black: colors.black,
      
      'background': '#f5f5ff',

    },
    extend: { 
    },
  },
  plugins: [],
}
export default config
