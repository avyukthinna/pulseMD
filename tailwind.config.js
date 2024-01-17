/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    backgroundImage: {
      'home-background': "url('./images/homeBg.jpg')",
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))'
    },
    backgroundSize: {
      '200%': '200%',
      '100%': '100%',
      'cover':'cover',
      'contain': 'contain'
    },
    textColor: {
      'primary-blue':'#0e55e7',
      'primary-white':'#FFFFFF',
      'error': '#cc0000'
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'logo': ['Playball', 'cursive']
    },
    screens: {
      'sm':'640px',
      'md': '800px'
    },
    extend: {
    }
  },
  plugins: [],
}

