import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PhotoHero/', // Reemplaza con el nombre de tu repositorio
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['firebase/app', 'firebase/auth'],
  },
  build: {
    rollupOptions: {
      external: ['firebase/app', 'firebase/auth'],
    },
  },
});
