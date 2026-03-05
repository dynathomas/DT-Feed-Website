import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff5ff',
          100: '#dae8ff',
          500: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
}

export default config
