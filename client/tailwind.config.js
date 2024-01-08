/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "jost": ["Jost", "sans-serif"], // font-weights: 300, 400, 500, 700
        "playfair": ["Playfair Display", "serif"] // font-weights: 400
      },
      spacing: {
        "space": "var(--space)"
      }
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          foreground: "#080c0c",
          background: "#f5fafa",
          secBackground: "#e5eaea",
          primary: {
            DEFAULT: "#49b3c1"
          },
          secondary: {
            DEFAULT: "#9891d4"
          },
          accent: "#28c8c8",
          danger: "#bb0000",
          info: "#005bc4",
          border: "#aaa"
        }
      },
      dark: {
        colors: {
          foreground: "#f3f7f7",
          background: "#050a0a",
          secBackground: "#151a1a",
          primary: {
            DEFAULT: "#3ea8b6"
          },
          secondary: {
            DEFAULT: "#322b6e"
          },
          accent: "#37d7d7",
          danger: "#f00",
          info: "#99c7fb",
          border: "#666"
        }
      }
    }
  })],
  darkMode: ["class"]
}

