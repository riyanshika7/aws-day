/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nitj: {
          primary: '#1a365d', // Deep institutional navy
          accent: '#c53030',  // Warm crimson accent
          gold: '#d69e2e',    // Ceremonial gold
          light: '#f7fafc',
          dark: '#0f172a',
          surface: '#ffffff',
          slate: '#334155'
        },
        gis: {
          academic: '#2563eb',    // Royal blue
          administrative: '#7c3aed', // Purple
          hostel: '#059669',      // Emerald green
          sports: '#ea580c',      // Orange
          dining: '#d97706',      // Amber
          medical: '#dc2626',     // Crimson
          amenity: '#0891b2',     // Cyan
          path: '#f59e0b',        // Amber road/path
          green: '#10b981'        // Light emerald
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
