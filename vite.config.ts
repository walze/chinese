import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: false },
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
  worker: {
    format: 'es',
  },
  esbuild: {
    target: 'chrome100',
    supported: {
      'top-level-await': true, //browsers can handle top-level-await features
    },
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

          return slugify.default('vendor.js').toLowerCase();
        },
      },
    },
  },
});
