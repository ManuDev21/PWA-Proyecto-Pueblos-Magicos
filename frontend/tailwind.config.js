/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta ÍXA · Playa de Isla Mujeres (Caribe)
        ixa: {
          sea: '#0A7C95',
          'sea-light': '#14A7C4',
          'sea-deep': '#053C4C',
          aqua: '#2FC4B2',
          sun: '#F4B740',
          'sun-light': '#FFD56B',
          coral: '#FF6F61',
          sand: '#FBF4E4',
          // alias heredados (compatibilidad)
          green: '#0A7C95',
          gold: '#F4B740',
          cream: '#FBF4E4',
          sage: '#2FC4B2',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(201, 162, 39, 0.35)',
        'glow-lg': '0 0 80px rgba(201, 162, 39, 0.45)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-80px) rotate(-4deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotate(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(80px) rotate(4deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotate(0)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      },
    },
  },
  plugins: [],
}
