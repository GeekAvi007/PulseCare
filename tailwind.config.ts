import type { Config } from 'tailwindcss'

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
    const allColors = flattenColorPalette(theme('colors'));
    const newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, value]) => [`--${key}`, value])
    );
  
    addBase({
      ':root': newVars,
    });
  }
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    addVariablesForColors
  ],
}


export default config



