module.exports = {
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '0rem',
        md: '12rem',
        lg: '16rem'
      },
    },
    extend: {
      height: {
        128: '32rem',
      },
      width: {
        240: '60rem',
      },
      colors: {
        primary: {
          100: '#f63a1b',
          200: '#ffd3d0',
          300: '#ffa6ab',
          400: '#ff6b7a',
          500: '#ff2f5e',
          600: '#ff0032',
          700: '#ec0038',
          800: '#c20037',
          900: '#e32646',
        },
      },
      boxShadow: {
        container: '0px 8px 12px 6px rgba(220, 207, 207, 0.5)'
      },
    },
    inset: (theme, { negative }) => ({
      '1/5': '20%',
      '3/10': '30%',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
  }
}
