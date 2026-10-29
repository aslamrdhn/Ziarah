import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    cssMinify: true,
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/data/sites')) {
            return 'data-sites';
          }
          if (id.includes('node_modules')) {
            if (id.includes('@firebase/auth') || id.includes('firebase/auth')) {
              return 'vendor-firebase-auth';
            }
            if (id.includes('@firebase/firestore') || id.includes('firebase/firestore')) {
              return 'vendor-firebase-firestore';
            }
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'vendor-firebase-core';
            }
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'vendor-leaflet';
            }
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-48x48.png',
        'favicon-96x96.png',
        'apple-touch-icon.png',
        'icon.svg',
        'robots.txt',
        'sitemap.xml',
        'sitemap.txt',
        'rss.xml',
        'llms.txt',
        'llms-full.txt',
        'ai-catalog.json',
      ],
      manifest: {
        id: '/',
        name: 'Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara',
        short_name: 'Ziarah Nusantara',
        description:
          'Situs resmi Ziarah Nusantara (ziarahnusantara.my.id) dikelola oleh Tim Kurator Arsip Ziarah Nusantara. Direktori & peta interaktif makam Waliyullah Nusantara.',
        theme_color: '#0D3B32',
        background_color: '#F9F8F4',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/favicon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,txt,json}'],
        globIgnores: ['**/assets/aistudio/**', '**/makam/**/index.html'],
        navigateFallbackDenylist: [
          /^\/sitemap\.xml$/,
          /^\/sitemap\.txt$/,
          /^\/rss\.xml$/,
          /^\/robots\.txt$/,
          /^\/llms\.txt$/,
          /^\/llms-full\.txt$/,
          /^\/ai-catalog\.json$/,
          /^\/\.well-known\/.*/,
          /^\/favicon\..*/,
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(upload\.wikimedia\.org|wsrv\.nl|images\.unsplash\.com)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-images-cache-v2',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});
