/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-nunito)']
      }
    },
    colors: {
      'primary': {
        DEFAULT: 'hsl(0, 0%, 100%)',
        100: 'hsl(0, 0%, 100%)',
        400: 'hsl(0, 0%, 98%)',
        900: 'hsl(0, 0%, 52%)'
      },
      'secondary': {
        DEFAULT: 'hsl(209, 23%, 22%)',
        100: 'hsl(209, 23%, 22%)',
        400: 'hsl(207, 26%, 17%)',
        900: 'hsl(200, 15%, 8%)'
      }
    },
    container: {
      center: true
    }
  },
  plugins: [],
}
