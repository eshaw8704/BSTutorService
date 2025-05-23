// frontend/vite.config.js

import { defineConfig } from 'vite';           // ← Add this
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path
      }
    }
  }
});
