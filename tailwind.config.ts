import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C62828',
          yellow: '#FDD835',
          ink: '#0A0A0A',
          base: '#F7F7F7'
        }
      }
    }
  },
  plugins: []
}
export default config
