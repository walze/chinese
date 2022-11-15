import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import slugify from 'slugify';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      injectRegister: 'script',
      outDir: 'build',
      manifest: {
        name: 'Mandarin Learner Tool',
        short_name: 'Mandarin Tool',
        description: 'The Mandarin dictionary to help learners',
        theme_color: '#4e46e5',
        background_color: '#eeeeee',
        lang: 'zh',
        icons: [
          {
            src: 'https://cdn.iconscout.com/icon/free/png-256/chinese-language-2646705-2194191.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'https://cdn.iconscout.com/icon/free/png-512/chinese-language-2646705-2194191.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
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
