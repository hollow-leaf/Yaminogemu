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
        offwhite: '#fffbf2',
        custom_blue_start: '#d4fc79',
        custom_blue_end: '#96e6a1'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)'
      }
    }
  },
  plugins: []
} satisfies Config
