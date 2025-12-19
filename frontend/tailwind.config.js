/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#8B5CF6',        // Primary purple accent
          purpleDark: '#6D28D9',    // Dark purple
          purpleLight: '#A78BFA',   // Light purple
          black: '#0A0A0A',         // Deep black
          blackLight: '#1A1A1A',    // Slightly lighter black
          gray: '#2D2D2D',          // Dark gray
          grayLight: '#3D3D3D',     // Light gray
          white: '#FFFFFF',
          cardBg: '#FFFFFF',
          pageBg: '#F8F9FA',
          accent: '#F59E0B',        // Orange/yellow accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
