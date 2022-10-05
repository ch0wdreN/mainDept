import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://main-dept-api.deno.dev',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    target: 'esnext',
  },
});
