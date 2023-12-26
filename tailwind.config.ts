import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [forms],
} satisfies Config;
