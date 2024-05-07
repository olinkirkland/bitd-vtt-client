import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const base = process.env.NODE_ENV === 'production' ? '/bitd-vtt-client/' : '/';

export default defineConfig({
  plugins: [vue()],
  server: { host: false }, // For external IP access,
  base,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});