import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 3000, // fallback to 3000 if not defined
    },
  };
});
