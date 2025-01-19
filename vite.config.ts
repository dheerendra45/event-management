import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // This makes sure the app binds to all network interfaces
    port: 3002,       // You can leave this as 3002 or any port Render handles
  },
});
