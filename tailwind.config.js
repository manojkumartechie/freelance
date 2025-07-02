module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        'glow-primary': '0 0 20px rgba(0, 201, 167, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 107, 129, 0.3)',
        'glow-lg': '0 10px 40px rgba(0, 201, 167, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          'from': { boxShadow: '0 0 20px rgba(0, 201, 167, 0.2)' },
          'to': { boxShadow: '0 0 40px rgba(0, 201, 167, 0.4)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};