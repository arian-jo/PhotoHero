import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nombre-del-repositorio/', // Reemplaza con el nombre de tu repositorio
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
