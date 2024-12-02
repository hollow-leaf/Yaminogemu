import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        skyblue1: '#47e9f5',
        skyblue2: '#52e4f7',
        skyblue3: '#05d3f7',
        offwhite: '#fffbf2'
      }
    }
  },
  plugins: []
} satisfies Config
