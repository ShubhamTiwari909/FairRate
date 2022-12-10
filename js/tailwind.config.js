/** @type {import('tailwindcss').Config} */
tailwind.config = {
  theme: {
    extend: {
      width: {
        "120":"30rem"
      },
      height: {
        '88': '22rem',
        '144': '36rem',
      },
      fontFamily: { 
        'open-sans': ['Open Sans', 'sans-serif' ]
      },
      backgroundImage: {
        "dark-blue":"linear-gradient(252deg, #60d9f7 102%, #58baf6 59%, red 35%, #4d8cf4 8%)"
      },
      colors:{
        'cyan-blue':"#4ad5f6",
        'aqua-marine':"#47c1bf",
        'light-green':"#00cfc0",
        'sky-blue':"#23c0f5",
        'dark-blue':"#007ace",
        'light-violet':"#5c6ac4",
        'light-purple':"#9c6ade",
        'dark-pink':"#de6a93"
      },
      flex: {
        '2': '2 2 0%',
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography")
  ],
}
