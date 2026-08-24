/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        flagRed: '#990000',
        flagGold: '#FAF92A',
        flagGreen: '#006633',
        rule: '#e5e5e5',
      },
      fontFamily: {
        sans: ['Libre Franklin', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1240px',
      },
    },
  },
}
