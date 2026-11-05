import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    process.env.NODE_ENV = 'production';
  }
  return {
    define:
      command === 'build'
        ? {
            'process.env.NODE_ENV': JSON.stringify('production'),
          }
        : undefined,
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
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/react-router') ||
              id.includes('/node_modules/scheduler/')
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
      injectRegister: null,
      includeAssets: [
        'favicon.svg',
        'icon.svg',
        'robots.txt',
      ],
      manifest: {
        id: '/',
        name: 'Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara',
        short_name: 'Ziarah Nusantara',
        description:
          'Situs resmi Ziarah Nusantara (ziarahnusantara.my.id) dikelola oleh Tim Kurator Arsip Ziarah Nusantara. Direktori & peta interaktif makam Waliyullah Nusantara.',
        theme_color: '#0D3B32',
        background_color: '#FAF8F5',
        display: 'standalone',
        orientation: 'portrait-primary',
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
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['index.html', 'manifest.webmanifest', 'favicon.svg', 'icon.svg'],
        globIgnores: [
          '**/assets/aistudio/**',
          '**/makam/**/index.html',
          '**/situs/**/index.html',
          '**/sitemap*.xml',
          '**/sitemap.txt',
          '**/rss.xml',
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/sitemap.*\.xml$/,
          /^\/sitemap\.txt$/,
          /^\/rss\.xml$/,
          /^\/robots\.txt$/,
          /^\/llms\.txt$/,
          /^\/llms-full\.txt$/,
          /^\/ard\.json$/,
          /^\/ai-catalog\.json$/,
          /^\/\.well-known\/.*/,
          /^\/favicon\..*/,
        ],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/.*\.(?:js|css|woff2?)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-hashed-assets-v1',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/thumbs\/.*\.(?:webp|png|jpg|jpeg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-local-thumbs-v1',
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\/(?:pwa-|favicon-|apple-touch-icon).*\.(?:png|ico|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-brand-icons-v1',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 90, // 90 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/(upload\.wikimedia\.org|wsrv\.nl|images\.unsplash\.com)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-images-cache-v3',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/(?:[abc]\.tile\.openstreetmap\.org|[abcd]\.basemaps\.cartocdn\.com)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ziarah-map-tiles-cache-v3',
              expiration: {
                maxEntries: 250,
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
  };
});
