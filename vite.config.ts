import { URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  server: { host: false }, // For external IP access
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
});
