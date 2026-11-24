import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function geojsonPlugin() {
  return {
    name: 'vite-plugin-geojson',
    transform(code: string, id: string) {
      if (id.endsWith('.geojson')) {
        return {
          code: `export default ${code};`,
          map: null,
        };
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), geojsonPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
