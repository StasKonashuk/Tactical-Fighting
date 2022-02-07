import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tactical-Fighting/',
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
