import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          75: '#F4F5F7',
          150: '#E4E7EB',
          250: '#D1D5DB',
          350: '#B3B9C1',
          450: '#8A929A',
          550: '#5E6773',
          650: '#434C59',
          750: '#2C343D',
          850: '#162030',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
