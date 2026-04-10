/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0a0a0f',
          800: '#0f172a',
          700: '#111827',
          600: '#1f2937',
        },
      },
      boxShadow: {
        glow: '0 10px 60px rgba(59, 130, 246, 0.2)',
      },
    },
  },
  plugins: [],
}
