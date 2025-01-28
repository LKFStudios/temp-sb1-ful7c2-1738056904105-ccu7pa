import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      watch: {
        // Prevent watching node_modules
        ignored: ['**/node_modules/**'],
      },
    },
    preview: {
      port: 5173,
      strictPort: true,
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Properly handle env variables
    define: {
      'process.env': env,
    },
  };
});