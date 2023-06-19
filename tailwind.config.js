const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    "./pages/*.{js,ts,jsx,tsx,pdf}",
    "./pages/**/*.{js,ts,jsx,tsx,pdf}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx,pdf}",
    "./src/components/layouts/**/*.{js,jsx,ts,tsx}",
  ],
  purge: [
    "./pages/**/*.tsx", 
    "./src/**/*.tsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      color1: '#848484',
      color2: '#EAEFF4',
      color3: '#1F2227',
      color4: '#EEEEEE',
      color5: '#F15B2A',
      bgcolor: '#F7F6F9',
      tHead: '#6B6B6B',
      bordercolor1:'#EEEEEE',
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#FF9370',
      overlay:'#231313',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      amber: colors.amber,
      red: colors.red,
      indigo:colors.indigo,
      blue:colors.blue,
      orange:colors.orange,
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
