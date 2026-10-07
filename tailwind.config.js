/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Bayana colours — unchanged from the live bayana.info site and logo
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a', // main button / "Supporting Your Growth." green
          700: '#15803d', // button hover
          800: '#166534',
          900: '#034f32', // deep logo green
          950: '#02341f', // deeper shade of the logo green (dark sections)
        },
        ink: '#111827', // headings
        body: '#374151', // paragraph text
        whatsapp: '#25d366',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Noto Sans"', 'system-ui', 'sans-serif'],
      },
      container: { center: true, padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1320px' } },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px -6px rgba(16,24,40,.08)',
        lift: '0 2px 4px rgba(16,24,40,.04), 0 24px 48px -12px rgba(3,79,50,.22)',
        glow: '0 0 0 1px rgba(34,197,94,.25), 0 12px 40px -8px rgba(22,163,74,.55)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(22px)' }, '100%': { opacity: 1, transform: 'none' } },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(30px,-20px) scale(1.08)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shine: { '0%': { transform: 'translateX(-120%) skewX(-20deg)' }, '60%,100%': { transform: 'translateX(220%) skewX(-20deg)' } },
        'pulse-ring': { '0%': { transform: 'scale(1)', opacity: 0.55 }, '100%': { transform: 'scale(1.7)', opacity: 0 } },
        'kenburns': { '0%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
        'slide-in': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(.2,.7,.2,1) both',
        'fade-in': 'fade-in .8s ease both',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        shine: 'shine 3.8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(.2,.6,.4,1) infinite',
        kenburns: 'kenburns 2.4s cubic-bezier(.2,.7,.2,1) both',
        'slide-in': 'slide-in .38s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
