/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    backgroundImage: {
      'home-background': "url('./images/homeBg.jpg')",
      'we-provide':"url('./images/we-provide.jpg')",
      'why-md':'./images/why-md.jpg',
      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))'
    },
    scale: {
      '102':'1.02',
      '101':'1.01'
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
      'primary-green':'#00980f',
      'primary-yellow': '#ecae06',
      'primary-purple': '#930ebd',
      'error': '#cc0000'
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'logo': ['Playball', 'cursive']
    },
    screens: {
      'sm':'400px',
      'sm-xl':'600px',
      'md': '768px',
      'md-xl': '960px',
      'lg': '1024px',
      'lg-xl':'1135px'
    },
    extend: {
    }
  },
  plugins: [],
}

