/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "hover" : '#3D3D3D',
        "select" : '#272727',
        "darkgray" : {
          100 : '#F1F1F1',
          200 : '#BFBFBF',
          300 : '#AAAAAA',
          400 : '#717171',
          500 : '#3F3F3F', // bordures
          600 : '#272727',
          700 : '#222222',
          800 : '#181818', // background principal
          900 : '#0F0F0F'  // background autres
        },
        "input-txt" : '#121212',
        "txt" : '#FFFFFF',
      },
      height: {
        "7/8" : "87.5%",
        "11/12" : "91.666666%",
      },
      minWidth: {
        '1/4' : "25%",
        '1/5' : "20%",
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
        '48': '192px',
        '52': '208px',
        '64': '256px',
        '96': '384px',
        '128': '512px',
      },
      minHeight: {
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
        '48': '192px',
        '64': '256px',
        '96': '384px',
        '128': '512px',
        '150': '600px',
      },
      maxWidth: {
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
        '32': '128px',
        '48': '192px',
        '64': '256px',
        '96': '384px',
      },
      maxHeight: {
        '128': '512px',
        '150': '600px',
      },
      keyframes: {
        rotate: {
          '0%' : { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
      },
    },
  },
  plugins: [],
}