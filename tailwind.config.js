/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'home': "url('./assets/bg.jpg')"
      },
    },
  },
  plugins: [],
};
