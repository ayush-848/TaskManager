import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://task-manager-api-rose.vercel.app',
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
      '/id': {
        target: 'https://task-manager-api-rose.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
