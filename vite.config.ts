import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import slugify from 'slugify';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  optimizeDeps: {
    disabled: false,
    force: true,
    include: ['browser-assert'],
  },
  esbuild: {
    target: 'chrome100',
  },
  build: {
    assetsDir: './',
    minify: true,
    outDir: 'build',
    target: 'chrome100',
    modulePreload: {
      polyfill: false,
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: ['browser-assert'],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          return slugify(
            id.split('/').pop()?.split('.').shift() ??
              'vendor.js',
          ).toLowerCase();
        },
      },
    },
  },
});
