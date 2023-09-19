/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#2F75CA',
        'yellow': '#FFD622',
        'white': '#ffffff',
        'red': '#D54846',
        'lightBlue': '#C5EDEC',
        'green': '#75A249',
        'orange': '#FAA532',
        'white2': '#FEFEFE',
        'black': '#061821',
        'lightBlack': '#354052',
      },
    },
  },
  plugins: [],
}

