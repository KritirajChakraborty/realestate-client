import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://realestate-api-3c1n.onrender.com',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
