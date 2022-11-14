/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
