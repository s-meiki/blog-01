import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1C6FEA',
          dark: '#164FA3',
          light: '#E6F0FF'
        }
      }
    }
  },
  plugins: []
};

export default config;

