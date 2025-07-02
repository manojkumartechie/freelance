module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.08)',
        'glass-dark': 'rgba(30,30,30,0.6)',
        primary: '#00C9A7',
        accent: '#FF6B81',
        soft: '#23272F',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 4px 32px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(255,255,255,0.08) inset',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}; 