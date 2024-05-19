// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1c3d5a',
        'gray-800': '#1e293b',
        'light-gray': '#f7f7f7',
        'yellow-500': '#fbbf24',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
