import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0042C7',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        sidebar: '2px 2px 18px 6px #d0d2ff80',
      },
    },
  },
  plugins: [
    // other plugins...
  ],
}
export default config
