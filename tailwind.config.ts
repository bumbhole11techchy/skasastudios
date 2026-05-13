/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B7355',
        secondary: '#D4AF37',
        gold: '#FFD700',
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
